import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { plots } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { eq } from "drizzle-orm";
import { ADMIN_EMAILS } from "@/lib/constants";

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const user = await stackServerApp.getUser();
        const u = user as any;
        const hasAdminRole = u?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u?.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin');

        if (!user || !hasAdminRole) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const deletedPlot = await db.delete(plots)
            .where(eq(plots.slug, params.slug))
            .returning();

        return NextResponse.json(deletedPlot[0]);
    } catch (error) {
        return NextResponse.json({ error: "Error deleting plot" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const user = await stackServerApp.getUser();
        const u = user as any;
        const hasAdminRole = u?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u?.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin');

        if (!user || !hasAdminRole) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        const updatedPlot = await db.update(plots)
            .set({
                title: body.title,
                location: body.location,
                price: body.price,
                size_sqyd: body.size_sqyd,
                description: body.description,
                featured: body.featured,
                is_published: body.is_published,
                images: body.images,
                tag: body.tag,
                map_coordinates: body.map_coordinates,
            })
            .where(eq(plots.id, params.slug))
            .returning();

        return NextResponse.json(updatedPlot[0]);

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "Error updating plot" }, { status: 500 });
    }
}
