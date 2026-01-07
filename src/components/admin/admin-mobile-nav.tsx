"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Same items as sidebar
const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Image Results", href: "/admin/image-results" },
  { label: "Lucky Digits", href: "/admin/digit-results" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Messages", href: "/admin/messages" },
];

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      {/* Custom Sheet Styling for Floating Look */}
      <SheetContent
        side="bottom"
        className="m-4 rounded-2xl border bg-card shadow-2xl p-0 overflow-hidden max-h-[85vh]"
      >
        <SheetHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2 font-bold text-lg text-primary">
            <ShieldCheck className="h-5 w-5" />
            <span>Admin Menu</span>
          </div>
          {/* Close button automatically added by Sheet, but usually top right. */}
        </SheetHeader>

        <div className="p-2 grid gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-center p-4 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="my-2 border-t" />

          <button className="flex items-center justify-center gap-2 p-4 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
