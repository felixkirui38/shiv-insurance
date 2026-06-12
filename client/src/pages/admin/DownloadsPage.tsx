import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, RefreshCw, ExternalLink, Upload, FileUp } from "lucide-react";
import CmsLayout from "@/components/cms/CmsLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchDownloads,
  createDownload,
  updateDownload,
  deleteDownload,
  fetchInquiries,
  resetCmsDefaults,
  uploadDownloadFile,
} from "@/lib/cms-api";
import type { CmsDownload } from "@shared/cms-schema";
import { cmsDownloadCategoryValues } from "@shared/cms-schema";
import { downloadIconOptions } from "@/lib/downloadIcons";
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

const empty = (): Omit<CmsDownload, "id" | "createdAt" | "updatedAt"> => ({
  title: "",
  description: "",
  category: "Form",
  fileSize: "",
  filePath: "",
  icon: "file-text",
  published: true,
  sortOrder: 0,
});

export default function DownloadsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<CmsDownload | null>(null);
  const [form, setForm] = useState(empty());
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const { data: downloads = [], refetch, isFetching } = useQuery({
    queryKey: ["/api/cms/downloads"],
    queryFn: fetchDownloads,
  });

  const { data: inquiries = [] } = useQuery({
    queryKey: ["/api/cms/inquiries"],
    queryFn: fetchInquiries,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) return updateDownload(editing.id, form);
      return createDownload({
        ...form,
        sortOrder: form.sortOrder || downloads.length + 1,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/downloads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/downloads"] });
      toast({ title: "Saved", description: "Download document saved." });
      setEditorOpen(false);
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDownload(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/downloads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/downloads"] });
      setDeleteId(null);
      toast({ title: "Deleted", description: "Document removed." });
    },
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploaded = await uploadDownloadFile(file);
      const titleFromFile = uploaded.originalName.replace(/\.[^.]+$/, "");
      setForm((f) => ({
        ...f,
        filePath: uploaded.filePath,
        fileSize: uploaded.fileSize,
        title: f.title || titleFromFile,
      }));
      setSelectedFileName(uploaded.originalName);
      toast({ title: "File uploaded", description: uploaded.originalName });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Could not upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ...empty(), sortOrder: downloads.length + 1 });
    setSelectedFileName("");
    setEditorOpen(true);
  };

  const openEdit = (item: CmsDownload) => {
    setEditing(item);
    setSelectedFileName(item.filePath.split("/").pop() ?? "");
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      fileSize: item.fileSize,
      filePath: item.filePath,
      icon: item.icon,
      published: item.published,
      sortOrder: item.sortOrder,
    });
    setEditorOpen(true);
  };

  return (
    <>
      <CmsLayout
        title="Downloads"
        description="Manage documents shown on the public downloads page."
        inquiryCount={inquiries.length}
        onReset={() => setShowReset(true)}
        headerActions={
          <>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-gray-300"
              onClick={() => refetch()}
              disabled={isFetching}
              aria-label="Refresh downloads"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="brand" className="gap-2" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Add Document
            </Button>
          </>
        }
      >
        <p className="mb-4 text-sm text-muted-foreground">
          Add documents by choosing a file from your computer. Supported types: PDF, Word, Excel,
          and images (max 25 MB).
        </p>

        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="w-28">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {downloads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    No documents yet. Click Add Document to create one.
                  </TableCell>
                </TableRow>
              ) : (
                downloads.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.category}</TableCell>
                    <TableCell>
                      <a
                        href={item.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        View
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                    <TableCell className="text-sm">{item.sortOrder}</TableCell>
                    <TableCell>{item.published ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CmsLayout>

      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Document" : "Add Document"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div>
              <Label htmlFor="dl-title">Title</Label>
              <Input
                id="dl-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="dl-description">Description</Label>
              <Textarea
                id="dl-description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dl-category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger id="dl-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cmsDownloadCategoryValues.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dl-icon">Icon</Label>
                <Select
                  value={form.icon}
                  onValueChange={(v) => setForm((f) => ({ ...f, icon: v }))}
                >
                  <SelectTrigger id="dl-icon">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {downloadIconOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
              <Label htmlFor="dl-file">Document file</Label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 shrink-0"
                  disabled={uploading}
                  onClick={() => document.getElementById("dl-file")?.click()}
                >
                  {uploading ? (
                    <>
                      <Upload className="h-4 w-4 animate-pulse" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <FileUp className="h-4 w-4" />
                      Choose file
                    </>
                  )}
                </Button>
                <Input
                  id="dl-file"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,application/pdf"
                  onChange={handleFileSelect}
                />
                <span className="text-sm text-muted-foreground truncate">
                  {selectedFileName || form.filePath || "No file selected"}
                </span>
              </div>
              {form.filePath && (
                <a
                  href={form.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  Preview uploaded file
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dl-fileSize">File size label</Label>
                <Input
                  id="dl-fileSize"
                  value={form.fileSize}
                  onChange={(e) => setForm((f) => ({ ...f, fileSize: e.target.value }))}
                  placeholder="e.g. 250 KB"
                />
              </div>
              <div>
                <Label htmlFor="dl-sortOrder">Sort order</Label>
                <Input
                  id="dl-sortOrder"
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sortOrder: Number(e.target.value) || 0 }))
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="dl-published">Published on downloads page</Label>
              <Switch
                id="dl-published"
                checked={form.published}
                onCheckedChange={(published) => setForm((f) => ({ ...f, published }))}
              />
            </div>
            <Button
              variant="brand"
              className="w-full"
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.title || !form.filePath || uploading}
            >
              {saveMutation.isPending ? "Saving…" : "Save Document"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this document?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from the downloads page. The file itself is not deleted from the
              server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showReset} onOpenChange={setShowReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset CMS to defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore default downloads and reset other CMS content.
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
