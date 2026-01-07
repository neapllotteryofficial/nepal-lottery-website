"use server";

import { db } from "@/db";
import { contactSubmissions, siteSettings } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

// 1. Submit Contact Form
export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, message: "All fields are required" };
  }

  try {
    await db.insert(contactSubmissions).values({
      name,
      email,
      message,
      status: "unread",
    });

    // Admin panel refresh karein taaki naya message dikhe
    revalidatePath("/admin/messages");
    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to send message" };
  }
}

// 2. Get YouTube Link
export async function getYoutubeLink() {
  try {
    const result = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "youtube_live_url"))
      .limit(1);

    return result[0]?.value || "";
  } catch (error) {
    console.error("Error fetching settings:", error);
    return "";
  }
}

// 3. Update YouTube Link
export async function updateYoutubeLink(url: string) {
  try {
    // Upsert (Insert or Update if exists)
    await db
      .insert(siteSettings)
      .values({
        key: "youtube_live_url",
        value: url,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value: url, updatedAt: new Date() },
      });

    revalidatePath("/"); // Public home page refresh
    return { success: true, message: "Link updated successfully" };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, message: "Failed to update link" };
  }
}
