import "./startup/server";
import express from "express";
import init from "./startup/init";

const app = express();

init(app);
app.get("/", (req, res) => {
res.send("Hello World!");
});
app.listen(5000, () => {
console.log("Server is running on http://localhost:5000");
});


// const express = require("express");
// const cors = require("cors");
// const loginRoutes = require("./loginRoute");
// import registerRoutes from "./routes/auth/register";
// import exp from "constants";

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Mount the routes
// app.use("/api/users", loginRoutes);
// app.use("/api/users", registerRoutes);

// app.get("/", (req, res) => {
//   res.send("TMDB API Server is running");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
