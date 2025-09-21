import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Bot, Phone, Mail, HelpCircle, Shield, Users, CreditCard, Home } from "lucide-react"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help & Support - Property in Uttarakhand | Virtual Assistant",
  description: "Get instant answers to your property questions with our virtual assistant. Learn about our services, processes, and how we help you invest in Uttarakhand real estate.",
  keywords: "property help, real estate assistant, Uttarakhand property support, investment guidance",
}

const chatbotData = [
  {
    id: "1",
    question: "What makes PropertyInUttrakhand.com different from other real estate companies?",
    answer: "Unlike many dealers who focus only on selling, we focus on building trust and long-term value. Every property listed with us is verified for clear titles and legal approvals. We provide detailed documentation, transparent pricing, and full buyer support from site visit to registration. Plus, we continue to assist even after purchase - whether it's resale, renting, or property management.",
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    category: "Trust & Quality"
  },
  {
    id: "2",
    question: "I'm worried about hidden charges. Do you really keep pricing transparent?",
    answer: "Absolutely. Transparency is our core value. The price we quote includes the actual property cost and development charges. The only additional costs are standard government fees like stamp duty, registration, or taxes - which we explain clearly in advance. There are no surprise charges or hidden fees.",
    icon: <CreditCard className="h-6 w-6 text-green-600" />,
    category: "Pricing & Transparency"
  },
  {
    id: "3",
    question: "Can Non-Resident Indians (NRIs) buy property through your portal?",
    answer: "Yes! Many of our clients are NRIs. We handle the process remotely by sharing verified documents, video walkthroughs, and digital support. We also help with Power of Attorney, legal compliance, and registration formalities. This way, even if you're abroad, you can invest in Uttarakhand real estate with complete confidence.",
    icon: <Users className="h-6 w-6 text-purple-600" />,
    category: "NRI Services"
  },
  {
    id: "4",
    question: "How secure are your properties in terms of future disputes?",
    answer: "Very secure. We don't list any property unless it is thoroughly vetted by our legal experts. This includes checking ownership history, approval from local authorities, and ensuring the property is free of encumbrances, disputes, or claims. Buyers receive copies of all relevant documents, so there's full transparency and zero risk of future complications.",
    icon: <Shield className="h-6 w-6 text-red-600" />,
    category: "Legal Security"
  },
  {
    id: "5",
    question: "Do you offer support with financing or home loans?",
    answer: "Yes, we understand financing is a big part of property purchase. We work closely with trusted banks and financial institutions to help buyers get loans. Our team assists with the paperwork and makes sure the process is smooth, fast, and stress-free. This way, you don't have to struggle alone with bank procedures.",
    icon: <Home className="h-6 w-6 text-orange-600" />,
    category: "Financing Support"
  }
]

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600/20 via-green-400/10 to-purple-600/20">
        <div className="container mx-auto px-4 text-center">
          <Bot className="mx-auto h-16 w-16 text-blue-600 mb-6" />
          <h1 className="font-bold text-5xl md:text-6xl mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Property Assistant
          </h1>
          <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed mb-8">
            Get instant answers to your property questions. Our virtual assistant provides detailed information 
            about services, processes, and how we can help you invest in Uttarakhand real estate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-blue-500 text-white px-4 py-2 text-sm">Instant Responses</Badge>
            <Badge className="bg-green-500 text-white px-4 py-2 text-sm">Expert Knowledge</Badge>
            <Badge className="bg-purple-500 text-white px-4 py-2 text-sm">24/7 Available</Badge>
          </div>
        </div>
      </section>

      {/* Chatbot Interface Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 mb-8">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                  <MessageCircle className="inline mr-3 h-8 w-8 text-blue-600" />
                  Ask Our Virtual Assistant
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Get detailed answers to common concerns about our services and processes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {chatbotData.map((chat) => (
                    <Card key={chat.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-gray-100 p-3 rounded-full flex-shrink-0">
                            {chat.icon}
                          </div>
                          <div className="flex-1">
                            <Badge variant="outline" className="mb-2 text-xs">
                              {chat.category}
                            </Badge>
                            <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
                              {chat.question}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="ml-16">
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <p className="text-gray-700 leading-relaxed">
                              {chat.answer}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-3xl mb-6 text-gray-800">
              Need More Help?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Our virtual assistant covers the most common questions. For personalized assistance or specific property inquiries, connect with our expert team.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Phone className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm mb-4">Speak directly with our property experts</p>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  asChild
                >
                  <a href="tel:+917870231314">
                    +91 7870 231 314
                  </a>
                </Button>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Mail className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm mb-4">Send detailed questions and requirements</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-50"
                  asChild
                >
                  <Link href="/contact">
                    Send Message
                  </Link>
                </Button>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <HelpCircle className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">FAQ</h3>
                <p className="text-gray-600 text-sm mb-4">Browse comprehensive FAQ section</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  asChild
                >
                  <Link href="/faq">
                    View FAQs
                  </Link>
                </Button>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 rounded-lg text-white">
              <h3 className="font-bold text-2xl mb-4">Ready to Start Your Property Journey?</h3>
              <p className="mb-6 opacity-90">
                Explore our verified plots in Uttarakhand's most beautiful locations. Get started with legal clarity and expert guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/plots">
                    View Available Plots
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/calculator">
                    Investment Calculator
                  </Link>
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