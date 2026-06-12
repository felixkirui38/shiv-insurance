import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/PageHero";
import { SeoHead } from "@/components/SeoHead";

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
}

async function fetchPosts(): Promise<BlogSummary[]> {
  const res = await fetch("/api/content/blog");
  if (!res.ok) throw new Error("Failed to load blog");
  const data = await res.json();
  return data.posts;
}

async function fetchSiteSettings() {
  const res = await fetch("/api/content/settings");
  if (!res.ok) return null;
  const data = await res.json();
  return data.settings;
}

export default function BlogList() {
  const { data: settings } = useQuery({
    queryKey: ["/api/content/settings"],
    queryFn: fetchSiteSettings,
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["/api/content/blog"],
    queryFn: fetchPosts,
  });

  return (
    <>
      <SeoHead
        title="Blog"
        description={settings?.defaultMetaDescription}
        siteName={settings?.siteName}
      />
      <PageHero title="Blog" subtitle="News and insights from Shiv Insurance" />
      <section className="site-section bg-white">
        <div className="site-container max-w-3xl mx-auto text-center">
          <p className="section-subheading">
            Stay informed with updates on insurance trends, risk management tips, and news from
            Shiv Insurance Brokers Ltd — your trusted partner for cover in Kenya.
          </p>
        </div>
      </section>
      <section className="site-section bg-shiv-cream-warm pt-0">
        <div className="site-container">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-12">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No blog posts published yet.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="theme-card overflow-hidden flex flex-col">
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage}
                      alt=""
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <time className="text-xs text-muted-foreground">
                      {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                    </time>
                    <h2 className="section-heading mt-2 text-xl">
                      <Link href={`/blog/${post.slug}`} className="hover:text-shiv-gold transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 flex-1 text-sm text-shiv-text-muted">{post.excerpt}</p>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 text-sm font-semibold text-shiv-gold hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
