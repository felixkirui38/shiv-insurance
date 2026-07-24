import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Users,
  TrendingUp,
  Truck,
  Home,
  Scale,
  Cog,
  Shield,
  Star,
  Factory,
} from "lucide-react";
import { Link } from "wouter";

const iconByKey: Record<string, LucideIcon> = {
  heartbeat: HeartPulse,
  "shield-check": ShieldCheck,
  users: Users,
  "trending-up": TrendingUp,
  truck: Truck,
  home: Home,
  "balance-scale": Scale,
  cogs: Cog,
  "user-shield": Shield,
  star: Star,
  industry: Factory,
};

export function resolveServiceIcon(iconKey?: string, fallbackIndex = 0): LucideIcon {
  if (iconKey && iconByKey[iconKey]) return iconByKey[iconKey];
  const fallbacks = [Shield, HeartPulse, Truck, Home, Scale, ShieldCheck, Star, Cog];
  return fallbacks[fallbackIndex % fallbacks.length];
}

export interface InsuranceProductCardProps {
  title: string;
  products: string[];
  colorVar?: string;
  iconKey?: string;
  iconIndex?: number;
  featured?: boolean;
  href?: string;
  maxProducts?: number;
  ctaLabel?: string;
  testId?: string;
  className?: string;
}

export function InsuranceProductCard({
  title,
  products,
  colorVar = "shiv-gold",
  iconKey,
  iconIndex = 0,
  featured = false,
  href = "/services",
  maxProducts = 4,
  ctaLabel = "Learn More",
  testId,
  className = "",
}: InsuranceProductCardProps) {
  const Icon = resolveServiceIcon(iconKey, iconIndex);
  const visible = products.slice(0, maxProducts);
  const remaining = products.length - visible.length;
  const accent = `var(--${colorVar})`;
  const lightAccent = colorVar.includes("gold") || colorVar.includes("accent");

  const body = (
    <article
      className={`service-card group${featured ? " service-card-featured" : ""}${className ? ` ${className}` : ""}`}
      style={{ ["--card-accent" as string]: accent }}
      data-accent-tone={lightAccent ? "light" : "dark"}
      data-testid={testId}
    >
      <div className="service-card-body">
        <div className="service-card-glow" aria-hidden />

        <div className="service-card-header">
          <span className="service-card-icon" aria-hidden>
            <Icon className="service-card-icon-svg" />
          </span>
          <div className="service-card-heading-wrap">
            <h3 className="service-card-title">{title}</h3>
            {featured ? <span className="service-card-badge">Featured</span> : null}
          </div>
        </div>

        <ul className="service-card-list">
          {visible.map((product) => (
            <li key={product} className="service-card-list-item">
              <span className="service-card-bullet" aria-hidden />
              <span>{product}</span>
            </li>
          ))}
          {remaining > 0 ? (
            <li className="service-card-more">+{remaining} more products</li>
          ) : null}
        </ul>

        <div className="service-card-footer">
          <span className="service-card-btn">
            <span>{ctaLabel}</span>
            <ArrowRight className="service-card-btn-icon" aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );

  if (!href) return body;

  return (
    <Link href={href} className="service-card-link">
      {body}
    </Link>
  );
}

export interface InsuranceImageCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  colorVar?: string;
}

export function InsuranceImageCard({
  title,
  description,
  imageSrc,
  href = "/services",
  colorVar = "shiv-gold",
}: InsuranceImageCardProps) {
  const accent = `var(--${colorVar})`;
  const lightAccent = colorVar.includes("gold") || colorVar.includes("accent");

  return (
    <Link href={href} className="service-card-link">
      <article
        className="service-card service-card-media group"
        style={{ ["--card-accent" as string]: accent }}
        data-accent-tone={lightAccent ? "light" : "dark"}
      >
        <div className="service-card-media-image-wrap">
          <img
            src={imageSrc}
            alt=""
            className="service-card-media-image"
            loading="lazy"
            decoding="async"
          />
          <div className="service-card-media-overlay" aria-hidden />
        </div>
        <div className="service-card-body service-card-media-body">
          <h3 className="service-card-title">{title}</h3>
          <p className="service-card-desc">{description}</p>
          <div className="service-card-footer">
            <span className="service-card-btn">
              <span>Learn More</span>
              <ArrowRight className="service-card-btn-icon" aria-hidden />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
