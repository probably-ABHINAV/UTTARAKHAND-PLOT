"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Phone, User } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-white shadow-sm p-0.5">
            <Image
              src="/property-in-uk-logo.png"
              alt="Property in UK Logo"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-medium text-muted-foreground">Property in</span>
            <span className="text-lg font-bold text-primary tracking-tight">Uttarakhand</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <MainNav />
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="/signin">
                <User className="mr-2 h-4 w-4" /> Sign in
              </Link>
            </Button>

            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-md transition-all"
              onClick={() => window.open('tel:+917870231314', '_self')}
            >
              <Phone className="mr-2 h-4 w-4" /> Call Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
