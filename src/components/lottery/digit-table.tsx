"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export interface DigitResult {
  id: string;
  date: Date;
  morning: number | null;
  day: number | null;
  evening: number | null;
}

interface DigitTableProps {
  data: DigitResult[];
  highlightDigit?: string;
}

export function DigitTable({ data, highlightDigit }: DigitTableProps) {
  const isHighlighted = (digit: number | null) => {
    if (digit === null || !highlightDigit) return false;
    return digit.toString() === highlightDigit;
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40 h-9 border-b-primary/10">
            <TableHead className="w-[120px] pl-4 text-xs font-semibold uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-orange-600/80 dark:text-orange-400">
              Morning
            </TableHead>
            <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-blue-600/80 dark:text-blue-400">
              Day
            </TableHead>
            <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-purple-600/80 dark:text-purple-400">
              Evening
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              className={cn(
                "h-11 hover:bg-muted/30 transition-colors",
                // Fix: Remove bottom border for the last item to avoid double line with Card border
                index === data.length - 1 ? "border-b-0" : "border-b"
              )}
            >
              {/* Date Column */}
              <TableCell className="pl-4 py-1">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground">
                    {format(row.date, "MMM dd, yyyy")}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase">
                    {format(row.date, "EEE")}
                  </span>
                </div>
              </TableCell>

              {/* Helper for Circle */}
              {["morning", "day", "evening"].map((shift) => {
                const digit = row[shift as keyof DigitResult] as number | null;
                const highlight = isHighlighted(digit);

                return (
                  <TableCell key={shift} className="text-center py-1">
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold transition-all",
                        highlight
                          ? "bg-primary text-primary-foreground shadow-md scale-110"
                          : "bg-muted/40 text-muted-foreground border border-transparent"
                      )}
                    >
                      {digit ?? "-"}
                    </span>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
