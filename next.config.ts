import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
const hostname = new URL(apiUrl).hostname;

const nextConfig: NextConfig = {
  images: {
    domains: [hostname],
  },
};

export default nextConfig;
