"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Map,
  Users,
  TrendingUp,
  MessageSquare,
  FileText,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Ruler,
  MapPin,
  Calculator,
  LogOut,
  RefreshCcw,
  Landmark
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { useUser } from "@stackframe/stack"
import { usePlots, useInquiries, usePosts, useLocations, useUsers, useMutation } from "@/hooks/use-api"
import { supabase } from "@/lib/supabase"
import { X } from "lucide-react"

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const user = useUser()
  const { toast } = useToast()

  // Data Hooks
  const { data: plotsData, loading: plotsLoading, error: plotsError, refetch: refetchPlots } = usePlots()
  const { data: inquiriesData, loading: inquiriesLoading, error: inquiriesError, refetch: refetchInquiries } = useInquiries()
  const { data: postsData, loading: postsLoading, refetch: refetchPosts } = usePosts()
  const { data: locationsData, loading: locationsLoading, refetch: refetchLocations } = useLocations()
  const { data: usersData, loading: usersLoading, refetch: refetchUsers } = useUsers()
  const { mutate, loading: mutationLoading } = useMutation()

  const plots = plotsData?.plots || []
  const inquiries = inquiriesData?.inquiries || []
  const posts = postsData?.posts || []
  const locations = locationsData?.locations || []
  const usersListAll = usersData?.users || []
  const [uploading, setUploading] = useState(false)

  // Helpers
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(amount)
  }

  // Add Plot State
  const [isAddPlotOpen, setIsAddPlotOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [newPlot, setNewPlot] = useState({
    title: "",
    location: "",
    price: "",
    size_sqyd: "",
    description: "",
    featured: false,
    tag: "",
    is_published: true,
    map_coordinates: "",
    images: [] as string[]
  })


  // Add Post State
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null) // For Edit Mode
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    cover_image: "",
    published: true
  })

  // Add Location State
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<any>(null)
  const [newLocation, setNewLocation] = useState({
    name: "",
    connectivity: "",
    growth: "",
    image: "",
    overview: "",
    literacy_rate: "",
    jobs: "",
    returns: "",
    highlights: [""] as string[]
  })

  // Users State
  const [searchQuery, setSearchQuery] = useState("")
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const filteredUsers = usersData?.users?.filter((u: any) =>
    (u.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (u.stack_user_id?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  ) || []

  const AVAILABLE_PERMISSIONS = [
    { key: "manage_users", label: "Manage Users" },
    { key: "manage_plots", label: "Manage Plots" },
    { key: "manage_content", label: "Manage Content (Posts/Locations)" },
    { key: "delete_records", label: "Delete Records" }
  ]

  const handleUpdatePermissions = async () => {
    if (!editingUser) return
    try {
      const res = await fetch(`/api/users/${editingUser.stack_user_id}/permissions`, {
        method: 'PATCH',
        body: JSON.stringify({ permissions: selectedPermissions })
      })
      if (!res.ok) throw new Error("Failed")
      toast({ title: "Success", description: "Permissions updated" })
      setIsPermissionModalOpen(false)
      refetchUsers()
    } catch (error) {
      toast({ title: "Error", description: "Failed to update permissions", variant: "destructive" })
    }
  }

  const openPermissionModal = (user: any) => {
    setEditingUser(user)
    setSelectedPermissions(user.permissions || [])
    setIsPermissionModalOpen(true)
  }

  // Re-use logic for image upload if possible, or duplicate for simplicity in this context
  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("file", file)

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (data.url) {
          setNewPost(prev => ({ ...prev, cover_image: data.url }))
        }
      } catch (error) {
        toast({ title: "Error", description: "Image upload failed", variant: "destructive" })
      }
    }
  }

  const handleLocationImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("file", file)

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (data.url) {
          setNewLocation(prev => ({ ...prev, image: data.url }))
        }
      } catch (error) {
        toast({ title: "Error", description: "Image upload failed", variant: "destructive" })
      }
    }
  }

  const handleCreatePost = async () => {
    try {
      if (editingPost) {
        // Update Logic
        await mutate(`/api/posts/${editingPost.slug}`, "PUT", { ...newPost, slug: editingPost.slug })
        toast({ title: "Success", description: "Post updated successfully" })
      } else {
        // Create Logic
        await mutate("/api/posts", "POST", newPost)
        toast({ title: "Success", description: "Post created successfully" })
      }
      setIsAddPostOpen(false)
      setEditingPost(null)
      refetchPosts()
      setNewPost({ title: "", content: "", cover_image: "", published: true })
    } catch (error) {
      toast({ title: "Error", description: "Failed to save post", variant: "destructive" })
    }
  }

  const handleCreateLocation = async () => {
    try {
      if (editingLocation) {
        await mutate(`/api/locations/${editingLocation.slug}`, "PUT", newLocation)
        toast({ title: "Success", description: "Location updated successfully" })
      } else {
        await mutate("/api/locations", "POST", newLocation)
        toast({ title: "Success", description: "Location created successfully" })
      }
      setIsAddLocationOpen(false)
      setEditingLocation(null)
      refetchLocations()
      setNewLocation({ name: "", connectivity: "", growth: "", image: "", overview: "", literacy_rate: "", jobs: "", returns: "", highlights: [""] })
    } catch (error) {
      toast({ title: "Error", description: "Failed to save location", variant: "destructive" })
    }
  }

  const handleEditPostClick = (post: any) => {
    setEditingPost(post)
    setNewPost({
      title: post.title,
      content: post.content,
      cover_image: post.cover_image || "",
      published: post.published
    })
    setIsAddPostOpen(true)
  }

  const handleDeletePost = async (slug: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await mutate(`/api/posts/${slug}`, "DELETE", {})
      toast({ title: "Success", description: "Post deleted" })
      refetchPosts()
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete post", variant: "destructive" })
    }
  }

  const handleEditLocationClick = (location: any) => {
    setEditingLocation(location)
    setNewLocation({
      name: location.name,
      connectivity: location.connectivity || "",
      growth: location.growth || "",
      image: location.image || "",
      overview: location.overview || "",
      literacy_rate: location.literacy_rate || "",
      jobs: location.jobs || "",
      returns: location.returns || "",
      highlights: (location.highlights && location.highlights.length > 0) ? location.highlights : [""]
    })
    setIsAddLocationOpen(true)
  }

  const handleDeleteLocation = async (slug: string) => {
    if (!confirm("Delete this location?")) return;
    try {
      await mutate(`/api/locations/${slug}`, "DELETE", {})
      toast({ title: "Success", description: "Location deleted" })
      refetchLocations()
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete location", variant: "destructive" })
    }
  }

  const handleCreatePlot = async () => {
    try {
      if (isEditing && editingId) {
        await mutate(`/api/plots/${editingId}`, "PUT", newPlot) // Using PUT or PATCH
        toast({ title: "Success", description: "Plot updated successfully" })
      } else {
        await mutate("/api/plots", "POST", newPlot)
        toast({ title: "Success", description: "Plot created successfully" })
      }
      setIsAddPlotOpen(false)
      refetchPlots()
      resetPlotForm()
    } catch (error) {
      toast({ title: "Error", description: isEditing ? "Failed to update plot" : "Failed to create plot", variant: "destructive" })
    }
  }

  const resetPlotForm = () => {
    setNewPlot({ title: "", location: "", price: "", size_sqyd: "", description: "", featured: false, tag: "", is_published: true, map_coordinates: "", images: [] })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleEditPlot = (plot: any) => {
    setNewPlot({
      title: plot.title,
      location: plot.location,
      price: plot.price,
      size_sqyd: plot.size_sqyd,
      description: plot.description || "",
      featured: plot.featured || false,
      tag: plot.tag || "",
      is_published: plot.is_published,
      map_coordinates: plot.map_coordinates || "",
      images: plot.images || []
    })
    setIsEditing(true)
    setEditingId(plot.id)
    setIsAddPlotOpen(true)
  }

  const handleDeletePlot = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this plot?")) return;
    try {
      await mutate(`/api/plots/${slug}`, "DELETE", {})
      toast({ title: "Success", description: "Plot deleted successfully" })
      refetchPlots()
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete plot", variant: "destructive" })
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const files = Array.from(e.target.files);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      setNewPlot(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
      toast({ title: "Success", description: "Images uploaded successfully" });
    } catch (error: any) {
      console.error(error);
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setNewPlot(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    try {
      await mutate(`/api/inquiries/${id}`, "PATCH", { status })
      toast({ title: "Status Updated", description: `Inquiry marked as ${status}` })
      refetchInquiries()
    } catch (error: any) {
      console.error("Failed to update status:", error)
      toast({ title: "Error", description: error.message || "Failed to update status", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-serif font-black text-xl text-primary">AdminPanel</div>
            <div className="border-l pl-4 hidden md:block">
              <h1 className="font-serif font-black text-lg text-primary">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.displayName || "Admin"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => { window.location.href = '/handler/sign-out' }}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="plots" className="flex items-center gap-2 py-3">
              <Map className="w-4 h-4" />
              Plots
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-2 py-3">
              <Landmark className="w-4 h-4" />
              Locations
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-2 py-3">
              <MessageSquare className="w-4 h-4" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2 py-3">
              <FileText className="w-4 h-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 py-3">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Plots</CardTitle>
                  <Map className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{plots.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
                  <Landmark className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{locations.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inquiries.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {inquiries.filter((i: any) => i.status === 'new').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{posts.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{usersListAll.length}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plots Tab */}
          <TabsContent value="plots" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Plot Management</h2>

              <Dialog open={isAddPlotOpen} onOpenChange={(open) => {
                if (!open) resetPlotForm()
                setIsAddPlotOpen(open)
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Plot
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Plot" : "Add New Plot"}</DialogTitle>
                    <DialogDescription>{isEditing ? "Update property details." : "Create a new property listing."}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input value={newPlot.title} onChange={(e) => { const val = e.target.value; setNewPlot(prev => ({ ...prev, title: val })) }} placeholder="e.g. Mountain View Line" />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input value={newPlot.location} onChange={(e) => { const val = e.target.value; setNewPlot(prev => ({ ...prev, location: val })) }} placeholder="e.g. Mussoorie" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Price (INR)</Label>
                        <Input type="number" value={newPlot.price} onChange={(e) => { const val = e.target.value; setNewPlot(prev => ({ ...prev, price: val })) }} placeholder="e.g. 5000000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Size (Sq.Yd)</Label>
                        <Input type="number" value={newPlot.size_sqyd} onChange={(e) => { const val = e.target.value; setNewPlot(prev => ({ ...prev, size_sqyd: val })) }} placeholder="e.g. 200" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Detailed description</Label>
                      <Textarea value={newPlot.description} onChange={(e) => { const val = e.target.value; setNewPlot(prev => ({ ...prev, description: val })) }} placeholder="Detailed description..." />
                    </div>

                    <div className="space-y-2">
                      <Label>Google Map Coordinates (Embed Src or Lat/Lng)</Label>
                      <Input value={newPlot.map_coordinates} onChange={(e) => { const val = e.target.value; setNewPlot(prev => ({ ...prev, map_coordinates: val })) }} placeholder="e.g. 30.3165, 78.0322 or https://www.google.com/maps/embed..." />
                    </div>

                    <div className="space-y-2">
                      <Label>Tag / Label (Optional)</Label>
                      <Input value={newPlot.tag} onChange={(e) => { const val = e.target.value; setNewPlot(prev => ({ ...prev, tag: val })) }} placeholder="e.g. Best Seller, Verified, Commercial" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch checked={newPlot.featured} onCheckedChange={(c) => setNewPlot({ ...newPlot, featured: c })} id="featured-mode" />
                      <Label htmlFor="featured-mode">Featured</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={newPlot.is_published} onCheckedChange={(c) => setNewPlot({ ...newPlot, is_published: c })} id="published-mode" />
                      <Label htmlFor="published-mode">Published</Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Images</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById('image-upload')?.click()}
                          disabled={uploading}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploading ? "Uploading..." : "Upload Images"}
                        </Button>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <span className="text-sm text-muted-foreground">
                          {newPlot.images.length}/5 images
                        </span>
                      </div>
                    </div>

                    {newPlot.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        {newPlot.images.map((url, index) => (
                          <div key={index} className="relative group aspect-square rounded-md overflow-hidden border bg-muted">
                            <Image
                              src={url}
                              alt={`Plot image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddPlotOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreatePlot} disabled={mutationLoading}>
                      {mutationLoading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Plot" : "Create Plot")}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plots.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No plots found.</TableCell>
                      </TableRow>
                    ) : (
                      plots.map((plot: any) => (
                        <TableRow key={plot.id}>
                          <TableCell className="font-medium">{plot.title}</TableCell>
                          <TableCell>{plot.location}</TableCell>
                          <TableCell>{formatCurrency(plot.price)}</TableCell>
                          <TableCell>{plot.size_sqyd} sq.yd</TableCell>
                          <TableCell>
                            <Badge variant={plot.is_published ? "default" : "secondary"} className="mr-2">
                              {plot.is_published ? "Published" : "Draft"}
                            </Badge>
                            {plot.tag && <Badge variant="outline">{plot.tag}</Badge>}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEditPlot(plot)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeletePlot(plot.slug)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>


          {/* Locations Tab */}
          <TabsContent value="locations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Location Management</h2>
              <Dialog open={isAddLocationOpen} onOpenChange={(open) => {
                setIsAddLocationOpen(open)
                if (!open) {
                  setEditingLocation(null)
                  setNewLocation({ name: "", connectivity: "", growth: "", image: "", overview: "", literacy_rate: "", jobs: "", returns: "", highlights: [""] })
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    New Location
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>{editingLocation ? "Edit Location" : "Create New Location"}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={newLocation.name} onChange={e => setNewLocation({ ...newLocation, name: e.target.value })} placeholder="e.g. Badripur" />
                      </div>
                      <div className="space-y-2">
                        <Label>Growth</Label>
                        <Input value={newLocation.growth} onChange={e => setNewLocation({ ...newLocation, growth: e.target.value })} placeholder="e.g. +35% Growth (YoY)" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Overview</Label>
                      <Textarea value={newLocation.overview} onChange={e => setNewLocation({ ...newLocation, overview: e.target.value })} placeholder="One of Dehradun's most promising localities..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Connectivity</Label>
                        <Input value={newLocation.connectivity} onChange={e => setNewLocation({ ...newLocation, connectivity: e.target.value })} placeholder="e.g. Excellent" />
                      </div>
                      <div className="space-y-2">
                        <Label>Literacy Rate</Label>
                        <Input value={newLocation.literacy_rate} onChange={e => setNewLocation({ ...newLocation, literacy_rate: e.target.value })} placeholder="e.g. 92% Literacy Rate" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Jobs</Label>
                        <Input value={newLocation.jobs} onChange={e => setNewLocation({ ...newLocation, jobs: e.target.value })} placeholder="e.g. IT & Commercial Hub" />
                      </div>
                      <div className="space-y-2">
                        <Label>Returns</Label>
                        <Input value={newLocation.returns} onChange={e => setNewLocation({ ...newLocation, returns: e.target.value })} placeholder="e.g. 25-35% Annual Growth" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Image</Label>
                      <div className="flex gap-4 items-center">
                        {newLocation.image && (
                          <div className="relative w-20 h-20 rounded overflow-hidden border">
                            <Image src={newLocation.image} alt="Preview" fill className="object-cover" />
                          </div>
                        )}
                        <Input type="file" accept="image/*" onChange={handleLocationImageUpload} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Highlights (One per line)</Label>
                      <Textarea
                        value={newLocation.highlights.join("\n")}
                        onChange={e => setNewLocation({ ...newLocation, highlights: e.target.value.split("\n") })}
                        placeholder="Direct highway connectivity&#10;Rapid urbanization zone"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddLocationOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateLocation} disabled={mutationLoading}>
                      {editingLocation ? "Update" : "Create"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Connectivity</TableHead>
                      <TableHead>Growth</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No locations found.</TableCell>
                      </TableRow>
                    ) : (
                      locations.map((loc: any) => (
                        <TableRow key={loc.id}>
                          <TableCell className="font-medium">{loc.name}</TableCell>
                          <TableCell>{loc.connectivity}</TableCell>
                          <TableCell>{loc.growth}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditLocationClick(loc)}>
                                <Edit className="w-4 h-4 mr-1" /> Edit
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteLocation(loc.slug)}>
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Inquiries</h2>
              <Button size="sm" variant="outline" onClick={() => refetchInquiries()}>
                <RefreshCcw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No inquiries found.</TableCell>
                      </TableRow>
                    ) : (
                      inquiries.map((inquiry: any) => (
                        <TableRow key={inquiry.id}>
                          <TableCell className="font-medium">{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>{inquiry.phone}</TableCell>
                          <TableCell className="max-w-xs truncate" title={inquiry.message}>{inquiry.message}</TableCell>
                          <TableCell>{new Date(inquiry.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={inquiry.status === "new" ? "destructive" : inquiry.status === "closed" ? "secondary" : "default"}>
                              {inquiry.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Select onValueChange={(val) => handleUpdateInquiryStatus(inquiry.id, val)} defaultValue={inquiry.status}>
                              <SelectTrigger className="w-[120px] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">User Management</h2>
            </div>

            <div className="flex gap-4 mb-4">
              <Input
                placeholder="Search by email or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No users found.</TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((u: any) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">{u.email}</TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">{u.stack_user_id}</TableCell>
                          <TableCell>{u.last_login ? new Date(u.last_login).toLocaleDateString() : "Never"}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {u.permissions && u.permissions.map((p: string) => (
                                <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" onClick={() => openPermissionModal(u)}>
                              <Settings className="w-4 h-4 mr-2" /> Permissions
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Dialog open={isPermissionModalOpen} onOpenChange={setIsPermissionModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage Permissions</DialogTitle>
                  <DialogDescription>Select permissions for {editingUser?.email}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {AVAILABLE_PERMISSIONS.map((perm) => (
                    <div key={perm.key} className="flex items-center space-x-2">
                      <Switch
                        id={perm.key}
                        checked={selectedPermissions.includes(perm.key)}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedPermissions([...selectedPermissions, perm.key])
                          else setSelectedPermissions(selectedPermissions.filter(p => p !== perm.key))
                        }}
                      />
                      <Label htmlFor={perm.key}>{perm.label}</Label>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPermissionModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpdatePermissions}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Blog Posts</h2>
              <Dialog open={isAddPostOpen} onOpenChange={setIsAddPostOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Post Title" />
                    </div>

                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      <div className="flex gap-4 items-center">
                        {newPost.cover_image && (
                          <div className="relative w-20 h-20 rounded overflow-hidden border">
                            <Image src={newPost.cover_image} alt="Preview" fill className="object-cover" />
                          </div>
                        )}
                        <Input type="file" accept="image/*" onChange={handleBlogImageUpload} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Content (Markdown Supported)</Label>
                      <Textarea value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} placeholder="# Heading\n\nWrite your content here..." className="min-h-[300px] font-mono text-sm" />
                      <p className="text-xs text-muted-foreground">Tip: Use # for headings, **bold** for bold text.</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch checked={newPost.published} onCheckedChange={c => setNewPost({ ...newPost, published: c })} id="post-published" />
                      <Label htmlFor="post-published">Published</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddPostOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreatePost} disabled={mutationLoading}>{editingPost ? "Update" : "Create"}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No posts found.</TableCell>
                      </TableRow>
                    ) : (
                      posts.map((post: any) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.slug}</TableCell>
                          <TableCell>
                            <Badge variant={post.published ? "default" : "secondary"}>
                              {post.published ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditPostClick(post)}>
                                <Edit className="w-4 h-4 mr-1" /> Edit
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.slug)}>
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AuthGuard requireAuth={true}>
      <AdminDashboardContent />
    </AuthGuard>
  )
}