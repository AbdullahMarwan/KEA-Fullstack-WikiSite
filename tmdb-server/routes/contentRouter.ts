import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { Content } from "../entities/Content";

const router = Router();

// Get all content
router.get("/", async (req: Request, res: Response) => {
  const { trending, popular, content_type } = req.query;

  try {
    const contentRepo = AppDataSource.getRepository(Content);
    let query = contentRepo.createQueryBuilder("content");

    if (trending === "true") {
      // Handle trending content query
      query = query.orderBy("content.vote_average", "DESC");
    } else if (popular === "true") {
      // Handle popular content query
      query = query.orderBy("content.vote_average", "DESC");
    } else if (content_type) {
      // Filter by content type (movie or tv)
      query = query.where("content.content_type = :type", {
        type: content_type,
      });
    }

    // Limit results
    const results = await query.take(10).getMany();
    console.log(`Found ${results.length} content items with query:`, req.query);
    res.json(results);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Error fetching content" });
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

// Add a simple endpoint that returns content without complex filtering
router.get("/all", async (req: Request, res: Response) => {
  console.log("[DEBUG] Fetching all content for movies section");

  try {
    const contentRepo = AppDataSource.getRepository(Content);
    const content = await contentRepo.find({
      take: 20,
      order: {
        vote_average: "DESC",
      },
    });

    console.log(
      `[DEBUG] Found ${content.length} content items for MovieSection`
    );
    if (content.length > 0) {
      console.log("[DEBUG] First content item:", {
        id: content[0].id,
        title: content[0].title,
        type: content[0].content_type,
      });
    } else {
      console.log("[DEBUG] No content found in database!");
    }

    res.json(content);
  } catch (error) {
    console.error("[DEBUG] Error fetching content:", error);
    res.status(500).json({ message: "Error fetching content" });
  }
});

export default router;
