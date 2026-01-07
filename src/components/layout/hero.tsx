"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, Signal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

interface HeroProps {
  youtubeLink?: string;
}

export function Hero({ youtubeLink }: HeroProps) {
  // Agar link nahi hai to ye function chalega
  const handleMissingLink = () => {
    toast.info("Live draw link is currently unavailable.");
  };

  return (
    <div className="w-full flex justify-center px-4 md:px-6 pb-6 pt-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[1600px] h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-lg border border-border/50 group bg-black"
      >
        {/* 1. BACKGROUND VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          <div className="w-full h-full bg-slate-900" />
        </video>

        {/* 2. OVERLAY GRADIENTS */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

        {/* 3. CONTENT */}
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge
              variant="secondary"
              className="px-3 py-1 backdrop-blur-md bg-white/20 text-white border-white/20 gap-2 w-fit"
            >
              <Signal className="w-3 h-3 text-green-400 animate-pulse" />
              <span className="text-xs font-medium tracking-wide">
                LIVE DRAWS ACTIVE
              </span>
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Play Smart, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                Win Big Today.
              </span>
            </h1>
            <p className="text-sm md:text-base text-gray-200 max-w-lg leading-relaxed">
              Nepal's most trusted lottery platform. Get instant access to daily
              results, lucky digits, and archival records directly from the
              official source.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Logic: Agar link hai to <a> tag render karein, nahi to Button with Toast */}
            {youtubeLink ? (
              <a
                href={youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="h-11 px-6 rounded-lg text-sm font-semibold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                >
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  Watch Live Draw
                </Button>
              </a>
            ) : (
              <Button
                size="lg"
                onClick={handleMissingLink}
                className="h-11 px-6 rounded-lg text-sm font-semibold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                Watch Live Draw
              </Button>
            )}

            <Link href="/results">
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-6 rounded-lg text-sm bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
              >
                Check Results
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
