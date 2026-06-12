import { Link } from "wouter";
import {
  ArrowRight,
  Briefcase,
  Car,
  FileCheck,
  Headphones,
  HeartPulse,
  Home,
  Shield,
  Ship,
  Zap,
} from "lucide-react";

const coverLinks = [
  {
    title: "Motor Insurance",
    subtitle: "Comprehensive & Third Party",
    href: "/buy-now?product=motor-insurance",
    icon: Car,
  },
  {
    title: "Property Insurance",
    subtitle: "Fire, Burglary & All Risks",
    href: "/buy-now?product=property-insurance",
    icon: Home,
  },
  {
    title: "Medical Insurance",
    subtitle: "Individual, Family & Corporate",
    href: "/buy-now?product=medical-insurance",
    icon: HeartPulse,
  },
  {
    title: "Life Insurance",
    subtitle: "Term, Whole Life & Education",
    href: "/buy-now?product=life-insurance",
    icon: Shield,
  },
  {
    title: "Business Insurance",
    subtitle: "Liability, WIBA & Cyber",
    href: "/buy-now?product=business-insurance",
    icon: Briefcase,
  },
  {
    title: "Marine Insurance",
    subtitle: "Cargo, Hull & Goods in Transit",
    href: "/buy-now?product=marine-insurance",
    icon: Ship,
  },
] as const;

const trustFeatures = [
  {
    title: "Fast Quotes from Multiple Insurers",
    description:
      "Compare the best options side-by-side in minutes — we shop 15+ leading Kenyan underwriters on your behalf.",
    icon: Zap,
  },
  {
    title: "Policy Documents Delivered Promptly",
    description:
      "Once your cover is placed, certificates and schedules are shared by email so you can proceed without delay.",
    icon: FileCheck,
  },
  {
    title: "Expert Support When You Claim",
    description:
      "Our team guides you from first notice of loss through to settlement — advocacy you can count on.",
    icon: Headphones,
  },
] as const;

export function ServicesProtectSection() {
  return (
    <section className="services-protect-section" data-testid="services-protect-section">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <span className="services-protect-badge">Trusted broker in Kenya</span>
            <h2 className="services-protect-heading">
              Protect What Matters Most
              <span className="services-protect-heading-accent">Wherever Life Takes You</span>
            </h2>
            <p className="services-protect-lead">
              Shiv Insurance Brokers helps you compare, choose, and secure the right cover with
              confidence. Fast quotes, clear advice, and independent recommendations — no
              confusion, no pressure.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/buy-now" className="btn-cta gap-2 normal-case tracking-normal">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="services-protect-secondary-btn"
              >
                Speak to an Advisor
              </Link>
            </div>
          </div>

          <div className="services-protect-cards">
            {coverLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="services-protect-card group">
                  <span className="services-protect-card-icon" aria-hidden>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="services-protect-card-title">{item.title}</span>
                    <span className="services-protect-card-subtitle">{item.subtitle}</span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-shiv-gold opacity-80 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesTrustSection() {
  return (
    <section className="site-section site-section-cream-warm" data-testid="services-trust-section">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="services-trust-stats">
            <div className="services-trust-stat-primary">
              <p className="services-trust-stat-value">28+</p>
              <p className="services-trust-stat-label">
                Years Protecting Families &amp; Businesses Across Kenya
              </p>
            </div>
            <div className="services-trust-stat-accent">
              <p className="services-trust-stat-value-sm">15+</p>
              <p className="services-trust-stat-label-sm">Partner Insurers</p>
            </div>
          </div>

          <div>
            <h2 className="section-heading">
              We Don&apos;t Just Sell Policies — We Help You Make the Right Decisions
            </h2>
            <p className="mt-4 section-subheading">
              Navigating insurance in Kenya can feel overwhelming. Shiv Insurance Brokers is
              your trusted guide — combining local expertise with cover from Kenya&apos;s leading
              insurers for individuals, families, and businesses.
            </p>

            <ul className="mt-8 space-y-4">
              {trustFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.title} className="services-trust-feature">
                    <span className="services-trust-feature-icon" aria-hidden>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-shiv-text">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-shiv-text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
