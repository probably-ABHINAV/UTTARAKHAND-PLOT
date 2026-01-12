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
            Property Investment <span className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Insights</span>
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
