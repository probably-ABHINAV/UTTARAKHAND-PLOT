"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  Facebook, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight 
} from "lucide-react"

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 bg-white rounded-xl p-1 shadow-md flex items-center justify-center overflow-hidden">
                <Image
                  src="/property-in-uk-logo.png"
                  alt="Property in Uttarakhand"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div className="leading-tight">
                <h3 className="font-bold text-lg">Property in <br/>Uttarakhand</h3>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed max-w-xs">
              Your trusted partner for premium land plots in Uttarakhand's most beautiful hill stations. 
              Legal clarity, prime locations, and exceptional growth potential.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              Explore
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { label: "Residential Plots", href: "/plots" },
                { label: "Investment Guide", href: "/investment" },
                { label: "ROI Calculator", href: "/calculator" },
                { label: "Site Visits", href: "/contact" },
                { label: "About Us", href: "/about" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href}
                    className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:translate-x-1 transition-all"
                  >
                    <ArrowRight className="h-3 w-3" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Featured Projects */}
          <div>
            <h4 className="font-bold text-lg mb-6">Featured Projects</h4>
            <ul className="space-y-4 text-sm">
              <li className="group cursor-pointer">
                <div className="font-bold group-hover:underline">Bajrang Vatika Premium</div>
                <div className="opacity-80 text-xs">Badripur, Dehradun</div>
              </li>
              <li className="group cursor-pointer">
                <div className="font-bold group-hover:underline">Nature Green Valley</div>
                <div className="opacity-80 text-xs">Ganeshpur, Dehradun</div>
              </li>
              <li className="group cursor-pointer">
                <div className="font-bold group-hover:underline">Friend's Colony Phase 1</div>
                <div className="opacity-80 text-xs">Sundarpur, Dehradun</div>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="opacity-70 text-xs uppercase tracking-wider mb-0.5">Call / WhatsApp</div>
                  <a href="tel:+917870231314" className="font-semibold text-base hover:underline">+91 7870 231 314</a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="opacity-70 text-xs uppercase tracking-wider mb-0.5">Email Us</div>
                  <a href="mailto:info@propertyinuttarakhand.com" className="font-medium hover:underline">info@propertyinuttarakhand.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="opacity-70 text-xs uppercase tracking-wider mb-0.5">Visit Office</div>
                  <span className="font-medium block max-w-[200px]">Badripur & Ganeshpur, Dehradun, Uttarakhand</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-black/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright & Credits */}
            <div className="text-center md:text-left space-y-1">
              <p className="text-sm font-medium">
                © {new Date().getFullYear()} Property in Uttarakhand. All rights reserved.
              </p>
              <p className="text-xs opacity-70">
                Designed & Developed by{" "}
                <a
                  href="https://www.sumirayandesign.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors font-bold"
                >
                  Sumirayan Design
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/property_in_uttrakhand"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/16FP4Zas9L/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}
