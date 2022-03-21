import LoggingService from "./loggingService";
import * as redis from "redis";
import Redlock from "redlock";
const { REDIS_HOST, REDIS_PORT, REDIS_PREFIX, REDIS_PREFIX_TIMEOUT, REDIS_PREFIX_CONV_TIMEOUT, REDIS_PREFIX_LIVE_CONV_TIMEOUT, REDIS_PREFIX_PARAMS } = process.env;
const redisScan = require("node-redis-scan");

export default class CacheService {
  client: redis.RedisClient;
  scanner: any;
  redlock: Redlock;

  constructor(private logger: LoggingService) {
    const redisPort: string = REDIS_PORT || "6379";
    this.client = redis.createClient(parseInt(redisPort, undefined), REDIS_HOST);
    this.scanner = new redisScan(this.client);
    this.redlock = this.getRedlock(this.client);
  }

  /**
   * The fetches all keys on redis with timeout prefix and count/limit of 10000
   * @returns {Array}: Returns an array consist of strings ( keys )
   */
  async getKeys(prefix: string | undefined): Promise<any> {
    return new Promise((resolve) => {
      this.scanner?.scan(`${prefix}*`, { count: 100000 }, (err: any, matchingKeys: Array<string>) => {
        if (err) {
          throw err;
        }
        resolve(matchingKeys);
      });
    });
  }

  /**
   * Getting the Redis key object
   * @param {String} key : The key value stored in redis
   * @param {String} expirationProp : The property related to expiration
   * @returns {any}: Returns an object that is fetched from redis if not expired, otherwise returns false
   */
  async getKeyObject(key: string): Promise<any> {
    return new Promise((resolve) => {
      this.client?.get(key, function (err: any, element: any): void {
        let object: any = JSON.parse(element);
        resolve(object);
      });
    });
  }

  /**
   * Setting the Redis key object
   * @param {string} key : the key
   * @param {any} timeoutObj : the timeoutObj to be saved
   */
  setKeyObject(key: string, obj: any): void {
    if (obj !== undefined) {
      try {
        this.client.SET(key, JSON.stringify(obj), (err) => {
          if (err && err.message) {
            this.logger.logError(`${key} - Error Set Key - ${err.message}`, CacheService.name);
          }
        });
      } catch (ex: any) {
        if (ex && ex.message) {
          this.logger.logError(`${key} - Error Set Key - ${ex.message}`, CacheService.name);
        }
      }
    }
  }

  removeKey(key: string): void {
    this.client?.del(key, (error) => {
      if (error && error.message) {
        this.logger.logError(`${key} - Couldn't be deleted - ${error.message}`, CacheService.name);
      } else {
        this.logger.logInfo(`${key} - Deleted successfully`, CacheService.name);
      }
    });
  }

  lockGlobal(callback: (...params: any[]) => any): void {
    this.redlock?.lock("_lock_", 3000, (err: any, lock: any) => {
      if (err) {
        this.logger.logError(err, CacheService.name);
      }
      if (callback) {
        callback(() => {
          lock.unlock((err: any) => {
            if (err) {
              this.logger.logError(err, CacheService.name);
            }
          });
        });
      }
    });
  }

  addPrefixToKey(key: string): string {
    return `${REDIS_PREFIX}-${key}`;
  }

  getRedlock(redisClient: redis.RedisClient): Redlock {
    return new Redlock([redisClient], {
      driftFactor: 0.01,
      retryCount: 20,
      retryDelay: 200,
      retryJitter: 200
    });
  }
}
