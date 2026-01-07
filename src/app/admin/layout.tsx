"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminNavbar } from "@/components/admin/admin-navbar";

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
    <div className="flex h-screen w-full max-w-[1600px] mx-auto flex-col md:flex-row overflow-hidden md:p-3 md:gap-3">
      {/* Sidebar (Desktop) */}
      <AdminSidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 md:gap-3">
        {/* Navbar (Includes Mobile Sidebar Trigger) */}
        <AdminNavbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto rounded-2xl bg-muted/10 border border-border/50 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
