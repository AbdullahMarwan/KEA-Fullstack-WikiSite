import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Content } from "./entities/Content";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.MYSQL_URL || "mysql://root:password@mysql:3306/tmdbDatabase",
  synchronize: true,
  dropSchema: true, // Add this line to drop and recreate tables
  logging: true,
  entities: [User, Content],
});
