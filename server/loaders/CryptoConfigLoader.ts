import DataLoader from "dataloader";
import makeLoader from "./utils/MakeLoader";
import { CryptoConfig } from "../entities";
import { CryptoConfigRepo } from "../repos";
import { propertyOf } from "../utils";

export default class CryptoConfigLoader {
  getPairConfigLoader?: DataLoader<string | number, CryptoConfig | undefined, string | number>;

  constructor(private configRepo: CryptoConfigRepo) { }

  getPairConfig(): DataLoader<string | number, CryptoConfig | undefined, string | number> | undefined {
    if (!this.getPairConfigLoader) {
      this.getPairConfigLoader = makeLoader<CryptoConfigRepo,CryptoConfig>(this.configRepo, propertyOf<CryptoConfig>("pair"));
    }
    return this.getPairConfigLoader;
  }
}
