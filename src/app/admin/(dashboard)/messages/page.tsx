import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { desc } from "drizzle-orm";
import { MessagesClient } from "@/components/admin/messages-client";

export default async function MessagesPage() {
  const messages = await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));

  return <MessagesClient data={messages} />;
}
