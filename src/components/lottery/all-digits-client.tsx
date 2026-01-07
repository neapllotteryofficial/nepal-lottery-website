"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, AlertCircle, History, Hash } from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { DigitTable, DigitResult } from "@/components/lottery/digit-table";
import { Card, CardContent } from "@/components/ui/card";

interface AllDigitsClientProps {
  data: DigitResult[];
}

export function AllDigitsClient({ data }: AllDigitsClientProps) {
  const [searchDigit, setSearchDigit] = useState("");

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const isTodayUploaded = data.some(
    (item) => format(item.date, "yyyy-MM-dd") === todayStr
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || (/^\d$/.test(val) && val.length === 1)) {
      setSearchDigit(val);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
      {/* --- HEADER & SEARCH (Compact Design) --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <Hash className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight leading-none">
              Lucky Digits
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Search history by digit (0-9)
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Check a digit..."
            className="pl-8 h-9 w-full sm:w-[180px] text-sm font-medium"
            maxLength={1}
            value={searchDigit}
            onChange={handleSearchChange}
          />
          {searchDigit && (
            <span className="absolute -bottom-5 right-0 text-[10px] text-primary font-medium">
              Highlighting: {searchDigit}
            </span>
          )}
        </div>
      </div>

      {/* --- PENDING ALERT --- */}
      {!isTodayUploaded && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="text-xs font-medium">
            Today&apos;s result is pending upload.
          </p>
        </motion.div>
      )}

      {/* --- TABLE CARD --- */}
      <Card className="border shadow-sm overflow-hidden rounded-xl">
        <CardContent className="p-0">
          {data.length > 0 ? (
            <DigitTable data={data} highlightDigit={searchDigit} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-muted/5">
              <History className="h-8 w-8 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">No history found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legend - Smaller */}
      <div className="flex items-center justify-center sm:justify-start gap-4 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary/20 border border-primary"></span>
          <span>Match</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-muted border border-border"></span>
          <span>Result</span>
        </div>
      </div>
    </div>
  );
}
