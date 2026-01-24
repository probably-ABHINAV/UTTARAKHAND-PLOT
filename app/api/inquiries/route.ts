import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { desc } from "drizzle-orm";

import { ADMIN_EMAILS } from "@/lib/constants";

export async function GET(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser();
        const u = user as any;
        const hasAdminRole = u?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u?.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin');

        if (!user || !hasAdminRole) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.created_at));
        return NextResponse.json({ inquiries: allInquiries });
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Public endpoint for submitting inquiries
        const body = await req.json();

        if (!body.name || !body.email || !body.phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newInquiry = await db.insert(inquiries).values({
            name: body.name,
            email: body.email,
            phone: body.phone,
            message: body.message,
            status: "new",
            plot_id: body.plot_id || null, // Optional connection to a plot
        }).returning();

        return NextResponse.json(newInquiry[0]);
    } catch (error) {
        console.error("Error creating inquiry:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
