import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { desc, or, ilike, eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser();

        if (!user) {
            console.log("DEBUG: No user found in stackServerApp.getUser()");
            return NextResponse.json({ error: "Unauthorized - No User" }, { status: 401 });
        }

        console.log("DEBUG: Server User:", JSON.stringify(user, null, 2));

        const u = user as any;
        const hasAdminRole = u?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u?.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || (u.primaryEmail && ["xoxogroovy@gmail.com", "admin@propertyinuttrakhand.com"].includes(u.primaryEmail));

        console.log("DEBUG: hasAdminRole:", hasAdminRole);

        if (!hasAdminRole) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        let dbQuery = db.select().from(users).orderBy(desc(users.last_login));

        if (query) {
            // @ts-ignore - ilike types can be fussy
            dbQuery = db.select().from(users).where(
                or(
                    ilike(users.email, `%${query}%`),
                    ilike(users.stack_user_id, `%${query}%`)
                )
            ).orderBy(desc(users.last_login));
        }

        const data = await dbQuery;
        console.log(`DEBUG USERS: Fetched ${data.length} users from DB`);
        if (data.length === 0) {
            const allUsers = await db.select().from(users);
            console.log(`DEBUG USERS: Total users in table (unfiltered): ${allUsers.length}`);
        }

        return NextResponse.json({ users: data });
    } catch (error) {
        console.error("Fetch Users Error:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
