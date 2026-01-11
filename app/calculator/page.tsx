"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { toast } from "@/hooks/use-toast"

// UI Components
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Icons
import { 
  Calculator, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Home, 
  Calendar, 
  RefreshCcw,
  ArrowRight
} from "lucide-react"

// --- DATA ---
const locationData = [
  { name: "Bajrang Vatika Premium - Badripur", baseRate: 1867, growthRate: 0.35 },
  { name: "Nature Green Valley Phase 5 - Ganeshpur", baseRate: 1867, growthRate: 0.38 },
  { name: "Friends Colony Phase 1 - Dehradun", baseRate: 1867, growthRate: 0.30 },
  { name: "Badripur (General)", baseRate: 1867, growthRate: 0.35 },
  { name: "Sundarpur", baseRate: 1867, growthRate: 0.42 }
]

export default function CalculatorPage() {
  const [calculatorData, setCalculatorData] = useState({
    plotSize: "",
    location: "",
    timeline: "5",
    investmentType: "plot",
    plotValue: 0,
    expectedGrowth: 0,
    constructionCost: 0,
    totalInvestment: 0,
    potentialReturn: 0,
    annualGrowthRate: 0
  })

  const calculateInvestment = () => {
    if (!calculatorData.plotSize || !calculatorData.location) {
      toast({
        title: "Missing Input",
        description: "Please enter plot size and select a location.",
        variant: "destructive"
      })
      return
    }

    const size = parseInt(calculatorData.plotSize)
    const selectedLocation = locationData.find(loc => loc.name === calculatorData.location)
    
    if (!selectedLocation) return

    const baseRate = selectedLocation.baseRate
    const growthRate = selectedLocation.growthRate
    
    const plotValue = size * baseRate
    const years = parseInt(calculatorData.timeline)
    const expectedGrowth = plotValue * Math.pow(1 + growthRate, years)
    const constructionCost = calculatorData.investmentType === "home" ? size * 1800 : 0
    const totalInvestment = plotValue + constructionCost
    const potentialReturn = expectedGrowth + constructionCost
    // CAGR Formula: (Ending Value / Beginning Value)^(1/n) - 1
    const annualGrowthRate = ((expectedGrowth / plotValue) ** (1/years) - 1) * 100

    setCalculatorData(prev => ({
      ...prev,
      plotValue,
      expectedGrowth,
      constructionCost,
      totalInvestment,
      potentialReturn,
      annualGrowthRate
    }))

    toast({
      title: "Calculation Complete",
      description: `Potential Value: ₹${(potentialReturn/100000).toFixed(2)} Lakhs`
    })
  }

  const resetCalculator = () => {
    setCalculatorData({
      plotSize: "",
      location: "",
      timeline: "5",
      investmentType: "plot",
      plotValue: 0,
      expectedGrowth: 0,
      constructionCost: 0,
      totalInvestment: 0,
      potentialReturn: 0,
      annualGrowthRate: 0
    })
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
             <TrendingUp className="mr-2 h-3 w-3" /> ROI Calculator
          </Badge>
          <h1 className="font-extrabold text-5xl md:text-7xl mb-6 tracking-tight">
            Smart Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tool</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Calculate your potential returns and make informed investment decisions with our advanced property algorithm.
          </p>
        </div>
      </section>

      {/* --- CALCULATOR UI --- */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-6xl mx-auto border-0 shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-12">
              
              {/* LEFT: Inputs */}
              <div className="lg:col-span-7 p-8 lg:p-12 bg-card">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Calculator className="h-6 w-6 text-primary" />
                  Configuration
                </h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Plot Size (sq ft) <span className="text-red-500">*</span></Label>
                      <Input
                        type="number"
                        placeholder="e.g. 1200"
                        value={calculatorData.plotSize}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, plotSize: e.target.value }))}
                        className="h-12 bg-muted/30 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Investment Type</Label>
                      <Select
                        value={calculatorData.investmentType}
                        onValueChange={(value) => setCalculatorData(prev => ({ ...prev, investmentType: value }))}
                      >
                        <SelectTrigger className="h-12 bg-muted/30 focus:ring-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plot">Plot Only</SelectItem>
                          <SelectItem value="home">Plot + Construction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Location <span className="text-red-500">*</span></Label>
                    <Select
                      value={calculatorData.location}
                      onValueChange={(value) => setCalculatorData(prev => ({ ...prev, location: value }))}
                    >
                      <SelectTrigger className="h-12 bg-muted/30 focus:ring-primary">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationData.map((location) => (
                          <SelectItem key={location.name} value={location.name}>
                            {location.name} (Base: ₹{location.baseRate}/sq ft)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Investment Timeline</Label>
                    <Select
                      value={calculatorData.timeline}
                      onValueChange={(value) => setCalculatorData(prev => ({ ...prev, timeline: value }))}
                    >
                      <SelectTrigger className="h-12 bg-muted/30 focus:ring-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">Short Term (2 Years)</SelectItem>
                        <SelectItem value="5">Medium Term (5 Years)</SelectItem>
                        <SelectItem value="10">Long Term (10 Years)</SelectItem>
                        <SelectItem value="15">Legacy (15 Years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <Button 
                      onClick={calculateInvestment}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground h-12 text-lg shadow-lg hover:opacity-90 transition-opacity"
                    >
                      Calculate Returns
                    </Button>
                    <Button 
                      onClick={resetCalculator}
                      variant="outline"
                      className="h-12 px-6 border-muted-foreground/20 hover:bg-muted"
                    >
                      <RefreshCcw className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* RIGHT: Results Dashboard */}
              <div className="lg:col-span-5 bg-muted/50 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                  Projections
                </h3>

                <div className="space-y-6">
                  {/* Card 1: Total Value */}
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <DollarSign className="h-24 w-24" />
                    </div>
                    <CardContent className="p-6 relative z-10">
                      <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Projected Value ({calculatorData.timeline} Years)</p>
                      <div className="text-4xl font-bold mb-2">
                        ₹{calculatorData.potentialReturn ? (calculatorData.potentialReturn/100000).toFixed(2) : '0.00'} L
                      </div>
                      {calculatorData.annualGrowthRate > 0 && (
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0">
                          <TrendingUp className="mr-1 h-3 w-3" /> {calculatorData.annualGrowthRate.toFixed(1)}% CAGR
                        </Badge>
                      )}
                    </CardContent>
                  </Card>

                  {/* Card 2: Breakdown Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-0 shadow-sm bg-background">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase mb-2">
                           <Home className="h-4 w-4" /> Current Value
                        </div>
                        <div className="text-xl font-bold text-foreground">
                           ₹{(calculatorData.plotValue/100000).toFixed(2)} L
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm bg-background">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase mb-2">
                           <Zap className="h-4 w-4" /> Net Profit
                        </div>
                        <div className="text-xl font-bold text-green-600">
                           ₹{((calculatorData.potentialReturn - calculatorData.totalInvestment)/100000).toFixed(2)} L
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Insight Box */}
                  {calculatorData.potentialReturn > 0 ? (
                    <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-5 mt-4">
                      <h4 className="font-semibold text-secondary-foreground flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" /> Investment Insight
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Based on historical data for <strong>{calculatorData.location}</strong>, your investment is projected to grow by <strong>₹{((calculatorData.potentialReturn - calculatorData.totalInvestment)/100000).toFixed(2)} Lakhs</strong> over the next {calculatorData.timeline} years.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground/60 border-2 border-dashed border-border rounded-xl">
                       <Calculator className="h-10 w-10 mb-2 opacity-50" />
                       <p>Enter details to see projection</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </Card>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-bold text-3xl md:text-4xl mb-6 text-foreground">
            Like these numbers? Let's make it happen.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Our experts can help you verify these projections with actual market data and arrange a site visit today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg shadow-xl"
              onClick={() => window.open('tel:+917870231314', '_self')}
            >
              Speak to Expert
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-primary text-primary hover:bg-primary/10"
              onClick={() => window.open('https://wa.me/917870231314', '_blank')}
            >
              WhatsApp Us <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}