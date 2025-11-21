"use client"

import { useState } from "react"
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
import { Plus, Edit, Trash2, Eye, Search, ArrowLeft, FileText, Globe, Clock } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { LogoutButton } from "@/components/logout-button"
import { useQuery, useMutation } from "@/hooks/use-api"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"

const categories = ["Investment", "Market Trends", "Market Analysis", "Destinations", "Spiritual Places", "Tourism"]

function BlogManagementContent() {
  const { data: blogsData, refetch } = useQuery(apiClient.getBlogs)
  const posts = blogsData?.blogs || []
  
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const createBlogMutation = useMutation(apiClient.createBlog)
  const updateBlogMutation = useMutation((data: { id: string; blog: any }) => 
    apiClient.updateBlog(data.id, data.blog)
  )
  const deleteBlogMutation = useMutation(apiClient.deleteBlog)

  const filteredPosts = posts.filter((post: any) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    const matchesStatus = statusFilter === "all" || post.status.toLowerCase() === statusFilter.toLowerCase()
    // const matchesCategory = categoryFilter === "all" || post.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleAddPost = async (formData: FormData) => {
    try {
      const newPost = {
        title: formData.get("title") as string,
        excerpt: formData.get("excerpt") as string,
        content: formData.get("content") as string,
        // category: formData.get("category") as string,
        tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
        status: formData.get("status") as string,
        is_featured: formData.get("featured") === "on",
        meta_title: formData.get("metaTitle") as string,
        meta_description: formData.get("metaDescription") as string,
        featured_image: "/placeholder.jpg", // Default image for now
      }
      
      await createBlogMutation.mutateAsync(newPost)
      refetch()
      setIsAddDialogOpen(false)
      toast.success("Blog post created successfully")
    } catch (error) {
      console.error('Error creating blog post:', error)
      toast.error('Error creating blog post')
    }
  }

  const handleEditPost = async (formData: FormData) => {
    if (!selectedPost) return

    try {
      const updatedPost = {
        title: formData.get("title") as string,
        excerpt: formData.get("excerpt") as string,
        content: formData.get("content") as string,
        tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
        status: formData.get("status") as string,
        is_featured: formData.get("featured") === "on",
        meta_title: formData.get("metaTitle") as string,
        meta_description: formData.get("metaDescription") as string,
      }

      await updateBlogMutation.mutateAsync({ id: selectedPost.id, blog: updatedPost })
      refetch()
      setIsEditDialogOpen(false)
      setSelectedPost(null)
      toast.success("Blog post updated successfully")
    } catch (error) {
      console.error('Error updating blog post:', error)
      toast.error('Error updating blog post')
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteBlogMutation.mutateAsync(postId)
        refetch()
        toast.success("Blog post deleted successfully")
      } catch (error) {
        console.error('Error deleting blog post:', error)
        toast.error('Error deleting blog post')
      }
    }
  }

  const handleToggleStatus = async (post: any) => {
    try {
      const newStatus = post.status === "published" ? "draft" : "published"
      await updateBlogMutation.mutateAsync({ 
        id: post.id, 
        blog: { status: newStatus } 
      })
      refetch()
      toast.success(`Post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`)
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Error updating status')
    }
  }

  const openEditDialog = (post: any) => {
    setSelectedPost(post)
    setIsEditDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    return status === "published" ? "default" : "secondary"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Image
              src="/property-in-uk-logo.png"
              alt="Property in Uttrakhand"
              width={140}
              height={45}
              className="h-10 w-auto"
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
        {/* Filters and Actions */}
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

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Blog Post</DialogTitle>
                <DialogDescription>Update your blog post</DialogDescription>
              </DialogHeader>
              {selectedPost && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleEditPost(new FormData(e.currentTarget))
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
                        <Label htmlFor="edit-title">Title</Label>
                        <Input id="edit-title" name="title" defaultValue={selectedPost.title} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-excerpt">Excerpt</Label>
                        <Textarea id="edit-excerpt" name="excerpt" defaultValue={selectedPost.excerpt} rows={2} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-content">Content</Label>
                        <Textarea id="edit-content" name="content" defaultValue={selectedPost.content} rows={12} required />
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-status">Status</Label>
                          <Select name="status" defaultValue={selectedPost.status}>
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
                        <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                        <Input id="edit-tags" name="tags" defaultValue={selectedPost.tags?.join(", ")} placeholder="e.g., Investment, Hill Stations, Real Estate" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="edit-featured" name="featured" defaultChecked={selectedPost.is_featured} className="rounded" />
                        <Label htmlFor="edit-featured">Featured Post</Label>
                      </div>
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-4">
                      <div>
                        <Label htmlFor="edit-metaTitle">Meta Title</Label>
                        <Input id="edit-metaTitle" name="metaTitle" defaultValue={selectedPost.meta_title} />
                      </div>
                      <div>
                        <Label htmlFor="edit-metaDescription">Meta Description</Label>
                        <Textarea id="edit-metaDescription" name="metaDescription" defaultValue={selectedPost.meta_description} rows={3} />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Update Post
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
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
                  <p className="text-2xl font-bold text-green-600">
                    {posts.filter((p: any) => p.status === "published").length}
                  </p>
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
                  <p className="text-2xl font-bold text-yellow-600">
                    {posts.filter((p: any) => p.status === "draft").length}
                  </p>
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
                  <p className="text-2xl font-bold">
                    {posts.reduce((sum: number, post: any) => sum + (post.views_count || 0), 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
            <CardDescription>Manage your blog content and publications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  {/* <TableHead>Category</TableHead> */}
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post: any) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                        {post.is_featured && (
                          <Badge variant="outline" className="mt-1">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    {/* <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell> */}
                    <TableCell className="text-sm">Admin</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(post.status) as any}>{post.status}</Badge>
                    </TableCell>
                    <TableCell>{(post.views_count || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-sm">{post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleStatus(post)}
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
