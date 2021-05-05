import React from 'react';
import './App.css';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import TezosProvider from './features/wallet/TezosContext';
import { getLibrary } from './features/wallet/beacon';
import { themeOptions } from './runtime/theme/theme';
import AppBar from './AppBar';
import { SnackbarProvider } from 'notistack';
import WalletProvider from './features/wallet/WalletContext';
import ConfigProvider from './runtime/config/ConfigContext';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProgramScreen from './screen/ProgramsScreen';

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
              <Router>
                <Switch>
                  <Route path='/' exact component={ProgramScreen} />
                </Switch>
              </Router>
            </SnackbarProvider>
          </WalletProvider>
        </TezosProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
