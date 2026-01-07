"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Search,
  Image as ImageIcon,
  Table as TableIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DigitTable, DigitResult } from "@/components/lottery/digit-table";
import { LotteryCard } from "@/components/lottery/lottery-card";
import { Badge } from "@/components/ui/badge";

// Types Define
type ImageResultType = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  date: Date;
  category: string | null;
};

interface ResultsClientProps {
  digitData: DigitResult[];
  imageData: ImageResultType[];
  selectedDate: Date | undefined;
}

export function ResultsClient({
  digitData,
  imageData,
  selectedDate,
}: ResultsClientProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [searchDigit, setSearchDigit] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Handle Date Change -> Update URL
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setIsCalendarOpen(false);
    if (newDate) {
      // Push date to URL query param
      const dateStr = format(newDate, "yyyy-MM-dd");
      router.push(`/results?date=${dateStr}`);
    } else {
      router.push("/results");
    }
  };

  // Handle Search Input (0-9 only)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d$/.test(val)) {
      setSearchDigit(val);
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg hidden md:block">Filters:</h2>
          {/* Date Picker */}
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Filter Images by Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Reset Filter */}
          {date && (
            <Button variant="ghost" onClick={() => handleDateSelect(undefined)}>
              Clear
            </Button>
          )}
        </div>

        {/* Digit Search */}
        <div className="relative w-full md:w-[250px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            placeholder="Highlight digit (0-9)..."
            className="pl-9"
            value={searchDigit}
            onChange={handleSearchChange}
            maxLength={1}
          />
        </div>
      </div>

      {/* 2. DIGIT TABLE SECTION */}
      <section className="space-y-4 animate-in slide-in-from-bottom-5 duration-500">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <TableIcon className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Lucky Digit Chart
          </h2>
        </div>
        <p className="text-muted-foreground">Showing recent digit history.</p>

        <DigitTable data={digitData} highlightDigit={searchDigit} />

        <div className="flex gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse inline-block"></span>
            <span>Highlights matching digits</span>
          </div>
        </div>
      </section>

      <div className="border-t border-dashed" />

      {/* 3. IMAGE RESULTS SECTION */}
      <section className="space-y-6 animate-in slide-in-from-bottom-5 duration-700 delay-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <ImageIcon className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Official Result Images
            </h2>
          </div>
          {date && (
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Showing: {format(date, "PPP")}
            </Badge>
          )}
        </div>

        {imageData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 border rounded-xl bg-muted/20 text-center">
            <ImageIcon className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-semibold">No images found</h3>
            <p className="text-muted-foreground">
              {date
                ? `No results uploaded for ${format(date, "PPP")}`
                : "No results available yet."}
            </p>
            {date && (
              <Button
                variant="link"
                onClick={() => handleDateSelect(undefined)}
                className="mt-2"
              >
                View All Recent
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {imageData.map((result) => (
              <LotteryCard
                key={result.id}
                title={result.title}
                date={result.date}
                category={result.category || "General"}
                imageUrl={result.imageUrl}
                description={result.description || undefined}
                className="hover:shadow-lg transition-all"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
