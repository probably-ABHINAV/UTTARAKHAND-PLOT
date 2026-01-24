import { db } from "@/db";
import { plots } from "@/db/schema";
import HomeClient from "@/components/home-page-client";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const allPlots = await db.select().from(plots).where(eq(plots.is_published, true));

  return <HomeClient initialPlots={allPlots} />;
}
