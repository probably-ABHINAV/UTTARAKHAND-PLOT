"use client"

import { useState } from 'react'
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"

// UI Components
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Icons
import { 
  MapPin, 
  Navigation, 
  Maximize2,
  ExternalLink,
  Map as MapIcon
} from "lucide-react"

// --- DATA ---
const locations = [
  { 
    id: 1, 
    lat: 30.3280, 
    lng: 78.0400, 
    title: "Badripur Premium", 
    desc: "Residential Investment Plots",
    type: "High Growth"
  },
  { 
    id: 2, 
    lat: 30.3350, 
    lng: 78.0450, 
    title: "Ganeshpur Valley", 
    desc: "Gated Community Phase 5",
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

export function LocationMap() {
  const [activeLocation, setActiveLocation] = useState(locations[0])

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank')
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm shadow-sm">
            <MapPin className="mr-2 h-3 w-3" /> Prime Locations
          </Badge>
          <h2 className="font-extrabold text-4xl md:text-5xl mb-6 text-foreground">
            Explore Our <span className="font-extrabold text-4xl md:text-5xl mb-6 text-foreground">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Strategically located plots offering the perfect balance of connectivity and serenity across Uttarakhand.
          </p>
        </div>

        {/* Map Container */}
        <Card className="border-0 shadow-2xl overflow-hidden bg-background">
          <div className="grid lg:grid-cols-3 h-auto lg:h-[600px]">
            
            {/* Left: Visual Map Placeholder */}
            <div className="lg:col-span-2 h-[400px] lg:h-full relative bg-slate-100 flex flex-col items-center justify-center text-center p-8 bg-[url('https://maps.wikimedia.org/img/osm-intl,13,30.3280,78.0400,300x200.png')] bg-cover">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
              
              <div className="relative z-10 max-w-md">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                  <MapIcon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {activeLocation.title}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {activeLocation.desc}
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white shadow-xl hover:scale-105 transition-transform"
                  onClick={() => openGoogleMaps(activeLocation.lat, activeLocation.lng)}
                >
                  View on Google Maps <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right: Location List */}
            <div className="lg:col-span-1 border-l border-border bg-card p-6 flex flex-col h-full overflow-hidden">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-foreground">
                <Navigation className="h-5 w-5 text-primary" /> Select Location
              </h3>
              
              <div className="space-y-4 overflow-y-auto pr-2 flex-1 custom-scrollbar">
                {locations.map((location, index) => (
                  <div 
                    key={index} 
                    className={`
                      group p-4 rounded-xl border transition-all cursor-pointer relative
                      ${activeLocation.id === location.id 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-primary/50 bg-background hover:bg-muted/50'}
                    `}
                    onClick={() => setActiveLocation(location)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className={`font-bold transition-colors ${activeLocation.id === location.id ? 'text-primary' : 'text-foreground'}`}>
                          {location.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{location.desc}</p>
                      </div>
                      <Badge variant={activeLocation.id === location.id ? "default" : "secondary"} className="text-[10px] uppercase tracking-wider">
                        {location.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                      <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded font-mono">
                        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </code>
                      {activeLocation.id === location.id && (
                        <div className="text-xs font-medium text-primary flex items-center animate-in fade-in">
                          Selected <div className="w-2 h-2 rounded-full bg-primary ml-2 animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg h-12 text-base" 
                  onClick={() => openGoogleMaps(activeLocation.lat, activeLocation.lng)}
                >
                  <Maximize2 className="mr-2 h-4 w-4" /> Open Directions
                </Button>
              </div>
            </div>

          </div>
        </Card>
      </div>
    </section>
  )
}
