"use client";

import { motion } from "framer-motion";
import { CategoryList } from "@/components/admin/category-list";

// Type definition
type Category = {
  id: string;
  name: string;
  createdAt: Date;
};

export function CategoriesClient({ data }: { data: Category[] }) {
  return (
    <div className="relative min-h-full">
      {/* 2. MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 container max-w-6xl mx-auto py-10 px-4 md:px-6 space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
          >
            Categories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground"
          >
            Create and manage time slots for lottery results.
          </motion.p>
        </div>

        {/* List Component (Has its own animations) */}
        <CategoryList initialData={data} />
      </motion.div>
    </div>
  );
}
