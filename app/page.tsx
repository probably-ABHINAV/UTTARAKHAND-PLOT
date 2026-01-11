"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Hooks & Custom Components
import { useToast } from "@/hooks/use-toast";
import { LocationMap } from "@/components/location-map";
import { FloatingActions } from "@/components/floating-actions";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/footer";

// Icons
import {
  MapPin,
  TrendingUp,
  Shield,
  Award,
  Phone,
  Mail,
  Calendar,
  Calculator,
  Star,
  CheckCircle,
  ArrowRight,
  Heart,
  Share2,
  Filter,
  Search,
  Play,
  Users,
  Building,
  Zap,
} from "lucide-react";

/**
 * Helper: smooth scroll to section
 */
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Animated counter (client-side)
 */
const AnimatedCounter = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | undefined = undefined;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
};

/**
 * Static Data
 */
const plotData = [
  {
    id: 1,
    title: "Bajrang Vatika Premium",
    location: "Badripur, Dehradun",
    locationLink: "https://www.google.com/maps/@30.402437,77.750105,16z?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D",
    size: "900-2400 sq yd",
    type: "Residential Project",
    price: "₹16,500 per sq/yd",
    features: [
      "24x7 Security",
      "Wide Roads",
      "Gated Community",
      "Premium Location",
    ],
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
] as const;

const locationData = [
  { name: "Badripur", baseRate: 3000 },
  { name: "Ganeshpur", baseRate: 2500 },
  { name: "Sundarpur", baseRate: 2000 },
  { name: "Dehradun Outskirts", baseRate: 1500 },
] as const;

/**
 * HomePage Component
 */
export default function HomePage() {
  const { toast } = useToast();

  // UI States
  const [selectedFilter, setSelectedFilter] = useState<string>("All Plots");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [, setSelectedPlot] = useState<typeof plotData[number] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  // Calculator State
  const [calculatorData, setCalculatorData] = useState({
    plotSize: "",
    location: "",
    timeline: "5",
    plotValue: 0,
    expectedGrowth: 0,
    constructionCost: 0,
  });

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    plotInterest: "",
  });

  // Logic: Filter Plots
  const filteredPlots = plotData.filter((plot) => {
    const matchesSearch =
      plot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All Plots" ||
      (selectedFilter === "Popular" && plot.isPopular) ||
      plot.type.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  // Logic: Toggle Favorite
  const toggleFavorite = (plotId: number) => {
    const currentlyFavorite = favorites.includes(plotId);
    if (currentlyFavorite) {
      setFavorites((prev) => prev.filter((id) => id !== plotId));
      toast({ title: "Removed from favorites" });
    } else {
      setFavorites((prev) => [...prev, plotId]);
      toast({ title: "Added to favorites" });
    }
  };

  // Logic: Share
  const sharePlot = (plot: typeof plotData[number]) => {
    const shareText = `${plot.title} - ${plot.location}`;
    if (navigator.share) {
      navigator.share({
        title: plot.title,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  // Logic: Calculator
  const calculateInvestment = () => {
    if (!calculatorData.plotSize || !calculatorData.location) {
      toast({
        title: "Missing Information",
        description: "Please enter plot size and location.",
        variant: "destructive",
      });
      return;
    }

    const size = parseInt(calculatorData.plotSize || "0", 10) || 0;
    const locData = locationData.find((l) => l.name === calculatorData.location);
    const baseRate = locData ? locData.baseRate : 2000;

    const plotValue = size * baseRate;
    const years = parseInt(calculatorData.timeline || "5", 10);
    const growthRate = 0.2; // 20% annual
    const expectedGrowth = plotValue * Math.pow(1 + growthRate, years);
    const constructionCost = size * 1800;

    setCalculatorData((prev) => ({
      ...prev,
      plotValue,
      expectedGrowth,
      constructionCost,
    }));

    toast({ title: "Calculation Complete!" });
  };

  // Logic: Contact Form
  const submitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      toast({ title: "Name and Phone are required." });
      return;
    }
    toast({
      title: "Request Received!",
      description: "Our team will contact you within 24 hours.",
    });
    setContactForm({
      name: "",
      phone: "",
      email: "",
      message: "",
      plotInterest: "",
    });
  };

  // Logic: Auto Rotate Images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const newIndex: Record<number, number> = { ...prev };
        plotData.forEach((plot) => {
          newIndex[plot.id] =
            plot.images.length > 0 ? ((prev[plot.id] || 0) + 1) % plot.images.length : 0;
        });
        return newIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-50 z-10" />
          <div className="absolute inset-0 bg-[url('/uttarakhand-mountains-landscape-spiritual-hills.jpg')] bg-cover bg-center bg-no-repeat" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto space-y-8">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-6 py-2 text-sm md:text-base uppercase tracking-wider shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
              Verified Properties in Uttarakhand
            </Badge>

            <h1 className="font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-2xl">
              Build Your Dream <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                 in Devbhoomi
              </span>
            </h1>

            <p className="text-slate-200 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Freehold plots with verified documents, ready infrastructure, and exceptional investment potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                onClick={() => scrollToSection("plots")}
                className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 rounded-full shadow-xl transition-transform hover:scale-105"
              >
                <Search className="mr-2 h-5 w-5" />
                Explore Plots
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-primary text-lg h-14 px-8 rounded-full transition-all"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Site Visit
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-white/90">
              {[
                { icon: CheckCircle, label: "RERA Approved" },
                { icon: Shield, label: "Clear Title" },
                { icon: TrendingUp, label: "High ROI" },
                { icon: Award, label: "Premium Locations" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group cursor-default">
                  <item.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-sm md:text-base">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PLOTS SECTION --- */}
    <section className="py-20 bg-slate-50">
  <div className="container mx-auto px-4">

    {/* SECTION HEADING */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
        Featured Plots
      </h2>
      <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
        Discover premium residential and commercial plots with verified
        documents and prime locations.
      </p>
    </div>

    {/* SLUG MAP (IMPORTANT) */}
    {(() => {
      const plotSlugMap = {
        1: "bajrang-vatika",
        2: "nature-green-valley-phase5",
        3: "friends-colony-phase-1",
      };

      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlots.map((plot) => {
            const slug = plotSlugMap[plot.id];

            return (
              <Card
                key={plot.id}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white flex flex-col h-full"
              >
                {/* IMAGE AREA */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={plot.images[currentImageIndex[plot.id] || 0]}
                    alt={plot.title}
                    width={500}
                    height={350}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                  {/* BADGES */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-secondary text-white">
                      {plot.type}
                    </Badge>
                    {plot.isPopular && (
                      <Badge className="bg-primary text-white">
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => toggleFavorite(plot.id)}
                      className="rounded-full bg-white/90 hover:bg-white"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(plot.id)
                            ? "fill-red-500 text-red-500"
                            : "text-slate-700"
                        }`}
                      />
                    </Button>

                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => sharePlot(plot)}
                      className="rounded-full bg-white/90 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4 text-slate-700" />
                    </Button>
                  </div>

                  {/* QUICK VIEW */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      className="rounded-full bg-white/90 hover:bg-white"
                      onClick={() => setSelectedPlot(plot)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Quick View
                    </Button>
                  </div>

                  {/* AVAILABILITY */}
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-black/60 text-white border-0 backdrop-blur-sm">
                      <Users className="mr-1 h-3 w-3" />
                      {plot.available} Units Left
                    </Badge>
                  </div>
                </div>

                {/* CONTENT AREA */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {plot.title}
                    </CardTitle>

                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-bold">
                        {plot.rating}
                      </span>
                    </div>
                  </div>

                  <CardDescription className="flex items-center gap-1 text-slate-500">
                    <MapPin className="h-4 w-4 text-primary" />
                    {plot.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow space-y-4">
                  {/* SIZE & PRICE */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs uppercase text-slate-500 font-semibold">
                        Size
                      </p>
                      <p className="font-medium text-slate-900">
                        {plot.size}
                      </p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs uppercase text-blue-500 font-semibold">
                        Price
                      </p>
                      <p className="font-medium text-blue-700">
                        {plot.price}
                      </p>
                    </div>
                  </div>

                  {/* FEATURES */}
                  <div className="flex flex-wrap gap-2">
                    {plot.features.slice(0, 3).map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA BUTTONS */}
                  <div className="flex gap-3 pt-2 mt-auto">
                    {slug ? (
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        asChild
                      >
                        <Link href={`/plots/${slug}`}>
                          View Details
                        </Link>
                      </Button>
                    ) : (
                      <Button className="flex-1" disabled>
                        Coming Soon
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/5"
                      onClick={() => scrollToSection("contact")}
                    >
                      Enquire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      );
    })()}
  </div>
</section>


      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Project <span className="text-primary">Gallery</span>
            </h2>
            <p className="text-slate-600">Visuals from our actual development sites.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "/images/A_1760471281370.jpg",
              "/images/B_1760471281370.jpg",
              "/images/C_1760471281370.jpg",
              "/images/D_1760471281369.jpg",
              "/images/E_1760471281368.jpg",
              "/images/F_1760471281369.jpg",
            ].map((src, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-xl cursor-pointer shadow-sm aspect-[4/3]">
                <Image
                  src={src}
                  alt={`Gallery Image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    <Play className="h-6 w-6 text-white fill-current" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <LocationMap />

      {/* --- CALCULATOR SECTION --- */}
      <section id="calculator" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">ROI <span className="text-primary">Calculator</span></h2>
            <p className="text-slate-600">Estimate your future returns with our proprietary algorithm.</p>
          </div>

          <Card className="max-w-5xl mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-8 lg:p-12 space-y-6">
                <h3 className="text-2xl font-semibold text-slate-800">Parameters</h3>
                
                <div className="space-y-2">
                  <Label>Plot Size (sq. ft)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 1500" 
                    className="h-12 text-lg"
                    value={calculatorData.plotSize}
                    onChange={(e) => setCalculatorData(prev => ({...prev, plotSize: e.target.value}))} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Location</Label>
                  <Select value={calculatorData.location} onValueChange={(v) => setCalculatorData(prev => ({...prev, location: v}))}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select Area" /></SelectTrigger>
                    <SelectContent>
                      {locationData.map((l) => <SelectItem key={l.name} value={l.name}>{l.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Hold Duration (Years)</Label>
                  <Select value={calculatorData.timeline} onValueChange={(v) => setCalculatorData(prev => ({...prev, timeline: v}))}>
                    <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[2, 5, 10, 15].map(y => <SelectItem key={y} value={y.toString()}>{y} Years</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateInvestment} 
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  <Calculator className="mr-2 h-5 w-5" /> Calculate Returns
                </Button>
              </div>

              {/* Results */}
              <div className="bg-slate-900 p-8 lg:p-12 text-white flex flex-col justify-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20" />

                <div className="relative z-10 space-y-6">
                  <div>
                    <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Current Valuation</p>
                    <p className="text-4xl font-bold">₹{calculatorData.plotValue ? (calculatorData.plotValue / 100000).toFixed(2) : "0.00"} L</p>
                  </div>
                  
                  <div className="h-px bg-white/10" />

                  <div>
                    <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Projected Value ({calculatorData.timeline} Years)</p>
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                      ₹{calculatorData.expectedGrowth ? (calculatorData.expectedGrowth / 100000).toFixed(2) : "0.00"} L
                    </p>
                    {calculatorData.expectedGrowth > 0 && (
                      <div className="mt-2 inline-flex items-center gap-1 text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded">
                        <TrendingUp className="h-3 w-3" />
                        <span>+{(((calculatorData.expectedGrowth - calculatorData.plotValue) / calculatorData.plotValue) * 100).toFixed(0)}% Growth</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/10 p-4 rounded-lg">
                     <div className="flex items-center gap-2 text-yellow-400 mb-1">
                        <Zap className="h-4 w-4" />
                        <span className="font-semibold text-sm">Est. Construction Cost</span>
                     </div>
                     <p className="text-2xl font-semibold">₹{calculatorData.constructionCost ? (calculatorData.constructionCost / 100000).toFixed(2) : "0.00"} L</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* --- STATISTICS --- */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: 5000, label: "Happy Families", icon: Users },
              { num: 50, label: "Completed Projects", icon: Building },
              { num: 100, label: "Title Clear", icon: Shield },
              { num: 48, label: "Ratings (4.8/5)", icon: Star },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <stat.icon className="h-8 w-8 mx-auto text-white/60 mb-4" />
                <div className="text-4xl md:text-5xl font-bold">
                  <AnimatedCounter end={stat.num} />{i !== 3 ? "+" : ""}
                </div>
                <p className="text-primary-foreground/80 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-slate-900">Get In Touch</h2>
                <p className="text-lg text-slate-600">
                  Ready to invest? Our experts are here to guide you through site visits, documentation, and registration.
                </p>
              </div>

              <div className="grid gap-6">
                <Card className="flex items-center p-6 gap-4 border-0 shadow-lg bg-slate-50">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Call Us</p>
                    <a href="tel:+917870231314" className="text-lg text-slate-600 hover:text-primary">+91 7870 231 314</a>
                  </div>
                </Card>
                <Card className="flex items-center p-6 gap-4 border-0 shadow-lg bg-slate-50">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email Us</p>
                    <a href="mailto:info@property.com" className="text-lg text-slate-600 hover:text-primary">info@propertyinuttarakhand.com</a>
                  </div>
                </Card>
                <Card className="flex items-center p-6 gap-4 border-0 shadow-lg bg-slate-50">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Visit Office</p>
                    <p className="text-lg text-slate-600">Badripur & Ganeshpur, Dehradun</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Form */}
            <Card className="p-8 shadow-2xl border-t-4 border-t-primary">
              <form onSubmit={submitContactForm} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Send an Inquiry</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      placeholder="John Doe" 
                      required 
                      className="h-12"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(p => ({...p, name: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      placeholder="+91..." 
                      required 
                      className="h-12"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(p => ({...p, phone: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email (Optional)</Label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="h-12"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(p => ({...p, email: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Interested In</Label>
                  <Select value={contactForm.plotInterest} onValueChange={(v) => setContactForm(p => ({...p, plotInterest: v}))}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select Project" /></SelectTrigger>
                    <SelectContent>
                      {plotData.map(p => <SelectItem key={p.id} value={p.title}>{p.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea 
                    placeholder="I am interested in..." 
                    className="min-h-[120px]"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(p => ({...p, message: e.target.value}))}
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90">
                  <Mail className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </form>
            </Card>

          </div>
        </div>
      </section>

      <FloatingActions />
      <SiteFooter />
    </div>
  );
}
