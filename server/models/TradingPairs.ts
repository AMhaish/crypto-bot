import { Crypto } from "./Crypto";

export const TradingPairs: { [key: string]: TradingPairType } = {
<<<<<<< HEAD
  DOTBUSD: { pair: "DOTBUSD", target: Crypto.DOT, source: Crypto.BUSD },
  LUNABUSD: { pair: "LUNABUSD", target: Crypto.LUNA, source: Crypto.BUSD },
  ETHBUSD: { pair: "ETHBUSD", target: Crypto.ETH, source: Crypto.BUSD },
  THETABUSD: { pair: "THETABUSD", target: Crypto.THETA, source: Crypto.BUSD },
  ATOMBUSD: { pair: "ATOMBUSD", target: Crypto.ATOM, source: Crypto.BUSD },
  ENJBUSD: { pair: "ENJBUSD", target: Crypto.ENJ, source: Crypto.BUSD },
  STORJBUSD: { pair: "STORJBUSD", target: Crypto.STORJ, source: Crypto.BUSD },
=======
  DOTUSDT: { pair: "DOTUSDT", target: Crypto.DOT, source: Crypto.USDT },
  LUNAUSDT: { pair: "LUNAUSDT", target: Crypto.LUNA, source: Crypto.USDT },
  ETHUSDT: { pair: "ETHUSDT", target: Crypto.ETH, source: Crypto.USDT },
  THETAUSDT: { pair: "THETAUSDT", target: Crypto.THETA, source: Crypto.USDT },
>>>>>>> fb3a8bc (Updates to make it work)
};

export type TradingPairType = {
  pair: string;
  target: Crypto;
  source: Crypto;
};

export default TradingPairs;
