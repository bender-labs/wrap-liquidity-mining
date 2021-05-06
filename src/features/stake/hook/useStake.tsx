import BigNumber from 'bignumber.js';
import { useWalletContext } from '../../wallet/WalletContext';
import { ConnectionStatus } from '../../wallet/connectionStatus';
import { useCallback, useEffect, useState } from 'react';

export enum StakingStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  STAKING = 'STAKING',
  DONE = 'DONE'
}

const nextStatus = (balance: BigNumber, amount: BigNumber) => {
  if (balance.gte(amount)) {
    return StakingStatus.READY;
  }
  return StakingStatus.NOT_READY;
};

export default function useStake(balance: BigNumber) {
  const { status, library, account } = useWalletContext();
  const [stakingStatus, setStatus] = useState(StakingStatus.NOT_CONNECTED);
  const connected = status === ConnectionStatus.CONNECTED && account !== undefined;
  const [amount, setAmount] = useState(new BigNumber(''));


  useEffect(() => {
    if (!connected) {
      setStatus(StakingStatus.NOT_CONNECTED);
      setAmount(new BigNumber(''));
      return;
    }
    setStatus(nextStatus(balance, amount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  useEffect(() => {
    if (!connected) {
      return;
    }
    setStatus(nextStatus(balance, amount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  const changeAmount = useCallback((amt: BigNumber) => {
    setAmount(amt);
    setStatus(nextStatus(balance, amt));
  }, [balance]);

  return { stakingStatus, amount, changeAmount };
}
