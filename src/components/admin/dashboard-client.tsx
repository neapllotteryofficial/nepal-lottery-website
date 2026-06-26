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
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  // Animation Variants
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

  // Logic for Digits Progress
  let completedShifts = 0;
  if (todayDigitEntry?.morningDigit !== null && todayDigitEntry?.morningDigit !== undefined) completedShifts++;
  if (todayDigitEntry?.dayDigit !== null && todayDigitEntry?.dayDigit !== undefined) completedShifts++;
  if (todayDigitEntry?.eveningDigit !== null && todayDigitEntry?.eveningDigit !== undefined) completedShifts++;
  const progressPercentage = (completedShifts / 3) * 100;

  // Dynamic Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const currentDate = format(new Date(), "EEEE, MMMM do, yyyy");

  return (
    <div className="relative min-h-full">
      {/* 2. MAIN ANIMATED CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container max-w-6xl mx-auto py-8 px-4 md:px-6 space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              {greeting}, Admin 👋
            </h1>
            <p className="text-muted-foreground">
              Here is what's happening with your lottery system today.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-card border shadow-sm rounded-xl text-sm font-medium">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{currentDate}</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Card 1: Total Images */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Uploads
              </CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <ImageIcon className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{imagesCount}</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span>Lifetime image results</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Today's Digits */}
          <Card className="shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div
              className="absolute left-0 top-0 bottom-0 bg-primary/5 transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">
                Today's Shifts
              </CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Hash className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold">{completedShifts} / 3</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                {completedShifts === 3 ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span className="text-green-600 dark:text-green-400 font-medium">All shifts updated</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3" />
                    <span>Pending updates remaining</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Unread Messages */}
          <Card className={`shadow-sm hover:shadow-md transition-shadow ${unreadCount > 0 ? "border-pink-500/30 bg-pink-500/5" : ""}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inbox
              </CardTitle>
              <div className={`p-2 rounded-lg ${unreadCount > 0 ? "bg-pink-500/20" : "bg-pink-500/10"}`}>
                <Mail className={`h-4 w-4 ${unreadCount > 0 ? "text-pink-600" : "text-pink-500/50"}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {unreadCount > 0 ? "Requires your attention" : "All caught up"}
                </p>
                {unreadCount > 0 && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Categories */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Categories
              </CardTitle>
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Layers className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoriesCount}</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Layers className="h-3 w-3" />
                <span>Result time slots</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Section: Quick Actions & Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="col-span-full lg:col-span-3 flex flex-col gap-4"
          >
            <Card className="flex-1 shadow-sm border-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Shortcut to your most used tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Link
                  href="/admin/image-results"
                  className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-blue-500/5 hover:border-blue-500/30 transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Upload Result</h4>
                      <p className="text-[11px] text-muted-foreground">Publish a new image</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  href="/admin/digit-results"
                  className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-purple-500/5 hover:border-purple-500/30 transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Hash className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Update Digits</h4>
                      <p className="text-[11px] text-muted-foreground">Set lucky numbers</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  href="/admin/messages"
                  className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-pink-500/5 hover:border-pink-500/30 transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">
                        Check Inbox
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {unreadCount > 0 ? `${unreadCount} unread messages` : "View user queries"}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  href="/admin/categories"
                  className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-orange-500/5 hover:border-orange-500/30 transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Manage Categories</h4>
                      <p className="text-[11px] text-muted-foreground">Add or edit time slots</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Uploads */}
          <motion.div
            variants={itemVariants}
            className="col-span-full lg:col-span-4 flex flex-col"
          >
            <Card className="flex-1 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-lg">Recent Uploads</CardTitle>
                  <CardDescription>Latest published results</CardDescription>
                </div>
                <Link href="/admin/image-results">
                  <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUploads.length === 0 ? (
                    <div className="text-center py-10 flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-8 w-8 mb-3 opacity-20" />
                      <p className="text-sm font-medium">No results uploaded yet.</p>
                      <p className="text-xs">Your recent uploads will appear here.</p>
                    </div>
                  ) : (
                    recentUploads.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between group p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-11 w-11 rounded-lg border shadow-sm">
                            <AvatarFallback className="rounded-lg bg-muted text-[10px] font-medium">
                              IMG
                            </AvatarFallback>
                            <img
                              src={item.imageUrl}
                              alt="Result"
                              className="h-full w-full object-cover"
                            />
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors line-clamp-1">
                              {item.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge
                                variant="secondary"
                                className="text-[10px] h-4 px-1.5 font-normal bg-background border shadow-sm"
                              >
                                {item.categoryName || "General"}
                              </Badge>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(item.resultDate), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link href="/admin/image-results">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground hover:text-primary hover:bg-primary/10"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </Link>
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
