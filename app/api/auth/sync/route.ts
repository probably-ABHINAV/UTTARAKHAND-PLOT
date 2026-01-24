import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser();
        if (!user || !user.id || !user.primaryEmail) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Upsert user into DB
        const existingUser = await db.select().from(users).where(eq(users.stack_user_id, user.id));
        console.log(`DEBUG SYNC: Found existing users for ${user.id}:`, existingUser.length);

        if (existingUser.length === 0) {
            console.log("DEBUG SYNC: Inserting new user:", user.primaryEmail);
            const res = await db.insert(users).values({
                stack_user_id: user.id,
                email: user.primaryEmail || "",
                last_login: new Date(),
                permissions: [],
            }).returning();
            console.log("DEBUG SYNC: Insert result:", res);
        } else {
            // Update last_login
            console.log("DEBUG SYNC: Updating existing user:", user.primaryEmail);
            await db.update(users)
                .set({ last_login: new Date() })
                .where(eq(users.stack_user_id, user.id));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Sync Error:", error);
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}
