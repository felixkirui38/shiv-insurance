import type { LucideIcon } from "lucide-react";
import {
  Inbox,
  FileText,
  Newspaper,
  Search,
  Code2,
  MessageSquareQuote,
  Download,
  Plug,
} from "lucide-react";

export type CmsSection =
  | "inquiries"
  | "pages"
  | "blog"
  | "seo"
  | "scripts"
  | "testimonials"
  | "downloads"
  | "connections";

export const CMS_NAV_ITEMS: {
  id: CmsSection;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "inquiries", label: "Inquiries", icon: Inbox },
  { id: "pages", label: "Pages", icon: FileText },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "seo", label: "SEO", icon: Search },
  { id: "scripts", label: "Scripts", icon: Code2 },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "connections", label: "Connections", icon: Plug },
];
