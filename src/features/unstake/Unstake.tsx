import { PaperContent, PaperFooter } from '../../components/paper/Paper';
import AmountToWrapInput from '../../components/form/AmountToWrapInput';
import QuipuIcon from '../../components/icons/QuipuIcon';
import AssetSummary from '../../components/form/AssetSummary';
import LoadableButton from '../../components/button/LoadableButton';
import WalletConnection from '../wallet/WalletConnection';
import useUnstake, { UnstakeStatus } from './hook/useUnstake';
import React, { useCallback } from 'react';
import { FarmingContractActionsProps } from '../farming/types';
import FarmingContractInfo from '../farming/components/FarmingContractInfo';
import FarmingContractHeader from '../farming/components/FarmingContractHeader';

export function Unstake({
  program,
  onApply,
  contractBalances,
  balance,
}: FarmingContractActionsProps) {
  const { unstakeStatus, amount, changeAmount, unstake } = useUnstake(
    program,
    contractBalances.staked
  );

  const handleWithdrawal = useCallback(async () => {
    await unstake();
    onApply();
  }, [onApply, unstake]);

  return (
    <>
      <FarmingContractHeader program={program} />
      <PaperContent>
        <AmountToWrapInput
          balance={contractBalances.staked}
          decimals={6}
          symbol={'LP Token'}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={contractBalances.loading}
          disabled={
            unstakeStatus === UnstakeStatus.NOT_CONNECTED ||
            contractBalances.staked.isZero() ||
            contractBalances.staked.isNaN()
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
        value={contractBalances.staked.minus(amount)}
      />
      <PaperFooter>
        {unstakeStatus !== UnstakeStatus.NOT_CONNECTED && (
          <LoadableButton
            loading={unstakeStatus === UnstakeStatus.UNSTAKING}
            onClick={handleWithdrawal}
            disabled={unstakeStatus !== UnstakeStatus.READY}
            text={'Unstake'}
            variant={'contained'}
          />
        )}
        {unstakeStatus === UnstakeStatus.NOT_CONNECTED && (
          <WalletConnection withConnectionStatus={false} />
        )}
      </PaperFooter>
    </>
  );
}
