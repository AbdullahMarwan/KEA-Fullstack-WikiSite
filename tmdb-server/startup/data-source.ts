import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Content } from "../entities/Content";
import { People } from "../entities/People";

const mysqlUrl = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "mysql",
  url: mysqlUrl,
  synchronize: true,
  logging: false,
  entities: [User, Content, People],
  ssl: mysqlUrl?.includes("aivencloud")
    ? { rejectUnauthorized: false }
    : undefined,
});
