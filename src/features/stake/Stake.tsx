import { TokenConfig } from '../../runtime/config/types';
import { PaperContent, PaperFooter } from '../../components/paper/Paper';
import useTokenBalance from '../token/hook/useTokenBalance';
import AmountToWrapInput from '../../components/form/AmountToWrapInput';
import BigNumber from 'bignumber.js';
import QuipuIcon from '../../components/icons/QuipuIcon';
import LabelAndValue from '../../components/form/LabelAndValue';
import LabelAndAsset from '../../components/form/LabelAndAsset';
import LoadableButton from '../../components/button/LoadableButton';
import AssetSummary from '../../components/form/AssetSummary';
import useStake, { StakingStatus } from './hook/useStake';
import WalletConnection from '../wallet/WalletConnection';
import { useCallback } from 'react';

export type StakeProps = {
  token: TokenConfig
}

export default function Stake({ token }: StakeProps) {
  const { loading, balance, refresh } = useTokenBalance(token.poolContract, 0);
  const { amount, changeAmount, stakingStatus, stake } = useStake(token, balance);

  const handleStake = useCallback(async () => {
    await stake();
    await refresh();
  },[stake, refresh]);

  return (
    <>
      <PaperContent>
        <AmountToWrapInput
          balance={balance}
          decimals={6}
          symbol={'LP Token'}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={loading}
          disabled={stakingStatus === StakingStatus.NOT_CONNECTED}
          icon={QuipuIcon}
        />
      </PaperContent>
      <PaperContent alternate>
        <LabelAndValue label={'Pool contract'} value={token.poolContract} />
        <LabelAndAsset label={'Total staked'} value={new BigNumber(10)} decimals={6} symbol={'LP Token'} />
        <LabelAndAsset label={'Your current share'} value={new BigNumber(0)} decimals={6} symbol={'LP Token'} />

      </PaperContent>
      <AssetSummary decimals={6} symbol={'LP Token'} label={'Your new share will be'} value={amount} />
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
