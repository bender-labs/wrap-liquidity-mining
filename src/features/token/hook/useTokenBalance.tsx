import { useWalletContext } from '../../wallet/WalletContext';
import { useEffect, useState } from 'react';
import { ConnectionStatus } from '../../wallet/connectionStatus';
import BigNumber from 'bignumber.js';
import { TezosToolkit } from '@taquito/taquito';

enum BalanceStrategy {
  STORAGE = 'STORAGE',
  VIEW = 'VIEW',
  LAMBDA = 'LAMBDA'
}

interface BalanceFetcher {
  (library: TezosToolkit, owner: string, address: string, tokenId: number): Promise<BigNumber>;
}

const fetchByLambda: BalanceFetcher = async (library, owner, address, tokenId) => {
  const contract = await library.contract.at(address);
  const [{ balance }] = await contract.views.balance_of([{ owner, token_id: tokenId }]).read();
  return balance;
};

const fetchers: { [key in keyof typeof BalanceStrategy]: BalanceFetcher } = {
  'LAMBDA': fetchByLambda,
  'STORAGE': fetchByLambda,
  'VIEW': fetchByLambda
};

export default function useTokenBalance(address: string, tokenId: number, strategy = BalanceStrategy.LAMBDA) {
  const { status, library, account } = useWalletContext();
  const connected = (status === ConnectionStatus.CONNECTED) && account !== undefined;
  const [balance, setBalance] = useState(new BigNumber(''));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!connected) {
      setBalance(new BigNumber(''));
      return;
    }
    const fetchBalance = async () => {
      setLoading(true);
      const result = await fetchers[strategy](library!, account!, address, tokenId);
      setLoading(false);
      setBalance(result);
    };
    // noinspection JSIgnoredPromiseFromCall
    fetchBalance();
  }, [strategy, connected, library, account, address, tokenId]);

  return { balance, loading, connected };
}
