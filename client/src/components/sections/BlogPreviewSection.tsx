import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featuredImage: string;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  category?: string;
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=520",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=520",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=520",
];

async function fetchPosts(): Promise<BlogSummary[]> {
  const res = await fetch("/api/content/blog");
  if (!res.ok) throw new Error("Failed to load blog");
  const data = await res.json();
  return data.posts;
}

function DateBadge({ date }: { date: string }) {
  const parsed = new Date(date);
  const day = parsed.getDate();
  const month = parsed.toLocaleString("en-US", { month: "short" }).toUpperCase();

  return (
    <div className="blog-date-badge" aria-hidden>
      <span className="blog-date-day">{day}</span>
      <span className="blog-date-month">{month}</span>
    </div>
  );
}

function BlogCard({
  post,
  imageFallback,
}: {
  post: BlogSummary;
  imageFallback: string;
}) {
  const published = post.publishedAt ?? post.createdAt;
  const category = (post as BlogSummary & { category?: string }).category
    || post.tags[0]
    || "INSIGHTS";
  const image = post.featuredImage || imageFallback;
  const author = post.author || "Admin";

  return (
    <article className="blog-preview-card group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="blog-preview-image-wrap">
          <img
            src={image}
            alt=""
            className="blog-preview-image"
            loading="lazy"
          />
          <DateBadge date={published} />
        </div>

        <div className="blog-preview-body">
          <p className="blog-preview-category">{category.toUpperCase()}</p>
          <h3 className="blog-preview-title">{post.title}</h3>

          <div className="blog-preview-meta">
            <span className="blog-preview-meta-item">
              <User className="h-4 w-4" aria-hidden />
              {author}
            </span>
            <span className="blog-preview-meta-item">
              <MessageCircle className="h-4 w-4" aria-hidden />
              0
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function BlogPreviewSection() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["/api/content/blog"],
    queryFn: fetchPosts,
  });

  const featured = posts.slice(0, 3);

  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-12">
          <div>
            <h2 className="section-heading">Latest from Our Blog</h2>
            <p className="mt-3 section-subheading max-w-2xl">
              Insurance tips, industry news, and practical guidance from the Shiv Insurance team.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="gap-2 border-shiv-navy/20 text-shiv-navy hover:bg-shiv-cream-warm">
              View all posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <p className="py-12 text-center text-shiv-text-muted">Loading blog posts…</p>
        ) : featured.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-dashed border-gray-200 bg-shiv-cream-warm px-6 py-12 text-center">
            <p className="text-shiv-text-muted">
              Blog posts will appear here once published in the CMS.
            </p>
            <Link href="/blog" className="mt-4 inline-block text-sm font-semibold text-shiv-gold hover:underline">
              Go to blog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                imageFallback={fallbackImages[index % fallbackImages.length]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
