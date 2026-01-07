"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Loader2, CalendarIcon, Hash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { saveDigitResult } from "@/app/admin/actions";

interface DigitResultData {
  id: string;
  resultDate: string;
  morningDigit: number | null;
  dayDigit: number | null;
  eveningDigit: number | null;
}

interface DigitResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: DigitResultData | null;
}

export function DigitResultDialog({
  open,
  onOpenChange,
  initialData,
}: DigitResultDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // States
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<string>("morning");
  const [digitValue, setDigitValue] = useState<string>("");

  // Logic: Jab bhi Dialog open ho, ya Shift change ho, Data populate karein
  useEffect(() => {
    if (open) {
      if (initialData) {
        // 1. Set Date
        setDate(new Date(initialData.resultDate));

        // 2. Set Digit based on selected Shift
        let val: number | null = null;
        if (selectedShift === "morning") val = initialData.morningDigit;
        if (selectedShift === "day") val = initialData.dayDigit;
        if (selectedShift === "evening") val = initialData.eveningDigit;

        setDigitValue(val !== null ? val.toString() : "");
      } else {
        // Create Mode: Reset defaults
        setDate(new Date());
        setDigitValue("");
        // Shift reset is optional, keeping user selection or default 'morning'
      }
    }
  }, [open, initialData, selectedShift]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date) {
      toast.error("Date is required");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    // Explicitly append controlled values just to be safe
    // (Input name attributes usually handle this, but state sync ensures accuracy)

    const res = await saveDigitResult(formData);
    setIsLoading(false);

    if (res.success) {
      toast.success(res.message);
      onOpenChange(false);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Update Digit" : "Add Entry"}
          </DialogTitle>
          <DialogDescription>
            Select a date and shift to add or update a single digit.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6 mt-2">
          {/* 1. Date Picker */}
          <div className="space-y-2 flex flex-col">
            <Label>Date</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              name="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 2. Shift Selection (Controlled State) */}
            <div className="space-y-2">
              <Label>Shift</Label>
              <Select
                name="shift"
                value={selectedShift}
                onValueChange={setSelectedShift} // Update state on change
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 3. Digit Input (Controlled State) */}
            <div className="space-y-2">
              <Label>Digit (0-9)</Label>
              <div className="relative">
                <Hash className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  name="digit"
                  placeholder="-"
                  min={0}
                  max={9}
                  className="pl-9 font-mono text-lg"
                  required
                  value={digitValue}
                  onChange={(e) => setDigitValue(e.target.value)} // User edits logic
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
