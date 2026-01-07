"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Zap,
  Trophy,
  Target,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* --- BACKGROUND BLOBS (Modern Gradient Effect) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container max-w-6xl mx-auto py-16 px-4 md:px-6 space-y-20">
        {/* --- 1. HERO SECTION --- */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-4"
          >
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary rounded-full"
            >
              Establishing Trust Since 2024
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              We Are Nepal Lottery
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Redefining the lottery experience with transparency, speed, and
              reliability. We bridge the gap between official results and
              players through cutting-edge technology.
            </p>
          </motion.div>
        </section>

        {/* --- 2. STATS GRID --- */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Daily Users", value: "10K+" },
            { label: "Results Published", value: "500+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Support", value: "24/7" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-card/50 border backdrop-blur-sm text-center space-y-2 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* --- 3. MISSION & VISION --- */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square md:aspect-auto md:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border shadow-2xl"
          >
            {/* Abstract visual representation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Target className="w-48 h-48 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-medium italic">
                "Our goal is to make lottery results accessible to everyone,
                instantly."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              At Nepal Lottery, we understand the excitement and anticipation
              that comes with every draw. Our mission is to provide a platform
              that is not only fast but also strictly accurate.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We eliminate the confusion of unofficial sources by directly
              digitizing official result sheets and digit charts. Whether you
              are checking for the Morning, Day, or Evening shift, we ensure you
              get the right information at the right time.
            </p>

            <Link href="/contact" className="inline-block">
              <Button variant="outline" className="group">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* --- 4. WHY CHOOSE US (Values) --- */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose Us</h2>
            <p className="text-muted-foreground">
              Built on the pillars of integrity and technology.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Results are updated within minutes of the official draw announcements.",
              },
              {
                icon: ShieldCheck,
                title: "100% Verified",
                desc: "We double-check every digit and image against official sources before publishing.",
              },
              {
                icon: Users,
                title: "Community First",
                desc: "Dedicated support team and a user-friendly interface designed for you.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-muted/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- 5. CTA --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-background border p-8 md:p-12 text-center space-y-6 relative overflow-hidden"
        >
          {/* Decorative shine */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 blur-3xl rounded-full pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to check your luck?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            View the latest results now. Good luck!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/results">
              <Button size="lg" className="shadow-xl shadow-primary/20">
                <Trophy className="mr-2 h-4 w-4" />
                View Results
              </Button>
            </Link>
            <Link href="/digits">
              <Button size="lg" variant="secondary">
                Check Lucky Digits
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
