import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import logoImg from '@assets/SHIV LOGO_1755505090610.png';

const Navigation = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/team', label: 'Our Team' },
    { href: '/gallery', label: 'Gallery' },
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
              ? 'text-shiv-blue'
              : 'text-gray-700 hover:text-shiv-blue'
          } px-3 py-2 text-sm font-medium transition-colors ${
            mobile ? 'block' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
      <Link href="/contact" onClick={onItemClick}>
        <Button className="bg-shiv-blue text-white hover:bg-shiv-light-blue">
          Get Quote
        </Button>
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <img 
                src={logoImg} 
                alt="Shiv Insurance Brokers Ltd" 
                className="h-12 w-auto hover:opacity-80 transition-opacity cursor-pointer"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLinks />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
