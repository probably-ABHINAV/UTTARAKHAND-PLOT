import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { desc } from "drizzle-orm";
import { ADMIN_EMAILS } from "@/lib/constants";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const isAdmin = url.searchParams.get('admin') === 'true';

        // Public fetch vs Admin fetch (could filter by published status if needed)
        // For now, return all for admin, maybe filter for public later
        const allPosts = await db.select().from(posts).orderBy(desc(posts.created_at));

        return NextResponse.json({ posts: allPosts });
    } catch (error) {
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
        const slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const newPost = await db.insert(posts).values({
            title: body.title,
            slug: slug,
            content: body.content,
            cover_image: body.cover_image,
            published: body.published ?? false,
        }).returning();

        return NextResponse.json(newPost[0]);
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
