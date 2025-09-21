<<<<<<< Updated upstream
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
=======

"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { Send, Bot, User, Phone, MapPin, Calculator, Home } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  quickReplies?: string[]
}

const botResponses: Record<string, { text: string, quickReplies?: string[] }> = {
  'hello': {
    text: "Hello! Welcome to PropertyInUttarakhand.com. I'm your property assistant. I can help you find the perfect plot in Uttarakhand. How can I assist you today?",
    quickReplies: ["Show available plots", "Tell me about locations", "Calculate investment", "Contact details"]
  },
  'hi': {
    text: "Hi there! I'm here to help you find your dream property in the beautiful state of Uttarakhand. What would you like to know?",
    quickReplies: ["Available plots", "Pricing information", "Site visit", "Legal documents"]
  },
  'plots': {
    text: "We have premium residential plots available in:\n• Bajrang Vatika Premium (Badripur) - ₹25-45 Lakhs\n• Nature Green Valley Phase 5 (Ganeshpur) - ₹18-32 Lakhs\n• Friend's Colony Phase 1 (Dehradun) - ₹15-28 Lakhs\n\nWhich location interests you?",
    quickReplies: ["Dehradun plots", "Price details", "Schedule visit", "Investment calculator"]
  },
  'locations': {
    text: "Our properties are located in prime areas:\n🏔️ Dehradun Outskirts - Excellent connectivity\n🏞️ Rishikesh Region - Spiritual tourism hub\n🏔️ Nainital Area - Hill station beauty\n⛰️ Mussoorie Hills - Premium mountain views\n\nWhich location would you like to explore?",
    quickReplies: ["Dehradun details", "Rishikesh plots", "Nainital properties", "Mussoorie hills"]
  },
  'price': {
    text: "Our plot prices range from ₹15 Lakhs to ₹80 Lakhs depending on location and size:\n• Budget Range: ₹15-28 Lakhs (Dehradun)\n• Mid Range: ₹20-50 Lakhs (Rishikesh/Nainital)\n• Premium Range: ₹30-80 Lakhs (Mussoorie)\n\nAll plots come with clear titles and basic infrastructure.",
    quickReplies: ["EMI calculator", "Site visit", "Legal verification", "Contact agent"]
  },
  'contact': {
    text: "You can reach us through:\n📱 Phone/WhatsApp: 7870231314\n📧 Email: info@propertyinuttarakhand.com\n📍 Office: Badripur & Ganeshpur, Dehradun\n\nOur team is available 24/7 for assistance!",
    quickReplies: ["Call now", "WhatsApp", "Schedule meeting", "Email query"]
  },
  'investment': {
    text: "Uttarakhand properties offer excellent investment potential:\n📈 25-45% annual appreciation\n🏗️ Growing infrastructure development\n🏔️ Tourism boom increasing demand\n💰 Strong rental yields\n\nWould you like to calculate potential returns?",
    quickReplies: ["Calculate returns", "Show growth data", "Compare locations", "Risk factors"]
  },
  'legal': {
    text: "All our properties come with:\n✅ Clear and marketable titles\n✅ Government approvals\n✅ Compliance certificates\n✅ Complete documentation\n✅ Registration assistance\n\nWe ensure 100% legal transparency!",
    quickReplies: ["Document checklist", "Registration process", "Legal costs", "Expert consultation"]
  },
  'default': {
    text: "I understand you're interested in properties in Uttarakhand. Let me help you with that! I can provide information about available plots, pricing, locations, investment potential, and legal documentation.",
    quickReplies: ["Show me plots", "Pricing info", "Best locations", "Contact details"]
  }
}

