import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SearchDialog } from '@/components/SearchDialog';
import { Menu, Search, Mail, FileText } from 'lucide-react';

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
    { href: '/downloads', label: 'Downloads' },

    { href: '/contact', label: 'Contact' },
  ];

  const quoteCta = topBarItems.left[0];

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onItemClick}
          className={
            mobile
              ? `block w-full px-4 py-3 text-base font-medium rounded-btn transition-colors ${
                  location === item.href
                    ? 'nav-link-active text-shiv-accent'
                    : 'text-white/90 hover:text-white hover:bg-white/[0.06]'
                }`
              : `nav-link ${location === item.href ? 'nav-link-active' : ''}`
          }
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Utility top bar */}
      <div className="bg-shiv-navy-deep border-b border-white/8">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 min-h-nav-compact py-2 text-xs font-medium">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {topBarItems.left.map((item) => {
                const Icon = item.icon;
                const className =
                  'flex items-center gap-1.5 text-white/75 hover:text-shiv-accent transition-colors';
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
            <div className="flex items-center gap-3 sm:gap-5">
              {topBarItems.right.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/75 hover:text-shiv-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar — logo left, links center, CTA right */}
      <nav className="bg-shiv-navy border-b border-white/8 shadow-md shadow-black/20">
        <div className="site-container">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 min-h-nav lg:gap-8">
            <div className="flex shrink-0 items-center py-3">
              <Link href="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Shiv Insurance Brokers"
                  className="h-9 w-auto max-w-[10.5rem] object-contain object-left cursor-pointer hover:opacity-90 transition-opacity md:h-10"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center gap-0.5">
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
                className="btn-cta hidden sm:inline-flex shrink-0"
              >
                {quoteCta.label}
              </Link>

              <div className="md:hidden">
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
                        className="btn-cta mt-4 w-full"
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
