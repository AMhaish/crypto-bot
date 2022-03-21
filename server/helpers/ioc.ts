const Container = require("addict-ioc").Container;
import {
  Services,
  BinanceService,
  CacheService,
  LoggingService,
  DealsService,
} from "../services";
import { Jobs, CryptoJob } from "../jobs";
import { Repos, DealsRepo, CryptoConfigRepo } from "../repos";
import { Loaders, CryptoConfigLoader } from "../loaders";
import { Controllers, DealsController } from "../controllers";

const settings = {
  isSingleton: false,
  isFactory: false,
};
let container: any;
export const getIoC = () => {
  if (!container) {
    container = new Container(settings);
    // Registering Repos
    container.register(Repos.DealsRepo, DealsRepo);
    container.register(Repos.CryptoConfigRepo, CryptoConfigRepo);
    // Registering Services
    container.register(Services.LoggingService, LoggingService).singleton();
    // container.register(Services.CacheService, CacheService).singleton();
    container
      .register(Services.DealsService, DealsService)
      .dependencies(
        Repos.DealsRepo,
        Loaders.CryptoConfigLoader,
        Repos.CryptoConfigRepo,
        Services.BinanceService,
        Services.LoggingService
      )
      .singleton();
    container
      .register(Services.BinanceService, BinanceService)
      .dependencies(Services.LoggingService)
      .singleton();
    // Registering Jobs
    container
      .register(Jobs.CryptoJob, CryptoJob)
      .dependencies(
        Services.BinanceService,
        Services.DealsService,
        Services.LoggingService
      );
    // Registering Controllers
    container
      .register(Controllers.DealsController, DealsController)
      .dependencies(Services.DealsService, Services.LoggingService);
    // Registering Loaders
    container
      .register(Loaders.CryptoConfigLoader, CryptoConfigLoader)
      .dependencies(Repos.CryptoConfigRepo).singleton();
  }
  return container;
};
