import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        // 1. Check Environment Variables (existence only, no values)
        const envCheck = {
            DATABASE_URL: !!process.env.DATABASE_URL,
            NEXT_PUBLIC_STACK_PROJECT_ID: !!process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
            STACK_SECRET_KEY: !!process.env.STACK_SECRET_KEY,
        };

        // 2. Check Database Connection
        let dbStatus = "unknown";
        let dbError = null;
        try {
            await db.execute(sql`SELECT 1`);
            dbStatus = "connected";
        } catch (e: any) {
            dbStatus = "failed";
            dbError = e.message;
        }

        return NextResponse.json({
            status: dbStatus === "connected" ? "healthy" : "unhealthy",
            env: envCheck,
            database: {
                status: dbStatus,
                error: dbError
            },
            timestamp: new Date().toISOString()
        }, { status: dbStatus === "connected" ? 200 : 503 });

    } catch (error: any) {
        return NextResponse.json({
            status: "critical_failure",
            error: error.message
        }, { status: 500 });
    }
}
