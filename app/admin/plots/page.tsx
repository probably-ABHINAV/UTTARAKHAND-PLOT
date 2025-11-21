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
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit, Trash2, Eye, MapPin, Home, IndianRupee, Search, Download, Upload, ArrowLeft, Save } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { LogoutButton } from "@/components/logout-button"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client"
import { useQuery, useMutation } from "@/hooks/use-api"

function PlotManagementContent() {
  const { data: plots = [], refetch } = useQuery(apiClient.getPlots)
  const [selectedPlot, setSelectedPlot] = useState<any>(null)
  const [editingPlot, setEditingPlot] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const createPlotMutation = useMutation(apiClient.createPlot)
  const updatePlotMutation = useMutation((data: { id: string; plot: any }) => 
    apiClient.updatePlot(data.id, data.plot)
  )
  const deletePlotMutation = useMutation(apiClient.deletePlot)

  const filteredPlots = plots.filter((plot) => {
    const matchesSearch =
      plot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || plot.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || plot.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  const handleAddPlot = async (formData: FormData) => {
    try {
      const newPlot = {
        title: formData.get("title") as string,
        location: formData.get("location") as string,
        area: formData.get("area") as string,
        price: formData.get("price") as string,
        price_per_sqft: formData.get("pricePerSqFt") as string,
        type: formData.get("type") as string,
        status: "Available",
        facing: formData.get("facing") as string,
        amenities: ["Road Access", "Electricity"], // Default amenities
        description: formData.get("description") as string,
        images: ["/placeholder.jpg"],
        coordinates: { lat: 30.0, lng: 78.0 },
        nearby_attractions: [],
        legal_status: "Pending",
        approvals: [],
      }
      
      await createPlotMutation.mutateAsync(newPlot)
      refetch()
      setIsAddDialogOpen(false)
      toast.success("Plot added successfully")
    } catch (error) {
      console.error('Error creating plot:', error)
      toast.error('Error creating plot. Please try again.')
    }
  }

  const handleEditPlot = async (formData: FormData) => {
    if (!editingPlot) return

    try {
      const updatedPlot = {
        title: formData.get("title") as string,
        location: formData.get("location") as string,
        area: formData.get("area") as string,
        price: formData.get("price") as string,
        price_per_sqft: formData.get("pricePerSqFt") as string,
        type: formData.get("type") as string,
        facing: formData.get("facing") as string,
        status: formData.get("status") as string,
        description: formData.get("description") as string,
      }

      await updatePlotMutation.mutateAsync({ id: editingPlot.id, plot: updatedPlot })
      refetch()
      setIsEditDialogOpen(false)
      setEditingPlot(null)
      toast.success("Plot updated successfully")
    } catch (error) {
      console.error('Error updating plot:', error)
      toast.error('Error updating plot. Please try again.')
    }
  }

  const handleDeletePlot = async (plotId: string) => {
    if (window.confirm('Are you sure you want to delete this plot?')) {
      try {
        await deletePlotMutation.mutateAsync(plotId)
        refetch()
        toast.success("Plot deleted successfully")
      } catch (error) {
        console.error('Error deleting plot:', error)
        toast.error('Error deleting plot. Please try again.')
      }
    }
  }

  const openEditDialog = (plot: any) => {
    setEditingPlot(plot)
    setIsEditDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "default"
      case "reserved":
        return "secondary"
      case "sold":
        return "destructive"
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
              src="/property-in-uk-logo.png"
              alt="Property in Uttrakhand"
              width={140}
              height={45}
              className="h-10 w-auto"
            />
            <div>
              <h1 className="font-serif font-black text-lg text-primary">Plot Management</h1>
              <p className="text-sm text-muted-foreground">Manage individual plots and properties</p>
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
                placeholder="Search plots by title, location, or ID..."
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
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Plot
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Plot</DialogTitle>
                  <DialogDescription>Enter the details for the new plot listing</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleAddPlot(new FormData(e.currentTarget))
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Plot Title</Label>
                      <Input id="title" name="title" required />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="area">Area</Label>
                      <Input id="area" name="area" placeholder="e.g., 2500 sq ft" required />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" name="price" placeholder="e.g., ₹45 L" required />
                    </div>
                    <div>
                      <Label htmlFor="pricePerSqFt">Price per Sq Ft</Label>
                      <Input id="pricePerSqFt" name="pricePerSqFt" placeholder="e.g., ₹1,800" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="facing">Facing</Label>
                      <Select name="facing" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select facing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="North">North</SelectItem>
                          <SelectItem value="South">South</SelectItem>
                          <SelectItem value="East">East</SelectItem>
                          <SelectItem value="West">West</SelectItem>
                          <SelectItem value="North-East">North-East</SelectItem>
                          <SelectItem value="North-West">North-West</SelectItem>
                          <SelectItem value="South-East">South-East</SelectItem>
                          <SelectItem value="South-West">South-West</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" rows={3} required />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Add Plot
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Plot</DialogTitle>
                  <DialogDescription>Update the details for {editingPlot?.title}</DialogDescription>
                </DialogHeader>
                {editingPlot && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleEditPlot(new FormData(e.currentTarget))
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-title">Plot Title</Label>
                        <Input id="edit-title" name="title" defaultValue={editingPlot.title} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-location">Location</Label>
                        <Input id="edit-location" name="location" defaultValue={editingPlot.location} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-area">Area</Label>
                        <Input id="edit-area" name="area" defaultValue={editingPlot.area} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-price">Price</Label>
                        <Input id="edit-price" name="price" defaultValue={editingPlot.price} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-pricePerSqFt">Price per Sq Ft</Label>
                        <Input id="edit-pricePerSqFt" name="pricePerSqFt" defaultValue={editingPlot.price_per_sqft} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-type">Type</Label>
                        <Select name="type" defaultValue={editingPlot.type} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Residential">Residential</SelectItem>
                            <SelectItem value="Commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-facing">Facing</Label>
                        <Select name="facing" defaultValue={editingPlot.facing} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select facing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="North">North</SelectItem>
                            <SelectItem value="South">South</SelectItem>
                            <SelectItem value="East">East</SelectItem>
                            <SelectItem value="West">West</SelectItem>
                            <SelectItem value="North-East">North-East</SelectItem>
                            <SelectItem value="North-West">North-West</SelectItem>
                            <SelectItem value="South-East">South-East</SelectItem>
                            <SelectItem value="South-West">South-West</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-status">Status</Label>
                        <Select name="status" defaultValue={editingPlot.status} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Available">Available</SelectItem>
                            <SelectItem value="Reserved">Reserved</SelectItem>
                            <SelectItem value="Sold">Sold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea id="edit-description" name="description" defaultValue={editingPlot.description} rows={3} required />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Plots</p>
                  <p className="text-2xl font-bold">{plots.length}</p>
                </div>
                <Home className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-green-600">
                    {plots.filter((p) => p.status === "Available").length}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-green-600"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reserved</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {plots.filter((p) => p.status === "Reserved").length}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-yellow-600"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">₹1.75 Cr</p>
                </div>
                <IndianRupee className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Plot Listings ({filteredPlots.length})</CardTitle>
            <CardDescription>Manage your plot inventory and details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plot ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlots.map((plot: any) => (
                  <TableRow key={plot.id}>
                    <TableCell className="font-mono text-sm">{plot.id.substring(0, 8)}...</TableCell>
                    <TableCell className="font-medium">{plot.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{plot.location}</TableCell>
                    <TableCell>{plot.area}</TableCell>
                    <TableCell className="font-semibold">{plot.price}</TableCell>
                    <TableCell>{plot.type}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(plot.status) as any}>{plot.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedPlot(plot)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{selectedPlot?.title}</DialogTitle>
                              <DialogDescription>Plot ID: {selectedPlot?.id}</DialogDescription>
                            </DialogHeader>
                            {selectedPlot && (
                              <Tabs defaultValue="details" className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                  <TabsTrigger value="details">Details</TabsTrigger>
                                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                                  <TabsTrigger value="location">Location</TabsTrigger>
                                  <TabsTrigger value="legal">Legal</TabsTrigger>
                                </TabsList>
                                <TabsContent value="details" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Location</Label>
                                      <p className="text-sm">{selectedPlot.location}</p>
                                    </div>
                                    <div>
                                      <Label>Area</Label>
                                      <p className="text-sm">{selectedPlot.area}</p>
                                    </div>
                                    <div>
                                      <Label>Price</Label>
                                      <p className="text-sm font-semibold">{selectedPlot.price}</p>
                                    </div>
                                    <div>
                                      <Label>Price per Sq Ft</Label>
                                      <p className="text-sm">{selectedPlot.price_per_sqft}</p>
                                    </div>
                                    <div>
                                      <Label>Type</Label>
                                      <p className="text-sm">{selectedPlot.type}</p>
                                    </div>
                                    <div>
                                      <Label>Facing</Label>
                                      <p className="text-sm">{selectedPlot.facing}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Description</Label>
                                    <p className="text-sm text-muted-foreground">{selectedPlot.description}</p>
                                  </div>
                                </TabsContent>
                                <TabsContent value="amenities" className="space-y-4">
                                  <div>
                                    <Label>Available Amenities</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                      {selectedPlot.amenities.map((amenity: string, index: number) => (
                                        <div key={index} className="flex items-center gap-2">
                                          <Checkbox checked readOnly />
                                          <span className="text-sm">{amenity}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </TabsContent>
                                <TabsContent value="location" className="space-y-4">
                                  <div>
                                    <Label>Nearby Attractions</Label>
                                    <ul className="mt-2 space-y-1">
                                      {selectedPlot.nearby_attractions.map((attraction: string, index: number) => (
                                        <li key={index} className="text-sm flex items-center gap-2">
                                          <MapPin className="w-3 h-3 text-primary" />
                                          {attraction}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <Label>Coordinates</Label>
                                    <p className="text-sm">
                                      Lat: {selectedPlot.coordinates.lat}, Lng: {selectedPlot.coordinates.lng}
                                    </p>
                                  </div>
                                </TabsContent>
                                <TabsContent value="legal" className="space-y-4">
                                  <div>
                                    <Label>Legal Status</Label>
                                    <p className="text-sm">{selectedPlot.legal_status}</p>
                                  </div>
                                  <div>
                                    <Label>Approvals</Label>
                                    <ul className="mt-2 space-y-1">
                                      {selectedPlot.approvals.map((approval: string, index: number) => (
                                        <li key={index} className="text-sm flex items-center gap-2">
                                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                          {approval}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Date Added</Label>
                                      <p className="text-sm">{selectedPlot.date_added}</p>
                                    </div>
                                    <div>
                                      <Label>Last Updated</Label>
                                      <p className="text-sm">{selectedPlot.last_updated}</p>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(plot)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeletePlot(plot.id)}
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

export default function PlotManagementPage() {
  return (
    <AuthGuard requireAuth={true}>
      <PlotManagementContent />
    </AuthGuard>
  )
}
