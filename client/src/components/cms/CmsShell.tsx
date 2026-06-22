import type { ReactNode } from "react";

export function CmsShell({ children }: { children: ReactNode }) {
  return <div className="cms-shell-embedded h-full min-h-0">{children}</div>;
}
