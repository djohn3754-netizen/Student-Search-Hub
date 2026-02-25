import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Prepare for JEE Main 2026",
    excerpt: "Expert tips and strategies to crack one of India's toughest exams...",
    category: "Exam Prep",
    date: "Feb 20, 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "The Rise of AI in Indian Education",
    excerpt: "Exploring how Artificial Intelligence is transforming the way students learn...",
    category: "Technology",
    date: "Feb 15, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Mastering Spoken English: A Guide",
    excerpt: "Improve your confidence and fluency with these simple daily exercises...",
    category: "Language",
    date: "Feb 10, 2026",
    image: "https://images.unsplash.com/photo-1543165796-5426273eaec3?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4">Nexamid Blog</h1>
        <p className="text-muted-foreground text-lg">Insights, tips, and articles for your educational journey.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border-none shadow-sm">
            <div className="aspect-video overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <CardHeader className="p-6">
              <div className="flex justify-between items-center mb-3">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <CardTitle className="text-xl font-bold line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`}>
                <a className="text-primary font-semibold hover:underline">Read More →</a>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
