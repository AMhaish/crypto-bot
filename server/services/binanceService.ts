import Binance from "node-binance-api";
import axios from "axios";
import LoggingService from "./loggingService";
const { BNB_API_KEY, BNB_API_SECRET } = process.env;

export default class BinanceService {
  binance: Binance;

  constructor(private logger: LoggingService) {
    this.binance = new Binance().options({
      APIKEY: BNB_API_KEY,
      APISECRET: BNB_API_SECRET,
    });
  }

  async getPrices() {
    return await this.binance.prices();
  }

  async getBalances() {
    return await this.binance.balance();
  }

  async createBuyOrder(pair: string, quantity: number, price: number) {
    await this.binance.buy(pair, quantity, price);
  }

  async createSellOrder(pair: string, quantity: number, price: number) {
    await this.binance.sell(pair, quantity, price);
  }
}