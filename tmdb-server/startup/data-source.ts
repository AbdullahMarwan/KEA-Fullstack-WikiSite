import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Content } from "../entities/Content";
import { People } from "../entities/People";

const isRemoteDB = process.env.MYSQL_URL?.includes("aivencloud");

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.MYSQL_URL,
  synchronize: true,
  logging: false,
  entities: [User, Content, People],
  ssl: isRemoteDB ? { rejectUnauthorized: false } : undefined, // 👈 dynamisk ssl
});
