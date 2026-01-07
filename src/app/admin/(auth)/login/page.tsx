"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

// Form Validation Schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form Setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error("Access Denied", {
          description: "Invalid credentials. Please try again.",
        });
        return;
      }

      toast.success("Welcome Back", {
        description: "Redirecting to secure dashboard...",
      });

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("Network Error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden px-4 w-full">
      {/* --- ANIMATED BACKGROUND BLOBS --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px]"
        />
      </div>

      {/* --- LOGIN CARD --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[400px] relative z-10"
      >
        <Card className="border-border/50 shadow-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
          <CardHeader className="space-y-2 text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="flex justify-center mb-2"
            >
              <div className="rounded-2xl bg-gradient-to-tr from-primary to-purple-600 p-4 shadow-lg shadow-primary/25">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to manage the platform
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <Input
                            placeholder="admin@nepallottery.com"
                            className="pl-10 h-10 bg-background/50 border-input/60 focus:bg-background transition-all"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-10 bg-background/50 border-input/60 focus:bg-background transition-all"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-10 mt-2 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          Protected by Nepal Lottery Security System. <br />
          Un-authorized access is prohibited.
        </p>
      </motion.div>
    </div>
  );
}
