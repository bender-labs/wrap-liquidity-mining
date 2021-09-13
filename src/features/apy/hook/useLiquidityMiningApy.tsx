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
      const liquidityMiningContracts = await api.fetchLiquidityMiningApy();
      for (const liquidityMiningContract of liquidityMiningContracts) {
        if (!liquidityMiningContract.running) {
          liquidityMiningContract.apy = '0';
          liquidityMiningContract.apr = '0';
          liquidityMiningContract.totalRewardsPerDay = '0';
          liquidityMiningContract.totalRewardsPerDayInUsd = '0';
        }
      }
      setLiquidityMiningApys(liquidityMiningContracts);
    };
    // noinspection JSIgnoredPromiseFromCall
    loadLiquidityMiningApy();
  }, [api]);

  return {
    liquidityMiningApys
  };
}