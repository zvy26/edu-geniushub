"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Cookies from "js-cookie"
import { Mail, Phone, Lock, Eye, EyeOff, BookOpen, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axiosInstance from "@/lib/client"
import { AxiosError } from "axios"

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axiosInstance.post("/auth/login", {
        identifier,
        password,
      })

      const { access_token, user } = response.data

      Cookies.set("token", access_token, { expires: 7 })
      localStorage.setItem("user", JSON.stringify(user))

      router.push("/")
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>
      setError(error.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }
  const isEmail = identifier.includes("@")

  return (
    <div className="min-h-full bg-gradient-to-br from-background via-muted/30 to-background flex">
      {/* Left side - Branding and features */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 flex-col justify-center px-12 relative overflow-hidden animate-in slide-in-from-left-5 duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Master IELTS with Confidence</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join thousands of students who have achieved their target scores with our comprehensive preparation
              platform.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Comprehensive Courses</h3>
                <p className="text-muted-foreground">All four skills covered with expert guidance</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Expert Instructors</h3>
                <p className="text-muted-foreground">Learn from certified IELTS professionals</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Proven Results</h3>
                <p className="text-muted-foreground">95% of students achieve their target band</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 animate-in slide-in-from-right-5 duration-700">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to continue your IELTS preparation journey</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <Lock className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-sm font-medium">
                Email or Phone Number
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isEmail ? (
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="email@example.com or +1234567890"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="pl-10 h-12 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 text-base"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Do not have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Create account
              </Link>
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">IELTS Preparation Platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
