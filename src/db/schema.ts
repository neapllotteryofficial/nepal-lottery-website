// src/db/schema.ts
import { pgTable, uuid, text, timestamp, integer, date, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Categories Table (Dynamic: 11:20 AM, etc.)
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(), // e.g., "11:20 AM Result"
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. Image Results Table
export const imageResults = pgTable('image_results', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(), // e.g., "05/01/2026 Result | 11:20 PM"
  resultDate: timestamp('result_date').notNull(), // Filter karne ke liye
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'cascade' }).notNull(),
  description: text('description'), // Markdown supported
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations for Image Results
export const imageResultsRelations = relations(imageResults, ({ one }) => ({
  category: one(categories, {
    fields: [imageResults.categoryId],
    references: [categories.id],
  }),
}));

// 3. Digit Results Table (Designed for Table View: Date | MOR | DAY | EVN)
export const digitResults = pgTable('digit_results', {
  id: uuid('id').defaultRandom().primaryKey(),
  resultDate: date('result_date').unique().notNull(), // Unique date ensures one row per day
  morningDigit: integer('morning_digit'), // Admin can update these individually
  dayDigit: integer('day_digit'),
  eveningDigit: integer('evening_digit'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. Contact Form Submissions
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('unread'), // unread, read
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 5. Site Settings Table (Key-Value Store)
export const siteSettings = pgTable("site_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: text("key").unique().notNull(), // 'youtube_live_url' is column mein store hoga
  value: text("value").notNull(), // Actual YouTube link yahan aayega
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});