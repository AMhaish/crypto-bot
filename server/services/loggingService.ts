import { logger } from "../helpers/logger";

export default class LoggingService {
  logInfo(message: string, className: string) {
    logger.log("info", message, { ClassName: className });
  }

  logError(message: string, className: string) {
    logger.log("error", message, { ClassName: className });
  }

  logWarning(message: string, className: string) {
    logger.log("warn", message, { ClassName: className });
  }

  logFatal(message: string, className: string) {
    logger.log("fatal", message, { ClassName: className });
  }

  logDebug(message: string, className: string) {
    logger.log("debug", message, { ClassName: className });
  }
}
