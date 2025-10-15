
"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { MapPin, Phone, Mail, Heart } from "lucide-react"

export default function BajrangVatikaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7F0] via-white to-[#FFF7F0]">
      <SiteHeader />

      {/* HERO with image */}
      <header className="relative bg-white">
        <div className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Bajrang Vatika</h1>
            <p className="mt-4 text-gray-700 text-lg max-w-2xl">
              Bajrang Vatika is a thoughtfully planned, Hanuman-themed residential plotted development near the Shimla Bypass in Dehradun.Ideal for buyers seeking ready-to-build plots, spiritual ambiance, and strong connectivity to the city's key hubs.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="bg-[#FF6B35] text-white">Hanuman-themed</Badge>
              <Badge className="bg-[#F7931E] text-white">Ready-to-build plots</Badge>
              <Badge className="bg-gray-200 text-gray-800">Shimla Bypass - Proximity</Badge>
            </div>

            <div className="mt-8 flex gap-4">
              <Button className="bg-[#FF6B35] text-white px-6 py-3" onClick={() => window.open('tel:+917870231314','_self')}>
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </Button>
              <Button variant="outline" className="px-6 py-3" onClick={() => window.open('mailto:info@propertyinuttarakhand.com','_self')}>
                <Mail className="mr-2 h-4 w-4" /> Request Brochure
              </Button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/D_1760471281369.jpg"
              alt="Bajrang Vatika - Dehradun"
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
                Bajrang Vatika positions itself as Uttarakhand's first Hanuman-themed plotted development, blending spiritual design elements with practical, ready-to-build plots. The layout emphasizes Vastu compatibility, green open spaces and a focal temple that shapes the community identity. Located on a high-growth corridor near the Shimla Bypass, the project is marketed for families seeking a peaceful residential setting as well as investors who value proximity to Dehradun's educational and medical hubs. The developer highlights immediate usability, secure gated living and straightforward road access to neighbouring towns and the city.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Connectivity</h3>
              <ul className="text-gray-700 space-y-3 list-disc list-inside">
                <li>Located near the Shimla Bypass Road (prime growth corridor).</li>
                <li>Approx. 1 minute to Shimla Bypass .</li>
                <li>~25 minutes to Dehradun ISBT.</li>
                <li>~20 minutes to Paonta Sahib and quick access to Chimera regional corridors.</li>
                <li>Close to local commercial centres such as Herbertpur Bazaar and educational/medical institutions (Graphic Era, Uttaranchal University, Vivekananda Hospital listed nearby).</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Amenities & Infrastructure</h3>
              <ul className="text-gray-700 space-y-3 list-disc list-inside">
                <li>Hanuman-themed centerpiece with an on-site temple - the project is promoted as a spiritually inspired community.</li>
                <li>Gated township with main entrance gate and perimeter boundary wall.</li>
                <li>24×7 security and CCTV surveillance; guard room at the entrance.</li>
                <li>Wide internal roads (30 ft / 40 ft arterial roads reported in listings) for easy movement and construction access.</li>
                <li>Provision for water and electricity connections and street lighting.</li>
                <li>Landscaped parks, greenery and children's play areas for community recreation.</li>
                <li>On-site maintenance/housekeeping and civic conveniences to support residents.</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Who this suits</h3>
              <p className="text-gray-700 leading-relaxed">
                Bajrang Vatika is well suited to buyers who want a serene, spiritually themed neighbourhood close to Dehradun's conveniences particularly families seeking weekend or year-round homes, retirees who value calm surroundings, and investors looking for plotted land in a corridor that's attracting new residential demand. The project's ready-to-move plots and proximity to major road links also appeal to buyers who want to start construction quickly.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Plot sizes, legal & finance</h3>
              <p className="text-gray-700 leading-relaxed">
                Available plot sizes (as listed on property portals) start from modest dimensions (for example ~692 sq.ft / 1350 sq.ft and upwards) with a variety of configurations confirm current inventory and exact dimensions with the sales team. The project has been launched and many listings show it as ready-to-move; prospective buyers should request verified title documents, approvals and the latest layout map before booking. Loan/finance options are commonly available through banks and developer associates ask Property in Uttarakhand for support with finance pre-approvals and legal checks.
              </p>
            </Card>

            <Card className="p-6 bg-yellow-50">
              <h3 className="text-xl font-semibold mb-4">Quick call to action</h3>
              <p className="text-gray-800 mb-4">
                Want updated prices, the site layout or a site visit for Bajrang Vatika? Contact SastaPlots to get the latest price list, availability, brochure and assistance with financing and document verification . we can arrange a guided visit and share verified project papers to help you decide confidently.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-[#FF6B35] text-white px-5 py-2" onClick={() => window.open('tel:+917870231314','_self')}>
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
                  <MapPin className="h-6 w-6 text-[#FF6B35]" />
                </div>
                <div>
                  <h4 className="font-semibold">Location Snapshot</h4>
                  <p className="text-gray-700 text-sm mt-1">Shimla Bypass Road, Dehradun - High growth corridor, fast access to ISBT and nearby towns.</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-700"><strong>Time to ISBT</strong><br/>~25 mins</div>
                <div className="text-sm text-gray-700"><strong>Time to Paonta Sahib</strong><br/>~20 mins</div>
                <div className="text-sm text-gray-700"><strong>Plot sizes</strong><br/>~692 sq.ft onwards</div>
                <div className="text-sm text-gray-700"><strong>Theme</strong><br/>Hanuman / Spiritual</div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-3">Developer Snapshot</h4>
              <p className="text-gray-700 text-sm">Property in Uttarakhand - Promotes spiritually inspired plotted developments with gated township features and practical connectivity.</p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-3">Need help with legal & finance?</h4>
              <p className="text-gray-700 text-sm mb-3">We recommend verifying title documents, approvals and the latest layout map before booking. SastaPlots can assist with finance pre-approvals.</p>
              <Button className="bg-[#FF6B35] text-white w-full" onClick={() => window.open('mailto:info@propertyinuttarakhand.com','_self')}>
                <Mail className="mr-2 h-4 w-4" /> Contact Legal Team
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
                title="Bajrang Vatika - Location"
                src="https://www.google.com/maps?q=Bajrang+Vatika+Dehradun&output=embed"
                width="100%"
                height={400}
                allowFullScreen
                loading="lazy"
                className="border-0 w-full h-full"
              />
            </div>

            <p className="text-sm text-gray-600 mt-3">Map shows approximate location — please contact SastaPlots or the developer for the exact site coordinates and to arrange a site visit.</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Gallery</h3>
            <div className="grid grid-cols-2 gap-3">
              <Image src="/images/C_1760471281370.jpg" alt="Bajrang 1" width={600} height={400} className="w-full h-40 object-cover rounded" />
              <Image src="/images/A_1760471281370.jpg" alt="Bajrang 2" width={600} height={400} className="w-full h-40 object-cover rounded" />
              <Image src="/images/E_1760471281368.jpg" alt="Bajrang 3" width={600} height={400} className="w-full h-40 object-cover rounded" />
              <Image src="/images/F_1760471281369.jpg" alt="Bajrang 4" width={600} height={400} className="w-full h-40 object-cover rounded" />
            </div>
            <p className="text-sm text-gray-600 mt-3">Contact us for more project images and site photos</p>
          </Card>
        </section>

      </main>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-3">Interested in Bajrang Vatika?</h3>
          <p className="mb-6 max-w-2xl mx-auto">Contact Property in Uttarakhand for the latest price list, site layout, verified papers and to schedule a guided visit.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-[#F7931E] px-6 py-3" onClick={() => window.open('tel:+917870231314','_self')}>
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
