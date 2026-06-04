import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SearchDialog } from '@/components/SearchDialog';
import { Menu, Search, Mail, FileText } from 'lucide-react';
import logoImg from '@assets/SHIV LOGO_1755505090610.png';

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

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onItemClick}
          className={`${
            location === item.href
              ? 'text-shiv-blue bg-shiv-blue/5'
              : 'text-gray-600 hover:text-shiv-blue hover:bg-shiv-blue/5'
          } px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            mobile ? 'block w-full rounded-lg' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-shiv-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 text-xs">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {topBarItems.left.map((item) => {
                const Icon = item.icon;
                const className = "flex items-center gap-1.5 text-white/90 hover:text-white transition-colors";
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
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16 gap-6">
          {/* Logo - fixed aspect, no stretch */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src={logoImg}
                alt="Shiv Insurance Brokers"
                className="max-h-10 md:max-h-12 h-auto w-auto object-contain object-left cursor-pointer hover:opacity-85 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            <div className="flex items-center gap-0.5">
              <NavLinks />
            </div>
            <div className="ml-2 h-6 w-px bg-gray-200" aria-hidden />
            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-600 hover:text-shiv-blue hover:bg-shiv-blue/5 rounded-full" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-600" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-1 mt-6">
                  <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                  <Button variant="ghost" size="icon" className="h-10 w-10 self-start text-gray-600 hover:text-shiv-blue mt-2" aria-label="Search" onClick={() => { setSearchOpen(true); setIsOpen(false); }}>
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Navigation;
