import { Link, useLocation } from "wouter";
import {
  Inbox,
  FileText,
  Newspaper,
  Search,
  Code2,
  MessageSquareQuote,
  Download,
  Plug,
  LogOut,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cmsLogout } from "@/lib/cms-api";
import { useQuery } from "@tanstack/react-query";

const navItems = [
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/scripts", label: "Scripts", icon: Code2 },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/downloads", label: "Downloads", icon: Download },
  { href: "/admin/connections", label: "Connections", icon: Plug },
];

interface CmsLayoutProps {
  title: string;
  description?: string;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  inquiryCount?: number;
  onReset?: () => void;
}

export default function CmsLayout({
  title,
  description,
  headerActions,
  children,
  inquiryCount,
  onReset,
}: CmsLayoutProps) {
  const [location, setLocation] = useLocation();

  const { data: health } = useQuery({
    queryKey: ["/api/cms/health"],
    refetchInterval: 30000,
  });

  const handleLogout = async () => {
    await cmsLogout();
    setLocation("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#eef1f5]">
      <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-[#f4f6f8]">
        <div className="border-b border-gray-200 px-5 py-5">
          <h1 className="text-lg font-bold text-gray-900">Shiv CMS</h1>
          {health?.connected && (
            <Badge className="mt-2 bg-emerald-500 hover:bg-emerald-500 text-white text-xs">
              API connected
            </Badge>
          )}
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = location === href || location.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-shiv-navy text-white"
                    : "text-gray-700 hover:bg-gray-200/70",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {label === "Inquiries" && inquiryCount !== undefined && inquiryCount > 0 && (
                  <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                    {inquiryCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-gray-200 p-3">
          {onReset && (
            <Button
              variant="outline"
              className="w-full justify-start gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={onReset}
            >
              <RotateCcw className="h-4 w-4" />
              Reset Defaults
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
            {headerActions && (
              <div className="flex shrink-0 items-center gap-2">{headerActions}</div>
            )}
          </div>
          <div className="p-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
