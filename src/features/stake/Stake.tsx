import { PaperContent, PaperFooter } from '../../components/paper/Paper';
import AmountToWrapInput from '../../components/form/AmountToWrapInput';
import QuipuIcon from '../../components/icons/QuipuIcon';
import LabelAndValue from '../../components/form/LabelAndValue';
import LabelAndAsset from '../../components/form/LabelAndAsset';
import LoadableButton from '../../components/button/LoadableButton';
import AssetSummary from '../../components/form/AssetSummary';
import useStake, { StakingStatus } from './hook/useStake';
import WalletConnection from '../wallet/WalletConnection';
import { useCallback } from 'react';
import { FarmingContractActionsProps } from '../program/types';


export default function Stake({ program, contractBalances, onApply, balance }: FarmingContractActionsProps) {
  const { amount, changeAmount, stakingStatus, stake } = useStake(program, balance.value);

  const handleStake = useCallback(async () => {
    await stake();
    onApply();
  }, [onApply, stake]);

  return (
    <>
      <PaperContent>
        <AmountToWrapInput
          balance={balance.value}
          decimals={6}
          symbol={'LP Token'}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={balance.loading}
          disabled={stakingStatus === StakingStatus.NOT_CONNECTED || balance.value.isZero() || balance.value.isNaN()}
          icon={QuipuIcon}
        />
      </PaperContent>
      <PaperContent alternate>
        <LabelAndValue label={'Pool contract'} value={program.poolContract} />
        <LabelAndAsset label={'Total staked'}
                       emptyState={contractBalances.loading}
                       emptyStatePlaceHolder={'Loading…'}
                       value={contractBalances.totalSupply}
                       decimals={6}
                       symbol={'LP Token'} />
        <LabelAndAsset
          label={'Your current share'}
          value={contractBalances.staked}
          emptyState={contractBalances.loading}
          emptyStatePlaceHolder={'Loading…'}
          decimals={6}
          symbol={'LP Token'} />

      </PaperContent>
      <AssetSummary decimals={6} symbol={'LP Token'} label={'Your new share will be'}
                    value={amount.plus(contractBalances.staked)} />
      <PaperFooter>
        {stakingStatus !== StakingStatus.NOT_CONNECTED &&
        <LoadableButton
          loading={stakingStatus === StakingStatus.STAKING}
          onClick={handleStake}
          disabled={stakingStatus !== StakingStatus.READY}
          text={'Stake'}
          variant={'contained'} />}
        {stakingStatus === StakingStatus.NOT_CONNECTED && <WalletConnection withConnectionStatus={false} />}
      </PaperFooter>
    </>);
}
