import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Content } from "./entities/Content";
import axios from "axios";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const totalPages = 6;
const mediaTypes = ["movie", "tv"];
const API_KEY = process.env.TMDB_API_KEY || "dfd45a50a0761538bfed7f664cacb4d7";
const BASE_URL = "https://api.themoviedb.org/3";

// Define types for API responses
interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

interface TMDBTVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string;
  vote_average: number;
}

type TMDBContent = TMDBMovie | TMDBTVShow;

async function seed() {
  try {
    console.log("Starting database seeding with TypeORM");

    const contentRepo = AppDataSource.getRepository(Content);
    const userRepo = AppDataSource.getRepository(User);

    // Clear existing data
    await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 0");
    await contentRepo.clear();
    await userRepo.clear();
    await AppDataSource.manager.query("DELETE FROM favorites");
    await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 1");

    // Insert content from TMDB
    const processedIds = new Set<number>();
    console.log("Starting content import from TMDB API...");

    for (const type of mediaTypes) {
      console.log(`Fetching ${type} content...`);
      let allContent: TMDBContent[] = [];

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
            title:
              type === "movie"
                ? (item as TMDBMovie).title
                : (item as TMDBTVShow).name,
            overview: item.overview,
            release_date:
              type === "movie"
                ? (item as TMDBMovie).release_date
                : (item as TMDBTVShow).first_air_date,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            content_type: type,
            trailer_url: trailerUrl,
          });

          await contentRepo.save(content);
        } catch (error: any) {
          console.error(
            `Error processing ${type} ID ${item.id}:`,
            error.message || "Unknown error"
          );
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
  } catch (error: any) {
    console.error("Error seeding database:", error.message || error);
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
  } catch (error: any) {
    console.error(`Error fetching trailer for ${type} ${id}:`, error.message);
    return "";
  }
}

async function seedIfEmpty() {
  try {
    // Initialize connection first
    await AppDataSource.initialize();
    console.log("Connected to database to check if seeding is needed");

    // Drop and recreate tables if force seed is enabled
    if (process.env.FORCE_SEED === "true") {
      console.log("Force seed enabled. Dropping and recreating tables...");
      try {
        // Drop tables in the correct order to avoid foreign key constraints
        await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 0");
        await AppDataSource.manager.query("DROP TABLE IF EXISTS favorites");
        await AppDataSource.manager.query("DROP TABLE IF EXISTS content");
        await AppDataSource.manager.query("DROP TABLE IF EXISTS user");
        await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 1");

        // Let TypeORM recreate tables
        await AppDataSource.synchronize();

        console.log("Tables dropped and recreated. Starting seed process...");
        await seed();
      } catch (error) {
        console.error("Error dropping tables:", error);
        process.exit(1);
      }
    } else {
      // Check if tables exist and have data
      try {
        const existingRecords = await AppDataSource.manager.query(
          "SELECT COUNT(*) as count FROM content"
        );

        if (parseInt(existingRecords[0].count) === 0) {
          console.log("Database is empty. Starting seed process...");
          await seed();
        } else {
          console.log("Database already has data. Skipping seed process.");
          await AppDataSource.destroy();
        }
      } catch (error) {
        // If the query fails, tables don't exist yet
        console.log("Tables don't exist yet. Creating and seeding...");
        await seed();
      }
    }
  } catch (error) {
    console.error("Error checking database:", error);
    process.exit(1);
  }
}

// Start the seeding process
seedIfEmpty();
