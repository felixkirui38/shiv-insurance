import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-shiv-navy text-white">
      <div className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
          {/* About — existing company content */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo.png"
                alt="Shiv Insurance Brokers"
                className="logo-on-dark h-9 w-auto max-w-[11rem] object-contain"
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

          {/* Quick Links — existing routes */}
          <div>
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

          {/* Services — existing list */}
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="space-y-3 text-sm">
              <li className="footer-link">Motor Insurance</li>
              <li className="footer-link">Property Insurance</li>
              <li className="footer-link">Medical Insurance</li>
              <li className="footer-link">Life Insurance</li>
              <li className="footer-link">Business Insurance</li>
              <li className="footer-link">Marine Insurance</li>
            </ul>
            <div className="mt-8">
              <Link href="/contact" className="btn-cta w-full sm:w-auto justify-center">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — logo left, legal right */}
      <div className="border-t border-white/10 bg-shiv-navy-deep">
        <div className="site-container py-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="inline-block shrink-0">
              <img
                src="/logo.png"
                alt="Shiv Insurance Brokers"
                className="logo-on-dark h-8 w-auto max-w-[9rem] object-contain opacity-90"
              />
            </Link>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 text-sm text-white/55">
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
