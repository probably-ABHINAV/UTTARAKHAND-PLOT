"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"

// UI Components
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

// Icons
import { 
  MapPin, 
  Phone, 
  Calendar,
  Star,
  CheckCircle,
  Heart,
  Share2,
  Filter,
  Search,
  Play,
  Users,
  Building,
  Zap,
  Car,
  Shield,
  ExternalLink
} from "lucide-react"

// --- DATA ---
const plotData = [
  {
    id: 1,
    title: "Bajrang Vatika Premium",
    location: "Badripur, Dehradun",
    size: "900-2400 sq yd",
    type: "Residential Project",
    price: "₹16,500 /sq yd",
    pricePerSqFt: "₹2,083 - ₹1,875",
    features: ["24x7 Security", "Wide Roads", "Ready Facilities", "Premium Location"],
    images: ["/images/D_1760471281369.jpg", "/images/E_1760471281368.jpg"],
    rating: 4.8,
    reviews: 156,
    available: 12,
    isPopular: true,
    amenities: ["Water Supply", "Electricity", "Road Access", "Legal Documents"],
    description: "Bajrang Vatika is a calm, family-friendly residential layout designed for buyers who want everyday convenience without the city rush. The roads are motorable and well-defined, plot boundaries are clear, and basic utilities are accessible.",
    detailedFeatures: {
      infrastructure: [
        "Gated community entry",
        "24×7 security & CCTV",
        "Paved internal roads",
        "Underground utilities",
        "Treated water supply"
      ],
      connectivity: [
        "Dehradun ISBT: ~15 mins",
        "Railway Station: ~20 mins",
        "Jolly Grant Airport: ~30 mins",
        "Kailash Hospital: ~5-20 mins",
        "Doon Global School: ~5-20 mins"
      ],
      legalCompliance: [
        "Approved by Uttarakhand Urban Planning",
        "Clear land titles",
        "Environmental clearance obtained",
        "All NOCs available",
        "Ready for registry"
      ]
    },
    masterPlan: {
      totalArea: "50 acres",
      plotsAvailable: "200+ plots",
      openSpaces: "60% green coverage",
      infrastructure: "40% built-up area"
    },
    investmentHighlights: [
       "Affordable pricing",
      "Eco-friendly development",
      "Community-focused",
      "Flexible payment plans",
      "Strong resale value"
    ]
  },
  {
    id: 2,
    title: "Nature Green Valley Phase 5",
    location: "Ganeshpur, Dehradun",
    size: "1000-1800 sq yd",
    type: "Residential Project",
    price: "₹16,500 /sq yd",
    pricePerSqFt: "₹1,800 - ₹1,778",
    features: ["Green Parks", "Play Area", "Near Schools", "Clean Air"],
    images: ["/images/design1.png","/images/naturegreenvalley6.jpeg"],
    rating: 4.7,
    reviews: 89,
    available: 8,
    isPopular: false,
    amenities: ["Playground", "Garden", "Security", "Paved Roads"],
    description: "Nature Green Valley Phase 5 is a thoughtfully planned residential project in Ganeshpur, designed for families who value nature and community living. With abundant green spaces and modern amenities, this project offers the perfect blend of urban convenience and natural serenity.",
    detailedFeatures: {
      infrastructure: [
        "Gated community entry",
        "24×7 security & CCTV",
        "Paved internal roads",
        "Underground utilities",
        "Treated water supply"
      ],
      connectivity: [
        "National Highway: 8 mins",
        "City center: 25 mins",
        "Direct auto connectivity",
        "Nearby bus stops",
        "Well-connected roads"
      ],
      legalCompliance: [
        "Approved residential layout",
        "Clear property documents",
        "Municipality water connection",
        "Electricity board approvals",
        "EIA completed"
      ]
    },
    masterPlan: {
      totalArea: "35 acres",
      plotsAvailable: "150+ plots",
      openSpaces: "70% green coverage",
      infrastructure: "30% built-up area"
    },
    investmentHighlights: [
      "High appreciation potential",
      "Eco-friendly development",
      "Community living",
      "Flexible payment plans",
      "Strong resale value"
    ]
  },
  {
    id: 3,
    title: "Friend's Colony Phase 1",
    location: "Dehradun",
    size: "800-1500 sq yd",
    type: "Residential Project",
    price: "₹16,000 /sq yd",
    pricePerSqFt: "₹1,875 - ₹1,867",
    features: ["Smart Investment", "Connectivity", "Premium Community", "Limited Plots"],
    images: [ "/images/WhatsApp Image 2025-10-13 at 23.57.03_02316e06.jpg","/images/WhatsApp Image 2025-10-13 at 23.57.03_a5777e2d.jpg"],
    rating: 4.6,
    reviews: 67,
    available: 5,
    isPopular: false,
    amenities: ["Community Hall", "Street Lights", "Drainage", "Bus Stop Nearby"],
    description: "Friends Colony Phase-1 is a well-organized residential pocket that balances community living with easy connectivity. Plots are laid out along clear streets with good access to main roads and public transport.",
    detailedFeatures: {
      infrastructure: [
        "Gated community entry",
        "24×7 security & CCTV",
        "Paved internal roads",
        "Underground utilities",
        "Treated water supply"
      ],
      connectivity: [
        "Delhi–Dehradun Expressway: ~5 mins",
        "ISBT: ~25-30 mins",
        "Railway Station: ~25 mins",
        "Jolly Grant Airport: ~35 mins",
        "Multiple transport options"
      ],
      legalCompliance: [
        "Municipal corporation approved",
        "All utility connections ready",
        "Clear land records",
        "No legal disputes",
        "Ready for construction"
      ]
    },
    masterPlan: {
      totalArea: "25 acres",
      plotsAvailable: "100+ plots",
      openSpaces: "40% green coverage",
      infrastructure: "60% developed area"
    },
    investmentHighlights: [
      "Affordable pricing",
      "Developed infrastructure",
      "Community-focused",
      "Flexible payment plans",
      "Construction ready"
    ]
  }
]

