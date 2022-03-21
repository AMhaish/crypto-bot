import IRepo from "./IRepo";
import { ObjectId } from "@mikro-orm/mongodb";

export class BaseRepo<T> implements IRepo<T> {
  repo: any;

  async findAllByField(value: any, filedName: string): Promise<T[]> {
    return await this.repo.find({ [filedName]: value });
  }

  async findAllByWhereClause(whereObj: any): Promise<T[]> {
    return await this.repo.find(whereObj);
  }

  async findOne(id: ObjectId): Promise<T | null> {
    return await this.repo.findOne({ _id: id });
  }

  async findOneByField(value: any, filedName: string): Promise<T | null> {
    return await this.repo.findOne({ [filedName]: value });
  }

  async create(obj: T): Promise<any> {
    return await this.repo.persistAndFlush(obj);
  }

  async update(id: ObjectId, obj: T): Promise<any> {
    let entity = await this.findOne(id);
    entity = { ...obj };
    await this.repo.flush();
    return entity;
  }

  async updateObj(obj: T): Promise<any> {
    await this.repo.flush();
    return obj;
  }
}
