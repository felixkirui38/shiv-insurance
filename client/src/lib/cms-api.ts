import { apiRequest } from "./queryClient";
import type {
  CmsPage,
  CmsBlogPost,
  CmsSettings,
  CmsTestimonial,
  CmsDownload,
  InsertCmsPage,
  InsertCmsBlogPost,
  InsertCmsDownload,
  SeoFields,
} from "@shared/cms-schema";
import type { Contact } from "@shared/schema";

export async function cmsLogin(username: string, password: string) {
  const res = await apiRequest("POST", "/api/cms/login", { username, password });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}

export async function cmsLogout() {
  const res = await apiRequest("POST", "/api/cms/logout");
  return res.json();
}

export async function cmsMe() {
  const res = await fetch("/api/cms/me", { credentials: "include" });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchInquiries(): Promise<Contact[]> {
  const res = await apiRequest("GET", "/api/cms/inquiries");
  const data = await res.json();
  return data.inquiries;
}

export async function fetchSettings(): Promise<CmsSettings> {
  const res = await apiRequest("GET", "/api/cms/settings");
  const data = await res.json();
  return data.settings;
}

export async function saveSettings(settings: Partial<CmsSettings>) {
  const res = await apiRequest("PUT", "/api/cms/settings", settings);
  return res.json();
}

export async function saveLeadEmail(leadEmail: string) {
  const res = await apiRequest("PUT", "/api/cms/settings/lead-email", { leadEmail });
  return res.json();
}

export async function fetchPages(): Promise<CmsPage[]> {
  const res = await apiRequest("GET", "/api/cms/pages");
  const data = await res.json();
  return data.pages;
}

export async function createPage(page: InsertCmsPage) {
  const res = await apiRequest("POST", "/api/cms/pages", page);
  return res.json();
}

export async function updatePage(id: string, page: Partial<InsertCmsPage>) {
  const res = await apiRequest("PUT", `/api/cms/pages/${id}`, page);
  return res.json();
}

export async function deletePage(id: string) {
  const res = await apiRequest("DELETE", `/api/cms/pages/${id}`);
  return res.json();
}

export async function fetchBlogPosts(): Promise<CmsBlogPost[]> {
  const res = await apiRequest("GET", "/api/cms/blog");
  const data = await res.json();
  return data.posts;
}

export async function createBlogPost(post: InsertCmsBlogPost) {
  const res = await apiRequest("POST", "/api/cms/blog", post);
  return res.json();
}

export async function updateBlogPost(id: string, post: Partial<InsertCmsBlogPost>) {
  const res = await apiRequest("PUT", `/api/cms/blog/${id}`, post);
  return res.json();
}

export async function deleteBlogPost(id: string) {
  const res = await apiRequest("DELETE", `/api/cms/blog/${id}`);
  return res.json();
}

export async function fetchTestimonials(): Promise<CmsTestimonial[]> {
  const res = await apiRequest("GET", "/api/cms/testimonials");
  const data = await res.json();
  return data.testimonials;
}

export async function createTestimonial(data: Omit<CmsTestimonial, "id" | "createdAt">) {
  const res = await apiRequest("POST", "/api/cms/testimonials", data);
  return res.json();
}

export async function updateTestimonial(id: string, data: Partial<CmsTestimonial>) {
  const res = await apiRequest("PUT", `/api/cms/testimonials/${id}`, data);
  return res.json();
}

export async function deleteTestimonial(id: string) {
  const res = await apiRequest("DELETE", `/api/cms/testimonials/${id}`);
  return res.json();
}

export interface UploadedDownloadFile {
  filePath: string;
  fileSize: string;
  originalName: string;
}

export async function uploadDownloadFile(file: File): Promise<UploadedDownloadFile> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/cms/downloads/upload", {
    method: "POST",
    body,
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Upload failed");
  }
  return data.file;
}

export async function fetchDownloads(): Promise<CmsDownload[]> {
  const res = await apiRequest("GET", "/api/cms/downloads");
  const data = await res.json();
  return data.downloads;
}

export async function createDownload(download: InsertCmsDownload) {
  const res = await apiRequest("POST", "/api/cms/downloads", download);
  return res.json();
}

export async function updateDownload(id: string, download: Partial<InsertCmsDownload>) {
  const res = await apiRequest("PUT", `/api/cms/downloads/${id}`, download);
  return res.json();
}

export async function deleteDownload(id: string) {
  const res = await apiRequest("DELETE", `/api/cms/downloads/${id}`);
  return res.json();
}

export async function resetCmsDefaults() {
  const res = await apiRequest("POST", "/api/cms/reset");
  return res.json();
}

export type { SeoFields, CmsPage, CmsBlogPost, CmsSettings, CmsTestimonial, CmsDownload };
