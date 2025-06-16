import { Router } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../startup/db";
import { User } from "../../entities/User";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const { password: _, ...userData } = user;
    res.json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;