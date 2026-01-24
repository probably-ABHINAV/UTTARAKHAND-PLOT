import { db } from "@/db";
import { locations } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

export async function GET() {
    try {
        const data = await db.select().from(locations).orderBy(desc(locations.created_at));
        return NextResponse.json({ locations: data });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        // Auth Check
        const user = await stackServerApp.getUser();
        const u = user as any;
        const hasAdminRole = u?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u?.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin');

        if (!user || !hasAdminRole) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, connectivity, growth, image, overview, literacy_rate, jobs, returns, highlights } = body;

        // Simple slug creation
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const newLocation = await db.insert(locations).values({
            name,
            slug,
            connectivity,
            growth,
            image,
            overview,
            literacy_rate,
            jobs,
            returns,
            highlights: highlights || [] // Ensure array
        }).returning();

        return NextResponse.json(newLocation[0]);
    } catch (error) {
        console.error("Error creating location:", error);
        return NextResponse.json({ error: "Failed to create location" }, { status: 500 });
    }
}
