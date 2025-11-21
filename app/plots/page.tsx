"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast, toast } from "@/hooks/use-toast"
import Image from "next/image"
import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { apiClient } from "@/lib/api-client"
import { useQuery } from "@/hooks/use-api"
import { MapPin, Phone, Calendar, Star, CheckCircle, Heart, Share2, Filter, Search, Play, Users, Building, Zap, Car, Wifi, Shield, TreePine, Hospital, GraduationCap } from 'lucide-react'

export default function PlotsPage() {
  const { toast } = useToast()
  const [selectedFilter, setSelectedFilter] = useState("All Plots")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlot, setSelectedPlot] = useState<any>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({})

  const { data: plots = [], isLoading } = useQuery(apiClient.getPlots)

  // Filter plots based on search and filter
  const filteredPlots = plots.filter((plot: any) => {
    const matchesSearch = plot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plot.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "All Plots" || 
                         (selectedFilter === "Popular" && plot.is_popular) ||
                         plot.type.includes(selectedFilter)
    return matchesSearch && matchesFilter
  })

  // Toggle favorites
  const toggleFavorite = (plotId: number) => {
    setFavorites(prev => 
      prev.includes(plotId) 
        ? prev.filter(id => id !== plotId)
        : [...prev, plotId]
    )
    toast({
      title: favorites.includes(plotId) ? "Removed from favorites" : "Added to favorites",
      description: "Your favorite plots are saved for quick access."
    })
  }

  // Share plot
  const sharePlot = (plot: any) => {
    if (navigator.share) {
      navigator.share({
        title: plot.title,
        text: `Check out this amazing plot: ${plot.title} in ${plot.location}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${plot.title} - ${plot.location} - ${window.location.href}`)
      toast({
        title: "Link copied!",
        description: "Plot details copied to clipboard."
      })
    }
  }

  // Auto-rotate plot images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = { ...prev }
        plots.forEach((plot: any) => {
          if (plot.images && plot.images.length > 0) {
            newIndex[plot.id] = ((prev[plot.id] || 0) + 1) % plot.images.length
          }
        })
        return newIndex
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [plots])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading plots...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-[#F7931E] 50">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#FF6B35]/20 via-[#F7931E]/10 to-[#FF6B35]/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-bold text-5xl md:text-6xl mb-6 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
            Premium Residential Plots
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Discover handpicked plots in Uttarakhand's most beautiful locations. Each property offers excellent connectivity, utility access, and guaranteed legal clarity.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search plots by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg border-2 focus:border-[#FF6B35] rounded-xl"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              {["All Plots", "Popular", "Residential", "Investment"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter)}
                  className="px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Plots Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlots.map((plot: any) => (
              <Card
                key={plot.id}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white border-0 shadow-lg hover:transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={plot.images && plot.images.length > 0 ? plot.images[currentImageIndex[plot.id] || 0] : "/placeholder.jpg"}
                    alt={plot.title}
                    width={500}
                    height={350}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedPlot(plot)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Quick View
                    </Button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-[#FF6B35] shadow-lg">{plot.type}</Badge>
                    {plot.is_popular && (
                      <Badge className="bg-orange-500 shadow-lg">Popular</Badge>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => toggleFavorite(plot.id)}
                      className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white"
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(plot.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => sharePlot(plot)}
                      className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>

                  {/* Availability indicator */}
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90">
                      <Users className="mr-1 h-3 w-3" />
                      {plot.status === 'Available' ? 'Available' : plot.status}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl group-hover:text-[#FF6B35] transition-colors">
                      {plot.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-2 text-base">
                    <MapPin className="h-4 w-4 text-[#FF6B35]" />
                    {plot.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Plot Size</span>
                      <div className="font-semibold">{plot.area}</div>
                      <div className="text-xs text-gray-500">{plot.price_per_sqft}/sq ft</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-600">Price Range</span>
                      <div className="font-semibold text-[#FF6B35]">{plot.price}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {plot.amenities && plot.amenities.slice(0, 3).map((feature: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {plot.amenities && plot.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{plot.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button 
                      className="flex-1 bg-[#FF6B35] hover:bg-[#F7931E] shadow-lg"
                      onClick={() => {
                        const slugMap: Record<number, string> = {
                          1: '/plots/bajrang-vatika',
                          2: '/plots/nature-green-valley-phase5',
                          3: '/plots/friends-colony-phase-1'
                        }
                        window.location.href = slugMap[plot.id] || '#'
                      }}
                    >
                      View Details
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          Quick View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{plot.title}</DialogTitle>
                          <DialogDescription className="flex items-center gap-2 text-lg">
                            <MapPin className="h-5 w-5 text-[#FF6B35]" />
                            {plot.location}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            {plot.images && plot.images.map((image: string, idx: number) => (
                              <Image
                                key={idx}
                                src={image || "/placeholder.svg"}
                                alt={`${plot.title} view ${idx + 1}`}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            ))}
                          </div>

                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-4 bg-blue-50 rounded-lg text-center">
                              <div className="text-2xl font-bold text-[#FF6B35]">{plot.price}</div>
                              <div className="text-sm text-gray-600">Price Range</div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg text-center">
                              <div className="text-2xl font-bold text-[#F7931E]">{plot.area}</div>
                              <div className="text-sm text-gray-600">Plot Size</div>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg text-center">
                              <div className="text-2xl font-bold text-orange-600">{plot.status}</div>
                              <div className="text-sm text-gray-600">Status</div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold mb-3">Project Description</h3>
                            <p className="text-gray-700 leading-relaxed">{plot.description}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1 border-[#FF6B35] text-[#FF6B35] hover:bg-blue-50"
                      onClick={() => window.open('tel:+917870231314', '_self')}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Us
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
