import { Box } from '@material-ui/core';
import { createStyles, makeStyles, styled } from '@material-ui/core/styles';
import * as React from 'react';

export const PaperHeader = styled('header')((theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: theme.theme.spacing(),
  paddingBottom: theme.theme.spacing(),
  paddingLeft: theme.theme.spacing(),
  paddingRight: theme.theme.spacing(),
  backgroundColor: '#E5E5E5',
  fontSize: '20px',
  fontWeight: 'bold',
  boxShadow: 'inset 0 -7px 9px -7px rgba(0,0,0,0.4)'
}));

export const PaperTitle = styled('div')({
  justifySelf: 'center',
  textAlign: 'center',
  width: '100%'
});

export const PaperNav = styled('div')({
  justifySelf: 'flex-start',
  minWidth: 72
});

export const PaperActions = styled('div')({
  justifySelf: 'flex-end',
  minWidth: 72,
  '& > *': {
    margin: '0 4px',
    '&:first-child': {
      marginLeft: 0
    },
    '&:last-child': {
      marginRight: 0
    }
  }
});

export const PaperFooter = styled('div')({
  minHeight: '60px',
  padding: '20px 90px',
  textAlign: 'center',
  borderRadius: '0 0 10px 10px',
  backgroundColor: '#E5E5E5'
});

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: theme.spacing(),
      backgroundColor: '#E5E5E5'
    },
    borderBottom: {
      borderRadius: '0 0 10px 10px'
    },
    alternate: {
      backgroundColor: '#C4C4C4'
    }
  })
);

export function PaperContent(
  props: React.HTMLAttributes<HTMLDivElement> & {
    borderBottom?: boolean;
    alternate?: boolean;
  }
) {
  const classes = useStyles();
  const { borderBottom = false, alternate = false, ...rest } = props;
  const borderClass = borderBottom ? classes.borderBottom : '';
  const alternateClass = alternate ? classes.alternate : '';
  return (
    <Box
      {...rest}
      className={`${classes.card} ${props.className} ${borderClass} ${alternateClass}`}
    />
  );
}
