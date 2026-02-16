"use client"

import { useState } from "react"
import Link from "next/link"
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

// Icons
import { 
  Calendar, 
  Eye, 
  User, 
  Search, 
  Filter, 
  ArrowRight,
  BookOpen
} from "lucide-react"

// --- BLOG DATA ---
const blogPosts = [
  [
  // ... (Your existing entries here) ...

  {
    id: 7,
    title: "Real Estate Market Outlook 2026: Uttarakhand Edition",
    slug: "real-estate-market-outlook-uttarakhand-2026",
    excerpt: "What does 2026 hold for property investors in Dehradun and Rishikesh? We analyze price trends and upcoming infrastructure.",
    content: `...`,
    category: "Market Trends",
    tags: ["2026 Forecast", "Property Trends", "Investment"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-01",
    lastModified: "2026-01-01",
    views: 110,
    featured: true,
    image: "/images/2026-outlook.jpg"
  },
  {
    id: 8,
    title: "Dehradun vs. Rishikesh: Which is Better for a Holiday Home?",
    slug: "dehradun-vs-rishikesh-holiday-home-comparison",
    excerpt: "Comparing the two giants of Uttarakhand real estate. We break down rental yields, lifestyle, and accessibility.",
    content: `...`,
    category: "Location Guide",
    tags: ["Dehradun", "Rishikesh", "Holiday Home"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-03",
    lastModified: "2026-01-03",
    views: 340,
    featured: false,
    image: "/images/doon-vs-rishikesh.jpg"
  },
  {
    id: 9,
    title: "Understanding Land Laws in Uttarakhand for Non-Residents",
    slug: "uttarakhand-land-laws-non-residents-guide",
    excerpt: "Can outsiders buy land in Uttarakhand? A simplified guide to land ceilings, permission requirements, and legalities.",
    content: `...`,
    category: "Legal & Advice",
    tags: ["Land Laws", "Legal", "Non-Resident Buyer"],
    author: "Legal Advisor",
    status: "Published",
    publishedDate: "2026-01-05",
    lastModified: "2026-01-05",
    views: 890,
    featured: true,
    image: "/images/legal-docs.jpg"
  },
  {
    id: 10,
    title: "The Impact of the Delhi-Dehradun Expressway on Property Prices",
    slug: "delhi-dehradun-expressway-property-impact",
    excerpt: "With travel time reducing significantly, find out which localities along the expressway are witnessing a price boom.",
    content: `...`,
    category: "Infrastructure",
    tags: ["Expressway", "Connectivity", "Price Appreciation"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-07",
    lastModified: "2026-01-07",
    views: 1250,
    featured: false,
    image: "/images/highway-infra.jpg"
  },
  {
    id: 11,
    title: "5 Hidden Gem Locations Near Mussoorie for Cottages",
    slug: "hidden-gem-locations-near-mussoorie",
    excerpt: "Mussoorie is crowded. Explore these 5 serene villages nearby that offer better views and lower land rates.",
    content: `...`,
    category: "Location Guide",
    tags: ["Mussoorie", "Cottages", "Hidden Gems"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-09",
    lastModified: "2026-01-09",
    views: 450,
    featured: false,
    image: "/images/mussoorie-hills.jpg"
  },
  {
    id: 12,
    title: "Eco-Friendly Construction: Building in the Hills",
    slug: "eco-friendly-construction-tips-uttarakhand",
    excerpt: "How to build a sustainable home in the mountains. Tips on materials, water harvesting, and slope stabilization.",
    content: `...`,
    category: "Construction",
    tags: ["Sustainability", "Eco Home", "Construction"],
    author: "Architect Team",
    status: "Published",
    publishedDate: "2026-01-11",
    lastModified: "2026-01-11",
    views: 300,
    featured: false,
    image: "/images/eco-home.jpg"
  },
  {
    id: 13,
    title: "Homestays in Uttarakhand: A Business Model Guide",
    slug: "starting-homestay-business-uttarakhand",
    excerpt: "Turning your property into an income generator. Learn about government schemes, registration, and expected ROI.",
    content: `...`,
    category: "Investment",
    tags: ["Homestay", "Rental Income", "Business"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-13",
    lastModified: "2026-01-13",
    views: 780,
    featured: true,
    image: "/images/homestay-view.jpg"
  },
  {
    id: 14,
    title: "Buying Agricultural vs. Residential Land: Key Differences",
    slug: "agricultural-vs-residential-land-uttarakhand",
    excerpt: "Don't get stuck with the wrong land use. We explain the crucial differences in purchasing agricultural land vs. plotted developments.",
    content: `...`,
    category: "Property Tips",
    tags: ["Land Use", "Agricultural Land", "Buying Tips"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-15",
    lastModified: "2026-01-15",
    views: 620,
    featured: false,
    image: "/images/farmland.jpg"
  },
  {
    id: 15,
    title: "Top 3 Gated Communities in Dehradun Reviewed",
    slug: "top-gated-communities-dehradun-review",
    excerpt: "Safety and amenities tailored for retirees and families. A detailed review of the most popular societies in 2026.",
    content: `...`,
    category: "Reviews",
    tags: ["Gated Community", "Dehradun Living", "Safety"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-17",
    lastModified: "2026-01-17",
    views: 910,
    featured: false,
    image: "/images/gated-society.jpg"
  },
  {
    id: 16,
    title: "Avoiding Land Scams: Red Flags to Watch Out For",
    slug: "avoiding-land-scams-uttarakhand-checklist",
    excerpt: "Double ownership, disputable titles, and encroachments. Learn how to spot a scam before you pay the token amount.",
    content: `...`,
    category: "Legal & Advice",
    tags: ["Fraud Prevention", "Safety", "Due Diligence"],
    author: "Legal Advisor",
    status: "Published",
    publishedDate: "2026-01-19",
    lastModified: "2026-01-19",
    views: 1400,
    featured: true,
    image: "/images/warning-sign.jpg"
  },
  {
    id: 17,
    title: "The Rise of Haridwar: Investment Beyond Spirituality",
    slug: "haridwar-real-estate-investment-growth",
    excerpt: "Haridwar is evolving into an industrial and residential hub. Why smart investors are looking towards SIIDCUL and bypass areas.",
    content: `...`,
    category: "Market Trends",
    tags: ["Haridwar", "Industrial Hub", "Investment"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-21",
    lastModified: "2026-01-21",
    views: 550,
    featured: false,
    image: "/images/haridwar-ghat.jpg"
  },
  {
    id: 18,
    title: "Winter Maintenance Guide for Your Hill Property",
    slug: "winter-maintenance-guide-hill-property",
    excerpt: "Protecting your pipes and roof during the cold months. Essential maintenance tips for absentee landlords.",
    content: `...`,
    category: "Property Management",
    tags: ["Maintenance", "Winter", "Property Care"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-23",
    lastModified: "2026-01-23",
    views: 280,
    featured: false,
    image: "/images/winter-house.jpg"
  },
  {
    id: 19,
    title: "Republic Day Special: Infrastructure Projects Transforming Uttarakhand",
    slug: "infrastructure-projects-transforming-uttarakhand-2026",
    excerpt: "A look at the state's massive infrastructure push, from rail connectivity in the hills to smart city projects.",
    content: `...`,
    category: "Infrastructure",
    tags: ["Development", "Smart City", "Rail Projects"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-25",
    lastModified: "2026-01-25",
    views: 700,
    featured: false,
    image: "/images/train-bridge.jpg"
  },
  {
    id: 20,
    title: "Plot vs. Apartment: What Resells Faster in Dehradun?",
    slug: "plot-vs-apartment-resale-value-dehradun",
    excerpt: "Liquidity matters. We analyze historical data to see whether land or flats offer a quicker exit strategy.",
    content: `...`,
    category: "Investment",
    tags: ["Resale Value", "Apartments", "Plots"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-27",
    lastModified: "2026-01-27",
    views: 880,
    featured: false,
    image: "/images/apt-building.jpg"
  },
  {
    id: 21,
    title: "Water Scarcity Checks Before Buying Hill Plots",
    slug: "water-scarcity-checks-hill-plots",
    excerpt: "A view is useless without water. How to verify municipal supply vs. borewell feasibility in high-altitude plots.",
    content: `...`,
    category: "Property Tips",
    tags: ["Water Supply", "Due Diligence", "Utilities"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-29",
    lastModified: "2026-01-29",
    views: 600,
    featured: true,
    image: "/images/water-source.jpg"
  },
  {
    id: 22,
    title: "Commercial Real Estate: Shop Spaces in Dehradun",
    slug: "commercial-real-estate-shop-spaces-dehradun",
    excerpt: "Where to buy commercial space? Rajpur Road vs. GMS Road vs. Sahastradhara Road analysis.",
    content: `...`,
    category: "Commercial",
    tags: ["Commercial", "Retail", "Office Space"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-31",
    lastModified: "2026-01-31",
    views: 410,
    featured: false,
    image: "/images/commercial-complex.jpg"
  },
  {
    id: 23,
    title: "Retirement Havens: Best Localities for Senior Citizens",
    slug: "best-retirement-localities-dehradun-2026",
    excerpt: "Peace, healthcare access, and flat terrain. We pick the top 3 localities best suited for post-retirement living.",
    content: `...`,
    category: "Lifestyle",
    tags: ["Retirement", "Senior Living", "Healthcare"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-02-02",
    lastModified: "2026-02-02",
    views: 530,
    featured: false,
    image: "/images/senior-couple.jpg"
  },
  {
    id: 24,
    title: "Soil Testing and Slope Stability: A Buyer's Responsibility",
    slug: "soil-testing-slope-stability-checklist",
    excerpt: "Don't build on loose soil. Why a geotechnical survey is essential before buying land on a steep incline.",
    content: `...`,
    category: "Construction",
    tags: ["Safety", "Soil Test", "Technical"],
    author: "Architect Team",
    status: "Published",
    publishedDate: "2026-02-04",
    lastModified: "2026-02-04",
    views: 290,
    featured: false,
    image: "/images/soil-test.jpg"
  },
  {
    id: 25,
    title: "The Charm of Colonial Bungalows: Restoration Costs",
    slug: "restoring-colonial-bungalows-uttarakhand",
    excerpt: "Buying an old heritage property? We estimate the costs of restoring colonial-era cottages in Landour and Dehradun.",
    content: `...`,
    category: "Lifestyle",
    tags: ["Heritage", "Restoration", "Luxury"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-02-06",
    lastModified: "2026-02-06",
    views: 760,
    featured: true,
    image: "/images/old-bungalow.jpg"
  },
  {
    id: 26,
    title: "Investing in Tehri: The Next Big Lake Destination",
    slug: "investing-in-tehri-lake-property",
    excerpt: "With water sports and tourism booming, is Tehri the new Rishikesh? Analyzing land potential around the lake.",
    content: `...`,
    category: "Location Guide",
    tags: ["Tehri", "Tourism", "Lake View"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-02-08",
    lastModified: "2026-02-08",
    views: 950,
    featured: false,
    image: "/images/tehri-lake.jpg"
  },
  {
    id: 27,
    title: "Vastu Shastra Tips for Hill Homes",
    slug: "vastu-tips-for-hill-homes-uttarakhand",
    excerpt: "Slope direction matters in Vastu. Simple tips for selecting a plot that aligns with traditional architectural principles.",
    content: `...`,
    category: "Lifestyle",
    tags: ["Vastu", "Architecture", "Traditional"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-02-10",
    lastModified: "2026-02-10",
    views: 1100,
    featured: false,
    image: "/images/vastu-compass.jpg"
  },
  {
    id: 28,
    title: "Rental Agreements in Uttarakhand: What Landlords Must Know",
    slug: "rental-agreements-uttarakhand-landlord-guide",
    excerpt: "Protect your property. Key clauses to include in your lease agreement for 11-month and long-term tenants.",
    content: `...`,
    category: "Legal & Advice",
    tags: ["Rental", "Legal Agreement", "Landlord"],
    author: "Legal Advisor",
    status: "Published",
    publishedDate: "2026-02-12",
    lastModified: "2026-02-12",
    views: 400,
    featured: false,
    image: "/images/contract-pen.jpg"
  },
  {
    id: 29,
    title: "Valentine's Special: Best Romantic Cottage Locations to Buy",
    slug: "romantic-cottage-locations-uttarakhand-buy",
    excerpt: "Looking for a getaway home? We list the most secluded and scenic spots perfect for a couple's retreat.",
    content: `...`,
    category: "Lifestyle",
    tags: ["Holiday Home", "Romantic", "Secluded"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-02-14",
    lastModified: "2026-02-14",
    views: 820,
    featured: true,
    image: "/images/sunset-view.jpg"
  },
  {
    id: 30,
    title: "Preparing for the Spring Real Estate Surge",
    slug: "spring-real-estate-market-surge-2026",
    excerpt: "Why March and April see the highest property visits. Getting your listing ready for the upcoming peak season.",
    content: `...`,
    category: "Market Trends",
    tags: ["Selling Tips", "Spring Market", "Seasonality"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-02-16",
    lastModified: "2026-02-16",
    views: 310,
    featured: false,
    image: "/images/spring-flowers.jpg"
  },
  {
    id: 4,
    title: "Why Buy Affordable Property in Uttarakhand — 7 Clear Reasons",
    slug: "why-buy-affordable-property-in-uttarakhand",
    excerpt: "Affordable property in Uttarakhand offers flexibility, strong tourism demand, improving infrastructure, and long-term appreciation potential.",
    content: `...`, // (Truncated for brevity in code block, keep your full content)
    category: "Market Trends",
    tags: ["Affordable Property", "Uttarakhand Investment", "Dehradun Plots"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2025-11-30",
    lastModified: "2025-11-30",
    views: 1205,
    featured: true,
    image: "/images/affordable-uttarakhand.png",
  },
  {
    id: 3,
    title: "Why You Should Invest in Property in Uttarakhand: The Ultimate Guide",
    slug: "why-invest-in-property-in-uttarakhand-ultimate-guide",
    excerpt: "Uttarakhand is emerging as a strong real estate destination due to natural beauty, improving connectivity, and long-term appreciation potential.",
    content: `...`,
    category: "Investment",
    tags: ["Uttarakhand Property", "Dehradun Real Estate", "Investment Guide"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2025-11-30",
    lastModified: "2025-11-30",
    views: 980,
    featured: false,
    image: "/images/uttarakhand-property.png",
  },
  {
    id: 2,
    title: "Smart Land Investment Near Rishikesh: A Buyer’s Guide",
    slug: "smart-land-investment-near-rishikesh-buyers-guide",
    excerpt: "How to choose the right plot near Rishikesh for lifestyle and profit. A complete guide on legal checks and rental income.",
    content: `...`,
    category: "Location Guide",
    tags: ["Rishikesh", "Land Investment", "Homestay"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-11-29",
    lastModified: "2025-11-29",
    views: 850,
    featured: false,
    image: "/images/rishikesh-land-investment.jpg"
  },
  {
    id: 1,
    title: "Property in Uttarakhand: Invest Wisely in Hill Plots",
    slug: "property-in-uttarakhand-invest-wisely-in-hill-plots",
    excerpt: "Why Uttarakhand is a smart property bet. Learn about seasonal realities, legal checks, and infrastructure readiness.",
    content: `...`,
    category: "Property Tips",
    tags: ["Hill Stations", "Due Diligence", "Legal Checks"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-11-03",
    lastModified: "2025-11-03",
    views: 1500,
    featured: true,
    image: "/images/friends-colony-phase1.jpg"
  },
  {
    id: 6,
    title: "How to Choose the Right Plot: A Practical Checklist",
    slug: "choose-right-plot-uttarakhand-checklist-2025",
    excerpt: "Buying a plot in Uttarakhand? Use this 5-point checklist covering legal title, zoning, and terrain suitability.",
    content: `...`,
    category: "Property Tips",
    tags: ["Checklist", "Buying Guide", "Safety"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-10-31",
    lastModified: "2025-10-31",
    views: 600,
    featured: false,
    image: "/images/design1.png",
  }
]

const categories = ["All", "Investment", "Market Trends", "Property Tips", "Location Guide"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter Logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    
    return matchesSearch && matchesCategory && post.status === "Published"
  })

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
             <BookOpen className="mr-2 h-3 w-3" /> Knowledge Hub
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Property Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Expert guides, market trends, and location analysis to help you make informed real estate decisions in Uttarakhand.
          </p>
        </div>
      </section>

      {/* --- CONTENT AREA --- */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 bg-card p-4 rounded-xl shadow-sm border border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 bg-background"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 h-10 bg-background">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
               <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> Featured Reads
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground shadow-sm">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline" className="text-xs font-normal">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                         <Calendar className="w-3 h-3 mr-1" /> {formatDate(post.publishedDate)}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                     <Button variant="link" className="px-0 text-primary group-hover:translate-x-1 transition-transform" asChild>
                        <Link href={`/blog/${post.slug}`}>Read Article <ArrowRight className="ml-1 h-4 w-4" /></Link>
                     </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-3">
            {featuredPosts.length > 0 ? "Latest Articles" : "All Articles"}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed border-border">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              <Button variant="link" onClick={() => {setSearchTerm(""); setSelectedCategory("All")}} className="mt-2 text-primary">
                 Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(featuredPosts.length > 0 ? regularPosts : filteredPosts).map((post) => (
                <Card key={post.id} className="group hover:border-primary/50 transition-colors border-border bg-card flex flex-col h-full">
                  <div className="aspect-[16/9] relative overflow-hidden rounded-t-xl bg-muted">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                      <span className="font-medium text-primary">{post.category}</span>
                      <span>•</span>
                      <span>{post.views} views</span>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                       {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map(tag => (
                         <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-5 font-normal bg-muted text-muted-foreground">
                            #{tag}
                         </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                             <User className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground">{post.author}</span>
                       </div>
                       <span className="text-xs text-muted-foreground">{formatDate(post.publishedDate)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

function Star(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
   )
}
