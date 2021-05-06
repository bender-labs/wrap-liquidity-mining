import { TokenConfig } from '../../runtime/config/types';
import { PaperContent } from '../../components/paper/Paper';
import { createStyles, Grid, makeStyles } from '@material-ui/core';
import TezosTokenIcon from '../../components/icons/TezosTokenIcon';
import quipu from './quipu.png';

export type ProgramListProps = {
  tokens: TokenConfig[]
  onTokenSelect: (symbol: string) => void
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
    '& :last-child': { marginLeft: '-30px'}
  }
}));

function Program({ token, onClick }: { token: TokenConfig, onClick: () => void }) {
  const classes = useStyle();
  return (
    <PaperContent className={classes.main}>
      <Grid container justify={'space-between'} alignItems={'center'} onClick={onClick} className={classes.item}>
        <Grid item className={classes.images}>
          <img src={quipu} alt='quipuswap' />
          <TezosTokenIcon url={token.thumbnailUri} /></Grid>
        <Grid item>{token.name}</Grid>
        <Grid item>{token.symbol}</Grid>
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
