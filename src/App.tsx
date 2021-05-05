import React from 'react';
import './App.css';
import { Box, Container, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import TezosProvider from './features/wallet/TezosContext';
import { getLibrary } from './features/wallet/beacon';
import { themeOptions } from './runtime/theme/theme';
import AppBar from './AppBar';
import { SnackbarProvider } from 'notistack';
import WalletProvider from './features/wallet/WalletContext';
import ConfigProvider from './runtime/config/ConfigContext';

const theme = createMuiTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <TezosProvider getLibrary={getLibrary}>
          <WalletProvider>
            <CssBaseline />
            <SnackbarProvider autoHideDuration={6000}>
              <AppBar />
              <Container maxWidth='md'>
                <Box mt={5}>

                </Box>
                <Box mt={5}>

                </Box>

              </Container>
            </SnackbarProvider>
          </WalletProvider>
        </TezosProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
