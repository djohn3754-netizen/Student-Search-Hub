import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { BLOG_POSTS } from "@/lib/mock-data";

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4">Nexamid Blog</h1>
        <p className="text-muted-foreground text-lg">Insights, tips, and articles for your educational journey.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <Card key={post.id} className={`overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border-none shadow-sm ${index === 0 ? 'md:col-span-2 lg:col-span-3 flex flex-col md:flex-row bg-primary text-primary-foreground' : ''}`}>
            <div className={`${index === 0 ? 'md:w-1/2 aspect-video' : 'aspect-video'} overflow-hidden`}>
              <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className={index === 0 ? 'md:w-1/2 flex flex-col justify-center' : ''}>
              <CardHeader className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant={index === 0 ? "secondary" : "secondary"}>{post.category}</Badge>
                  <span className={`text-xs ${index === 0 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{post.date}</span>
                </div>
                <CardTitle className={`font-bold line-clamp-2 ${index === 0 ? 'text-3xl font-heading' : 'text-xl'}`}>{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <p className={`line-clamp-3 mb-4 ${index === 0 ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{post.excerpt}</p>
                <Link href={`/blog/${post.id}`}>
                  <a className={`font-semibold hover:underline ${index === 0 ? 'text-white' : 'text-primary'}`}>Read More →</a>
                </Link>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
