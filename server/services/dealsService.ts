import LoggingService from "./loggingService";
import { CryptoConfigRepo, DealsRepo } from "../repos";
import { BinanceService } from ".";
import { Crypto, TradingPairType } from "../models";
import { CryptoConfig, Deal } from "../entities";
import { propertyOf } from "../utils";
<<<<<<< HEAD
import { CryptoConfigLoader } from "../loaders";
import { ObjectId } from "@mikro-orm/mongodb";
=======
import { config } from "process";
import { CryptoConfigLoader } from "../loaders";
>>>>>>> fb3a8bc (Updates to make it work)

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
<<<<<<< HEAD
          const closingPrice = parseFloat(
            (currentPrice - 0.003 * currentPrice).toPrecision(2)
          );
          await this._closeDeal(deal, closingPrice);
=======
          const closingPrice = parseFloat((currentPrice - 0.003 * currentPrice).toPrecision(2));
          await this.closeDeal(deal, closingPrice);
>>>>>>> fb3a8bc (Updates to make it work)
        } else if (
          currentPrice >=
          deal.updatedPrice + deal.updatedPrice * deal.profitMargin
        ) {
<<<<<<< HEAD
          await this._raiseDeal(deal, currentPrice);
=======
          await this.raiseDeal(deal, currentPrice);
>>>>>>> fb3a8bc (Updates to make it work)
        }
      }
    } else {
      const config = await this.configLoader
        .getPairConfig()
        ?.load(pairType.pair);
      if (config?.basePrice && currentPrice < config.basePrice) {
<<<<<<< HEAD
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
=======
        await this.openDeal(
          pairType.pair,
          currentPrice,
          currentBalance / (3 * currentPrice)
        );
>>>>>>> fb3a8bc (Updates to make it work)
      }
    }
  }

  async openDeal(pair: string, price: number, quantity: number) {
<<<<<<< HEAD
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
=======
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
  }

  async closeDeal(deal: Deal, price: number) {
    try {
      await this.bnbService.createSellOrder(
        deal.pair,
        deal.quantity,
        price
      );
>>>>>>> fb3a8bc (Updates to make it work)
      deal.sellPrice = price;
      deal.closedAt = new Date();
      deal.profit = (deal.sellPrice - deal.buyPrice) * deal.quantity;
      await this.repo.updateObj(deal);
<<<<<<< HEAD
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
=======
      this.logger.logInfo(
        `Closing the deal of ${deal.pair} on ${price}`,
        DealsService.name
      );
    } catch (ex) {
      this.logger.logError(
        ex.body,
        DealsService.name
      );
    }
  }

  async raiseDeal(deal: Deal, price: number) {
    deal.updatedPrice = price;
    await this.repo.updateObj(deal);
    this.logger.logInfo(
      `Raise the deal of ${deal.pair} to ${price}`,
      DealsService.name
    );
>>>>>>> fb3a8bc (Updates to make it work)
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
