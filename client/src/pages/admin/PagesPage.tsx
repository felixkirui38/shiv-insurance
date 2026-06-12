import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Plus, RefreshCw } from "lucide-react";

import CmsLayout from "@/components/cms/CmsLayout";

import CmsResourceList from "@/components/cms/CmsResourceList";

import SeoFieldsForm from "@/components/cms/SeoFieldsForm";
import CmsHtmlEditor from "@/components/cms/CmsHtmlEditor";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";


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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {

  fetchPages,

  createPage,

  updatePage,

  deletePage,

  fetchInquiries,

  resetCmsDefaults,

} from "@/lib/cms-api";

import type { CmsPage } from "@shared/cms-schema";

import {

  cmsPageAppearanceOptions,

  defaultSeoFields,

  slugify,

} from "@shared/cms-schema";

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



const emptyPage = (): Omit<CmsPage, "id" | "createdAt" | "updatedAt"> => ({

  title: "",

  slug: "",

  category: "",

  appearance: "services",

  content: "",

  status: "draft",

  seo: defaultSeoFields(),

});



export default function PagesPage() {

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const [editorOpen, setEditorOpen] = useState(false);

  const [editing, setEditing] = useState<CmsPage | null>(null);

  const [form, setForm] = useState(emptyPage());

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [showReset, setShowReset] = useState(false);



  const { data: pages = [], refetch, isFetching } = useQuery({

    queryKey: ["/api/cms/pages"],

    queryFn: fetchPages,

  });



  const { data: inquiries = [] } = useQuery({

    queryKey: ["/api/cms/inquiries"],

    queryFn: fetchInquiries,

  });



  const saveMutation = useMutation({

    mutationFn: async () => {

      if (editing) {

        return updatePage(editing.id, form);

      }

      return createPage(form);

    },

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });

      toast({ title: "Saved", description: "Page saved successfully." });

      setEditorOpen(false);

    },

    onError: (err: Error) => {

      toast({ title: "Error", description: err.message, variant: "destructive" });

    },

  });



  const deleteMutation = useMutation({

    mutationFn: (id: string) => deletePage(id),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });

      toast({ title: "Deleted", description: "Page removed." });

      setDeleteId(null);

    },

  });



  const duplicateMutation = useMutation({

    mutationFn: async (id: string) => {

      const page = pages.find((p) => p.id === id);

      if (!page) throw new Error("Page not found");

      return createPage({

        title: `${page.title} (Copy)`,

        slug: `${page.slug}-copy-${Date.now()}`,

        category: page.category,

        appearance: page.appearance,

        content: page.content,

        status: "draft",

        seo: { ...page.seo },

      });

    },

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });

      toast({ title: "Duplicated", description: "Page duplicated as a draft." });

    },

    onError: (err: Error) => {

      toast({ title: "Error", description: err.message, variant: "destructive" });

    },

  });



  const openCreate = () => {

    setEditing(null);

    setForm(emptyPage());

    setEditorOpen(true);

  };



  const openEdit = (page: CmsPage) => {

    setEditing(page);

    setForm({

      title: page.title,

      slug: page.slug,

      category: page.category,

      appearance: page.appearance,

      content: page.content,

      status: page.status,

      seo: { ...page.seo },

    });

    setEditorOpen(true);

  };



  return (

    <>

      <CmsLayout

        title="Pages"

        description="Manage dynamic pages and navigation appearance."

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

              aria-label="Refresh pages"

            >

              <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />

            </Button>

            <Button

              variant="brand"
              className="gap-2"

              onClick={openCreate}

            >

              <Plus className="h-4 w-4" />

              Add Page

            </Button>

          </>

        }

      >

        <CmsResourceList

          items={pages.map((page) => ({

            id: page.id,

            title: page.title,

            category: page.category,

            appearance: page.appearance,

          }))}

          emptyMessage="No pages yet. Click Add Page to create your first one."

          onEdit={(id) => {

            const page = pages.find((p) => p.id === id);

            if (page) openEdit(page);

          }}

          onDuplicate={(id) => duplicateMutation.mutate(id)}

          onDelete={setDeleteId}

        />

      </CmsLayout>



      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>

        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">

          <DialogHeader>

            <DialogTitle>{editing ? "Edit Page" : "New Page"}</DialogTitle>

          </DialogHeader>



          <Tabs defaultValue="content">

            <TabsList className="grid w-full grid-cols-2">

              <TabsTrigger value="content">Content</TabsTrigger>

              <TabsTrigger value="seo">SEO</TabsTrigger>

            </TabsList>



            <TabsContent value="content" className="space-y-4 pt-4">

              <div>

                <Label htmlFor="title">Title</Label>

                <Input

                  id="title"

                  value={form.title}

                  onChange={(e) => {

                    const title = e.target.value;

                    setForm((f) => ({

                      ...f,

                      title,

                      slug: editing ? f.slug : slugify(title),

                    }));

                  }}

                />

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <Label htmlFor="category">Category</Label>

                  <Input

                    id="category"

                    value={form.category}

                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}

                    placeholder="e.g. motor insurance"

                  />

                </div>

                <div>

                  <Label htmlFor="appearance">Appearance</Label>

                  <Select

                    value={form.appearance}

                    onValueChange={(v) => setForm((f) => ({ ...f, appearance: v }))}

                  >

                    <SelectTrigger id="appearance">

                      <SelectValue />

                    </SelectTrigger>

                    <SelectContent>

                      {cmsPageAppearanceOptions.map((opt) => (

                        <SelectItem key={opt.value} value={opt.value}>

                          {opt.label}

                        </SelectItem>

                      ))}

                    </SelectContent>

                  </Select>

                </div>

              </div>

              <div>

                <Label htmlFor="slug">URL Slug</Label>

                <Input

                  id="slug"

                  value={form.slug}

                  onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}

                />

              </div>

              <div>

                <Label htmlFor="status">Status</Label>

                <Select

                  value={form.status}

                  onValueChange={(v: "draft" | "published") =>

                    setForm((f) => ({ ...f, status: v }))

                  }

                >

                  <SelectTrigger>

                    <SelectValue />

                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="draft">Draft</SelectItem>

                    <SelectItem value="published">Published</SelectItem>

                  </SelectContent>

                </Select>

              </div>

              <CmsHtmlEditor
                id="content"
                value={form.content}
                onChange={(content) => setForm((f) => ({ ...f, content }))}
              />

            </TabsContent>



            <TabsContent value="seo" className="pt-4">

              <SeoFieldsForm

                value={form.seo}

                onChange={(seo) => setForm((f) => ({ ...f, seo }))}

              />

            </TabsContent>

          </Tabs>



          <div className="flex justify-end gap-2 pt-4">

            <Button variant="outline" onClick={() => setEditorOpen(false)}>

              Cancel

            </Button>

            <Button

              variant="brand"

              onClick={() => saveMutation.mutate()}

              disabled={saveMutation.isPending || !form.title}

            >

              {saveMutation.isPending ? "Saving…" : "Save Page"}

            </Button>

          </div>

        </DialogContent>

      </Dialog>



      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle>Delete this page?</AlertDialogTitle>

            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>

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

