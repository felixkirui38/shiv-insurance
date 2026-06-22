import { useState } from "react";
import {
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CmsShell } from "@/components/cms/CmsShell";
import { useCmsModal } from "@/components/cms/CmsModalContext";
import { CMS_NAV_ITEMS, type CmsSection } from "@/lib/cms-sections";

interface CmsLayoutProps {
  title: string;
  description?: string;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  inquiryCount?: number;
  onReset?: () => void;
}

interface CmsSidebarProps {
  activeSection: CmsSection;
  onSectionChange: (section: CmsSection) => void;
  inquiryCount?: number;
  onReset?: () => void;
  onNavigate?: () => void;
  onLogout: () => void;
  onClose: () => void;
  showApiBadge?: boolean;
}

function CmsSidebar({
  activeSection,
  onSectionChange,
  inquiryCount,
  onReset,
  onNavigate,
  onLogout,
  onClose,
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
        {CMS_NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeSection === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                onSectionChange(id);
                onNavigate?.();
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left",
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
            </button>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-gray-200 p-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 lg:hidden"
          type="button"
          onClick={() => {
            onClose();
            onNavigate?.();
          }}
        >
          <Home className="h-4 w-4" />
          View website
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
          type="button"
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const queryClient = useQueryClient();
  const { section, setSection, closeCms } = useCmsModal();

  const { data: health } = useQuery({
    queryKey: ["/api/cms/health"],
    refetchInterval: 30000,
  });

  const handleLogout = async () => {
    await cmsLogout();
    queryClient.setQueryData(["/api/cms/me"], { success: true, authenticated: false });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/me"] });
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  const sidebarProps: CmsSidebarProps = {
    activeSection: section,
    onSectionChange: setSection,
    inquiryCount,
    onReset,
    onLogout: handleLogout,
    onClose: closeCms,
    showApiBadge: health?.connected,
  };

  return (
    <CmsShell>
      <div className="flex h-full min-h-0 w-full flex-col bg-[#f4f6f8] lg:flex-row">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-[#f4f6f8] px-4 py-3 lg:hidden">
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

          <Button variant="outline" size="icon" type="button" onClick={closeCms} aria-label="Return to website">
            <Home className="h-5 w-5" />
          </Button>
        </header>

        <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-200 bg-[#f4f6f8] lg:flex">
          <CmsSidebar {...sidebarProps} />
        </aside>

        <main className="min-h-0 min-w-0 flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
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
