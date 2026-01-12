"use client"

import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"

// UI Components
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Icons
import { 
  TrendingUp, 
  Shield, 
  Award, 
  Calculator, 
  PieChart, 
  BarChart3, 
  Target, 
  Zap,
  ArrowRight,
  CheckCircle2
} from "lucide-react"

// --- DATA ---
const investmentReasons = [
  {
    icon: TrendingUp,
    title: "High Appreciation Potential",
    description: "Uttarakhand properties have shown consistent 25-45% annual growth",
    details: [
      "Historical data shows steady price increase",
      "Government infrastructure investments",
      "Growing tourism and IT sector",
      "Limited land availability in prime areas"
    ]
  },
  {
    icon: Shield,
    title: "Legal Security",
    description: "All properties with clear titles and proper documentation",
    details: [
      "Clear land records and ownership",
      "All NOCs from relevant authorities",
      "Legal due diligence completed",
      "Transparent documentation process"
    ]
  },
  {
    icon: Target,
    title: "Strategic Location",
    description: "Properties in high-growth corridors with excellent connectivity",
    details: [
      "Close to major highways and airports",
      "Upcoming infrastructure developments",
      "Educational and healthcare facilities nearby",
      "Tourism and business hubs proximity"
    ]
  },
  {
    icon: Zap,
    title: "Multiple Exit Options",
    description: "Flexible investment with various monetization strategies",
    details: [
      "Build your dream home",
      "Sell for capital appreciation",
      "Develop and rent for steady income",
      "Land banking for future generations"
    ]
  }
]

const marketAnalysis = {
  uttarakhandGrowth: [
    { year: "2020", growth: 15 },
    { year: "2021", growth: 22 },
    { year: "2022", growth: 28 },
    { year: "2023", growth: 35 },
    { year: "2024", growth: 42 }
  ],
  comparisonData: [
    { location: "Uttarakhand Hills", growth: 35, investment: "₹25L", returns: "₹45L", highlight: true },
    { location: "Gurgaon", growth: 12, investment: "₹50L", returns: "₹58L", highlight: false },
    { location: "Pune", growth: 18, investment: "₹40L", returns: "₹50L", highlight: false },
    { location: "Bangalore", growth: 15, investment: "₹60L", returns: "₹72L", highlight: false }
  ]
}

export default function InvestmentPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm shadow-sm">
             <TrendingUp className="mr-2 h-3 w-3" /> Investment Guide
          </Badge>
          <h1 className="font-extrabold text-5xl md:text-7xl mb-6 tracking-tight text-foreground">
            Why Invest in <span className="font-extrabold text-5xl md:text-7xl mb-6 tracking-tight text-foreground">Uttarakhand?</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Discover the compelling reasons why Uttarakhand real estate offers exceptional investment opportunities with high returns, legal security, and strategic growth potential.
          </p>
        </div>
      </section>

      {/* --- INVESTMENT REASONS GRID --- */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Investment Advantages</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Four compelling reasons why smart investors choose Uttarakhand properties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {investmentReasons.map((reason, index) => (
              <Card key={index} className="group hover-lift border-0 shadow-lg p-2">
                <CardContent className="flex flex-col md:flex-row gap-6 p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl mb-2 text-foreground">{reason.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6">{reason.description}</p>
                    <ul className="space-y-3">
                      {reason.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                          <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- MARKET ANALYSIS --- */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Market Performance Analysis</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Data-driven insights showing consistent growth and superior returns compared to other regions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Growth Chart */}
            <Card className="border-border shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                     <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  Property Growth Trends
                </CardTitle>
                <CardDescription>Year-over-year appreciation rates in prime locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {marketAnalysis.uttarakhandGrowth.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                       <span>{data.year}</span>
                       <span className="text-primary">{data.growth}% Growth</span>
                    </div>
                    <Progress value={(data.growth / 50) * 100} className="h-3 bg-muted" indicator ClassName="bg-gradient-to-r from-primary to-secondary" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card className="border-border shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                     <PieChart className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  ROI Comparison (5 Years)
                </CardTitle>
                <CardDescription>Compare returns against major metro markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketAnalysis.comparisonData.map((data, index) => (
                    <div 
                      key={index} 
                      className={`p-5 rounded-xl border transition-all ${
                        data.highlight 
                          ? 'bg-primary/5 border-primary/20 shadow-sm' 
                          : 'bg-muted/30 border-transparent hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-lg text-foreground">{data.location}</span>
                        {data.highlight ? (
                           <Badge className="bg-primary hover:bg-primary text-primary-foreground">{data.growth}% Growth</Badge>
                        ) : (
                           <span className="text-sm text-muted-foreground">{data.growth}% Growth</span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block mb-1">Initial Investment</span>
                          <div className="font-semibold text-foreground">{data.investment}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground block mb-1">Current Value</span>
                          <div className={`font-semibold ${data.highlight ? 'text-green-600' : 'text-foreground'}`}>
                             {data.returns}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* --- CALCULATOR CTA --- */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Calculate Your Returns?
          </h2>
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">
            Use our advanced investment calculator to see potential returns based on your investment amount, timeline, and location preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white h-14 px-8 text-lg shadow-lg hover:shadow-primary/25 transition-all"
              onClick={() => window.location.href = '/calculator'}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Open Calculator
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 h-14 px-8 text-lg"
              onClick={() => window.open('tel:+917870231314', '_self')}
            >
              Speak to Advisor
            </Button>
          </div>
        </div>
      </section>

      {/* --- SUCCESS STORIES --- */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real investors, real returns - see how our clients have benefited from timely investments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                investment: "₹20 Lakhs",
                returns: "₹38 Lakhs",
                timeline: "3 years",
                story: "Bought a plot in Dehradun outskirts, now it's worth almost double! The legal process was seamless."
              },
              {
                name: "Priya Sharma",
                location: "Mumbai",
                investment: "₹35 Lakhs",
                returns: "₹58 Lakhs",
                timeline: "4 years",
                story: "Built a beautiful weekend home. The property value increased significantly faster than my mutual funds."
              },
              {
                name: "Amit Patel",
                location: "Pune",
                investment: "₹15 Lakhs",
                returns: "₹32 Lakhs",
                timeline: "5 years",
                story: "Small investment in Rishikesh area turned into an excellent retirement corpus for my parents."
              }
            ].map((story, index) => (
              <Card key={index} className="group hover-lift border-border shadow-md bg-card">
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Award className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{story.name}</CardTitle>
                  <CardDescription>{story.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-bold text-foreground">{story.investment}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Invested</div>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="font-bold text-green-600 dark:text-green-400">{story.returns}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Value</div>
                    </div>
                  </div>
                  
                  <div className="text-center px-2">
                    <Badge variant="secondary" className="mb-4 bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground border-0">
                       {story.timeline} Growth Journey
                    </Badge>
                    <p className="text-muted-foreground italic">"{story.story}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
