import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useWalletContext } from '../../wallet/WalletContext';
import FarmingContractApi from '../api/FarmingContractApi';
import { ConnectionStatus } from '../../wallet/connectionStatus';

export default function useStakedBalance(farmingContract: string) {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(new BigNumber(''));
  const { library, status, account } = useWalletContext();

  const refresh = useCallback(async () => {
    setLoading(true);
    const r = await new FarmingContractApi(library!).balanceOf(farmingContract, account!);
    setLoading(false);
    setBalance(r);
  }, [library, farmingContract, account]);

  useEffect(() => {
    if (status !== ConnectionStatus.CONNECTED || !account) {
      setBalance(new BigNumber(''));
      return;
    }
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  }, [refresh, status, account]);

  return { loading, refresh, balance };
}
