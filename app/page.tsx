"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen scroll-smooth bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[url('/uttarakhand-mountains-landscape-spiritual-hills.jpg')] bg-cover bg-center opacity-15"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="mb-6 text-sm font-medium px-4 py-2">
              🏔️ RERA Approved • ISO Certified • Premium Hill Station Plots 2025
            </Badge>
            <h1 className="font-serif font-black text-5xl md:text-6xl lg:text-7xl text-balance leading-tight mb-8">
              Your Dream Plot in
              <br />
              <span className="text-accent">Uttrakhand's Hills</span>
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed mb-12 max-w-4xl mx-auto">
              Discover RERA approved premium land plots in Mussoorie, Rishikesh, and Nainital with guaranteed legal clarity,
              stunning mountain views, and exceptional ROI potential. Starting from just ₹1,999 per sq yard with flexible EMI options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6 min-w-[200px]" onClick={() => scrollToSection('plots')}>
                Explore Available Plots
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 min-w-[200px]"
                onClick={() => scrollToSection('contact')}
              >
                Schedule Site Visit
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-accent text-xl">✓</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">RERA Approved</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-accent text-xl">⚖️</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Legal Clarity</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-accent text-xl">📈</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">High ROI</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-accent text-xl">🏆</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Award Winning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plots */}
      <section id="plots" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-balance mb-6">Featured Dehradun Plots</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Handpicked premium plots near Shimla Bypass Road with verified legal documents and ready facilities
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["All Plots", "Residential", "Investment", "Farm Land", "Near Bypass", "Ready to Build"].map((filter) => (
              <Button key={filter} variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                {filter}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Bajrang Vatika",
                price: "₹16,500/Yard",
                location: "Badripur, Dehradun",
                size: "Various Sizes Available",
                type: "Residential Project",
                features: ["24x7 Security", "Wide Roads", "Ready Facilities", "80% Business Count"],
                image: "/images/dehradun-outskirts-plots.jpg",
                priceOptions: "EMI: ₹17,500-19,000/Yard",
              },
              {
                title: "Nature Green Valley Phase 5",
                price: "₹15,500/Yard",
                location: "Ganeshpur, Dehradun",
                size: "Premium Residential Plots",
                type: "Residential Project",
                features: ["Green Parks", "Children's Play Area", "Near Schools & Hospitals", "Clean Air"],
                image: "/images/plot-mussoorie-mountain-view.jpg",
                priceOptions: "EMI: ₹16,500-18,000/Yard",
              },
              {
                title: "Friend's Colony Phase 1",
                price: "₹16,000/Yard",
                location: "Dehradun",
                size: "Family-Friendly Plots",
                type: "Residential Project",
                features: ["Smart Investment", "Excellent Connectivity", "80% Business Count", "Limited Plots"],
                image: "/images/dehradun-outskirts-plots.jpg",
                priceOptions: "EMI: ₹17,000-18,500/Yard",
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

                  <div className="p-3 bg-primary/5 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Payment Options:</div>
                    <div className="text-sm font-medium">{plot.priceOptions}</div>
                    <div className="text-xs text-muted-foreground mt-1">*Booking: 20% • Corner: +10% • Park Facing: +15%</div>
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
            <h2 className="font-serif font-black text-4xl md:text-5xl text-balance mb-6">Prime Dehradun Locations</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Discover premium plot opportunities in Dehradun's most connected and rapidly developing areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Shimla Bypass Road",
                description: "Main Connectivity Hub",
                plotsAvailable: "25+ Plots",
                priceRange: "₹35L - ₹80L",
                image: "/images/dehradun-outskirts-plots.jpg",
              },
              {
                name: "Near Mussoorie Road",
                description: "Hill Station Access",
                plotsAvailable: "15+ Plots",
                priceRange: "₹40L - ₹90L",
                image: "/images/dehradun-outskirts-plots.jpg",
              },
              {
                name: "Delhi Highway Area",
                description: "Capital Connectivity",
                plotsAvailable: "20+ Plots",
                priceRange: "₹45L - ₹1Cr",
                image: "/images/dehradun-outskirts-plots.jpg",
              },
              {
                name: "Dehradun Outskirts",
                description: "Peaceful Investment",
                plotsAvailable: "30+ Plots",
                priceRange: "₹30L - ₹70L",
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

      {/* Key Features Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-balance mb-6">
              देहरादून का कल यहीं से शुरू होता है!
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Dehradun's future starts here! Experience premium living with modern amenities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🛣️",
                title: "चौड़ी सड़कें",
                subtitle: "Wide Roads",
                description: "Well-planned infrastructure with wide roads for easy connectivity"
              },
              {
                icon: "🛡️",
                title: "24x7 सिक्यूरिटी",
                subtitle: "24x7 Security",
                description: "Round-the-clock security for complete peace of mind"
              },
              {
                icon: "🌳",
                title: "हरे-भरे पार्क",
                subtitle: "Green Parks",
                description: "Lush green parks and children's play areas for family enjoyment"
              },
              {
                icon: "🏥",
                title: "स्कूल, हॉस्पिटल पास में",
                subtitle: "Schools & Hospitals Nearby",
                description: "Educational institutions and healthcare facilities within reach"
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <div className="flex justify-center mb-4 p-3 bg-primary/10 rounded-full w-fit mx-auto">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <CardTitle className="font-serif text-lg mb-1 text-balance text-primary">{feature.title}</CardTitle>
                <p className="text-sm text-muted-foreground font-medium mb-3">{feature.subtitle}</p>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-block bg-primary/10 rounded-lg px-6 py-4 mb-6">
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">🏃‍♂️ लिमिटेड प्लॉट्स!</h3>
              <p className="text-muted-foreground">Limited plots available - Book your visit today!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Guide */}
      <section id="investment" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-balance mb-6">
              Why Invest in Dehradun Plots?
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Discover the compelling reasons to invest in legally verified plots near Shimla Bypass Road
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🛣️",
                title: "Prime Location Advantage",
                description:
                  "Shimla Bypass Road offers excellent connectivity to Mussoorie, Delhi Highway, and major Dehradun areas with peaceful surroundings",
              },
              {
                icon: "🛡️",
                title: "Verified and Secure",
                description:
                  "Every plot comes with legally verified documentation and proper titles ensuring full transparency and hassle-free investment",
              },
              {
                icon: "⚡",
                title: "Ready-to-Build Facilities",
                description:
                  "All plots include essential facilities like road access, water supply, and electricity making them ideal for immediate construction",
              },
              {
                icon: "📈",
                title: "Steady Growth Potential",
                description:
                  "Dehradun's real estate market shows consistent growth with high demand near Shimla Bypass due to infrastructure development",
              },
              {
                icon: "🏠",
                title: "Multiple Use Options",
                description:
                  "Perfect for residential homes, farmhouses, rental properties, or long-term investment with flexible usage options",
              },
              {
                icon: "🤝",
                title: "Complete Guidance",
                description:
                  "From consultation to site visits and final registration, our team provides full professional support throughout the process",
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
        </div>
      </section>

      {/* Pricing & Terms Section */}
      <section id="pricing" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-balance mb-6">Pricing & Payment Options</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Flexible payment plans starting September 2025 with transparent pricing and easy EMI options
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Pricing Table */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-center">Current Pricing (Per Square Yard)</h3>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        <th className="p-4 text-left font-medium">Project</th>
                        <th className="p-4 text-center font-medium">One Time</th>
                        <th className="p-4 text-center font-medium">3 Months EMI</th>
                        <th className="p-4 text-center font-medium">6 Months EMI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="hover:bg-muted/50">
                        <td className="p-4 font-medium">Bajrang Vatika</td>
                        <td className="p-4 text-center">₹16,500</td>
                        <td className="p-4 text-center">₹17,500</td>
                        <td className="p-4 text-center">₹19,000</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="p-4 font-medium">Nature Green Valley</td>
                        <td className="p-4 text-center">₹15,500</td>
                        <td className="p-4 text-center">₹16,500</td>
                        <td className="p-4 text-center">₹18,000</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="p-4 font-medium">Friend's Colony Phase 1</td>
                        <td className="p-4 text-center">₹16,000</td>
                        <td className="p-4 text-center">₹17,000</td>
                        <td className="p-4 text-center">₹18,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Card className="p-4 text-center bg-accent/50">
                  <div className="text-lg font-bold text-primary">Corner Plot</div>
                  <div className="text-sm text-muted-foreground">+10% Premium</div>
                </Card>
                <Card className="p-4 text-center bg-accent/50">
                  <div className="text-lg font-bold text-primary">Park Facing</div>
                  <div className="text-sm text-muted-foreground">+15% Premium</div>
                </Card>
              </div>
            </div>

            {/* Terms & Token System */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-4">Booking Terms</h3>
                <Card className="p-6">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-primary">•</span>
                      <span><strong>Booking Amount:</strong> 20% of plot value</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary">•</span>
                      <span><strong>Minimum Token:</strong> ₹11,000 to hold plot</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary">•</span>
                      <span><strong>Business Count:</strong> 80% for Bajrang Vatika & Friend's Colony</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary">•</span>
                      <span><strong>Payment:</strong> Plan days counted from Token Date</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary">•</span>
                      <span><strong>Important:</strong> Tokens are now non-refundable</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold mb-4">Token Status System</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm"><strong>RED:</strong> Less than 10% of plot value</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm"><strong>YELLOW:</strong> Minimum 10% of plot value</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm"><strong>BLUE:</strong> Minimum 25% of plot value</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm"><strong>GREEN:</strong> Registry completed</span>
                  </div>
                </div>
              </div>

              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="text-center">
                  <h4 className="font-bold text-primary mb-2">📞 Book Your Visit Today!</h4>
                  <p className="text-2xl font-bold">+91 7870231314</p>
                  <p className="text-sm text-muted-foreground mt-1">Call now for site visits and detailed information</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About Property in Uttarakhand</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We specialize in providing premium land plots in Uttarakhand's most sought-after locations. 
                With over 80% business completion rate in our featured projects, we ensure transparent 
                dealings and legal clarity for all our investors.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Legal documentation and clear titles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Prime locations near hill stations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Flexible payment options</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Proven investment growth</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/dehradun-outskirts-plots.jpg"
                alt="About Property in Uttarakhand"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Achievements & Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-balance mb-4">
              Trusted by Thousands • Certified Excellence
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Leading property developer in Uttrakhand with industry certifications and customer trust since 2020
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="text-center p-6 border-2 hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">5000+</span>
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">Happy Customers</h3>
              <p className="text-muted-foreground text-sm">Satisfied plot owners across Uttrakhand</p>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">50+</span>
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">Prime Projects</h3>
              <p className="text-muted-foreground text-sm">RERA approved developments completed</p>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">100%</span>
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">Legal Clarity</h3>
              <p className="text-muted-foreground text-sm">All plots with clear titles and documentation</p>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">4.8★</span>
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">Customer Rating</h3>
              <p className="text-muted-foreground text-sm">Based on 2500+ verified reviews</p>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="font-serif font-bold text-2xl text-center mb-8">Our Certifications & Awards</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary text-2xl">🏅</span>
                </div>
                <p className="text-sm font-medium">RERA Registered</p>
                <p className="text-xs text-muted-foreground">UP-RERA-2024-001</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary text-2xl">📜</span>
                </div>
                <p className="text-sm font-medium">ISO 9001:2015</p>
                <p className="text-xs text-muted-foreground">Quality Management</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary text-2xl">🏆</span>
                </div>
                <p className="text-sm font-medium">Best Developer</p>
                <p className="text-xs text-muted-foreground">Uttrakhand 2024</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary text-2xl">🔒</span>
                </div>
                <p className="text-sm font-medium">Legal Compliance</p>
                <p className="text-xs text-muted-foreground">100% Verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Invest in Your Future?</h2>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-10">
            Don't miss out on this incredible opportunity to own a piece of Dehradun's serene beauty. 
            Secure your future with a premium plot today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
              onClick={() => window.open('tel:+917870231314', '_self')}
            >
              📞 Call +91 7870231314
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary shadow-lg"
              onClick={() => window.open('https://maps.google.com/?q=Badripur+Ganeshpur+Dehradun', '_blank')}
            >
              📍 Visit Our Plots
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}