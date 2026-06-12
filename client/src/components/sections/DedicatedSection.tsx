import { Link } from "wouter";
import { companyData } from "@/lib/data";
import { CheckCircle, ArrowRight } from "lucide-react";

const dedicationImage =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=900";

export function DedicatedSection() {
  const { dedication } = companyData;

  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={dedicationImage}
              alt="Shiv Insurance — protecting families and businesses"
              className="rounded-[var(--radius-card)] shadow-lg w-full object-cover min-h-[320px]"
            />
            <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 theme-card px-5 py-4 shadow-lg max-w-[220px]">
              <p className="text-2xl font-bold text-shiv-gold">28+</p>
              <p className="text-sm font-semibold text-shiv-text">Years of Excellence</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-shiv-gold mb-3">
              {dedication.eyebrow}
            </p>
            <h2 className="section-heading mb-4">{dedication.title}</h2>
            <p className="section-subheading mb-8">{dedication.description}</p>

            <ul className="space-y-5 mb-8">
              {dedication.highlights.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-shiv-gold mt-0.5" />
                  <div>
                    <p className="font-semibold text-shiv-text">{item.title}</p>
                    <p className="text-sm text-shiv-text-muted">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="btn-cta gap-2 normal-case tracking-normal">
              Get Your Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
