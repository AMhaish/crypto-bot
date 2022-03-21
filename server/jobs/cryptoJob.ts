import {
  BinanceService,
  CacheService,
  DealsService,
  LoggingService,
} from "../services";
import { TradingPairType, IJob } from "../models";
import { balanceOf, priceOf } from "../utils";

class CryptoJob implements IJob {
  constructor(
    private bnbService: BinanceService,
    private dealsService: DealsService,
    private logger: LoggingService //private cacheService: CacheService
  ) {}

  async execute(pairs: TradingPairType[]) {
    try {
      const prices = await this.bnbService.getPrices();
      const balances = await this.bnbService.getBalances();
      const promises = pairs.map(
        (tp) =>
          new Promise(async (resolve) => {
            try {
              await this.dealsService.checkDeals(
                tp,
                priceOf(prices, tp),
                balanceOf(balances, tp.source)
              );
              resolve(true);
            } catch (ex: any) {
              this.logger.logError(ex.message, CryptoJob.name);
              resolve(false);
            }
          })
      );
      await Promise.all(promises);
    } catch (ex: any) {
      this.logger.logError(ex.message, CryptoJob.name);
    }
  }

  getJobCron(): string {
    const dayOfWeek = "*";
    const month = "*";
    const day = "*";
    const hour = "*";
    const minute = "*";
    const second = "*/20";
    return `${second} ${minute} ${hour} ${day} ${month} ${dayOfWeek}`;
  }
}
export default CryptoJob;
