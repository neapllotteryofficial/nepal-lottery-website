"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { categories, imageResults } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { digitResults } from "@/db/schema";
import { contactSubmissions } from "@/db/schema";

// 1. Create Category
export async function createCategory(name: string) {
  try {
    if (!name) throw new Error("Name is required");

    await db.insert(categories).values({
      name,
    });

    revalidatePath("/admin/categories");
    return { success: true, message: "Category added successfully" };
  } catch (error) {
    return { success: false, message: "Failed to add category" };
  }
}

// 2. Delete Category
export async function deleteCategory(id: string) {
  try {
    await db.delete(categories).where(eq(categories.id, id));

    revalidatePath("/admin/categories");
    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete category" };
  }
}

// 3. Create Image Result (with File Upload)
export async function createImageResult(formData: FormData) {
  // ✅ Ab ye function chalega kyunki createClient import ho gaya hai
  const supabase = await createClient();

  // 1. Data Extract
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const dateStr = formData.get("date") as string;
  const file = formData.get("image") as File;

  if (!title || !categoryId || !dateStr || !file) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    // 2. Upload Image to Supabase Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("results") // Make sure bucket name 'results' hai
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload Error:", uploadError);
      throw new Error("Image upload failed");
    }

    // 3. Get Public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("results").getPublicUrl(filePath);

    // 4. Insert into Database
    await db.insert(imageResults).values({
      title,
      description,
      categoryId,
      resultDate: new Date(dateStr),
      imageUrl: publicUrl,
    });

    revalidatePath("/admin/image-results");
    revalidatePath("/");
    revalidatePath("/results");

    return { success: true, message: "Result uploaded successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to upload result" };
  }
}

// 4. Delete Image Result
export async function deleteImageResult(id: string, imageUrl: string) {
  const supabase = await createClient();

  try {
    // 1. Delete from Storage
    const fileName = imageUrl.split("/").pop();
    if (fileName) {
      await supabase.storage.from("results").remove([fileName]);
    }

    // 2. Delete from DB
    await db.delete(imageResults).where(eq(imageResults.id, id));

    revalidatePath("/admin/image-results");
    revalidatePath("/");
    return { success: true, message: "Result deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete result" };
  }
}

// 5. Upsert Digit Result (Single Shift Logic)
export async function upsertDigitResult(formData: FormData) {
  try {
    const dateStr = formData.get("date") as string;
    const shift = formData.get("shift") as string; // 'morning', 'day', or 'evening'
    const digitRaw = formData.get("digit") as string;
    
    // Validation
    if (!dateStr || !shift || digitRaw === "") {
        return { success: false, message: "Date, Shift and Digit are required" };
    }

    const digit = parseInt(digitRaw);
    if (isNaN(digit) || digit < 0 || digit > 9) {
        return { success: false, message: "Digit must be between 0-9" };
    }

    // Check if entry exists for this date
    const existing = await db.query.digitResults.findFirst({
      where: eq(digitResults.resultDate, dateStr),
    });

    if (existing) {
      // UPDATE: Sirf selected shift update karein, baaki waisa hi rakhein
      await db.update(digitResults)
        .set({
          morningDigit: shift === "morning" ? digit : existing.morningDigit,
          dayDigit: shift === "day" ? digit : existing.dayDigit,
          eveningDigit: shift === "evening" ? digit : existing.eveningDigit,
        })
        .where(eq(digitResults.resultDate, dateStr));
        
      revalidatePath("/admin/digit-results");
      revalidatePath("/results");
      return { success: true, message: `${shift.toUpperCase()} result updated to ${digit}` };
    } else {
      // INSERT: Nayi row banayein aur sirf selected shift fill karein
      await db.insert(digitResults).values({
        resultDate: dateStr,
        morningDigit: shift === "morning" ? digit : null,
        dayDigit: shift === "day" ? digit : null,
        eveningDigit: shift === "evening" ? digit : null,
      });

      revalidatePath("/admin/digit-results");
      revalidatePath("/results");
      return { success: true, message: `${shift.toUpperCase()} result added: ${digit}` };
    }

  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to save digit result" };
  }
}

