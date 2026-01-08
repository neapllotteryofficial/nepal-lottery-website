"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Search,
  AlertCircle,
  History,
  Hash,
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { DigitTable, DigitResult } from "@/components/lottery/digit-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface AllDigitsClientProps {
  data: DigitResult[];
}

export function AllDigitsClient({ data }: AllDigitsClientProps) {
  const [searchDigit, setSearchDigit] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

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

  // Dialog open hone par URL set karein
  const handleShareClick = () => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSocialShare = (platform: "whatsapp" | "facebook" | "twitter") => {
    const url = window.location.href;
    const text = "Check out the latest Lucky Digits results!";
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          text + " " + url
        )}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`;
        break;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    // pb-24 added to prevent content from being hidden behind the floating button
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto pb-24">
      {/* --- HEADER & SEARCH --- */}
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

      {/* Legend */}
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

      {/* --- FLOATING SHARE BUTTON --- */}
      {/* Mobile: Bottom Center | Desktop: Bottom Right */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:bottom-8 md:right-8 md:left-auto md:translate-x-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={handleShareClick}
              className="rounded-full h-11 px-5 gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 border border-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-semibold">Share Page</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Lucky Digits</DialogTitle>
              <DialogDescription>
                Share the latest results with your friends and family.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 py-4">
              {/* Social Share Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="flex flex-col h-20 gap-2 hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-200 dark:hover:border-green-800 transition-colors"
                  onClick={() => handleSocialShare("whatsapp")}
                >
                  <MessageCircle className="w-6 h-6 text-green-500" />
                  <span className="text-xs">WhatsApp</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col h-20 gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                  onClick={() => handleSocialShare("facebook")}
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                  <span className="text-xs">Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col h-20 gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  onClick={() => handleSocialShare("twitter")}
                >
                  <Twitter className="w-6 h-6 text-sky-500" />
                  <span className="text-xs">Twitter</span>
                </Button>
              </div>

              {/* Copy Link Section */}
              <div className="space-y-2">
                <Label htmlFor="link" className="text-xs text-muted-foreground">
                  Page Link
                </Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="link"
                      value={currentUrl}
                      readOnly
                      className="pr-10 h-9 text-xs bg-muted/30"
                    />
                  </div>
                  <Button
                    size="sm"
                    className="h-9 shrink-0 gap-2"
                    onClick={handleCopyLink}
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {isCopied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
