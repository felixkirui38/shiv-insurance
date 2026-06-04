import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-shiv-navy text-white">
      <div className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Logo & social */}
          <div className="lg:col-span-3 flex flex-col">
            <Link href="/" className="inline-block self-start mb-6">
              <img
                src="/logo.png"
                alt="Shiv Insurance Brokers"
                className="h-10 w-auto max-w-[11rem] object-contain"
              />
            </Link>
            <p className="text-white/72 text-sm leading-relaxed mb-6 max-w-xs">
              Professional insurance brokerage services in Kenya since 1993. Licensed by IRA and member of AIBK.
            </p>
            <div className="flex items-center gap-3" aria-label="Social media">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-btn border border-white/15 text-white/70 hover:text-shiv-accent hover:border-shiv-accent/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-btn border border-white/15 text-white/70 hover:text-shiv-accent hover:border-shiv-accent/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-btn border border-white/15 text-white/70 hover:text-shiv-accent hover:border-shiv-accent/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="footer-link">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="footer-link">
                  Downloads
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="footer-heading">Services</h4>
            <ul className="space-y-3">
              <li className="footer-link">Motor Insurance</li>
              <li className="footer-link">Property Insurance</li>
              <li className="footer-link">Medical Insurance</li>
              <li className="footer-link">Life Insurance</li>
              <li className="footer-link">Business Insurance</li>
              <li className="footer-link">Marine Insurance</li>
            </ul>
          </div>

          {/* Contact / CTA column */}
          <div className="lg:col-span-4">
            <h4 className="footer-heading">Get in Touch</h4>
            <p className="text-white/72 text-sm leading-relaxed mb-4">
              &ldquo;As we operate in a world full of risk &amp; uncertainty... We at Shiv undertake to professionally manage it for you.&rdquo;
            </p>
            <a
              href="mailto:info@shivinsurance.co.ke"
              className="footer-link inline-flex items-center gap-2 mb-6"
            >
              <Mail className="h-4 w-4 shrink-0 text-shiv-accent" />
              info@shivinsurance.co.ke
            </a>
            <div className="rounded-btn border border-white/12 bg-white/5 p-6">
              <p className="text-sm font-medium text-white mb-3">
                Ready for a tailored insurance quote?
              </p>
              <Link href="/contact" className="btn-cta w-full sm:w-auto">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-shiv-navy-deep">
        <div className="site-container py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-white/55 text-sm">
              © 2025 Shiv Insurance Brokers Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/55">
              <span>Licensed by IRA</span>
              <span className="hidden sm:inline text-white/30" aria-hidden>
                •
              </span>
              <span>Member of AIBK</span>
              <span className="hidden sm:inline text-white/30" aria-hidden>
                •
              </span>
              <a href="#" className="hover:text-shiv-accent transition-colors">
                Privacy Policy
              </a>
              <span className="text-white/30" aria-hidden>
                •
              </span>
              <a href="#" className="hover:text-shiv-accent transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
