"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";
import { LocationMap } from "@/components/location-map";
import { FloatingActions } from "@/components/floating-actions";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/footer";

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
 * Static plot data (example)
 */
const plotData = [
  {
    id: 1,
    title: "Bajrang Vatika Premium",
    location: "Badripur, Dehradun",
    locationLink: "https://www.google.com/maps/@30.402437,77.750105,16z?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D",
    size: "900-2400 sq yd",
    type: "Residential Project",
    price: "₹16500 per sq/yd",
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
    amenities: ["24×7 security & CCTV surveillance", "Wide internal paved roads", "Children’s play area", "Direct Highway Access"],
  },
  {
    id: 2,
    title: "Nature Green Valley Phase 5",
    location: "Ganeshpur, Dehradun",
    locationLink: "https://www.google.com/maps/search/Nature+Green+Valley+Ganeshpur+Dehradun",
    size: "1000-1800 sq yd",
    type: "Residential Project",
    price: "₹16500 per sq/yard",
    features: [
      "Green Parks",
      "24x7 Security",
      "Wide Roads",
      "Modern Infrastructure",
    ],
    images: [
      "/images/nature-green-valley-phase5.jpg",
      "/images/ganeshpur-plots.jpg",
    ],
    rating: 4.7,
    reviews: 89,
    available: 8,
    isPopular: false,
    amenities: ["24×7 security & CCTV surveillance", "Wide internal paved roads", "Children’s play area", "Direct Highway Access"],
  },
  {
    id: 3,
    title: "Friend's Colony Phase 1",
    location: "Sundarpur, Dehradun",
    locationLink: "https://goo.gl/maps/eVZJvUNkMXLGmDKe8",
    size: "800-1500 sq yd",
    type: "Residential Project",
    price: "₹16000 per sq/yard",
    features: [
      "Smart Investment",
      "Excellent Connectivity",
      "Premium Community",
      "24x7 Security",
    ],
    images: [
      "/images/friends-colony-phase1.jpg",
      "/images/dehradun-outskirts-plots.jpg",
    ],
    rating: 4.6,
    reviews: 67,
    available: 5,
    isPopular: false,
    amenities: ["24×7 security & CCTV surveillance", "Wide internal paved roads", "Children’s play area", "Direct Highway Access"],
  },
] as const;

/**
 * Static location data
 */
const locationData = [
  {
    name: "Badripur",
    description: "Premium residential plots with excellent connectivity",
    plotsAvailable: "30+ Plots",
    priceRange: "₹16500 per sq/yard",
    image: "/images/badripur-plots.jpg",
    growth: "+35%",
    connectivity: "Excellent",
    amenities: ["24×7 security & CCTV surveillance", "Wide internal paved roads", "Children’s play area", "Direct Highway Access"],
  },
  {
    name: "Ganeshpur",
    description: "Serene location with modern amenities and growth potential",
    plotsAvailable: "20+ Plots",
    priceRange: "₹16500 per sq/yard",
    image: "/images/ganeshpur-plots.jpg",
    growth: "+42%",
    connectivity: "Good",
    amenities: ["24×7 security & CCTV surveillance", "Wide internal paved roads", "Children’s play area", "Direct Highway Access"],
  },
  {
    name: "Sundarpur",
    description: "Perfect blend of city convenience and serene environment",
    plotsAvailable: "25+ Plots",
    priceRange: "₹16000 per sq/yard",
    image: "/images/dehradun-outskirts-plots.jpg",
    growth: "+38%",
    connectivity: "Excellent",
    amenities: ["City Access", "Peaceful Environment", "Infrastructure", "Investment Potential"],
  },
] as const;

/**
 * HomePage component (client-side)
 */
