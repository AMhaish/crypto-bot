/**
 * Newly added requires
 */
import { register, Counter, Summary, collectDefaultMetrics } from "prom-client";
import ResponseTime from "response-time";
import { logger } from "./logger";

/**
 * A Prometheus counter that counts the invocations of the different HTTP verbs
 * e.g. a GET and a POST call will be counted as 2 different calls
 */
export const numOfRequests = new Counter({
  name: "numOfRequests",
  help: "Number of requests made",
  labelNames: ["method"]
});
/**
 * A Prometheus counter that counts the invocations with different paths
 * e.g. /foo and /bar will be counted as 2 different paths
 */
export const pathsTaken = new Counter({
  name: "pathsTaken",
  help: "Paths taken in the app",
  labelNames: ["path"]
});
/**
 * A Prometheus summary to record the HTTP method, path, response code and response time
 */
export const responses = new Summary({
  name: "responses",
  help: "Response time in millis",
  labelNames: ["method", "path", "status"]
});
/**
 * This funtion will start the collection of metrics and should be called from within in the main js file
 */
export const startCollection = function () {
  logger.log("info", "Starting the collection of metrics, the metrics are available on /metrics");
  collectDefaultMetrics();
};

/**
 * This function increments the counters that are executed on the request side of an invocation
 * Currently it increments the counters for numOfPaths and pathsTaken
 */
export const requestCounters = function (req: any, res: any, next: any) {
  if (req.path != "/nodejs/metrics") {
    numOfRequests.inc({ method: req.method });
    pathsTaken.inc({ path: req.path });
  }
  next();
};

/**
 * This function increments the counters that are executed on the response side of an invocation
 * Currently it updates the responses summary
 */
export const responseCounters = ResponseTime(function (req: any, res: any, time: any) {
  if (req.url != "/nodejs/metrics") {
    responses.labels(req.method ? req.method : "", req.url ? req.url : "", res.statusCode ? res.statusCode.toString() : "").observe(time);
  }
});

/**
 * In order to have Prometheus get the data from this app a specific URL is registered
 */
export const injectMetricsRoute = function (App: any) {
  App.get("/nodejs/metrics", (req: any, res: any) => {
    res.set("Content-Type", register.contentType);
    res.end(register.metrics());
  });
};
