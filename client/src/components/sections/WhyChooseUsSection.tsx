import { Link } from "wouter";
import { companyData } from "@/lib/data";
import { Shield, Headphones, Layers, Building2 } from "lucide-react";

const icons = [Shield, Headphones, Layers, Building2];

export function WhyChooseUsSection({ showCta = false }: { showCta?: boolean }) {
  const { whyChooseUs } = companyData;

  return (
    <section className="site-section site-section-navy relative overflow-hidden">
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block h-1 w-14 rounded-full bg-shiv-gold mb-5" aria-hidden />
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">{whyChooseUs.title}</h2>
            <p className="text-lg text-white/85 leading-relaxed">{whyChooseUs.description}</p>
            {showCta && (
              <Link href="/about" className="btn-cta-outline-light mt-8 inline-flex">
                Learn About Us
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChooseUs.points.map((point, index) => {
              const Icon = icons[index] ?? Shield;
              return (
                <div
                  key={point.title}
                  className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-5"
                >
                  <Icon className="h-8 w-8 text-shiv-gold mb-3" />
                  <h3 className="font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
