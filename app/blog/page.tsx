"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { Calendar, Clock, Eye, User, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Blog posts data (same as admin section)
const blogPosts = [
 {
  id: 1,
  title: "Property in Uttarakhand: Invest Wisely in Hill Plots",
  slug: "property-in-uttarakhand-invest-wisely-in-hill-plots",
  excerpt: "Why Uttarakhand is a smart property bet",
  content: `
    <p>Uttarakhand’s scenic valleys, cool climate and rising tourism make it one of India’s most attractive regions for property investment. From weekend getaways near Dehradun and Nainital to development pockets around Rishikesh and Haridwar, buying land or a plot in this Himalayan state can offer both lifestyle value and strong long-term returns—if you do it right. This article walks you through the key reasons to invest in Uttarakhand, the local risks to watch for, and a practical checklist to buy safely.</p>

    <h2>1. Why Uttarakhand? Beauty, tourism and steady demand</h2>
    <p>Uttarakhand combines natural beauty with growing tourist footfall: hill stations such as Mussoorie, Nainital, Kausani, and emerging destinations near Haridwar and Rishikesh attract domestic and international visitors. Post-pandemic demand for second homes, wellness retreats, and short-stay rentals has strengthened. Moreover, improved road connectivity and interest in micro‑town developments draw builders and buyers, helping land values appreciate steadily in many corridors.</p>

    <h2>2. Location matters: micro-markets to prioritise</h2>
    <p>Not all Uttarakhand land is equal. Prioritise plots close to: (a) major access roads or state highways, (b) established town centres with utilities, (c) reliable public transport nodes, and (d) popular tourist circuits. Proximity to an all-weather road and a nearby market vastly increases resale and rental potential compared to remote mountain plots that face seasonal access issues.</p>

    <h2>3. Seasonal and environmental realities</h2>
    <p>Hill properties come with seasonal realities—monsoon risks, landslides, and snow in higher altitudes. Check slope gradient, drainage, soil stability and local history of landslides. For plots on steep slopes, prefer terraces or reinforced foundations and avoid cutting into natural contour lines which increases erosion risk.</p>

    <h2>4. Crucial legal & ecological checks</h2>
    <p>Uttarakhand has strict laws regarding forest land, river setbacks and environmental clearances. Always verify the land’s classification: agricultural, revenue, private, or forest. Get the 7/12 or equivalent revenue records, mutation history, and an up-to-date encumbrance certificate. Confirm there’s no pending litigation or revenue demand. For plots near protected areas or rivers, ensure compliance with environmental norms and watch for notifications that may restrict construction.</p>

    <h2>5. Infrastructure & utility readiness</h2>
    <p>Ensure basic services—electricity, potable water, approach road, and broadband—are either present or scheduled in municipal plans. Properties with assured utility connections attract better short-term rental guests and reduce development surprises. Confirm whether septic, rainwater harvesting, and wastewater management are feasible on site.</p>

    <h2>6. Short-term income and tourism rentals</h2>
    <p>Well-located plots near tourist nodes can be developed into homestays, guesthouses or serviced cottages. With proper design and local permits, short-term rentals can produce attractive yields while you wait for capital appreciation—especially in areas with steady weekend demand from nearby metros like Delhi and Dehradun.</p>

    <h2>7. Practical checklist before buying</h2>
    <ul>
      <li>Verify title chain, obtain encumbrance certificate; confirm no forest or revenue disputes.</li>
      <li>Survey slope, soil and drainage; consult a geotechnical engineer for steep plots.</li>
      <li>Confirm access roads remain public and aren’t private tracks that can be blocked.</li>
      <li>Check local zoning and FAR rules; verify building permissions and likely timelines for approvals.</li>
      <li>Understand seasonal access and maintenance costs (roads, retaining walls, water supply).</li>
      <li>Engage a local lawyer and a trusted surveyor—local expertise is invaluable.</li>
    </ul>

    <h2>Final thoughts</h2>
    <p>Property in Uttarakhand offers a rare mix of lifestyle and investment upside—but success depends on disciplined due diligence. Focus on accessible micro-markets, respect environmental and slope constraints, and prioritise clear titles and infrastructure-ready plots. With careful selection and professional help, buying in Uttarakhand can be both a smart financial move and a gateway to a peaceful mountain life.</p>
  `,
  category: "Investment",
  tags: ["Uttarakhand", "Hill Stations", "Real Estate", "Investment"],
  author: "Admin User",
  status: "Published",
  publishedDate: "2025-11-03",
  lastModified: "2025-11-03",
  views: 0,
  featured: true,
  metaTitle: "Smart Guide to Buying Property in Uttarakhand 2025",
  metaDescription: "Comprehensive checklist and practical advice for buying land and plots in Uttarakhand — legal checks, environmental risks, location tips and rental potential.",
  image: "/images/friends-colony-phase1.jpg"
},
  {
    id: 1,
    title: "Land Near Highways: Buy Today, Profit Tomorrow!",
    slug: "Land-Near-Highways-Buy-Today-Profit-Tomorrow!",
    excerpt:
      "Real estate investment in India is no longer just about buying a home-it has become a long-term source of financial security. Especially when it comes to land located near highways, investors see it as a golden opportunity. The reasons are clear: better connectivity, rapid development, and strong price appreciation in the future. In this article, we’ll explore in detail why investing in land near highways is a smart and safe decision.",
    content:
      "Land near highways is always well-connected to transport and infrastructure. Areas along national and state highways develop quickly because both the government and private companies prioritize such locations. Shopping complexes, hospitals, schools, and industrial parks emerge faster, pushing up property values. Additionally, basic amenities like road lighting, drainage, water supply, and electricity infrastructure are developed swiftly in these regions, making them even more attractive. This is why highway-adjacent land has become a safe and profitable option for investors....",
    category: "Investment",
    tags: ["Investment", "Hill Stations", "Real Estate", "Tourism"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-10-24",
    lastModified: "2025-10-24",
    views: 1250,
    featured: true,
    metaTitle: "Best Investment Opportunities in Uttrakhand Hill Stations 2024",
    metaDescription:
      "Explore top investment opportunities in Uttrakhand's hill stations. Complete guide to real estate investment in Mussoorie, Nainital, and more.",
    image: "/images/E_1760471281368.jpg",
  },
  {
    id: 2,
    title: "Real Estate से पैसा कैसे कमाएं: पूरी रणनीति",
    slug: "spiritual-tourism-boom-rishikesh-properties",
    excerpt:
      "रियल एस्टेट केवल एक घर या संपत्ति खरीदने और बेचने का जरिया नहीं है, बल्कि यह एक ऐसा क्षेत्र है जो आपको दीर्घकालिक वित्तीय स्वतंत्रता दिला सकता है। सही समय, सही जगह और समझदारी से लिया गया निर्णय आपको अच्छा रिटर्न और स्थिर आय दे सकता है। आइए विस्तार से जानते हैं कि कैसे आप रियल एस्टेट के विभिन्न तरीकों से पैसा कमा सकते हैं।",
    content: "Rishikesh, known as the Yoga Capital of the World, has seen a massive surge in spiritual tourism...",
    category: "Market Trends",
    tags: ["High-profit", "Market trend", "Property Demand", "investment"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2025-10-24",
    lastModified: "2025-10-24",
    views: 890,
    featured: false,
    metaTitle: "Rishikesh Property Investment: Spiritual Tourism Boom 2024",
    metaDescription:
      "Why Rishikesh properties are in high demand due to the spiritual tourism boom. Investment insights and market analysis.",
    image: "/images/design1.png",
  },
  {
    id: 3,
    title: "सही प्रॉपर्टी पहचानने के 5 दमदार तरीके – एक समझदार निवेशक बनने की गाइड",
    slug: "hill-station-property-market-trends-2024",
    excerpt: "आज की तेज़ रफ्तार ज़िंदगी में हर कोई अपने सपनों का घर चाहता है या फिर किसी ऐसी प्रॉपर्टी में निवेश करना चाहता है, जो भविष्य में बड़ा रिटर्न दे सके। लेकिन प्रॉपर्टी खरीदना एक आम लेन-देन नहीं होता। यह आपके जीवन की सबसे बड़ी खरीद में से एक होती है। इसलिए जरूरी है कि आप हर कदम सोच-समझकर उठाएं।",
    content: "लोकेशन – प्रॉपर्टी की जान होती है",
    category: "Market Analysis",
    tags: ["Market Trends", "2025 Predictions", "Hill Stations", "Property Market"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-10-24",
    lastModified: "2025-10-24",
    views: 945,
    featured: false,
    metaTitle: "Hill Station Property Market Trends & Predictions 2024",
    metaDescription:
      "Complete analysis of hill station property market trends in Uttrakhand. Expert predictions and investment insights for 2024.",
    image: "/images/friends-colony-phase1.jpg",
  },
  {
    id: 4,
    title: "Why Buying a Plot Is Better Than Buying a Flat in 2025",
    slug: "hill-station-property-market-trends-2025",
    excerpt: "The Growing Trend of Plot Investment in 2025",
    content: "Complete Freedom to Design and Build Your Dream Home",
    category: "Market Analysis",
    tags: ["Market Trends", "2025 Predictions", "Hill Stations", "Property Market"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-10-27",
    lastModified: "2025-10-27",
    views: 1202,
    featured: false,
    metaTitle: "Hill Station Property Market Trends & Predictions 2024",
    metaDescription:
      "Complete analysis of hill station property market trends in Uttrakhand. Expert predictions and investment insights for 2024.",
    image: "/images/WhatsApp Image 2025-10-13 at 23.57.03_a5777e2d.jpg",
  },
  {
    id: 5,
    title: "How to Choose the Right Plot in Uttarakhand: A Practical Checklist",
    slug: "hill-station-property-market-trends-2027",
    excerpt: "Legal Title & Encumbrances",
    content: "Land-Use & Zoning",
    category: "Market Analysis",
    tags: ["Market Trends", "2025 Predictions", "Hill Stations", "Property Market"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2025-10-29",
    lastModified: "2025-10-29",
    views: 780,
    featured: false,
    metaTitle: "Hill Station Property Market Trends & Predictions 2024",
    metaDescription:
      "Complete analysis of hill station property market trends in Uttrakhand. Expert predictions and investment insights for 2024.",
    image: "/images/C_1760471281370.jpg",
  },
  {
  id: 6,
  title: "How to Choose the Right Plot in Uttarakhand: A Practical Checklist",
  slug: "choose-right-plot-uttarakhand-checklist-2025",
  excerpt: "Legal Title & Encumbrances",
  content: `
    <p><strong>How to Choose the Right Plot in Uttarakhand: A Practical Checklist</strong></p>
    <p>Buying a plot in Uttarakhand can be one of the most fulfilling investments you make — combining natural beauty with strong appreciation potential. But success depends on careful planning and awareness of local factors that impact property value and legality. This practical checklist will help you evaluate plots effectively and avoid costly mistakes.</p>
    <p><strong>1. Legal Title & Encumbrances:</strong> Start by verifying the land title thoroughly. Request certified copies of ownership documents, mutation records, and the latest tax receipts. Ensure there are no encumbrances, disputes, or pending litigations attached to the property. A clear title is essential for loan eligibility and resale in the future.</p>
    <p><strong>2. Land-Use & Zoning:</strong> Uttarakhand has distinct land-use regulations depending on the district and proximity to forest or eco-sensitive areas. Confirm the plot’s zoning with the local development authority or Tehsil office. Agricultural, residential, and commercial lands have different permissions, and misclassification can lead to legal complications later.</p>
    <p><strong>3. Connectivity & Infrastructure:</strong> Always assess the approach road, water supply, power connection, and drainage facilities. Proximity to highways, schools, and hospitals enhances usability and resale value. Areas around Dehradun, Nainital, and Ranikhet are particularly promising due to ongoing infrastructure improvements and tourism-driven growth.</p>
    <p><strong>4. Terrain & Soil Suitability:</strong> In hill regions, plot gradient, soil stability, and drainage are crucial. Hire a local civil engineer or surveyor to check for erosion risk and slope strength. Proper site evaluation ensures safe construction and prevents foundation issues or landslide risks later.</p>
    <p><strong>5. Work with Verified Platforms:</strong> To simplify your search, use trusted property platforms like <strong>Property in Uttarakhand</strong>. They list verified plots, provide clarity on legal documents, and connect you with experts who understand local terrain and regulations. This saves time and minimizes risk while helping you find a plot that truly fits your goals.</p>
  `,
  category: "Market Analysis",
  tags: ["Market Trends", "2025 Predictions", "Hill Stations", "Property Market"],
  author: "Admin User",
  status: "Published",
  publishedDate: "2025-10-31",
  lastModified: "2025-10 -31",
  views: 598,
  featured: false,
  metaTitle: "How to Choose the Right Plot in Uttarakhand – Complete Buyer’s Checklist 2025",
  metaDescription:
    "A detailed buyer’s checklist for selecting the right plot in Uttarakhand. Learn about legal verification, zoning, terrain evaluation, and infrastructure factors before investing.",
  image: "/images/design1.png",
}

]

const categories = ["All", "Investment", "Market Trends", "Market Analysis", "Property Tips", "Location Guide"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter posts
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
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-black text-foreground mb-6">
              Property Investment
              <span className="block text-primary">Insights & Guides</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert insights on Uttrakhand property investment, market trends, and location guides 
              to help you make informed decisions.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
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

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="w-3 h-3 mr-1" />
                        {post.views.toLocaleString()}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(post.publishedDate)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          <h2 className="text-3xl font-serif font-bold mb-8">
            {featuredPosts.length > 0 ? "All Articles" : "Latest Articles"}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <CardContent>
                <div className="text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p>Try adjusting your search terms or category filter.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(featuredPosts.length > 0 ? regularPosts : filteredPosts).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="w-3 h-3 mr-1" />
                        {post.views.toLocaleString()}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(post.publishedDate)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                      </Link>
                    </Button>
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
