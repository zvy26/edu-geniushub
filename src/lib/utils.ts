// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * ✅ cn()
 * Merge class names conditionally with clsx + tailwind-merge
 * Used by shadcn/ui components like Button, Input, etc.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * ✅ safeArray()
 * Ensures that data is always returned as an array
 */
export function safeArray<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : []
}

/**
 * ✅ capitalize()
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * ✅ formatDate()
 * Format a Date or ISO string into a readable format
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
