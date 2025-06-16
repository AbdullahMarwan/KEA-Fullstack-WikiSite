import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Content } from "./entities/Content";
import { Category } from "./entities/Category"; // Add this import
import { CategoryLookup } from "./entities/CategoryLookup";
import { People } from "./entities/People";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.MYSQL_URL || "mysql://root:password@mysql:3306/tmdbDatabase",
  synchronize: true,
  logging: true,
  entities: [User, Content, Category, CategoryLookup, People], // Add Category to the entities array
});
