import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Content } from "../entities/Content";
import { People } from "../entities/People";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: "mysql://root:password@mysql:3306/tmdbDatabase",
  synchronize: true,
  entities: [User, Content, People],
});
