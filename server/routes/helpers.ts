import LoggingService from "../services/loggingService";

export default {
  async handleException(logger: LoggingService,req: any, res: any, next: any, callback: (...params: any[]) => Promise<any>): Promise<void> {
    try {
      if (callback) {
        await callback(req, res, next);
      }
    } catch (ex: any) {
      console.log(ex);
      logger.logError(ex.message + "/" + ex.stack, ex.source);
      if (ex.toJson) {
        res.status(ex.status).send(ex.toJson());
      } else {
        res.status(500).send(ex.message);
      }
    }
  },
};
