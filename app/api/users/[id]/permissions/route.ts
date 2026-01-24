import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await stackServerApp.getUser();
        const u = user as any;
        const hasAdminRole = u?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u?.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || (u?.primaryEmail && ["xoxogroovy@gmail.com", "admin@propertyinuttrakhand.com"].includes(u.primaryEmail));

        if (!user || !hasAdminRole) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { permissions } = body;

        // Prevent admin from removing their own manage_users permission (basic safety)
        if (user.id && params.id === user.id) {
            // Optional: Add logic to prevent self-lockout if needed
        }

        await db.update(users)
            .set({ permissions })
            .where(eq(users.stack_user_id, params.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Update Permissions Error:", error);
        return NextResponse.json({ error: "Failed to update permissions" }, { status: 500 });
    }
}
