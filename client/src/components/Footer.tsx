import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-shiv-navy text-white">
      <div className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 flex flex-col text-left">
            <p className="text-white/72 mb-4 leading-relaxed">
              Professional insurance brokerage services in Kenya since 1993. Licensed by IRA and member of AIBK.
            </p>
            <p className="text-white/55 text-sm mb-4 leading-relaxed">
              &ldquo;As we operate in a world full of risk &amp; uncertainty... We at Shiv undertake to professionally manage it for you.&rdquo;
            </p>
            <Link href="/" className="inline-block self-start mt-1">
              <img
                src="/logo.png"
                alt="Shiv Insurance Brokers"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="lg:col-span-3">
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

          <div className="lg:col-span-4">
            <h4 className="footer-heading">Services</h4>
            <ul className="space-y-3 text-sm">
              <li className="footer-link">Motor Insurance</li>
              <li className="footer-link">Property Insurance</li>
              <li className="footer-link">Medical Insurance</li>
              <li className="footer-link">Life Insurance</li>
              <li className="footer-link">Business Insurance</li>
              <li className="footer-link">Marine Insurance</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-shiv-navy-deep">
        <div className="site-container py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/55 text-sm">
              © 2025 Shiv Insurance Brokers Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/55">
              <span>Licensed by IRA</span>
              <span aria-hidden>•</span>
              <span>Member of AIBK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
