import BigNumber from 'bignumber.js';
import { TokenConfig } from '../../../runtime/config/types';

export enum UnstakeStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  STAKING = 'STAKING',
}

export default function useUnstake(token: TokenConfig, balance: BigNumber) {
  const unstakeStatus = UnstakeStatus.NOT_READY;
  return {
    unstakeStatus
  };
}
