import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Property in Uttrakhand - Premium Hill Station Land Plots",
  description:
    "Invest in premium land plots in Uttrakhand's beautiful hill stations. Legal clarity, prime locations, exceptional growth potential. Mussoorie, Rishikesh, Nainital plots available.",
  keywords:
    "Uttrakhand plots, hill station land, Mussoorie plots, Rishikesh land, Nainital property, investment plots, mountain view plots",
  openGraph: {
    title: "Property in Uttrakhand - Premium Hill Station Land Plots",
    description:
      "Invest in premium land plots in Uttrakhand's beautiful hill stations with legal clarity and high growth potential.",
    type: "website",
    locale: "en_IN",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${montserrat.variable} ${openSans.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
