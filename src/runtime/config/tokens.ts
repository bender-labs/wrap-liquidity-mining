import { Environment, TokenConfig } from './types';

const tokens: { [key in Environment]: TokenConfig[] } = {
  'MAINNET': [],
  'TESTNET': [
    {
      symbol: 'WRAP',
      name: 'WRAP',
      id: 0,
      contract: 'KT1L1xYJit22TmuhDXaeng4AZDhRqZwcacNj',
      poolContract: 'KT1Srr8aWcxPTptoCNrWoXGQdrrNWN6Zx58X',
      miningContract: '',
      thumbnailUri: 'ipfs://Qma2o69VRZe8aPsuCUN1VRUE5k67vw2mFDXb35uDkqn17o'
    },
    {
      symbol: 'TEST',
      name: 'TEST',
      id: 1,
      contract: 'KT1L1xYJit22TmuhDXaeng4AZDhRqZwcacNj',
      poolContract: 'KT1Srr8aWcxPTptoCNrWoXGQdrrNWN6Zx58X',
      miningContract: '',
      thumbnailUri: 'ipfs://Qma2o69VRZe8aPsuCUN1VRUE5k67vw2mFDXb35uDkqn17o'
    }
  ]
};

export default tokens;
