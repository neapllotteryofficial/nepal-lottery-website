"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Hash,
  Layers,
  MessageSquare,
  LogOut,
  ShieldCheck,
  Settings,
  Gamepad2, // ✅ Added Gamepad Icon
} from "lucide-react";
import { motion } from "framer-motion";

// Import Alert Dialog Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Image Results", href: "/admin/image-results", icon: ImageIcon },
  { label: "Lucky Digits", href: "/admin/digit-results", icon: Hash },
  { label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/");
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="hidden md:flex w-64 flex-col h-full bg-card border rounded-2xl shadow-sm overflow-hidden shrink-0"
    >
      {/* Header - Compact */}
      <div className="h-14 flex items-center px-5 border-b bg-muted/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-bold text-lg text-primary"
        >
          <ShieldCheck className="h-5 w-5" />
          <span>Admin Panel</span>
        </motion.div>
      </div>

      {/* Nav Links - Scrollable Area */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <motion.div key={item.href} variants={itemVariants}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ✅ START GAME BUTTON (Pinned above Footer) */}
      <motion.div variants={itemVariants} className="px-3 pb-2">
        <a
          href="https://nepallottery-game.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:shadow-sm transition-all text-[13px] font-semibold"
        >
          <Gamepad2 className="h-4 w-4" />
          Start Game
        </a>
      </motion.div>

      {/* Footer with Sign Out Popup */}
      <motion.div variants={itemVariants} className="p-3 border-t bg-muted/10">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to leave?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will sign you out of the admin panel. You will need to log
                in again to access the dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSignOut}
                className="bg-destructive hover:bg-destructive/90"
              >
                Confirm Sign Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </motion.aside>
  );
}
