import { Entity, PrimaryKey, Property, Embedded } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class Deal {
  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  closedAt?: Date = undefined;

  @Property()
  pair!: string;

  @Property()
  quantity!: number;

  @Property()
  buyPrice!: number;

  @Property()
  updatedPrice!: number;

  @Property()
  sellPrice?: number;

  @Property()
  profit?: number;

  @Property()
  profitMargin!: number;

  @Property()
  lossMargin!: number;
}
