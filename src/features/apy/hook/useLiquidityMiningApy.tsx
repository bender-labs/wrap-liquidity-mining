import StatisticsApi from '../api/statisticsApi';
import { useEffect, useMemo, useState } from 'react';
import { LiquidityMiningApy } from '../api/types';
import { useConfig } from '../../../runtime/config/ConfigContext';

export function useLiquidityMiningApy() {
  const [liquidityMiningApys, setLiquidityMiningApys] = useState<Array<LiquidityMiningApy>>();
  const {statisticsApiUrl} = useConfig();
  const api = useMemo(() => new StatisticsApi(statisticsApiUrl), [statisticsApiUrl]);

  useEffect(() => {
    const loadLiquidityMiningApy = async () => {
      setLiquidityMiningApys(await api.fetchLiquidityMiningApy());
    };
    // noinspection JSIgnoredPromiseFromCall
    loadLiquidityMiningApy();
  }, [api]);

  return {
    liquidityMiningApys
  };
}