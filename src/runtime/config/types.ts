import { NetworkType } from '@airgap/beacon-sdk';
import tokens from './tokens';


export interface TokenConfig {
  symbol: string;
  name: string;
  thumbnailUri: string;
  id: number;
  contract: string;
  decimals: number;
  poolContract: string;
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
  tokens: TokenConfig[]
}

export type TezosConfig = Config['tezos'];

const env = Environment[(process.env.REACT_APP_WRAP_ENVIRONMENT || 'TESTNET') as keyof typeof Environment];
export const initialConfig: Config = {
  environmentName: env,
  tezos: {
    rpcUrl: process.env.REACT_APP_TZ_RPC!,
    networkId: process.env.REACT_APP_TZ_NETWORK_ID! as NetworkType,
    networkName: process.env.REACT_APP_TZ_NETWORK_NAME!
  },
  tokens: tokens[env]
};
