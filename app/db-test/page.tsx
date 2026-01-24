import { db } from "@/db";
import { plots } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function DbTestPage() {
    let status = "Checking...";
    let errorMsg = null;
    let count = 0;
    let env_db_url_exists = !!process.env.DATABASE_URL;

    try {
        const res = await db.select({ count: sql<number>`count(*)` }).from(plots);
        count = Number(res[0].count);
        status = "Connected!";
    } catch (e: any) {
        status = "Failed";
        errorMsg = e.message + (e.digest ? ` (Digest: ${e.digest})` : "");
        console.error("DB Test Error:", e);
    }

    return (
        <div className="p-10 font-mono">
            <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>

            <div className="space-y-2 border p-4 rounded bg-slate-100">
                <div><strong>Status:</strong> <span className={status === "Connected!" ? "text-green-600" : "text-red-600"}>{status}</span></div>
                <div><strong>Env DATABASE_URL:</strong> {env_db_url_exists ? "Present (✅)" : "Missing (❌)"}</div>
                {errorMsg && (
                    <div className="text-red-600 bg-red-50 p-2 rounded mt-2">
                        <strong>Error:</strong> {errorMsg}
                    </div>
                )}
                {status === "Connected!" && (
                    <div><strong>Plots Count:</strong> {count}</div>
                )}
            </div>

            <p className="mt-8 text-sm text-gray-500">
        If Env is Missing: Go to Vercel -> Settings -> Environment Variables.<br />
                If Error is "ssl": Check `db/index.ts` options.<br />
                If Error is "password authentication": Check DATABASE_URL value.
            </p>
        </div>
    );
}
