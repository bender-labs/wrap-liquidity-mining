import React from 'react';
import WalletConnectionCard from '../wallet/WalletConnectionCard';
import { useSnackbar } from 'notistack';
import {useWalletContext} from "./WalletContext";

type Props = {
  withConnectionStatus: boolean;
};

export default function WalletConnection({
  withConnectionStatus,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    activate,
    deactivate,
    status,
    account,
  } = useWalletContext();

  const handleConnection = () => {
    activate().catch((error) => {
      enqueueSnackbar(error.description, { variant: 'error' });
    });
  };

  const handleDisconnection = () => {
    deactivate().catch((error) => {
      enqueueSnackbar(error.description, { variant: 'error' });
    });
  };

  return (
    <React.Fragment>
      <WalletConnectionCard
        connectionStatus={status}
        onSelectedProvider={handleConnection}
        onDisconnection={handleDisconnection}
        account={account}
        withConnectionStatus={withConnectionStatus}
      />
    </React.Fragment>
  );
}
