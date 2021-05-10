import { FarmingContractActionsProps } from '../farming/types';
import useClaim, { ClaimStatus } from './hook/useClaim';
import React, { useCallback } from 'react';
import { PaperFooter } from '../../components/paper/Paper';
import LoadableButton from '../../components/button/LoadableButton';
import WalletConnection from '../wallet/WalletConnection';
import FarmingContractInfo from '../farming/components/FarmingContractInfo';
import AssetSummary from '../../components/form/AssetSummary';
import FarmingContractHeader from '../farming/components/FarmingContractHeader';

export default function Claim({
  program,
  contractBalances,
  balance,
  onApply,
}: FarmingContractActionsProps) {
  const { claim, claimStatus } = useClaim(program);

  const handleClaim = useCallback(async () => {
    await claim();
    onApply();
  }, [onApply, claim]);

  return (
    <>
      <FarmingContractHeader program={program} />
      <FarmingContractInfo
        program={program}
        contractBalances={contractBalances}
        balance={balance}
      />
      <AssetSummary
        decimals={program.reward.decimals}
        symbol={program.reward.symbol}
        label={'Your will receive (estimate)'}
        value={contractBalances.reward}
      />
      <PaperFooter>
        {claimStatus !== ClaimStatus.NOT_CONNECTED && (
          <LoadableButton
            loading={claimStatus === ClaimStatus.CLAIMING}
            onClick={handleClaim}
            disabled={claimStatus !== ClaimStatus.READY}
            text={'Claim'}
            variant={'contained'}
          />
        )}
        {claimStatus === ClaimStatus.NOT_CONNECTED && (
          <WalletConnection withConnectionStatus={false} />
        )}
      </PaperFooter>
    </>
  );
}
