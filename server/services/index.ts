export enum Services {
    BinanceService = "BinanceService",
    CacheService = "CacheService",
    LoggingService = "LoggingService",
    DealsService = "DealsService",
}

export { default as BinanceService } from "./binanceService";
export { default as LoggingService } from "./loggingService";
export { default as CacheService } from "./cacheService";
export { default as DealsService } from "./dealsService";