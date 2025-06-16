import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { seedCategories } from "./CategorySeeder";
import { seedContent } from "./ContentSeeder";
import { seedUsers } from "./UserSeeder";
import { seedFavorites } from "./FavoritesSeeder";
import { seedCategoryLookups } from "./CategoryLookupSeeder";
import { seedPeople } from "./PeopleSeeder";
import * as dotenv from "dotenv";
import { User } from "../entities/User"; // Import the User entity type

dotenv.config();

async function seed() {
  try {
    console.log("Starting database seeding with TypeORM");

    // Synchronize the schema to ensure all tables are created
    await AppDataSource.synchronize();

    // Clear existing data if FORCE_SEED is true
    const forceSeed = process.env.FORCE_SEED === "true";
    if (forceSeed) {
      console.log("Force seeding enabled - clearing existing data");
      await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 0");
      await AppDataSource.manager.query("DELETE FROM favorites");
      await AppDataSource.manager.query("DELETE FROM category_look_up");
      await AppDataSource.manager.query("DELETE FROM people");
      await AppDataSource.manager.query("DELETE FROM content");
      await AppDataSource.manager.query("DELETE FROM user");
      await AppDataSource.manager.query("DELETE FROM category");
      await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 1");
    }

    // Seed categories if needed
    const categoryCount = await AppDataSource.manager.count("category");
    if (categoryCount === 0 || forceSeed) {
      await seedCategories(AppDataSource);
    } else {
      console.log(
        `Category table already has ${categoryCount} records. Skipping seeding.`
      );
    }

    // Seed content if needed
    const contentCount = await AppDataSource.manager.count("content");
    let contentCategoryMap = new Map<number, string>();
    if (contentCount === 0 || forceSeed) {
      contentCategoryMap = await seedContent(AppDataSource);
    } else {
      console.log(
        `Content table already has ${contentCount} records. Skipping content seeding.`
      );
    }

    // Seed users if needed
    const userCount = await AppDataSource.manager.count("user");
    // Fix: Properly type the users variable
    let users: User[] = [];
    if (userCount === 0 || forceSeed) {
      users = await seedUsers(AppDataSource);
    } else {
      console.log(
        `User table already has ${userCount} records. Skipping user seeding.`
      );
    }

    // Seed favorites if needed
    const favoritesCount = await AppDataSource.manager.count("favorites");
    if (favoritesCount === 0 || forceSeed) {
      await seedFavorites(AppDataSource, users);
    } else {
      console.log(
        `Favorites table already has ${favoritesCount} records. Skipping favorites seeding.`
      );
    }

    // Seed category lookups if needed
    const lookupCount = await AppDataSource.manager.count("category_look_up");
    if (lookupCount === 0 || forceSeed) {
      await seedCategoryLookups(AppDataSource, contentCategoryMap);
    } else {
      console.log(
        `Category lookup table already has ${lookupCount} records. Skipping lookup seeding.`
      );
    }

    // Seed people - this check is independent of other tables
    console.log("Now checking people table...");
    const peopleCount = await AppDataSource.manager.count("people");
    if (peopleCount === 0 || forceSeed) {
      console.log("Now seeding people data...");
      await seedPeople(AppDataSource);
      console.log("People seeding completed");
    } else {
      console.log(
        `People table already has ${peopleCount} records. Skipping people seeding.`
      );
    }

    console.log("Database seeding completed with TypeORM");
    await AppDataSource.destroy();
  } catch (error: any) {
    console.error("Error seeding database:", error.message || error);
    process.exit(1);
  }
}

async function seedIfEmpty() {
  try {
    // Initialize connection first
    await AppDataSource.initialize();

    // Check if content table exists and has data
    try {
      const contentCount = await AppDataSource.manager.count("content");
      const peopleCount = await AppDataSource.manager.count("people");

      if (
        contentCount === 0 ||
        peopleCount === 0 ||
        process.env.FORCE_SEED === "true"
      ) {
        console.log(
          "Empty tables detected or force seed enabled. Starting seeding process..."
        );
        await seed();
      } else {
        console.log(
          "Database already has content and people. Skipping seeding."
        );
        await AppDataSource.destroy();
      }
    } catch (error) {
      console.log(
        "Error checking tables, tables may not exist yet. Starting seeding..."
      );
      await seed();
    }
  } catch (error) {
    console.error("Failed to initialize data source:", error);
    process.exit(1);
  }
}

// Start the seeding process
seedIfEmpty();
