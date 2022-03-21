import winston from "winston";
import moment from "moment";
const { combine, timestamp, printf } = winston.format;

const { LOGS } = process.env;
var transports;
if (LOGS == "Stackdriver") {
  transports = [new winston.transports.Console()];
} else {
  transports = [
    new winston.transports.Console({
      format: combine(
        timestamp(),
        printf((options) => {
          let level = options.level.toUpperCase();
          return `${moment().toISOString()} ${level} [BinanceBot,${options.TraceId},${options.SpanId},${options.Exportable}] ${process.pid} --- [nodeThread] --- ${options.ClassName} : ${
            options.message
          }`;
        })
      )
    })
  ];
}

export const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "BinanceBot" },
  transports: transports
});

export default logger;
