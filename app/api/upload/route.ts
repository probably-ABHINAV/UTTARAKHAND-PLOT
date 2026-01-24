import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { stackServerApp } from "@/stack";
import { ADMIN_EMAILS } from "@/lib/constants";

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    try {
        // 1. Verify Authentication
        // 1. Verify Authentication
        const user = await stackServerApp.getUser();
        const u = user as any;
        const hasAdminRole = u?.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u?.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin');

        if (!user || !hasAdminRole) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Parse File
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // 3. Upload to Supabase (using Admin client to bypass RLS)
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Ensure bucket exists (optional, but good for safety)
        // We assume 'plots' bucket exists from the init script, 
        // but if not, the upload might fail if we don't handle it.
        // For speed, strict upload.

        const { data, error } = await supabaseAdmin.storage
            .from("plots")
            .upload(filePath, file, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error("Supabase Upload Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 4. Get Public URL
        const { data: publicData } = supabaseAdmin.storage
            .from("plots")
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicData.publicUrl });

    } catch (error: any) {
        console.error("Upload API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
