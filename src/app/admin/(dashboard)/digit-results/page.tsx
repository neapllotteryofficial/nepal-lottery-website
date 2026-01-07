import { db } from "@/db";
import { digitResults } from "@/db/schema";
import { desc } from "drizzle-orm";
import { DigitResultsClient } from "@/components/admin/digit-results-client"; // ✅ Import

export default async function DigitResultsPage() {
  // Fetch recent 50 entries
  const data = await db
    .select()
    .from(digitResults)
    .orderBy(desc(digitResults.resultDate))
    .limit(50);

  // ✅ Pass data to Animated Client Component
  return <DigitResultsClient data={data} />;
}
