import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Content } from "../entities/Content";
import { People } from "../entities/People";

const mysqlUrl = process.env.DATABASE_URL;
const isRemoteDB = mysqlUrl?.includes("aivencloud");

export const AppDataSource = new DataSource({
  type: "mysql",
  url: mysqlUrl,
  synchronize: true,
  logging: false,
  entities: [User, Content, People],
  ssl: isRemoteDB ? { rejectUnauthorized: false } : undefined,
});
