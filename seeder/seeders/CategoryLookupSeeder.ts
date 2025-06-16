import { DataSource } from "typeorm";
import { Content } from "../entities/Content";
import { Category } from "../entities/Category";
import { CategoryLookup } from "../entities/CategoryLookup";

export const seedCategoryLookups = async (
  dataSource: DataSource,
  contentCategoryMap: Map<number, string>
): Promise<void> => {
  console.log("Seeding category lookups...");

  const categoryLookupRepository = dataSource.getRepository(CategoryLookup);
  const contentRepository = dataSource.getRepository(Content);
  const categoryRepository = dataSource.getRepository(Category);

  // Get all categories
  const categories = await categoryRepository.find();
  const categoryMap = new Map();
  categories.forEach((category) => {
    categoryMap.set(category.category_type, category);
  });

  // Get all content items
  const contentItems = await contentRepository.find();
  console.log(`Found ${contentItems.length} content items to categorize`);

  // Clear existing lookups
  await categoryLookupRepository.clear();

  // Create lookup entries with proper categorization
  const lookups = [];

  for (const content of contentItems) {
    // Get the category for this content
    const categoryType = contentCategoryMap.get(content.id) || "popular"; // Default to popular if not found
    const category = categoryMap.get(categoryType);

    if (!category) {
      console.warn(
        `Category ${categoryType} not found for content ID ${content.id}`
      );
      continue;
    }

    const lookup = new CategoryLookup();
    lookup.contentId = content.id;
    lookup.categoryId = category.id;
    lookups.push(lookup);
  }

  // Save all lookups with the relationships
  await categoryLookupRepository.save(lookups);

  console.log(
    `Added ${lookups.length} category lookup relationships across all categories`
  );
};
