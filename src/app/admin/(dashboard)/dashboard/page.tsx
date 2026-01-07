import { db } from "@/db";
import {
  imageResults,
  digitResults,
  contactSubmissions,
  categories,
} from "@/db/schema";
import { desc, eq, count } from "drizzle-orm";
import { format } from "date-fns";

// ✅ Import new Client Component
import { DashboardClient } from "@/components/admin/dashboard-client";

export default async function DashboardPage() {
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const [
    imagesCountRes,
    todayDigitEntry,
    unreadCountRes,
    categoriesCountRes,
    recentUploads,
  ] = await Promise.all([
    db.select({ value: count() }).from(imageResults),
    db.query.digitResults.findFirst({
      where: eq(digitResults.resultDate, todayStr),
    }),
    db
      .select({ value: count() })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "unread")),
    db.select({ value: count() }).from(categories),
    db
      .select({
        id: imageResults.id,
        title: imageResults.title,
        imageUrl: imageResults.imageUrl,
        resultDate: imageResults.resultDate,
        categoryName: categories.name,
      })
      .from(imageResults)
      .leftJoin(categories, eq(imageResults.categoryId, categories.id))
      .orderBy(desc(imageResults.createdAt))
      .limit(5),
  ]);

  return (
    <DashboardClient
      imagesCount={imagesCountRes[0].value}
      unreadCount={unreadCountRes[0].value}
      categoriesCount={categoriesCountRes[0].value}
      todayDigitEntry={todayDigitEntry}
      recentUploads={recentUploads}
    />
  );
}
