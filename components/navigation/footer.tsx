
import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/images/mascot-logo.png"
                    alt="Property in Uttrakhand"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain rounded-lg bg-white/10 p-1"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-base leading-tight">Property in Uttrakhand</h3>
                </div>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Your trusted partner for premium land plots in Uttrakhand's most beautiful hill stations. Legal clarity,
              prime locations, exceptional growth potential.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Plot Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#plots" className="opacity-90 hover:opacity-100 transition-opacity">
                  Available Plots
                </Link>
              </li>
              <li>
                <Link href="#locations" className="opacity-90 hover:opacity-100 transition-opacity">
                  Prime Locations
                </Link>
              </li>
              <li>
                <Link href="#investment" className="opacity-90 hover:opacity-100 transition-opacity">
                  Investment Guide
                </Link>
              </li>
              <li>
                <Link href="#contact" className="opacity-90 hover:opacity-100 transition-opacity">
                  Site Visits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Hill Stations</h4>
            <ul className="space-y-3 text-sm">
              <li className="opacity-90">Bajrang Vatika - Badripur</li>
              <li className="opacity-90">Nature Green Valley - Ganeshpur</li>
              <li className="opacity-90">Friend's Colony Phase 1</li>
              <li className="opacity-90">Dehradun Projects</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Contact Info</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                📞 <span className="opacity-90">+91 7870231314</span>
              </div>
              <div className="flex items-center gap-3">
                📧 <span className="opacity-90">info@propertyinuttrakhand.com</span>
              </div>
              <div className="flex items-center gap-3">
                📍 <span className="opacity-90">Badripur & Ganeshpur, Dehradun</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm opacity-90">
            © 2025 Property in Uttrakhand. All rights reserved. | Trusted Plots. Transparent Deals. Strong Future.
          </p>
        </div>
      </div>
    </footer>
  )
}
