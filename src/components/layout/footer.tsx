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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1600px] px-4 md:px-6 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. Brand Section */}
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-lg tracking-tight">
                  Nepal Lottery
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Your official source for daily lottery results. Accurate,
                timely, and trusted by thousands.
              </p>
              <div className="flex gap-3 pt-2">
                <Link
                  href="#"
                  className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">
                Quick Navigation
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors"
                  >
                    Home Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="/results"
                    className="hover:text-primary transition-colors"
                  >
                    Browse All Results
                  </Link>
                </li>
                <li>
                  <Link
                    href="/digits"
                    className="hover:text-primary transition-colors"
                  >
                    Lucky Digit Charts
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
              </ul>
            </div>

            {/* 3. Legal */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">
                Legal & Policy
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* 4. Contact */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">
                Contact Us
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>
                    Kathmandu, Nepal
                    <br />
                    Ward No. 4
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>+977 9800000000</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>support@nepallottery.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {currentYear} Nepal Lottery. All rights reserved.</p>

            <div className="flex items-center gap-6">
              {/* Subtle Admin Link */}
              <Link
                href="/admin/dashboard"
                className="hover:text-foreground transition-colors opacity-50 hover:opacity-100 flex items-center gap-1"
              >
                <ShieldCheck className="h-3 w-3" /> Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
