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
              ? 'text-shiv-blue'
              : 'text-gray-700 hover:text-shiv-blue'
          } px-3 py-2 text-sm font-medium transition-colors ${
            mobile ? 'block' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Icon Only, Vertically Centered */}
          <div className="flex-shrink-0 flex items-center h-full py-2">
            <Link href="/" className="flex items-center h-full">
              <img 
                src={logoImg} 
                alt="Shiv Insurance Brokers" 
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity cursor-pointer"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation - Aligned with Logo */}
          <div className="hidden md:flex md:items-center h-full">
            <div className="flex items-center h-full space-x-6">
              <NavLinks />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-3 mt-6">
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
