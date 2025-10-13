
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { LanguageSwitcher } from "@/components/language-switcher"

export function SiteHeader() {
  return (
    <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-14 h-14 flex-shrink-0">
            <Image
              src="/property-in-uk-logo.png"
              alt="Property in UK"
              width={56}
              height={56}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg text-foreground leading-tight">Property in UK</h1>
          </div>
        </Link>
        
        <MainNav />
        
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button 
            variant="outline"
            className="text-sm px-4 py-2 hidden sm:inline-flex"
            asChild
          >
            <Link href="/signin">Sign in</Link>
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 shadow-lg text-sm px-4 py-2 hidden sm:inline-flex"
            onClick={() => window.open('tel:+917870231314', '_self')}
          >
            📞 Call Now
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
