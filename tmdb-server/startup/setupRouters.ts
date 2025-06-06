import express from "express";
// import loginRouter from "../routes/auth/loginRouter";  // COMMENT OUT THIS LINE
// import registerRouter from "../routes/auth/registerRouter";
// import contentRouter from "../routes/contentRouter";
// import favoritesRouter from "../routes/favoritesRouter";

//assign endpoints to the routers
const setupRouters = (app: express.Application) => {
  // app.use("/content", contentRouter);
  // app.use("/favorites", favoritesRouter);
  // app.use("/auth/login", loginRouter);
  // app.use("/register", registerRouter);
};

export default setupRouters;
