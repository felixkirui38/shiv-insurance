import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="site-section bg-shiv-cream-warm min-h-[60vh] flex items-center">
      <div className="site-container w-full flex justify-center">
        <Card className="theme-card w-full max-w-md border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2 items-center">
              <AlertCircle className="h-8 w-8 text-shiv-gold" />
              <h1 className="text-2xl font-bold text-shiv-text">404 Page Not Found</h1>
            </div>
            <p className="mt-4 text-sm text-shiv-text-muted">
              Did you forget to add the page to the router?
            </p>
            <Link href="/" className="btn-cta inline-flex mt-6">
              Back to home
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
