import { sql } from "drizzle-orm";
import { boolean, integer, jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { defaultSeoFields } from "./cms-schema";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  insuranceType: text("insurance_type").notNull(),
  message: text("message").notNull(),
  formName: text("form_name").default("Contact Form"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow(),
});

export const cmsPages = pgTable("cms_pages", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull().default(""),
  appearance: text("appearance").$type<"services" | "footer_links">().notNull().default("services"),
  content: text("content").notNull().default(""),
  status: text("status").$type<"draft" | "published">().notNull().default("draft"),
  seo: jsonb("seo").$type<Record<string, unknown>>().notNull().default(defaultSeoFields()),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).notNull(),
});

export const cmsBlogPosts = pgTable("cms_blog_posts", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull().default(""),
  appearance: text("appearance").notNull().default("blog_listing"),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  author: text("author").notNull().default("Shiv Insurance"),
  featuredImage: text("featured_image").notNull().default(""),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  status: text("status").$type<"draft" | "published">().notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "string" }),
  seo: jsonb("seo").$type<Record<string, unknown>>().notNull().default(defaultSeoFields()),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).notNull(),
});

export const cmsTestimonials = pgTable("cms_testimonials", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull().default(""),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull(),
});

export const cmsDownloads = pgTable("cms_downloads", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  category: text("category").notNull().default("Proposal Forms"),
  fileSize: text("file_size").notNull().default(""),
  filePath: text("file_path").notNull(),
  icon: text("icon").notNull().default("file-text"),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).notNull(),
});

export const cmsSettings = pgTable("cms_settings", {
  id: varchar("id").primaryKey(),
  leadEmail: text("lead_email").notNull().default("info@shivinsbro.co.ke"),
  siteName: text("site_name").notNull().default("Shiv Insurance Brokers Ltd"),
  siteUrl: text("site_url").notNull().default(""),
  defaultMetaTitle: text("default_meta_title").notNull().default("Shiv Insurance Brokers Ltd"),
  defaultMetaDescription: text("default_meta_description").notNull().default(""),
  defaultMetaKeywords: text("default_meta_keywords").notNull().default(""),
  defaultOgImage: text("default_og_image").notNull().default(""),
  twitterHandle: text("twitter_handle").notNull().default(""),
  googleAnalyticsId: text("google_analytics_id").notNull().default(""),
  googleTagManagerId: text("google_tag_manager_id").notNull().default(""),
  headScripts: text("head_scripts").notNull().default(""),
  footerScripts: text("footer_scripts").notNull().default(""),
  robotsTxt: text("robots_txt").notNull().default("User-agent: *\nAllow: /"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const formSubmissionSchema = z.object({
  formName: z.string().min(1, "Form name is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  insuranceType: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type FormSubmission = z.infer<typeof formSubmissionSchema>;
