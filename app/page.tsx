import { db } from "@/db";
import { plots } from "@/db/schema";
import HomeClient from "@/components/home-page-client";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let allPlots = [];
  try {
    allPlots = await db.select().from(plots).where(eq(plots.is_published, true));
  } catch (error) {
    console.error("Critical Error fetching plots:", error);
    // Continue with empty array so site doesn't crash completely
  }

  return <HomeClient initialPlots={allPlots} />;
}
