import { db } from "@/db";
import { digitResults, imageResults, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { format } from "date-fns"; // Date logic ke liye

import { Hero } from "@/components/layout/hero";
import { LatestDigitResults } from "@/components/lottery/latest-digit-results";
import { LatestImageResults } from "@/components/lottery/latest-image-results";
import { CTASection } from "@/components/layout/cta-section";
import { getYoutubeLink } from "@/app/actions";

export const revalidate = 60;

export default async function HomePage() {
  const todayStr = format(new Date(), "yyyy-MM-dd");

  // 1. Fetch Latest Digit Result
  const latestDigit = await db.query.digitResults.findFirst({
    orderBy: [desc(digitResults.resultDate)],
  });

  // Check if today's digit exists
  // Logic: Agar latest entry ka date 'todayStr' se match nahi karta, toh pending hai.
  const isDigitToday = latestDigit?.resultDate === todayStr;

  // 2. Fetch Recent Images
  const recentImages = await db
    .select({
      id: imageResults.id,
      title: imageResults.title,
      imageUrl: imageResults.imageUrl,
      resultDate: imageResults.resultDate,
      categoryName: categories.name,
    })
    .from(imageResults)
    .leftJoin(categories, eq(imageResults.categoryId, categories.id))
    .orderBy(desc(imageResults.resultDate))
    .limit(4);

  // Check if today's image exists (Check first image's date)
  const isImageToday =
    recentImages.length > 0 &&
    format(new Date(recentImages[0].resultDate), "yyyy-MM-dd") === todayStr;

  const youtubeLink = await getYoutubeLink();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero youtubeLink={youtubeLink} />

      {/* Pass isToday flag */}
      <LatestDigitResults data={latestDigit} isToday={isDigitToday} />

      <LatestImageResults data={recentImages} isToday={isImageToday} />

      <CTASection />
    </div>
  );
}
