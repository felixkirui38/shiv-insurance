import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from '@/lib/brand';
import { useCmsNavPages } from '@/lib/useCmsNavPages';

const staticQuickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Our Services' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/contact', label: 'Contact' },
];

const staticServices = [
  'Motor Insurance',
  'Property Insurance',
  'Medical Insurance',
  'Life Insurance',
  'Business Insurance',
  'Marine Insurance',
];

const footerCountries = [
  { code: 'ke', name: 'Kenya' },
  { code: 'ug', name: 'Uganda' },
  { code: 'tz', name: 'Tanzania' },
] as const;

const Footer = () => {
  const { data: cmsPages = [] } = useCmsNavPages();
  const footerLinkPages = cmsPages.filter((page) => page.appearance === 'footer_links');
  const servicePages = cmsPages.filter((page) => page.appearance === 'services');

  return (
    <footer className="bg-shiv-navy text-white">
      <div className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
          <div>
            <Link href="/" className="inline-block mb-6" aria-label="Shiv Insurance Brokers home">
              <img
                src={BRAND_LOGO_SRC}
                alt={BRAND_LOGO_ALT}
                className="site-logo"
                width={120}
                height={120}
                decoding="async"
              />
            </Link>
            <p className="text-white/72 text-sm leading-relaxed mb-4">
              Professional insurance brokerage services in Kenya since 1993. Licensed by IRA and member of AIBK.
            </p>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              &ldquo;As we operate in a world full of risk &amp; uncertainty... We at Shiv undertake to professionally manage it for you.&rdquo;
            </p>
            <div className="flex items-center gap-3" aria-label="Social media">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-btn border border-white/15 text-white/70 hover:text-shiv-gold hover:border-shiv-gold/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-btn border border-white/15 text-white/70 hover:text-shiv-gold hover:border-shiv-gold/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-btn border border-white/15 text-white/70 hover:text-shiv-gold hover:border-shiv-gold/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="space-y-3">
              {staticQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinkPages.map((page) => (
                <li key={page.id}>
                  <Link href={`/p/${page.slug}`} className="footer-link">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="mailto:info@shivinsurance.co.ke"
                className="footer-link inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4 shrink-0 text-shiv-gold" />
                info@shivinsurance.co.ke
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="space-y-3 text-sm">
              {staticServices.map((service) => (
                <li key={service} className="footer-link">
                  {service}
                </li>
              ))}
              {servicePages.map((page) => (
                <li key={page.id}>
                  <Link href={`/p/${page.slug}`} className="footer-link">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/contact" className="btn-cta w-full sm:w-auto justify-center">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-shiv-navy-deep">
        <div className="site-container py-5">
          <div className="footer-bar">
            <Link href="/" className="inline-block shrink-0" aria-label="Shiv Insurance Brokers home">
              <img
                src={BRAND_LOGO_SRC}
                alt={BRAND_LOGO_ALT}
                className="site-logo-sm"
                width={92}
                height={92}
                decoding="async"
              />
            </Link>
            <div
              className="footer-flags"
              aria-label="Countries we serve"
            >
              {footerCountries.map((country) => (
                <span
                  key={country.code}
                  className="footer-flag"
                  title={country.name}
                >
                  <img
                    src={`https://flagcdn.com/w40/${country.code}.png`}
                    srcSet={`https://flagcdn.com/w80/${country.code}.png 2x`}
                    alt={`${country.name} flag`}
                    width={28}
                    height={20}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              ))}
            </div>
            <div className="footer-bar-meta text-sm text-white/55">
              <span>© 2025 Shiv Insurance Brokers Ltd. All rights reserved.</span>
              <span className="hidden sm:inline text-white/25" aria-hidden>
                |
              </span>
              <span>Licensed by IRA</span>
              <span className="hidden sm:inline text-white/25" aria-hidden>
                |
              </span>
              <span>Member of AIBK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
