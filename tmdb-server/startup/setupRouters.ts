import express from "express";
import registerRouter from "../routes/auth/registerRouter";
import loginRouter from "../routes/auth/loginRouter";
import favoritesRouter from "../routes/favoritesRouter";
import contentRouter from "../routes/contentRouter";
// Import other routers as needed

const setupRouters = (app: express.Application) => {
  // Authentication routes
  app.use("/api/users/register", registerRouter);
  app.use("/api/users/login", loginRouter);

  // Favorites route - make sure this is included
  app.use("/api/favorites", favoritesRouter);
  app.use("/api/content", contentRouter);
};

export default setupRouters;
