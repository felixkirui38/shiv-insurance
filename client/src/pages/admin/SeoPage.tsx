import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import CmsLayout from "@/components/cms/CmsLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function SeoPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showReset, setShowReset] = useState(false);
  const [form, setForm] = useState({
    siteName: "",
    siteUrl: "",
    defaultMetaTitle: "",
    defaultMetaDescription: "",
    defaultMetaKeywords: "",
    defaultOgImage: "",
    twitterHandle: "",
    googleAnalyticsId: "",
    googleTagManagerId: "",
    robotsTxt: "",
  });

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
      setForm({
        siteName: settings.siteName,
        siteUrl: settings.siteUrl,
        defaultMetaTitle: settings.defaultMetaTitle,
        defaultMetaDescription: settings.defaultMetaDescription,
        defaultMetaKeywords: settings.defaultMetaKeywords,
        defaultOgImage: settings.defaultOgImage,
        twitterHandle: settings.twitterHandle,
        googleAnalyticsId: settings.googleAnalyticsId,
        googleTagManagerId: settings.googleTagManagerId,
        robotsTxt: settings.robotsTxt,
      });
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: () => saveSettings(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/settings"] });
      toast({ title: "Saved", description: "SEO settings updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not save settings.", variant: "destructive" });
    },
  });

  const update = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  return (
    <>
      <CmsLayout
        title="SEO"
        inquiryCount={inquiries.length}
        onReset={() => setShowReset(true)}
      >
        <p className="mb-6 text-sm text-muted-foreground">
          Global SEO defaults applied across the site when page-specific SEO is not set.
        </p>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" value={form.siteName} onChange={(e) => update("siteName", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input id="siteUrl" value={form.siteUrl} onChange={(e) => update("siteUrl", e.target.value)} placeholder="https://shivinsurance.co.ke" />
            </div>
          </div>

          <div>
            <Label htmlFor="defaultMetaTitle">Default Meta Title</Label>
            <Input id="defaultMetaTitle" value={form.defaultMetaTitle} onChange={(e) => update("defaultMetaTitle", e.target.value)} />
          </div>

          <div>
            <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
            <Textarea id="defaultMetaDescription" value={form.defaultMetaDescription} onChange={(e) => update("defaultMetaDescription", e.target.value)} rows={3} />
          </div>

          <div>
            <Label htmlFor="defaultMetaKeywords">Default Meta Keywords</Label>
            <Input id="defaultMetaKeywords" value={form.defaultMetaKeywords} onChange={(e) => update("defaultMetaKeywords", e.target.value)} />
          </div>

          <div>
            <Label htmlFor="defaultOgImage">Default OG Image URL</Label>
            <Input id="defaultOgImage" value={form.defaultOgImage} onChange={(e) => update("defaultOgImage", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="twitterHandle">Twitter Handle</Label>
              <Input id="twitterHandle" value={form.twitterHandle} onChange={(e) => update("twitterHandle", e.target.value)} placeholder="@shivinsurance" />
            </div>
            <div>
              <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
              <Input id="googleAnalyticsId" value={form.googleAnalyticsId} onChange={(e) => update("googleAnalyticsId", e.target.value)} placeholder="G-XXXXXXXXXX" />
            </div>
          </div>

          <div>
            <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
            <Input id="googleTagManagerId" value={form.googleTagManagerId} onChange={(e) => update("googleTagManagerId", e.target.value)} placeholder="GTM-XXXXXXX" />
          </div>

          <div>
            <Label htmlFor="robotsTxt">Robots.txt Content</Label>
            <Textarea id="robotsTxt" value={form.robotsTxt} onChange={(e) => update("robotsTxt", e.target.value)} rows={4} className="font-mono text-sm" />
          </div>

          <Button
            variant="brand"
            className="gap-2"
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
          >
            <Save className="h-4 w-4" />
            Save SEO Settings
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
