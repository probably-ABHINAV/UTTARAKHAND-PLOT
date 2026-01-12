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
import { Textarea } from "@/components/ui/textarea"
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
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Calendar,
  CheckCircle,
  Headphones,
  Navigation,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  HelpCircle
} from "lucide-react"

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    plotInterest: "",
    budget: "",
    message: "",
    preferredContact: "phone"
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!contactForm.name || !contactForm.phone) {
      toast({
        title: "Missing Information",
        description: "Please enter your Name and Phone Number.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request Received!",
        description: "Our team will contact you within 24 hours."
      })

      setContactForm({
        name: "",
        phone: "",
        email: "",
        subject: "",
        plotInterest: "",
        budget: "",
        message: "",
        preferredContact: "phone"
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone / WhatsApp",
      description: "Immediate assistance",
      action: "+91 7870231314",
      href: "tel:+917870231314",
      bgClass: "bg-blue-50 text-blue-600",
      available: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your queries",
      action: "info@property.com",
      href: "mailto:info@propertyinuttarakhand.com",
      bgClass: "bg-orange-50 text-orange-600",
      available: "Response < 6 hrs"
    },
    {
      icon: MapPin,
      title: "Visit Offices",
      description: "Dehradun Centers",
      action: "Badripur & Ganeshpur",
      href: "#office",
      bgClass: "bg-green-50 text-green-600",
      available: "Mon-Sat 9AM-7PM"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with experts",
      action: "Start WhatsApp",
      href: "https://wa.me/917870231314",
      bgClass: "bg-purple-50 text-purple-600",
      available: "Instant Response"
    }
  ]

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
  ]

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
             <MessageSquare className="mr-2 h-3 w-3" /> We'd love to hear from you
          </Badge>
          <h1 className="font-extrabold text-5xl md:text-7xl mb-6 tracking-tight">
            Get in <span className="font-extrabold text-5xl md:text-7xl mb-6 tracking-tight">Touch</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to start your property investment journey? Our experienced team is here to help you find the perfect plot in Uttarakhand.
          </p>
        </div>
      </section>

      {/* --- CONTACT METHODS GRID --- */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20">
            {contactMethods.map((method, index) => (
              <Card key={index} className="group hover-lift border-0 shadow-lg relative overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${method.bgClass} group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">{method.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/20 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => window.open(method.href, method.href.startsWith('http') ? '_blank' : '_self')}
                  >
                    {method.title === "Phone / WhatsApp" ? "Call Now" : "Connect"}
                  </Button>
                  
                  <div className="mt-4 pt-4 border-t border-border/50 text-xs font-medium flex items-center justify-center text-primary">
                    <Clock className="h-3 w-3 mr-1.5" /> {method.available}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT (Split Layout) --- */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* LEFT: Contact Form */}
            <div className="lg:col-span-7">
              <Card className="border-border shadow-md h-full">
                <CardHeader className="pb-6 border-b border-border/50 bg-muted/20">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Send className="h-6 w-6 text-primary" />
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-8">
                  <form onSubmit={submitContactForm} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          placeholder="John Doe"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-muted/30 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number <span className="text-red-500">*</span></Label>
                        <Input
                          placeholder="+91 98765..."
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="bg-muted/30 focus-visible:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <Label>Email Address</Label>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                            className="bg-muted/30 focus-visible:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Subject</Label>
                          <Select
                            value={contactForm.subject}
                            onValueChange={(value) => setContactForm(prev => ({ ...prev, subject: value }))}
                          >
                            <SelectTrigger className="bg-muted/30 focus:ring-primary">
                              <SelectValue placeholder="Select Inquiry Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="plot-inquiry">Plot Inquiry</SelectItem>
                              <SelectItem value="site-visit">Site Visit Request</SelectItem>
                              <SelectItem value="investment">Investment Advice</SelectItem>
                              <SelectItem value="legal">Legal/Docs Help</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Interested Location</Label>
                        <Select
                          value={contactForm.plotInterest}
                          onValueChange={(value) => setContactForm(prev => ({ ...prev, plotInterest: value }))}
                        >
                          <SelectTrigger className="bg-muted/30 focus:ring-primary">
                            <SelectValue placeholder="Select Location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="badripur">Badripur</SelectItem>
                            <SelectItem value="ganeshpur">Ganeshpur</SelectItem>
                            <SelectItem value="sundarpur">Sundarpur</SelectItem>
                            <SelectItem value="other">Other / Not Decided</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Budget Range</Label>
                        <Select
                          value={contactForm.budget}
                          onValueChange={(value) => setContactForm(prev => ({ ...prev, budget: value }))}
                        >
                          <SelectTrigger className="bg-muted/30 focus:ring-primary">
                            <SelectValue placeholder="Select Budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15-25">₹15-25 Lakhs</SelectItem>
                            <SelectItem value="25-40">₹25-40 Lakhs</SelectItem>
                            <SelectItem value="40-60">₹40-60 Lakhs</SelectItem>
                            <SelectItem value="60+">₹60+ Lakhs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Your Message</Label>
                      <Textarea
                        placeholder="Tell us about your requirements, timeline, or specific questions..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="bg-muted/30 min-h-[150px] focus-visible:ring-primary resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-lg h-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT: Sidebar Info */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Office Hours */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" /> Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">{schedule.day}</span>
                        <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">
                          {schedule.hours}
                        </Badge>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center text-sm pt-2">
                       <span className="font-semibold text-red-500 flex items-center gap-2">
                          <Headphones className="h-4 w-4" /> Emergency
                       </span>
                       <span className="font-bold">24/7 Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-white/80">Fast track your investment journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={() => window.open('https://wa.me/917870231314?text=Site Visit', '_blank')}
                  >
                    <Calendar className="mr-3 h-4 w-4" /> Schedule Site Visit
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={() => window.location.href = '/calculator'}
                  >
                    <CheckCircle className="mr-3 h-4 w-4" /> Investment Calculator
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={() => window.location.href = '/plots'}
                  >
                    <Navigation className="mr-3 h-4 w-4" /> Browse Plots
                  </Button>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="flex gap-4 justify-center">
                      {[
                        { icon: Facebook, color: "text-blue-600", link: "#" },
                        { icon: Instagram, color: "text-pink-600", link: "#" },
                        { icon: Youtube, color: "text-red-600", link: "#" },
                      ].map((social, i) => (
                         <Button key={i} variant="outline" size="icon" className="h-12 w-12 rounded-full hover:bg-muted" onClick={() => window.open(social.link)}>
                            <social.icon className={`h-6 w-6 ${social.color}`} />
                         </Button>
                      ))}
                   </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* --- MINI FAQ --- */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl mb-4">Common Questions</h2>
            <p className="text-muted-foreground">Quick answers before you reach out.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
             {[
               { q: "How do I book a site visit?", a: "Simply call us or use the WhatsApp button to pick a date." },
               { q: "Are documents verified?", a: "Yes, 100% legal clarity on all our listed plots." },
               { q: "Can I get a loan?", a: "We partner with major banks to assist with financing." },
               { q: "What are the office hours?", a: "Mon-Sat, 9 AM to 7 PM. Sundays by appointment." },
               { q: "Do you charge brokerage?", a: "No, we are direct developers/partners for most projects." },
               { q: "Is price negotiable?", a: "We offer best market rates, but some flexibility exists for upfront payments." },
             ].map((faq, i) => (
               <Card key={i} className="border-0 shadow-sm bg-background">
                  <CardContent className="p-6">
                     <h4 className="font-bold text-foreground flex items-start gap-2 mb-2">
                        <HelpCircle className="h-5 w-5 text-secondary shrink-0" /> {faq.q}
                     </h4>
                     <p className="text-sm text-muted-foreground pl-7">{faq.a}</p>
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
