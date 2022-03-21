import express, { Application } from "express";
import bodyParser from "body-parser";
import Schedule from "node-schedule";
import HealthCheckMiddleware from "./healthCheckMiddleware";
import { getIoC } from "./helpers/ioc";
import { initORM } from "./helpers/orm";
import { CryptoJob, Jobs } from "./jobs";
import { TradingPairs } from "./models";
import routes from "./routes";

const { PORT, NODE_ENV } = process.env;

async function initializeHealthCheckMiddleware(
  app: Application
): Promise<void> {
  if (NODE_ENV !== "development") {
    const healthCheckMiddleware: HealthCheckMiddleware =
      new HealthCheckMiddleware();
    await healthCheckMiddleware.initialize(app);
  }
}

const serverConf = {
  async start(): Promise<void> {
    const app: Application = express();
    app.use(bodyParser.json());
    await initializeHealthCheckMiddleware(app);
    const ioc = getIoC();
    await initORM();
    const cryptoJob: CryptoJob = ioc.resolve(Jobs.CryptoJob);
    Schedule.scheduleJob(cryptoJob.getJobCron(), () =>
      cryptoJob.execute([
<<<<<<< HEAD
        TradingPairs.LUNABUSD,
        TradingPairs.ETHBUSD,
        TradingPairs.THETABUSD,
        TradingPairs.ATOMBUSD,
        TradingPairs.ENJBUSD,
        TradingPairs.STORJBUSD
=======
        TradingPairs.LUNAUSDT,
        TradingPairs.ETHUSDT,
        TradingPairs.THETAUSDT,
>>>>>>> fb3a8bc (Updates to make it work)
      ])
    );
    routes(app, ioc);
    app.listen(PORT);
  },
};

export default serverConf;
