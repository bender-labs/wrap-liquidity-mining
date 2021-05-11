import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import AmountInput from '../form/AmountInput';
import Link from '@material-ui/core/Link'

export function formatAmount(
  symbol: string,
  balance: BigNumber,
  decimals: number
) {
  return `${symbol} ${balance.shiftedBy(-decimals).toFormat()}`;
}

type Props = {
  balance: BigNumber;
  decimals: number;
  symbol: string;
  onChange: (amount: BigNumber) => void;
  amountToWrap: BigNumber;
  balanceLoading: boolean;
  disabled?: boolean;
  icon: React.ComponentType<any>;
};

export default function AmountToWrapInput({
  balance,
  amountToWrap,
  decimals,
  symbol,
  onChange,
  balanceLoading,
  icon,
  disabled,
}: Props) {
  const [[error, helperText], setUserError] = useState<[boolean, string]>([
    false,
    '',
  ]);

  const displayBalance = !balance.isNaN() || balanceLoading;

  useEffect(() => {
    if (!displayBalance) {
      setUserError([false, '']);
      return;
    }

    if (balanceLoading) {
      setUserError([false, 'Your balance is loading…']);
      return;
    }

    if (amountToWrap.gt(balance)) {
      setUserError([
        true,
        `Insufficient Balance of ${formatAmount(symbol, balance, decimals)}`,
      ]);
      return;
    }
    setUserError([
      false,
      `Balance: ${
        balance.isNaN() ? '' : formatAmount(symbol, balance, decimals)
      }`,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decimals, symbol, displayBalance, balance, error]);

  const handleOnChange = (v: string) => {
    if (error) {
      setUserError([false, '']);
    }
    const newAmount = new BigNumber(v).shiftedBy(decimals);
    if (displayBalance && newAmount.gt(balance)) {
      setUserError([
        true,
        `Insufficient Balance of ${formatAmount(symbol, balance, decimals)}`,
      ]);
    }
    onChange(newAmount);
  };

  const setMax = () => {
    onChange(balance);
  };

  return (
    <>
      <AmountInput
        value={amountToWrap?.shiftedBy(-decimals).toString()}
        decimals={decimals}
        disabled={disabled}
        symbol={symbol}
        onChange={handleOnChange}
        error={error}
        focus
        icon={icon}
        helperText={<>{helperText}<Link color={'textPrimary'} onClick={setMax}>(Max)</Link></>}
      />
    </>
  );
}
