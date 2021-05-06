import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js';

export default class StakingApi {
  private library: TezosToolkit;

  constructor(library: TezosToolkit) {
    this.library = library;
  }

  public async stake(account: string, amount: BigNumber, poolContract: string, farmingContract: string): Promise<any> {
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
    return opg.opHash;
  }
}
