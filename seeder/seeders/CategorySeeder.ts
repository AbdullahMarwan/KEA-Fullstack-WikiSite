import { DataSource } from "typeorm";
import { Category } from "../entities/Category";

export const seedCategories = async (dataSource: DataSource): Promise<void> => {
  console.log("Seeding categories...");

  const categoryRepository = dataSource.getRepository(Category);

  // Check if categories already exist
  const count = await categoryRepository.count();
  if (count > 0) {
    console.log("Categories already seeded");
    return;
  }

  // Categories to seed
  const categories = [
    { id: 1, category_type: "now_playing" },
    { id: 2, category_type: "popular" },
    { id: 3, category_type: "trending" },
    { id: 4, category_type: "upcoming" },
  ];

  // Insert categories
  await categoryRepository.insert(categories);
  console.log(`Seeded ${categories.length} categories`);
};
