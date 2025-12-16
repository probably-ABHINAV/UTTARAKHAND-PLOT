"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
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
  Building
} from "lucide-react"

const teamMembers = [
  {
    name: "------",
    position: "Founder & CEO",
    experience: "15+ Years",
    expertise: "Property Development & Investment",
    description: "Leading property developer in Uttarakhand with deep knowledge of hill station markets."
  },
  {
    name: "------", 
    position: "Head of Sales",
    experience: "10+ Years",
    expertise: "Customer Relations & Sales",
    description: "Expert in helping families find their perfect plot with personalized guidance."
  },
  {
    name: "------",
    position: "Legal Advisor",
    experience: "12+ Years", 
    expertise: "Property Law & Documentation",
    description: "Ensures all properties have clear titles and legal compliance."
  }
]

const achievements = [
  {
    icon: Users,
    number: "5000+",
    label: "Happy Customers",
    description: "Families who found their dream plots"
  },
  {
    icon: Building,
    number: "50+",
    label: "Premium Projects",
    description: "Across Uttarakhand's best locations"
  },
  {
    icon: Shield,
    number: "100%",
    label: "Legal Clarity",
    description: "All properties with clear titles"
  },
  {
    icon: Star,
    number: "4.8",
    label: "Customer Rating",
    description: "Based on verified reviews"
  }
]

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "Complete transparency in all our dealings with clear documentation and honest pricing."
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We guide you through every step of your investment journey."
  },
  {
    icon: Target,
    title: "Quality Locations",
    description: "We handpick only the best locations with excellent growth potential and connectivity."
  },
  {
    icon: Zap,
    title: "Quick Service",
    description: "Fast processing, quick approvals, and efficient customer service for all your needs."
  }
]

/**
 * NOTE:
 * This file relies on CSS variables defined in your global stylesheet:
 * --primary   -> orange (e.g. #FF7A00)
 * --secondary -> green  (e.g. #C6EC2A)
 *
 * Make sure `app/globals.css` or `:root` contains those variables.
 */

