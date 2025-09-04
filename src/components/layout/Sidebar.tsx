// components/layout/Sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, FileText, CheckCircle, HelpCircle, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Mock IELTS", url: "/mock-ielts", icon: FileText },
  { title: "Level Check", url: "/level-check", icon: CheckCircle },
  { title: "About", url: "/about", icon: HelpCircle },
  { title: "Profile", url: "/profile", icon: User },
]

export function AppSidebar() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <Sidebar
      className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 h-screen w-64 z-40"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => {
                const active = isActive(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-12 px-4 rounded-xl">
                      <Link
                        href={item.url}
                        className={`flex text-3xl items-center gap-3 transition-all duration-200 ${active
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        <div>
                          <item.icon className="w-[20px] h-[20px] shrink-0" />
                        </div>
                        <span className="text-md font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}