// import express from "express";
// import bcrypt from "bcrypt";
// import { AppDataSource } from "../../startup/db";
// import { User } from "../../entities/User";

// // Remove duplicate Router import and just use express.Router()
// const router = express.Router();

// // Add proper type annotations
// router.post("/", async (req: express.Request, res: express.Response) => {
//   const { email, password } = req.body;
//   try {
//     const userRepo = AppDataSource.getRepository(User);
//     const user = await userRepo.findOneBy({ email });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ message: "Invalid credentials" });

//     const { password: _, ...userData } = user;
//     return res.json({ message: "Login successful", user: userData });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
