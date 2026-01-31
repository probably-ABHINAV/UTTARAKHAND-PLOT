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
  // --- EXISTING POSTS ---
  {
    id: 5,
    title: "Why Investing in Dehradun Residential Plots Is a Smart Move — 7 Solid Reasons",
    slug: "why-investing-in-dehradun-residential-plots-is-a-smart-move-2025",
    excerpt: "Affordable property in Uttarakhand offers flexibility, strong tourism demand, improving infrastructure, and long-term appreciation potential.",
    content: `...`, 
    category: "Market Trends",
    tags: ["Affordable Property", "Uttarakhand Investment", "Dehradun Plots"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-17",
    lastModified: "2026-01-17",
    views: 1205,
    featured: true,
    image: "/images/WhatsApp Image 2025-10-13 at 23.57.02_0cf5591a.jpg",
  },
  {
    id: 4,
    title: "Why Buy Affordable Property in Uttarakhand — 7 Clear Reasons",
    slug: "why-buy-affordable-property-in-uttarakhand",
    excerpt: "Affordable property in Uttarakhand offers flexibility, strong tourism demand, improving infrastructure, and long-term appreciation potential.",
    content: `...`,
    category: "Market Trends",
    tags: ["Affordable Property", "Uttarakhand Investment", "Dehradun Plots"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2025-11-30",
    lastModified: "2025-11-30",
    views: 1205,
    featured: true,
    image: "/images/E_1760471281368.jpg",
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
    image: "/images/dehradun-outskirts-plots.jpg",
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
    image: "/images/WhatsApp Image 2025-10-13 at 23.57.03_af26fc11.jpg"
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
  },
  // --- NEW ADDED POSTS (JAN 15-31 2026) ---
  {
    id: "blog-jan-31",
    title: "January 2026 Market Wrap: Prices Rising, Demand Steady",
    slug: "january-2026-market-wrap-report",
    excerpt: "Land rates in Badripur and Shimla Bypass saw a marginal increase of 2% this month. See the full report.",
    content: `...`,
    category: "Market Trends",
    tags: ["Market Analysis", "Monthly Report", "Price Trends"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-31",
    lastModified: "2026-01-31",
    views: 120,
    featured: false,
    image: "/images/jan-market-wrap.jpg"
  },
  {
    id: "blog-jan-30",
    title: "Common Mistakes First-Time Land Buyers Make",
    slug: "common-mistakes-first-time-land-buyers",
    excerpt: "Buying your first plot is emotional, but don't let emotions override logic. Avoid these 4 common blunders.",
    content: `...`,
    category: "Property Tips",
    tags: ["Buyer Mistakes", "Real Estate Tips", "Caution"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-30",
    lastModified: "2026-01-30",
    views: 145,
    featured: false,
    image: "/images/mistakes-to-avoid.jpg"
  },
  {
    id: "blog-jan-29",
    title: "Student Housing: A Hidden Real Estate Goldmine in Dehradun",
    slug: "student-housing-investment-dehradun",
    excerpt: "Dehradun is the 'School Capital of India'. Learn how student housing yields 7-9% rental returns compared to standard residential.",
    content: `...`,
    category: "Investment",
    tags: ["Student Housing", "Rental Yield", "Education Hub"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-29",
    lastModified: "2026-01-29",
    views: 210,
    featured: false,
    image: "/images/student-housing.jpg"
  },
  {
    id: "blog-jan-28",
    title: "Resale Value: How to Ensure Your Plot Sells for a Profit",
    slug: "resale-value-tips-plot-investment",
    excerpt: "Buying is easy, selling for a profit requires strategy. Learn about corner plots, road width, and Vastu impacts.",
    content: `...`,
    category: "Investment",
    tags: ["Resale Value", "Vastu", "Investment Strategy"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-28",
    lastModified: "2026-01-28",
    views: 180,
    featured: false,
    image: "/images/resale-profit.jpg"
  },
  {
    id: "blog-jan-27",
    title: "Dehradun Weather & Lifestyle: Why It Matters for Property Buyers",
    slug: "dehradun-weather-lifestyle-property-impact",
    excerpt: "You are paying for the AQI as much as the square footage. Discover why Dehradun's clean air is a primary asset.",
    content: `...`,
    category: "Location Guide",
    tags: ["Health", "Environment", "Green Living"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-27",
    lastModified: "2026-01-27",
    views: 300,
    featured: false,
    image: "/images/dehradun-nature.jpg"
  },
  {
    id: "blog-jan-26",
    title: "Republic Day Special: The Freedom of Owning Your Own Land",
    slug: "republic-day-freedom-owning-land",
    excerpt: "True freedom comes from security. Unlike volatile stocks, a freehold residential plot anchors your portfolio.",
    content: `...`,
    category: "Market Trends",
    tags: ["Republic Day", "Financial Freedom", "Real Estate Motivation"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-26",
    lastModified: "2026-01-26",
    views: 450,
    featured: false,
    image: "/images/republic-day-prop.jpg"
  },
  {
    id: "blog-jan-25",
    title: "NRI Guide: Buying Property in Uttarakhand from Abroad",
    slug: "nri-guide-buying-property-uttarakhand",
    excerpt: "Managing property from abroad can be tricky. Here are key tips on PoA, FEMA regulations, and digital verification.",
    content: `...`,
    category: "Property Tips",
    tags: ["NRI Investment", "FEMA Rules", "Remote Buying"],
    author: "Legal Advisor",
    status: "Published",
    publishedDate: "2026-01-25",
    lastModified: "2026-01-25",
    views: 520,
    featured: true,
    image: "/images/nri-investment.jpg"
  },
  {
    id: "blog-jan-24",
    title: "Budget Investment: Plots Under 20 Lakhs in Dehradun",
    slug: "budget-investment-plots-under-20-lakhs",
    excerpt: "Is it still possible to buy cheap land in Dehradun? Yes, if you look at Bhauwala, Raiwala, and Shimla Bypass interiors.",
    content: `...`,
    category: "Investment",
    tags: ["Affordable Housing", "Cheap Plots", "Investment"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-24",
    lastModified: "2026-01-24",
    views: 890,
    featured: true,
    image: "/images/budget-plots.jpg"
  },
  {
    id: "blog-jan-23",
    title: "Smart Cities Mission: How Dehradun Infrastructure is Changing",
    slug: "smart-cities-mission-dehradun-infrastructure",
    excerpt: "The Smart City project is reshaping the capital. Areas receiving smart infrastructure upgrades are seeing a 15-20% annual appreciation.",
    content: `...`,
    category: "Market Trends",
    tags: ["Smart City", "Dehradun Development", "Urban Planning"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-23",
    lastModified: "2026-01-23",
    views: 340,
    featured: false,
    image: "/images/smart-city-dehradun.jpg"
  },
  {
    id: "blog-jan-22",
    title: "Gated Societies vs. Independent Land: What to Choose?",
    slug: "gated-societies-vs-independent-land",
    excerpt: "Security vs. Freedom. A detailed comparison table for families and absentees (NRIs) looking to invest.",
    content: `...`,
    category: "Property Tips",
    tags: ["Gated Community", "Land Safety", "Buying Tips"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-22",
    lastModified: "2026-01-22",
    views: 410,
    featured: false,
    image: "/images/gated-community.jpg"
  },
  {
    id: "blog-jan-21",
    title: "Earn Passive Income: The 'Homestay' Model in Uttarakhand",
    slug: "earn-passive-income-homestay-model",
    excerpt: "Don't just hold a vacant plot. Learn how a 2-room cottage can earn ₹30k-₹50k per month in rental income.",
    content: `...`,
    category: "Investment",
    tags: ["Passive Income", "Airbnb", "Homestay Business"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-21",
    lastModified: "2026-01-21",
    views: 600,
    featured: true,
    image: "/images/homestay-design.jpg"
  },
  {
    id: "blog-jan-20",
    title: "Dehradun Real Estate: Commercial vs. Residential Plots",
    slug: "commercial-vs-residential-plots-dehradun",
    excerpt: "Should you buy a shop plot or a house plot? We break down the pros, cons, and ROI for budgets under 50 Lakhs.",
    content: `...`,
    category: "Investment",
    tags: ["Commercial Property", "Residential Plots", "ROI"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-20",
    lastModified: "2026-01-20",
    views: 280,
    featured: false,
    image: "/images/commercial-vs-residential.jpg"
  },
  {
    id: "blog-jan-19",
    title: "Investment Checklist: 6 Documents You Must Check Before Buying Land",
    slug: "investment-checklist-documents-land-uttarakhand",
    excerpt: "Don't get scammed. Before you sign any check, ensure Khatauni, Registry, and Land Use Certificates are in order.",
    content: `...`,
    category: "Property Tips",
    tags: ["Legal Checks", "Land Registry", "Safe Investment"],
    author: "Legal Advisor",
    status: "Published",
    publishedDate: "2026-01-19",
    lastModified: "2026-01-19",
    views: 750,
    featured: false,
    image: "/images/legal-docs.jpg"
  },
  {
    id: "blog-jan-18",
    title: "Retiring in the Hills: Why Dehradun is India’s Florida",
    slug: "retiring-in-hills-dehradun-guide",
    excerpt: "Retirement is about active living. Discover why Dehradun's healthcare and community make it the top choice for seniors.",
    content: `...`,
    category: "Location Guide",
    tags: ["Retirement", "Senior Living", "Dehradun Life"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-18",
    lastModified: "2026-01-18",
    views: 390,
    featured: false,
    image: "/images/retirement-dehradun.jpg"
  },
  {
    id: "blog-jan-17",
    title: "The Golden Circle: Top 5 Emerging Locations in Dehradun",
    slug: "top-5-emerging-locations-dehradun-2026",
    excerpt: "Not all areas offer the same ROI. We analyze Shimla Bypass, Badripur, and Sahastradhara Road extensions.",
    content: `...`,
    category: "Location Guide",
    tags: ["Dehradun Locations", "Property Hotspots", "Shimla Bypass"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-17",
    lastModified: "2026-01-17",
    views: 920,
    featured: true,
    image: "/images/dehradun-map-locations.jpg"
  },
  {
    id: "blog-jan-16",
    title: "Plot vs. Flat: Dehradun Me Aapke Liye Kya Sahi Hai?",
    slug: "plot-vs-flat-dehradun-comparison-hinglish",
    excerpt: "Dehradun me property kharidte waqt sabse bada sawal: Plot lein ya Flat? Hinglish guide for smart investors.",
    content: `...`,
    category: "Property Tips",
    tags: ["Plot vs Flat", "Hinglish Guide", "Investment Tips"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-16",
    lastModified: "2026-01-16",
    views: 670,
    featured: false,
    image: "/images/plot-vs-flat.jpg"
  },
  {
    id: "blog-jan-15",
    title: "Why 2026 is the Best Year to Invest in Dehradun Real Estate",
    slug: "why-2026-is-best-year-invest-dehradun",
    excerpt: "The Delhi-Dehradun Expressway is operational. Find out why 2026 is the critical year to make your move before prices peak.",
    content: `...`,
    category: "Market Trends",
    tags: ["Investment 2026", "Dehradun Real Estate", "Future Trends"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-15",
    lastModified: "2026-01-15",
    views: 1100,
    featured: true,
    image: "/images/dehradun-2026-outlook.jpg"
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
            Property Investment <span className="text-primary">Insights</span>
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
