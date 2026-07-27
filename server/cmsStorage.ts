import { randomUUID } from "crypto";
import { and, asc, desc, eq, ne } from "drizzle-orm";
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
  defaultCmsSettings,
  defaultSeoFields,
  slugify,
  normalizeDownloadCategory,
} from "@shared/cms-schema";
import {
  cmsBlogPosts,
  cmsDownloads,
  cmsPages,
  cmsSettings,
  cmsTestimonials,
} from "@shared/schema";
import { defaultDownloadDocuments } from "@shared/defaultDownloads";
import { db } from "./db";

function buildDefaultDownloads(): CmsDownload[] {
  const now = new Date().toISOString();
  return defaultDownloadDocuments.map((doc, index) => ({
    id: randomUUID(),
    title: doc.title,
    description: doc.description ?? "",
    category: doc.category ?? "Proposal Forms",
    fileSize: doc.fileSize ?? "",
    filePath: doc.filePath,
    icon: doc.icon ?? "file-text",
    published: doc.published ?? true,
    sortOrder: doc.sortOrder ?? index + 1,
    createdAt: now,
    updatedAt: now,
  }));
}

async function ensureSettingsRow() {
  const [existing] = await db.select().from(cmsSettings).limit(1);
  if (existing) return existing;
  const defaults = defaultCmsSettings();
  const [inserted] = await db
    .insert(cmsSettings)
    .values({ id: "default", ...defaults })
    .returning();
  return inserted;
}

function toPage(row: typeof cmsPages.$inferSelect): CmsPage {
  return {
    ...row,
    seo: row.seo as CmsPage["seo"],
  };
}

function toBlogPost(row: typeof cmsBlogPosts.$inferSelect): CmsBlogPost {
  return {
    ...row,
    tags: (row.tags ?? []) as string[],
    seo: row.seo as CmsBlogPost["seo"],
  };
}

function toTestimonial(row: typeof cmsTestimonials.$inferSelect): CmsTestimonial {
  return row;
}

function toDownload(row: typeof cmsDownloads.$inferSelect): CmsDownload {
  return {
    ...row,
    category: normalizeDownloadCategory(row.category, row.title, row.description),
  };
}

async function seedDefaultDownloadsIfEmpty(): Promise<void> {
  const [first] = await db.select({ id: cmsDownloads.id }).from(cmsDownloads).limit(1);
  if (first) return;
  await db.insert(cmsDownloads).values(buildDefaultDownloads());
}

export async function getCmsData(): Promise<CmsData> {
  const [settings, pages, blogPosts, testimonials] = await Promise.all([
    getSettings(),
    getPages(),
    getBlogPosts(),
    getTestimonials(),
  ]);
  const downloads = await getDownloads();
  return { settings, pages, blogPosts, testimonials, downloads };
}

export async function getSettings(): Promise<CmsSettings> {
  const row = await ensureSettingsRow();
  const { id: _id, ...settings } = row;
  return settings;
}

export async function updateSettings(
  partial: Partial<CmsSettings>,
): Promise<CmsSettings> {
  const existing = await ensureSettingsRow();
  const [updated] = await db
    .update(cmsSettings)
    .set({ ...existing, ...partial })
    .where(eq(cmsSettings.id, existing.id))
    .returning();
  const { id: _id, ...settings } = updated;
  return settings;
}

export async function getPages(): Promise<CmsPage[]> {
  const rows = await db.select().from(cmsPages);
  return rows.map(toPage);
}

export async function getPublishedPages(): Promise<CmsPage[]> {
  const rows = await db
    .select()
    .from(cmsPages)
    .where(eq(cmsPages.status, "published"));
  return rows.map(toPage);
}

export async function getPageBySlug(slug: string): Promise<CmsPage | undefined> {
  const [row] = await db.select().from(cmsPages).where(eq(cmsPages.slug, slug)).limit(1);
  return row ? toPage(row) : undefined;
}

export async function getPageById(id: string): Promise<CmsPage | undefined> {
  const [row] = await db.select().from(cmsPages).where(eq(cmsPages.id, id)).limit(1);
  return row ? toPage(row) : undefined;
}

