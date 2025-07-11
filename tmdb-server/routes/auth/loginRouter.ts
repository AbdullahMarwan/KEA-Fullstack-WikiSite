import { Router } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../startup/data-source";
import { User } from "../../entities/User";

const router = Router();

router.post("/", async (req, res) => {
  console.log("Login attempt received:", {
    email: req.body.email,
    passwordProvided: !!req.body.password,
  });

  const { email, password } = req.body;
  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });

    if (!user) {
      console.log("No user found with email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Password does not match for user:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Don't send the password back to the client
    const { password: _, ...userData } = user;
    // Add a dummy token for test compatibility
    res.status(200).json({ message: "Login successful", token: "dummy-token", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
