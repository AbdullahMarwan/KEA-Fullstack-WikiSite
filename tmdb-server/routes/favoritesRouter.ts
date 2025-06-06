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

// Remove a favorite
favoritesRouter.delete(
  "/:userId/:contentId",
  async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const contentId = Number(req.params.contentId);
    console.log(
      `Removing content ${contentId} from favorites for user ${userId}`
    );

    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { user_id: userId },
        relations: ["favorites"],
      });
      if (!user) return res.status(404).json({ message: "User not found" });

      user.favorites = (user.favorites || []).filter(
        (fav) => fav.id !== contentId
      );
      await userRepo.save(user);
      res.json({ message: "Favorite removed" });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({
        message: "Server error while removing favorite",
        error: error.message,
      });
    }
  }
);

const fetchFavorites = async () => {
  const userId = getUserId();
  console.log("User ID for favorites fetch:", userId);

  if (!userId) {
    // Rest of your code
  }

  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/favorites/${userId}`;
    console.log("Fetching favorites from:", apiUrl);

    const response = await axios.get(apiUrl);
    console.log("Favorites API response:", response.data);

    setFavorites(response.data);
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    // Detailed error logging
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    // Rest of your code
  }
};

export default favoritesRouter;
