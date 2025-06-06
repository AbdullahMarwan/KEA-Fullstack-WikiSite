import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { User } from "../entities/User";
import { Content } from "../entities/Content";

const favoritesRouter = Router();

// Get favorites for a user
favoritesRouter.get("/:userId", async (req: Request, res: Response) => {
  // Get userId from route parameters
  const userId = Number(req.params.userId);
  console.log("Fetching favorites for user ID:", userId);

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { user_id: userId },
      relations: ["favorites"],
    });

    if (!user) {
      console.log(`User ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(
      `Found ${user.favorites?.length || 0} favorites for user ${userId}`
    );
    res.json(user.favorites || []);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({
      message: "Server error while fetching favorites",
      error: error.message,
    });
  }
});

// Add a favorite
favoritesRouter.post("/", async (req: Request, res: Response) => {
  const { user_id, content_id } = req.body;
  console.log(`Adding content ${content_id} to favorites for user ${user_id}`);

  try {
    const userRepo = AppDataSource.getRepository(User);
    const contentRepo = AppDataSource.getRepository(Content);
    const user = await userRepo.findOne({
      where: { user_id },
      relations: ["favorites"],
    });
    const content = await contentRepo.findOneBy({ id: content_id });
    if (!user || !content)
      return res.status(404).json({ message: "User or content not found" });

    user.favorites = [...(user.favorites || []), content];
    await userRepo.save(user);
    res.json({ message: "Favorite added" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({
      message: "Server error while adding favorite",
      error: error.message,
    });
  }
});

// Complete DELETE handler implementation
favoritesRouter.delete(
  "/:userId/:contentId",
  async (req: Request, res: Response) => {
    // Explicitly convert URL parameters to numbers
    const userId = Number(req.params.userId);
    const contentId = Number(req.params.contentId);
    console.log(
      `Removing content ${contentId} (type: ${typeof contentId}) from favorites for user ${userId} (type: ${typeof userId})`
    );

    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { user_id: userId },
        relations: ["favorites"],
      });

      if (!user) {
        console.log(`User ${userId} not found`);
        return res.status(404).json({ message: "User not found" });
      }

      // Debug logging
      console.log(
        "Before filtering - Favorites:",
        user.favorites?.map((f) => ({ id: f.id, type: typeof f.id }))
      );

      // Store original length for comparison
      const originalLength = user.favorites?.length || 0;

      // Make sure favorites is initialized
      if (!user.favorites) {
        user.favorites = [];
      }

      // Try strict equality filtering with explicit type conversion
      user.favorites = user.favorites.filter((fav) => {
        // Convert both sides to numbers for proper comparison
        return Number(fav.id) !== Number(contentId);
      });

      console.log(
        "After filtering - Favorites:",
        user.favorites?.map((f) => ({ id: f.id })),
        `Removed ${originalLength - user.favorites.length} items`
      );

      // Save changes to database
      await userRepo.save(user);

      return res.status(200).json({
        message: "Favorite removed successfully",
        removedId: contentId,
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      return res.status(500).json({
        message: "Server error while removing favorite",
        error: error.message,
      });
    }
  }
);

export default favoritesRouter;
