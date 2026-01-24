import { db } from "@/db";
import { locations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
    try {
        // Auth Check
        const user = await stackServerApp.getUser();
        const u = user as any;
        const hasAdminRole = u?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u?.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin');

        if (!user || !hasAdminRole) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await db.delete(locations).where(eq(locations.slug, params.slug));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete location" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
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

        const updatedLocation = await db.update(locations).set({
            name,
            connectivity,
            growth,
            image,
            overview,
            literacy_rate,
            jobs,
            returns,
            highlights
        }).where(eq(locations.slug, params.slug)).returning();

        return NextResponse.json(updatedLocation[0]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
    }
}
