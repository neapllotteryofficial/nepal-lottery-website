import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader"; // ✅ Import Loader

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nepal Lottery",
  description: "Check lottery results daily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* ✅ Global Loader Added */}
          <NextTopLoader
            color="hsl(var(--primary))" // Theme primary color use karega
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false} // Clean look ke liye spinner hata diya
            easing="ease"
            speed={200}
            shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))"
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
