"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { motion } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Logic: Agar user Login page par hai, to true return karega
  const isLoginPage = pathname === "/admin/login";

  // CASE 1: Login Page (Full Screen, No Sidebar/Navbar)
  if (isLoginPage) {
    return (
      <main className="min-h-screen w-full bg-background block">
        {children}
      </main>
    );
  }

  // CASE 2: Admin Dashboard (With Sidebar & Navbar)
  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden md:p-3 md:gap-3">
      {/* Sidebar (Desktop) */}
      <AdminSidebar />

      {/* Content Area Wrapper */}
      <div className="flex-1 flex flex-col h-full min-w-0 md:gap-3">
        {/* Navbar (Includes Mobile Sidebar Trigger) */}
        <AdminNavbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto rounded-2xl bg-muted/10 border border-border/50 relative overflow-hidden">
          {/* Global Animated Background Blobs for Dashboard */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="w-full max-w-[1600px] mx-auto h-full relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
