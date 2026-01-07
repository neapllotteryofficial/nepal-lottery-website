import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Mock data images ke liye
      },
      {
        protocol: "https",
        hostname: "kqwxkqrhqwixfvmnsqbj.supabase.co", // Aapke Supabase Storage ke liye
      },
    ],
  },
};

export default nextConfig;
