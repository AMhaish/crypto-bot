import { Container, IInstanceWrapper } from "addict-ioc";
import { Application } from "express";
import { DealsController, Controllers } from "../controllers";
import { Services, LoggingService } from "../services";
import helpers from "./helpers";

export default (
  app: Application,
  ioc: Container<IInstanceWrapper<any>>
) => {
  const dealsController: DealsController = ioc.resolve(
    Controllers.DealsController
  );
  const logger: LoggingService = ioc.resolve(
    Services.LoggingService
  );

  app.post("/bnb-bot/deal", async (req, res, next) => {
    await helpers.handleException(
      logger,
      req,
      res,
      next,
      dealsController.startDeal
    );
  });

<<<<<<< HEAD
  app.delete("/bnb-bot/deal", async (req, res, next) => {
    await helpers.handleException(
      logger,
      req,
      res,
      next,
      dealsController.closeDeal
    );
  });

=======
>>>>>>> fb3a8bc (Updates to make it work)
  app.post("/bnb-bot/config", async (req, res, next) => {
    await helpers.handleException(
      logger,
      req,
      res,
      next,
      dealsController.createConfig
    );
  });

  logger.logInfo(
    `Running an Express API server at /bnb-bot/*`,
    "Express routes"
  );
};
