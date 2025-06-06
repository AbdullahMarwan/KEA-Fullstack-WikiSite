// import { Router, Request, Response } from "express";
// import { AppDataSource } from "../startup/db";
// import { User } from "../entities/User";
// import { Content } from "../entities/Content";

// const favoritesRouter = Router();

// // Get favorites for a user
// favoritesRouter.get("/:userId", async (req: Request, res: Response) => {
//   const userId = Number(req.params.userId);
//   try {
//     const userRepo = AppDataSource.getRepository(User);
//     const user = await userRepo.findOne({
//       where: { user_id: userId },
//       relations: ["favorites"],
//     });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user.favorites);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Add a favorite
// favoritesRouter.post("/", async (req: Request, res: Response) => {
//   const { user_id, content_id } = req.body;
//   try {
//     const userRepo = AppDataSource.getRepository(User);
//     const contentRepo = AppDataSource.getRepository(Content);
//     const user = await userRepo.findOne({
//       where: { user_id },
//       relations: ["favorites"],
//     });
//     const content = await contentRepo.findOneBy({ id: content_id });
//     if (!user || !content)
//       return res.status(404).json({ message: "User or content not found" });

//     user.favorites = [...(user.favorites || []), content];
//     await userRepo.save(user);
//     res.json({ message: "Favorite added" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Remove a favorite
// favoritesRouter.delete(
//   "/:userId/:contentId",
//   async (req: Request, res: Response) => {
//     const userId = Number(req.params.userId);
//     const contentId = Number(req.params.contentId);
//     try {
//       const userRepo = AppDataSource.getRepository(User);
//       const user = await userRepo.findOne({
//         where: { user_id: userId },
//         relations: ["favorites"],
//       });
//       if (!user) return res.status(404).json({ message: "User not found" });

//       user.favorites = (user.favorites || []).filter(
//         (fav) => fav.id !== contentId
//       );
//       await userRepo.save(user);
//       res.json({ message: "Favorite removed" });
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// );

// export default favoritesRouter;
