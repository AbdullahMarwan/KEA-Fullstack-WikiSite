import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { Content } from "../entities/Content";

const router = Router();

// Get all content
router.get("/", async (req: Request, res: Response) => {
  try {
    // Check if AppDataSource is initialized
    if (!AppDataSource.isInitialized) {
      console.error("Database connection not initialized");
      return res.status(500).json({ message: "Database connection error" });
    }

    const contentRepo = AppDataSource.getRepository(Content);

    // Get query parameters
    const content_type = req.query.content_type as string;

    let query = contentRepo.createQueryBuilder("content");

    // Filter by content_type
    if (content_type) {
      query = query.andWhere("content.content_type = :type", {
        type: content_type,
      });
    }

    switch (content_type) {
      case "movie":
      case "tv":
        query = query.orderBy("content.vote_average", "DESC");
        // For movies and TV shows, we can add more specific filters if needed
        break;
    }

    // Limit results
    query = query.take(10);

    const allContent = await query.getMany();
    console.log(`Found ${allContent.length} content items`);
    res.json(allContent);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({
      message: "Server error",
      error: error.toString(),
      stack: error.stack,
    });
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
