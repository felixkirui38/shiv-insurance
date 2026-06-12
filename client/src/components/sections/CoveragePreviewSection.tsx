import { Link } from "wouter";
import { companyData } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const coverImages = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
];

export function CoveragePreviewSection() {
  const featured = companyData.services.slice(0, 4);

  return (
    <section className="site-section site-section-cream-warm site-section-tight-bottom">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-heading">Smart cover starts here</h2>
            <p className="mt-2 section-subheading">
              The policies our clients ask for most — each backed by independent advice and Kenya&apos;s leading underwriters.
            </p>
          </div>
          <Link href="/services" className="btn-cta gap-2 normal-case tracking-normal shrink-0">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((service, index) => (
            <Link key={service.category} href="/services">
              <article className="service-card group cursor-pointer h-full">
                <img
                  src={coverImages[index]}
                  alt={service.category}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-shiv-text group-hover:text-shiv-gold transition-colors">
                    {service.category}
                  </h3>
                  <p className="text-sm text-shiv-text-muted mt-2 line-clamp-2">
                    {service.products.slice(0, 2).join(", ")} and more.
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
