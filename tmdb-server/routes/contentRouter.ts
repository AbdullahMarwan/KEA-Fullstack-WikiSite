import { Router } from "express";
import { AppDataSource } from "../startup/db";
import { Content } from "../entities/Content";

const contentRouter = Router();

// Get all content
contentRouter.get("/", async (_req, res) => {
  try {
    const contentRepo = AppDataSource.getRepository(Content);
    const allContent = await contentRepo.find();
    res.json(allContent);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get content by ID
contentRouter.get("/:id", async (req, res) => {
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

export default contentRouter;