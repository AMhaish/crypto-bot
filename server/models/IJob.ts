import { TradingPairType } from "./TradingPairs";

interface IJob {
  execute(pairs: TradingPairType[]): Promise<void>;
  getJobCron(): string;
}

export default IJob;
