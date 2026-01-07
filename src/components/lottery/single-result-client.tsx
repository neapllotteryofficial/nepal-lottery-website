"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Download,
  Share2,
  Maximize2,
  Check,
  ArrowLeft,
  ShieldCheck,
  ImageIcon,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface SingleResultClientProps {
  data: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
    resultDate: Date;
    categoryName: string | null;
  };
}

export function SingleResultClient({ data }: SingleResultClientProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(data.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${format(
        new Date(data.resultDate),
        "yyyy-MM-dd"
      )}-${data.title.replace(/\s+/g, "-")}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started");
    } catch {
      toast.error("Failed to download image");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    toast.success("Link copied");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden flex flex-col items-center">
      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-purple-500/10 rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="relative z-10 w-full max-w-[1400px] px-4 py-6 md:px-6 md:py-8 space-y-6">
        {/* Back Button */}
        <Link href="/results" className="inline-block">
          <Button
            variant="ghost"
            className="pl-0 text-muted-foreground hover:text-foreground group hover:bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Archive
          </Button>
        </Link>

        {/* --- LAYOUT GRID --- */}
        {/* items-start is important for sticky to work */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN: IMAGE & ACTIONS (STICKY) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            // Sticky Logic: lg:sticky lg:top-24 creates the sticking effect on desktop
            className="w-full lg:col-span-5 lg:sticky lg:top-24 space-y-4"
          >
            {/* 1. IMAGE CONTAINER */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative w-full bg-card/50 backdrop-blur-sm border rounded-2xl shadow-sm overflow-hidden cursor-zoom-in group">
                  {/* Aspect Ratio Logic */}
                  <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] bg-muted/20">
                    <Image
                      src={data.imageUrl}
                      alt={data.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Zoom Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <Maximize2 className="h-4 w-4" />
                      Zoom Image
                    </span>
                  </div>
                </div>
              </DialogTrigger>

              {/* Zoom Modal */}
              <DialogContent className="max-w-[95vw] h-[90vh] bg-transparent border-none p-0 shadow-none outline-none">
                <DialogTitle className="sr-only">{data.title}</DialogTitle>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={data.imageUrl}
                      alt={data.title}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* 2. ACTIONS (Floating on Mobile, Normal on Desktop) */}
            <div className="p-2 rounded-xl border bg-background/80 backdrop-blur-md shadow-lg flex items-center gap-2 sticky bottom-4 z-20 lg:relative lg:bottom-auto lg:z-auto lg:border-none lg:shadow-none lg:bg-transparent lg:p-0">
              <Button
                onClick={handleDownload}
                className="flex-1 shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground font-semibold lg:h-11"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent border-input hover:bg-muted lg:h-11 lg:bg-background"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={handleCopyLink}
                    className="cursor-pointer"
                  >
                    {isCopied ? (
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                    ) : (
                      <Share2 className="mr-2 h-4 w-4" />
                    )}
                    {isCopied ? "Copied to Clipboard" : "Copy Link"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleNativeShare}
                    className="lg:hidden cursor-pointer"
                  >
                    Share via App
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: PLAIN CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full lg:col-span-7 space-y-8"
          >
            {/* Header Info */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-primary/10 text-primary border-primary/20 text-xs md:text-sm font-medium rounded-full"
                >
                  <ImageIcon className="mr-1.5 h-3.5 w-3.5" />
                  {data.categoryName || "Official Result"}
                </Badge>
                <span className="flex items-center text-xs md:text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border">
                  <Calendar className="mr-1.5 h-3.5 w-3.5" />
                  {format(new Date(data.resultDate), "MMM dd, yyyy")}
                </span>
                <span className="flex items-center text-xs md:text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border">
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                  {format(new Date(data.resultDate), "h:mm a")}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight break-words">
                {data.title}
              </h1>
            </div>

            <Separator className="bg-border/60" />

            {/* 3. MARKDOWN CONTENT (Removed Card Styles) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground/80">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Result Details
                </span>
              </div>

              <div className="markdown-content w-full max-w-full overflow-hidden text-foreground/90">
                {data.description ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Table Wrapper for responsiveness
                      table: ({ ...props }) => (
                        <div className="w-full overflow-x-auto my-6 rounded-lg border bg-background shadow-sm scrollbar-thin scrollbar-thumb-muted-foreground/20">
                          <table
                            className="w-full min-w-full text-sm border-collapse"
                            {...props}
                          />
                        </div>
                      ),
                      // Clean Typography
                      h1: ({ ...props }) => (
                        <h1
                          className="text-xl md:text-2xl font-bold mt-8 mb-4 text-foreground border-b pb-2"
                          {...props}
                        />
                      ),
                      h2: ({ ...props }) => (
                        <h2
                          className="text-lg md:text-xl font-bold mt-6 mb-3 text-foreground"
                          {...props}
                        />
                      ),
                      p: ({ ...props }) => (
                        <p
                          className="leading-7 text-muted-foreground mb-4 break-words text-base"
                          {...props}
                        />
                      ),
                      ul: ({ ...props }) => (
                        <ul
                          className="list-disc pl-5 mb-4 space-y-2 text-muted-foreground"
                          {...props}
                        />
                      ),
                      li: ({ ...props }) => <li className="pl-1" {...props} />,
                      strong: ({ ...props }) => (
                        <strong
                          className="font-semibold text-foreground"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {data.description}
                  </ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground italic">
                    No additional description provided.
                  </p>
                )}
              </div>
            </div>

            <Separator className="bg-border/60" />

            {/* 4. PLAIN DISCLAIMER (Removed Box) */}
            <div className="flex gap-4 items-start text-sm text-muted-foreground opacity-80">
              <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-500" />
              <div className="space-y-1">
                <p className="font-semibold text-foreground">
                  Verification Advisory
                </p>
                <p className="leading-relaxed">
                  This digital copy is for informational purposes only. Please
                  verify winning numbers with your official physical ticket at
                  an authorized retailer before claiming any prizes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
