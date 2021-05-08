import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useWalletContext } from '../../wallet/WalletContext';
import FarmingContractApi from '../api/FarmingContractApi';
import { ConnectionStatus } from '../../wallet/connectionStatus';

const initialState = { totalSupply: new BigNumber(''), staked: new BigNumber('') };

export default function useFarmingContract(farmingContract: string) {
  const [loading, setLoading] = useState(false);

  const [balances, setBalances] = useState(initialState);
  const { library, status, account } = useWalletContext();

  const refresh = useCallback(async () => {
    setLoading(true);
    const r = await new FarmingContractApi(library!).extractBalances(farmingContract, account!);
    setLoading(false);
    setBalances(r);
  }, [library, farmingContract, account]);

  useEffect(() => {
    if (status !== ConnectionStatus.CONNECTED || !account) {
      setBalances(initialState);
      return;
    }
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  }, [refresh, status, account]);

  return { contractLoading: loading, refreshFarmingContract: refresh, contractBalances: balances };
}
