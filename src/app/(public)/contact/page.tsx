"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  Clock,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const res = await submitContactForm(formData);

    setIsLoading(false);

    if (res.success) {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });
      (event.target as HTMLFormElement).reset();
    } else {
      toast.error("Something went wrong.", {
        description: res.message,
      });
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center">
      {/* --- BACKGROUND BLOBS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          {/* --- LEFT COLUMN: CONTACT INFO & BRANDING --- */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                <MessageSquare className="mr-1 h-3 w-3" />
                Support Center
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Get in touch
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions about the latest results or need help claiming a
                prize? Our team is here to assist you.
              </p>
            </div>

            {/* Info Card */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative group">
              {/* Decorative Circle inside card */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />

              <CardContent className="p-8 space-y-8 relative z-10">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg backdrop-blur-md">
                      <Mail className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base">Email Us</h3>
                      <p className="text-sm text-gray-300">
                        support@nepallottery.com
                      </p>
                      <p className="text-xs text-gray-400">
                        Response within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg backdrop-blur-md">
                      <Phone className="h-5 w-5 text-green-300" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base">Call Us</h3>
                      <p className="text-sm text-gray-300">+977 9800000000</p>
                      <p className="text-xs text-gray-400">
                        Mon-Fri from 8am to 5pm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg backdrop-blur-md">
                      <MapPin className="h-5 w-5 text-red-300" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base">Visit Us</h3>
                      <p className="text-sm text-gray-300">
                        Kathmandu, Nepal <br /> Ward No. 4
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Support Hours: 9:00 AM - 6:00 PM (NST)</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground p-4 bg-muted/30 rounded-xl border border-border/50">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p>Your information is 100% secure and will not be shared.</p>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <motion.div variants={fadeInUp} className="lg:mt-8">
            <Card className="border-muted/60 shadow-lg bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="h-11 bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-11 bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us how we can help..."
                        className="min-h-[150px] resize-none bg-background/50 focus:bg-background transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
