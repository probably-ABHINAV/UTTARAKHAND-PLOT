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
const categories = ["All", "Investment", "Market Trends", "Property Tips", "Location Guide", "Construction"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category.includes(selectedCategory) || (selectedCategory === "Guide (Hindi)" && post.category === "Guide (Hindi)")

    return matchesSearch && matchesCategory
  })

  // Sort by date (newest first)
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-grow container mx-auto px-4 py-12 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Real Estate Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice, market trends, and investment guides for the Uttarakhand property market.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "bg-orange-600 hover:bg-orange-700 text-white border-none"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <Card key={post.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300 border-gray-200 overflow-hidden group">
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900 font-medium backdrop-blur-sm shadow-sm">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3 pt-5 px-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(post.publishedDate)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      5 min read
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold leading-snug text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline decoration-orange-600 decoration-2 underline-offset-4">
                        {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow px-6">
                  <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-0 mt-auto">
                  <Button asChild variant="link" className="p-0 text-orange-600 font-semibold hover:text-orange-700 group/btn">
                    <Link href={`/blog/${post.slug}`} className="flex items-center">
                      Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-xl text-gray-500 font-medium">No articles found matching your criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
              className="mt-2 text-orange-600"
            >
              Clear filters
            </Button>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
