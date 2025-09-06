import type { NextConfig } from "next";

// Get API URL from env
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Default to dead.uz if not set or invalid
let hostname = "dead.uz";

if (apiUrl) {
  try {
    hostname = new URL(apiUrl).hostname;
  } catch (err) {
    console.warn("⚠️ Invalid NEXT_PUBLIC_API_URL:", apiUrl);
  }
}

const nextConfig: NextConfig = {
  images: {
    domains: [hostname],
  },
};

export default nextConfig;
