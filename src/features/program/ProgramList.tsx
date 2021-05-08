import { ProgramConfig } from '../../runtime/config/types';
import { PaperContent } from '../../components/paper/Paper';
import { createStyles, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import TezosTokenIcon from '../../components/icons/TezosTokenIcon';
import TezosIcon from '../../components/icons/TezosIcon';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';

export type ProgramListProps = {
  programs: ProgramConfig[]
  onProgramSelect: (farm: string) => void
}

const useStyle = makeStyles(() => createStyles({
  main: {
    borderRadius: '10px 10px 10px 10px'
  },
  item: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  images: {
    '& img': { width: 60, height: 60, marginRight: 5, verticalAlign: 'middle' },
    '& :first-child': { left: '0', position: 'relative' },
    '& :last-child': { marginLeft: '-20px' }
  }
}));

function Program({ program, onClick }: { program: ProgramConfig, onClick: () => void }) {
  const classes = useStyle();
  const { pool: { quote, base: { thumbnailUri, symbol } } } = program;
  return (
    <PaperContent className={classes.main}>
      <Grid container justify={'space-between'} alignItems={'center'} onClick={onClick} className={classes.item}>
        <Grid item className={classes.images}>
          <TezosTokenIcon url={thumbnailUri} />
          <TezosIcon />
        </Grid>
        <Grid item><Typography variant={'h4'}>Quipuswap {symbol}/{quote.toUpperCase()}</Typography></Grid>
        <Grid item>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
      </Grid>
    </PaperContent>
  );
}

export default function ProgramList({ programs, onProgramSelect }: ProgramListProps) {
  return (<Grid container spacing={2} direction={'column'}>
    {programs.map((t) =>
      <Grid item key={t.farmingContract}>
        <Program program={t} onClick={() => onProgramSelect(t.farmingContract)} />
      </Grid>
    )}
  </Grid>);
}
