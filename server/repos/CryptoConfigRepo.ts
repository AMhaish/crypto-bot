import { BaseRepo } from "./BaseRepo";
import { CryptoConfig } from '../entities';
import { getORM } from "../helpers/orm";

export default class CryptoConfigRepo extends BaseRepo<CryptoConfig> {
    constructor(){
        super();
        this.repo = getORM().em.getRepository(CryptoConfig);
    }
};
