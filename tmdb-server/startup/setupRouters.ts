import express from "express";
import registerRouter from "../routes/auth/registerRouter";
import loginRouter from "../routes/auth/loginRouter";
import favoritesRouter from "../routes/favoritesRouter";
// Import other routers as needed

const setupRouters = (app: express.Application) => {
  // Mount at the path the client expects
  app.use("/api/users/register", registerRouter);

  app.use("/api/users/login", loginRouter);
  app.use("/api/favorites", favoritesRouter);
  // app.use("/api/content", contentRouter);
};

export default setupRouters;
