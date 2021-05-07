import { TokenConfig } from '../../runtime/config/types';
import { PaperContent, PaperFooter } from '../../components/paper/Paper';
import useTokenBalance from '../token/hook/useTokenBalance';
import AmountToWrapInput from '../../components/form/AmountToWrapInput';
import QuipuIcon from '../../components/icons/QuipuIcon';
import LabelAndValue from '../../components/form/LabelAndValue';
import LabelAndAsset from '../../components/form/LabelAndAsset';
import LoadableButton from '../../components/button/LoadableButton';
import AssetSummary from '../../components/form/AssetSummary';
import useStake, { StakingStatus } from './hook/useStake';
import WalletConnection from '../wallet/WalletConnection';
import { useCallback } from 'react';
import useTotalSupply from '../farming/hook/useTotalSupply';
import useStakedBalance from '../farming/hook/useStakedBalance';

export type StakeProps = {
  token: TokenConfig
}

export default function Stake({ token }: StakeProps) {
  const { totalSupply, loading: supplyLoading } = useTotalSupply(token.farmingContract);
  const { loading: balanceLoading, balance, refresh } = useTokenBalance(token.poolContract, 0);
  const { loading: stakedLoading, balance: stakedBalance } = useStakedBalance(token.farmingContract);
  const { amount, changeAmount, stakingStatus, stake } = useStake(token, balance);

  const handleStake = useCallback(async () => {
    await stake();
    await refresh();
  }, [stake, refresh]);

  return (
    <>
      <PaperContent>
        <AmountToWrapInput
          balance={balance}
          decimals={6}
          symbol={'LP Token'}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={balanceLoading}
          disabled={stakingStatus === StakingStatus.NOT_CONNECTED}
          icon={QuipuIcon}
        />
      </PaperContent>
      <PaperContent alternate>
        <LabelAndValue label={'Pool contract'} value={token.poolContract} />
        <LabelAndAsset label={'Total staked'}
                       emptyState={supplyLoading}
                       emptyStatePlaceHolder={'Loading…'}
                       value={totalSupply}
                       decimals={6}
                       symbol={'LP Token'} />
        <LabelAndAsset
          label={'Your current share'}
          value={stakedBalance}
          emptyState={stakedLoading}
          emptyStatePlaceHolder={'Loading…'}
          decimals={6}
          symbol={'LP Token'} />

      </PaperContent>
      <AssetSummary decimals={6} symbol={'LP Token'} label={'Your new share will be'} value={amount.plus(stakedBalance)} />
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
