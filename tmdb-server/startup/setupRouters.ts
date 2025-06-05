//assing endpoints to the routers
const setupRouters = (app: express.Application) => {
app.use("/content", contentRouter);
app.use("/favorites", favoritesRouter);
app.use("/auth/login", loginRouter);
app.use("/register", registerRouter);
};

export default setupRouters;
