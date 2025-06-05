import express from "express";
import cors from "cors";
import { AppDataSource } from "./db";
import loginRoutes from "../routes/auth/loginRouter";
import registerRoutes from "../routes/auth/registerRouter";
import favoritesRoutes from "../routes/favoritesRouter";
import contentRoutes from "../routes/contentRouter";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", loginRoutes);
app.use("/api/users", registerRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/content", contentRoutes);

app.get("/", (_req, res) => {
  res.send("TMDB API Server is running");
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });

export default app;
