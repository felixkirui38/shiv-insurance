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

import { Textarea } from "@/components/ui/textarea";

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

  fetchBlogPosts,

  createBlogPost,

  updateBlogPost,

  deleteBlogPost,

  fetchInquiries,

  resetCmsDefaults,

} from "@/lib/cms-api";

import type { CmsBlogPost } from "@shared/cms-schema";

import {

  cmsBlogAppearanceOptions,

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



const emptyPost = (): Omit<CmsBlogPost, "id" | "createdAt" | "updatedAt"> => ({

  title: "",

  slug: "",

  category: "",

  appearance: "blog_listing",

  excerpt: "",

  content: "",

  author: "Shiv Insurance",

  featuredImage: "",

  tags: [],

  status: "draft",

  publishedAt: null,

  seo: defaultSeoFields(),

});



export default function BlogPage() {

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const [editorOpen, setEditorOpen] = useState(false);

  const [editing, setEditing] = useState<CmsBlogPost | null>(null);

  const [form, setForm] = useState(emptyPost());

  const [tagsInput, setTagsInput] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [showReset, setShowReset] = useState(false);



  const { data: posts = [], refetch, isFetching } = useQuery({

    queryKey: ["/api/cms/blog"],

    queryFn: fetchBlogPosts,

  });



  const { data: inquiries = [] } = useQuery({

    queryKey: ["/api/cms/inquiries"],

    queryFn: fetchInquiries,

  });



  const saveMutation = useMutation({

    mutationFn: async () => {

      const payload = {

        ...form,

        tags: tagsInput

          .split(",")

          .map((t) => t.trim())

          .filter(Boolean),

      };

      if (editing) {

        return updateBlogPost(editing.id, payload);

      }

      return createBlogPost(payload);

    },

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["/api/cms/blog"] });

      toast({ title: "Saved", description: "Blog post saved successfully." });

      setEditorOpen(false);

    },

    onError: (err: Error) => {

      toast({ title: "Error", description: err.message, variant: "destructive" });

    },

  });



  const deleteMutation = useMutation({

    mutationFn: (id: string) => deleteBlogPost(id),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["/api/cms/blog"] });

      toast({ title: "Deleted", description: "Post removed." });

      setDeleteId(null);

    },

  });



  const duplicateMutation = useMutation({

    mutationFn: async (id: string) => {

      const post = posts.find((p) => p.id === id);

      if (!post) throw new Error("Post not found");

      return createBlogPost({

        title: `${post.title} (Copy)`,

        slug: `${post.slug}-copy-${Date.now()}`,

        category: post.category,

        appearance: post.appearance,

        excerpt: post.excerpt,

        content: post.content,

        author: post.author,

        featuredImage: post.featuredImage,

        tags: [...post.tags],

        status: "draft",

        publishedAt: null,

        seo: { ...post.seo },

      });

    },

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["/api/cms/blog"] });

      toast({ title: "Duplicated", description: "Post duplicated as a draft." });

    },

    onError: (err: Error) => {

      toast({ title: "Error", description: err.message, variant: "destructive" });

    },

  });



  const openCreate = () => {

    setEditing(null);

    setForm(emptyPost());

    setTagsInput("");

    setEditorOpen(true);

  };



  const openEdit = (post: CmsBlogPost) => {

    setEditing(post);

    setForm({

      title: post.title,

      slug: post.slug,

      category: post.category,

      appearance: post.appearance,

      excerpt: post.excerpt,

      content: post.content,

      author: post.author,

      featuredImage: post.featuredImage,

      tags: post.tags,

      status: post.status,

      publishedAt: post.publishedAt,

      seo: { ...post.seo },

    });

    setTagsInput(post.tags.join(", "));

    setEditorOpen(true);

  };



  return (

    <>

      <CmsLayout

        title="Blog"

        description="Manage blog posts and where they appear across the site."

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

              aria-label="Refresh blog posts"

            >

              <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />

            </Button>

            <Button

              variant="brand"
              className="gap-2"

              onClick={openCreate}

            >

              <Plus className="h-4 w-4" />

              Add Post

            </Button>

          </>

        }

      >

        <CmsResourceList

          items={posts.map((post) => ({

            id: post.id,

            title: post.title,

            category: post.category || post.tags[0] || "",

            appearance: post.appearance,

          }))}

          emptyMessage="No blog posts yet. Click Add Post to create your first one."

          onEdit={(id) => {

            const post = posts.find((p) => p.id === id);

            if (post) openEdit(post);

          }}

          onDuplicate={(id) => duplicateMutation.mutate(id)}

          onDelete={setDeleteId}

        />

      </CmsLayout>



      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>

        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">

          <DialogHeader>

            <DialogTitle>{editing ? "Edit Post" : "New Post"}</DialogTitle>

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

                    placeholder="e.g. insurance tips"

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

                      {cmsBlogAppearanceOptions.map((opt) => (

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

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <Label htmlFor="author">Author</Label>

                  <Input

                    id="author"

                    value={form.author}

                    onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}

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

              </div>

              <div>

                <Label htmlFor="excerpt">Excerpt</Label>

                <Textarea

                  id="excerpt"

                  value={form.excerpt}

                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}

                  rows={2}

                />

              </div>

              <div>

                <Label htmlFor="featuredImage">Featured Image URL</Label>

                <Input

                  id="featuredImage"

                  value={form.featuredImage}

                  onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value }))}

                />

              </div>

              <div>

                <Label htmlFor="tags">Tags (comma-separated)</Label>

                <Input

                  id="tags"

                  value={tagsInput}

                  onChange={(e) => setTagsInput(e.target.value)}

                  placeholder="insurance, tips, business"

                />

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

              {saveMutation.isPending ? "Saving…" : "Save Post"}

            </Button>

          </div>

        </DialogContent>

      </Dialog>



      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle>Delete this post?</AlertDialogTitle>

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

