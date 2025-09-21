import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { Calendar, Clock, Eye, User, ArrowLeft, Share2, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Blog posts data (same as admin section)
const blogPosts = [
  {
    id: 1,
    title: "Top 5 Investment Opportunities in Uttrakhand Hill Stations",
    slug: "top-5-investment-opportunities-uttrakhand",
    excerpt:
      "Discover the most promising investment opportunities in Uttrakhand's scenic hill stations, from Mussoorie to Nainital.",
    content: `
      <p>Uttrakhand's hill stations offer incredible investment potential with their growing tourism industry and spiritual significance. Here are the top 5 investment opportunities that savvy investors should consider in 2024.</p>
      
      <h2>1. Mussoorie - The Queen of Hills</h2>
      <p>Mussoorie remains one of the most sought-after destinations for property investment. With its colonial charm, pleasant climate, and proximity to Delhi, Mussoorie offers excellent rental yields and capital appreciation potential.</p>
      <ul>
        <li>Average ROI: 12-15% annually</li>
        <li>Best for: Resort developments and vacation homes</li>
        <li>Key areas: Mall Road, Kempty Falls vicinity</li>
      </ul>

      <h2>2. Nainital - The Lake District</h2>
      <p>Known for its beautiful lakes and scenic beauty, Nainital attracts tourists year-round. The demand for homestays and boutique hotels continues to grow.</p>
      <ul>
        <li>Average ROI: 10-13% annually</li>
        <li>Best for: Hospitality and residential projects</li>
        <li>Key areas: Mallital, Bhimtal</li>
      </ul>

      <h2>3. Rishikesh - Spiritual Tourism Hub</h2>
      <p>The yoga capital of the world continues to see massive growth in spiritual tourism, making it an excellent investment destination.</p>
      <ul>
        <li>Average ROI: 14-18% annually</li>
        <li>Best for: Ashrams, yoga retreats, wellness centers</li>
        <li>Key areas: Laxman Jhula, Ram Jhula areas</li>
      </ul>

      <h2>4. Dehradun - The Educational Hub</h2>
      <p>With its educational institutions and growing IT sector, Dehradun offers stable rental income and steady appreciation.</p>
      <ul>
        <li>Average ROI: 8-11% annually</li>
        <li>Best for: Residential and commercial properties</li>
        <li>Key areas: Rajpur Road, Sahastradhara Road</li>
      </ul>

      <h2>5. Haridwar - Gateway to the Gods</h2>
      <p>As one of the holiest cities in India, Haridwar sees continuous pilgrim traffic, making it ideal for hospitality investments.</p>
      <ul>
        <li>Average ROI: 11-14% annually</li>
        <li>Best for: Hotels, dharamshalas, commercial properties</li>
        <li>Key areas: Har Ki Pauri, Upper Road</li>
      </ul>

      <h2>Investment Tips</h2>
      <p>When investing in Uttrakhand hill stations, consider factors like accessibility, local regulations, environmental clearances, and seasonal variations in tourism. Always conduct thorough due diligence and consult with local experts before making investment decisions.</p>
    `,
    category: "Investment",
    tags: ["Investment", "Hill Stations", "Real Estate", "Tourism"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2024-01-20",
    lastModified: "2024-01-22",
    views: 1250,
    featured: true,
    metaTitle: "Best Investment Opportunities in Uttrakhand Hill Stations 2024",
    metaDescription:
      "Explore top investment opportunities in Uttrakhand's hill stations. Complete guide to real estate investment in Mussoorie, Nainital, and more.",
    image: "/images/mussoorie-hills-plots-available.jpg",
  },
  {
    id: 2,
    title: "Spiritual Tourism Boom: Why Rishikesh Properties Are in High Demand",
    slug: "spiritual-tourism-boom-rishikesh-properties",
    excerpt:
      "The spiritual tourism industry in Rishikesh is experiencing unprecedented growth, making it a hotspot for property investment.",
    content: `
      <p>Rishikesh, known as the Yoga Capital of the World, has seen a massive surge in spiritual tourism over the past decade. This growth has created unprecedented opportunities in the real estate sector.</p>
      
      <h2>The Numbers Don't Lie</h2>
      <p>Recent tourism data shows that Rishikesh receives over 2 million visitors annually, with a 15% year-over-year growth in international tourists. This steady influx has created a robust demand for accommodation and services.</p>

      <h2>What's Driving the Demand?</h2>
      <ul>
        <li><strong>Global Wellness Trend:</strong> The worldwide focus on wellness and mental health has made yoga and meditation retreats extremely popular.</li>
        <li><strong>Adventure Tourism:</strong> River rafting, bungee jumping, and trekking attract adventure enthusiasts.</li>
        <li><strong>Spiritual Seekers:</strong> Rishikesh's spiritual significance draws pilgrims and seekers from around the globe.</li>
        <li><strong>Digital Nomads:</strong> The peaceful environment attracts remote workers seeking work-life balance.</li>
      </ul>

      <h2>Property Types in High Demand</h2>
      <h3>Ashrams and Retreat Centers</h3>
      <p>Traditional ashrams and modern retreat centers are seeing the highest occupancy rates, often booked months in advance.</p>

      <h3>Riverside Properties</h3>
      <p>Properties with Ganga views command premium rates, with some boutique resorts charging ₹8,000-15,000 per night.</p>

      <h3>Budget Accommodations</h3>
      <p>Hostels and budget hotels cater to the backpacker crowd, offering steady income with high turnover.</p>

      <h2>Investment Hotspots</h2>
      <ul>
        <li><strong>Laxman Jhula Area:</strong> Heart of tourist activity</li>
        <li><strong>Ram Jhula:</strong> Growing rapidly with new developments</li>
        <li><strong>Tapovan:</strong> Quieter area perfect for long-term retreats</li>
        <li><strong>Neelkanth Road:</strong> Scenic locations with development potential</li>
      </ul>

      <h2>Future Outlook</h2>
      <p>With the government's focus on promoting wellness tourism and improved infrastructure development, Rishikesh is poised for continued growth. The upcoming Char Dham railway project will further boost accessibility.</p>

      <p>However, investors should be aware of environmental regulations and seasonal variations. The monsoon season (July-September) sees reduced tourist activity, which should be factored into financial projections.</p>
    `,
    category: "Market Trends",
    tags: ["Rishikesh", "Spiritual Tourism", "Property Demand", "Yoga"],
    author: "Property Manager",
    status: "Published",
    publishedDate: "2024-01-18",
    lastModified: "2024-01-19",
    views: 890,
    featured: false,
    metaTitle: "Rishikesh Property Investment: Spiritual Tourism Boom 2024",
    metaDescription:
      "Why Rishikesh properties are in high demand due to the spiritual tourism boom. Investment insights and market analysis.",
    image: "/images/rishikesh-valley-plots-land.jpg",
  },
  {
    id: 3,
    title: "Hill Station Property Market Trends: What to Expect in 2024",
    slug: "hill-station-property-market-trends-2024",
    excerpt: "An in-depth analysis of the hill station property market trends and predictions for 2024.",
    content: `
      <p>The hill station property market in Uttrakhand is showing strong growth indicators as we move through 2024. Here's a comprehensive analysis of current trends and what investors can expect.</p>

      <h2>Market Performance Overview</h2>
      <p>The hill station real estate market has demonstrated remarkable resilience and growth, with an average price appreciation of 8-12% across major destinations in 2023.</p>

      <h2>Key Trends Shaping 2024</h2>

      <h3>1. Post-Pandemic Shift to Hill Stations</h3>
      <p>The COVID-19 pandemic has permanently altered lifestyle preferences, with more people seeking properties in serene, less crowded locations. This trend continues to drive demand in Uttrakhand's hill stations.</p>

      <h3>2. Work-From-Hills Culture</h3>
      <p>Improved internet connectivity and flexible work arrangements have made hill station living feasible for professionals, creating a new segment of year-round residents.</p>

      <h3>3. Sustainable Development Focus</h3>
      <p>Both government policies and buyer preferences are shifting toward eco-friendly and sustainable developments. Properties with green certifications are commanding premium prices.</p>

      <h2>Price Trends by Location</h2>
      <ul>
        <li><strong>Mussoorie:</strong> ₹8,000-12,000 per sq ft (8% YoY growth)</li>
        <li><strong>Nainital:</strong> ₹6,500-10,000 per sq ft (10% YoY growth)</li>
        <li><strong>Rishikesh:</strong> ₹5,000-8,500 per sq ft (12% YoY growth)</li>
        <li><strong>Dehradun:</strong> ₹4,500-7,000 per sq ft (7% YoY growth)</li>
        <li><strong>Haridwar:</strong> ₹3,500-6,000 per sq ft (9% YoY growth)</li>
      </ul>

      <h2>Emerging Opportunities</h2>

      <h3>Second Home Market</h3>
      <p>The second home market is booming, with buyers from Delhi, Mumbai, and other metros investing in weekend retreats and retirement homes.</p>

      <h3>Wellness Real Estate</h3>
      <p>Properties designed for wellness tourism, including spa resorts and yoga retreats, are seeing unprecedented demand and returns.</p>

      <h3>Adventure Tourism Infrastructure</h3>
      <p>Properties catering to adventure sports enthusiasts, such as camping sites and trekking base camps, are emerging as lucrative investments.</p>

      <h2>Challenges and Considerations</h2>

      <h3>Regulatory Environment</h3>
      <p>Stricter environmental norms and building regulations in ecologically sensitive areas are impacting development timelines and costs.</p>

      <h3>Infrastructure Development</h3>
      <p>While improving, infrastructure development remains uneven across different hill stations, affecting property values and rental yields.</p>

      <h3>Seasonal Variations</h3>
      <p>Most hill stations experience significant seasonal variations in demand, particularly during monsoons and extreme winter months.</p>

      <h2>2024 Predictions</h2>
      <ul>
        <li>Continued price appreciation of 8-10% across major hill stations</li>
        <li>Increased focus on sustainable and eco-friendly developments</li>
        <li>Growing demand for tech-enabled properties with co-working spaces</li>
        <li>Consolidation in the hospitality sector with larger players entering the market</li>
        <li>Government initiatives to improve connectivity and infrastructure</li>
      </ul>

      <h2>Investment Strategy Recommendations</h2>
      <p>For 2024, investors should focus on properties with strong fundamentals: good connectivity, established tourist circuits, and clear land titles. Diversifying across multiple hill stations can help mitigate location-specific risks while maximizing returns.</p>

      <p>The hill station property market in Uttrakhand presents compelling opportunities for both immediate returns and long-term appreciation, making it an attractive option for discerning investors.</p>
    `,
    category: "Market Analysis",
    tags: ["Market Trends", "2024 Predictions", "Hill Stations", "Property Market"],
    author: "Admin User",
    status: "Published",
    publishedDate: "2024-01-25",
    lastModified: "2024-01-25",
    views: 645,
    featured: false,
    metaTitle: "Hill Station Property Market Trends & Predictions 2024",
    metaDescription:
      "Complete analysis of hill station property market trends in Uttrakhand. Expert predictions and investment insights for 2024.",
    image: "/images/nainital-lake-plots-area.jpg",
  },
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug && p.status === "Published")

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.status === "Published" && p.category === post.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-4 left-4">
          <Button asChild variant="secondary" size="sm">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <article className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-3 h-3 mr-1" />
                {post.views.toLocaleString()} views
              </div>
              {post.featured && (
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-black text-foreground mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.publishedDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  5 min read
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
            />
          </div>

          {/* Call to Action */}
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Ready to Invest in Uttrakhand Properties?
              </h3>
              <p className="text-muted-foreground mb-6">
                Explore our curated selection of premium plots in Uttrakhand's most sought-after locations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/plots">
                    View Available Plots
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Get Expert Consultation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-8">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{relatedPost.category}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          Read More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  )
}

// Generate static paths for all published blog posts
export async function generateStaticParams() {
  return blogPosts
    .filter((post) => post.status === "Published")
    .map((post) => ({
      slug: post.slug,
    }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug && p.status === "Published")
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.lastModified,
      authors: [post.author],
      tags: post.tags,
    },
  }
}