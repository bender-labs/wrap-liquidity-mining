import React, { PropsWithChildren, useState } from 'react';
import { Config, initialConfig } from './types';

type ContextValue = undefined | Config;
const ConfigContext = React.createContext<ContextValue>(undefined);

export function useTezosConfig() {
  const config = React.useContext(ConfigContext);
  if (config == null)
    throw new Error('config consumer must be used within a config provider');
  return config.tezos;
}

export function useConfig() {
  const config = React.useContext(ConfigContext);
  if (config == null)
    throw new Error('config consumer must be used within a config provider');
  return config;
}


export default function Provider({ children }: PropsWithChildren<{}>) {

  const [config] = useState<ContextValue>(initialConfig);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}
