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

  // 4 corner radius container, margins on 4 sides (md:p-4)
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/20 p-2 md:p-4">
      {/* Global Container with rounded corners */}
      <div className="flex h-full w-full max-w-[1920px] bg-background border border-border/50 rounded-3xl shadow-xl overflow-hidden relative">
        
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

        {/* Sidebar (Floating inside) */}
        <div className="hidden md:block p-3 pr-0 h-full z-20">
          <AdminSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full min-w-0 z-10 relative">
          {/* Navbar */}
          <div className="w-full max-w-[1600px] mx-auto px-3 pt-3 md:px-6">
            <AdminNavbar />
          </div>

          {/* Dynamic Page Content */}
          <main className="flex-1 overflow-y-auto w-full relative">
            <div className="w-full max-w-[1600px] mx-auto h-full px-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
