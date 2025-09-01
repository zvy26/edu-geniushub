// app/layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import QueryProvider from "@/providers/QueryProvider"
import { AppSidebar } from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "IELTS Prep",
  description: "IELTS Preparation Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 w-full">
                  {children}
                </main>
              </div>
            </div>
            <Toaster position="top-center" /> 
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  )
}