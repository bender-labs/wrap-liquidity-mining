import { AppBar, Box, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import WalletConnection from './features/wallet/WalletConnection';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      '& > *': {
        marginLeft: theme.spacing(2)
      },
      fontSize: '1rem',
      fontWeight: 900,
      '& > a': {
        lineHeight: '19px',
        borderRadius: '20px',
        border: '1px solid transparent',
        padding: '6px 10px',
        '&:hover': {
          textDecoration: 'none',
          border: '1px solid #FFD000'
        }
      }
    },
    first: {
      flex: 1
    },
    second: {
      flex: 2
    },
    logo: {
      width: 50,
      marginLeft: theme.spacing(4)
    },
    toolbar: {
      color: '#FFFFFF',
      minHeight: 110
    },
    wallets: {
      '& > *': {
        marginRight: theme.spacing(3)
      }
    },
    pendingButton: {
      marginRight: theme.spacing(1)
    },
    menuSpace: {
      '& > *': {
        marginRight: theme.spacing(5)
      }
    },
    menuButton: {
      marginRight: theme.spacing(),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    }
  })
);

const Render = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar
        position='static'
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar className={classes.toolbar}>
          <Grid
            className={classes.first}
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
          >
            <Grid item>
              <Link to='/'>
                <img src={logo} className={classes.logo} alt='Logo' />
              </Link>
            </Grid>
          </Grid>

          <Grid
            container
            className={classes.second}
            direction='row'
            justify='flex-end'
            alignItems='center'
          >
            <Grid item>
              <Box className={classes.wallets}>
                <WalletConnection withConnectionStatus={true} />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Render;
