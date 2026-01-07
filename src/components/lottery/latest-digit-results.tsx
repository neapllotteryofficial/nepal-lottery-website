"use client";

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, AlertCircle, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface DigitResultData {
  id: string;
  resultDate: string;
  morningDigit: number | null;
  dayDigit: number | null;
  eveningDigit: number | null;
}

export function LatestDigitResults({
  data,
  isToday,
}: {
  data: DigitResultData | undefined;
  isToday: boolean;
}) {
  return (
    <section className="w-full flex justify-center px-4 md:px-6 py-12">
      <div className="w-full max-w-[1600px] space-y-5">
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-medium text-sm tracking-wide uppercase">
              <Trophy className="w-4 h-4" />
              <span>Lucky Digits</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {isToday ? "Today's Winning Numbers" : "Latest Draw Results"}
            </h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <p>Live updates for Morning, Day, and Evening shifts.</p>
              {!isToday && (
                <Badge
                  variant="outline"
                  className="text-[10px] text-amber-600 border-amber-500/50 bg-amber-50 h-5 px-2"
                >
                  Results Pending
                </Badge>
              )}
            </div>
          </div>

          <Link href="/digits">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-4 text-xs font-medium group transition-colors hover:text-primary"
            >
              View Full History
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* 2. Pending Alert Bar */}
        {!isToday && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>
              Today's results are strictly pending. Displaying previous game
              data.
            </span>
          </motion.div>
        )}

        {/* 3. Modern Minimalist Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border shadow-sm bg-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[200px] pl-6 h-12">Date</TableHead>
                    <TableHead className="text-center h-12">Morning</TableHead>
                    <TableHead className="text-center h-12">Day</TableHead>
                    <TableHead className="text-center h-12">Evening</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data ? (
                    <TableRow className="hover:bg-transparent border-b-0">
                      {/* Date Column */}
                      <TableCell className="pl-6 font-medium py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-md text-foreground">
                            <CalendarDays className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-semibold text-foreground">
                              {format(
                                new Date(data.resultDate),
                                "MMM dd, yyyy"
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground uppercase">
                              {format(new Date(data.resultDate), "EEEE")}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Morning Digit */}
                      <TableCell className="text-center py-6">
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 flex items-center justify-center rounded-lg border bg-background text-2xl font-bold text-blue-600 dark:text-blue-400 shadow-sm">
                            {data.morningDigit ?? "-"}
                          </div>
                        </div>
                      </TableCell>

                      {/* Day Digit */}
                      <TableCell className="text-center py-6">
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 flex items-center justify-center rounded-lg border bg-background text-2xl font-bold text-orange-600 dark:text-orange-400 shadow-sm">
                            {data.dayDigit ?? "-"}
                          </div>
                        </div>
                      </TableCell>

                      {/* Evening Digit */}
                      <TableCell className="text-center py-6">
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 flex items-center justify-center rounded-lg border bg-background text-2xl font-bold text-purple-600 dark:text-purple-400 shadow-sm">
                            {data.eveningDigit ?? "-"}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
