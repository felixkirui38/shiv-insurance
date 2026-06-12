interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="site-section-navy py-16 lg:py-20 border-b border-white/10">
      <div className="site-container text-center">
        <span className="inline-block h-1 w-14 rounded-full bg-shiv-gold mb-5" aria-hidden />
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
