import { FarmingContractActionsProps } from '../farming/types';
import useClaim, { ClaimStatus } from './hook/useClaim';
import { useCallback } from 'react';
import { PaperFooter } from '../../components/paper/Paper';
import LoadableButton from '../../components/button/LoadableButton';
import WalletConnection from '../wallet/WalletConnection';
import FarmingContractInfo from '../farming/components/FarmingContractInfo';
import AssetSummary from '../../components/form/AssetSummary';

export default function Claim({ program, contractBalances, balance, onApply }: FarmingContractActionsProps) {
  const { claim, claimStatus } = useClaim(program);

  const handleClaim = useCallback(async () => {
    await claim();
    onApply();
  }, [onApply, claim]);

  return (<>
    <FarmingContractInfo program={program} contractBalances={contractBalances} balance={balance} />
    <AssetSummary decimals={8} symbol={'WRAP'} label={'Your will receive (estimate)'}
                  value={contractBalances.reward} />
    <PaperFooter>
      {claimStatus !== ClaimStatus.NOT_CONNECTED &&
      <LoadableButton
        loading={claimStatus === ClaimStatus.CLAIMING}
        onClick={handleClaim}
        disabled={claimStatus !== ClaimStatus.READY}
        text={'Claim'}
        variant={'contained'} />}
      {claimStatus === ClaimStatus.NOT_CONNECTED && <WalletConnection withConnectionStatus={false} />}
    </PaperFooter>
  </>);
}
