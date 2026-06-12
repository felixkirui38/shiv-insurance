import { useEffect } from "react";
import type { SeoFields } from "@shared/cms-schema";

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  siteName?: string;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function SeoHead({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonicalUrl,
  noIndex,
  siteName,
}: SeoHeadProps) {
  useEffect(() => {
    if (title) document.title = siteName ? `${title} | ${siteName}` : title;

    setMeta("description", description ?? "");
    setMeta("keywords", keywords ?? "");
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");

    setMeta("og:title", ogTitle || title || "", "property");
    setMeta("og:description", ogDescription || description || "", "property");
    setMeta("og:image", ogImage ?? "", "property");
    setMeta("og:type", "website", "property");
    if (siteName) setMeta("og:site_name", siteName, "property");

    setMeta("twitter:card", ogImage ? "summary_large_image" : "summary");
    setMeta("twitter:title", ogTitle || title || "");
    setMeta("twitter:description", ogDescription || description || "");
    setMeta("twitter:image", ogImage ?? "");

    setLink("canonical", canonicalUrl ?? "");
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonicalUrl,
    noIndex,
    siteName,
  ]);

  return null;
}

export function seoFromFields(
  seo: SeoFields,
  fallbackTitle: string,
  fallbackDescription: string,
  siteName?: string,
) {
  return {
    title: seo.metaTitle || fallbackTitle,
    description: seo.metaDescription || fallbackDescription,
    keywords: seo.metaKeywords,
    ogTitle: seo.ogTitle || seo.metaTitle || fallbackTitle,
    ogDescription: seo.ogDescription || seo.metaDescription || fallbackDescription,
    ogImage: seo.ogImage,
    canonicalUrl: seo.canonicalUrl,
    noIndex: seo.noIndex,
    siteName,
  };
}
