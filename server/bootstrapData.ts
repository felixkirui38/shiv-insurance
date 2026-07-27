import { access, readFile } from "fs/promises";
import { constants as fsConstants } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import { count } from "drizzle-orm";
import { type AnyPgTable } from "drizzle-orm/pg-core";
import {
  cmsBlogPosts,
  cmsDownloads,
  cmsPages,
  cmsSettings,
  cmsTestimonials,
  contacts,
} from "@shared/schema";
import {
  cmsDataSchema,
  defaultCmsSettings,
  normalizeDownloadCategory,
} from "@shared/cms-schema";
import { db } from "./db";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const cmsJsonPath = join(__dirname, "data", "cms.json");
const inquiriesJsonPath = join(__dirname, "data", "inquiries.json");

async function exists(path: string): Promise<boolean> {
  try {
    await access(path, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function isTableEmpty(table: AnyPgTable) {
  const [row] = await db.select({ total: count() }).from(table);
  return Number(row.total) === 0;
}

/**
 * One-time legacy JSON → PostgreSQL import.
 * Each table is imported only when that table is empty, so live CMS/inquiry
 * rows are never overwritten on later deploys or restarts.
 */
export async function bootstrapLegacyJsonData(): Promise<void> {
  const [pagesEmpty, blogEmpty, testimonialsEmpty, downloadsEmpty, settingsEmpty, contactsEmpty] =
    await Promise.all([
      isTableEmpty(cmsPages),
      isTableEmpty(cmsBlogPosts),
      isTableEmpty(cmsTestimonials),
      isTableEmpty(cmsDownloads),
      isTableEmpty(cmsSettings),
      isTableEmpty(contacts),
    ]);

  const needsCmsImport =
    pagesEmpty || blogEmpty || testimonialsEmpty || downloadsEmpty || settingsEmpty;
  const cmsJsonAvailable = needsCmsImport && (await exists(cmsJsonPath));
  const legacyCms = cmsJsonAvailable
    ? cmsDataSchema.parse(JSON.parse(await readFile(cmsJsonPath, "utf-8")))
    : null;

  // Settings: insert once when empty. Prefer legacy JSON values; never update existing rows.
  if (settingsEmpty) {
    await db.insert(cmsSettings).values({
      id: "default",
      ...(legacyCms?.settings ?? defaultCmsSettings()),
    });
  }

  if (legacyCms) {
    if (pagesEmpty && legacyCms.pages.length) {
      await db.insert(cmsPages).values(legacyCms.pages);
    }
    if (blogEmpty && legacyCms.blogPosts.length) {
      await db.insert(cmsBlogPosts).values(legacyCms.blogPosts);
    }
    if (testimonialsEmpty && legacyCms.testimonials.length) {
      await db.insert(cmsTestimonials).values(legacyCms.testimonials);
    }
    if (downloadsEmpty && legacyCms.downloads.length) {
      await db.insert(cmsDownloads).values(
        legacyCms.downloads.map((download) => ({
          ...download,
          category: normalizeDownloadCategory(
            download.category,
            download.title,
            download.description,
          ),
        })),
      );
    }
  }

  // Contacts/inquiries: insert only when the contacts table has zero rows.
  if (contactsEmpty && (await exists(inquiriesJsonPath))) {
    const raw = await readFile(inquiriesJsonPath, "utf-8");
    const parsed = JSON.parse(raw) as Array<{
      id?: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      insuranceType?: string;
      message: string;
      formName?: string;
      createdAt?: string | null;
    }>;
    if (parsed.length > 0) {
      await db.insert(contacts).values(
        parsed.map((contact) => ({
          id: contact.id ?? randomUUID(),
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          insuranceType: contact.insuranceType ?? "General Inquiry",
          message: contact.message,
          formName: contact.formName ?? "Contact Form",
          createdAt: contact.createdAt ?? new Date().toISOString(),
        })),
      );
    }
  }
}

