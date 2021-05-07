import { TokenConfig } from '../../runtime/config/types';
import { PaperContent } from '../../components/paper/Paper';
import { createStyles, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import TezosTokenIcon from '../../components/icons/TezosTokenIcon';
import TezosIcon from '../../components/icons/TezosIcon';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';

export type ProgramListProps = {
  tokens: TokenConfig[]
  onTokenSelect: (symbol: string) => void
}

const useStyle = makeStyles(() => createStyles({
  main: {
    borderRadius: '10px 10px 10px 10px',
    backgroundColor: 'white',
    transition: 'background-color 1s ease',
    '&:hover': {
      backgroundColor: '#FFD000'
    },

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

function Program({ token, onClick }: { token: TokenConfig, onClick: () => void }) {
  const classes = useStyle();
  return (
    <PaperContent className={classes.main}>
      <Grid container justify={'space-between'} alignItems={'center'} onClick={onClick} className={classes.item}>
        <Grid item className={classes.images}>
          <TezosTokenIcon url={token.thumbnailUri} />
          <TezosIcon />
        </Grid>
        <Grid item><Typography variant={'h4'}>Quipuswap {token.symbol}/XTZ</Typography></Grid>
        <Grid item>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
      </Grid>
    </PaperContent>
  );
}

export default function ProgramList({ tokens, onTokenSelect }: ProgramListProps) {
  return (<Grid container spacing={2} direction={'column'}>
    {tokens.map((t) =>
      <Grid item key={t.symbol}>
        <Program token={t} onClick={() => onTokenSelect(t.symbol)} />
      </Grid>
    )}
  </Grid>);
}
