import { TokenConfig } from '../../runtime/config/types';
import { PaperContent } from '../../components/paper/Paper';
import { createStyles, Grid, makeStyles } from '@material-ui/core';
import TezosTokenIcon from '../../components/icons/TezosTokenIcon';

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
  }
}));

function Program({ token, onClick }: { token: TokenConfig, onClick: () => void }) {
  const classes = useStyle();
  return (
    <PaperContent className={classes.main}>
      <Grid container justify={'space-between'} alignItems={'center'} onClick={onClick} className={classes.item}>
        <Grid item><TezosTokenIcon url={token.thumbnailUri} /></Grid>
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
