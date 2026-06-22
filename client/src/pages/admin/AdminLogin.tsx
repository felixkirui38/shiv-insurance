import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cmsLogin, cmsMe } from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CmsShell } from "@/components/cms/CmsShell";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("shiv.io");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => cmsLogin(username, password),
    onSuccess: async () => {
      const me = await cmsMe();
      if (me?.authenticated) {
        queryClient.setQueryData(["/api/cms/me"], me);
        setLocation("/admin/inquiries");
        return;
      }
      toast({
        title: "Login failed",
        description: "Session could not be saved. Restart the server after rebuilding, or use http://localhost:5000 with yarn dev.",
        variant: "destructive",
      });
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    },
  });

  return (
    <CmsShell>
      <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8 sm:px-6 lg:border-x lg:border-gray-200 lg:shadow-lg">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Shiv CMS</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to manage pages, blog, SEO, and inquiries.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate();
          }}
        >
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <Button
            type="submit"
            variant="brand"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing in…" : "Sign In"}
          </Button>
        </form>
        </div>
      </div>
    </CmsShell>
  );
}
