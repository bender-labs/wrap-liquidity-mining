import { ProgramConfig } from '../../runtime/config/types';
import { PaperContent } from '../../components/paper/Paper';
import {
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TezosTokenIcon from '../../components/icons/TezosTokenIcon';
import TezosIcon from '../../components/icons/TezosIcon';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';
import { LiquidityMiningApy } from '../apy/api/types';

export type ProgramListProps = {
  programs: ProgramConfig[];
  onProgramSelect: (farm: string) => void;
  liquidityMiningApys: Array<LiquidityMiningApy> | undefined;
};

const useStyle = makeStyles(() => createStyles({
  main: {
    borderRadius: '10px 10px 10px 10px',
    backgroundColor: '#ffffff',
    transition: 'background-color 1s ease',
    '&:hover': {
      backgroundColor: '#FFD000'
    },
  },
  mainNotRunning: {
    borderRadius: '10px 10px 10px 10px',
    backgroundColor: '#C1C1C1',
  },
  option: {
    fontSize: '20px'
  },
  apy: {
    fontSize: '14px',

    '& > span': {
      fontWeight: 900,
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
  },
}));


function Program({
  program,
  apy,
  onClick,
}: {
  program: ProgramConfig;
  apy: LiquidityMiningApy | undefined;
  onClick: () => void;
}) {
  const classes = useStyle();
  const {
    pool: {
      quote,
      base: { thumbnailUri, symbol },
    },
  } = program;
  return (
    <PaperContent className={apy && apy.running ? classes.main : classes.mainNotRunning}>
      <Grid
        container
        justify={'space-between'}
        alignItems={'center'}
        onClick={onClick}
        className={classes.item}
      >
        <Grid item className={classes.images}>
          <TezosTokenIcon url={thumbnailUri} />
          <TezosIcon />
        </Grid>
        <Grid item>
          <Typography className={classes.option}>
            Quipuswap {symbol}/{quote.toUpperCase()}
          </Typography>
          { apy && <Typography className={classes.apy}>
            APY: <span>{parseFloat(apy.apy).toFixed(0)}%</span>
            {' '}APR: <span>{parseFloat(apy.apr).toFixed(0)}%</span>
          </Typography> }
        </Grid>
        <Grid item>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
      </Grid>
    </PaperContent>
  );
}

export default function ProgramList({
  programs,
  onProgramSelect,
  liquidityMiningApys
}: ProgramListProps) {
  return (
    <Grid container spacing={2} direction={'column'}>
      {programs.map((t) => (
        <Grid item key={t.farmingContract}>
          <Program
            program={t}
            onClick={() => onProgramSelect(t.farmingContract)}
            apy={liquidityMiningApys ? liquidityMiningApys.find(l => l.farmingContract === t.farmingContract) : undefined}
          />
        </Grid>
      ))}
    </Grid>
  );
}
