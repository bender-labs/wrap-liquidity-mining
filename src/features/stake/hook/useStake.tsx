import BigNumber from 'bignumber.js';
import { useWalletContext } from '../../wallet/WalletContext';
import { ConnectionStatus } from '../../wallet/connectionStatus';
import { useCallback, useEffect, useState } from 'react';
import { ProgramConfig } from '../../../runtime/config/types';
import { useSnackbar } from 'notistack';
import FarmingContractApi from '../../farming/api/FarmingContractApi';

export enum StakingStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  STAKING = 'STAKING',
}

const nextStatus = (balance: BigNumber, amount: BigNumber) => {
  if (balance.gte(amount)) {
    return StakingStatus.READY;
  }
  return StakingStatus.NOT_READY;
};

export default function useStake(program: ProgramConfig, balance: BigNumber) {
  const { status, library, account } = useWalletContext();
  const [stakingStatus, setStatus] = useState(StakingStatus.NOT_CONNECTED);
  const connected = status === ConnectionStatus.CONNECTED && account !== undefined;
  const [amount, setAmount] = useState(new BigNumber(''));
  const { enqueueSnackbar } = useSnackbar();


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

  const stake = useCallback(async () => {
    const api = new FarmingContractApi(library!);
    setStatus(StakingStatus.STAKING);
    try {
      await api.stake(account!, amount, program.pool.contract, program.farmingContract);
      setAmount(new BigNumber(''));
      setStatus(StakingStatus.NOT_READY);
      enqueueSnackbar('Staking done', { variant: 'success' });

    } catch (error) {
      enqueueSnackbar(error.description, { variant: 'error' });
      setStatus(StakingStatus.READY);
    }

  }, [library, account, amount, program.pool.contract, program.farmingContract, enqueueSnackbar]);

  return { stakingStatus, amount, changeAmount, stake };
}
