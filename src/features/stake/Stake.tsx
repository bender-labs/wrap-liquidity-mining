import { PaperContent, PaperFooter } from '../../components/paper/Paper';
import AmountToWrapInput from '../../components/form/AmountToWrapInput';
import QuipuIcon from '../../components/icons/QuipuIcon';
import LoadableButton from '../../components/button/LoadableButton';
import AssetSummary from '../../components/form/AssetSummary';
import useStake, { StakingStatus } from './hook/useStake';
import WalletConnection from '../wallet/WalletConnection';
import React, { useCallback } from 'react';
import { FarmingContractActionsProps } from '../farming/types';
import FarmingContractInfo from '../farming/components/FarmingContractInfo';
import FarmingContractHeader from '../farming/components/FarmingContractHeader';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(() =>
  createStyles({
    warning: {
      fontSize: '10px',
    }
  })
)

export default function Stake({
  program,
  contractBalances,
  onApply,
  balance,
}: FarmingContractActionsProps) {
  const { amount, changeAmount, stakingStatus, stake } = useStake(
    program,
    balance.value
  );

  const handleStake = useCallback(async () => {
    await stake();
    onApply();
  }, [onApply, stake]);

  const classes = useStyles()

  return (
    <>

      <FarmingContractHeader program={program} />
      <PaperContent>
        <AmountToWrapInput
          balance={balance.value}
          decimals={6}
          symbol={'LP Token'}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={balance.loading}
          disabled={
            stakingStatus === StakingStatus.NOT_CONNECTED ||
            balance.value.isZero() ||
            balance.value.isNaN()
          }
          icon={QuipuIcon}
        />
      </PaperContent>
      <FarmingContractInfo
        program={program}
        contractBalances={contractBalances}
        balance={balance}
      />
      <AssetSummary
        decimals={6}
        symbol={'LP Token'}
        label={'Your new share will be'}
        value={amount.plus(contractBalances.staked)}
      />
      <PaperFooter>
        {stakingStatus === StakingStatus.READY && (
          <Typography className={classes.warning}> If you have pending rewards, it will be automatically claimed while staking</Typography>
        )}
        {stakingStatus !== StakingStatus.NOT_CONNECTED && (

          <LoadableButton
            loading={stakingStatus === StakingStatus.STAKING}
            onClick={handleStake}
            disabled={stakingStatus !== StakingStatus.READY}
            text={'Stake'}
            variant={'contained'}
          />
        )}
        {stakingStatus === StakingStatus.NOT_CONNECTED && (
          <WalletConnection withConnectionStatus={false} />
        )}
      </PaperFooter>
    </>
  );
}
