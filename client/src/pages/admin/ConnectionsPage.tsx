import { useQuery } from "@tanstack/react-query";
import CmsLayout from "@/components/cms/CmsLayout";
import { Badge } from "@/components/ui/badge";
import { fetchInquiries, resetCmsDefaults } from "@/lib/cms-api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ConnectionsPage() {
  const queryClient = useQueryClient();
  const [showReset, setShowReset] = useState(false);

  const { data: inquiries = [] } = useQuery({
    queryKey: ["/api/cms/inquiries"],
    queryFn: fetchInquiries,
  });

  const { data: health } = useQuery({
    queryKey: ["/api/cms/health"],
  });

  const connections = [
    {
      name: "CMS API",
      status: health?.connected ? "connected" : "disconnected",
      description: "Backend content management API",
    },
    {
      name: "SMTP Email",
      status: process.env.NODE_ENV === "development" ? "check server env" : "configured via server",
      description: "Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS on the server for email delivery",
    },
    {
      name: "Contact Forms",
      status: "active",
      description: "Contact and Services forms submit to /api/submit-form",
    },
  ];

  return (
    <>
      <CmsLayout title="Connections" inquiryCount={inquiries.length} onReset={() => setShowReset(true)}>
        <p className="mb-6 text-sm text-muted-foreground">
          Integration status for external services connected to your CMS.
        </p>

        <div className="space-y-4">
          {connections.map((conn) => (
            <div
              key={conn.name}
              className="flex items-start justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{conn.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{conn.description}</p>
              </div>
              <Badge
                className={
                  conn.status === "connected" || conn.status === "active"
                    ? "bg-emerald-500 hover:bg-emerald-500"
                    : "bg-gray-400 hover:bg-gray-400"
                }
              >
                {conn.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-gray-50 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-gray-700">Environment variables</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li><code>CMS_USERNAME</code> — admin login username (default: shiv.io)</li>
            <li><code>CMS_PASSWORD</code> — admin login password (default: 123)</li>
            <li><code>SESSION_SECRET</code> — session encryption key</li>
            <li><code>SMTP_*</code> — email delivery settings</li>
          </ul>
        </div>
      </CmsLayout>

      <AlertDialog open={showReset} onOpenChange={setShowReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset CMS to defaults?</AlertDialogTitle>
            <AlertDialogDescription>This will delete all CMS content and restore default settings.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { await resetCmsDefaults(); queryClient.invalidateQueries(); setShowReset(false); }}>
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
