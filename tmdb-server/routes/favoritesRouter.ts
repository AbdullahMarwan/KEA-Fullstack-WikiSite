import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { User } from "../entities/User";
import { Content } from "../entities/Content";

const favoritesRouter = Router();

// Get favorites for a user
favoritesRouter.get("/:userId", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    // Find the user and load their favorites
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId }, // Changed from user_id to id
      relations: ["favorites"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user.favorites);
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return res.status(500).json({ message: "Error fetching user favorites" });
  }
});

// Add a favorite for a user
favoritesRouter.post(
  "/:userId/:contentId",
  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const contentId = parseInt(req.params.contentId);

    try {
      // Find the user
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: userId }, // Changed from user_id to id
        relations: ["favorites"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the content
      const content = await AppDataSource.getRepository(Content).findOne({
        where: { id: contentId },
      });

      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

      // Add content to user's favorites if not already present
      if (!user.favorites.some((fav) => fav.id === contentId)) {
        user.favorites.push(content);
        await AppDataSource.getRepository(User).save(user);
      }

      return res.status(201).json({ message: "Favorite added successfully" });
    } catch (error) {
      console.error("Error adding favorite:", error);
      return res.status(500).json({ message: "Error adding favorite" });
    }
  }
);

// Remove a favorite from a user
favoritesRouter.delete(
  "/:userId/:contentId",
  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const contentId = parseInt(req.params.contentId);

    try {
      // Find the user
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: userId }, // Changed from user_id to id
        relations: ["favorites"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove the content from user's favorites
      user.favorites = user.favorites.filter((fav) => fav.id !== contentId);
      await AppDataSource.getRepository(User).save(user);

      return res.json({ message: "Favorite removed successfully" });
    } catch (error) {
      console.error("Error removing favorite:", error);
      return res.status(500).json({ message: "Error removing favorite" });
    }
  }
);

export default favoritesRouter;
