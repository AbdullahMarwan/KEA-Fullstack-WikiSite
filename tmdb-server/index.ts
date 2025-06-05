import "./startup/server";

const express = require("express");
const cors = require("cors");
const loginRoutes = require("./loginRoute");
import registerRoutes from "./routes/auth/register";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount the routes
app.use("/api/users", loginRoutes);
app.use("/api/users", registerRoutes);

app.get("/", (req, res) => {
  res.send("TMDB API Server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
