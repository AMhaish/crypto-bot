export interface IRepo<T> {
  findAllByField(value: any, filedName: string): Promise<T[]>;
  findAllByWhereClause(whereObj: any): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  findOneByField(value: any, filedName: string): Promise<T | null>;
  create(obj: T): Promise<any>;
  update(id: any, obj: T): Promise<any>;
  updateObj(obj: T): Promise<any>;
}
export default IRepo;