import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Content } from "./entities/Content";
import axios from "axios";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const totalPages = 3;
const mediaTypes = ["movie", "tv"];
const API_KEY = process.env.TMDB_API_KEY || "dfd45a50a0761538bfed7f664cacb4d7";
const BASE_URL = "https://api.themoviedb.org/3";

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database with TypeORM");

    const contentRepo = AppDataSource.getRepository(Content);
    const userRepo = AppDataSource.getRepository(User);

    // Clear existing data
    await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 0");
    await contentRepo.clear();
    await userRepo.clear();
    await AppDataSource.manager.query("DELETE FROM favorites");
    await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 1");

    // Insert content from TMDB
    for (const type of mediaTypes) {
      let allContent = [];
      for (let page = 1; page <= totalPages; page++) {
        const url = `${BASE_URL}/${type}/popular?api_key=${API_KEY}&page=${page}`;
        const response = await axios.get(url);
        allContent = [...allContent, ...response.data.results];
      }

      for (const item of allContent) {
        const content = contentRepo.create({
          id: item.id,
          title: type === "movie" ? item.title : item.name,
          overview: item.overview,
          release_date: type === "movie" ? item.release_date : item.first_air_date,
          poster_path: item.poster_path,
          vote_average: item.vote_average,
          content_type: type,
        });
        await contentRepo.save(content);
      }
    }

    // Insert users
    const usersData = [
      { first_name: "John", last_name: "Doe", email: "john.doe@example.com", password: "password1" },
      { first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com", password: "password2" },
      { first_name: "Michael", last_name: "Johnson", email: "michael.j@example.com", password: "password3" },
      { first_name: "Emily", last_name: "Williams", email: "emily.w@example.com", password: "password4" },
      { first_name: "David", last_name: "Brown", email: "david.brown@example.com", password: "password5" },
    ];

    const users: User[] = [];
    for (const u of usersData) {
      const hashed = await bcrypt.hash(u.password, 12);
      const user = userRepo.create({ ...u, password: hashed });
      users.push(await userRepo.save(user));
    }

    // Add favorites (randomly assign content to users)
    const allContent = await contentRepo.find();
    for (const user of users) {
      user.favorites = [];
      for (let i = 0; i < 3; i++) {
        const randomContent = allContent[Math.floor(Math.random() * allContent.length)];
        if (!user.favorites.find((c) => c.id === randomContent.id)) {
          user.favorites.push(randomContent);
        }
      }
      await userRepo.save(user);
    }

    console.log("Database seeding completed with TypeORM");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
