import { TokenConfig } from '../../runtime/config/types';
import { PaperContent } from '../../components/paper/Paper';
import useTokenBalance from '../token/hook/useTokenBalance';
import AmountToWrapInput from '../../components/form/AmountToWrapInput';
import BigNumber from 'bignumber.js';
import QuipuIcon from '../../components/icons/QuipuIcon';

export type StakeProps = {
  token: TokenConfig
}

export default function Stake({ token }: StakeProps) {
  const { loading, balance } = useTokenBalance(token.poolContract, 0);
  return (
    <PaperContent borderBottom>
      <AmountToWrapInput
        balance={balance}
        decimals={6}
        symbol={'LP Token'}
        onChange={() => {
        }}
        amountToWrap={new BigNumber('')}
        balanceLoading={loading}
        icon={QuipuIcon}
      />
    </PaperContent>);
}
