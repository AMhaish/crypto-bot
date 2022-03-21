import { MikroORM } from "@mikro-orm/core";
import { Deal, CryptoConfig } from "../entities";

const { DB_URL, DB_NAME } = process.env;

let orm: MikroORM;
export const getORM = () => {
  return orm;
};

export const initORM = async () => {
  orm = await MikroORM.init({
    entities: [Deal, CryptoConfig],
    dbName: DB_NAME,
    type: "mongo", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    clientUrl: DB_URL,
  });
};
