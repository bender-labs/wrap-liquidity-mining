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
      farmingContract: 'KT1Tgn7wYwmjhTuSot5DPZ8U1hPn7cPzhnea',
      thumbnailUri: 'ipfs://Qma2o69VRZe8aPsuCUN1VRUE5k67vw2mFDXb35uDkqn17o'
    },
    {
      symbol: 'wDAI',
      name: 'Dai Stable coin',
      id: 0,
      contract: 'KT1DJwRryZ11dGDnqmmRtTiSsgxQDY4bw3j4',
      poolContract: 'KT1FkFC5ovz9UrGoQJLd5hyjmz6aSnASTDsx',
      farmingContract: '',
      thumbnailUri: 'ipfs:////QmVov6RtfRNzuQGvGKmhnABUsfCiDKvn31amg8DUxzowtM'
    }
  ]
};

export default tokens;
