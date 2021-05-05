import { NetworkType } from '@airgap/beacon-sdk';


export interface InitialConfig {
  environmentName: string;
  tezos: {
    rpcUrl: string;
    networkId: NetworkType;
    networkName: string;
  };
}

export interface Config {
  environmentName: string;
  tezos: {
    rpcUrl: string;
    networkId: NetworkType;
    networkName: string;
  };
}

export type TezosConfig = Config['tezos'];

export enum Environment {
  TESTNET = 'TESTNET',
  MAINNET = 'MAINNET',
}


export const initialConfig: InitialConfig = {
  environmentName: process.env.REACT_APP_WRAP_ENVIRONMENT!,
  tezos: {
    rpcUrl: process.env.REACT_APP_TZ_RPC!,
    networkId: process.env.REACT_APP_TZ_NETWORK_ID! as NetworkType,
    networkName: process.env.REACT_APP_TZ_NETWORK_NAME!,
  },
};
