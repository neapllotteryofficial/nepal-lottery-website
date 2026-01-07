"use client";

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  ImageIcon,
  Hash,
  Mail,
  Layers,
  ArrowUpRight,
  Calendar,
  MoreHorizontal,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Types define karte hain jo Server se aayenge
interface DashboardClientProps {
  imagesCount: number;
  unreadCount: number;
  categoriesCount: number;
  todayDigitEntry:
    | {
        morningDigit: number | null;
        dayDigit: number | null;
        eveningDigit: number | null;
      }
    | undefined;
  recentUploads: {
    id: string;
    title: string;
    imageUrl: string;
    resultDate: Date;
    categoryName: string | null;
  }[];
}

export function DashboardClient({
  imagesCount,
  unreadCount,
  categoriesCount,
  todayDigitEntry,
  recentUploads,
}: DashboardClientProps) {
  // ✅ Animation Variants (Stagger Effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Har item 0.1s ke gap mein aayega
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Logic for Digits Progress
  let completedShifts = 0;
  if (
    todayDigitEntry?.morningDigit !== null &&
    todayDigitEntry?.morningDigit !== undefined
  )
    completedShifts++;
  if (
    todayDigitEntry?.dayDigit !== null &&
    todayDigitEntry?.dayDigit !== undefined
  )
    completedShifts++;
  if (
    todayDigitEntry?.eveningDigit !== null &&
    todayDigitEntry?.eveningDigit !== undefined
  )
    completedShifts++;
  const progressPercentage = (completedShifts / 3) * 100;

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* 1. ANIMATED BACKGROUND BLOBS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* 2. MAIN ANIMATED CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container max-w-6xl mx-auto py-8 px-4 md:px-6 space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your lottery system status and recent activities.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Card 1: Total Images */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Images
              </CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{imagesCount}</div>
              <p className="text-xs text-muted-foreground">
                Lifetime uploaded results
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Today's Digits */}
          <Card className="shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-primary/5 transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">
                Today's Lucky Digits
              </CardTitle>
              <Hash className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold">{completedShifts}/3</div>
              <p className="text-xs text-muted-foreground">
                Shifts updated today
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Unread Messages */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unread Messages
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>

          {/* Card 4: Categories */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Categories
              </CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoriesCount}</div>
              <p className="text-xs text-muted-foreground">Result time slots</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Section: Quick Actions & Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="col-span-full lg:col-span-3"
          >
            <Card className="h-full shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Link
                  href="/admin/image-results"
                  className="flex items-center justify-between p-3 rounded-xl border bg-background/50 hover:bg-blue-500/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Upload Result</h4>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500" />
                </Link>

                <Link
                  href="/admin/digit-results"
                  className="flex items-center justify-between p-3 rounded-xl border bg-background/50 hover:bg-purple-500/5 hover:border-purple-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Hash className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Update Digits</h4>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500" />
                </Link>

                <Link
                  href="/admin/messages"
                  className="flex items-center justify-between p-3 rounded-xl border bg-background/50 hover:bg-pink-500/5 hover:border-pink-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">
                        Inbox ({unreadCount})
                      </h4>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-pink-500" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Uploads */}
          <motion.div
            variants={itemVariants}
            className="col-span-full lg:col-span-4"
          >
            <Card className="h-full shadow-sm">
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUploads.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground text-sm">
                      No results uploaded yet.
                    </div>
                  ) : (
                    recentUploads.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 rounded-lg border">
                            <AvatarFallback className="rounded-lg bg-muted">
                              IMG
                            </AvatarFallback>
                            {/* Agar image load fail ho toh fallback dikhega, but usually src work karega */}
                            <img
                              src={item.imageUrl}
                              alt="Result"
                              className="h-full w-full object-cover"
                            />
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                              {item.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge
                                variant="secondary"
                                className="text-[10px] h-4 px-1"
                              >
                                {item.categoryName || "General"}
                              </Badge>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(item.resultDate), "MMM d")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
