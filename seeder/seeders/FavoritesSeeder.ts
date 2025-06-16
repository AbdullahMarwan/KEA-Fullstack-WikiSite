import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Content } from "../entities/Content";

export const seedFavorites = async (
  dataSource: DataSource,
  users: User[]
): Promise<void> => {
  console.log("Adding favorite relationships...");

  const userRepository = dataSource.getRepository(User);
  const contentRepository = dataSource.getRepository(Content);

  const allContent = await contentRepository.find();

  for (const user of users) {
    user.favorites = [];
    for (let i = 0; i < 3; i++) {
      const randomContent =
        allContent[Math.floor(Math.random() * allContent.length)];
      if (!user.favorites.find((c) => c.id === randomContent.id)) {
        user.favorites.push(randomContent);
      }
    }
    await userRepository.save(user);
  }

  console.log("Favorites seeding completed");
};
