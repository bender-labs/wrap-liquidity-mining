import { Container, createStyles, makeStyles, Tab, Tabs } from '@material-ui/core';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { useCallback } from 'react';
import { paths } from '../routes';

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
  </Container>);
}
