"use client"

import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Maximize2 
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// --- MAP CONFIGURATION ---
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem'
}

const center = {
  lat: 30.402437,
  lng: 77.750105
}

const locations = [
  { 
    id: 1, 
    lat: 30.3280, 
    lng: 78.0400, 
    title: "Badripur Premium", 
    desc: "Residential Plots",
    type: "Investment"
  },
  { 
    id: 2, 
    lat: 30.3350, 
    lng: 78.0450, 
    title: "Ganeshpur Valley", 
    desc: "Gated Community",
    type: "Residential"
  },
  { 
    id: 3, 
    lat: 30.402437, 
    lng: 77.750105, 
    title: "Dehradun Outskirts", 
    desc: "Main Project Site",
    type: "Featured"
  }
]

// Custom map style to remove clutter (POIs) and make it look professional
const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  }
]

export function LocationMap() {
  const [activeMarker, setActiveMarker] = useState<number | null>(null)
  const [mapError, setMapError] = useState(false)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return setActiveMarker(null)
    }
    setActiveMarker(marker)
  }

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank')
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
            <MapPin className="mr-2 h-3 w-3" /> Project Locations
          </Badge>
          <h2 className="font-extrabold text-4xl md:text-5xl mb-6 text-foreground">
            Explore Prime <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Locations</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Strategically located plots offering the perfect balance of connectivity and serenity across Uttarakhand.
          </p>
        </div>

        {/* Map Container */}
        <Card className="border-0 shadow-2xl overflow-hidden bg-background">
          <div className="grid lg:grid-cols-3">
            
            {/* Left: The Map */}
            <div className="lg:col-span-2 h-[500px] relative bg-slate-100">
              {apiKey ? (
                <LoadScript 
                  googleMapsApiKey={apiKey}
                  onError={() => setMapError(true)}
                >
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={13}
                    options={{
                      styles: mapStyles,
                      zoomControl: true,
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: true,
                    }}
                  >
                    {locations.map((loc) => (
                      <Marker
                        key={loc.id}
                        position={{ lat: loc.lat, lng: loc.lng }}
                        onClick={() => handleActiveMarker(loc.id)}
                        animation={typeof google !== 'undefined' ? google.maps.Animation.DROP : undefined}
                      >
                        {activeMarker === loc.id && (
                          <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div className="p-2 min-w-[150px]">
                              <h3 className="font-bold text-black">{loc.title}</h3>
                              <p className="text-xs text-gray-600 mb-2">{loc.desc}</p>
                              <button 
                                onClick={() => openGoogleMaps(loc.lat, loc.lng)}
                                className="text-xs text-blue-600 font-semibold underline flex items-center gap-1"
                              >
                                Get Directions <ExternalLink className="h-3 w-3" />
                              </button>
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    ))}
                  </GoogleMap>
                </LoadScript>
              ) : (
                /* Fallback if no API key is present */
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center p-6">
                    <MapPin className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground">Map Unavailable</h3>
                    <p className="text-muted-foreground mb-4">Interactive map requires an API key.</p>
                    <Button 
                      variant="outline"
                      onClick={() => openGoogleMaps(center.lat, center.lng)}
                    >
                      View on Google Maps <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Location List */}
            <div className="lg:col-span-1 border-l border-border bg-card p-6 flex flex-col h-[500px]">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" /> Key Landmarks
              </h3>
              
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {locations.map((location, index) => (
                  <div 
                    key={index} 
                    className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-background"
                    onClick={() => {
                      setActiveMarker(location.id);
                      if (!apiKey) openGoogleMaps(location.lat, location.lng);
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {location.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{location.desc}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                        {location.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                      <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </code>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-primary">
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg" onClick={() => openGoogleMaps(center.lat, center.lng)}>
                  <Maximize2 className="mr-2 h-4 w-4" /> Open Full Map
                </Button>
              </div>
            </div>

          </div>
        </Card>
      </div>
    </section>
  )
}
