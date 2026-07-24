import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CmsLayout from "@/components/cms/CmsLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchEmailStatus,
  fetchInquiries,
  resetCmsDefaults,
  verifyEmailSmtp,
} from "@/lib/cms-api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const [showReset, setShowReset] = useState(false);

  const { data: inquiries = [] } = useQuery({
    queryKey: ["/api/cms/inquiries"],
    queryFn: fetchInquiries,
  });

  const { data: health } = useQuery({
    queryKey: ["/api/cms/health"],
  });

  const { data: emailStatus, isLoading: emailLoading } = useQuery({
    queryKey: ["/api/cms/email-status"],
    queryFn: fetchEmailStatus,
  });

  const verifyMutation = useMutation({
    mutationFn: verifyEmailSmtp,
    onSuccess: (data) => {
      toast({
        title: data.ok ? "SMTP connected" : "SMTP failed",
        description: data.message,
        variant: data.ok ? "default" : "destructive",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/email-status"] });
    },
    onError: () => {
      toast({
        title: "SMTP check failed",
        description: "Could not reach the email verification endpoint.",
        variant: "destructive",
      });
    },
  });

  const smtpConfigured = Boolean(emailStatus?.configured);
  const smtpLabel = emailLoading
    ? "checking…"
    : smtpConfigured
      ? "configured"
      : "not configured";

  const connections = [
    {
      name: "CMS API",
      status: health?.connected ? "connected" : "disconnected",
      description: "Backend content management API",
    },
    {
      name: "SMTP Email",
      status: smtpLabel,
      description: smtpConfigured
        ? `Sending via ${emailStatus?.host}:${emailStatus?.port} as ${emailStatus?.user}. Lead inbox: ${emailStatus?.leadEmail}`
        : "Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in Coolify (Runtime), then redeploy. Forms still save without SMTP.",
    },
    {
      name: "Contact Forms",
      status: "active",
      description: "Contact, Services, and Buy Now forms submit to /api/submit-form",
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
              className="flex items-start justify-between gap-4 rounded-lg border p-4"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{conn.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{conn.description}</p>
              </div>
              <Badge
                className={
                  conn.status === "connected" ||
                  conn.status === "active" ||
                  conn.status === "configured"
                    ? "bg-emerald-500 hover:bg-emerald-500"
                    : "bg-gray-400 hover:bg-gray-400"
                }
              >
                {conn.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            disabled={verifyMutation.isPending || !smtpConfigured}
            onClick={() => verifyMutation.mutate()}
          >
            {verifyMutation.isPending ? "Verifying…" : "Verify SMTP connection"}
          </Button>
        </div>

        <div className="mt-8 rounded-lg bg-gray-50 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-gray-700">Coolify SMTP example (cPanel)</p>
          <ul className="mt-2 list-inside list-disc space-y-1 font-mono text-xs">
            <li>SMTP_HOST=mail.shivinsbro.co.ke</li>
            <li>SMTP_PORT=465</li>
            <li>SMTP_USER=info@shivinsbro.co.ke</li>
            <li>SMTP_PASS=(mailbox password)</li>
            <li>SMTP_FROM=info@shivinsbro.co.ke</li>
          </ul>
          <p className="mt-3">
            If verify fails with a certificate error, also set{" "}
            <code>SMTP_TLS_REJECT_UNAUTHORIZED=false</code>.
          </p>
        </div>
      </CmsLayout>

      <AlertDialog open={showReset} onOpenChange={setShowReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset CMS to defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all CMS content and restore default settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                await resetCmsDefaults();
                queryClient.invalidateQueries();
                setShowReset(false);
              }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
