"use client";

import { motion } from "framer-motion";
import { ImageResultsTable } from "@/components/admin/image-results-table";

// Types replicate kar rahe hain taaki TypeScript khush rahe
interface Category {
  id: string;
  name: string;
}

interface ImageResultData {
  id: string;
  title: string;
  description: string | null;
  categoryId: string;
  categoryName: string | null;
  date: Date;
  imageUrl: string;
}

interface ImageResultsClientProps {
  data: ImageResultData[];
  categories: Category[];
}

export function ImageResultsClient({
  data,
  categories,
}: ImageResultsClientProps) {
  // ✅ Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* 1. ANIMATED BACKGROUND BLOBS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none opacity-50"
      />

      {/* 2. MAIN CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container max-w-6xl mx-auto py-10 px-4 md:px-6 space-y-8"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Image Results
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your daily lottery image uploads efficiently.
            </p>
          </div>

          {/* Stats Badge */}
          <motion.div
            variants={itemVariants}
            className="px-4 py-2 rounded-lg bg-card border shadow-sm text-center min-w-[100px]"
          >
            <span className="block text-2xl font-bold">{data.length}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Total Results
            </span>
          </motion.div>
        </motion.div>

        {/* Table Section */}
        <motion.div variants={itemVariants}>
          <ImageResultsTable data={data} categories={categories} />
        </motion.div>
      </motion.div>
    </div>
  );
}
