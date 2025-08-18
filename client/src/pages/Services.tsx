import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { companyData } from '@/lib/data';
import { Phone } from 'lucide-react';

const Services = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shiv-blue to-shiv-light-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Our Insurance Products
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive insurance solutions across 34+ product categories
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companyData.services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4"
                style={{borderLeftColor: `var(--${service.color})`}}
              >
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

            {/* Additional Services */}
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-600">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-purple-600 text-2xl mr-3">
                    <i className="fas fa-star"></i>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">Specialty Lines</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Political & Terrorism</li>
                  <li>• Contractors All Risks</li>
                  <li>• Overseas Travel</li>
                  <li>• Various Bonds</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-600">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-red-600 text-2xl mr-3">
                    <i className="fas fa-industry"></i>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">Industries Served</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Wood Manufacturing</li>
                  <li>• Hospitality</li>
                  <li>• Motor Industry</li>
                  <li>• Horticulture</li>
                  <li>• Real Estate & More</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button className="bg-shiv-blue hover:bg-shiv-light-blue text-white px-8 py-3 text-lg font-medium">
                <Phone className="mr-2 h-5 w-5" />
                Get Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Industries */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Industries We Serve
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide specialized insurance solutions across various sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.clientIndustries.map((industry, index) => (
              <Card key={index} className="text-center p-6 bg-warm-gray">
                <CardContent className="pt-6">
                  <h4 className="font-medium text-gray-900">{industry}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Underwriting Partners */}
      <section className="py-16 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Underwriting Partners
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Trusted partnerships with leading insurance companies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {companyData.underwritingPartners.map((partner, index) => (
              <Card key={index} className="bg-white p-6 text-center">
                <CardContent className="pt-6">
                  <h4 className="font-medium text-gray-900 text-sm">{partner}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
