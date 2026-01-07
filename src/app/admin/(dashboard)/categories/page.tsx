import { db } from "@/db";
import { categories } from "@/db/schema";
import { desc } from "drizzle-orm";
import { CategoriesClient } from "@/components/admin/categories-client"; // ✅ Import

export default async function CategoriesPage() {
  const data = await db
    .select()
    .from(categories)
    .orderBy(desc(categories.createdAt));

  return <CategoriesClient data={data} />;
}
