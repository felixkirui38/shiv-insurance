import type { Express } from "express";
import { z } from "zod";
import {
  insertCmsPageSchema,
  updateCmsPageSchema,
  normalizePageAppearance,
  insertCmsBlogPostSchema,
  updateCmsBlogPostSchema,
  insertCmsTestimonialSchema,
  insertCmsDownloadSchema,
  updateCmsDownloadSchema,
  cmsSettingsSchema,
} from "@shared/cms-schema";
import {
  requireCmsAuth,
  cmsLoginHandler,
  cmsLogoutHandler,
  cmsMeHandler,
} from "./cmsAuth";
import * as cms from "./cmsStorage";
import { storage } from "./storage";
import { downloadUpload, formatFileSizeLabel } from "./downloadUpload";

function handleError(res: import("express").Response, error: unknown) {
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.errors,
    });
  }
  const message = error instanceof Error ? error.message : "Server error";
  const status = message.includes("not found") ? 404 : 500;
  res.status(status).json({ success: false, message });
}

export function registerCmsRoutes(app: Express) {
  // Auth
  app.post("/api/cms/login", cmsLoginHandler);
  app.post("/api/cms/logout", cmsLogoutHandler);
  app.get("/api/cms/me", cmsMeHandler);
  app.get("/api/cms/health", (_req, res) => {
    res.json({ success: true, connected: true });
  });

  // Inquiries (protected)
  app.get("/api/cms/inquiries", requireCmsAuth, async (_req, res) => {
    try {
      const contacts = await storage.getContacts();
      const sorted = contacts.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      );
      res.json({ success: true, inquiries: sorted });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Settings
  app.get("/api/cms/settings", requireCmsAuth, async (_req, res) => {
    try {
      const settings = await cms.getSettings();
      res.json({ success: true, settings });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.put("/api/cms/settings", requireCmsAuth, async (req, res) => {
    try {
      const partial = cmsSettingsSchema.partial().parse(req.body);
      const settings = await cms.updateSettings(partial);
      res.json({ success: true, settings });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.put("/api/cms/settings/lead-email", requireCmsAuth, async (req, res) => {
    try {
      const { leadEmail } = z.object({ leadEmail: z.string().email() }).parse(req.body);
      const settings = await cms.updateSettings({ leadEmail });
      res.json({ success: true, settings });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Pages CRUD
  app.get("/api/cms/pages", requireCmsAuth, async (_req, res) => {
    try {
      const pages = await cms.getPages();
      res.json({ success: true, pages });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/cms/pages/:id", requireCmsAuth, async (req, res) => {
    try {
      const page = await cms.getPageById(req.params.id);
      if (!page) return res.status(404).json({ success: false, message: "Page not found" });
      res.json({ success: true, page });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post("/api/cms/pages", requireCmsAuth, async (req, res) => {
    try {
      const data = insertCmsPageSchema.parse(req.body);
      const page = await cms.createPage(data);
      res.status(201).json({ success: true, page });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.put("/api/cms/pages/:id", requireCmsAuth, async (req, res) => {
    try {
      const data = updateCmsPageSchema.parse(req.body);
      const page = await cms.updatePage(req.params.id, data);
      res.json({ success: true, page });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.delete("/api/cms/pages/:id", requireCmsAuth, async (req, res) => {
    try {
      await cms.deletePage(req.params.id);
      res.json({ success: true });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Blog CRUD
  app.get("/api/cms/blog", requireCmsAuth, async (_req, res) => {
    try {
      const posts = await cms.getBlogPosts();
      res.json({ success: true, posts });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/cms/blog/:id", requireCmsAuth, async (req, res) => {
    try {
      const post = await cms.getBlogPostById(req.params.id);
      if (!post) return res.status(404).json({ success: false, message: "Post not found" });
      res.json({ success: true, post });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post("/api/cms/blog", requireCmsAuth, async (req, res) => {
    try {
      const data = insertCmsBlogPostSchema.parse(req.body);
      const post = await cms.createBlogPost(data);
      res.status(201).json({ success: true, post });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.put("/api/cms/blog/:id", requireCmsAuth, async (req, res) => {
    try {
      const data = updateCmsBlogPostSchema.parse(req.body);
      const post = await cms.updateBlogPost(req.params.id, data);
      res.json({ success: true, post });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.delete("/api/cms/blog/:id", requireCmsAuth, async (req, res) => {
    try {
      await cms.deleteBlogPost(req.params.id);
      res.json({ success: true });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Testimonials CRUD
  app.get("/api/cms/testimonials", requireCmsAuth, async (_req, res) => {
    try {
      const testimonials = await cms.getTestimonials();
      res.json({ success: true, testimonials });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post("/api/cms/testimonials", requireCmsAuth, async (req, res) => {
    try {
      const data = insertCmsTestimonialSchema.parse(req.body);
      const testimonial = await cms.createTestimonial(data);
      res.status(201).json({ success: true, testimonial });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.put("/api/cms/testimonials/:id", requireCmsAuth, async (req, res) => {
    try {
      const data = insertCmsTestimonialSchema.partial().parse(req.body);
      const testimonial = await cms.updateTestimonial(req.params.id, data);
      res.json({ success: true, testimonial });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.delete("/api/cms/testimonials/:id", requireCmsAuth, async (req, res) => {
    try {
      await cms.deleteTestimonial(req.params.id);
      res.json({ success: true });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Download file upload
  app.post(
    "/api/cms/downloads/upload",
    requireCmsAuth,
    (req, res, next) => {
      downloadUpload.single("file")(req, res, (err: unknown) => {
        if (err) {
          const message = err instanceof Error ? err.message : "Upload failed";
          return res.status(400).json({ success: false, message });
        }
        next();
      });
    },
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ success: false, message: "No file selected" });
        }
        res.json({
          success: true,
          file: {
            filePath: `/downloads/${req.file.filename}`,
            fileSize: formatFileSizeLabel(req.file.size),
            originalName: req.file.originalname,
          },
        });
      } catch (error) {
        handleError(res, error);
      }
    },
  );

  // Downloads CRUD
  app.get("/api/cms/downloads", requireCmsAuth, async (_req, res) => {
    try {
      const downloads = await cms.getDownloads();
      res.json({ success: true, downloads });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post("/api/cms/downloads", requireCmsAuth, async (req, res) => {
    try {
      const data = insertCmsDownloadSchema.parse(req.body);
      const download = await cms.createDownload(data);
      res.status(201).json({ success: true, download });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.put("/api/cms/downloads/:id", requireCmsAuth, async (req, res) => {
    try {
      const data = updateCmsDownloadSchema.parse(req.body);
      const download = await cms.updateDownload(req.params.id, data);
      res.json({ success: true, download });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.delete("/api/cms/downloads/:id", requireCmsAuth, async (req, res) => {
    try {
      await cms.deleteDownload(req.params.id);
      res.json({ success: true });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Reset
  app.post("/api/cms/reset", requireCmsAuth, async (_req, res) => {
    try {
      const data = await cms.resetCmsDefaults();
      res.json({ success: true, data });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Public content API
  app.get("/api/content/settings", async (_req, res) => {
    try {
      const settings = await cms.getSettings();
      res.json({
        success: true,
        settings: {
          siteName: settings.siteName,
          siteUrl: settings.siteUrl,
          defaultMetaTitle: settings.defaultMetaTitle,
          defaultMetaDescription: settings.defaultMetaDescription,
          defaultMetaKeywords: settings.defaultMetaKeywords,
          defaultOgImage: settings.defaultOgImage,
          twitterHandle: settings.twitterHandle,
          googleAnalyticsId: settings.googleAnalyticsId,
          googleTagManagerId: settings.googleTagManagerId,
          headScripts: settings.headScripts,
          footerScripts: settings.footerScripts,
        },
      });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/content/pages", async (_req, res) => {
    try {
      const pages = await cms.getPublishedPages();
      res.json({
        success: true,
        pages: pages.map(({ id, title, slug, appearance, updatedAt }) => ({
          id,
          title,
          slug,
          appearance: normalizePageAppearance(appearance),
          updatedAt,
        })),
      });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/content/pages/:slug", async (req, res) => {
    try {
      const page = await cms.getPageBySlug(req.params.slug);
      if (!page || page.status !== "published") {
        return res.status(404).json({ success: false, message: "Page not found" });
      }
      res.json({ success: true, page });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/content/blog", async (_req, res) => {
    try {
      const posts = await cms.getPublishedBlogPosts();
      res.json({
        success: true,
        posts: posts.map(
          ({
            id,
            title,
            slug,
            excerpt,
            author,
            featuredImage,
            tags,
            category,
            publishedAt,
            createdAt,
          }) => ({
            id,
            title,
            slug,
            excerpt,
            author,
            featuredImage,
            tags,
            category,
            publishedAt,
            createdAt,
          }),
        ),
      });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/content/blog/:slug", async (req, res) => {
    try {
      const post = await cms.getBlogPostBySlug(req.params.slug);
      if (!post || post.status !== "published") {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
      res.json({ success: true, post });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/content/downloads", async (_req, res) => {
    try {
      const downloads = await cms.getPublishedDownloads();
      res.json({
        success: true,
        downloads: downloads.map(
          ({
            id,
            title,
            description,
            category,
            fileSize,
            filePath,
            icon,
            sortOrder,
          }) => ({
            id,
            title,
            description,
            category,
            fileSize,
            filePath,
            icon,
            sortOrder,
          }),
        ),
      });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/content/testimonials", async (_req, res) => {
    try {
      const testimonials = (await cms.getTestimonials()).filter((t) => t.published);
      res.json({ success: true, testimonials });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/robots.txt", async (_req, res) => {
    try {
      const settings = await cms.getSettings();
      res.type("text/plain").send(settings.robotsTxt || "User-agent: *\nAllow: /");
    } catch {
      res.type("text/plain").send("User-agent: *\nAllow: /");
    }
  });
}
