"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import Link from 'next/link'

export function FloatingActions() {
  return (
    <>
      {/* WhatsApp Button - Left Side */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white shadow-xl rounded-full w-16 h-16 p-0 transition-all duration-300 transform hover:scale-110"
          onClick={() => window.open('https://wa.me/917870231314?text=Hi, I want to know about properties in Uttarakhand', '_blank')}
          title="WhatsApp Us"
        >
          <SiWhatsapp className="h-6 w-6" />
        </Button>
      </div>

      {/* Chatbot Button - Right Side */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/chatbot">
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white shadow-xl rounded-full w-16 h-16 p-0 transition-all duration-300 transform hover:scale-110"
            title="Chat Assistant"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </>
  )
}