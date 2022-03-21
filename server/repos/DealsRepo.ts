import { BaseRepo } from "./BaseRepo";
import { Deal } from '../entities';
import { getORM } from "../helpers/orm";

export default class DealsRepo extends BaseRepo<Deal> {
    constructor(){
        super();
        this.repo = getORM().em.getRepository(Deal);
    }
};
