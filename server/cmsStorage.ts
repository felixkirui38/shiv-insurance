import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import {
  type CmsData,
  type CmsPage,
  type CmsBlogPost,
  type CmsTestimonial,
  type CmsDownload,
  type CmsSettings,
  type InsertCmsPage,
  type InsertCmsBlogPost,
  type InsertCmsTestimonial,
  type InsertCmsDownload,
  cmsDataSchema,
  defaultCmsSettings,
  defaultSeoFields,
  slugify,
} from "@shared/cms-schema";
import { defaultDownloadDocuments } from "@shared/defaultDownloads";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "data");
const DATA_FILE = join(DATA_DIR, "cms.json");

let cache: CmsData | null = null;

async function ensureDataFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf-8");
  } catch {
    const initial: CmsData = cmsDataSchema.parse({
      pages: [],
      blogPosts: [],
      testimonials: [],
      downloads: buildDefaultDownloads(),
      settings: defaultCmsSettings(),
    });
    await writeFile(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
  }
}

function buildDefaultDownloads(): CmsDownload[] {
  const now = new Date().toISOString();
  return defaultDownloadDocuments.map((doc, index) => ({
    id: randomUUID(),
    title: doc.title,
    description: doc.description ?? "",
    category: doc.category ?? "Form",
    fileSize: doc.fileSize ?? "",
    filePath: doc.filePath,
    icon: doc.icon ?? "file-text",
    published: doc.published ?? true,
    sortOrder: doc.sortOrder ?? index + 1,
    createdAt: now,
    updatedAt: now,
  }));
}

async function load(): Promise<CmsData> {
  if (cache) return cache;
  await ensureDataFile();
  const raw = await readFile(DATA_FILE, "utf-8");
  const rawJson = JSON.parse(raw) as Record<string, unknown>;
  const needsDownloadSeed = !Array.isArray(rawJson.downloads);
  let data = cmsDataSchema.parse(rawJson);
  if (needsDownloadSeed) {
    data = { ...data, downloads: buildDefaultDownloads() };
    await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  }
  cache = data;
  return cache;
}

