import "reflect-metadata";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";
import { seedCategories } from "./CategorySeeder";
import { seedUsers } from "./UserSeeder";
import { seedContent } from "./ContentSeeder";
import { seedFavorites } from "./FavoritesSeeder";
import { seedCategoryLookups } from "./CategoryLookupSeeder"; // Add this import

dotenv.config();

async function seed() {
  try {
    console.log("Starting database seeding with TypeORM");

    // Clear existing data
    await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 0");
    await AppDataSource.manager.query("DELETE FROM favorites");
    await AppDataSource.manager.query("DELETE FROM category_look_up");
    await AppDataSource.manager.query("DELETE FROM content");
    await AppDataSource.manager.query("DELETE FROM user");
    await AppDataSource.manager.query("DELETE FROM category");
    await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 1");

    // Seed data in sequence
    await seedCategories(AppDataSource);
    const contentCategoryMap = await seedContent(AppDataSource);
    const users = await seedUsers(AppDataSource);
    await seedFavorites(AppDataSource, users);
    await seedCategoryLookups(AppDataSource, contentCategoryMap); // Pass the map

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
    console.log("Connected to database to check if seeding is needed");

    // Drop and recreate tables if force seed is enabled
    if (process.env.FORCE_SEED === "true") {
      console.log("Force seed enabled. Dropping and recreating tables...");
      try {
        // Drop tables in the correct order to avoid foreign key constraints
        await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 0");
        await AppDataSource.manager.query("DROP TABLE IF EXISTS favorites");
        await AppDataSource.manager.query(
          "DROP TABLE IF EXISTS category_look_up"
        ); // This line
        await AppDataSource.manager.query("DROP TABLE IF EXISTS content");
        await AppDataSource.manager.query("DROP TABLE IF EXISTS category"); // Add this line
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
