"use client"

import Image from "next/image"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Icons
import { 
  Award, 
  Users, 
  Shield, 
  TrendingUp, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Star,
  Phone,
  Mail,
  Heart,
  Target,
  Zap,
  Building,
  ArrowRight
} from "lucide-react"

// --- DATA ---
const teamMembers = [
  {
    name: "Founder Name", // Replace with actual name
    position: "Founder & CEO",
    experience: "15+ Years",
    expertise: "Development Strategy",
    description: "Leading property developer in Uttarakhand with deep knowledge of hill station markets."
  },
  {
    name: "Sales Head", // Replace with actual name
    position: "Head of Sales",
    experience: "10+ Years",
    expertise: "Customer Relations",
    description: "Expert in helping families find their perfect plot with personalized guidance."
  },
  {
    name: "Legal Expert", // Replace with actual name
    position: "Legal Advisor",
    experience: "12+ Years", 
    expertise: "Property Law",
    description: "Ensures all properties have clear titles, valid mutations, and 100% legal compliance."
  }
]

const achievements = [
  {
    icon: Users,
    number: "5,000+",
    label: "Happy Families",
    description: "Found their dream home"
  },
  {
    icon: Building,
    number: "50+",
    label: "Projects Delivered",
    description: "Across prime locations"
  },
  {
    icon: Shield,
    number: "100%",
    label: "Legal Clarity",
    description: "Dispute-free records"
  },
  {
    icon: Star,
    number: "4.8",
    label: "Customer Rating",
    description: "Verified reviews"
  }
]

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "We believe in zero hidden clauses. Every document is shared upfront for your complete peace of mind."
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your investment safety is our priority. We guide you through every step, from site visit to registry."
  },
  {
    icon: Target,
    title: "Prime Locations",
    description: "We don't just sell land; we sell growth. Every location is handpicked for high appreciation potential."
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Streamlined documentation and quick approvals ensure you become a property owner without delays."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative py-24 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm shadow-sm">
             Est. 2008 • 15+ Years of Trust
          </Badge>
          <h1 className="font-extrabold text-5xl md:text-6xl mb-6 tracking-tight text-foreground">
            Building Trust in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Devbhoomi</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
            Your trusted partner for premium land plots in Uttarakhand's most beautiful hill stations. 
            We specialize in legal clarity, prime locations, and exceptional growth potential.
          </p>
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  <strong>Property in Uttarakhand</strong> began with a simple mission: to make land investment in the hills transparent, safe, and accessible. We specialize in offering affordable, legally verified plots that fit every budget—whether for a holiday home or a high-return investment.
                </p>
                <p>
                  Buying property is both an emotional and financial milestone. That’s why our focus is on <strong>trust</strong>. From the first consultation to the final registration, our team ensures a smooth, secure, and hassle-free experience.
                </p>
                <p>
                  We take pride in our honest guidance and ethical business practices. We don't just sell plots; we build relationships.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-border shadow-sm">
                   <Shield className="text-primary h-5 w-5" />
                   <span className="font-medium">RERA Compliant</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-border shadow-sm">
                   <CheckCircle className="text-secondary h-5 w-5" />
                   <span className="font-medium">Clear Titles</span>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-lg" />
              <Image
                src="/images/dehradun-outskirts-plots.jpg"
                alt="Our Journey"
                width={600}
                height={400}
                className="relative w-full h-[400px] object-cover rounded-2xl shadow-2xl border-4 border-white"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-border animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="text-4xl font-extrabold text-primary">15+</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Years Excellence</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do and shape our relationships with customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover-lift border-border shadow-sm text-center p-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <value.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- ACHIEVEMENTS BANNER --- */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative Background Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {achievements.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-extrabold text-white">{item.number}</div>
                <div className="font-semibold text-white/90 text-lg">{item.label}</div>
                <p className="text-sm text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Experts</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experienced professionals dedicated to helping you make the right investment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover-lift border-0 shadow-lg bg-background overflow-hidden text-center">
                <div className="h-32 bg-gradient-to-r from-primary/10 to-secondary/10 relative">
                   <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 p-1 bg-background rounded-full">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-border overflow-hidden">
                         <Users className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                   </div>
                </div>
                <CardContent className="pt-16 pb-8">
                  <h3 className="font-bold text-xl mb-1 text-foreground">{member.name}</h3>
                  <Badge variant="secondary" className="mb-4">{member.position}</Badge>
                  
                  <div className="flex justify-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" /> {member.experience}
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-secondary" /> {member.expertise}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm px-4">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern-grid.png')] opacity-10"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Connect with our team today to view our exclusive inventory of verified plots in Dehradun and Rishikesh.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 font-bold text-lg h-14 px-8 shadow-lg"
                  onClick={() => window.open('tel:+917870231314', '_self')}
                >
                  <Phone className="mr-2 h-5 w-5" /> Call Us Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg"
                  onClick={() => window.open('mailto:info@propertyinuttarakhand.com', '_self')}
                >
                  <Mail className="mr-2 h-5 w-5" /> Email Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}