import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const navItems = [
  {
    title: "Properties",
    items: [
      { title: "All Plots", href: "/plots" },
      { title: "Locations", href: "/locations" },
      { title: "Investment Calculator", href: "/calculator" }
    ]
  },
  {
    title: "Services", 
    items: [
      { title: "Contact", href: "/contact" },
      { title: "FAQ", href: "/faq" },
      { title: "About", href: "/about" },
      { title: "Blog", href: "/blog" }
    ]
  }
]
  return (
    <nav className={`hidden md:flex items-center gap-6 ${className}`}>
      <Link href="/plots" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
        Our Plots
      </Link>
      <Link
        href="/locations"
        className="text-foreground hover:text-primary transition-colors font-medium text-sm"
      >
        Locations
      </Link>
      <Link
        href="/investment"
        className="text-foreground hover:text-primary transition-colors font-medium text-sm"
      >
        Why Invest
      </Link>
      <Link href="/calculator" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
        Calculator
      </Link>
      <Link href="/blog" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
        Blog
      </Link>
      <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
        About Us
      </Link>
      <Link href="/faq" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
        FAQ
      </Link>
      <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
        Contact
      </Link>
    </nav>
  )
}