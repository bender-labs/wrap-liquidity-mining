import { TokenConfig } from '../../runtime/config/types';
import BigNumber from 'bignumber.js';

export interface FarmingContractInfoProps {
  program: TokenConfig;
  contractBalances: {
    totalSupply: BigNumber;
    staked: BigNumber;
    reward: BigNumber;
    loading: boolean;
  },
  balance: {
    value: BigNumber;
    loading: boolean;
  }
}

export interface FarmingContractActionsProps extends FarmingContractInfoProps {
  onApply: () => void
}
