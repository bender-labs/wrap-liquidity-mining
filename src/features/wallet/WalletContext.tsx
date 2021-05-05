import React, { PropsWithChildren, useEffect, useState } from 'react';
import { TezosConnectionStatus, useTezosContext } from './TezosContext';
import { TezosToolkit } from '@taquito/taquito';
import { useTezosConfig } from '../../runtime/config/ConfigContext';
import {
  ConnectionActions,
  ConnectionStatus,
  connectionStatusInitialState,
  connectionStatusReducer
} from './connectionStatus';
import { RequestPermissionInput } from '@airgap/beacon-sdk';

type ContextValue =
  | undefined
  | {
  library?: TezosToolkit;
  activate: () => Promise<void>;
  deactivate: () => Promise<void>;
  status: ConnectionStatus;
  account?: string;
};

const WalletContext = React.createContext<ContextValue>(undefined);

export function useWalletContext() {
  const wallet = React.useContext(WalletContext);
  if (wallet == null)
    throw new Error('wallet consumer must be used within a wallet provider');
  return wallet;
}

export default function Provider({ children }: PropsWithChildren<{}>) {
  const {
    library: tzLibrary,
    activate: tzActivate,
    status: tezosConnectionStatus,
    account: tzAccount,
    deactivate: tzDeactivate,
    reactivate: tzReactivate,
    wallet: tzWallet
  } = useTezosContext();
  const { rpcUrl, networkId } = useTezosConfig();

  const activateTzConnection = (
    activation: (request: RequestPermissionInput) => Promise<string>
  ) => {
    return activation({
      network: {
        type: networkId,
        rpcUrl
      }
    })
      .then((_) => {
        tzDispatchConnectionAction({
          type: ConnectionActions.connectionSuccessful
        });
      })
      .catch((error) => {
        console.log(error);
        tzDispatchConnectionAction({
          type: ConnectionActions.connectionFailed
        });
        throw error;
      });
  };


  const deactivateTzConnection = () => {
    return tzDeactivate().then(() => {
      tzDispatchConnectionAction({
        type: ConnectionActions.stoppingConnection
      });
    });
  };

  const [wallet, setWallet] = useState<ContextValue>({
    account: undefined,
    activate: () => activateTzConnection(tzActivate),
    deactivate: deactivateTzConnection,
    status: ConnectionStatus.NOT_CONNECTED
  });
  const [tzConnectionStatus, tzDispatchConnectionAction] = React.useReducer(
    connectionStatusReducer,
    connectionStatusInitialState(
      tezosConnectionStatus === TezosConnectionStatus.CONNECTED
    )
  );

  useEffect(() => {
    setWallet((prevState) => ({
      library: tzLibrary,
      activate: prevState!.activate,
      deactivate: prevState!.deactivate,
      status: tzConnectionStatus,
      account: tzAccount
    }));
  }, [
    tzLibrary,
    tzActivate,
    tzConnectionStatus,
    tzAccount
  ]);


  useEffect(() => {
    tzWallet.client.getActiveAccount().then((activeAccount) => {
      if (activeAccount) {
        activateTzConnection(tzReactivate);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
}
