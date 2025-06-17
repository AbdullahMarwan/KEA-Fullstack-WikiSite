import express from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../startup/data-source";
import { User } from "../../entities/User";

// Create a function that returns the router instead of creating a router variable
function createRegisterRouter() {
  const router = express.Router();

  router.post("/", async (req, res) => {
    // Your registration logic
    const { first_name, last_name, email, password } = req.body;
    console.log("Server received registration data:", {
      first_name,
      last_name,
      email,
      passwordProvided: !!password,
    });

    try {
      const userRepo = AppDataSource.getRepository(User);
      const existing = await userRepo.findOneBy({ email });
      if (existing)
        return res.status(400).json({ message: "Email already in use" });

      const hashed = await bcrypt.hash(password, 12);
      const user = userRepo.create({
        first_name,
        last_name,
        email,
        password: hashed,
      });
      const savedUser = await userRepo.save(user);

      res.status(201).json({ message: "Registration successful", user: savedUser });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: error.message || "Server error" });
    }
  });

  return router;
}

export default createRegisterRouter();
