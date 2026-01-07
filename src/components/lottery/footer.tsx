import Link from "next/link";
import {
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t mt-auto">
      {/* Main Footer Content */}
      <div className="container max-w-[1400px] px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* 1. Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Nepal Lottery
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your trusted source for daily lottery results. We provide accurate
              and timely updates for all major draws.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="#"
                className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  className="hover:text-primary transition-colors"
                >
                  All Results
                </Link>
              </li>
              <li>
                <Link
                  href="/digits"
                  className="hover:text-primary transition-colors"
                >
                  Lucky Digits
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Legal & Policy */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>
                  Kathmandu, Nepal
                  <br />
                  Ward No. 4
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+977 9800000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@nepallottery.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Bottom Bar */}
      <div className="container max-w-[1400px] px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {currentYear} Nepal Lottery. All rights reserved.</p>

        <div className="flex items-center gap-6">
          {/* Admin Link (Only for authorized personnel) */}
          <Link
            href="/admin/dashboard"
            className="hover:text-foreground transition-colors opacity-70 hover:opacity-100 flex items-center gap-1"
          >
            <ShieldCheck className="h-3 w-3" /> Admin Login
          </Link>
          <p>Designed with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