export async function createPage(input: InsertCmsPage): Promise<CmsPage> {
  const now = new Date().toISOString();
  const slug = input.slug || slugify(input.title);
  const [duplicate] = await db
    .select({ id: cmsPages.id })
    .from(cmsPages)
    .where(eq(cmsPages.slug, slug))
    .limit(1);
  if (duplicate) {
    throw new Error("A page with this slug already exists");
  }
  const [page] = await db
    .insert(cmsPages)
    .values({
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
    })
    .returning();
  return toPage(page);
}

export async function updatePage(
  id: string,
  partial: Partial<InsertCmsPage>,
): Promise<CmsPage> {
  const [existing] = await db
    .select()
    .from(cmsPages)
    .where(eq(cmsPages.id, id))
    .limit(1);
  if (!existing) throw new Error("Page not found");
  if (partial.slug) {
    const [duplicate] = await db
      .select({ id: cmsPages.id })
      .from(cmsPages)
      .where(and(eq(cmsPages.slug, partial.slug), ne(cmsPages.id, id)))
      .limit(1);
    if (duplicate) {
      throw new Error("A page with this slug already exists");
    }
  }
  const [updated] = await db
    .update(cmsPages)
    .set({
      ...partial,
      seo: partial.seo ? { ...existing.seo, ...partial.seo } : existing.seo,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(cmsPages.id, id))
    .returning();
  return toPage(updated);
}

export async function deletePage(id: string): Promise<void> {
  await db.delete(cmsPages).where(eq(cmsPages.id, id));
}

export async function getBlogPosts(): Promise<CmsBlogPost[]> {
  const rows = await db.select().from(cmsBlogPosts);
  return rows.map(toBlogPost);
}

export async function getPublishedBlogPosts(): Promise<CmsBlogPost[]> {
  const rows = await db
    .select()
    .from(cmsBlogPosts)
    .where(eq(cmsBlogPosts.status, "published"));
  return rows
    .map(toBlogPost)
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? b.createdAt).getTime() -
        new Date(a.publishedAt ?? a.createdAt).getTime(),
    );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<CmsBlogPost | undefined> {
  const [row] = await db
    .select()
    .from(cmsBlogPosts)
    .where(eq(cmsBlogPosts.slug, slug))
    .limit(1);
  return row ? toBlogPost(row) : undefined;
}

export async function getBlogPostById(
  id: string,
): Promise<CmsBlogPost | undefined> {
  const [row] = await db.select().from(cmsBlogPosts).where(eq(cmsBlogPosts.id, id)).limit(1);
  return row ? toBlogPost(row) : undefined;
}

export async function createBlogPost(
  input: InsertCmsBlogPost,
): Promise<CmsBlogPost> {
  const now = new Date().toISOString();
  const slug = input.slug || slugify(input.title);
  const [duplicate] = await db
    .select({ id: cmsBlogPosts.id })
    .from(cmsBlogPosts)
    .where(eq(cmsBlogPosts.slug, slug))
    .limit(1);
  if (duplicate) {
    throw new Error("A blog post with this slug already exists");
  }
  const [post] = await db
    .insert(cmsBlogPosts)
    .values({
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
    })
    .returning();
  return toBlogPost(post);
}

