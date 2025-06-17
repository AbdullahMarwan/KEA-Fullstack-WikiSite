import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Content } from "../entities/Content";

const router = Router();

// Get all content
router.get("/", async (_req, res) => {
  try {
    const contentRepo = AppDataSource.getRepository(Content);
    const allContent = await contentRepo.find();
    res.json(allContent);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get content by ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const contentRepo = AppDataSource.getRepository(Content);
    const content = await contentRepo.findOneBy({ id });
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;