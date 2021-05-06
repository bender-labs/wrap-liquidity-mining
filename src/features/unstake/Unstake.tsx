import { PaperContent, PaperFooter } from '../../components/paper/Paper';
import AmountToWrapInput from '../../components/form/AmountToWrapInput';
import QuipuIcon from '../../components/icons/QuipuIcon';
import LabelAndValue from '../../components/form/LabelAndValue';
import LabelAndAsset from '../../components/form/LabelAndAsset';
import BigNumber from 'bignumber.js';
import AssetSummary from '../../components/form/AssetSummary';
import LoadableButton from '../../components/button/LoadableButton';
import WalletConnection from '../wallet/WalletConnection';
import { TokenConfig } from '../../runtime/config/types';
import useUnstake, { UnstakeStatus } from './hook/useUnstake';
import { useCallback } from 'react';

export type WithdrawProps = {
  token: TokenConfig
}

export function Unstake({ token }: WithdrawProps) {
  const { unstakeStatus } = useUnstake(token, new BigNumber(0));

  const handleWithdrawal = useCallback(() => {

  }, []);

  return (<>
    <PaperContent>
      <AmountToWrapInput
        balance={new BigNumber('')}
        decimals={6}
        symbol={'LP Token'}
        onChange={() => {
        }}
        amountToWrap={new BigNumber('')}
        balanceLoading={false}
        disabled={false}
        icon={QuipuIcon}
      />
    </PaperContent>
    <PaperContent alternate>
      <LabelAndValue label={'Farming contract'} value={token.farmingContract} />
      <LabelAndAsset label={'Total staked'} value={new BigNumber(10)} decimals={6} symbol={'LP Token'} />
    </PaperContent>
    <AssetSummary decimals={6} symbol={'LP Token'} label={'Your new share will be'} value={new BigNumber(0)} />
    <PaperFooter>
      {unstakeStatus !== UnstakeStatus.NOT_CONNECTED &&
      <LoadableButton
        loading={unstakeStatus === UnstakeStatus.STAKING}
        onClick={handleWithdrawal}
        disabled={unstakeStatus !== UnstakeStatus.READY}
        text={'Withdraw'}
        variant={'contained'} />}
      {unstakeStatus === UnstakeStatus.NOT_CONNECTED && <WalletConnection withConnectionStatus={false} />}
    </PaperFooter>
  </>);
}
