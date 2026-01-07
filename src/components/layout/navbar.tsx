"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShieldCheck, Menu, Trophy, Home, Info, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
  { label: "All Results", href: "/results", icon: Trophy },
  { label: "Lucky Digits", href: "/digits", icon: Home },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center w-full px-4 md:px-6 pt-4 sticky top-0 z-50">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "w-full max-w-[1600px] rounded-2xl border transition-all duration-200 flex h-16 items-center justify-between px-4 md:px-6",
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-md border-border/50"
            : "bg-background/60 backdrop-blur-sm border-transparent shadow-sm"
        )}
      >
        {/* 1. LEFT: LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Nepal Lottery
          </span>
        </Link>

        {/* 2. MIDDLE: DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 3. RIGHT: THEME & MOBILE */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            {/* UPDATED: side="bottom" and floating styles */}
            <SheetContent
              side="bottom"
              className="m-4 rounded-3xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden outline-none"
            >
              <SheetHeader className="text-left mb-6 border-b pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <SheetTitle className="font-bold text-lg">Menu</SheetTitle>
                </div>
              </SheetHeader>
              <div className="flex flex-col gap-1 pb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
    </div>
  );
}
