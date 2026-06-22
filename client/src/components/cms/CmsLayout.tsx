import { useState } from "react";
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
  Menu,
  Home,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { cmsLogout } from "@/lib/cms-api";
import { useQuery } from "@tanstack/react-query";
import { CmsShell } from "@/components/cms/CmsShell";

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

interface CmsSidebarProps {
  location: string;
  inquiryCount?: number;
  onReset?: () => void;
  onNavigate?: () => void;
  onLogout: () => void;
  showApiBadge?: boolean;
}

function CmsSidebar({
  location,
  inquiryCount,
  onReset,
  onNavigate,
  onLogout,
  showApiBadge,
}: CmsSidebarProps) {
  return (
    <>
      <div className="border-b border-gray-200 px-4 py-4 sm:px-5 sm:py-5">
        <h1 className="text-lg font-bold text-gray-900">Shiv CMS</h1>
        {showApiBadge && (
          <Badge className="mt-2 bg-emerald-500 hover:bg-emerald-500 text-white text-xs">
            API connected
          </Badge>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = location === href || location.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
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
        <Button
          variant="outline"
          className="w-full justify-start gap-2 lg:hidden"
          asChild
        >
          <Link href="/" onClick={onNavigate}>
            <Home className="h-4 w-4" />
            View website
          </Link>
        </Button>
        {onReset && (
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => {
              onReset();
              onNavigate?.();
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Defaults
          </Button>
        )}
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { data: health } = useQuery({
    queryKey: ["/api/cms/health"],
    refetchInterval: 30000,
  });

  const handleLogout = async () => {
    await cmsLogout();
    setLocation("/admin/login");
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  const sidebarProps: CmsSidebarProps = {
    location,
    inquiryCount,
    onReset,
    onLogout: handleLogout,
    showApiBadge: health?.connected,
  };

  return (
    <CmsShell>
      <div className="flex min-h-screen w-full flex-col bg-[#f4f6f8] shadow-lg lg:flex-row lg:border-x lg:border-gray-200">
        <header className="flex items-center justify-between gap-3 border-b border-gray-200 bg-[#f4f6f8] px-4 py-3 lg:hidden">
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open CMS menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[min(100vw-2rem,18rem)] flex-col p-0">
              <CmsSidebar {...sidebarProps} onNavigate={closeMobileNav} />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-sm font-bold text-gray-900">Shiv CMS</p>
            <p className="truncate text-xs text-gray-500">{title}</p>
          </div>

          <Button variant="outline" size="icon" asChild>
            <Link href="/" aria-label="Return to website home">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
        </header>

        <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-200 bg-[#f4f6f8] lg:flex">
          <CmsSidebar {...sidebarProps} />
        </aside>

        <main className="min-w-0 flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
          <div className="mx-auto w-full max-w-5xl rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 sm:py-5">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
                {description && (
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
              </div>
              {headerActions && (
                <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
                  {headerActions}
                </div>
              )}
            </div>
            <div className="cms-layout-body p-4 sm:p-6">{children}</div>
          </div>
        </main>
      </div>
    </CmsShell>
  );
}
