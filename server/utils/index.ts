import { Crypto, TradingPairType } from "../models";

export const propertyOf = <TObj>(name: keyof TObj) => name;
export const priceOf = (prices: any, pairType: TradingPairType) => parseFloat(prices[pairType.pair]);
export const balanceOf = (balances: any, crypto: Crypto) => parseFloat(balances[crypto.toString()].available);

export { default as Constants } from './constants';