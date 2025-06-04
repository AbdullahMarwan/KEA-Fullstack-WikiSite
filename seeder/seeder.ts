const mysql = require("mysql2");
const axios = require("axios");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

// Load environment variables
dotenv.config();

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

    // Create tables
    await query(`
      CREATE TABLE IF NOT EXISTS movies (
        id INT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        overview TEXT,
        release_date DATE,
        poster_path VARCHAR(255),
        vote_average DECIMAL(3,1)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS tv_shows (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        overview TEXT,
        first_air_date DATE,
        poster_path VARCHAR(255),
        vote_average DECIMAL(3,1)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        last_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        email VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        password VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
      )
    `);

    console.log("Tables created successfully");

    // Fetch popular movies from TMDB API
    console.log("Fetching popular movies from TMDB API...");
    const totalPages = 20; // Fetch 5 pages (approximately 100 movies)
    let allMovies = [];

    for (let page = 1; page <= totalPages; page++) {
      console.log(`Fetching movies page ${page}...`);
      const response = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      allMovies = [...allMovies, ...response.data.results];
    }

    // Insert movies into database
    console.log(`Inserting ${allMovies.length} movies into database...`);
    for (const movie of allMovies) {
      await query(
        `
        INSERT INTO movies (id, title, overview, release_date, poster_path, vote_average)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          overview = VALUES(overview),
          release_date = VALUES(release_date),
          poster_path = VALUES(poster_path),
          vote_average = VALUES(vote_average)
      `,
        [
          movie.id,
          movie.title,
          movie.overview,
          movie.release_date,
          movie.poster_path,
          movie.vote_average,
        ]
      );
    }

    // Fetch popular TV shows from TMDB API
    console.log("Fetching popular TV shows from TMDB API...");
    let allTvShows = [];

    for (let page = 1; page <= totalPages; page++) {
      console.log(`Fetching TV shows page ${page}...`);
      const response = await axios.get(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`
      );
      allTvShows = [...allTvShows, ...response.data.results];
    }

    // Insert TV shows into database
    console.log(`Inserting ${allTvShows.length} TV shows into database...`);
    for (const tvShow of allTvShows) {
      // Handle null or empty first_air_date
      const firstAirDate =
        tvShow.first_air_date && tvShow.first_air_date.trim() !== ""
          ? tvShow.first_air_date
          : null;

      await query(
        `
        INSERT INTO tv_shows (id, name, overview, first_air_date, poster_path, vote_average)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          overview = VALUES(overview),
          first_air_date = VALUES(first_air_date),
          poster_path = VALUES(poster_path),
          vote_average = VALUES(vote_average)
      `,
        [
          tvShow.id,
          tvShow.name,
          tvShow.overview,
          firstAirDate, // Use the processed date value
          tvShow.poster_path,
          tvShow.vote_average,
        ]
      );
    }

    // Generate a hash for a known password
    const knownPasswordHash = await bcrypt.hash("testpassword123", 12);

    // Add sample users data
    await query(`
      INSERT INTO users (first_name, last_name, email, password) VALUES
      ('John', 'Doe', 'john.doe@example.com', '$2a$12$1tJWJ7U2h9KxBNhvJ4mNn.klUO.TpRgnngOUBVjG3hrFP/RW1q5pO'),
      ('Jane', 'Smith', 'jane.smith@example.com', '$2a$12$jGfrBqREBcAxvIn8z7HRPu13rMJJIkB0YHIYBDLVpXHQrihY8WSri'),
      ('Michael', 'Johnson', 'michael.j@example.com', '$2a$12$8kJw.e9NZ2KFNqRLdVKUxuXJwMWOHXfYxeQAYNxwBxbLQJ0Ks1Y/G'),
      ('Emily', 'Williams', 'emily.w@example.com', '$2a$12$EUKvpH7Tmfo19PFPgPww9eyU15Ab/XwQ3pvQHL1h7OKRw4DzmBEUS'),
      ('David', 'Brown', 'david.brown@example.com', '$2a$12$GQY3XxJcX9JGF7ZdpI0Ogu5Ua1FS2EJOX5sROI.a3TFiQLnrjQWAG'),
      ('Test', 'User', 'test.user@example.com', '${knownPasswordHash}')
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
