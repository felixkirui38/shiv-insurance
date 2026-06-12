import { useQuery } from "@tanstack/react-query";
import type { CmsPageAppearance } from "@shared/cms-schema";

export interface CmsNavPage {
  id: string;
  title: string;
  slug: string;
  appearance: CmsPageAppearance;
  updatedAt: string;
}

async function fetchNavPages(): Promise<CmsNavPage[]> {
  const res = await fetch("/api/content/pages");
  if (!res.ok) throw new Error("Failed to load navigation pages");
  const data = await res.json();
  return data.pages ?? [];
}

export function useCmsNavPages() {
  return useQuery({
    queryKey: ["/api/content/pages"],
    queryFn: fetchNavPages,
    staleTime: 60_000,
  });
}
