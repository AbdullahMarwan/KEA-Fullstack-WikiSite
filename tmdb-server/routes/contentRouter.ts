import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { Content } from "../entities/Content";
import { Category } from "../entities/Category";
import { CategoryLookup } from "../entities/CategoryLookup";

const router = Router();

// NOTE: The /all route needs to come before /:id route
router.get("/all", async (req: Request, res: Response) => {
  console.log("[DEBUG] Fetching all content for movies section");

  try {
    const contentRepo = AppDataSource.getRepository(Content);
    const content = await contentRepo.find({
      take: 100,
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

// Get content by category - fixed route
router.get("/category/:categoryType", async (req: Request, res: Response) => {
  const categoryType = req.params.categoryType;

  try {
    // Use a raw SQL query to avoid the duplicate column issue
    const results = await AppDataSource.getRepository(Content)
      .createQueryBuilder("content")
      .select("content.*") // Only select content columns
      .innerJoin("category_look_up", "lookup", "lookup.Content_id = content.id")
      .innerJoin(
        "category",
        "cat",
        "cat.id = lookup.category_id AND cat.category_type = :categoryType",
        { categoryType }
      )
      .limit(20)
      .getRawMany();

    console.log(`Found ${results.length} items in category: ${categoryType}`);
    res.json(results);
  } catch (error) {
    console.error(
      `Error fetching content for category ${categoryType}:`,
      error
    );
    res.status(500).json({ message: "Error fetching content by category" });
  }
});

// Get all content with filtering
router.get("/", async (req: Request, res: Response) => {
  const { trending, popular, content_type, category } = req.query;

  try {
    const contentRepo = AppDataSource.getRepository(Content);
    let query = contentRepo.createQueryBuilder("content").select("content.*");

    // Handle category-based filtering
    if (category) {
      query = query
        .innerJoin(
          "category_look_up",
          "lookup",
          "lookup.Content_id = content.id"
        )
        .innerJoin(
          "category",
          "cat",
          "cat.id = lookup.category_id AND cat.category_type = :categoryType",
          { categoryType: category }
        );
    }
    // Handle other filters if no category is specified
    else if (trending === "true") {
      query = query
        .innerJoin(
          "category_look_up",
          "lookup",
          "lookup.Content_id = content.id"
        )
        .innerJoin(
          "category",
          "cat",
          "cat.id = lookup.category_id AND cat.category_type = :categoryType",
          { categoryType: "trending" }
        )
        .orderBy("content.vote_average", "DESC");
    } else if (popular === "true") {
      query = query
        .innerJoin(
          "category_look_up",
          "lookup",
          "lookup.Content_id = content.id"
        )
        .innerJoin(
          "category",
          "cat",
          "cat.id = lookup.category_id AND cat.category_type = :categoryType",
          { categoryType: "popular" }
        )
        .orderBy("content.vote_average", "DESC");
    } else if (content_type) {
      // Filter by content type (movie or tv)
      query = query.where("content.content_type = :type", {
        type: content_type,
      });
    }

    // Limit results
    const results = await query.limit(10).getRawMany();
    console.log(`Found ${results.length} content items with query:`, req.query);
    res.json(results);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Error fetching content" });
  }
});

// Get content by ID - keep this as the last route
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
