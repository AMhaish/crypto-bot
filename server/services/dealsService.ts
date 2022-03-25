import LoggingService from "./loggingService";
import { CryptoConfigRepo, DealsRepo } from "../repos";
import { BinanceService } from ".";
import { Crypto, TradingPairType } from "../models";
import { CryptoConfig, Deal } from "../entities";
import { propertyOf } from "../utils";
import { CryptoConfigLoader } from "../loaders";
import { ObjectId } from "@mikro-orm/mongodb";

export default class DealsService {
  constructor(
    private repo: DealsRepo,
    private configLoader: CryptoConfigLoader,
    private configRepo: CryptoConfigRepo,
    private bnbService: BinanceService,
    private logger: LoggingService
  ) {}

  async checkDeals(
    pairType: TradingPairType,
    currentPrice: number,
    currentBalance: number
  ) {
    const openDeals = await this.repo.findAllByWhereClause({
      [propertyOf<Deal>("pair")]: pairType.pair,
      [propertyOf<Deal>("closedAt")]: undefined,
    });
    if (openDeals?.length > 0) {
      for (const deal of openDeals) {
        if (
          currentPrice <=
          deal.updatedPrice - deal.updatedPrice * deal.lossMargin
        ) {
          const closingPrice = parseFloat(
            (currentPrice - 0.003 * currentPrice).toPrecision(2)
          );
          await this._closeDeal(deal, closingPrice);
        } else if (
          currentPrice >=
          deal.updatedPrice + deal.updatedPrice * deal.profitMargin
        ) {
          await this._raiseDeal(deal, currentPrice);
        }
      }
    } else {
      const config = await this.configLoader
        .getPairConfig()
        ?.load(pairType.pair);
      if (config?.basePrice && currentPrice < config.basePrice) {
        let precision = pairType.source === Crypto.ETH ? 4 : 2;
        let quantity = parseFloat(
          (currentBalance / (4 * currentPrice)).toPrecision(precision)
        );
        if (quantity * currentPrice < 10) {
          quantity = parseFloat(
            (currentBalance / (2 * currentPrice)).toPrecision(precision)
          );
        }
        if (quantity * currentPrice < 10) {
          quantity = parseFloat(
            (currentBalance / currentPrice).toPrecision(precision)
          );
        }
        if (
          quantity * currentPrice > 10 &&
          currentBalance > quantity * currentPrice
        ) {
          await this.openDeal(pairType.pair, currentPrice, quantity);
        }
      }
    }
  }

  async openDeal(pair: string, price: number, quantity: number) {
    this.logger.logInfo(
      `Trying opening a deal for ${pair} on ${price} and quantity ${quantity}`,
      DealsService.name
    );
    try {
      const config = await this.configLoader.getPairConfig()?.load(pair);
      if (config) {
        const deal = new Deal();
        deal.buyPrice = price;
        deal.updatedPrice = price;
        deal.quantity = quantity;
        deal.lossMargin = config.lossMargin;
        deal.profitMargin = config.profitMargin;
        deal.pair = pair;
        await this.bnbService.createBuyOrder(pair, quantity, price);
        await this.repo.create(deal);
        this.logger.logInfo(
          `Opening a deal for ${deal.pair} on ${price} and quantity ${quantity}`,
          DealsService.name
        );
      } else {
        this.logger.logError(
          `No config found for pair ${pair}`,
          DealsService.name
        );
      }
    } catch (ex) {
      this.logger.logError(ex.body, DealsService.name);
    }
  }

  async _closeDeal(deal: Deal, price: number) {
    this.logger.logInfo(
      `Closing the deal of ${deal.pair} with quantity ${deal.quantity} on ${price}`,
      DealsService.name
    );
    try {
      await this.bnbService.createSellOrder(deal.pair, deal.quantity, price);
      deal.sellPrice = price;
      deal.closedAt = new Date();
      deal.profit = (deal.sellPrice - deal.buyPrice) * deal.quantity;
      await this.repo.updateObj(deal);
    } catch (ex) {
      this.logger.logError(ex.body, DealsService.name);
    }
  }

  async closeDeal(id: string, price: number) {
    const deal = await this.repo.findOne(new ObjectId(id));
    if (deal && !deal.closedAt) {
      this._closeDeal(deal, price);
    } else {
      throw new Error(`Deal with id ${id} does not exist`);
    }
  }

  async _raiseDeal(deal: Deal, price: number) {
    this.logger.logInfo(
      `Raising the deal of ${deal.pair} to ${price}`,
      DealsService.name
    );
    deal.updatedPrice = price;
    await this.repo.updateObj(deal);
  }

  async createConfig(
    basePrice: number,
    lossMargin: number,
    profitMargin: number,
    pair: string
  ) {
    const config = new CryptoConfig();
    config.basePrice = basePrice;
    config.lossMargin = lossMargin;
    config.profitMargin = profitMargin;
    config.pair = pair;
    this.configRepo.create(config);
  }
}
