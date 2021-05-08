import BigNumber from 'bignumber.js';
import { TokenConfig } from '../../../runtime/config/types';
import { useWalletContext } from '../../wallet/WalletContext';
import { useCallback, useEffect, useState } from 'react';
import { ConnectionStatus } from '../../wallet/connectionStatus';
import { useSnackbar } from 'notistack';
import FarmingContractApi from '../../farming/api/FarmingContractApi';

export enum UnstakeStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  UNSTAKING = 'UNSTAKING',
}

const nextStatus = (balance: BigNumber, amount: BigNumber) => {
  if (balance.gte(amount)) {
    return UnstakeStatus.READY;
  }
  return UnstakeStatus.NOT_READY;
};

export default function useUnstake(token: TokenConfig, balance: BigNumber) {
  const { status, library, account } = useWalletContext();
  const [unstakeStatus, setStatus] = useState(UnstakeStatus.NOT_CONNECTED);
  const connected = status === ConnectionStatus.CONNECTED && account !== undefined;
  const [amount, setAmount] = useState(new BigNumber(''));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!connected) {
      setStatus(UnstakeStatus.NOT_CONNECTED);
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

  const unstake = useCallback(async () => {
    const api = new FarmingContractApi(library!);
    setStatus(UnstakeStatus.UNSTAKING);
    try {
      await api.unstake(amount, token.farmingContract);
      setAmount(new BigNumber(''));
      setStatus(UnstakeStatus.NOT_READY);
      enqueueSnackbar('Unstaking done', { variant: 'success' });

    } catch (error) {
      enqueueSnackbar(error.description, { variant: 'error' });
      setStatus(UnstakeStatus.READY);
    }

  }, [library, amount, token.farmingContract, enqueueSnackbar]);

  return {
    unstakeStatus, amount, changeAmount, unstake
  };
}
