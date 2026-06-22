import { useQuery } from "@tanstack/react-query";
import { Redirect, Route, Switch } from "wouter";
import { cmsMe } from "@/lib/cms-api";
import AdminLogin from "./AdminLogin";
import InquiriesPage from "./InquiriesPage";
import PagesPage from "./PagesPage";
import BlogPage from "./BlogPage";
import SeoPage from "./SeoPage";
import ScriptsPage from "./ScriptsPage";
import TestimonialsPage from "./TestimonialsPage";
import DownloadsPage from "./DownloadsPage";
import ConnectionsPage from "./ConnectionsPage";
import { CmsShell } from "@/components/cms/CmsShell";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/cms/me"],
    queryFn: cmsMe,
    retry: false,
  });

  if (isLoading) {
    return (
      <CmsShell>
        <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8 lg:border-x lg:border-gray-200 lg:shadow-lg">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </CmsShell>
    );
  }

  if (!data?.authenticated) {
    return <Redirect to="/admin/login" />;
  }

  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/inquiries">
        <AdminGuard>
          <InquiriesPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/pages">
        <AdminGuard>
          <PagesPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/blog">
        <AdminGuard>
          <BlogPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/seo">
        <AdminGuard>
          <SeoPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/scripts">
        <AdminGuard>
          <ScriptsPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/testimonials">
        <AdminGuard>
          <TestimonialsPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/downloads">
        <AdminGuard>
          <DownloadsPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/connections">
        <AdminGuard>
          <ConnectionsPage />
        </AdminGuard>
      </Route>
      <Route path="/admin">
        <Redirect to="/admin/inquiries" />
      </Route>
    </Switch>
  );
}
