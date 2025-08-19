import Hero from '@/components/Hero';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { companyData } from '@/lib/data';
import shieldIcon from '@assets/shield.svg';
import visionIcon from '@assets/vision.svg';
import handshakeIcon from '@assets/handshake.svg';

const Home = () => {
  return (
    <div>
      <Hero />
      
      {/* Quick Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              About Shiv Insurance Brokers Ltd
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Established in 1997, we are a leading insurance brokerage firm committed to excellence and integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-warm-gray">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={shieldIcon} alt="Mission" className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h4>
                <p className="text-gray-600">{companyData.mission}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-warm-gray">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={visionIcon} alt="Vision" className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h4>
                <p className="text-gray-600">{companyData.vision}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-warm-gray">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={handshakeIcon} alt="Ethics" className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Our Ethics</h4>
                <p className="text-gray-600">
                  We pledge to maintain expertise, place clients' needs first, and compete with integrity while fulfilling our commitments.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/about">
              <Button className="bg-shiv-blue hover:bg-shiv-light-blue text-white px-8 py-3">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Insurance Products
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive insurance solutions across 34+ product categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {companyData.services.slice(0, 6).map((service, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4" style={{borderLeftColor: `var(--${service.color})`}}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`text-${service.color} text-2xl mr-3`}>
                      <i className={`fas fa-${service.icon}`}></i>
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">{service.category}</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.products.map((product, idx) => (
                      <li key={idx}>• {product}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button className="bg-shiv-blue hover:bg-shiv-light-blue text-white px-8 py-3">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-shiv-blue to-shiv-light-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Ready to Protect What Matters Most?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a personalized insurance quote tailored to your specific needs.
          </p>
          <Link href="/contact">
            <Button className="bg-shiv-accent hover:bg-shiv-accent/90 px-8 py-3 text-lg font-semibold">
              Get Your Quote Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
