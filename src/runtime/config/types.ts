import { NetworkType } from '@airgap/beacon-sdk';
import programs from './programs';

export interface Token {
  id: number;
  contract: string;
  thumbnailUri: string;
  decimals: number;
  symbol: string;
  name: string;
}

export interface ProgramConfig {
  pool: {
    contract: string;
    base: Token;
    quote: 'xtz';
  };
  reward: Token;
  farmingContract: string;
}

export enum Environment {
  TESTNET = 'TESTNET',
  MAINNET = 'MAINNET',
}

export interface Config {
  environmentName: Environment;
  tezos: {
    rpcUrl: string;
    networkId: NetworkType;
    networkName: string;
  };
  programs: ProgramConfig[];
}

const env =
  Environment[
    (process.env.REACT_APP_WRAP_ENVIRONMENT ||
      'TESTNET') as keyof typeof Environment
  ];
export const initialConfig: Config = {
  environmentName: env,
  tezos: {
    rpcUrl: process.env.REACT_APP_TZ_RPC!,
    networkId: process.env.REACT_APP_TZ_NETWORK_ID! as NetworkType,
    networkName: process.env.REACT_APP_TZ_NETWORK_NAME!,
  },
  programs: programs[env],
};
