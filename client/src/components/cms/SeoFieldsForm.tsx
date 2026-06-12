import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { SeoFields } from "@shared/cms-schema";

interface SeoFieldsFormProps {
  value: SeoFields;
  onChange: (seo: SeoFields) => void;
}

export default function SeoFieldsForm({ value, onChange }: SeoFieldsFormProps) {
  const update = (field: keyof SeoFields, val: string | boolean) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          id="metaTitle"
          value={value.metaTitle}
          onChange={(e) => update("metaTitle", e.target.value)}
          placeholder="Page title for search engines (50–60 chars)"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {value.metaTitle.length}/60 characters
        </p>
      </div>

      <div>
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={value.metaDescription}
          onChange={(e) => update("metaDescription", e.target.value)}
          placeholder="Brief description for search results (150–160 chars)"
          rows={3}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {value.metaDescription.length}/160 characters
        </p>
      </div>

      <div>
        <Label htmlFor="metaKeywords">Meta Keywords</Label>
        <Input
          id="metaKeywords"
          value={value.metaKeywords}
          onChange={(e) => update("metaKeywords", e.target.value)}
          placeholder="keyword1, keyword2, keyword3"
        />
      </div>

      <div className="border-t pt-4">
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Open Graph (Social Sharing)</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ogTitle">OG Title</Label>
            <Input
              id="ogTitle"
              value={value.ogTitle}
              onChange={(e) => update("ogTitle", e.target.value)}
              placeholder="Leave blank to use meta title"
            />
          </div>
          <div>
            <Label htmlFor="ogDescription">OG Description</Label>
            <Textarea
              id="ogDescription"
              value={value.ogDescription}
              onChange={(e) => update("ogDescription", e.target.value)}
              placeholder="Leave blank to use meta description"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="ogImage">OG Image URL</Label>
            <Input
              id="ogImage"
              value={value.ogImage}
              onChange={(e) => update("ogImage", e.target.value)}
              placeholder="https://example.com/image.jpg (1200×630 recommended)"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="canonicalUrl">Canonical URL</Label>
        <Input
          id="canonicalUrl"
          value={value.canonicalUrl}
          onChange={(e) => update("canonicalUrl", e.target.value)}
          placeholder="https://yoursite.com/page-slug"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label htmlFor="noIndex">Hide from search engines</Label>
          <p className="text-xs text-muted-foreground">Adds noindex, nofollow meta tag</p>
        </div>
        <Switch
          id="noIndex"
          checked={value.noIndex}
          onCheckedChange={(checked) => update("noIndex", checked)}
        />
      </div>
    </div>
  );
}
