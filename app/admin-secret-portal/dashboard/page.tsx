"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { 
  Users, 
  Building, 
  MessageSquare, 
  Mail, 
  LogOut, 
  Shield,
  TrendingUp,
  CheckCircle,
  Clock
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [stats, setStats] = useState({ plots: 0, inquiries: 0, users: 0, messages: 0 })
  const [plots, setPlots] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const adminData = localStorage.getItem('admin')

    if (!token || !adminData) {
      router.push('/admin-secret-portal/signin')
      return
    }

    setAdmin(JSON.parse(adminData))
    fetchData(token)
  }, [])

  const fetchData = async (token: string) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }

      const [statsRes, plotsRes, inquiriesRes, usersRes, messagesRes] = await Promise.all([
        fetch(`/api/admin/stats`, { headers }),
        fetch(`/api/admin/plots`, { headers }),
        fetch(`/api/admin/inquiries`, { headers }),
        fetch(`/api/admin/users`, { headers }),
        fetch(`/api/admin/contact-messages`, { headers }),
      ])

      if (statsRes.ok) setStats(await statsRes.json())
      if (plotsRes.ok) setPlots(await plotsRes.json())
      if (inquiriesRes.ok) setInquiries(await inquiriesRes.json())
      if (usersRes.ok) setUsers(await usersRes.json())
      if (messagesRes.ok) setMessages(await messagesRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin-secret-portal/signin')
  }

  const updateInquiryStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('adminToken')
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Inquiry status updated" })
        fetchData(token!)
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update inquiry", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome, {admin?.name}</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building className="h-4 w-4" />
                Total Plots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.plots}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.inquiries}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.users}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.messages}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-blue-600">Inquiries</TabsTrigger>
            <TabsTrigger value="plots" className="data-[state=active]:bg-blue-600">Plots</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600">Users</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-blue-600">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Property Inquiries</CardTitle>
                <CardDescription className="text-gray-400">Manage customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.map((inquiry: any) => (
                    <Card key={inquiry.id} className="bg-gray-700/50 border-gray-600">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-white">{inquiry.name}</h3>
                            <p className="text-sm text-gray-400">{inquiry.email} • {inquiry.phone}</p>
                            <p className="text-sm text-gray-300">{inquiry.message}</p>
                            <p className="text-xs text-gray-500">Location: {inquiry.location}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={inquiry.status === 'contacted' ? 'default' : 'outline'}
                              onClick={() => updateInquiryStatus(inquiry.id, 'contacted')}
                              className="text-xs"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Contacted
                            </Button>
                            <Button
                              size="sm"
                              variant={inquiry.status === 'pending' ? 'default' : 'outline'}
                              onClick={() => updateInquiryStatus(inquiry.id, 'pending')}
                              className="text-xs"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plots">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Property Plots</CardTitle>
                <CardDescription className="text-gray-400">All listed properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plots.map((plot: any) => (
                    <Card key={plot.id} className="bg-gray-700/50 border-gray-600">
                      <CardContent className="pt-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-white">{plot.title}</h3>
                            <p className="text-sm text-gray-400">{plot.location}</p>
                            <p className="text-sm text-gray-300">Area: {plot.area} sq yd • ₹{plot.pricePerSqYd}/sq yd</p>
                            <p className="text-xs text-gray-500">Status: {plot.status}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Registered Users</CardTitle>
                <CardDescription className="text-gray-400">All platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user: any) => (
                    <Card key={user.id} className="bg-gray-700/50 border-gray-600">
                      <CardContent className="pt-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-white">{user.name}</h3>
                            <p className="text-sm text-gray-400">{user.email}</p>
                            <p className="text-xs text-gray-500">{user.phone}</p>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Contact Messages</CardTitle>
                <CardDescription className="text-gray-400">Messages from contact form</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message: any) => (
                    <Card key={message.id} className="bg-gray-700/50 border-gray-600">
                      <CardContent className="pt-6">
                        <div>
                          <h3 className="font-semibold text-white">{message.name}</h3>
                          <p className="text-sm text-gray-400">{message.email}</p>
                          <p className="text-sm text-gray-300 mt-2">{message.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
