import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Content } from "../entities/Content";
import { People } from "../entities/People";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [User, Content, People],
  ssl: {
    rejectUnauthorized: false, // 👈 ALLOW self-signed certs
  },
});
