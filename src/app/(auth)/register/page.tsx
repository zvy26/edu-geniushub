"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Mail, Phone, Lock, Eye, EyeOff, GraduationCap, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axiosInstance from "@/lib/client"
import { TermsModal } from "@/components/auth/TermsModal"
import { AxiosError } from "axios"

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await axiosInstance.post("/auth/register", form)

      if (res.status === 201) {
        setSuccess("Registration successful! Redirecting to login...")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>
      setError(error.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptTerms = () => {
    setAcceptedTerms(true)
    setShowTermsModal(false)
  }

  return (
    <>
      <div className="min-h-full bg-gradient-to-br from-background via-muted/30 to-background flex">
        <div className="flex-1 flex items-center justify-center px-6 py-12 animate-in slide-in-from-left-5 duration-700">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
              <p className="mt-2 text-muted-foreground">Join our IELTS preparation community today</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <Lock className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/20 dark:text-green-400">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={form.phone}
                    onChange={handleChange}
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
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

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(value) => setAcceptedTerms(value === true)}
                />

                <label htmlFor="terms" className="text-sm text-muted-foreground leading-5">
                  I agree to the{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    onClick={() => setShowTermsModal(true)}
                  >
                    Terms of Service and Privacy Policy
                  </Button>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading || !acceptedTerms}
                className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                  Sign in
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

        <div className="hidden lg:flex lg:w-1/2 bg-accent/5 flex-col justify-center px-12 relative overflow-hidden animate-in slide-in-from-right-5 duration-700">
          <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-primary/10" />
          <div className="relative z-10">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Begin Your Success Story</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform your English skills and unlock global opportunities with our proven IELTS preparation
                methodology.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Structured Learning Path</h3>
                  <p className="text-muted-foreground">Step-by-step curriculum from basics to advanced</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Goal-Oriented Training</h3>
                  <p className="text-muted-foreground">Focused preparation for your target band score</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Rapid Improvement</h3>
                  <p className="text-muted-foreground">See measurable progress in just 4 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TermsModal open={showTermsModal} onOpenChange={setShowTermsModal} onAccept={handleAcceptTerms} />
    </>
  )
}
