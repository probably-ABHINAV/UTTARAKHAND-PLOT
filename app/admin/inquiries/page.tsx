"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquare, Eye, Search, ArrowLeft, Clock, CheckCircle, AlertCircle, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { LogoutButton } from "@/components/logout-button"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"

const inquiryStatuses = ["new", "in progress", "closed"]

function InquiryManagementContent() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInquiries()
  }, [])

  const loadInquiries = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getInquiries()
      setInquiries(response.inquiries || [])
    } catch (error) {
      toast.error("Failed to load inquiries")
      console.error("Error loading inquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inquiry.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (inquiryId: number, newStatus: string) => {
    try {
      await apiClient.updateInquiry(inquiryId.toString(), { status: newStatus })
      setInquiries(inquiries.map((inquiry) => (inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry)))
      toast.success("Inquiry status updated")
    } catch (error) {
      toast.error("Failed to update inquiry")
      console.error("Error updating inquiry:", error)
    }
  }

  const handleDeleteInquiry = async (inquiryId: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return
    try {
      await apiClient.deleteInquiry(inquiryId.toString())
      setInquiries(inquiries.filter((inquiry) => inquiry.id !== inquiryId))
      toast.success("Inquiry deleted successfully")
    } catch (error) {
      toast.error("Failed to delete inquiry")
      console.error("Error deleting inquiry:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "destructive"
      case "in progress":
        return "default"
      case "closed":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Image
              src="/images/mascot.png"
              alt="Property in Uttrakhand"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <h1 className="font-serif font-black text-lg text-primary">Inquiry Management</h1>
              <p className="text-sm text-muted-foreground">Track and manage customer inquiries</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              View Website
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inquiries by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {inquiryStatuses.map((status) => (
                  <SelectItem key={status} value={status.toLowerCase()}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Inquiries</p>
                  <p className="text-2xl font-bold">{inquiries.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New</p>
                  <p className="text-2xl font-bold text-red-600">
                    {inquiries.filter((i) => i.status === "new").length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {inquiries.filter((i) => i.status === "in progress").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Closed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {inquiries.filter((i) => i.status === "closed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Inquiries ({filteredInquiries.length})</CardTitle>
            <CardDescription>Manage and respond to customer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading inquiries...</div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No inquiries found</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{inquiry.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{inquiry.email}</TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{inquiry.subject}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{inquiry.message}</p>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={inquiry.status}
                          onValueChange={(value) => handleStatusChange(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedInquiry(inquiry)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Inquiry Details - {selectedInquiry?.name}</DialogTitle>
                                <DialogDescription>{selectedInquiry?.subject}</DialogDescription>
                              </DialogHeader>
                              {selectedInquiry && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Name</Label>
                                      <p className="text-sm mt-1">{selectedInquiry.name}</p>
                                    </div>
                                    <div>
                                      <Label>Email</Label>
                                      <p className="text-sm mt-1">{selectedInquiry.email}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Message</Label>
                                    <div className="text-sm border rounded p-3 bg-muted/50 mt-1 max-h-48 overflow-y-auto">
                                      {selectedInquiry.message}
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Received</Label>
                                    <p className="text-sm mt-1">
                                      {new Date(selectedInquiry.created_at).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteInquiry(inquiry.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function InquiryManagementPage() {
  return (
    <AuthGuard requireAuth={true}>
      <InquiryManagementContent />
    </AuthGuard>
  )
}