export default function HomePage() {
  const { toast } = useToast();

  // UI states
  const [selectedFilter, setSelectedFilter] = useState<string>("All Plots");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPlot, setSelectedPlot] = useState<typeof plotData[number] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  // Calculator data
  const [calculatorData, setCalculatorData] = useState({
    plotSize: "",
    location: "",
    timeline: "5",
    plotValue: 0,
    expectedGrowth: 0,
    constructionCost: 0,
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    plotInterest: "",
  });

  // Filtered plots based on search & filter
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

  // Toggle favorite (fix: read current before updating, then show toast based on previous state)
  const toggleFavorite = (plotId: number) => {
    const currentlyFavorite = favorites.includes(plotId);
    if (currentlyFavorite) {
      setFavorites((prev) => prev.filter((id) => id !== plotId));
      toast({
        title: "Removed from favorites",
        description: "Plot removed from your favorites.",
      });
    } else {
      setFavorites((prev) => [...prev, plotId]);
      toast({
        title: "Added to favorites",
        description: "Plot saved to your favorites.",
      });
    }
  };

  // Share plot (clipboard fallback)
  const sharePlot = (plot: typeof plotData[number]) => {
    const shareText = `${plot.title} - ${plot.location} - ${typeof window !== "undefined" ? window.location.href : ""}`;
    if (navigator.share) {
      navigator
        .share({
          title: plot.title,
          text: `Check out this amazing plot: ${plot.title} in ${plot.location}`,
          url: typeof window !== "undefined" ? window.location.href : "",
        })
        .catch(() => {
          // ignore share errors
        });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: "Link copied!",
          description: "Plot details copied to clipboard.",
        });
      });
    } else {
      toast({
        title: "Share not supported",
        description: "Cannot copy link on this device.",
        variant: "destructive",
      });
    }
  };

  // Calculate investment
  const calculateInvestment = () => {
    if (!calculatorData.plotSize || !calculatorData.location) {
      toast({
        title: "Please fill all required fields",
        description: "Plot size and location are required for calculation.",
        variant: "destructive",
      });
      return;
    }

    const size = parseInt(calculatorData.plotSize || "0", 10) || 0;
    const baseRate =
      calculatorData.location === "Dehradun Outskirts"
        ? 1500
        : calculatorData.location === "Rishikesh Region"
        ? 2000
        : calculatorData.location === "Nainital Area"
        ? 2500
        : 3000; // fallback

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

    toast({
      title: "Investment calculated!",
      description: `Your plot could be worth ₹${(expectedGrowth / 100000).toFixed(1)} Lakhs in ${years} years.`,
    });
  };

  // Contact form submit
  const submitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      toast({
        title: "Please fill required fields",
        description: "Name and phone number are required.",
      });
      return;
    }

    // Simulate success
    toast({
      title: "Form submitted successfully!",
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

  // Auto-rotate images for each plot
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Optional header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 via-[#F7931E]/10 to-[#FF6B35]/20" />
        <div className="absolute inset-0 bg-[url('/uttarakhand-mountains-landscape-spiritual-hills.jpg')] bg-cover bg-center opacity-20" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B35]/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#F7931E]/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-32 left-20 w-80 h-80 bg-[#FF6B35]/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-8 text-lg font-semibold px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce">
              Premium Verified Plots in Uttarakhand
            </Badge>

            <h1 className="font-bold text-6xl md:text-7xl lg:text-8xl leading-tight mb-8 bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FF6B35] bg-clip-text text-transparent">
              Premium Plots in
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FF6B35] bg-clip-text text-transparent">
                Uttarakhand's
              </span>
            </h1>

            <p className="text-gray-600 text-2xl md:text-3xl leading-relaxed mb-12 max-w-5xl mx-auto font-light">
              Freehold plots with verified documents, ready infrastructure and confident investment potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="text-xl px-10 py-6 min-w-[250px] bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection("plots")}
              >
                <Search className="mr-2 h-5 w-5" />
                Explore Available Plots
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-10 py-6 min-w-[250px] border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Site Visit
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="lg"
                className="text-lg px-8 py-4 text-gray-700 hover:text-[#FF6B35] hover:bg-[#FF6B35]/10"
                onClick={() => scrollToSection("contact")}
              >
                Have Questions? Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Animated Trust Indicators */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: CheckCircle, title: "Approved Plots", color: "text-[#FF6B35]" },
                { icon: Shield, title: "Legal Clarity", color: "text-[#F7931E]" },
                { icon: TrendingUp, title: "High ROI", color: "text-[#FF6B35]" },
                { icon: Award, title: "Award Winning", color: "text-[#F7931E]" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center group hover:transform hover:scale-110 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl">
                      <Icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Plots Section */}
      <section id="plots" className="py-24 bg-gradient-to-br from-gray-50 to-[#FF6B35]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-5xl md:text-6xl mb-8 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
              Premium Residential Plots
            </h2>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
              Property in Uttarakhand helps serious buyers and investors find well-located, verified plots across Uttarakhand’s most promising pockets. We list only freehold plots after strict checks for title, boundaries and basic infrastructure.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search plots by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg border-2 focus:border-[#FF6B35] rounded-xl"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {["All Plots", "Popular", "Residential", "Investment"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter)}
                  className="px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Plots Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlots.map((plot) => (
              <Card
                key={plot.id}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white border-0 shadow-lg hover:transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={plot.images[currentImageIndex[plot.id] || 0]}
                    alt={plot.title}
                    width={500}
                    height={350}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedPlot(plot)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Quick View
                    </Button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-blue-500 shadow-lg">{plot.type}</Badge>
                    {plot.isPopular && <Badge className="bg-orange-500 shadow-lg">Popular</Badge>}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => toggleFavorite(plot.id)}
                      className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white"
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(plot.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => sharePlot(plot)}
                      className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>

                  {/* Availability indicator */}
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90">
                      <Users className="mr-1 h-3 w-3" />
                      {plot.available} plots left
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {plot.title}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{plot.rating}</span>
                      <span className="text-xs text-gray-500">({plot.reviews})</span>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-2 text-base">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    {plot.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Plot Size</span>
                      <div className="font-semibold">{plot.size}</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-600">Price Range</span>
                      <div className="font-semibold text-blue-600">{plot.price}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {plot.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {plot.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{plot.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-blue-500 hover:bg-blue-600 shadow-lg" 
                        asChild
                      >
                        <Link href={
                          plot.id === 1 ? "/plots/bajrang-vatika" :
                          plot.id === 2 ? "/plots/nature-green-valley-phase5" :
                          plot.id === 3 ? "/plots/friends-colony-phase-1" :
                          "#"
                        }>
                          View Details
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                        onClick={() => scrollToSection("contact")}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Us
                      </Button>
                    </div>
                    
                    {plot.locationLink && (
                      <Button
                        variant="outline"
                        className="w-full border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10"
                        onClick={() => window.open(plot.locationLink, '_blank')}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        View Location on Map
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plots Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-5xl md:text-6xl mb-8 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
              Plots Gallery
            </h2>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
              Explore our collection of premium plots across Uttarakhand's most desirable locations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { src: "/images/A_1760471281370.jpg", title: "Plot View", mapLink: "https://goo.gl/maps/eVZJvUNkMXLGmDKe8" },
              { src: "/images/B_1760471281370.jpg", title: "Open Plot Area", mapLink: "https://www.google.com/maps/@30.402437,77.750105,16z?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D" },
              { src: "/images/C_1760471281370.jpg", title: "Plot with Amenities", mapLink: "https://www.google.com/maps/search/Ganeshpur+Dehradun" },
              { src: "/images/D_1760471281369.jpg", title: "Developed Plot", mapLink: "https://www.google.com/maps/@30.402437,77.750105,16z?hl=en&entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D" },
              { src: "/images/E_1760471281368.jpg", title: "Gated Community", mapLink: "https://goo.gl/maps/eVZJvUNkMXLGmDKe8" },
              { src: "/images/F_1760471281369.jpg", title: "Aerial View", mapLink: "https://www.google.com/maps/search/Badripur+Dehradun" },
            ].map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => window.open(image.mapLink, '_blank')}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm">{image.title}</p>
                  </div>
                  <div className="bg-white/90 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-[#FF6B35]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-24 bg-gradient-to-br from-gray-50 to-[#FF6B35]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-5xl md:text-6xl mb-8 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
              Prime Locations Across Uttarakhand
            </h2>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
              Prime locations across Uttarakhand offer well-connected, verified plots near major highways and urban hubs. These pockets provide easy access to schools, hospitals, markets and transport, making them ideal for secure investments or building a family home with long-term appreciation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locationData.slice(0, 3).map((location, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white border-0 shadow-lg hover:transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <Image
                    src={location.image}
                    alt={location.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-green-500/90 mb-2">{location.plotsAvailable}</Badge>
                    <h3 className="font-bold text-xl">{location.name}</h3>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-green-600 font-semibold">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {location.growth}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="text-center space-y-4">
                  <CardDescription className="text-base">{location.description}</CardDescription>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Price Range</span>
                      <span className="font-semibold text-blue-600">{location.priceRange}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Connectivity</span>
                      <Badge variant={location.connectivity === "Excellent" ? "default" : "secondary"}>
                        {location.connectivity}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Amenities</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {location.amenities.map((amenity, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35]" onClick={() => scrollToSection("contact")}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Explore This Location
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location map */}
      <LocationMap />

      {/* Calculator */}
      <section id="calculator" className="py-24 bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-5xl md:text-6xl mb-8 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
              Smart Investment Calculator
            </h2>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
              Calculate your potential returns and construction costs with our advanced investment calculator.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Investment Details</h3>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-lg font-medium mb-3 block">Plot Size (sq ft)</Label>
                        <Input
                          type="number"
                          placeholder="Enter plot size"
                          value={calculatorData.plotSize}
                          onChange={(e) => setCalculatorData((prev) => ({ ...prev, plotSize: e.target.value }))}
                          className="text-lg p-4 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>

                      <div>
                        <Label className="text-lg font-medium mb-3 block">Location</Label>
                        <Select value={calculatorData.location} onValueChange={(value) => setCalculatorData((prev) => ({ ...prev, location: value }))}>
                          <SelectTrigger className="text-lg p-4 border-2 focus:border-blue-500 rounded-xl">
                            <SelectValue placeholder="Select Location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locationData.map((location) => (
                              <SelectItem key={location.name} value={location.name}>
                                {location.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-lg font-medium mb-3 block">Investment Timeline</Label>
                        <Select value={calculatorData.timeline} onValueChange={(value) => setCalculatorData((prev) => ({ ...prev, timeline: value }))}>
                          <SelectTrigger className="text-lg p-4 border-2 focus:border-blue-500 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 Years</SelectItem>
                            <SelectItem value="5">5 Years</SelectItem>
                            <SelectItem value="10">10 Years</SelectItem>
                            <SelectItem value="15">15 Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={calculateInvestment} className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <Calculator className="mr-2 h-5 w-5" />
                        Calculate Investment Returns
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Projected Returns</h3>
                    <div className="space-y-6">
                      <Card className="p-6 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white border-0">
                        <div className="text-center">
                          <div className="text-sm opacity-90 mb-2">Current Plot Value</div>
                          <div className="text-3xl font-bold">₹{calculatorData.plotValue ? (calculatorData.plotValue / 100000).toFixed(1) : "0"} Lakhs</div>
                        </div>
                      </Card>

                      <Card className="p-6 bg-gradient-to-r from-[#F7931E] to-[#FF6B35] text-white border-0">
                        <div className="text-center">
                          <div className="text-sm opacity-90 mb-2">Expected Value in {calculatorData.timeline} Years</div>
                          <div className="text-3xl font-bold">₹{calculatorData.expectedGrowth ? (calculatorData.expectedGrowth / 100000).toFixed(1) : "0"} Lakhs</div>
                          <div className="text-sm opacity-90 mt-2">
                            {calculatorData.expectedGrowth && calculatorData.plotValue
                              ? `+${(((calculatorData.expectedGrowth - calculatorData.plotValue) / calculatorData.plotValue) * 100).toFixed(0)}% Growth`
                              : ""}
                          </div>
                        </div>
                      </Card>

                      <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                        <div className="text-center">
                          <div className="text-sm opacity-90 mb-2">Construction Cost (Estimated)</div>
                          <div className="text-3xl font-bold">₹{calculatorData.constructionCost ? (calculatorData.constructionCost / 100000).toFixed(1) : "0"} Lakhs</div>
                          <div className="text-sm opacity-90 mt-2">₹1,800 per sq ft</div>
                        </div>
                      </Card>

                      {calculatorData.expectedGrowth > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-yellow-800">
                            <Zap className="h-5 w-5" />
                            <span className="font-semibold">Investment Insight</span>
                          </div>
                          <p className="text-sm text-yellow-700 mt-2">
                            Your investment could potentially grow by ₹{((calculatorData.expectedGrowth - calculatorData.plotValue) / 100000).toFixed(1)} Lakhs over {calculatorData.timeline} years, based on historical growth patterns in the region.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-24 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-5xl md:text-6xl mb-8">Trusted by Thousands</h2>
            <p className="text-blue-100 text-xl max-w-4xl mx-auto leading-relaxed">
              Leading property developer in Uttarakhand with proven track record and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 5000, suffix: "+", label: "Happy Customers", icon: Users },
              { number: 50, suffix: "+", label: "Prime Projects", icon: Building },
              { number: 100, suffix: "%", label: "Legal Clarity", icon: Shield },
              { number: 48, suffix: "", label: "Customer Rating (x10)", icon: Star }, // numeric tweak for counter
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center p-8 bg-white/10 backdrop-blur-sm border-0 hover:bg-white/20 transition-all duration-300">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    <AnimatedCounter end={stat.number} />
                    {stat.suffix}
                  </div>
                  <p className="text-blue-100 text-lg">{stat.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-[#FF6B35]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-bold text-5xl md:text-6xl mb-8 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-600 text-xl leading-relaxed max-w-4xl mx-auto">
                Connect with our property experts for personalized guidance, site visits, and complete assistance from selection to registration.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8 bg-white shadow-2xl border-0">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h3>
                <form onSubmit={submitContactForm} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Full Name *</Label>
                      <Input
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="p-3 border-2 focus:border-blue-500 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Phone Number *</Label>
                      <Input
                        placeholder="Your phone number"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="p-3 border-2 focus:border-blue-500 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="p-3 border-2 focus:border-blue-500 rounded-lg"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Interested Plot</Label>
                    <Select value={contactForm.plotInterest} onValueChange={(value) => setContactForm((prev) => ({ ...prev, plotInterest: value }))}>
                      <SelectTrigger className="p-3 border-2 focus:border-blue-500 rounded-lg">
                        <SelectValue placeholder="Select a plot or location" />
                      </SelectTrigger>
                      <SelectContent>
                        {plotData.map((plot) => (
                          <SelectItem key={plot.id} value={plot.title}>
                            {plot.title} - {plot.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Message</Label>
                    <Textarea
                      placeholder="Tell us about your requirements, preferred location, budget range, or any questions you have..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="p-3 border-2 focus:border-blue-500 rounded-lg min-h-[100px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-blue-600 hover:to-purple-600 text-lg py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Mail className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Contact information / quick actions */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
                <div className="grid gap-6">
                  {[
                    {
                      icon: Phone,
                      title: "Phone / WhatsApp",
                      description: "Call or message us anytime",
                      action: "7870231314",
                      href: "tel:+917870231314",
                      color: "from-[#F7931E] to-[#FF6B35]",
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      description: "Send us your queries",
                      action: "info@propertyinuttarakhand.com",
                      href: "mailto:info@propertyinuttarakhand.com",
                      color: "from-[#FF6B35] to-[#F7931E]",
                    },
                    {
                      icon: MapPin,
                      title: "Office Location",
                      description: "Visit our office",
                      action: "Badripur & Ganeshpur, Dehradun",
                      href: "#",
                      color: "from-[#FF6B35] to-[#F7931E]",
                    },
                  ].map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{contact.title}</h4>
                            <p className="text-gray-600 text-sm mb-2">{contact.description}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (contact.href.startsWith("tel:") || contact.href.startsWith("mailto:")) {
                                  window.location.href = contact.href;
                                } else {
                                  window.open(contact.href, "_blank");
                                }
                              }}
                              className="text-blue-600 border-blue-500 hover:bg-blue-50"
                            >
                              {contact.action}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating actions / footer */}
      <FloatingActions />
      <SiteFooter />
    </>
  );
}
