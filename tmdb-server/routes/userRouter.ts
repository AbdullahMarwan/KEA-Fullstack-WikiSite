import { Router} from "express";
import { AppDataSource } from "../startup/db";
import { User } from "../entities/User";

const router = Router();

// Get a single user by ID (excluding password)
router.get("/:id", async (req, res,) => {
  const userId = Number(req.params.id);
  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { user_id: userId },
      select: ["user_id", "first_name", "last_name", "email"],
      relations: ["favorites"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;