"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  const links = [
    { href: "/plots", label: "Our Plots" },
    { href: "/locations", label: "Locations" },
    { href: "/investment", label: "Why Invest" },
    { href: "/calculator", label: "Calculator" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className={cn("hidden md:flex items-center gap-6 lg:gap-8", className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href 
              ? "text-primary font-semibold" 
              : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
