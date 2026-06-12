import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/PageHero";
import { SeoHead, seoFromFields } from "@/components/SeoHead";
import NotFound from "@/pages/not-found";
import type { CmsPage } from "@shared/cms-schema";

async function fetchPage(slug: string): Promise<CmsPage | null> {
  const res = await fetch(`/api/content/pages/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load page");
  const data = await res.json();
  return data.page;
}

async function fetchSiteSettings() {
  const res = await fetch("/api/content/settings");
  if (!res.ok) return null;
  const data = await res.json();
  return data.settings;
}

export default function DynamicPage() {
  const [, params] = useRoute("/p/:slug");
  const slug = params?.slug ?? "";

  const { data: settings } = useQuery({
    queryKey: ["/api/content/settings"],
    queryFn: fetchSiteSettings,
  });

  const { data: page, isLoading, isError } = useQuery({
    queryKey: ["/api/content/pages", slug],
    queryFn: () => fetchPage(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="site-section">
        <div className="site-container py-24 text-center text-muted-foreground">
          Loading…
        </div>
      </div>
    );
  }

  if (isError || !page) {
    return <NotFound />;
  }

  const seo = seoFromFields(
    page.seo,
    page.title,
    page.content.replace(/<[^>]+>/g, "").slice(0, 160),
    settings?.siteName,
  );

  return (
    <>
      <SeoHead {...seo} />
      <PageHero title={page.title} />
      <section className="site-section bg-white">
        <div className="site-container">
          <article
            className="cms-content prose prose-lg max-w-none prose-headings:text-shiv-navy prose-a:text-shiv-gold"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>
    </>
  );
}