async function save(data: CmsData): Promise<void> {
  cache = data;
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function getCmsData(): Promise<CmsData> {
  return load();
}

export async function getSettings(): Promise<CmsSettings> {
  const data = await load();
  return data.settings;
}

export async function updateSettings(
  partial: Partial<CmsSettings>,
): Promise<CmsSettings> {
  const data = await load();
  data.settings = { ...data.settings, ...partial };
  await save(data);
  return data.settings;
}

export async function getPages(): Promise<CmsPage[]> {
  return (await load()).pages;
}

export async function getPublishedPages(): Promise<CmsPage[]> {
  return (await getPages()).filter((p) => p.status === "published");
}

export async function getPageBySlug(slug: string): Promise<CmsPage | undefined> {
  return (await getPages()).find((p) => p.slug === slug);
}

export async function getPageById(id: string): Promise<CmsPage | undefined> {
  return (await getPages()).find((p) => p.id === id);
}

export async function createPage(input: InsertCmsPage): Promise<CmsPage> {
  const data = await load();
  const now = new Date().toISOString();
  const slug = input.slug || slugify(input.title);
  if (data.pages.some((p) => p.slug === slug)) {
    throw new Error("A page with this slug already exists");
  }
  const page: CmsPage = {
    id: randomUUID(),
    title: input.title,
    slug,
    category: input.category ?? "",
    appearance: input.appearance ?? "services",
    content: input.content ?? "",
    status: input.status ?? "draft",
    seo: input.seo ?? defaultSeoFields(),
    createdAt: now,
    updatedAt: now,
  };
  data.pages.push(page);
  await save(data);
  return page;
}

export async function updatePage(
  id: string,
  partial: Partial<InsertCmsPage>,
): Promise<CmsPage> {
  const data = await load();
  const index = data.pages.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Page not found");
  if (partial.slug && data.pages.some((p) => p.slug === partial.slug && p.id !== id)) {
    throw new Error("A page with this slug already exists");
  }
  const updated: CmsPage = {
    ...data.pages[index],
    ...partial,
    seo: partial.seo
      ? { ...data.pages[index].seo, ...partial.seo }
      : data.pages[index].seo,
    updatedAt: new Date().toISOString(),
  };
  data.pages[index] = updated;
  await save(data);
  return updated;
}

export async function deletePage(id: string): Promise<void> {
  const data = await load();
  data.pages = data.pages.filter((p) => p.id !== id);
  await save(data);
}

export async function getBlogPosts(): Promise<CmsBlogPost[]> {
  return (await load()).blogPosts;
}

export async function getPublishedBlogPosts(): Promise<CmsBlogPost[]> {
  return (await getBlogPosts())
    .filter((p) => p.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? b.createdAt).getTime() -
        new Date(a.publishedAt ?? a.createdAt).getTime(),
    );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<CmsBlogPost | undefined> {
  return (await getBlogPosts()).find((p) => p.slug === slug);
}

export async function getBlogPostById(
  id: string,
): Promise<CmsBlogPost | undefined> {
  return (await getBlogPosts()).find((p) => p.id === id);
}

export async function createBlogPost(
  input: InsertCmsBlogPost,
): Promise<CmsBlogPost> {
  const data = await load();
  const now = new Date().toISOString();
  const slug = input.slug || slugify(input.title);
  if (data.blogPosts.some((p) => p.slug === slug)) {
    throw new Error("A blog post with this slug already exists");
  }
  const post: CmsBlogPost = {
    id: randomUUID(),
    title: input.title,
    slug,
    category: input.category ?? "",
    appearance: input.appearance ?? "blog_listing",
    excerpt: input.excerpt ?? "",
    content: input.content ?? "",
    author: input.author ?? "Shiv Insurance",
    featuredImage: input.featuredImage ?? "",
    tags: input.tags ?? [],
    status: input.status ?? "draft",
    publishedAt:
      input.status === "published"
        ? (input.publishedAt ?? now)
        : (input.publishedAt ?? null),
    seo: input.seo ?? defaultSeoFields(),
    createdAt: now,
    updatedAt: now,
  };
  data.blogPosts.push(post);
  await save(data);
  return post;
}

export async function updateBlogPost(
  id: string,
  partial: Partial<InsertCmsBlogPost>,
): Promise<CmsBlogPost> {
  const data = await load();
  const index = data.blogPosts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Blog post not found");
  if (
    partial.slug &&
    data.blogPosts.some((p) => p.slug === partial.slug && p.id !== id)
  ) {
    throw new Error("A blog post with this slug already exists");
  }
  const existing = data.blogPosts[index];
  const status = partial.status ?? existing.status;
  let publishedAt = partial.publishedAt ?? existing.publishedAt;
  if (status === "published" && !publishedAt) {
    publishedAt = new Date().toISOString();
  }
  const updated: CmsBlogPost = {
    ...existing,
    ...partial,
    publishedAt,
    seo: partial.seo ? { ...existing.seo, ...partial.seo } : existing.seo,
    updatedAt: new Date().toISOString(),
  };
  data.blogPosts[index] = updated;
  await save(data);
  return updated;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const data = await load();
  data.blogPosts = data.blogPosts.filter((p) => p.id !== id);
  await save(data);
}

export async function getTestimonials(): Promise<CmsTestimonial[]> {
  return (await load()).testimonials;
}

export async function createTestimonial(
  input: InsertCmsTestimonial,
): Promise<CmsTestimonial> {
  const data = await load();
  const testimonial: CmsTestimonial = {
    id: randomUUID(),
    name: input.name,
    company: input.company ?? "",
    content: input.content,
    rating: input.rating ?? 5,
    published: input.published ?? true,
    createdAt: new Date().toISOString(),
  };
  data.testimonials.push(testimonial);
  await save(data);
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  partial: Partial<InsertCmsTestimonial>,
): Promise<CmsTestimonial> {
  const data = await load();
  const index = data.testimonials.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Testimonial not found");
  data.testimonials[index] = { ...data.testimonials[index], ...partial };
  await save(data);
  return data.testimonials[index];
}

export async function deleteTestimonial(id: string): Promise<void> {
  const data = await load();
  data.testimonials = data.testimonials.filter((t) => t.id !== id);
  await save(data);
}

export async function getDownloads(): Promise<CmsDownload[]> {
  return (await load()).downloads.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getPublishedDownloads(): Promise<CmsDownload[]> {
  return (await getDownloads()).filter((d) => d.published);
}

export async function getDownloadById(id: string): Promise<CmsDownload | undefined> {
  return (await getDownloads()).find((d) => d.id === id);
}

export async function createDownload(input: InsertCmsDownload): Promise<CmsDownload> {
  const data = await load();
  const now = new Date().toISOString();
  const download: CmsDownload = {
    id: randomUUID(),
    title: input.title,
    description: input.description ?? "",
    category: input.category ?? "Form",
    fileSize: input.fileSize ?? "",
    filePath: input.filePath,
    icon: input.icon ?? "file-text",
    published: input.published ?? true,
    sortOrder: input.sortOrder ?? data.downloads.length + 1,
    createdAt: now,
    updatedAt: now,
  };
  data.downloads.push(download);
  await save(data);
  return download;
}

export async function updateDownload(
  id: string,
  partial: Partial<InsertCmsDownload>,
): Promise<CmsDownload> {
  const data = await load();
  const index = data.downloads.findIndex((d) => d.id === id);
  if (index === -1) throw new Error("Download not found");
  const updated: CmsDownload = {
    ...data.downloads[index],
    ...partial,
    updatedAt: new Date().toISOString(),
  };
  data.downloads[index] = updated;
  await save(data);
  return updated;
}

export async function deleteDownload(id: string): Promise<void> {
  const data = await load();
  data.downloads = data.downloads.filter((d) => d.id !== id);
  await save(data);
}

export async function resetCmsDefaults(): Promise<CmsData> {
  const fresh: CmsData = cmsDataSchema.parse({
    pages: [],
    blogPosts: [],
    testimonials: [],
    downloads: buildDefaultDownloads(),
    settings: defaultCmsSettings(),
  });
  await save(fresh);
  return fresh;
}

export async function getLeadEmail(): Promise<string> {
  return (await getSettings()).leadEmail;
}