// 6. Delete Digit Result (Full Row)
export async function deleteDigitResult(id: string) {
  try {
    await db.delete(digitResults).where(eq(digitResults.id, id));
    
    revalidatePath("/admin/digit-results");
    revalidatePath("/results");
    return { success: true, message: "Entry deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete entry" };
  }
}

// 7. Delete Message
export async function deleteMessage(id: string) {
  try {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
    revalidatePath("/admin/messages");
    return { success: true, message: "Message deleted" };
  } catch (error) {
    return { success: false, message: "Failed to delete message" };
  }
}

// 8. Mark Message as Read
export async function markMessageAsRead(id: string) {
  try {
    await db
      .update(contactSubmissions)
      .set({ status: "read" })
      .where(eq(contactSubmissions.id, id));
      
    revalidatePath("/admin/messages");
    return { success: true, message: "Marked as read" };
  } catch (error) {
    return { success: false, message: "Failed to update status" };
  }
}

// 9. Update Image Result
export async function updateImageResult(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const dateStr = formData.get("date") as string;
  const file = formData.get("image") as File;

  if (!id || !title || !categoryId || !dateStr) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    let publicUrl = undefined;

    // Agar nayi image upload ki gayi hai
    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("results")
        .upload(filePath, file);

      if (uploadError) throw new Error("Image upload failed");

      const { data } = supabase.storage.from("results").getPublicUrl(filePath);
      publicUrl = data.publicUrl;
    }

    // Update Query
    await db.update(imageResults)
      .set({
        title,
        description,
        categoryId,
        resultDate: new Date(dateStr),
        ...(publicUrl ? { imageUrl: publicUrl } : {}), // Sirf tab update karein jab nayi image ho
      })
      .where(eq(imageResults.id, id));

    revalidatePath("/admin/image-results");
    revalidatePath("/");
    revalidatePath("/results");

    return { success: true, message: "Result updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update result" };
  }
}

// 10. Save Single Digit Result (Upsert Logic)
export async function saveDigitResult(formData: FormData) {
  try {
    const dateStr = formData.get("date") as string;
    const shift = formData.get("shift") as string; // 'morning', 'day', 'evening'
    const digitRaw = formData.get("digit") as string;

    if (!dateStr || !shift || digitRaw === "") {
        return { success: false, message: "Date, Shift and Digit are required" };
    }

    const digit = parseInt(digitRaw);
    if (isNaN(digit) || digit < 0 || digit > 9) {
        return { success: false, message: "Digit must be between 0-9" };
    }

    // Check if row exists for this date
    const existing = await db.query.digitResults.findFirst({
       where: eq(digitResults.resultDate, dateStr) 
    });

    if (existing) {
      // UPDATE existing row: Sirf selected shift update karein
      await db.update(digitResults)
        .set({
          morningDigit: shift === "morning" ? digit : existing.morningDigit,
          dayDigit: shift === "day" ? digit : existing.dayDigit,
          eveningDigit: shift === "evening" ? digit : existing.eveningDigit,
        })
        .where(eq(digitResults.id, existing.id));
        
      revalidatePath("/admin/digit-results");
      revalidatePath("/results");
      return { success: true, message: `${shift.toUpperCase()} updated to ${digit}` };
    } else {
      // INSERT new row
      await db.insert(digitResults).values({
        resultDate: dateStr,
        morningDigit: shift === "morning" ? digit : null,
        dayDigit: shift === "day" ? digit : null,
        eveningDigit: shift === "evening" ? digit : null,
      });

      revalidatePath("/admin/digit-results");
      revalidatePath("/results");
      return { success: true, message: `New entry: ${shift.toUpperCase()} is ${digit}` };
    }

  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to save result." };
  }
}

// 11. Update Category
export async function updateCategory(id: string, name: string) {
  try {
    if (!name) throw new Error("Name is required");

    await db.update(categories)
      .set({ name })
      .where(eq(categories.id, id));

    revalidatePath("/admin/categories");
    return { success: true, message: "Category updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update category" };
  }
}