"use client"

import { useState, useEffect } from 'react'
// 1. Dynamic imports prevent the "window is not defined" error on Vercel
import dynamic from 'next/dynamic'
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
  Loader2
} from "lucide-react"

// Import Leaflet CSS (Crucial for the map to look right)
useEffect(() => {
    setIsClient(true)
    
    (async () => {
      const L = (await import('leaflet')).default
      
      // ... existing icon code ...

      // ⬇️ ADD THIS TO FIX CSS BUILD ERROR
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement("link");
        link.id = 'leaflet-css';
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
    })();
  }, [])

// --- DYNAMIC COMPONENT LOADING ---
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)
// Special component to handle map movement
const MapUpdater = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { useMap } = mod;
    return function MapUpdater({ center }: { center: [number, number] }) {
      const map = useMap();
      map.flyTo(center, 14, { duration: 2 });
      return null;
    };
  }),
  { ssr: false }
)

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
  const [isClient, setIsClient] = useState(false)
  const [customIcon, setCustomIcon] = useState<any>(null)

  // --- CLIENT SIDE INIT ---
  useEffect(() => {
    setIsClient(true)
    
    // Fix for missing marker icons in Next.js
    const initLeaflet = async () => {
      const L = (await import('leaflet')).default
      
      const icon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/markers/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
      setCustomIcon(icon)
    }
    initLeaflet()
  }, [])

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`http://googleusercontent.com/maps.google.com/6{lat},${lng}`, '_blank')
  }

  // Fallback while loading
  if (!isClient) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center bg-muted/30">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
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
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Strategically located plots offering the perfect balance of connectivity and serenity across Uttarakhand.
          </p>
        </div>

        {/* Map Container */}
        <Card className="border-0 shadow-2xl overflow-hidden bg-background">
          <div className="grid lg:grid-cols-3 h-auto lg:h-[600px]">
            
            {/* Left: The Map (OpenStreetMap) */}
            <div className="lg:col-span-2 h-[400px] lg:h-full relative z-0">
              <MapContainer 
                center={[activeLocation.lat, activeLocation.lng]} 
                zoom={13} 
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
              >
                {/* 1. The Map Tiles (Free OpenStreetMap) */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* 2. Map Controller (Handles animation) */}
                <MapUpdater center={[activeLocation.lat, activeLocation.lng]} />

                {/* 3. Markers */}
                {customIcon && locations.map((loc) => (
                  <Marker 
                    key={loc.id} 
                    position={[loc.lat, loc.lng]} 
                    icon={customIcon}
                    eventHandlers={{
                      click: () => setActiveLocation(loc),
                    }}
                  >
                    <Popup className="font-sans">
                      <div className="p-1">
                        <h3 className="font-bold text-sm mb-1 text-black">{loc.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">{loc.desc}</p>
                        <button 
                          onClick={() => openGoogleMaps(loc.lat, loc.lng)}
                          className="text-xs text-[#FF7A00] font-bold hover:underline flex items-center gap-1"
                        >
                          Get Directions <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
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
                          Active <div className="w-2 h-2 rounded-full bg-primary ml-2 animate-pulse" />
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
                  <Maximize2 className="mr-2 h-4 w-4" /> Open in Google Maps
                </Button>
              </div>
            </div>

          </div>
        </Card>
      </div>
    </section>
  )
}
