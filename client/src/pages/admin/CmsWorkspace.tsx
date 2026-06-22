import { useQuery } from "@tanstack/react-query";
import { cmsMe } from "@/lib/cms-api";
import { useCmsModal } from "@/components/cms/CmsModalContext";
import AdminLogin from "./AdminLogin";
import InquiriesPage from "./InquiriesPage";
import PagesPage from "./PagesPage";
import BlogPage from "./BlogPage";
import SeoPage from "./SeoPage";
import ScriptsPage from "./ScriptsPage";
import TestimonialsPage from "./TestimonialsPage";
import DownloadsPage from "./DownloadsPage";
import ConnectionsPage from "./ConnectionsPage";

export default function CmsWorkspace() {
  const { section } = useCmsModal();
  const { data, isLoading } = useQuery({
    queryKey: ["/api/cms/me"],
    queryFn: cmsMe,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[12rem] items-center justify-center bg-[#eef1f5]">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!data?.authenticated) {
    return <AdminLogin />;
  }

  switch (section) {
    case "inquiries":
      return <InquiriesPage />;
    case "pages":
      return <PagesPage />;
    case "blog":
      return <BlogPage />;
    case "seo":
      return <SeoPage />;
    case "scripts":
      return <ScriptsPage />;
    case "testimonials":
      return <TestimonialsPage />;
    case "downloads":
      return <DownloadsPage />;
    case "connections":
      return <ConnectionsPage />;
    default:
      return <InquiriesPage />;
  }
}
