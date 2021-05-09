import {
  PaperActions,
  PaperHeader,
  PaperNav,
  PaperTitle,
} from '../../../components/paper/Paper';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { ProgramConfig } from '../../../runtime/config/types';
import { useHistory } from 'react-router';

export default function FarmingContractHeader({
  program,
}: {
  program: ProgramConfig;
}) {
  const history = useHistory();
  return (
    <PaperHeader>
      <PaperNav>
        <IconButton
          onClick={() => {
            history.push('/');
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </PaperNav>
      <PaperTitle>
        Quipuswap {program.pool.base.symbol}/{program.pool.quote.toUpperCase()}
      </PaperTitle>
      <PaperActions />
    </PaperHeader>
  );
}
