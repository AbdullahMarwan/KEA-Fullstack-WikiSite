import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Content } from "../entities/Content";
import { People } from "../entities/People";

// Brug den rigtige env afhængigt af om du er i prod eller local
const isProduction = process.env.NODE_ENV === "production";

const mysqlUrl = isProduction
  ? process.env.PROD_DATABASE_URL
  : process.env.LOCAL_DATABASE_URL;

const isRemoteDB = mysqlUrl?.includes("aivencloud");

export const AppDataSource = new DataSource({
  type: "mysql",
  url: mysqlUrl,
  synchronize: true,
  logging: false,
  entities: [User, Content, People],
  ssl: isRemoteDB ? { rejectUnauthorized: false } : undefined,
});
