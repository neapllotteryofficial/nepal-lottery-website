import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans antialiased">
      {/* Navbar ko ab hum page ke andar manage karenge taaki wo sahi width le */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </div>
  );
}
