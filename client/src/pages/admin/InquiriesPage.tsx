import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCw, Save, Eye } from "lucide-react";
import CmsLayout from "@/components/cms/CmsLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchInquiries, fetchSettings, saveLeadEmail, resetCmsDefaults } from "@/lib/cms-api";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import type { Contact } from "@shared/schema";
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

export default function InquiriesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [leadEmail, setLeadEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [selected, setSelected] = useState<Contact | null>(null);

  const { data: inquiries = [], refetch, isFetching } = useQuery({
    queryKey: ["/api/cms/inquiries"],
    queryFn: fetchInquiries,
    refetchInterval: 15000,
  });

  const { data: settings } = useQuery({
    queryKey: ["/api/cms/settings"],
    queryFn: fetchSettings,
  });

  useEffect(() => {
    if (settings?.leadEmail) setLeadEmail(settings.leadEmail);
  }, [settings?.leadEmail]);

  const saveEmailMutation = useMutation({
    mutationFn: () => saveLeadEmail(leadEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/settings"] });
      toast({ title: "Saved", description: "Lead email updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not save email.", variant: "destructive" });
    },
  });

  const resetMutation = useMutation({
    mutationFn: resetCmsDefaults,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({ title: "Reset complete", description: "CMS data restored to defaults." });
      setShowReset(false);
    },
  });

  const formatDate = (d: Date | string | null) => {
    if (!d) return "—";
    return new Date(d).toLocaleString();
  };

  return (
    <>
      <CmsLayout
        title="Inquiries"
        inquiryCount={inquiries.length}
        onReset={() => setShowReset(true)}
      >
        <div className="mb-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Email to receive leads / contact form
          </p>
          <p className="text-sm text-muted-foreground">
            All Contact and Services form submissions are saved here and emailed to this address (requires SMTP on the server).
          </p>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="leadEmail" className="sr-only">
                Lead email
              </Label>
              <Input
                id="leadEmail"
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="info@shivinsurance.co.ke"
              />
            </div>
            <Button
              variant="brand"
              className="gap-2"
              onClick={() => saveEmailMutation.mutate()}
              disabled={saveEmailMutation.isPending}
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Lead Inquiries</h3>
              <p className="text-sm text-muted-foreground">
                Quote requests and service enquiries from the website — auto-refreshes every 15s.
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => refetch()} disabled={isFetching}>
              <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs uppercase text-muted-foreground">Date</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Name</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Phone</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Email</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Form</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Insurance</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground w-20">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                      No inquiries yet. Submissions from Contact, Services, and Buy Now quote request forms will appear here.
                    </TableCell>
                  </TableRow>
                ) : (
                  inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="whitespace-nowrap text-sm">
                        {formatDate(inquiry.createdAt)}
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap">
                        {inquiry.firstName} {inquiry.lastName}
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{inquiry.phone}</TableCell>
                      <TableCell className="text-sm">{inquiry.email}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{inquiry.formName}</TableCell>
                      <TableCell className="text-sm max-w-[120px] truncate">{inquiry.insuranceType}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelected(inquiry)}
                          title="View full details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CmsLayout>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-muted-foreground">Submitted</dt>
                <dd>{formatDate(selected.createdAt)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted-foreground">Form</dt>
                <dd>{selected.formName}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="font-semibold text-muted-foreground">First name</dt>
                  <dd>{selected.firstName}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted-foreground">Last name</dt>
                  <dd>{selected.lastName}</dd>
                </div>
              </div>
              <div>
                <dt className="font-semibold text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">
                    {selected.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-muted-foreground">Phone</dt>
                <dd>{selected.phone}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted-foreground">Insurance type</dt>
                <dd>{selected.insuranceType}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted-foreground">Message</dt>
                <dd className="mt-1 whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-gray-800">
                  {selected.message}
                </dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={showReset} onOpenChange={setShowReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset CMS to defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all CMS pages, blog posts, and testimonials, and restore default settings. Inquiries are not affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => resetMutation.mutate()}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