export default function PlotsPage() {
  const { toast } = useToast()
  const [selectedFilter, setSelectedFilter] = useState("All Plots")
  const [searchQuery, setSearchQuery] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setSelectedPlot] = useState<any>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({})

  // Filter Logic
  const filteredPlots = plotData.filter(plot => {
    const matchesSearch = plot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plot.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "All Plots" || 
                          (selectedFilter === "Popular" && plot.isPopular) ||
                          plot.type.includes(selectedFilter)
    return matchesSearch && matchesFilter
  })

  // Toggle Favorites
  const toggleFavorite = (plotId: number) => {
    setFavorites(prev => 
      prev.includes(plotId) 
        ? prev.filter(id => id !== plotId)
        : [...prev, plotId]
    )
    toast({
      title: favorites.includes(plotId) ? "Removed from favorites" : "Added to favorites",
      description: "Saved to your shortlist."
    })
  }

  // Share Logic
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sharePlot = (plot: any) => {
    if (navigator.share) {
      navigator.share({
        title: plot.title,
        text: `Check out ${plot.title} in ${plot.location}`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${plot.title} - ${window.location.href}`)
      toast({ title: "Link copied to clipboard!" })
    }
  }

  // Auto-rotate Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = { ...prev }
        plotData.forEach(plot => {
          newIndex[plot.id] = ((prev[plot.id] || 0) + 1) % plot.images.length
        })
        return newIndex
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background gradient utilizing Primary (Orange) and Secondary (Lime) with opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-yellow-50/50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white text-primary border-primary/20 px-4 py-1.5 text-sm shadow-sm">
            verified • legal • ready
          </Badge>
          <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
            Premium Residential <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Plots</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Handpicked properties offering excellent connectivity, utility access, and guaranteed legal clarity in Uttarakhand.
          </p>
        </div>
      </section>

      {/* --- SEARCH & LISTING SECTION --- */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-white border-0 shadow-sm focus-visible:ring-primary rounded-xl"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {["All Plots", "Popular", "Residential", "Investment"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-full px-6 transition-all duration-300 ${
                    selectedFilter === filter 
                      ? "bg-primary text-white shadow-md hover:bg-primary/90" 
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-primary"
                  }`}
                >
                  {selectedFilter === filter && <CheckCircle className="mr-2 h-4 w-4" />}
                  {!selectedFilter.includes(filter) && filter !== "All Plots" && <Filter className="mr-2 h-4 w-4" />}
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlots.map((plot) => (
              <Card
                key={plot.id}
                className="group hover-lift border-0 shadow-lg bg-white overflow-hidden flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <Image
                    src={plot.images[currentImageIndex[plot.id] || 0]}
                    alt={plot.title}
                    width={500}
                    height={350}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedPlot(plot)}
                      className="bg-white/90 text-slate-900 hover:bg-white rounded-full"
                    >
                      <Play className="mr-2 h-4 w-4 fill-slate-900" /> Quick View
                    </Button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                    <Badge className="bg-primary/90 hover:bg-primary text-white shadow-sm backdrop-blur-md">
                      {plot.type}
                    </Badge>
                    {plot.isPopular && (
                      <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary shadow-sm">
                        Popular Choice
                      </Badge>
                    )}
                  </div>

                  {/* Top Right Icons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="icon"
                      className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-sm text-slate-700 hover:text-red-500"
                      onClick={() => toggleFavorite(plot.id)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(plot.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      size="icon"
                      className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-sm text-slate-700"
                      onClick={() => sharePlot(plot)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                     <div>
                        <div className="flex items-center gap-1 text-yellow-400 mb-1">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-bold text-sm">{plot.rating}</span>
                        </div>
                        <div className="text-xs opacity-90">{plot.reviews} reviews</div>
                     </div>
                     <Badge variant="outline" className="border-white/40 text-white bg-black/30 backdrop-blur-md">
                        <Users className="mr-1 h-3 w-3" /> {plot.available} Left
                     </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                      {plot.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-1.5 text-slate-500 mt-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    {plot.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5 flex-grow flex flex-col">
                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Size</span>
                      <div className="font-semibold text-slate-800">{plot.size}</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Price</span>
                      <div className="font-semibold text-primary">{plot.price}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {plot.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                        {feature}
                      </span>
                    ))}
                    {plot.features.length > 3 && (
                      <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                        +{plot.features.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-3 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-md group-hover:shadow-lg transition-all">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl h-[85vh] p-0 gap-0 overflow-hidden bg-white border-0">
                        <div className="flex flex-col h-full">
                          {/* Modal Header */}
                          <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                            <div>
                               <DialogTitle className="text-2xl font-bold text-slate-900">{plot.title}</DialogTitle>
                               <DialogDescription className="flex items-center gap-2 mt-1 text-base text-slate-500">
                                  <MapPin className="h-4 w-4 text-primary" /> {plot.location}
                               </DialogDescription>
                            </div>
                            <div className="flex gap-2">
                               <Button variant="outline" size="sm" onClick={() => sharePlot(plot)}>
                                  <Share2 className="h-4 w-4 mr-2" /> Share
                               </Button>
                               <Button className="bg-primary hover:bg-primary/90" size="sm" onClick={() => window.open(`tel:+917870231314`)}>
                                  <Phone className="h-4 w-4 mr-2" /> Call
                               </Button>
                            </div>
                          </div>

                          {/* Modal Body - Scrollable */}
                          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                            
                            {/* Images & Key Stats */}
                            <div className="grid md:grid-cols-12 gap-6">
                               <div className="md:col-span-8 space-y-4">
                                  <div className="grid grid-cols-2 gap-2">
                                    {plot.images.map((img: string, i: number) => (
                                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                                        <Image src={img} alt="View" fill className="object-cover" />
                                      </div>
                                    ))}
                                  </div>
                                  <div className="prose prose-slate max-w-none">
                                     <h3 className="text-lg font-bold text-slate-900 mb-2">About Project</h3>
                                     <p className="text-slate-600 leading-relaxed">{plot.description}</p>
                                  </div>
                               </div>

                               <div className="md:col-span-4 space-y-4">
                                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                                      <h4 className="font-semibold text-slate-900">Project Snapshot</h4>
                                      <div className="space-y-3">
                                          <div className="flex justify-between text-sm">
                                             <span className="text-slate-500">Total Area</span>
                                             <span className="font-medium">{plot.masterPlan.totalArea}</span>
                                          </div>
                                          <Separator />
                                          <div className="flex justify-between text-sm">
                                             <span className="text-slate-500">Available</span>
                                             <span className="font-medium text-primary">{plot.masterPlan.plotsAvailable}</span>
                                          </div>
                                          <Separator />
                                          <div className="flex justify-between text-sm">
                                             <span className="text-slate-500">Open Space</span>
                                             <span className="font-medium">{plot.masterPlan.openSpaces}</span>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="p-5 bg-secondary/10 rounded-xl border border-secondary/20">
                                     <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                       <Zap className="h-4 w-4 text-slate-900" /> Investment Logic
                                     </h4>
                                     <ul className="space-y-2">
                                       {plot.investmentHighlights.slice(0,4).map((h: string, i: number) => (
                                         <li key={i} className="text-sm flex items-start gap-2 text-slate-700">
                                           <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {h}
                                         </li>
                                       ))}
                                     </ul>
                                  </div>
                               </div>
                            </div>

                            <Separator />

                            {/* Detailed Specs Grid */}
                            <div className="grid md:grid-cols-3 gap-8">
                               {/* Infrastructure */}
                               <div>
                                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                                    <Building className="h-5 w-5 text-primary" /> Infrastructure
                                  </h4>
                                  <ul className="space-y-3">
                                     {plot.detailedFeatures.infrastructure.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> {item}
                                        </li>
                                     ))}
                                  </ul>
                               </div>

                               {/* Connectivity */}
                               <div>
                                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                                    <Car className="h-5 w-5 text-primary" /> Connectivity
                                  </h4>
                                  <ul className="space-y-3">
                                     {plot.detailedFeatures.connectivity.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> {item}
                                        </li>
                                     ))}
                                  </ul>
                               </div>

                               {/* Legal */}
                               <div>
                                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                                    <Shield className="h-5 w-5 text-primary" /> Legal Status
                                  </h4>
                                  <ul className="space-y-3">
                                     {plot.detailedFeatures.legalCompliance.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" /> {item}
                                        </li>
                                     ))}
                                  </ul>
                               </div>
                            </div>
                          </div>

                          {/* Modal Footer */}
                          <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-4 justify-end">
                              <Button variant="outline" onClick={() => window.open(`https://wa.me/917870231314?text=Interested in ${plot.title}`)}>
                                 WhatsApp Inquiry
                              </Button>
                              <Button className="bg-primary hover:bg-primary/90 px-8" onClick={() => window.open('/contact')}>
                                 Schedule Site Visit <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary/5"
                      onClick={() => window.open('tel:+917870231314', '_self')}
                    >
                      <Phone className="h-4 w-4" />
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