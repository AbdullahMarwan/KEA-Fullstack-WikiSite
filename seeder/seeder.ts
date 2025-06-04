const mysql = require("mysql2");
const axios = require("axios");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

// Load environment variables
dotenv.config();

const totalPages = 3; // Reduced from 20 to 3 for faster testing
const mediaTypes = ["movie", "tv"];

// TMDB API configuration
const API_KEY = process.env.TMDB_API_KEY || "dfd45a50a0761538bfed7f664cacb4d7";
const BASE_URL = "https://api.themoviedb.org/3";

async function seed() {
  try {
    console.log("Connecting to database...");

    // Connect to the database
    const connection = mysql.createConnection({
      host: "mysql",
      user: "root",
      password: "password",
      database: "tmdbDatabase",
    });

    // Promisify the connection.query method with proper type annotations
    const query = (sql, params = []) => {
      return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    };

    console.log("Connected to database successfully");

    // Drop existing tables to start fresh (comment out if you want to keep existing data)
    await query(`DROP TABLE IF EXISTS favorites`);
    await query(`DROP TABLE IF EXISTS users`);
    await query(`DROP TABLE IF EXISTS content`);

    // Create tables in proper order
    await query(`
      CREATE TABLE IF NOT EXISTS content (
        id BIGINT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        overview TEXT,
        release_date DATE,
        poster_path VARCHAR(255),
        vote_average DECIMAL(3,1),
        content_type VARCHAR(10)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        last_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        email VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci UNIQUE NOT NULL,
        password VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS favorites (
        user_id BIGINT,
        content_id INT,
        PRIMARY KEY (user_id, content_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (content_id) REFERENCES content(id)
      )
    `);

    console.log("Tables created successfully");

    // Process each media type (movies and TV shows)
    for (const type of mediaTypes) {
      console.log(`Fetching popular ${type} content from TMDB API...`);
      let allContent = [];

      // Fetch multiple pages
      for (let page = 1; page <= totalPages; page++) {
        console.log(`Fetching ${type} page ${page}...`);
        const url = `${BASE_URL}/${type}/popular?api_key=${API_KEY}&page=${page}`;
        const response = await axios.get(url);
        allContent = [...allContent, ...response.data.results];
      }

      // Insert content into database
      console.log(
        `Inserting ${allContent.length} ${type} items into database...`
      );
      for (const item of allContent) {
        const title = type === "movie" ? item.title : item.name;
        const releaseDate =
          type === "movie" ? item.release_date : item.first_air_date;

        await query(
          `
          INSERT INTO content (id, title, overview, release_date, poster_path, vote_average, content_type)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            overview = VALUES(overview),
            release_date = VALUES(release_date),
            poster_path = VALUES(poster_path),
            vote_average = VALUES(vote_average),
            content_type = VALUES(content_type)
          `,
          [
            item.id,
            title,
            item.overview,
            releaseDate,
            item.poster_path,
            item.vote_average,
            type,
          ]
        );
      }
    }

    // Add sample users data
    await query(`
      INSERT INTO users (first_name, last_name, email, password) VALUES
      ('John', 'Doe', 'john.doe@example.com', '$2a$12$1tJWJ7U2h9KxBNhvJ4mNn.klUO.TpRgnngOUBVjG3hrFP/RW1q5pO'),
      ('Jane', 'Smith', 'jane.smith@example.com', '$2a$12$jGfrBqREBcAxvIn8z7HRPu13rMJJIkB0YHIYBDLVpXHQrihY8WSri'),
      ('Michael', 'Johnson', 'michael.j@example.com', '$2a$12$8kJw.e9NZ2KFNqRLdVKUxuXJwMWOHXfYxeQAYNxwBxbLQJ0Ks1Y/G'),
      ('Emily', 'Williams', 'emily.w@example.com', '$2a$12$EUKvpH7Tmfo19PFPgPww9eyU15Ab/XwQ3pvQHL1h7OKRw4DzmBEUS'),
      ('David', 'Brown', 'david.brown@example.com', '$2a$12$GQY3XxJcX9JGF7ZdpI0Ogu5Ua1FS2EJOX5sROI.a3TFiQLnrjQWAG')
    `);

    console.log("Seed data inserted successfully");

    // Close the connection properly
    connection.end();
    console.log("Database seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
