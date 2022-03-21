import { Application } from "express";
const healthCheck = require("healthchecks-apis");
const { REDIS_HOST } = process.env;

export default class HealthCheckMiddleware {

  async initialize(app: Application): Promise<any> {
    return await healthCheck(app, {
      adapter: "express",
      service: {
        config: {
          baseRoute: "bnbBot/status",
          name: "BNB Bot",
          description: "Cron jobs for BNB Bot",
          checks: [
            {
              check: "redis",
              name: "redis",
              url: REDIS_HOST,
              type: "internal",
            },
          ],
        },
      },
    });
  }
}
