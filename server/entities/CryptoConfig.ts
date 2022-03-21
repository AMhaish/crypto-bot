import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class CryptoConfig {
  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  createdAt = new Date();

  @Property()
  pair!: string;

  @Property()
  profitMargin!: number;

  @Property()
  lossMargin!: number;

  @Property()
  basePrice!: number;
}
