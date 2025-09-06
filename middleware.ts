import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    try {
      new URL(apiUrl); // validate
    } catch (err) {
      console.error("❌ Invalid NEXT_PUBLIC_API_URL in middleware:", apiUrl);
    }
  }

  return NextResponse.next();
}
