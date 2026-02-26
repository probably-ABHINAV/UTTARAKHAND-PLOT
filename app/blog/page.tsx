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
 [
  {
    id: "1",
    title: "Why Buy Affordable Property in Uttarakhand — 7 Clear Reasons",
    slug: "why-buy-affordable-property-in-uttarakhand-7-clear-reasons-2026",
    created_at: "2026-01-01",
    lastModified: "2026-01-01",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p><strong>Why Buy Affordable Property in Uttarakhand? — 7 Clear Reasons</strong></p>
      <p>Uttarakhand has become far more accessible than it was a decade ago, particularly areas around Dehradun. The presence of Jolly Grant Airport, improved highways, and upgraded road networks has made weekend travel and frequent visits practical rather than aspirational...</p>
      <p>Affordable property in Uttarakhand offers a powerful mix of low entry prices, tourism-driven demand, improving infrastructure, and lifestyle benefits.</p>
    `
  },
  {
    id: "2",
    title: "Why You Should Invest in Property in Uttarakhand — The Ultimate Guide",
    slug: "why-invest-in-property-in-uttarakhand-ultimate-guide-2026",
    created_at: "2026-01-03",
    lastModified: "2026-01-03",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p><strong>Why You Should Invest in Property in Uttarakhand: The Ultimate Guide</strong></p>
      <p>Whether you're looking for a vacation home, a retirement retreat, or an investment opportunity, properties in Uttarakhand offer a variety of benefits. This guide explores why purchasing property in Uttarakhand is a smart move.</p>
    `
  },
  {
    id: "3",
    title: "Smart Land Investment Near Rishikesh: A Buyer’s Guide",
    slug: "smart-land-investment-near-rishikesh-buyers-guide",
    created_at: "2026-01-05",
    lastModified: "2026-01-05",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Rishikesh has transformed from a spiritual retreat into one of North India’s most desirable real-estate micro-markets. Known for yoga tourism, adventure activities and wellness resorts, the town now attracts homebuyers, retirees and investors.</p>
    `
  },
  {
    id: "4",
    title: "Property in Uttarakhand: Invest Wisely in Hill Plots",
    slug: "property-in-uttarakhand-invest-wisely-in-hill-plots",
    created_at: "2026-01-08",
    lastModified: "2026-01-08",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Uttarakhand’s scenic valleys, cool climate and rising tourism make it one of India’s most attractive regions for property investment. From weekend getaways near Dehradun and Nainital to development pockets around Rishikesh and Haridwar...</p>
    `
  },
  {
    id: "5",
    title: "Land Near Highways: Buy Today, Profit Tomorrow!",
    slug: "land-near-highways-buy-today-profit-tomorrow",
    created_at: "2026-01-10",
    lastModified: "2026-01-10",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Land near highways is always well-connected to transport and infrastructure. Areas along national and state highways develop quickly because both the government and private companies prioritize such locations.</p>
    `
  },
  {
    id: "6",
    title: "Real Estate से पैसा कैसे कमाएं: पूरी रणनीति",
    slug: "real-estate-investment-strategy-hindi",
    created_at: "2026-01-12",
    lastModified: "2026-01-12",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>रियल एस्टेट केवल एक घर या संपत्ति खरीदने और बेचने का जरिया नहीं है, बल्कि यह एक ऐसा क्षेत्र है जो आपको दीर्घकालिक वित्तीय स्वतंत्रता दिला सकता है। सही समय, सही जगह और समझदारी से लिया गया निर्णय आपको अच्छा रिटर्न दे सकता है।</p>
    `
  },
  {
    id: "7",
    title: "सही प्रॉपर्टी पहचानने के 5 दमदार तरीके – एक समझदार निवेशक बनने की गाइड",
    slug: "5-ways-to-identify-right-property-hindi",
    created_at: "2026-01-15",
    lastModified: "2026-01-15",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>आज की तेज़ रफ्तार ज़िंदगी में हर कोई अपने सपनों का घर चाहता है। लेकिन प्रॉपर्टी खरीदना एक आम लेन-देन नहीं होता। इसलिए जरूरी है कि आप हर कदम सोच-समझकर उठाएं। यहाँ 5 दमदार तरीके दिए गए हैं।</p>
    `
  },
  {
    id: "8",
    title: "Why Buying a Plot Is Better Than Buying a Flat in 2026",
    slug: "plot-vs-flat-investment-2026",
    created_at: "2026-01-17",
    lastModified: "2026-01-17",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>The Growing Trend of Plot Investment in 2026 offers complete freedom to design and build your dream home. In hill stations, an independent plot ensures better privacy, customized architecture, and higher resale value over time.</p>
    `
  },
  {
    id: "9",
    title: "How to Choose the Right Plot in Uttarakhand: A Practical Checklist",
    slug: "choose-right-plot-uttarakhand-checklist-2026",
    created_at: "2026-01-19",
    lastModified: "2026-01-19",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p><strong>1. Legal Title & Encumbrances:</strong> Start by verifying the land title thoroughly. Request certified copies of ownership documents.<br><strong>2. Land-Use & Zoning:</strong> Ensure the plot's zoning allows for residential or commercial use as per your goal.</p>
    `
  },
  {
    id: "10",
    title: "Top 5 Retirement Destinations in Uttarakhand for 2026",
    slug: "top-5-retirement-destinations-uttarakhand-2026",
    created_at: "2026-01-22",
    lastModified: "2026-01-22",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Retiring in the hills is a dream for many. Locations like Dehradun, Ranikhet, and Mukteshwar offer the perfect blend of modern healthcare facilities and peaceful, unpolluted environments. Here are the top 5 areas to consider for your golden years.</p>
    `
  },
  {
    id: "11",
    title: "Commercial vs Residential: Where to Invest in Dehradun?",
    slug: "commercial-vs-residential-investment-dehradun",
    created_at: "2026-01-24",
    lastModified: "2026-01-24",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Dehradun's expanding IT hubs and tourism are driving both commercial and residential demand. While residential plots offer steady long-term appreciation, commercial spaces near the airport road offer high rental yields. Let's compare the ROI.</p>
    `
  },
  {
    id: "12",
    title: "Eco-Friendly Homes: Building Sustainably in the Hills",
    slug: "eco-friendly-homes-building-sustainably-hills",
    created_at: "2026-01-26",
    lastModified: "2026-01-26",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Building in Uttarakhand requires a deep respect for nature. From solar panel integration to rainwater harvesting and using local stone, eco-friendly homes not only protect the environment but also significantly lower maintenance costs.</p>
    `
  },
  {
    id: "13",
    title: "Tax Benefits of Buying Property in Uttarakhand",
    slug: "tax-benefits-buying-property-uttarakhand",
    created_at: "2026-01-29",
    lastModified: "2026-01-29",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Did you know investing in property can save you taxes? Under Section 80C and Section 24 of the Income Tax Act, you can claim deductions on your home loan principal and interest. Learn how to maximize these benefits.</p>
    `
  },
  {
    id: "14",
    title: "Haridwar Real Estate: The Next Big Hub?",
    slug: "haridwar-real-estate-next-big-hub",
    created_at: "2026-01-31",
    lastModified: "2026-01-31",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>With massive infrastructure projects and the expansion of the Delhi-Haridwar highway, Haridwar is no longer just a pilgrimage site. It is quickly becoming an industrial and residential hub. Here is why investors are flocking here.</p>
    `
  },
  {
    id: "15",
    title: "Essential Legal Documents for Buying Hill Property",
    slug: "essential-legal-documents-buying-hill-property",
    created_at: "2026-02-02",
    lastModified: "2026-02-02",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Buying land in Uttarakhand as an outsider comes with specific rules. You need to verify the 143 conversion (land-use change), encumbrance certificate, and Khatauni (revenue record) to ensure a safe, dispute-free transaction.</p>
    `
  },
  {
    id: "16",
    title: "How to Turn Your Rishikesh Plot into a Profitable Homestay",
    slug: "turn-rishikesh-plot-profitable-homestay",
    created_at: "2026-02-05",
    lastModified: "2026-02-05",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>The homestay culture is booming in Rishikesh. With the right architecture, local licenses, and marketing strategy, a small plot can be developed into a boutique homestay generating substantial monthly income from yoga and wellness tourists.</p>
    `
  },
  {
    id: "17",
    title: "Vastu Tips for Mountain Homes",
    slug: "vastu-tips-mountain-homes",
    created_at: "2026-02-07",
    lastModified: "2026-02-07",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Building on a slope? Vastu Shastra has specific guidelines for hill terrains. Ensuring your main entrance faces the right direction and understanding the slope's impact can bring positivity and stability to your mountain dream home.</p>
    `
  },
  {
    id: "18",
    title: "The Impact of New Expressways on Uttarakhand Real Estate",
    slug: "impact-expressways-uttarakhand-real-estate",
    created_at: "2026-02-09",
    lastModified: "2026-02-09",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>The Delhi-Dehradun Expressway is a game-changer. By drastically reducing travel time, property prices in Dehradun, Roorkee, and Saharanpur borders are seeing a massive spike. Learn which zones will benefit the most.</p>
    `
  },
  {
    id: "19",
    title: "Why NRIs Are Flocking to Uttarakhand for Second Homes",
    slug: "why-nris-flocking-uttarakhand-second-homes",
    created_at: "2026-02-12",
    lastModified: "2026-02-12",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1430285561322-7808604715df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Non-Resident Indians (NRIs) are increasingly investing in Uttarakhand. The state's safety, spiritual roots, and strong rental yields make it a perfect destination for NRIs looking to park their funds securely in Indian real estate.</p>
    `
  },
  {
    id: "20",
    title: "Agricultural Land vs Residential Plots: What to Know",
    slug: "agricultural-land-vs-residential-plots",
    created_at: "2026-02-14",
    lastModified: "2026-02-14",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Buying agricultural land is often cheaper, but converting it to residential use (Section 143) can be a lengthy process. This guide helps you weigh the pros and cons of buying ready-to-build residential plots versus raw agricultural land.</p>
    `
  },
  {
    id: "21",
    title: "Building a Boutique Resort in the Mountains: A Beginner's Guide",
    slug: "building-boutique-resort-mountains-guide",
    created_at: "2026-02-16",
    lastModified: "2026-02-16",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Dreaming of opening a resort? From finding commercial-approved land near Jim Corbett to managing local labor and getting tourism board approvals, here is everything you need to know to start your hospitality venture.</p>
    `
  },
  {
    id: "22",
    title: "Weekend Homes Near Delhi NCR: Why Uttarakhand Wins",
    slug: "weekend-homes-near-delhi-ncr-uttarakhand",
    created_at: "2026-02-19",
    lastModified: "2026-02-19",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>When Delhiites look for weekend getaways, Uttarakhand is the undisputed favorite. With improved connectivity, areas like Lansdowne and Mussoorie outskirts are perfect for quick escapes, making them prime real estate targets.</p>
    `
  },
  {
    id: "23",
    title: "Understanding Construction Costs in Hilly Terrains",
    slug: "understanding-construction-costs-hilly-terrains",
    created_at: "2026-02-21",
    lastModified: "2026-02-21",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1504307651254-35680f35aa9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Building a house on a mountain costs differently than building on flat land. Transporting materials, building strong retaining walls, and advanced foundation work add to the budget. Here is a breakdown of expected costs per square foot.</p>
    `
  },
  {
    id: "24",
    title: "Uttarakhand Real Estate Predictions for 2026 & Beyond",
    slug: "uttarakhand-real-estate-predictions-2026",
    created_at: "2026-02-23",
    lastModified: "2026-02-23",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1512453979434-d56ea208ebcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>What does the future hold for Uttarakhand's property market? Experts predict a 15-20% appreciation in prime areas around Dehradun and Rishikesh this year. Find out which emerging micro-markets you should watch closely.</p>
    `
  },
  {
    id: "25",
    title: "पहाड़ों में प्रॉपर्टी खरीदते समय इन 3 बातों का रखें खास ध्यान",
    slug: "3-things-to-remember-buying-hill-property-hindi",
    created_at: "2026-02-26",
    lastModified: "2026-02-26",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>पहाड़ों में जमीन खरीदना मैदानी इलाकों से बहुत अलग होता है। मिट्टी की जांच (Soil testing), ढलान (Slope gradient), और पानी की सुविधा—ये तीन ऐसे पहलू हैं जिन्हें नजरअंदाज करने पर आपको भारी नुकसान हो सकता है।</p>
      `
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
