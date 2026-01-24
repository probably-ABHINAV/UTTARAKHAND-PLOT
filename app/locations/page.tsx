import Image from "next/image"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/footer"
import { db } from "@/db"
import { locations } from "@/db/schema"
import { desc } from "drizzle-orm"

// UI Components
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Icons
import {
  TrendingUp,
  Star,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Phone
} from "lucide-react"

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const allLocations = await db.select().from(locations).orderBy(desc(locations.created_at));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative py-24 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <Badge className="mb-6 bg-secondary text-secondary-foreground hover:bg-secondary px-4 py-1.5 text-sm shadow-sm">
            Top Investment Hubs
          </Badge>
          <h1 className="font-extrabold text-5xl md:text-6xl mb-6 tracking-tight text-slate-900">
            Prime Locations in <span className="font-extrabold text-5xl md:text-6xl mb-6 tracking-tight text-slate-900">Uttarakhand</span>
          </h1>
          <p className="text-slate-600 text-xl leading-relaxed">
            From the bustling outskirts of Dehradun to the serene Himalayan foothills, explore neighborhoods that promise both lifestyle upgrades and solid asset appreciation.
          </p>
        </div>
      </section>

      {/* --- LOCATIONS LIST --- */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-16">
            {allLocations.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-lg border-2 border-dashed rounded-2xl">
                No locations added yet. Check back soon!
              </div>
            ) : (
              allLocations.map((location) => (
                <Card
                  key={location.id}
                  className="group hover-lift overflow-hidden border-0 shadow-xl bg-white rounded-2xl"
                >
                  <div className="grid lg:grid-cols-2">

                    {/* Image Side */}
                    <div className="relative h-[400px] lg:h-auto overflow-hidden">
                      {location.image ? (
                        <Image
                          src={location.image}
                          alt={location.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                          No Image Available
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />

                      {/* Mobile Text Overlay (Visible on small screens) */}
                      <div className="absolute bottom-6 left-6 text-white lg:hidden">
                        <h2 className="font-bold text-3xl mb-1">{location.name}</h2>
                        <p className="text-white/90 text-sm line-clamp-2">{location.overview}</p>
                      </div>

                      {/* Floating Badges */}
                      {location.growth && (
                        <div className="absolute top-6 right-6">
                          <Badge className="bg-primary text-white shadow-lg border-0 text-base px-3 py-1">
                            {location.growth}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content Side */}
                    <div className="p-8 lg:p-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="font-bold text-3xl md:text-4xl text-slate-900 mb-2 hidden lg:block">{location.name}</h2>
                          {location.growth && (
                            <div className="flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full w-fit">
                              <TrendingUp className="h-4 w-4" />
                              {location.growth}
                            </div>
                          )}
                        </div>
                        <div className="hidden lg:block text-right">
                          <div className="text-sm text-slate-500">Connectivity</div>
                          <div className="font-bold text-slate-900 text-lg">{location.connectivity || "N/A"}</div>
                        </div>
                      </div>

                      <Separator className="mb-6" />

                      {/* Overview */}
                      <div className="mb-8">
                        <h3 className="font-semibold text-lg text-slate-900 mb-2">Location Overview</h3>
                        <p className="text-slate-600 leading-relaxed">
                          {location.overview || "No overview available."}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-2 text-primary">
                            <GraduationCap className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Literacy</span>
                          </div>
                          <div className="font-semibold text-slate-900">{location.literacy_rate || "N/A"}</div>
                        </div>
                        <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20">
                          <div className="flex items-center gap-2 mb-2 text-slate-800">
                            <Briefcase className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Jobs</span>
                          </div>
                          <div className="font-semibold text-slate-900 text-sm">{location.jobs || "N/A"}</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 col-span-2 md:col-span-1">
                          <div className="flex items-center gap-2 mb-2 text-orange-600">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Returns</span>
                          </div>
                          <div className="font-semibold text-slate-900 text-sm">{location.returns || "N/A"}</div>
                        </div>
                      </div>

                      {/* Highlights List */}
                      {location.highlights && location.highlights.length > 0 && (
                        <div className="mb-8 bg-slate-50 p-6 rounded-xl">
                          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Star className="h-4 w-4 text-secondary fill-secondary" /> Key Highlights
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-3">
                            {location.highlights.filter((h: string) => h.trim() !== "").map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="mt-auto pt-4 grid sm:grid-cols-2 gap-4">
                        <Button
                          className="bg-primary hover:bg-primary/90 text-white h-12 text-base shadow-md"
                          asChild
                        >
                          <a href={`https://wa.me/917870231314?text=Tell me more about ${location.name}`} target="_blank" rel="noreferrer">
                            Explore Properties
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/5 h-12 text-base"
                          asChild
                        >
                          <a href="tel:+917870231314">
                            <Phone className="mr-2 h-4 w-4" /> Schedule Visit
                          </a>
                        </Button>
                      </div>

                    </div>
                  </div>
                </Card>
              )))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