export default function AboutPage() {
  // reusable gradient style using CSS variables
  const themeGradient = {
    background: "linear-gradient(90deg, var(--primary), var(--secondary))",
  } as React.CSSProperties

  const themeGradientReversed = {
    background: "linear-gradient(90deg, var(--secondary), var(--primary))",
  } as React.CSSProperties

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background, #fff)" }}>
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24" style={{ background: "linear-gradient(180deg, rgba(255,122,0,0.06), rgba(198,236,42,0.03))" }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-bold text-5xl md:text-6xl mb-6" style={{ color: "var(--foreground, #272211)" }}>
            About Property in Uttarakhand
          </h1>
          <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed mb-8" style={{ color: "var(--muted-foreground, #7a5a2a)" }}>
            Your trusted partner for premium land plots in Uttarakhand's most beautiful hill stations. 
            With over 15 years of experience, we specialize in legal clarity, prime locations, and exceptional growth potential.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-[var(--color-card, #fff)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-bold text-4xl mb-6" style={{ color: "var(--foreground, #272211)" }}>Our Story</h2>
                <div className="space-y-4 leading-relaxed" style={{ color: "var(--muted-foreground, #7a5a2a)" }}>
                  <p className="text-lg">
                    Property in Uttarakhand is your trusted real estate partner dedicated to helping you find the perfect land, plots, and properties across the most promising locations in Uttarakhand. We specialize in offering affordable, legally verified, and investment-worthy plots that fit every budget - whether you’re looking for a peaceful residential site or a high-return investment opportunity.
                  </p>
                  <p>
                    With years of experience in the real estate industry, we understand that buying property isn’t just a transaction - it’s an emotional and financial milestone. That’s why our focus is on transparency, trust, and customer satisfaction. From the first consultation to the final registration, our team ensures a smooth, secure, and hassle-free experience for every client.
                  </p>
                  <p>
                    At Property in Uttarakhand, we take pride in our honest guidance, clear documentation, and ethical business practices. Our aim is not just to sell plots, but to build long-term relationships and help you make the best decision for your future.
                    Whether you’re planning to build your dream home, invest in growing areas like Friends Colony Phase 1 or Bajrang Vatika, or simply want expert advice - we’re here to guide you every step of the way.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Badge className="px-4 py-2 text-sm" style={{ background: "var(--primary)", color: "white" }}>Est. 2008</Badge>
                  <Badge className="px-4 py-2 text-sm" style={{ background: "var(--primary)", color: "white" }}>15+ Years Experience</Badge>
                  <Badge className="px-4 py-2 text-sm" style={{ background: "var(--secondary)", color: "black" }}>5000+ Happy Customers</Badge>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/dehradun-outskirts-plots.jpg"
                  alt="Our Journey"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-[var(--color-card, #fff)] p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold" style={{ color: "var(--primary)" }}>15+</div>
                  <div className="text-sm" style={{ color: "var(--muted-foreground, #7a5a2a)" }}>Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16" style={{ background: "var(--color-muted, #fff7ef)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-4xl mb-6" style={{ color: "var(--foreground)" }}>Our Core Values</h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
              The principles that guide everything we do and shape our relationships with customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={themeGradient}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3" style={{ color: "var(--foreground)" }}>{value.title}</h3>
                <p className="leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16" style={themeGradient}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-4xl mb-6" style={{ color: "white" }}>Our Achievements</h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "rgba(255,255,255,0.9)" }}>
              Milestones that reflect our commitment to excellence and customer satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-8 bg-white/10 backdrop-blur-sm border-0 hover:bg-white/20 transition-all duration-300">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <achievement.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: "white" }}>{achievement.number}</div>
                <div className="text-xl font-semibold mb-2" style={{ color: "white" }}>{achievement.label}</div>
                <p style={{ color: "rgba(255,255,255,0.9)" }}>{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-[var(--color-card, #fff)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-4xl mb-6" style={{ color: "var(--foreground)" }}>Meet Our Team</h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
              Experienced professionals dedicated to helping you find your perfect property investment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={themeGradientReversed}>
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2" style={{ color: "var(--foreground)" }}>{member.name}</h3>
                <Badge className="mb-3" style={{ background: "var(--primary)", color: "white" }}>{member.position}</Badge>
                <div className="space-y-2 text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    {member.experience}
                  </div>
                  <div className="font-medium" style={{ color: "var(--primary)" }}>{member.expertise}</div>
                </div>
                <p style={{ color: "var(--muted-foreground)" }}>{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16" style={{ background: "var(--color-muted, #fff7ef)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-4xl mb-6" style={{ color: "var(--foreground)" }}>Why Choose Us?</h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
              What sets us apart as Uttarakhand's trusted property developer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Legal Guarantee",
                description: "100% legal clarity with clear titles and proper documentation. All our properties are verified and dispute-free."
              },
              {
                icon: MapPin,
                title: "Prime Locations",
                description: "Handpicked locations in Uttarakhand's most beautiful and fast-growing areas with excellent connectivity."
              },
              {
                icon: TrendingUp,
                title: "High Returns",
                description: "Proven track record of 25-45% annual appreciation in property values across our projects."
              },
              {
                icon: Users,
                title: "Customer Support",
                description: "Dedicated customer support team available 24/7 to assist you throughout your investment journey."
              },
              {
                icon: Award,
                title: "Industry Recognition",
                description: "Award-winning developer recognized for excellence in customer service and project delivery."
              },
              {
                icon: CheckCircle,
                title: "Proven Track Record",
                description: "15+ years of successful project delivery with thousands of satisfied customers across India."
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(90deg,var(--secondary),var(--primary))" }}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3" style={{ color: "var(--foreground)" }}>{feature.title}</h3>
                <p style={{ color: "var(--muted-foreground)" }}>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16" style={themeGradient}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-bold text-4xl mb-6" style={{ color: "white" }}>Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90" style={{ color: "rgba(255,255,255,0.95)" }}>
            Get in touch with our experienced team to find your perfect plot in Uttarakhand's beautiful hill stations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="text-xl px-8 py-4 shadow-xl"
              style={{ background: "white", color: "var(--primary)" }}
              onClick={() => window.open('tel:+917870231314', '_self')}
            >
              <Phone className="mr-2 h-6 w-6" />
              Call Us Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-xl px-8 py-4"
              style={{ border: "2px solid rgba(255,255,255,0.9)", color: "white" }}
              onClick={() => window.open('mailto:info@propertyinuttarakhand.com', '_self')}
            >
              <Mail className="mr-2 h-6 w-6" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
