import express from "express";
import cors from "cors";
import { AppDataSource } from "./startup/data-source";
import setupRouters from "./startup/setupRouters";

const app = express();
const PORT = Number(process.env.PORT || 5000); // Convert to number

// Middleware setup
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.send("Hello World!");
});

// Setup all routes
setupRouters(app);

// Initialize database connection and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
