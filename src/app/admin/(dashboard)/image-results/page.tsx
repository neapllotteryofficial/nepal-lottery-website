import { db } from "@/db";
import { categories, imageResults } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ImageResultsClient } from "@/components/admin/image-results-client"; // ✅ Import

export default async function ImageResultsPage() {
  // Fetch Data
  const categoryData = await db.select().from(categories);

  const resultsData = await db
    .select({
      id: imageResults.id,
      title: imageResults.title,
      description: imageResults.description,
      date: imageResults.resultDate,
      imageUrl: imageResults.imageUrl,
      categoryId: imageResults.categoryId,
      categoryName: categories.name,
    })
    .from(imageResults)
    .leftJoin(categories, eq(imageResults.categoryId, categories.id))
    .orderBy(desc(imageResults.resultDate));

  // ✅ Pass data to Animated Client Component
  return <ImageResultsClient data={resultsData} categories={categoryData} />;
}
