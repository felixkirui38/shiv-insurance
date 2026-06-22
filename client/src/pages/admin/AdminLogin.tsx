import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cmsLogin, cmsMe } from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCmsModal } from "@/components/cms/CmsModalContext";

export default function AdminLogin() {
  const { setSection } = useCmsModal();
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
        setSection("inquiries");
        return;
      }
      toast({
        title: "Login failed",
        description: "Session could not be saved. Restart the server after rebuilding, or use yarn dev locally.",
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
    <div className="flex h-full min-h-[20rem] items-center justify-center bg-[#eef1f5] px-4 py-8">
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
            <Label htmlFor="cms-username">Username</Label>
            <Input
              id="cms-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <Label htmlFor="cms-password">Password</Label>
            <Input
              id="cms-password"
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
  );
}
