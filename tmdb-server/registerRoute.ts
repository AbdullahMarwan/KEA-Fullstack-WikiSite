const { Router: RegisterRouter } = require("express");
const mysqlReg = require("mysql2/promise");
const bcryptReg = require("bcrypt");

// Create router using express directly
const registerRouter = RegisterRouter();

// Create a connection pool
const registerPool = mysqlReg.createPool({
  host: "mysql",
  user: "root",
  password: "password",
  database: "tmdbDatabase",
});

// Registration endpoint
registerRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const [existingUsers] = await registerPool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcryptReg.hash(password, 12);

    // Insert the new user
    await registerPool.execute(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [username, "", email, hashedPassword]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = registerRouter;
