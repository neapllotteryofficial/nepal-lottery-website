import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminNavbar } from "@/components/admin/admin-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background md:bg-muted/20 flex justify-center">
      {/* Main Constraint Container */}
      <div className="flex h-screen w-full max-w-[1600px] flex-col md:flex-row overflow-hidden md:p-3 md:gap-3">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Content Area */}
        <div className="flex-1 flex flex-col h-full min-w-0 md:gap-3">
          <AdminNavbar />

          {/* Main: Padding hata di taaki Blobs edge-to-edge dikhein */}
          <main className="flex-1 overflow-y-auto bg-background md:border md:rounded-2xl md:shadow-sm relative no-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
