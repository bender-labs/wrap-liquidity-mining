import { formatOptions } from './numberFormat';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    textAlign: 'center',
    padding: '30px 0',
    '& input': {
      fontFamily: 'inherit',
      textAlign: 'center',
    },
  },
  large: {
    '& input': {
      fontSize: 52,
    },
  },
  medium: {
    '& input': {
      fontSize: 42,
    },
  },
  small: {
    '& input': {
      fontSize: 32,
    },
  },
  smallest: {
    '& input': {
      fontSize: 22,
    },
  },
  input: {
    fontSize: 52,
    textAlign: 'center',
  },
}));

export type AmountInputProps = {
  value: string | number;
  symbol: string;
  decimals: number;
  onChange: (v: string) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  focus?: boolean;
  disabled?: boolean;
  icon: React.ComponentType<any>;
};

export default function AmountInput({
  symbol,
  value,
  decimals,
  onChange,
  error,
  helperText,
  focus = false,
  disabled = false,
  icon: Icon,
}: AmountInputProps) {
  const classes = useStyles();
  const handleOnChange = (e: NumberFormatValues) => {
    onChange(e.value);
  };

  return (
    <div className={`${classes.container} ${classes.medium}`}>
      <NumberFormat
        displayType="input"
        className={classes.input}
        placeholder={`0 ${symbol}`}
        autoFocus={focus}
        suffix={` ${symbol}`}
        value={value}
        decimalScale={decimals}
        customInput={TextField}
        fullWidth
        error={error}
        helperText={helperText}
        disabled={disabled}
        variant={'filled'}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'} disablePointerEvents={true}>
              <Icon />
            </InputAdornment>
          ),
        }}
        onValueChange={handleOnChange}
        {...formatOptions}
      />
    </div>
  );
}
