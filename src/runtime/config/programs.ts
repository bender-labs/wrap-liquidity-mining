import { Environment, ProgramConfig, Token } from './types';

const WRAP: Token = {
  contract: 'KT1L1xYJit22TmuhDXaeng4AZDhRqZwcacNj',
  thumbnailUri: 'ipfs://Qma2o69VRZe8aPsuCUN1VRUE5k67vw2mFDXb35uDkqn17o',
  decimals: 8,
  symbol: 'WRAP',
  name: 'WRAP',
  id: 0,
};

const programs: { [key in Environment]: ProgramConfig[] } = {
  MAINNET: [],
  TESTNET: [
    {
      reward: WRAP,
      farmingContract: 'KT1Tgn7wYwmjhTuSot5DPZ8U1hPn7cPzhnea',
      pool: {
        contract: 'KT1Srr8aWcxPTptoCNrWoXGQdrrNWN6Zx58X',
        base: WRAP,
        quote: 'xtz',
      },
    },
    {
      reward: WRAP,
      farmingContract: '',
      pool: {
        contract: 'KT1FkFC5ovz9UrGoQJLd5hyjmz6aSnASTDsx',
        base: {
          symbol: 'wDAI',
          name: 'Dai Stable coin',
          id: 0,
          contract: 'KT1DJwRryZ11dGDnqmmRtTiSsgxQDY4bw3j4',
          thumbnailUri:
            'ipfs:////QmVov6RtfRNzuQGvGKmhnABUsfCiDKvn31amg8DUxzowtM',
          decimals: 18,
        },
        quote: 'xtz',
      },
    },
  ],
};

export default programs;
