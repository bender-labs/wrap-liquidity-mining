import { useCallback, useEffect, useState } from 'react';
import { useWalletContext } from '../../wallet/WalletContext';
import { ConnectionStatus } from '../../wallet/connectionStatus';
import FarmingContractApi from '../api/FarmingContractApi';
import BigNumber from 'bignumber.js';

export default function useTotalSupply(farmingContract: string) {
  const [loading, setLoading] = useState(false);
  const [totalSupply, setTotalSupply] = useState(new BigNumber(''));
  const { library, status } = useWalletContext();

  const refresh = useCallback(async () => {
    setLoading(true);
    const r = await new FarmingContractApi(library!).totalSupply(farmingContract);
    setTotalSupply(r);
    setLoading(false);
  }, [library, farmingContract]);

  useEffect(() => {
    if (status !== ConnectionStatus.CONNECTED || !library) {
      setTotalSupply(new BigNumber(''));
      return;
    }
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  }, [refresh, status]);

  return { loading, refresh, totalSupply };
}
