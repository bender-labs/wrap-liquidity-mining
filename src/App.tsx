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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProgramsScreen from './screen/ProgramsScreen';
import { opPaths } from './routes';
import ProgramScreen from './screen/ProgramScreen';

const theme = createMuiTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <TezosProvider getLibrary={getLibrary}>
          <WalletProvider>
            <CssBaseline />
            <SnackbarProvider autoHideDuration={6000}>
              <Router>
                <AppBar />
                <Switch>
                  <Route path='/' exact component={ProgramsScreen} />
                  <Route path={opPaths} component={ProgramScreen} />
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
