import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white py-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg p-1">
                  <Image
                    src="/property-in-uk-logo.png"
                    alt="Property in Uttarakhand"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg leading-tight">
                    Property in Uttarakhand
                  </h3>
                  <p className="text-sm opacity-80">
                    Premium Property Solutions
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Your trusted partner for premium land plots in Uttarakhand's most
              beautiful hill stations. Legal clarity, prime locations,
              exceptional growth potential.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#plots"
                  className="opacity-90 hover:opacity-100 hover:underline"
                >
                  Residential Plots
                </Link>
              </li>
              <li>
                <Link
                  href="#locations"
                  className="opacity-90 hover:opacity-100 hover:underline"
                >
                  Investment Properties
                </Link>
              </li>
              <li>
                <Link
                  href="#calculator"
                  className="opacity-90 hover:opacity-100 hover:underline"
                >
                  Investment Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="opacity-90 hover:opacity-100 hover:underline"
                >
                  Site Visits & Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-bold text-lg mb-6">Featured Projects</h4>
            <ul className="space-y-3 text-sm">
              <li className="opacity-90">Bajrang Vatika – Badripur</li>
              <li className="opacity-90">Nature Green Valley – Ganeshpur</li>
              <li className="opacity-90">Friend's Colony Phase 1</li>
              <li className="opacity-90">Premium Dehradun Projects</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-lg">📞</span>
                <div>
                  <div className="font-medium">Phone / WhatsApp</div>
                  <span className="opacity-90">+91 7870231314</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">📧</span>
                <div>
                  <div className="font-medium">Email</div>
                  <span className="opacity-90">
                    info@propertyinuttarakhand.com
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">📍</span>
                <div>
                  <div className="font-medium">Office</div>
                  <span className="opacity-90">
                    Badripur & Ganeshpur, Dehradun
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-sm opacity-90 text-center md:text-left">
                © 2025 Property in Uttarakhand. All rights reserved.
              </p>
              <p className="text-xs opacity-75">
                Designed By{" "}
                <a
                  href="https://www.sumirayandesign.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline hover:opacity-100 transition-opacity"
                >
                  Sumirayan Design
                </a>
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-6 text-sm opacity-90">
                <span>Trusted Plots</span>
                <span>•</span>
                <span>Transparent Deals</span>
                <span>•</span>
                <span>Proven Growth</span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/property_in_uttrakhand?igsh=cmsyM25rMjNyZ2t0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/16FP4Zas9L/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12..." />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

