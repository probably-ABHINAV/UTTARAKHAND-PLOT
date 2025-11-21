"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { MapPin, Phone, Mail, Users } from "lucide-react"

export default function NatureGreenValleyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FFF4] via-white to-[#F0FFF4]">
      <SiteHeader />

      {/* HERO */}
      <header className="relative bg-white">
        <div className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Nature Green Valley - Phase 5</h1>
            <p className="mt-4 text-gray-700 text-lg max-w-2xl">
              Nature Green Valley Phase-5 (Ganeshpur, Dehradun) - a gated, ready-to-build plotted development on the Delhi–Dehradun corridor that combines pollution-free surroundings near Rajaji National Park with practical infrastructure for quick construction and good investment potential.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="bg-[#10B981] text-white">Near Rajaji National Park</Badge>
              <Badge className="bg-[#34D399] text-white">Gated community</Badge>
              <Badge className="bg-gray-200 text-gray-800">Ready-to-build plots</Badge>
            </div>

            <div className="mt-8 flex gap-4">
              <Button className="bg-[#10B981] text-white px-6 py-3" onClick={() => window.open('tel:+917870231314','_self')}>
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </Button>
              <Button variant="outline" className="px-6 py-3" onClick={() => window.open('mailto:info@propertyinuttarakhand.com','_self')}>
                <Mail className="mr-2 h-4 w-4" /> Request Brochure
              </Button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/design1.png"
              alt="Nature Green Valley Phase 5"
              width={1100}
              height={800}
              className="w-full h-72 object-cover"
              priority
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                Nature Green Valley Phase-5 is marketed as a practical plotted township for buyers who want a ready-to-build plot in a pollution-light environment close to Dehradun. Promotional materials and listing portals highlight its location on the expressway corridor, proximity to Rajaji National Park and local education hubs, plus an emphasis on pucca roads, gated security and green open spaces.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Connectivity</h3>
              <ul className="text-gray-700 space-y-3 list-disc list-inside">
                <li>Located at Ganeshpur (Dehradun) on the Dehradun–Saharanpur highway (NH-307) corridor.</li>
                <li>Close proximity to the Rajaji National Park and surrounding forest belt - a major natural landmark that shapes the area's clean-air appeal.</li>
                <li>Easy road access to Dehradun ISBT and other local hubs .</li>
                <li>Positioned within a growing residential & institutional belt (near Graphic Era / local education nodes) that supports future demand.</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Amenities & Infrastructure</h3>
              <ul className="text-gray-700 space-y-3 list-disc list-inside">
                <li>Gated community with perimeter boundary and defined entrance.</li>
                <li>Wide pucca internal roads (black-topped) and clearly demarcated plots to simplify construction.</li>
                <li>24×7 security / CCTV and street lighting for safe evenings.</li>
                <li>Parks / landscaped open spaces and children's play areas for community recreation.</li>
                <li>Planned drainage / rainwater management and basic civic utilities (water & electricity provisions).</li>
                <li>Community features listed on portals: fitness centre, indoor games, jogging tracks and community centre (availability varies by package).</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Who this suits</h3>
              <p className="text-gray-700 leading-relaxed">
                This development suits families seeking cleaner air and a calm neighbourhood near Dehradun, investors targeting expressway-led appreciation, and buyers who prefer plots that allow quick construction rather than long wait times. It also appeals to those wanting closeness to natural attractions (Rajaji) and to emerging institutional nodes cited by local listings.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Plot sizes, legal & finance</h3>
              <p className="text-gray-700 leading-relaxed">
                Typical plot sizes listed for Phase-5 range roughly 125–250 sq. yards (examples shown on property portals); price bands shown on listings range by size and exact location within the layout. Prospective buyers should request the latest layout map, approved documents and confirm loan eligibility with banks before booking. SastaPlots can help arrange verified papers, site visits and finance support.
              </p>
            </Card>

            <Card className="p-6 bg-green-50">
              <h3 className="text-xl font-semibold mb-4">Quick call to action</h3>
              <p className="text-gray-800 mb-4">
                Interested in Nature Green Valley Phase-5? Request the latest price list, full layout plan and site-visit from Property in Uttarakhand - we'll also share verified documents and help with financing options so you can evaluate plots confidently.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-[#10B981] text-white px-5 py-2" onClick={() => window.open('tel:+917870231314','_self')}>
                  <Phone className="mr-2 h-4 w-4" /> Call Now
                </Button>
                <Button variant="outline" className="px-5 py-2" onClick={() => window.open('mailto:info@propertyinuttarakhand.com','_self')}>
                  <Mail className="mr-2 h-4 w-4" /> Email Us
                </Button>
              </div>
            </Card>
          </div>

          {/* Right column - Snapshot */}
          <aside className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#10B981]" />
                </div>
                <div>
                  <h4 className="font-semibold">Location Snapshot</h4>
                  <p className="text-gray-700 text-sm mt-1">Ganeshpur / Shivalik, Dehradun — near Rajaji National Park with expressway access (NH-307).</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-700"><strong>Nearby landmark</strong><br/>Rajaji National Park</div>
                <div className="text-sm text-gray-700"><strong>Plot ranges</strong><br/>~125–250 sq. yards</div>
                <div className="text-sm text-gray-700"><strong>Roads</strong><br/>Black-topped internal roads</div>
                <div className="text-sm text-gray-700"><strong>Theme</strong><br/>Nature / Clean-air living</div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-3">Developer Snapshot</h4>
              <p className="text-gray-700 text-sm">Local developers focusing on plotted townships that balance green surroundings with practical infrastructure for quick construction.</p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-3">Need help with documents?</h4>
              <p className="text-gray-700 text-sm mb-3">SastaPlots can arrange verified papers, help schedule site visits and assist with finance options. Always verify approved layouts before booking.</p>
              <Button className="bg-[#10B981] text-white w-full" onClick={() => window.open('mailto:info@propertyinuttarakhand.com','_self')}>
                <Mail className="mr-2 h-4 w-4" /> Contact Sales
              </Button>
            </Card>
          </aside>
        </div>

        {/* Map & gallery */}
        <section className="mt-12 grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Project Location (Map)</h3>
            <div className="w-full h-80 rounded overflow-hidden shadow">
              <iframe
                title="Nature Green Valley Phase-5 - Location"
                src="https://www.google.com/maps?q=Nature+Green+Valley+Phase+5+Ganeshpur+Dehradun&output=embed"
                width="100%"
                height={400}
                allowFullScreen
                loading="lazy"
                className="border-0 w-full h-full"
              />
            </div>

            <p className="text-sm text-gray-600 mt-3">Map shows approximate location — contact SastaPlots or the developer for exact coordinates and a guided visit.</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Gallery</h3>
            <div className="grid grid-cols-2 gap-3">
              <Image src="/images/design1.png" alt="Nature 1" width={600} height={400} className="w-full h-40 object-cover rounded" />
              <Image src="/images/ganeshpur-plots.jpg" alt="Nature 2" width={600} height={400} className="w-full h-40 object-cover rounded" />
              <Image src="/images/naturegreenvalley6.jpeg" alt="Nature 3" width={600} height={400} className="w-full h-40 object-cover rounded" />
              <Image src="/images/badripur-plots.jpg" alt="Nature 4" width={600} height={400} className="w-full h-40 object-cover rounded" />
            </div>
            <p className="text-sm text-gray-600 mt-3">Contact us for more project images and site photos</p>
          </Card>
        </section>

      </main>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#10B981] to-[#34D399] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-3">Interested in Nature Green Valley Phase-5?</h3>
          <p className="mb-6 max-w-2xl mx-auto">Request the latest price list, layout and verified papers from SastaPlots — we can also help schedule site visits and assist with finance options.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-[#10B981] px-6 py-3" onClick={() => window.open('tel:+917870231314','_self')}>
              <Phone className="mr-2 h-4 w-4" /> Call Now
            </Button>
            <Button variant="outline" className="text-white px-6 py-3 border-white" onClick={() => window.open('mailto:info@propertyinuttarakhand.com','_self')}>
              <Mail className="mr-2 h-4 w-4" /> Email
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
