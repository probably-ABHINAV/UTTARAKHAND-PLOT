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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Eye, Search, ArrowLeft, FileText, Globe, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { LogoutButton } from "@/components/logout-button"
import { apiClient, BlogPost } from "@/lib/api-client"
import { toast } from "sonner"

const categories = ["Investment", "Market Trends", "Market Analysis", "Destinations", "Spiritual Places", "Tourism"]

function BlogManagementContent() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getBlogs()
      setPosts(response.blogs || [])
    } catch (error) {
      toast.error("Failed to load blogs")
      console.error("Error loading blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    const matchesStatus = statusFilter === "all" || post.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleAddPost = async (formData: FormData) => {
    try {
      const title = formData.get("title") as string
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const newPost = {
        title,
        slug,
        excerpt: formData.get("excerpt") as string,
        content: formData.get("content") as string,
        category_id: 1,
        tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
        status: formData.get("status") as "draft" | "published",
        is_featured: formData.get("featured") === "on",
        meta_title: formData.get("metaTitle") as string,
        meta_description: formData.get("metaDescription") as string,
      }

      const response = await apiClient.createBlog(newPost as any)
      setPosts([response.blog, ...posts])
      toast.success("Blog created successfully")
      setIsAddDialogOpen(false)
    } catch (error) {
      toast.error("Failed to create blog")
      console.error("Error creating blog:", error)
    }
  }

  const handleDeletePost = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return
    try {
      await apiClient.deleteBlog(postId.toString())
      setPosts(posts.filter((post) => post.id !== postId))
      toast.success("Blog deleted successfully")
    } catch (error) {
      toast.error("Failed to delete blog")
      console.error("Error deleting blog:", error)
    }
  }

  const handleToggleStatus = async (postId: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "published" ? "draft" : "published"
      const response = await apiClient.updateBlog(postId.toString(), { status: newStatus as any })
      setPosts(posts.map((post) => (post.id === postId ? response.blog : post)))
      toast.success(`Blog ${newStatus}`)
    } catch (error) {
      toast.error("Failed to update blog status")
      console.error("Error updating blog:", error)
    }
  }

  const getStatusColor = (status: string) => {
    return status === "published" ? "default" : "secondary"
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
              <h1 className="font-serif font-black text-lg text-primary">Blog Management</h1>
              <p className="text-sm text-muted-foreground">Create and manage blog content</p>
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
                placeholder="Search posts by title, content, or tags..."
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
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>Write and publish a new blog post</DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAddPost(new FormData(e.currentTarget))
                }}
                className="space-y-6"
              >
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" required />
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea id="excerpt" name="excerpt" rows={2} required />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea id="content" name="content" rows={12} required />
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue="draft">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" name="tags" placeholder="e.g., Investment, Hill Stations, Real Estate" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="featured" name="featured" className="rounded" />
                      <Label htmlFor="featured">Featured Post</Label>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="space-y-4">
                    <div>
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input id="metaTitle" name="metaTitle" />
                    </div>
                    <div>
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea id="metaDescription" name="metaDescription" rows={3} />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Create Post
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{posts.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold text-green-600">{posts.filter((p) => p.status === "published").length}</p>
                </div>
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold text-yellow-600">{posts.filter((p) => p.status === "draft").length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{posts.reduce((sum, post) => sum + post.views_count, 0).toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
            <CardDescription>Manage your blog content and publications</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading blogs...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No blogs found</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(post.status) as any}>{post.status}</Badge>
                      </TableCell>
                      <TableCell>{post.views_count.toLocaleString()}</TableCell>
                      <TableCell className="text-sm">{post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(post.id, post.status)}
                            className={post.status === "published" ? "text-yellow-600" : "text-green-600"}
                          >
                            {post.status === "published" ? "Unpublish" : "Publish"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeletePost(post.id)}
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

export default function BlogManagementPage() {
  return (
    <AuthGuard requireAuth={true}>
      <BlogManagementContent />
    </AuthGuard>
  )
}
