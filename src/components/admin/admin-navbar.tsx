"use client";

import { AdminMobileNav } from "./admin-mobile-nav";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion"; // ✅ Import

export function AdminNavbar() {
  const pathname = usePathname();
  const pageName = pathname.split("/").pop()?.replace("-", " ") || "Dashboard";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-14 flex items-center justify-between px-4 md:px-6 bg-card border-b md:border md:rounded-2xl md:shadow-sm shrink-0"
    >
      {/* Left Side: Mobile Menu & Page Title */}
      <div className="flex items-center gap-3">
        <AdminMobileNav />
        <motion.h2
          key={pageName} // Page change hone par animate hoga
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="font-semibold text-sm md:text-base capitalize tracking-tight"
        >
          {pageName}
        </motion.h2>
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* System Status */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-medium text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full border">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          System Active
        </div>

        {/* Theme Switcher */}
        <ModeToggle />

        {/* Admin Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20 shadow-sm"
        >
          AD
        </motion.div>
      </div>
    </motion.header>
  );
}
