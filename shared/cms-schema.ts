import { z } from "zod";

export const seoFieldsSchema = z.object({
  metaTitle: z.string().default(""),
  metaDescription: z.string().default(""),
  metaKeywords: z.string().default(""),
  ogTitle: z.string().default(""),
  ogDescription: z.string().default(""),
  ogImage: z.string().default(""),
  canonicalUrl: z.string().default(""),
  noIndex: z.boolean().default(false),
});

export type SeoFields = z.infer<typeof seoFieldsSchema>;

export const defaultSeoFields = (): SeoFields => seoFieldsSchema.parse({});

export const cmsPageAppearanceValues = ["services", "footer_links"] as const;

export type CmsPageAppearance = (typeof cmsPageAppearanceValues)[number];

export const cmsPageAppearanceOptions = [
  { value: "services", label: "Services" },
  { value: "footer_links", label: "Footer links" },
] as const;

export function normalizePageAppearance(value: unknown): CmsPageAppearance {
  if (value === "footer_links") return "footer_links";
  if (value === "footer" || value === "header_services") return "services";
  return "services";
}

export const cmsBlogAppearanceOptions = [
  { value: "blog_listing", label: "blog_listing" },
  { value: "featured_home", label: "featured_home" },
  { value: "featured_sidebar", label: "featured_sidebar" },
  { value: "none", label: "none" },
] as const;

export const cmsPageSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().default(""),
  appearance: z
    .preprocess(normalizePageAppearance, z.enum(cmsPageAppearanceValues))
    .default("services"),
  content: z.string().default(""),
  status: z.enum(["draft", "published"]).default("draft"),
  seo: seoFieldsSchema.default(defaultSeoFields()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const insertCmsPageSchema = cmsPageSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCmsPageSchema = insertCmsPageSchema.partial();

export type CmsPage = z.infer<typeof cmsPageSchema>;
export type InsertCmsPage = z.infer<typeof insertCmsPageSchema>;

export const cmsBlogPostSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().default(""),
  appearance: z.string().default("blog_listing"),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  author: z.string().default("Shiv Insurance"),
  featuredImage: z.string().default(""),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.string().nullable().default(null),
  seo: seoFieldsSchema.default(defaultSeoFields()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const insertCmsBlogPostSchema = cmsBlogPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCmsBlogPostSchema = insertCmsBlogPostSchema.partial();

export type CmsBlogPost = z.infer<typeof cmsBlogPostSchema>;
export type InsertCmsBlogPost = z.infer<typeof insertCmsBlogPostSchema>;

export const cmsTestimonialSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  company: z.string().default(""),
  content: z.string().min(1),
  rating: z.number().min(1).max(5).default(5),
  published: z.boolean().default(true),
  createdAt: z.string(),
});

export const insertCmsTestimonialSchema = cmsTestimonialSchema.omit({
  id: true,
  createdAt: true,
});

export type CmsTestimonial = z.infer<typeof cmsTestimonialSchema>;
export type InsertCmsTestimonial = z.infer<typeof insertCmsTestimonialSchema>;

export const cmsDownloadIconValues = [
  "file-text",
  "car",
  "heart",
  "building",
  "shield",
  "briefcase",
  "globe",
] as const;

export const cmsDownloadCategoryValues = [
  "Form",
  "Insurance",
  "Brochure",
  "Guide",
  "Other",
] as const;

export const cmsDownloadSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().default(""),
  category: z.string().default("Form"),
  fileSize: z.string().default(""),
  filePath: z.string().min(1, "File path or URL is required"),
  icon: z.string().default("file-text"),
  published: z.boolean().default(true),
  sortOrder: z.number().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const insertCmsDownloadSchema = cmsDownloadSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCmsDownloadSchema = insertCmsDownloadSchema.partial();

export type CmsDownload = z.infer<typeof cmsDownloadSchema>;
export type InsertCmsDownload = z.infer<typeof insertCmsDownloadSchema>;

export const cmsSettingsSchema = z.object({
  leadEmail: z.string().email().default("info@shivinsurance.co.ke"),
  siteName: z.string().default("Shiv Insurance Brokers Ltd"),
  siteUrl: z.string().default(""),
  defaultMetaTitle: z.string().default("Shiv Insurance Brokers Ltd"),
  defaultMetaDescription: z
    .string()
    .default(
      "Trusted insurance brokerage in Kenya offering comprehensive coverage for individuals and businesses.",
    ),
  defaultMetaKeywords: z
    .string()
    .default("insurance, brokerage, Kenya, Shiv Insurance"),
  defaultOgImage: z.string().default(""),
  twitterHandle: z.string().default(""),
  googleAnalyticsId: z.string().default(""),
  googleTagManagerId: z.string().default(""),
  headScripts: z.string().default(""),
  footerScripts: z.string().default(""),
  robotsTxt: z.string().default("User-agent: *\nAllow: /"),
});

export type CmsSettings = z.infer<typeof cmsSettingsSchema>;

export const defaultCmsSettings = (): CmsSettings => cmsSettingsSchema.parse({});

export const cmsDataSchema = z.object({
  pages: z.array(cmsPageSchema).default([]),
  blogPosts: z.array(cmsBlogPostSchema).default([]),
  testimonials: z.array(cmsTestimonialSchema).default([]),
  downloads: z.array(cmsDownloadSchema).default([]),
  settings: cmsSettingsSchema.default(defaultCmsSettings()),
});

export type CmsData = z.infer<typeof cmsDataSchema>;

export const cmsLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
