
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <nav className="flex flex-col gap-6 mt-6">
          <Link 
            href="#plots" 
            className="text-foreground hover:text-primary transition-colors font-medium text-base"
            onClick={closeSheet}
          >
            Our Plots
          </Link>
          <Link
            href="#locations"
            className="text-foreground hover:text-primary transition-colors font-medium text-base"
            onClick={closeSheet}
          >
            Locations
          </Link>
          <Link
            href="#investment"
            className="text-foreground hover:text-primary transition-colors font-medium text-base"
            onClick={closeSheet}
          >
            Why Invest
          </Link>
          <Link 
            href="#about" 
            className="text-foreground hover:text-primary transition-colors font-medium text-base"
            onClick={closeSheet}
          >
            About Us
          </Link>
          <Link 
            href="#contact" 
            className="text-foreground hover:text-primary transition-colors font-medium text-base"
            onClick={closeSheet}
          >
            Contact
          </Link>
          <Button className="bg-primary hover:bg-primary/90 shadow-lg mt-4" onClick={closeSheet}>
            📞 Call Now
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
