import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js';

export default class StakingApi {
  private library: TezosToolkit;

  constructor(library: TezosToolkit) {
    this.library = library;
  }

  public async stake(account: string, amount: BigNumber, poolContract: string, farmingContract: string): Promise<any> {
    const pContract = await this.library.contract.at(poolContract);
    const addOperator = pContract.methods.update_operators([{
      add_operator: {
        owner: account,
        operator: farmingContract,
        token_id: 0
      }
    }]).toTransferParams();
    const opg = await this.library.wallet.batch()
      .withTransfer(addOperator).send();
    return opg.opHash;
  }
}
