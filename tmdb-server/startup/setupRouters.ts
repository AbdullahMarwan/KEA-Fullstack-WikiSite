import express from "express";
import registerRouter from "../routes/auth/registerRouter";
import loginRouter from "../routes/auth/loginRouter";
import favoritesRouter from "../routes/favoritesRouter";
import contentRouter from "../routes/contentRouter";
import trailerRouter from "../routes/trailerRouter";
import peopleRouter from "../routes/peopleRouter"; // Import the peopleRouter

const setupRouters = (app: express.Application) => {
  console.log("Setting up routers...");

  // Authentication routes
  app.use("/api/users/register", registerRouter);
  console.log("Registered: /api/users/register");

  app.use("/api/users/login", loginRouter);
  console.log("Registered: /api/users/login");

  // Favorites route
  app.use("/api/favorites", favoritesRouter);
  console.log("Registered: /api/favorites");

  // Add content router
  app.use("/api/content", contentRouter);
  console.log("Registered: /api/content");

  // Add trailer router
  app.use("/api/trailers", trailerRouter);
  console.log("Registered: /api/trailers");

  // Add people router
  app.use("/api/people", peopleRouter);
  console.log("Registered: /api/people");
};

export default setupRouters;
