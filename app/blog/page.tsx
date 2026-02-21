"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { Calendar, Search, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// --- TYPES ---
interface BlogPost {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  status: "Published" | "Draft";
  publishedDate: string;
  lastModified: string;
  views: number;
  featured: boolean;
  image: string;
}

// --- DATA: Updated with Free Unsplash Images ---
const blogPosts: BlogPost[] = [
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
    image: "https://images.unsplash.com/photo-1592352161823-74e2c262ebba?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1518182170546-0766aa646944?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1474487548417-781cb714d22d?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1533378393606-2c5e533d3175?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1541457523724-95f54f7740cc?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1490750967868-58cb75069ed6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "1",
    title: "Why Investing in Dehradun Residential Plots Is a Smart Move — 7 Solid Reasons",
    slug: "why-investing-in-dehradun-residential-plots-is-a-smart-move-2026",
    excerpt: "Dehradun is rapidly evolving from a retirement town to a real estate goldmine. Here are 7 data-backed reasons why investing in plots here is a smart financial move.",
    content: "",
    category: "Market Trends",
    tags: ["Dehradun Real Estate", "Investment", "Residential Plots"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-01",
    lastModified: "2026-01-01",
    views: 1205,
    featured: true,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Smart Land Investment Near Rishikesh: A Buyer’s Guide",
    slug: "smart-land-investment-near-rishikesh-buyers-guide-2026",
    excerpt: "Rishikesh is no longer just for pilgrims. It is a booming hub for wellness tourism and second homes. Here is your guide to investing safely.",
    content: "",
    category: "Location Guide",
    tags: ["Rishikesh", "Land Investment", "Homestay", "Tourism"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-03",
    lastModified: "2026-01-03",
    views: 980,
    featured: false,
    image: "https://images.unsplash.com/photo-1584282361689-d17e5a7d6571?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Why Buy Affordable Property in Uttarakhand — 7 Clear Reasons",
    slug: "why-buy-affordable-property-in-uttarakhand-2026",
    excerpt: "Affordable property in Uttarakhand offers flexibility, strong tourism demand, and improving infrastructure. Here is why you should enter the market now.",
    content: "",
    category: "Market Trends",
    tags: ["Affordable Property", "Uttarakhand Investment", "ROI"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-05",
    lastModified: "2026-01-05",
    views: 850,
    featured: false,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    title: "Land Near Highways: Buy Today, Profit Tomorrow!",
    slug: "land-near-highways-buy-today-profit-tomorrow-2026",
    excerpt: "Highway properties are the blue-chip stocks of real estate. Learn why ribbon development ensures the highest capital appreciation.",
    content: "",
    category: "Investment",
    tags: ["Highways", "Commercial Real Estate", "Land Value"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-07",
    lastModified: "2026-01-07",
    views: 1300,
    featured: true,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "Real Estate से पैसा कैसे कमाएं: पूरी रणनीति (Hindi Guide)",
    slug: "how-to-earn-money-from-real-estate-hindi-guide-2026",
    excerpt: "Real Estate is not just about buying and selling. Learn 5 proven strategies to generate active and passive income from property in India.",
    content: "",
    category: "Guide (Hindi)",
    tags: ["Hindi", "Real Estate Guide", "Income Strategies", "Rental"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2026-01-09",
    lastModified: "2026-01-09",
    views: 1500,
    featured: true,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    title: "How to Choose the Right Plot in Uttarakhand: A Practical Checklist",
    slug: "how-to-choose-right-plot-uttarakhand-checklist-2026",
    excerpt: "Buying land in the hills is tricky. Use this 6-point checklist covering slope, soil, legal title, and zoning to ensure your investment is safe.",
    content: "",
    category: "Property Tips",
    tags: ["Checklist", "Legal", "Due Diligence", "Uttarakhand"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-11",
    lastModified: "2026-01-11",
    views: 645,
    featured: false,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "7",
    title: "Why Buying a Plot Is Better Than Buying a Flat in 2026",
    slug: "why-buying-plot-is-better-than-flat-2026",
    excerpt: "The eternal debate of Plot vs. Flat. We analyze why, in the current market cycle, land ownership offers superior returns and freedom.",
    content: "",
    category: "Market Analysis",
    tags: ["Plot vs Flat", "Investment Strategy", "Real Estate Advice"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-13",
    lastModified: "2026-01-13",
    views: 800,
    featured: false,
    image: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "8",
    title: "सही प्रॉपर्टी पहचानने के 5 दमदार तरीके (Hindi Tips)",
    slug: "5-tips-to-identify-right-property-hindi-2026",
    excerpt: "Investing in property? Don't get fooled. Here are 5 solid ways to identify a high-potential property in Hindi.",
    content: "",
    category: "Market Analysis (Hindi)",
    tags: ["Hindi Tips", "Investment Guide", "Property Buying"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-15",
    lastModified: "2026-01-15",
    views: 645,
    featured: false,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "9",
    title: "Eco-Friendly Construction in the Hills: A Necessity, Not a Luxury",
    slug: "eco-friendly-construction-hills-uttarakhand-2026",
    excerpt: "Building in the Himalayas requires respect for nature. Learn about sustainable materials, water harvesting, and earthquake-resistant designs.",
    content: "",
    category: "Construction",
    tags: ["Eco-Friendly", "Sustainability", "Hill Architecture"],
    author: "Architect Team",
    status: "Published",
    publishedDate: "2026-01-17",
    lastModified: "2026-01-17",
    views: 450,
    featured: false,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "10",
    title: "Property in Uttarakhand: Invest Wisely in Hill Plots",
    slug: "property-in-uttarakhand-invest-wisely-in-hill-plots-2026",
    excerpt: "From seasonal realities to legal checks, here is the ultimate wisdom on buying hill plots in Uttarakhand.",
    content: "",
    category: "Investment",
    tags: ["Hill Stations", "Real Estate Advice", "Uttarakhand"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2026-01-19",
    lastModified: "2026-01-19",
    views: 1500,
    featured: true,
    image: "https://images.unsplash.com/photo-1519681393798-3828fb4090bb?auto=format&fit=crop&w=800&q=80"
  }
];

const categories = ["All", "Investment", "Market Trends", "Property Tips", "Location Guide", "Construction"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory || (selectedCategory === "Guide (Hindi)" && post.category === "Guide (Hindi)")

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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
