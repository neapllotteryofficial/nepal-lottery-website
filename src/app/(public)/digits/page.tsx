import { db } from "@/db";
import { digitResults } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AllDigitsClient } from "@/components/lottery/all-digits-client";

// Ensure fresh data
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function DigitsPage() {
  // Fetch All History (Ordered by Date Descending)
  const data = await db
    .select()
    .from(digitResults)
    .orderBy(desc(digitResults.resultDate))
    .limit(100); // Last 100 days ka data kaafi hai

  // Transform Data for Client
  const formattedData = data.map((item) => ({
    id: item.id,
    date: new Date(item.resultDate),
    morning: item.morningDigit,
    day: item.dayDigit,
    evening: item.eveningDigit,
  }));

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 md:px-6">
      <AllDigitsClient data={formattedData} />
    </div>
  );
}
