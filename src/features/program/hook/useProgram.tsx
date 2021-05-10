import { useConfig } from '../../../runtime/config/ConfigContext';
import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

export function useProgram(address: string) {
  const { programs } = useConfig();
  const history = useHistory();
  const program = useMemo(() => {
    return programs.find((t) => t.farmingContract === address);
  }, [address, programs]);

  useEffect(() => {
    if (!program) {
      history.push('/');
    }
  }, [history, program]);

  return { program: program! };
}
