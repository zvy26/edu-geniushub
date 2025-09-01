// components/layout/Header.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PanelLeft, PanelLeftClose } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import Cookies from "js-cookie"
import { useProfileQuery } from "@/api/queries/profile"

const Header = () => {
  const { toggleSidebar, open } = useSidebar()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data: profile } = useProfileQuery()

  useEffect(() => {
    // Tokenni tekshiramiz
    const token = Cookies.get("token")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border h-16 w-full">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Left side - Toggle and Logo */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="h-10 w-10"
          >
            {open ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
          </Button>
          
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl md:text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            IELTS PREP Course
          </Link>
        </div>

        {/* Right side - User info or Register button */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && profile ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {profile.name}
              </span>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/register">Register</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header