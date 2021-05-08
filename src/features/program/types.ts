import { TokenConfig } from '../../runtime/config/types';
import BigNumber from 'bignumber.js';

export interface FarmingContractActionsProps {
  program: TokenConfig;
  contractBalances: {
    totalSupply: BigNumber;
    staked: BigNumber;
    loading: boolean;
  },
  balance: {
    value: BigNumber;
    loading: boolean;
  }
  onApply: () => void
}
