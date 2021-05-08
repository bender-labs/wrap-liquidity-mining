import { PaperContent, PaperFooter } from '../../components/paper/Paper';
import AmountToWrapInput from '../../components/form/AmountToWrapInput';
import QuipuIcon from '../../components/icons/QuipuIcon';
import LabelAndValue from '../../components/form/LabelAndValue';
import LabelAndAsset from '../../components/form/LabelAndAsset';
import AssetSummary from '../../components/form/AssetSummary';
import LoadableButton from '../../components/button/LoadableButton';
import WalletConnection from '../wallet/WalletConnection';
import useUnstake, { UnstakeStatus } from './hook/useUnstake';
import { useCallback } from 'react';
import { FarmingContractActionsProps } from '../program/types';


export function Unstake({ program, onApply, contractBalances }: FarmingContractActionsProps) {

  const { unstakeStatus, amount, changeAmount, unstake } = useUnstake(program, contractBalances.staked);

  const handleWithdrawal = useCallback(async () => {
    await unstake();
    onApply();
  }, [onApply, unstake]);

  return (<>
    <PaperContent>
      <AmountToWrapInput
        balance={contractBalances.staked}
        decimals={6}
        symbol={'LP Token'}
        onChange={changeAmount}
        amountToWrap={amount}
        balanceLoading={contractBalances.loading}
        disabled={unstakeStatus === UnstakeStatus.NOT_CONNECTED || contractBalances.staked.isZero() || contractBalances.staked.isNaN()}
        icon={QuipuIcon}
      />
    </PaperContent>
    <PaperContent alternate>
      <LabelAndValue label={'Farming contract'} value={program.farmingContract} />
      <LabelAndAsset label={'Total staked'}
                     emptyState={contractBalances.loading}
                     emptyStatePlaceHolder={'Loading…'}
                     value={contractBalances.totalSupply}
                     decimals={6}
                     symbol={'LP Token'} />
    </PaperContent>
    <AssetSummary decimals={6} symbol={'LP Token'} label={'Your new share will be'}
                  value={contractBalances.staked.minus(amount)} />
    <PaperFooter>
      {unstakeStatus !== UnstakeStatus.NOT_CONNECTED &&
      <LoadableButton
        loading={unstakeStatus === UnstakeStatus.STAKING}
        onClick={handleWithdrawal}
        disabled={unstakeStatus !== UnstakeStatus.READY}
        text={'Unstake'}
        variant={'contained'} />}
      {unstakeStatus === UnstakeStatus.NOT_CONNECTED && <WalletConnection withConnectionStatus={false} />}
    </PaperFooter>
  </>);
}
