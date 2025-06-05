import { Router } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../startup/db";
import { User } from "../../entities/User";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const userRepo = AppDataSource.getRepository(User);
    const existing = await userRepo.findOneBy({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 12);
    const user = userRepo.create({ first_name, last_name, email, password: hashed });
    await userRepo.save(user);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;