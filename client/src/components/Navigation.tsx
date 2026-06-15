import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SearchDialog } from '@/components/SearchDialog';
import { Menu, Search, Mail, FileText, ShoppingBag } from 'lucide-react';
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from '@/lib/brand';

const topBarItems = {
  left: [
    { icon: FileText, label: 'Get a quote', href: '/contact' },
    { icon: Mail, label: 'info@shivinsurance.co.ke', href: 'mailto:info@shivinsurance.co.ke' },
  ],
  right: [
    { label: 'Licensed by IRA', href: '#' },
    { label: 'Member of AIBK', href: '#' },
  ],
};

const Navigation = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/buy-now', label: 'Buy Now' },
    { href: '/downloads', label: 'Downloads' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const quoteCta = topBarItems.left[0];

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {navItems.map((item) => {
        const isBuyNow = item.href === '/buy-now';
        const isActive = location === item.href;

        if (mobile) {
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={
                isBuyNow
                  ? `flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold rounded-btn border transition-colors ${
                      isActive
                        ? 'border-shiv-gold/50 bg-shiv-gold/15 text-shiv-gold'
                        : 'border-shiv-gold/30 bg-shiv-gold/10 text-shiv-gold hover:bg-shiv-gold/15'
                    }`
                  : `block w-full px-4 py-3 text-sm font-medium rounded-btn transition-colors ${
                      isActive
                        ? 'text-shiv-gold'
                        : 'text-white/90 hover:text-white hover:bg-white/[0.06]'
                    }`
              }
            >
              {isBuyNow ? <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden /> : null}
              {item.label}
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={
              isBuyNow
                ? `nav-link nav-link-buy-now${isActive ? ' nav-link-buy-now-active' : ''}`
                : `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            {isBuyNow ? <ShoppingBag className="h-3.5 w-3.5 shrink-0" aria-hidden /> : null}
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Utility top bar */}
      <div className="bg-shiv-navy-deep border-b border-white/8">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 min-h-nav-compact py-1.5 text-xs font-medium">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {topBarItems.left.map((item) => {
                const Icon = item.icon;
                const className =
                  'flex items-center gap-1.5 text-white/75 hover:text-shiv-gold transition-colors';
                const content = (
                  <>
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </>
                );
                return item.href.startsWith('/') ? (
                  <Link key={item.label} href={item.href} className={className}>
                    {content}
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} className={className}>
                    {content}
                  </a>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-5">
              {topBarItems.right.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[0.6875rem] sm:text-xs text-white/75 hover:text-shiv-gold transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar — dark navy, logo | links | search + gold CTA */}
      <nav className="site-header-nav bg-shiv-navy border-b border-white/8 shadow-md shadow-black/15">
        <div className="site-container">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4 lg:gap-8 min-w-0">
            <div className="flex shrink-0 items-center">
              <Link href="/" className="shrink-0 block leading-none hover:opacity-95 transition-opacity" aria-label="Shiv Insurance Brokers home">
                <img
                  src={BRAND_LOGO_SRC}
                  alt={BRAND_LOGO_ALT}
                  className="site-logo-header"
                  width={128}
                  height={128}
                  decoding="async"
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center justify-center gap-0.5 min-w-0">
              <NavLinks />
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/8 rounded-btn"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Link
                href={quoteCta.href}
                className="btn-cta hidden sm:inline-flex shrink-0 !text-shiv-navy-deep"
              >
                {quoteCta.label}
              </Link>

              <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-white hover:bg-white/8 rounded-btn"
                      aria-label="Open menu"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[min(100vw-2rem,20rem)] bg-shiv-navy border-white/10 text-white"
                  >
                    <div className="flex flex-col gap-1 mt-8">
                      <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                      <Link
                        href={quoteCta.href}
                        onClick={() => setIsOpen(false)}
                        className="btn-cta mt-4 w-full !text-shiv-navy-deep"
                      >
                        {quoteCta.label}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 self-start text-white/80 hover:text-white hover:bg-white/8 mt-2 rounded-btn"
                        aria-label="Search"
                        onClick={() => {
                          setSearchOpen(true);
                          setIsOpen(false);
                        }}
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Navigation;
