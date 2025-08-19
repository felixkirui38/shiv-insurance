import logoImg from '@assets/SHIV LOGO_1755505090610.png';
import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">

            <p className="text-gray-300 mb-4">
              Professional insurance brokerage services in Kenya since 1997. Licensed by IRA and member of AIBK.
            </p>
            <p className="text-gray-400 text-sm">
              "As we operate in a world full of risk & uncertainty... We at Shiv undertake to professionally manage it for you."
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-shiv-accent transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-shiv-accent transition-colors">Our Services</Link></li>
              <li><Link href="/team" className="hover:text-shiv-accent transition-colors">Our Team</Link></li>
              <li><Link href="/contact" className="hover:text-shiv-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Motor Insurance</li>
              <li>Property Insurance</li>
              <li>Medical Insurance</li>
              <li>Life Insurance</li>
              <li>Business Insurance</li>
              <li>Marine Insurance</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Shiv Insurance Brokers Ltd. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Licensed by IRA</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">Member of AIBK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
