"use client";

import { motion } from "framer-motion";
import { MessageList } from "@/components/admin/message-list";

interface MessageData {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string | null;
  createdAt: Date;
}

export function MessagesClient({ data }: { data: MessageData[] }) {
  return (
    <div className="relative min-h-full overflow-hidden">
      {/* 1. BACKGROUND BLOBS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[5%] right-[10%] w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"
      />

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
            Inbox
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground"
          >
            Read and manage inquiries from your users.
          </motion.p>
        </div>

        {/* Message List Component */}
        <MessageList initialMessages={data} />
      </motion.div>
    </div>
  );
}
