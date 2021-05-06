import { useConfig } from '../../../runtime/config/ConfigContext';
import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

export function useProgram(symbol: string) {
  const { tokens } = useConfig();
  const history = useHistory();
  const token = useMemo(() => {
    return tokens.find((t) => t.symbol === symbol);
  }, [symbol, tokens]);

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
  }, [history, token]);

  return { token: token! };
}
