import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image
                src="/images/mascot-logo.png"
                alt="Property in Uttrakhand Mascot"
                width={56}
                height={56}
                className="w-full h-full object-contain rounded-lg"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg text-foreground leading-tight">Property in Uttrakhand</h1>
              <p className="text-xs text-muted-foreground">Premium Hill Station Plots</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#plots" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
              Our Plots
            </Link>
            <Link
              href="#locations"
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              Locations
            </Link>
            <Link
              href="#investment"
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              Why Invest
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
              Contact
            </Link>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 shadow-lg text-sm px-4 py-2">📞 Call Now</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[url('/uttarakhand-mountains-landscape-spiritual-hills.jpg')] bg-cover bg-center opacity-15"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-serif font-black text-5xl md:text-7xl lg:text-8xl text-balance mb-8 leading-tight">
              Premium Land Plots in
              <span className="text-primary block mt-2">Uttrakhand Hills</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-10 max-w-3xl mx-auto leading-relaxed">
              Secure your piece of paradise in India's spiritual heartland. Invest in carefully selected plots with
              stunning mountain views, legal clarity, and high growth potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-xl px-10 py-4 h-auto shadow-xl">
                🏔️ View Available Plots
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-10 py-4 h-auto bg-background/80 backdrop-blur-sm shadow-xl"
              >
                🧮 Plot Calculator
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "500+", label: "Premium Plots" },
                { number: "25+", label: "Hill Locations" },
                { number: "15%", label: "Annual Growth" },
                { number: "100%", label: "Legal Clarity" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-card/60 backdrop-blur-sm rounded-xl border shadow-lg">
                  <div className="font-serif font-black text-2xl md:text-3xl text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plots */}
      <section id="plots" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-balance mb-6">Featured Land Plots</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Handpicked premium plots in Uttrakhand's most desirable hill station locations with verified legal
              documents
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["All Plots", "Under ₹50L", "₹50L - ₹1Cr", "Above ₹1Cr", "Mountain View", "Road Access"].map((filter) => (
              <Button key={filter} variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                {filter}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Mountain View Plot - Mussoorie",
                price: "₹85 L",
                location: "Mussoorie Hills, Uttrakhand",
                size: "2400 sq ft",
                type: "Residential Plot",
                features: ["Mountain View", "Road Access", "Electricity", "Water Connection"],
                image: "/images/plot-mussoorie-mountain-view.jpg",
              },
              {
                title: "Spiritual Valley Plot - Rishikesh",
                price: "₹65 L",
                location: "Rishikesh Valley, Uttrakhand",
                size: "3200 sq ft",
                type: "Commercial Plot",
                features: ["Ganga View", "Main Road", "Corner Plot", "High ROI"],
                image: "/images/plot-rishikesh-valley-land.jpg",
              },
              {
                title: "Lake View Plot - Nainital",
                price: "₹1.2 Cr",
                location: "Nainital Lake Area, Uttrakhand",
                size: "4800 sq ft",
                type: "Premium Plot",
                features: ["Lake View", "Prime Location", "Developed Area", "Investment Grade"],
                image: "/images/plot-nainital-lake-view.jpg",
              },
            ].map((plot, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-card/80 backdrop-blur-sm border-2 hover:border-primary/20"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={plot.image || "/placeholder.svg"}
                    alt={plot.title}
                    width={500}
                    height={350}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary shadow-lg text-sm px-3 py-1">{plot.type}</Badge>
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="font-serif font-bold text-lg text-primary">{plot.price}</span>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">
                    {plot.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-base">📍 {plot.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground flex items-center gap-2">📏 Plot Size</span>
                    <span className="font-semibold">{plot.size}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {plot.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 shadow-lg">View Details</Button>
                    <Button variant="outline" className="flex-1 bg-background/80">
                      Schedule Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prime Locations */}
      <section id="locations" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-balance mb-6">Prime Plot Locations</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Discover premium plot opportunities in Uttrakhand's most sought-after hill station destinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Mussoorie Hills",
                description: "Queen of Hills - Premium Plots",
                plotsAvailable: "45+ Plots",
                priceRange: "₹60L - ₹2Cr",
                image: "/images/mussoorie-hills-plots-available.jpg",
              },
              {
                name: "Rishikesh Valley",
                description: "Spiritual Investment Hub",
                plotsAvailable: "32+ Plots",
                priceRange: "₹40L - ₹1.5Cr",
                image: "/images/rishikesh-valley-plots-land.jpg",
              },
              {
                name: "Nainital Lake Area",
                description: "Lake View Premium Plots",
                plotsAvailable: "18+ Plots",
                priceRange: "₹80L - ₹3Cr",
                image: "/images/nainital-lake-plots-area.jpg",
              },
              {
                name: "Dehradun Outskirts",
                description: "Capital City Proximity",
                plotsAvailable: "65+ Plots",
                priceRange: "₹35L - ₹1Cr",
                image: "/images/dehradun-outskirts-plots.jpg",
              },
            ].map((location, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-card/80 backdrop-blur-sm"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={location.image || "/placeholder.svg"}
                    alt={location.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-primary/90 mb-2">{location.plotsAvailable}</Badge>
                    <h3 className="font-serif font-bold text-xl">{location.name}</h3>
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardDescription className="text-base mb-2">{location.description}</CardDescription>
                  <div className="font-semibold text-primary text-lg">{location.priceRange}</div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Guide */}
      <section id="investment" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-balance mb-6">
              Why Invest in Uttrakhand Plots?
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Discover the compelling reasons to invest in land plots in India's spiritual and scenic paradise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "📈",
                title: "Exceptional Growth Potential",
                description:
                  "Land values in Uttrakhand hill stations have shown consistent 15-25% annual appreciation with strong future prospects",
              },
              {
                icon: "🌲",
                title: "Tourism & Spiritual Hub",
                description:
                  "Growing spiritual tourism and adventure travel creating sustained demand for hospitality and residential development",
              },
              {
                icon: "🛡️",
                title: "Legal Security & Clarity",
                description:
                  "All plots come with verified legal documents, clear titles, and government approvals for peace of mind",
              },
              {
                icon: "⚡",
                title: "Infrastructure Development",
                description:
                  "Rapid infrastructure growth including better roads, connectivity, and utilities enhancing plot values",
              },
              {
                icon: "🏔️",
                title: "Climate & Lifestyle",
                description:
                  "Pleasant year-round climate and pristine environment making it ideal for second homes and retirement",
              },
              {
                icon: "🏆",
                title: "Government Support",
                description:
                  "State government initiatives promoting hill station development and sustainable tourism growth",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm"
              >
                <div className="flex justify-center mb-6 p-4 bg-primary/10 rounded-full w-fit mx-auto">
                  <span className="text-4xl">{benefit.icon}</span>
                </div>
                <CardTitle className="font-serif text-xl mb-4 text-balance">{benefit.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{benefit.description}</CardDescription>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
              <CardHeader className="text-center pb-6">
                <CardTitle className="font-serif text-2xl mb-2">Plot Investment Calculator</CardTitle>
                <CardDescription className="text-base">
                  Estimate your potential returns on Uttrakhand plot investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="p-6 bg-muted/50 rounded-xl">
                    <div className="font-serif font-bold text-3xl text-primary mb-2">₹50L</div>
                    <div className="text-sm text-muted-foreground mb-2">Average Plot Price</div>
                    <div className="text-xs text-muted-foreground">2000-3000 sq ft</div>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-xl">
                    <div className="font-serif font-bold text-3xl text-primary mb-2">18%</div>
                    <div className="text-sm text-muted-foreground mb-2">Expected Annual Growth</div>
                    <div className="text-xs text-muted-foreground">Based on 5-year trends</div>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-xl">
                    <div className="font-serif font-bold text-3xl text-primary mb-2">₹1.2Cr</div>
                    <div className="text-sm text-muted-foreground mb-2">Projected Value (5 years)</div>
                    <div className="text-xs text-muted-foreground">Conservative estimate</div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                    🧮 Get Detailed Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-balance mb-6">Plot Owner Success Stories</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Hear from satisfied plot owners who made smart investments in Uttrakhand
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Sharma",
                location: "Delhi → Mussoorie Plot Owner",
                rating: 5,
                investment: "₹75L Plot → ₹1.1Cr (2 years)",
                text: "Bought a plot in Mussoorie hills 2 years ago. The value has increased by 47% and I'm planning to build my dream home there soon.",
              },
              {
                name: "Priya Gupta",
                location: "Mumbai → Rishikesh Plot Owner",
                rating: 5,
                investment: "₹45L Plot → ₹68L (18 months)",
                text: "Perfect investment for my spiritual retreat center. The plot location near Ganga is ideal and the legal process was completely transparent.",
              },
              {
                name: "Amit Kumar",
                location: "Bangalore → Nainital Plot Owner",
                rating: 5,
                investment: "₹90L Plot → ₹1.3Cr (3 years)",
                text: "Best decision ever! My lake-view plot has appreciated tremendously. Planning to develop a boutique resort there.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-primary text-lg">
                      ⭐
                    </span>
                  ))}
                </div>
                <CardDescription className="text-base mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </CardDescription>
                <div className="border-t pt-4">
                  <CardTitle className="text-base font-semibold mb-1">{testimonial.name}</CardTitle>
                  <CardDescription className="text-sm mb-2">{testimonial.location}</CardDescription>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {testimonial.investment}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/images/mascot-logo.png"
                      alt="Property in Uttrakhand"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain rounded-lg bg-white/10 p-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-base leading-tight">Property in Uttrakhand</h3>
                    <p className="text-xs opacity-75">Premium Hill Station Plots</p>
                  </div>
                </div>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Your trusted partner for premium land plots in Uttrakhand's most beautiful hill stations. Legal clarity,
                prime locations, exceptional growth potential.
              </p>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Plot Services</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#plots" className="opacity-90 hover:opacity-100 transition-opacity">
                    Available Plots
                  </Link>
                </li>
                <li>
                  <Link href="#locations" className="opacity-90 hover:opacity-100 transition-opacity">
                    Prime Locations
                  </Link>
                </li>
                <li>
                  <Link href="#investment" className="opacity-90 hover:opacity-100 transition-opacity">
                    Investment Guide
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="opacity-90 hover:opacity-100 transition-opacity">
                    Site Visits
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Hill Stations</h4>
              <ul className="space-y-3 text-sm">
                <li className="opacity-90">Mussoorie Plots</li>
                <li className="opacity-90">Rishikesh Plots</li>
                <li className="opacity-90">Nainital Plots</li>
                <li className="opacity-90">Dehradun Plots</li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Contact Info</h4>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  📞 <span className="opacity-90">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3">
                  📧 <span className="opacity-90">plots@propertyinuttrakhand.com</span>
                </div>
                <div className="flex items-center gap-3">
                  📍 <span className="opacity-90">Dehradun, Uttrakhand 248001</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-sm opacity-90">
              © 2024 Property in Uttrakhand. All rights reserved. | Invest in your piece of paradise.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
