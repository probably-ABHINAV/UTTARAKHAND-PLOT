import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { eq } from "drizzle-orm";
import { ADMIN_EMAILS } from "@/lib/constants";

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const user = await stackServerApp.getUser();
        // TEMPORARY: Lax auth for dev
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // Check if updating title/slug implies logic changes, usually we keep slug stable or handle redirects
        // For now, allow simple updates
        const updateData: any = {
            title: body.title,
            content: body.content,
            cover_image: body.cover_image,
            published: body.published,
        };

        if (body.slug && body.slug !== params.slug) {
            updateData.slug = body.slug;
        }

        const updatedPost = await db.update(posts)
            .set(updateData)
            .where(eq(posts.slug, params.slug))
            .returning();

        if (updatedPost.length === 0) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(updatedPost[0]);
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const user = await stackServerApp.getUser();
        if (!user || (user.primaryEmail && !ADMIN_EMAILS.includes(user.primaryEmail))) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const deletedPost = await db.delete(posts)
            .where(eq(posts.slug, params.slug))
            .returning();

        if (deletedPost.length === 0) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(deletedPost[0]);
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
