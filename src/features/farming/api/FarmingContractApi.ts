import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js';

export default class FarmingContractApi {
  private library: TezosToolkit;

  constructor(library: TezosToolkit) {
    this.library = library;
  }

  public async stake(account: string, amount: BigNumber, poolContract: string, farmingContract: string): Promise<string> {
    const [pContract, fContract] = await Promise.all([this.library.contract.at(poolContract), this.library.contract.at(farmingContract)]);
    const addOperator = pContract.methods.update_operators([{
      add_operator: {
        owner: account,
        operator: farmingContract,
        token_id: 0
      }
    }]).toTransferParams();
    const deposit = fContract.methods.deposit(amount.toString(10)).toTransferParams();
    const opg = await this.library.wallet
      .batch()
      .withTransfer(addOperator)
      .withTransfer(deposit)
      .send();
    await opg.receipt();
    return opg.opHash;
  }

  private async getStorage(farmingContract: string): Promise<Record<string, any>> {
    const fContract = await this.library.contract.at(farmingContract);
    return await fContract.storage() as Record<string, any>;
  }

  public async totalSupply(farmingContract: string) {
    const storage = await this.getStorage(farmingContract);
    return new BigNumber(storage['farmLpTokenBalance'] as number);
  }

  public async balanceOf(farmingContract: string, owner: string): Promise<BigNumber> {
    const storage = await this.getStorage(farmingContract);
    try {
      const delegator = await storage['delegators'].get(owner);
      return delegator['lpTokenBalance'] as BigNumber;
    }
    catch {
      return new BigNumber(0);
    }


  }
}
