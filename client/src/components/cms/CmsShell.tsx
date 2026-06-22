import { Link } from "wouter";

interface CmsShellProps {
  children: React.ReactNode;
}

export function CmsShell({ children }: CmsShellProps) {
  return (
    <div className="cms-shell">
      <Link
        href="/"
        className="cms-shell-gutter"
        aria-label="Return to website home"
        title="Back to website"
      />
      <div className="cms-shell-inner">{children}</div>
      <Link
        href="/"
        className="cms-shell-gutter"
        aria-label="Return to website home"
        title="Back to website"
      />
    </div>
  );
}
