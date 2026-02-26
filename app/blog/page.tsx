"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { Calendar, Eye, User, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const blogPosts = [
const blogPosts = [
  {
    id: "1",
    title: "Why Buy Affordable Property in Uttarakhand — 7 Clear Reasons",
    slug: "why-buy-affordable-property-in-uttarakhand-7-clear-reasons-2026",
    created_at: "2026-01-01",
    lastModified: "2026-01-01",
    author: "ANK Realty Team",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "Low entry prices, tourism demand and improving infrastructure make Uttarakhand an attractive place to buy affordable property.",
    category: "Investment",
    tags: ["Uttarakhand", "Affordable", "Investment"],
    views: 3240,
    featured: true,
    status: "Published",
    publishedDate: "2026-01-01",
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
    excerpt: "A comprehensive guide for buyers considering Uttarakhand for vacation homes, retirement retreats or long-term investments.",
    category: "Investment",
    tags: ["Guide", "Investment", "Uttarakhand"],
    views: 2780,
    featured: false,
    status: "Published",
    publishedDate: "2026-01-03",
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
    excerpt: "Why Rishikesh micro-markets are attractive and what buyers should consider before purchasing land nearby.",
    category: "Location Guide",
    tags: ["Rishikesh", "Land", "Buyers Guide"],
    views: 1985,
    featured: true,
    status: "Published",
    publishedDate: "2026-01-05",
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
    excerpt: "Hill plots need special attention — here’s how to evaluate slope, soil and access before buying.",
    category: "Market Analysis",
    tags: ["Hill Plots", "Analysis"],
    views: 1420,
    featured: false,
    status: "Published",
    publishedDate: "2026-01-08",
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
    excerpt: "Highway-front land tends to appreciate quickly due to connectivity and commercial interest—what to look for.",
    category: "Market Trends",
    tags: ["Highway", "Connectivity", "Trends"],
    views: 1100,
    featured: false,
    status: "Published",
    publishedDate: "2026-01-10",
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
    excerpt: "सरल और प्रभावी तरीके जिनसे आप रियल एस्टेट में निवेश करके आय बढ़ा सकते हैं।",
    category: "Property Tips",
    tags: ["Hindi", "Strategy"],
    views: 2600,
    featured: true,
    status: "Published",
    publishedDate: "2026-01-12",
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
    excerpt: "प्रॉपर्टी चुनते समय ध्यान में रखने योग्य 5 महत्वपूर्ण बातें — आसान भाषा में।",
    category: "Property Tips",
    tags: ["Hindi", "Checklist"],
    views: 3005,
    featured: false,
    status: "Published",
    publishedDate: "2026-01-15",
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
    excerpt: "Plots offer design freedom, privacy and often better long-term appreciation versus flats—here's why (2026).",
    category: "Market Analysis",
    tags: ["Plot", "Flat", "Comparison"],
    views: 1640,
    featured: false,
    status: "Published",
    publishedDate: "2026-01-17",
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
    excerpt: "A short practical checklist covering legal title, zoning and physical site checks before buying a plot in Uttarakhand.",
    category: "Property Tips",
    tags: ["Checklist", "Legal"],
    views: 980,
    featured: false,
    status: "Published",
    publishedDate: "2026-01-19",
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
    excerpt: "Best retirement-friendly towns in Uttarakhand offering healthcare access and peaceful surroundings.",
    category: "Location Guide",
    tags: ["Retirement", "Location"],
    views: 1330,
    featured: true,
    status: "Published",
    publishedDate: "2026-01-22",
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
    excerpt: "Compare ROI, rental yields and growth potential between commercial and residential options in Dehradun.",
    category: "Market Analysis",
    tags: ["Dehradun", "Commercial", "Residential"],
    views: 890,
    featured: false,
    status: "Published",
    publishedDate: "2026-01-24",
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
    excerpt: "Sustainable building practices for hill homes — solar, rainwater harvesting and local materials to reduce costs and impact.",
    category: "Property Tips",
    tags: ["Sustainable", "Eco-Friendly"],
    views: 1045,
    featured: false,
    status: "Published",
    publishedDate: "2026-01-26",
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
    excerpt: "How to use Section 80C and Section 24 to save taxes when investing in property.",
    category: "Property Tips",
    tags: ["Tax", "Finance"],
    views: 760,
    featured: false,
    status: "Published",
    publishedDate: "2026-01-29",
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
    excerpt: "Infrastructure projects and expressway expansions are transforming Haridwar into an emerging real estate hub.",
    category: "Market Trends",
    tags: ["Haridwar", "Expressway"],
    views: 1475,
    featured: true,
    status: "Published",
    publishedDate: "2026-01-31",
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
    excerpt: "A checklist of documents (conversion, encumbrance, revenue records) to verify before purchasing hill land.",
    category: "Property Tips",
    tags: ["Legal", "Documents"],
    views: 680,
    featured: false,
    status: "Published",
    publishedDate: "2026-02-02",
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
    excerpt: "Steps to convert a small plot into a boutique homestay — licensing, design and marketing tips.",
    category: "Market Trends",
    tags: ["Homestay", "Rishikesh"],
    views: 920,
    featured: false,
    status: "Published",
    publishedDate: "2026-02-05",
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
    excerpt: "Practical Vastu guidelines specific to homes built on slopes and in mountain terrain.",
    category: "Property Tips",
    tags: ["Vastu", "Mountain Homes"],
    views: 760,
    featured: false,
    status: "Published",
    publishedDate: "2026-02-07",
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
    excerpt: "Expressway projects (like Delhi–Dehradun) accelerate growth and reshape property prices in connected zones.",
    category: "Market Trends",
    tags: ["Expressways", "Infrastructure"],
    views: 1880,
    featured: true,
    status: "Published",
    publishedDate: "2026-02-09",
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
    excerpt: "Safety, spiritual appeal and rental yields are drawing NRIs to invest in Uttarakhand second homes.",
    category: "Market Analysis",
    tags: ["NRI", "Second Home"],
    views: 1540,
    featured: false,
    status: "Published",
    publishedDate: "2026-02-12",
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
    excerpt: "Pros and cons of buying agricultural land vs ready-to-build residential plots in Uttarakhand.",
    category: "Market Analysis",
    tags: ["Agricultural", "Residential"],
    views: 720,
    featured: false,
    status: "Published",
    publishedDate: "2026-02-14",
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
    excerpt: "From land selection to licenses and local labor — steps to start a small boutique resort in hill areas.",
    category: "Market Trends",
    tags: ["Resort", "Hospitality"],
    views: 640,
    featured: false,
    status: "Published",
    publishedDate: "2026-02-16",
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
    excerpt: "Why Uttarakhand locations close to Delhi NCR remain top choices for weekend homes and short getaways.",
    category: "Location Guide",
    tags: ["Weekend Homes", "Delhi NCR"],
    views: 1575,
    featured: false,
    status: "Published",
    publishedDate: "2026-02-19",
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
    excerpt: "A breakdown of additional costs (retaining walls, transport, foundations) when building in the hills.",
    category: "Property Tips",
    tags: ["Construction", "Costs"],
    views: 550,
    featured: false,
    status: "Published",
    publishedDate: "2026-02-21",
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
    excerpt: "Expert predictions on appreciation and emerging micro-markets to watch in Uttarakhand.",
    category: "Market Trends",
    tags: ["Predictions", "2026"],
    views: 2110,
    featured: true,
    status: "Published",
    publishedDate: "2026-02-23",
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
    excerpt: "Soil testing, slope and water availability — the three most important checks before buying hill property.",
    category: "Property Tips",
    tags: ["Hindi", "Checklist", "Hill Property"],
    views: 980,
    featured: false,
    status: "Published",
    publishedDate: "2026-02-26",
    content: `
      <p>पहाड़ों में जमीन खरीदना मैदानी इलाकों से बहुत अलग होता है। मिट्टी की जांच (Soil testing), ढलान (Slope gradient), और पानी की सुविधा—ये तीन ऐसे पहलू हैं जिन्हें नजरअंदाज करने पर आपको भारी नुकसान हो सकता है।</p>
    `
  }
];

const categories = ["All", "Investment", "Market Trends", "Market Analysis", "Property Tips", "Location Guide"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory && post.status === "Published"
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container py-16">
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <Input placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(featuredPosts.length > 0 ? regularPosts : filteredPosts).map((post) => (
            <Card key={post.id}>
              <div className="aspect-video relative">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>

              <CardHeader>
                <Badge>{post.category}</Badge>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between text-sm mb-4">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {post.author}
                  </div>

                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.publishedDate)}
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
