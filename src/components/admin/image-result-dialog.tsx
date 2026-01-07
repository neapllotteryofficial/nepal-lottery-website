"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { Loader2, UploadCloud, CalendarIcon, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

import { createImageResult, updateImageResult } from "@/app/admin/actions";

// Types
interface Category {
  id: string;
  name: string;
}

interface ImageResultData {
  id: string;
  title: string;
  description: string | null;
  categoryId: string;
  date: Date;
  imageUrl: string;
}

interface ImageResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  initialData?: ImageResultData | null; // Agar ye hai, to Edit mode
}

export function ImageResultDialog({
  open,
  onOpenChange,
  categories,
  initialData,
}: ImageResultDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form when opening for Edit
  useEffect(() => {
    if (open) {
      if (initialData) {
        setDate(new Date(initialData.date));
        setPreviewUrl(initialData.imageUrl);
      } else {
        // Reset for Create mode
        setDate(new Date());
        setPreviewUrl(null);
      }
    }
  }, [open, initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date) {
      toast.error("Date is required");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    let res;
    if (initialData) {
      // Edit Mode
      formData.append("id", initialData.id);
      res = await updateImageResult(formData);
    } else {
      // Create Mode
      res = await createImageResult(formData);
    }

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
      <DialogContent className="sm:max-w-[550px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Result" : "Add New Result"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Modify the existing lottery result."
              : "Upload a new result image for the lottery."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Result Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Morning Shift Winner"
              defaultValue={initialData?.title}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2 flex flex-col">
              <Label>Result Date</Label>
              <Popover>
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
                    onSelect={setDate}
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

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                name="categoryId"
                defaultValue={initialData?.categoryId}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Result Image</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-muted-foreground/25 rounded-xl h-48 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/30 cursor-pointer overflow-hidden transition-all group"
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium flex items-center gap-2">
                      <UploadCloud className="w-4 h-4" /> Change Image
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-primary/10 rounded-full mb-2">
                    <ImageIcon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm">Click to upload</p>
                </>
              )}
              <Input
                ref={fileInputRef}
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                required={!initialData} // Create mode mein required, Edit mein optional
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Details..."
              defaultValue={initialData?.description || ""}
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Update Result" : "Upload Result"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
