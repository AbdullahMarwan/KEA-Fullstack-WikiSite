import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Content } from "../entities/Content";
import { People } from "../entities/People";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL, // ✅ use environment variable
  synchronize: true,
  entities: [User, Content, People],
  ssl: process.env.DATABASE_URL?.includes("aivencloud")
    ? { rejectUnauthorized: true }
    : undefined, // ✅ Enable SSL only for Aiven
});
