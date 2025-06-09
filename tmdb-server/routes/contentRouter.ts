import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { Content } from "../entities/Content";

const router = Router();

// Verify your contentRouter has a GET handler for the root path
router.get("/", async (_req: Request, res: Response) => {
  try {
    const contentRepo = AppDataSource.getRepository(content);
    const allContent = await contentRepo.find();

    // Add debugging to verify data
    console.log(`Found ${allContent.length} content items in database`);
    if (allContent.length > 0) {
      console.log("Sample content:", allContent.slice(0, 2));
    } else {
      console.log("NO CONTENT FOUND IN DATABASE!");
    }

    res.json(allContent);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

// Get content by ID
router.get("/:id", async (req: Request, res: Response) => {
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
