"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Shield } from "lucide-react"

export default function AdminSignInPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin-auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      localStorage.setItem("adminToken", data.token)

      toast({
        title: "Login Successful",
        description: "Welcome to Admin Panel",
      })

      router.push("/admin-secret-portal/dashboard")
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message || "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Card className="w-full max-w-md bg-gray-800/60 backdrop-blur border-gray-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
            <Shield className="text-white w-8 h-8" />
          </div>
          <CardTitle className="text-white text-2xl">
            Admin Login
          </CardTitle>
          <CardDescription className="text-gray-400">
            Secure admin access
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-300">Email</Label>
              <Input
                type="email"
                required
                value={admin@propertinuk.com}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 text-white"
              />
            </div>

            <div>
              <Label className="text-gray-300">Password</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
