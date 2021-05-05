import { Box, Container, createStyles, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useConfig } from '../runtime/config/ConfigContext';
import ProgramList from '../features/program/ProgramList';

const useStyles = makeStyles((theme) => createStyles({
  subtitle: {
    color: theme.palette.primary.dark
  }
}));

export default function ProgramScreen() {
  const classes = useStyles();
  const { tokens } = useConfig();
  return (
    <Container maxWidth={'md'}>
      <Box mt={2} textAlign={'center'}>
        <Typography component={'h1'} variant={'h2'} color={'primary'}>Liquidity Mining Programs</Typography>
        <Typography variant={'subtitle1'} className={classes.subtitle}>Select a program to stake, withdraw or claim your
          rewards.</Typography>
      </Box>
      <ProgramList
        tokens={tokens}
        onTokenSelect={() => {
        }} />

    </Container>);
}
