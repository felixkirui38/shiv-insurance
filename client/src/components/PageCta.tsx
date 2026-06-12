import { Link } from 'wouter';

interface PageCtaProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function PageCta({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: PageCtaProps) {
  return (
    <section className="site-section site-section-cream-warm">
      <div className="site-container">
        <div className="site-section-navy rounded-[var(--radius-card)] px-8 py-12 md:px-16 md:py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            {title}
          </h2>
          {description ? (
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">{description}</p>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={primaryHref} className="btn-cta">
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref ? (
              <Link href={secondaryHref} className="btn-cta-outline-light">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
