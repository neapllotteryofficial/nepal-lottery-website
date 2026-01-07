"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Users, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="w-full border-t bg-card/50">
      <div className="w-full flex justify-center px-4 md:px-6 py-16">
        <div className="w-full max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
              <HelpCircle className="mr-1 h-3 w-3" />
              Support Center
            </div>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Have questions regarding results?
            </h2>

            <p className="text-sm text-muted-foreground max-w-lg leading-relaxed mx-auto md:mx-0">
              Our support team is available to assist you with claims, result
              verification, and general inquiries. Connect with our community
              for instant updates.
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/contact" className="w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto h-11 px-8 text-sm font-medium shadow-md"
              >
                <Phone className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto h-11 px-8 text-sm font-medium bg-background hover:bg-muted/50"
            >
              <Users className="mr-2 h-4 w-4" />
              Join Community
              <ArrowRight className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
