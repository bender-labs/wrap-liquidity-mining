import React from 'react';
import {Button, darken, makeStyles} from '@material-ui/core';

import {ConnectionStatus} from './connectionStatus';
import TezosIcon from './Icon';
import ConnectIcon from './ConnectIcon';
import {ellipsizeAddress} from './address';

const useStyles = makeStyles((theme) => ({
    connectionButton: {
        backgroundColor: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 900,
        fontSize: '0.9rem',
        borderRadius: '25px',
        padding: '3px 25px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        '&.Mui-disabled': {
            color: '#B1B1B1',
        },
    },
    connectedConnectionButton: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.1),
        },
    },
}));

type Props = {
    connectionStatus: ConnectionStatus;
    onSelectedProvider: (key: string) => void;
    onDisconnection: () => void;
    account: string | null | undefined;
    withConnectionStatus: boolean;
};

const WalletConnectionCard = ({
                                  connectionStatus,
                                  onSelectedProvider,
                                  onDisconnection,
                                  account,
                                  withConnectionStatus,
                              }: Props) => {
    const classes = useStyles();
    const handleSelectedProvider = (key: string) => {
        onSelectedProvider(key);
    };
    const handleDisconnection = () => {
        onDisconnection();
    };
    const handleClick = () => handleSelectedProvider('injected');
    return (
        <React.Fragment>
            {connectionStatus === ConnectionStatus.CONNECTED && account != null ? (
                <Button
                    size="small"
                    className={`${classes.connectionButton} ${classes.connectedConnectionButton}`}
                    startIcon={<TezosIcon/>}
                    endIcon={null}
                    onClick={handleDisconnection}
                >
                    {ellipsizeAddress(account, 4)}
                </Button>
            ) : (
                <Button
                    size="small"
                    className={classes.connectionButton}
                    disabled={connectionStatus === ConnectionStatus.CONNECTING}
                    startIcon={<TezosIcon/>}
                    endIcon={withConnectionStatus ? <ConnectIcon/> : null}
                    onClick={handleClick}
                >
                    Connect
                </Button>
            )}
        </React.Fragment>
    );
};
export default WalletConnectionCard;
