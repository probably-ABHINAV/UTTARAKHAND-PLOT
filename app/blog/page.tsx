import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const allPosts = await db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.created_at));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Latest Updates</h1>
          <p className="text-slate-600">News, insights, and updates from Property in Uttarakhand.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              No blog posts available yet.
            </div>
          ) : (
            allPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  {post.cover_image && (
                    <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                      <Image
                        src={post.cover_image}
                        alt={post.title || "Blog Post"}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="mb-2">News</Badge>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at || new Date()).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 line-clamp-3 mb-4">{post.content}</p>
                  <Link href={`/blog/${post.slug}`} className="text-primary font-medium hover:underline text-sm">
                    Read More
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
