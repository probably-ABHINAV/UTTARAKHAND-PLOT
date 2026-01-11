
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
    <div className="min-h-screen bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-[#FF6B35]/60 to-[#FF6B35]/60 bg-clip-text text-transparent">
              Property Assistant
            </h1>
            <p className="text-gray-600 text-lg">
              Get instant answers about plots, pricing, and locations in Uttarakhand
            </p>
          </div>

          <Card className="h-[600px] flex flex-col bg-white shadow-xl">
            {/* Chat Header */}
            <div className="p-4 border-b bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white rounded-t-lg">
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
                    <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-[#FF6B35] text-white rounded-br-sm'
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
                  <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
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
                  className="bg-[#FF6B35] hover:bg-[#F7931E]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <Button 
              className="p-4 h-auto flex-col gap-2 bg-[#F7931E] hover:bg-[#FF6B35]"
              onClick={() => window.open('https://wa.me/917870231314', '_blank')}
            >
              <Phone className="h-6 w-6" />
              <span>Call Now</span>
            </Button>
            <Button 
              className="p-4 h-auto flex-col gap-2 bg-[#FF6B35] hover:bg-[#F7931E]"
              onClick={() => window.location.href = '/locations'}
            >
              <MapPin className="h-6 w-6" />
              <span>View Locations</span>
            </Button>
            <Button 
              className="p-4 h-auto flex-col gap-2 bg-[#F7931E] hover:bg-[#FF6B35]"
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

      <SiteFooter />
    </div>
  )
}
