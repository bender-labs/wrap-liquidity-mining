import { Container, createStyles, makeStyles, Tab, Tabs } from '@material-ui/core';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import React, { useCallback } from 'react';
import { paths } from '../routes';
import { Route, Switch } from 'react-router-dom';
import Stake from '../features/stake/Stake';
import { TokenConfig } from '../runtime/config/types';
import { useProgram } from '../features/program/hook/useProgram';

const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      color: 'white',
      marginBottom: '10px'
    },
    tab: {
      textTransform: 'none',
      fontWeight: 900
    }
  })
);

function WithToken(Comp: React.FunctionComponent<{ token: TokenConfig }>) {
  const { token: symbol } = useParams() as { token: string };
  const { token } = useProgram(symbol);
  return () => (<Comp token={token} />);

}

export default function ProgramScreen() {
  const { path } = useRouteMatch();
  const { token } = useParams() as { token: string };
  const history = useHistory();
  const classes = useStyles();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath.replace(':token', token));
    },
    [history, token]
  );

  return (<Container maxWidth='md'>
    <Tabs
      value={path}
      onChange={onTabChange}
      className={classes.bg}
      indicatorColor='primary'
      variant='fullWidth'
    >
      <Tab
        label='Stake'
        value={paths.STAKE}
        className={classes.tab}
      />
      <Tab
        label='Withdraw'
        value={paths.WITHDRAW}
        className={classes.tab}
      />
      <Tab
        label='Claim'
        value={paths.CLAIM}
        className={classes.tab}
      />
    </Tabs>
    <Switch>
      <Route path={paths.STAKE} exact component={WithToken(Stake)} />
    </Switch>
  </Container>);
}
