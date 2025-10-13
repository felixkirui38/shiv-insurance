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
                className={`${service.featured ? 'bg-gradient-to-br from-shiv-accent to-shiv-accent-light text-white ring-4 ring-shiv-accent ring-opacity-50' : 'bg-white'} shadow-md hover:shadow-lg transition-all border-l-4`}
                style={{borderLeftColor: service.featured ? 'transparent' : `var(--${service.color})`}}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`${service.featured ? 'text-white' : `text-${service.color}`} text-2xl mr-3`}>
                        <i className={`fas fa-${service.icon}`}></i>
                      </div>
                      <h4 className={`font-bold text-lg ${service.featured ? 'text-white' : 'text-gray-900'}`}>{service.category}</h4>
                    </div>
                    {service.featured && (
                      <span className="bg-white text-shiv-accent text-xs font-bold px-2 py-1 rounded">FEATURED</span>
                    )}
                  </div>
                  <ul className={`text-sm ${service.featured ? 'text-white text-opacity-95' : 'text-gray-600'} space-y-1`}>
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
              <Button className="bg-shiv-blue hover:bg-shiv-light-blue text-white px-8 py-3" data-testid="button-contact-services">
                <span className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Contact Us for a Quote</span>
                </span>
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

      {/* Medical Insurance Providers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Medical Insurance Partners
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Leading medical insurance providers we work with
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {companyData.medicalInsuranceProviders.map((provider, index) => (
              <Card key={index} className="bg-warm-gray p-6 flex flex-col items-center justify-center">
                <CardContent className="pt-6 text-center">
                  <img 
                    src={provider.logo} 
                    alt={provider.name}
                    className="h-12 w-auto object-contain mx-auto mb-3"
                  />
                  <p className="text-xs text-gray-600 mt-2">{provider.specialization}</p>
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
              <Card key={index} className="bg-white p-6 flex items-center justify-center">
                <CardContent className="pt-6">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-12 w-auto object-contain mx-auto"
                  />
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
