import { Link, useParams } from "wouter";
import { BLOG_POSTS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Helmet } from "react-helmet";

function renderContent(content: string) {
  return content
    .trim()
    .split("\n")
    .map((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <div key={index} className="h-3" />;
      }

      if (trimmed === "---") {
        return <hr key={index} className="my-6 border-border" />;
      }

      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold text-foreground mt-6 mb-2">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-heading font-bold text-foreground mt-8 mb-3">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }

      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-heading font-bold text-foreground mt-2 mb-4">
            {trimmed.replace("# ", "")}
          </h1>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <p key={index} className="text-muted-foreground leading-8 pl-2">
            {trimmed}
          </p>
        );
      }

      if (trimmed.startsWith("* ")) {
        return (
          <p key={index} className="text-muted-foreground leading-8 pl-2">
            • {trimmed.replace("* ", "")}
          </p>
        );
      }

      return (
        <p key={index} className="text-muted-foreground leading-8">
          {trimmed.replace(/\*\*/g, "")}
        </p>
      );
    });
}

export default function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((item) => item.id === id);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-heading font-bold mb-3">Article not found</h1>
        <p className="text-muted-foreground mb-8">The blog post you are looking for is unavailable.</p>
        <Link href="/blog">
          <Button data-testid="button-back-blog" className="rounded-full px-6">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      <Helmet>
        <title>{post.title} | Nexamid Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="container mx-auto px-4 py-10 max-w-4xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 -ml-3 gap-2" data-testid="button-back-blog-top">
            <ChevronLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[260px] md:h-[420px] object-cover"
            data-testid="img-blog-hero"
          />

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge data-testid="text-blog-category">{post.category}</Badge>
              <span className="text-sm text-muted-foreground" data-testid="text-blog-date">{post.date}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4" data-testid="text-blog-title">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-8" data-testid="text-blog-excerpt">
              {post.excerpt}
            </p>

            <div className="prose prose-slate max-w-none">
              {post.content ? renderContent(post.content) : (
                <p className="text-muted-foreground leading-8" data-testid="text-blog-placeholder">
                  Full article content will be published soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
