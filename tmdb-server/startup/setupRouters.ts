import express from "express";
import registerRouter from "../routes/auth/registerRouter";
// Import other routers as needed

const setupRouters = (app: express.Application) => {
  // Mount at the path the client expects
  app.use("/api/users/register", registerRouter);

  // Add other routes later
  // app.use("/api/users/login", loginRouter);
  // app.use("/api/content", contentRouter);
  // app.use("/api/favorites", favoritesRouter);
};

export default setupRouters;
