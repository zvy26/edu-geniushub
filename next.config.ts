import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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
