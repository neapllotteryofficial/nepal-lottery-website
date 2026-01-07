"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { format, isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  History,
  AlertCircle,
  X,
  Clock,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

// Types
interface ImageResultData {
  id: string;
  title: string;
  imageUrl: string;
  resultDate: Date;
  categoryName: string | null;
  description: string | null;
}

export function AllResultsClient({ data }: { data: ImageResultData[] }) {
  // Default: Show All History (undefined)
  const [date, setDate] = useState<Date | undefined>(undefined);

  // 1. Group Data by Date
  const groupedData = useMemo(() => {
    const groups: Record<string, ImageResultData[]> = {};

    data.forEach((item) => {
      const itemDate = new Date(item.resultDate);
      const dateKey = format(itemDate, "yyyy-MM-dd");

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });

    // Sort Groups by Date (Descending)
    return Object.entries(groups).sort(
      ([dateA], [dateB]) =>
        new Date(dateB).getTime() - new Date(dateA).getTime()
    );
  }, [data]);

  // 2. Check if Today's Result Exists
  const isTodayUploaded = useMemo(() => {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    // Check agar groupedData mein aaj ki key exist karti hai
    return groupedData.some(([key]) => key === todayStr);
  }, [groupedData]);

  // 3. Filter Logic
  const filteredGroups = useMemo(() => {
    if (!date) return groupedData;
    return groupedData.filter(([dateKey]) =>
      isSameDay(parseISO(dateKey), date)
    );
  }, [date, groupedData]);

  // Alert Show Condition:
  // Show if: (Today is NOT uploaded) AND (User is viewing 'All' OR 'Today')
  const showPendingAlert =
    !isTodayUploaded && (!date || isSameDay(date, new Date()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- HEADER & FILTERS --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-card p-5 rounded-2xl border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">All Results</h1>
          <p className="text-sm text-muted-foreground">
            Browse official lottery result charts archive.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full md:w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) =>
                  date > new Date() || date < new Date("2020-01-01")
                }
              />
            </PopoverContent>
          </Popover>

          {/* Clear Filter */}
          {date && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDate(undefined)}
              title="Clear Filter"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* --- PENDING ALERT --- */}
      {showPendingAlert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm">Results Pending</p>
            <p className="text-xs opacity-90">
              Today&apos;s charts haven&apos;t been uploaded yet. Showing
              previous results.
            </p>
          </div>
        </motion.div>
      )}

      {/* --- NO RESULTS STATE (For other dates) --- */}
      {date && filteredGroups.length === 0 && !showPendingAlert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-dashed text-muted-foreground justify-center"
        >
          <History className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">No results found for this date.</p>
          <Button
            variant="link"
            size="sm"
            onClick={() => setDate(undefined)}
            className="text-primary"
          >
            View All History
          </Button>
        </motion.div>
      )}

      {/* --- RESULTS TIMELINE --- */}
      <div className="space-y-10">
        {filteredGroups.map(([dateKey, items], groupIndex) => (
          <motion.section
            key={dateKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            {/* Date Header */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/5 rounded-lg text-primary">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-foreground leading-none">
                  {format(parseISO(dateKey), "MMMM d, yyyy")}
                </h2>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                  {format(parseISO(dateKey), "EEEE")}
                </span>
              </div>
              <div className="h-[1px] flex-1 bg-border/50 ml-2" />
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <Link
                  href={`/results/${item.id}`}
                  key={item.id}
                  className="group relative overflow-hidden bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-[65%] -left-2 w-4 h-4 bg-muted/20 rounded-full z-10 border-r border-border" />
                  <div className="absolute top-[65%] -right-2 w-4 h-4 bg-muted/20 rounded-full z-10 border-l border-border" />
                  <div className="absolute top-[65%] left-4 right-4 border-t-2 border-dashed border-muted z-0" />

                  {/* Image Section */}
                  <div className="p-3 pb-6 relative z-10 bg-card">
                    <div className="overflow-hidden rounded-xl border bg-muted relative">
                      <AspectRatio ratio={3 / 2}>
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 pt-2 bg-card relative z-10 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-semibold bg-primary/5 text-primary border-primary/20 px-2 py-0.5 h-auto"
                      >
                        {item.categoryName || "General"}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground flex items-center bg-muted/50 px-1.5 py-0.5 rounded border border-transparent group-hover:border-border transition-colors">
                        <Clock className="w-3 h-3 mr-1" />
                        {format(new Date(item.resultDate), "h:mm a")}
                      </span>
                    </div>

                    <h3 className="font-semibold text-sm md:text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <CalendarIcon className="w-3 h-3" />
                      {format(new Date(item.resultDate), "MMM dd, yyyy")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
