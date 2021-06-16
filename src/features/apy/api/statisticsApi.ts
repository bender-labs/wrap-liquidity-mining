import axios, {AxiosInstance} from 'axios';
import { LiquidityMiningApy } from './types';

export default class StatisticsApi {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({baseURL, timeout: 10000});
    }

    public fetchLiquidityMiningApy(): Promise<Array<LiquidityMiningApy>> {
        return this.client.get(`/liquidity-mining/apy`).then(({data}) => data);
    }
}
