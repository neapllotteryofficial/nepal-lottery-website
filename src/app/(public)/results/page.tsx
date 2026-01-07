import { db } from "@/db";
import { imageResults, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { AllResultsClient } from "@/components/lottery/all-results-client";

// Force dynamic ensures we get fresh data on every request
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function ResultsPage() {
  // Fetch All Recent Results (Limit badha diya taaki history dikh sake)
  // Hum client side filtering use kar rahe hain, isliye zyada data fetch kar rahe hain.
  const data = await db
    .select({
      id: imageResults.id,
      title: imageResults.title,
      description: imageResults.description,
      imageUrl: imageResults.imageUrl,
      resultDate: imageResults.resultDate,
      categoryName: categories.name,
    })
    .from(imageResults)
    .leftJoin(categories, eq(imageResults.categoryId, categories.id))
    .orderBy(desc(imageResults.resultDate))
    .limit(100); // Last 100 results fetch kar rahe hain for performance

  return (
    <div className="container max-w-[1600px] mx-auto py-10 px-4 md:px-6">
      <AllResultsClient data={data} />
    </div>
  );
}
