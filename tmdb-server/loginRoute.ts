const { Router } = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

// Create router using express directly
const router = Router();

// Create a connection pool
const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "password",
  database: "tmdbDatabase",
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt details:", {
      email,
      passwordLength: password?.length,
      requestBody: req.body,
    });

    // Test password verification
    const testPassword = "password123";
    const testHash =
      "$2a$12$K7vsf.1AU7OrdY8CeTxNPOzr0i2rfxnQlMdI0UmTECLsZT7slC.IG";
    const testResult = await bcrypt.compare(testPassword, testHash);
    console.log("Test password verification:", testResult);

    // Query the database for the user
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    console.log(
      "Query result:",
      rows && rows.length > 0 ? "User found" : "No user found"
    );

    if (rows && rows.length > 0) {
      const user = rows[0];
      console.log("Stored hash:", user.password);

      // Test password comparison
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("Password match result:", passwordMatch);

      if (passwordMatch) {
        return res.status(200).json({
          message: "Login successful",
          user,
        });
      }
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
