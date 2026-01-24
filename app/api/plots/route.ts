import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { plots } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { desc, eq } from "drizzle-orm";

// Hardcoded allowlist for now, as per requirements
import { ADMIN_EMAILS } from "@/lib/constants";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        // implement filtering if needed using searchParams

        const allPlots = await db.select().from(plots).orderBy(desc(plots.created_at));
        return NextResponse.json({ plots: allPlots });
    } catch (error) {
        console.error("Error fetching plots:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser();
        const u = user as any;
        const hasAdminRole = u?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u?.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin');

        if (!user || !hasAdminRole) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // Basic validation
        if (!body.title || !body.location || !body.price || !body.size_sqyd) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newPlot = await db.insert(plots).values({
            title: body.title,
            slug: body.slug || body.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""), // Simple slug gen
            location: body.location,
            price: body.price.toString(),
            size_sqyd: body.size_sqyd.toString(),
            size_unit: body.size_unit || "sq.yd",
            description: body.description,
            images: body.images || [],
            featured: body.featured || false,
            is_published: body.is_published !== undefined ? body.is_published : true,
            map_coordinates: body.map_coordinates,
        }).returning();

        return NextResponse.json(newPlot[0]);
    } catch (error) {
        console.error("Error creating plot:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
