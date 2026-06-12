import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const Hero = () => {
  return (
    <section className="relative site-section-navy text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="relative site-container py-24 sm:py-32">
        <div className="text-center">

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Professional Insurance Solutions for Kenya
          </h1>
          <p className="mt-6 text-xl leading-8 max-w-3xl mx-auto">
            With over 25 years of experience, Shiv Insurance Brokers Ltd provides comprehensive insurance brokerage services, protecting your assets and giving you peace of mind.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/services">
              <Button 
                className="bg-shiv-gold hover:bg-shiv-gold-hover px-8 py-3 text-lg font-semibold text-shiv-navy-deep"
                size="lg"
              >
                Our Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="ghost" 
                className="text-lg font-semibold text-white hover:text-shiv-accent hover:bg-white/10"
              >
                Get Quote →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
