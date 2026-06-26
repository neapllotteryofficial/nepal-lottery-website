"use client";

import { motion } from "framer-motion";
import { DigitResultsTable } from "@/components/admin/digit-results-table";

// Types
interface DigitResultData {
  id: string;
  resultDate: string;
  morningDigit: number | null;
  dayDigit: number | null;
  eveningDigit: number | null;
}

export function DigitResultsClient({ data }: { data: DigitResultData[] }) {
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
    <div className="relative min-h-full">
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
              Lucky Digits
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage daily lucky digit results for Morning, Day, and Evening
              shifts.
            </p>
          </div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="flex gap-4">
            <div className="px-4 py-2 rounded-lg bg-card border shadow-sm text-center min-w-[100px]">
              <span className="block text-2xl font-bold">{data.length}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Entries
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Table Section */}
        <motion.div variants={itemVariants}>
          <DigitResultsTable data={data} />
        </motion.div>
      </motion.div>
    </div>
  );
}
