"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function LocationMap() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl mb-4 text-gray-800">
            Our Prime Location
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Strategically located in the heart of Uttarakhand's most developing areas, 
            our plots offer excellent connectivity and future growth potential.
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <MapPin className="h-6 w-6 text-blue-600" />
              Property Locations Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-96 rounded-b-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.7234567890123!2d77.750105!3d30.402437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI0JzA4LjgiTiA3N8KwNDUnMDAuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Locations in Uttarakhand"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            📍 Coordinates: 30.402437°N, 77.750105°E
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Perfect location with excellent connectivity to major roads and amenities
          </p>
        </div>
      </div>
    </section>
  )
}