export async function updateBlogPost(
  id: string,
  partial: Partial<InsertCmsBlogPost>,
): Promise<CmsBlogPost> {
  const [existing] = await db
    .select()
    .from(cmsBlogPosts)
    .where(eq(cmsBlogPosts.id, id))
    .limit(1);
  if (!existing) throw new Error("Blog post not found");
  if (partial.slug) {
    const [duplicate] = await db
      .select({ id: cmsBlogPosts.id })
      .from(cmsBlogPosts)
      .where(and(eq(cmsBlogPosts.slug, partial.slug), ne(cmsBlogPosts.id, id)))
      .limit(1);
    if (duplicate) {
      throw new Error("A blog post with this slug already exists");
    }
  }
  const status = partial.status ?? existing.status;
  let publishedAt = partial.publishedAt ?? existing.publishedAt;
  if (status === "published" && !publishedAt) {
    publishedAt = new Date().toISOString();
  }
  const [updated] = await db
    .update(cmsBlogPosts)
    .set({
      ...partial,
      publishedAt,
      seo: partial.seo ? { ...existing.seo, ...partial.seo } : existing.seo,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(cmsBlogPosts.id, id))
    .returning();
  return toBlogPost(updated);
}

export async function deleteBlogPost(id: string): Promise<void> {
  await db.delete(cmsBlogPosts).where(eq(cmsBlogPosts.id, id));
}

export async function getTestimonials(): Promise<CmsTestimonial[]> {
  const rows = await db.select().from(cmsTestimonials);
  return rows.map(toTestimonial);
}

export async function createTestimonial(
  input: InsertCmsTestimonial,
): Promise<CmsTestimonial> {
  const [testimonial] = await db
    .insert(cmsTestimonials)
    .values({
      id: randomUUID(),
      name: input.name,
      company: input.company ?? "",
      content: input.content,
      rating: input.rating ?? 5,
      published: input.published ?? true,
      createdAt: new Date().toISOString(),
    })
    .returning();
  return toTestimonial(testimonial);
}

export async function updateTestimonial(
  id: string,
  partial: Partial<InsertCmsTestimonial>,
): Promise<CmsTestimonial> {
  const [existing] = await db
    .select()
    .from(cmsTestimonials)
    .where(eq(cmsTestimonials.id, id))
    .limit(1);
  if (!existing) throw new Error("Testimonial not found");
  const [updated] = await db
    .update(cmsTestimonials)
    .set({ ...existing, ...partial })
    .where(eq(cmsTestimonials.id, id))
    .returning();
  return toTestimonial(updated);
}

export async function deleteTestimonial(id: string): Promise<void> {
  await db.delete(cmsTestimonials).where(eq(cmsTestimonials.id, id));
}

export async function getDownloads(): Promise<CmsDownload[]> {
  await seedDefaultDownloadsIfEmpty();
  const rows = await db.select().from(cmsDownloads).orderBy(asc(cmsDownloads.sortOrder));
  return rows.map(toDownload);
}

export async function getPublishedDownloads(): Promise<CmsDownload[]> {
  await seedDefaultDownloadsIfEmpty();
  const rows = await db
    .select()
    .from(cmsDownloads)
    .where(eq(cmsDownloads.published, true))
    .orderBy(asc(cmsDownloads.sortOrder));
  return rows.map(toDownload);
}

export async function getDownloadById(id: string): Promise<CmsDownload | undefined> {
  const [row] = await db.select().from(cmsDownloads).where(eq(cmsDownloads.id, id)).limit(1);
  return row ? toDownload(row) : undefined;
}

export async function createDownload(input: InsertCmsDownload): Promise<CmsDownload> {
  const now = new Date().toISOString();
  const [download] = await db
    .insert(cmsDownloads)
    .values({
      id: randomUUID(),
      title: input.title,
      description: input.description ?? "",
      category: normalizeDownloadCategory(input.category, input.title, input.description),
      fileSize: input.fileSize ?? "",
      filePath: input.filePath,
      icon: input.icon ?? "file-text",
      published: input.published ?? true,
      sortOrder: input.sortOrder ?? 0,
      createdAt: now,
      updatedAt: now,
    })
    .returning();
  return toDownload(download);
}

export async function updateDownload(
  id: string,
  partial: Partial<InsertCmsDownload>,
): Promise<CmsDownload> {
  const [existing] = await db
    .select()
    .from(cmsDownloads)
    .where(eq(cmsDownloads.id, id))
    .limit(1);
  if (!existing) throw new Error("Download not found");
  const [updated] = await db
    .update(cmsDownloads)
    .set({
      ...existing,
      ...partial,
      category: normalizeDownloadCategory(
        partial.category ?? existing.category,
        partial.title ?? existing.title,
        partial.description ?? existing.description,
      ),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(cmsDownloads.id, id))
    .returning();
  return toDownload(updated);
}

export async function deleteDownload(id: string): Promise<void> {
  await db.delete(cmsDownloads).where(eq(cmsDownloads.id, id));
}

export async function resetCmsDefaults(): Promise<CmsData> {
  await db.delete(cmsPages);
  await db.delete(cmsBlogPosts);
  await db.delete(cmsTestimonials);
  await db.delete(cmsDownloads);
  await db.insert(cmsDownloads).values(buildDefaultDownloads());
  await db.delete(cmsSettings);
  await db.insert(cmsSettings).values({ id: "default", ...defaultCmsSettings() });
  return getCmsData();
}

export async function getLeadEmail(): Promise<string> {
  return (await getSettings()).leadEmail;
}
