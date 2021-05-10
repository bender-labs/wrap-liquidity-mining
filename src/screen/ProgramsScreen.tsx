import { Box, Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useConfig } from '../runtime/config/ConfigContext';
import ProgramList from '../features/program/ProgramList';
import { useHistory } from 'react-router';
import { opPage } from '../routes';

const useStyles = makeStyles((theme) => createStyles({
  subtitle: {
    color: '#000000',
    textAlign: 'center'
  },
  test: {
    borderRadius: '0 0 10px 10px',
    padding: '30px',
    backgroundColor: '#e5e5e5'
  },
  title: {
    color: 'white',
    borderBottom: '3px solid #ffd000',
    textAlign: 'center',
    paddingBottom: '15px'
  },
  titleCenter: {
    justifyItems: 'center'
  }
}));


export default function ProgramsScreen() {
  const classes = useStyles();
  const history = useHistory();
  const { programs } = useConfig();
  return (
    <Container  maxWidth={'md'}>

      <Box className={classes.titleCenter} my={2} >
        <Typography component={'h1'} variant={'h2'} className={classes.title}>Liquidity Mining Programs</Typography>

  
      </Box>
      <Box className={classes.test}>
        <Typography variant={'subtitle1'} className={classes.subtitle}>Select an option to stake, unstake or claim your
          rewards.</Typography>
      <ProgramList

        programs={programs}
        onProgramSelect={(t) => {
          history.push(opPage(t));
        }}
      />
    </Container>
  );

}
