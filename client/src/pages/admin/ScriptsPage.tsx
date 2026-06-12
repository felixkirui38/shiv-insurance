import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import CmsLayout from "@/components/cms/CmsLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchSettings, saveSettings, fetchInquiries, resetCmsDefaults } from "@/lib/cms-api";
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

export default function ScriptsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showReset, setShowReset] = useState(false);
  const [headScripts, setHeadScripts] = useState("");
  const [footerScripts, setFooterScripts] = useState("");

  const { data: settings } = useQuery({
    queryKey: ["/api/cms/settings"],
    queryFn: fetchSettings,
  });

  const { data: inquiries = [] } = useQuery({
    queryKey: ["/api/cms/inquiries"],
    queryFn: fetchInquiries,
  });

  useEffect(() => {
    if (settings) {
      setHeadScripts(settings.headScripts);
      setFooterScripts(settings.footerScripts);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: () => saveSettings({ headScripts, footerScripts }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/settings"] });
      toast({ title: "Saved", description: "Scripts updated." });
    },
  });

  return (
    <>
      <CmsLayout title="Scripts" inquiryCount={inquiries.length} onReset={() => setShowReset(true)}>
        <p className="mb-6 text-sm text-muted-foreground">
          Inject custom HTML/JavaScript into the site head or before the closing body tag. Use for analytics, chat widgets, or tracking pixels.
        </p>

        <div className="space-y-6">
          <div>
            <Label htmlFor="headScripts">Head Scripts</Label>
            <Textarea
              id="headScripts"
              value={headScripts}
              onChange={(e) => setHeadScripts(e.target.value)}
              rows={8}
              className="mt-2 font-mono text-sm"
              placeholder="<!-- Google Analytics, meta tags, etc. -->"
            />
          </div>
          <div>
            <Label htmlFor="footerScripts">Footer Scripts</Label>
            <Textarea
              id="footerScripts"
              value={footerScripts}
              onChange={(e) => setFooterScripts(e.target.value)}
              rows={8}
              className="mt-2 font-mono text-sm"
              placeholder="<!-- Chat widgets, tracking scripts, etc. -->"
            />
          </div>
          <Button variant="brand" className="gap-2" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            <Save className="h-4 w-4" />
            Save Scripts
          </Button>
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
