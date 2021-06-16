import {
  Container,
  Tab,
  Tabs,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import React, { useCallback } from 'react';
import { paths } from '../routes';
import { Route, Switch } from 'react-router-dom';
import Stake from '../features/stake/Stake';
import { ProgramConfig } from '../runtime/config/types';
import { useProgram } from '../features/program/hook/useProgram';
import useFarmingContract from '../features/farming/hook/useFarmingContract';
import { FarmingContractActionsProps } from '../features/farming/types';
import BigNumber from 'bignumber.js';
import { Unstake } from '../features/unstake/Unstake';
import useTokenBalance from '../features/token/hook/useTokenBalance';
import Claim from '../features/claim/Claim';

const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      color: 'white',
      marginBottom: '10px',
    },
    mainContainer: {
      marginBottom: '20px'
    },
    tab: {
      textTransform: 'none',
      fontWeight: 900,
    },
  })
);

function WithProgram(
  program: ProgramConfig,
  onApply: () => void,
  contractBalances: {
    totalSupply: BigNumber;
    staked: BigNumber;
    reward: BigNumber;
    loading: boolean;
  },
  userBalance: { value: BigNumber; loading: boolean },
  Comp: React.FunctionComponent<FarmingContractActionsProps>
) {
  return () => (
    <Comp
      onApply={onApply}
      program={program}
      balance={userBalance}
      contractBalances={contractBalances}
    />
  );
}

export default function ProgramScreen() {
  const { path } = useRouteMatch();
  const { token: symbol } = useParams() as { token: string };
  const { program } = useProgram(symbol);
  const {
    farmingContract,
    pool: { contract: poolContract },
  } = program;
  const {
    contractBalances,
    contractLoading,
    refreshFarmingContract,
  } = useFarmingContract(farmingContract);
  const { balance, loading, refresh } = useTokenBalance(poolContract, 0);

  const history = useHistory();
  const classes = useStyles();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath.replace(':token', farmingContract));
    },
    [farmingContract, history]
  );

  const onApply = () => {
    // noinspection JSIgnoredPromiseFromCall
    refreshFarmingContract();
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  };

  return (
    <Container maxWidth="sm" className={classes.mainContainer}>
      <Tabs
        value={path}
        onChange={onTabChange}
        className={classes.bg}
        indicatorColor="primary"
        variant="fullWidth"
      >
        <Tab label="Stake" value={paths.STAKE} className={classes.tab} />
        <Tab label="Unstake" value={paths.UNSTAKE} className={classes.tab} />
        <Tab label="Claim" value={paths.CLAIM} className={classes.tab} />
      </Tabs>
      <Switch>
        <Route
          path={paths.STAKE}
          exact
          component={WithProgram(
            program,
            onApply,
            {
              ...contractBalances,
              loading: contractLoading,
            },
            { value: balance, loading },
            Stake
          )}
        />
        <Route
          path={paths.UNSTAKE}
          exact
          component={WithProgram(
            program,
            onApply,
            {
              ...contractBalances,
              loading: contractLoading,
            },
            { value: balance, loading },
            Unstake
          )}
        />

        <Route
          path={paths.CLAIM}
          exact
          component={WithProgram(
            program,
            onApply,
            {
              ...contractBalances,
              loading: contractLoading,
            },
            { value: balance, loading },
            Claim
          )}
        />
      </Switch>
    </Container>
  );
}
