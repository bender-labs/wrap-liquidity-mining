import { FarmingContractInfoProps } from '../types';
import LabelAndValue from '../../../components/form/LabelAndValue';
import LabelAndAsset from '../../../components/form/LabelAndAsset';
import { PaperContent } from '../../../components/paper/Paper';


export default function FarmingContractInfo({ program, contractBalances }: FarmingContractInfoProps) {

  return (<PaperContent alternate>
    <LabelAndValue label={'Pool contract'} value={program.poolContract} />
    <LabelAndValue label={'Farming contract'} value={program.farmingContract} />
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
    <LabelAndAsset
      label={'Your pending reward'}
      value={contractBalances.reward}
      emptyState={contractBalances.loading}
      emptyStatePlaceHolder={'Loading…'}
      decimals={8}
      symbol={'WRAP'} />

  </PaperContent>);
}
