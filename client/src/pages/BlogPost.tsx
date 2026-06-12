import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/PageHero";
import { SeoHead, seoFromFields } from "@/components/SeoHead";
import NotFound from "@/pages/not-found";
import type { CmsBlogPost } from "@shared/cms-schema";

async function fetchPost(slug: string): Promise<CmsBlogPost | null> {
  const res = await fetch(`/api/content/blog/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load post");
  const data = await res.json();
  return data.post;
}

async function fetchSiteSettings() {
  const res = await fetch("/api/content/settings");
  if (!res.ok) return null;
  const data = await res.json();
  return data.settings;
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";

  const { data: settings } = useQuery({
    queryKey: ["/api/content/settings"],
    queryFn: fetchSiteSettings,
  });

  const { data: post, isLoading } = useQuery({
    queryKey: ["/api/content/blog", slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="site-section">
        <div className="site-container py-24 text-center text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!post) return <NotFound />;

  const seo = seoFromFields(
    post.seo,
    post.title,
    post.excerpt || post.content.replace(/<[^>]+>/g, "").slice(0, 160),
    settings?.siteName,
  );

  return (
    <>
      <SeoHead {...seo} ogImage={seo.ogImage || post.featuredImage} />
      <PageHero title={post.title} subtitle={`By ${post.author}`} />
      <section className="site-section bg-white">
        <div className="site-container max-w-3xl">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt=""
              className="mb-8 w-full rounded-lg object-cover max-h-96"
            />
          )}
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time>{new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()}</time>
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-shiv-gold/15 px-2 py-0.5 text-shiv-gold text-xs">
                {tag}
              </span>
            ))}
          </div>
          <article
            className="cms-content prose prose-lg max-w-none prose-headings:text-shiv-navy prose-a:text-shiv-gold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-12 border-t pt-6">
            <Link href="/blog" className="text-shiv-gold font-semibold hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
