import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Content } from "./entities/Content";
import axios from "axios";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const totalPages = 6;
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
    const processedIds = new Set(); // Track IDs we've already processed
    console.log("Starting content import from TMDB API...");

    for (const type of mediaTypes) {
      console.log(`Fetching ${type} content...`);
      let allContent = [];
      for (let page = 1; page <= totalPages; page++) {
        const url = `${BASE_URL}/${type}/popular?api_key=${API_KEY}&page=${page}`;
        const response = await axios.get(url);
        allContent = [...allContent, ...response.data.results];
        console.log(`Fetched page ${page}/${totalPages} of ${type} content`);
      }

      for (const item of allContent) {
        // Skip if we've already processed this content ID
        if (processedIds.has(item.id)) {
          continue;
        }

        processedIds.add(item.id); // Mark as processed

        try {
          // Fetch trailer data for this content item
          console.log(`Fetching trailer for ${type} ID: ${item.id}`);
          const trailerUrl = await fetchTrailerUrl(item.id, type);

          const content = contentRepo.create({
            id: item.id,
            title: type === "movie" ? item.title : item.name,
            overview: item.overview,
            release_date:
              type === "movie" ? item.release_date : item.first_air_date,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            content_type: type,
            trailer_url: trailerUrl, // Add the trailer URL
          });

          await contentRepo.save(content);
          console.log(
            `Saved ${type}: ${content.title} with trailer: ${
              trailerUrl || "None found"
            }`
          );
        } catch (error) {
          console.error(`Error processing ${type} ID ${item.id}:`, error.message);
        }
      }
    }

    // Insert users
    console.log("Adding users...");
    const usersData = [
      {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "password1",
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        password: "password2",
      },
      {
        first_name: "Michael",
        last_name: "Johnson",
        email: "michael.j@example.com",
        password: "password3",
      },
      {
        first_name: "Emily",
        last_name: "Williams",
        email: "emily.w@example.com",
        password: "password4",
      },
      {
        first_name: "David",
        last_name: "Brown",
        email: "david.brown@example.com",
        password: "password5",
      },
    ];

    const users: User[] = [];
    for (const u of usersData) {
      const hashed = await bcrypt.hash(u.password, 12);
      const user = userRepo.create({ ...u, password: hashed });
      users.push(await userRepo.save(user));
    }

    // Add favorites (randomly assign content to users)
    console.log("Adding favorite relationships...");
    const allContent = await contentRepo.find();
    for (const user of users) {
      user.favorites = [];
      for (let i = 0; i < 3; i++) {
        const randomContent =
          allContent[Math.floor(Math.random() * allContent.length)];
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

// Helper function to fetch trailer URLs
async function fetchTrailerUrl(id: number, type: string): Promise<string> {
  try {
    const response = await axios.get(
      `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
    );

    const results = response.data.results;
    if (!results || results.length === 0) {
      return "";
    }

    // First try to find an official trailer
    const trailer = results.find(
      (v: any) => v.site === "YouTube" && v.type === "Trailer"
    );

    // If no official trailer, use any YouTube video
    const youtubeVideo = results.find((v: any) => v.site === "YouTube");

    if (trailer || youtubeVideo) {
      const video = trailer || youtubeVideo;
      return `https://www.youtube.com/watch?v=${video.key}`;
    }

    return "";
  } catch (error) {
    console.error(`Error fetching trailer for ${type} ${id}:`, error.message);
    return "";
  }
}

async function seedIfEmpty() {
  try {
    await AppDataSource.initialize();

    // Check if data already exists in the database
    const existingRecords = await AppDataSource.manager.query(
      "SELECT COUNT(*) as count FROM content"
    );

    if (existingRecords[0].count === 0 || process.env.FORCE_SEED === "true") {
      console.log(
        "Database is empty or force seed enabled. Starting seed process..."
      );

      // Close the connection before starting the seed process
      await AppDataSource.destroy();

      await seed();
    } else {
      console.log("Database already has data. Skipping seed process.");
      await AppDataSource.destroy();
    }
  } catch (error) {
    console.error("Error checking database:", error);
    process.exit(1);
  }
}

// Start the seeding process
seedIfEmpty();
