"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ImageIcon,
  Clock,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageResultData {
  id: string;
  title: string;
  imageUrl: string;
  resultDate: Date;
  categoryName: string | null;
}

export function LatestImageResults({
  data,
  isToday,
}: {
  data: ImageResultData[];
  isToday: boolean;
}) {
  return (
    <section className="w-full flex justify-center px-4 md:px-6 py-10 bg-muted/20">
      <div className="w-full max-w-[1600px] space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <ImageIcon className="w-4 h-4" />
              <span>Daily Charts</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Official Result Sheets
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground max-w-xl">
                Scanned copies of the official results.
              </p>
              {!isToday && (
                <Badge
                  variant="outline"
                  className="text-amber-600 border-amber-600/30 bg-amber-500/10 text-[10px] px-2 py-0.5 h-auto"
                >
                  Today Pending
                </Badge>
              )}
            </div>
          </div>

          <Link href="/results">
            <Button variant="ghost" className="text-sm group">
              View All Results{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Pending Message Banner */}
        {!isToday && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>
              Today's image charts are pending. Showing latest available
              results.
            </span>
          </motion.div>
        )}

        {/* Results Grid - same as before */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* ... (Previous mapping code remains exactly same) ... */}
          {data.length === 0 ? (
            <div className="col-span-full py-16 text-center text-muted-foreground border-2 border-dashed rounded-xl bg-background/50">
              <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p>No image results uploaded recently.</p>
            </div>
          ) : (
            data.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                <Link href={`/results/${item.id}`} className="block h-full">
                  <div className="relative overflow-hidden bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                    <div className="absolute top-[65%] -left-2 w-4 h-4 bg-muted/20 rounded-full z-10 border-r border-border" />
                    <div className="absolute top-[65%] -right-2 w-4 h-4 bg-muted/20 rounded-full z-10 border-l border-border" />
                    <div className="absolute top-[65%] left-4 right-4 border-t-2 border-dashed border-muted z-0" />

                    <div className="p-3 pb-6 relative z-10 bg-card">
                      <div className="overflow-hidden rounded-xl border bg-muted relative">
                        <AspectRatio ratio={3 / 2}>
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </AspectRatio>
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      </div>
                    </div>

                    <div className="p-4 pt-2 bg-card relative z-10 flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <Badge
                          variant="outline"
                          className="text-xs font-semibold bg-primary/5 text-primary border-primary/20"
                        >
                          {item.categoryName || "General"}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground flex items-center bg-muted px-1.5 py-0.5 rounded">
                          <Clock className="w-3 h-3 mr-1" />
                          {format(new Date(item.resultDate), "h:mm a")}
                        </span>
                      </div>

                      <h3 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(item.resultDate), "MMM dd, yyyy")}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
