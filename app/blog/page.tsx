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
  }, 
  {
    id: 1,
    title: "Bajrang Vatika Premium",
    location: "Badripur, Dehradun",
    locationLink: "https://www.google.com/maps/@30.402437,77.750105,16z?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D",
    size: "900-2400 sq yd",
    type: "Residential Project",
    price: "₹16,500 per sq/yd",
    features: ["Green Parks", "24x7 Security", "Wide Roads", "Modern Infra"],
    images: ["/images/D_1760471281369.jpg", "/images/E_1760471281368.jpg"],
    rating: 4.8,
    reviews: 156,
    available: 12,
    isPopular: true,
  },
  {
    id: 2,
    title: "Nature Green Valley Phase 5",
    location: "Ganeshpur, Dehradun",
    locationLink: "https://www.google.com/maps/search/Nature+Green+Valley+Ganeshpur+Dehradun",
    size: "1000-1800 sq yd",
    type: "Residential Project",
    price: "₹16,500 per sq/yd",
    features: ["Green Parks", "24x7 Security", "Wide Roads", "Modern Infra"],
    images: ["/images/design1.png", "/images/naturegreenvalley6.jpeg"],
    rating: 4.7,
    reviews: 89,
    available: 8,
    isPopular: false,
  },
  {
    id: 3,
    title: "Friend's Colony Phase 1",
    location: "Sundarpur, Dehradun",
    locationLink: "https://goo.gl/maps/eVZJvUNkMXLGmDKe8",
    size: "800-1500 sq yd",
    type: "Residential Project",
    price: "₹16,000 per sq/yd",
    features: ["Smart Investment", "Connectivity", "Premium Community"],
    images: [
      "/images/WhatsApp Image 2025-10-13 at 23.57.03_02316e06.jpg",
      "/images/WhatsApp Image 2025-10-13 at 23.57.03_a5777e2d.jpg",
    ],
    rating: 4.6,
    reviews: 67,
    available: 5,
    isPopular: false,
  },
 {
  id: 2,
  title: "Top Mistakes to Avoid When Buying Land in Uttarakhand",
  slug: "top-mistakes-to-avoid-when-buying-land-in-uttarakhand",
  excerpt: "Avoid these costly mistakes before investing in Uttarakhand plots",
  content: `
    <p>Buying land in Uttarakhand can be one of the most rewarding decisions you make—both emotionally and financially. However, many buyers jump in without understanding the regional laws, terrain challenges, and hidden costs. To help you make a secure and profitable purchase, here’s a list of the most common mistakes investors and homebuyers make when buying property in the hills, and how to avoid them.</p>

    <h2>1. Ignoring Land Classification and Use Restrictions</h2>
    <p>Not every piece of land in Uttarakhand is legally buildable. Many areas fall under agricultural, forest, or restricted eco-zones where residential construction is prohibited. Before paying an advance, confirm the land’s classification through the local revenue office. Ensure you have clear permission for residential or commercial use—especially in protected or green-belt zones.</p>

    <h2>2. Skipping Proper Title and Legal Verification</h2>
    <p>Buyers often rely on verbal assurances or incomplete documentation. Always demand original title deeds, mutation entries, and the encumbrance certificate for the past 30 years. Cross-check records at the tehsil office and verify there are no liens, inheritance disputes, or government notifications. Legal verification through a local property lawyer is non-negotiable in hill regions.</p>

    <h2>3. Overlooking Slope, Drainage and Access Roads</h2>
    <p>Plots in hilly areas can look beautiful but may pose construction challenges. A steep or uneven slope may require expensive retaining walls or soil stabilization. Also, some plots have approach roads that are private or seasonal. Inspect access routes personally and confirm they remain open to the public throughout the year, including during monsoon.</p>

    <h2>4. Underestimating Environmental and Climate Factors</h2>
    <p>In Uttarakhand, environmental conditions vary drastically with altitude. Landslide-prone zones, unstable slopes, and water scarcity are real issues. Always check the site’s drainage, soil quality, and previous flood or slide records. Avoid heavy cutting into hillsides, and follow eco-friendly construction guidelines to stay compliant and safe.</p>

    <h2>5. Forgetting to Budget for Hidden Costs</h2>
    <p>Land cost is just the beginning. Buyers often forget about stamp duty, registration fees, boundary fencing, site leveling, and road access charges. In some areas, connecting water or electricity lines can also cost significantly. Add at least 10–15% of the property value to cover these extras so you don’t strain your budget later.</p>

    <h2>6. Not Conducting a Site Visit or Local Inquiry</h2>
    <p>Never finalize a deal without visiting the plot in person. Photos can be misleading, and sellers may omit issues like poor road access or nearby encroachments. Speak to neighbours, check the terrain after rain, and observe sunlight direction. Local feedback is the most reliable way to confirm if a plot is genuinely suitable for your needs.</p>

    <h2>7. Ignoring Government Notifications and Future Projects</h2>
    <p>Uttarakhand’s development plans often include new highways, eco-zones, and restricted belts. Overlooking these can affect construction rights or resale value. Check district master plans and ongoing infrastructure projects before purchase. Proximity to upcoming roads or tourism corridors can raise land value, while being too close to restricted zones can limit usage.</p>

    <h2>Final Takeaway</h2>
    <p>Buying land in Uttarakhand is an exciting opportunity, but success depends on awareness and due diligence. Avoid emotional decisions, verify every document, and understand the geography before committing funds. With professional legal and engineering advice, your investment in the hills can remain both safe and profitable for years to come.</p>
  `,
  category: "Real Estate",
  tags: ["Uttarakhand", "Property Buying", "Land Investment", "Legal Tips"],
  author: "Admin User",
  status: "Published",
  publishedDate: "2025-11-06",
  lastModified: "2025-11-06",
  views: 0,
  featured: true,
  metaTitle: "Top Mistakes to Avoid When Buying Land in Uttarakhand — 2025 Guide",
  metaDescription: "Learn the key mistakes to avoid before buying plots or land in Uttarakhand. Covers legal checks, slope evaluation, road access, and environmental safety tips.",
  image: "/images/badripur-plots.jpg"
},

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
  views: 208,
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
