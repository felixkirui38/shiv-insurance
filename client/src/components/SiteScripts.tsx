import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SeoHead } from "@/components/SeoHead";

async function fetchSettings() {
  const res = await fetch("/api/content/settings");
  if (!res.ok) return null;
  const data = await res.json();
  return data.settings;
}

export default function SiteScripts() {
  const { data: settings } = useQuery({
    queryKey: ["/api/content/settings"],
    queryFn: fetchSettings,
  });

  useEffect(() => {
    if (!settings?.headScripts && !settings?.footerScripts) return;

    const headContainer = document.createElement("div");
    headContainer.id = "cms-head-scripts";
    headContainer.innerHTML = settings.headScripts ?? "";
    document.head.appendChild(headContainer);

    const footerContainer = document.createElement("div");
    footerContainer.id = "cms-footer-scripts";
    footerContainer.innerHTML = settings.footerScripts ?? "";
    document.body.appendChild(footerContainer);

    return () => {
      headContainer.remove();
      footerContainer.remove();
    };
  }, [settings?.headScripts, settings?.footerScripts]);

  if (!settings) return null;

  return (
    <SeoHead
      title={settings.defaultMetaTitle}
      description={settings.defaultMetaDescription}
      keywords={settings.defaultMetaKeywords}
      ogImage={settings.defaultOgImage}
      siteName={settings.siteName}
    />
  );
}
