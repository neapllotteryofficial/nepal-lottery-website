import { notFound } from "next/navigation";
import { db } from "@/db";
import { imageResults, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";

import { SingleResultClient } from "@/components/lottery/single-result-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Dynamic Metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const result = await db.query.imageResults.findFirst({
    where: eq(imageResults.id, id),
    with: {
      category: true, // Assuming relation setup in schema, otherwise manual fetch
    },
  });

  if (!result) {
    return {
      title: "Result Not Found - Nepal Lottery",
    };
  }

  return {
    title: `${result.title} | Nepal Lottery`,
    description:
      result.description?.slice(0, 160) ||
      `View official lottery result for ${result.title}.`,
    openGraph: {
      images: [result.imageUrl],
      title: result.title,
      description: result.description || "Official Lottery Result",
    },
  };
}

// 2. Main Page Component
export default async function ResultDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch Data with Join manually (safe approach)
  const result = await db
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
    .where(eq(imageResults.id, id))
    .limit(1);

  const data = result[0];

  if (!data) {
    return notFound();
  }

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4 md:px-6">
      <SingleResultClient data={data} />
    </div>
  );
}
