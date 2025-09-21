<<<<<<< Updated upstream
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
=======

"use client"

import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '500px'
}

// Using the coordinates you provided: 30.402437, 77.750105
const center = {
  lat: 30.402437,
  lng: 77.750105
}

const locations = [
  { lat: 30.3280, lng: 78.0400, title: "Badripur" },
  { lat: 30.3350, lng: 78.0450, title: "Ganeshpur" },
  { lat: 30.402437, lng: 77.750105, title: "Dehradun Outskirts" }
]

export function LocationMap() {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-bold text-5xl md:text-6xl mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Prime Locations Across Uttarakhand
        </h2>
        <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed mb-12">
          Discover the geographical spread and key areas where we offer premium plots across the beautiful state of Uttarakhand.
        </p>
        <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true,
              }}
            >
              {locations.map((location, index) => (
                <Marker
                  key={index}
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.title}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {locations.map((location, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm font-medium text-gray-800">{location.title}</p>
              <p className="text-xs text-gray-500">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600">
            📍 Main Location: {center.lat}°N, {center.lng}°E
>>>>>>> Stashed changes
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Perfect location with excellent connectivity to major roads and amenities
          </p>
        </div>
      </div>
    </section>
  )
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
