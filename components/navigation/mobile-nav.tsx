"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

// UI Components
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

// Icons
import { Menu, Phone, ArrowRight } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const closeSheet = () => setIsOpen(false)

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Our Plots", href: "/plots" },
    { title: "Locations", href: "/locations" },
    { title: "Investment", href: "/investment" },
    { title: "Calculator", href: "/calculator" },
    { title: "Blog", href: "/blog" },
    { title: "About Us", href: "/about" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact", href: "/contact" }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
        
        {/* Header Section */}
        <SheetHeader className="p-6 text-left border-b border-border bg-muted/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-md bg-white shadow-sm p-0.5">
              <Image
                src="/property-in-uk-logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
            <SheetTitle className="text-lg font-bold text-foreground">Property in <br/><span className="text-primary">Uttarakhand</span></SheetTitle>
          </div>
          <SheetDescription className="text-xs text-muted-foreground">
            Premium plots & land investments.
          </SheetDescription>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={closeSheet}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all
                    ${isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    }
                  `}
                >
                  {item.title}
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border bg-muted/20 mt-auto">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md mb-3"
            onClick={() => window.open('tel:+917870231314', '_self')}
          >
            <Phone className="mr-2 h-4 w-4" /> Call Now
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between group"
            onClick={() => {
              window.open('/contact', '_self')
              closeSheet()
            }}
          >
            Book Site Visit <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </SheetContent>
    </Sheet>
  )
}
