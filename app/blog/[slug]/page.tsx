import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const result = await db.select().from(posts).where(eq(posts.slug, params.slug));
  const post = result[0];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article className="prose prose-slate lg:prose-lg max-w-none">
          <div className="mb-8 not-prose">
            <Badge className="mb-4">News</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-muted-foreground mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(post.created_at || new Date()).toLocaleDateString()}</span>
            </div>

            {post.cover_image && (
              <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-lg mb-10">
                <Image
                  src={post.cover_image}
                  alt={post.title || "Cover Image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          <div className="markdown-content">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4 font-serif" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-8 mb-4 font-serif" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-6 mb-3 font-serif" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-slate-700" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-slate-600 bg-slate-50 py-2" {...props} />,
              }}
            >
              {post.content || ""}
            </ReactMarkdown>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