const quickStartQuestions = [
  "What plots are available?",
  "Tell me about Dehradun properties",
  "What are the prices?",
  "How to schedule site visit?",
  "Investment calculator",
  "Contact information"
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hello! I'm your PropertyInUttarakhand.com assistant. I'm here to help you find the perfect plot in Uttarakhand. Ask me anything about our properties, prices, locations, or legal processes!",
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: ["Show available plots", "Tell me about locations", "Contact information", "Investment guidance"]
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): { text: string, quickReplies?: string[] } => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('hello') || message.includes('hi')) {
      return botResponses['hello']
    } else if (message.includes('plot') || message.includes('property') || message.includes('available')) {
      return botResponses['plots']
    } else if (message.includes('location') || message.includes('area') || message.includes('place')) {
      return botResponses['locations']
    } else if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
      return botResponses['price']
    } else if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
      return botResponses['contact']
    } else if (message.includes('investment') || message.includes('return') || message.includes('profit')) {
      return botResponses['investment']
    } else if (message.includes('legal') || message.includes('document') || message.includes('title')) {
      return botResponses['legal']
    } else if (message.includes('dehradun')) {
      return {
        text: "Dehradun outskirts offer excellent opportunities:\n🏘️ Bajrang Vatika Premium - ₹25-45L (Badripur)\n🌿 Nature Green Valley - ₹18-32L (Ganeshpur)\n🏡 Friend's Colony - ₹15-28L\n\nGreat connectivity and infrastructure development!",
        quickReplies: ["Dehradun site visit", "Price breakdown", "Amenities", "Call agent"]
      }
    } else if (message.includes('rishikesh')) {
      return {
        text: "Rishikesh region properties (₹20-50L):\n🕉️ Spiritual tourism hub\n🏞️ Ganga proximity\n🧘‍♀️ Yoga centers nearby\n📈 42% growth potential\n\nIdeal for tourism business or peaceful living!",
        quickReplies: ["Rishikesh plots", "Tourism potential", "Book visit", "Investment calculation"]
      }
    }
    
    return botResponses['default']
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim()
    if (!textToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(textToSend)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: botResponse.quickReplies
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Property Assistant
            </h1>
            <p className="text-gray-600 text-lg">
              Get instant answers about plots, pricing, and locations in Uttarakhand
            </p>
          </div>

          <Card className="h-[600px] flex flex-col bg-white shadow-xl">
            {/* Chat Header */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">PropertyInUttarakhand Assistant</h3>
                  <p className="text-sm opacity-90">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.text}</p>
                    </div>
                    
                    {message.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs hover:bg-blue-50"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white text-gray-800 p-3 rounded-lg rounded-bl-sm shadow-sm border">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Start Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t bg-gray-50">
                <p className="text-sm text-gray-600 mb-3">Quick questions to get started:</p>
                <div className="flex flex-wrap gap-2">
                  {quickStartQuestions.slice(0, 4).map((question, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuickReply(question)}
                      className="text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me about plots, prices, locations..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <Button 
              className="p-4 h-auto flex-col gap-2 bg-green-500 hover:bg-green-600"
              onClick={() => window.open('https://wa.me/917870231314', '_blank')}
            >
              <Phone className="h-6 w-6" />
              <span>Call Now</span>
            </Button>
            <Button 
              className="p-4 h-auto flex-col gap-2 bg-blue-500 hover:bg-blue-600"
              onClick={() => window.location.href = '/locations'}
            >
              <MapPin className="h-6 w-6" />
              <span>View Locations</span>
            </Button>
            <Button 
              className="p-4 h-auto flex-col gap-2 bg-purple-500 hover:bg-purple-600"
              onClick={() => window.location.href = '/calculator'}
            >
              <Calculator className="h-6 w-6" />
              <span>Investment Calculator</span>
            </Button>
            <Button 
              className="p-4 h-auto flex-col gap-2 bg-orange-500 hover:bg-orange-600"
              onClick={() => window.location.href = '/plots'}
            >
              <Home className="h-6 w-6" />
              <span>View Plots</span>
            </Button>
          </div>
        </div>
      </div>
>>>>>>> Stashed changes

      <SiteFooter />
    </div>
  )
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
