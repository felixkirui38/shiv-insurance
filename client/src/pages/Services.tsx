import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'wouter';
import { companyData } from '@/lib/data';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { InsertContact } from '@shared/schema';

const Services = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<InsertContact>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    insuranceType: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest('POST', '/api/contacts', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Sent!",
        description: "Thank you for your interest! We will contact you soon with a personalized quote.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        insuranceType: '',
        message: ''
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof InsertContact) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      insuranceType: value
    }));
  };

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

      {/* Contact Section - DNG Style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Any Query? Inform us.
            </h2>
            <p className="text-lg text-gray-600">
              We're glad to discuss your organisation's situation. Kindly contact us using the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Image */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Contact us" 
                className="rounded-lg w-full h-full object-cover shadow-lg"
              />
            </div>

            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange('firstName')}
                        required
                        className="mt-2"
                        data-testid="input-firstname"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange('lastName')}
                        required
                        className="mt-2"
                        data-testid="input-lastname"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      required
                      className="mt-2"
                      data-testid="input-email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      required
                      className="mt-2"
                      data-testid="input-phone"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="insuranceType">Type of Insurance</Label>
                    <Select onValueChange={handleSelectChange} value={formData.insuranceType} required>
                      <SelectTrigger className="mt-2" data-testid="select-insurance-type">
                        <SelectValue placeholder="Select insurance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health">Health Insurance</SelectItem>
                        <SelectItem value="cyber">Cyber Insurance</SelectItem>
                        <SelectItem value="life">Life & Education</SelectItem>
                        <SelectItem value="pension">Pension & Retirement</SelectItem>
                        <SelectItem value="motor">Motor & Transport</SelectItem>
                        <SelectItem value="property">Property & Assets</SelectItem>
                        <SelectItem value="liability">Liability Insurance</SelectItem>
                        <SelectItem value="engineering">Engineering & Technical</SelectItem>
                        <SelectItem value="travel">Personal & Travel</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      placeholder="Tell us about your insurance needs..."
                      required
                      className="mt-2"
                      data-testid="textarea-message"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-shiv-blue hover:bg-shiv-light-blue text-white py-3"
                    disabled={contactMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {contactMutation.isPending ? 'Sending...' : 'Send message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-warm-gray">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-shiv-accent mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Our office address:</h4>
                <p className="text-gray-600">Nairobi, Kenya</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-warm-gray">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-shiv-accent mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Call for help:</h4>
                <p className="text-gray-600">+254 XXX XXX XXX</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-warm-gray">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-shiv-accent mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Mail us:</h4>
                <p className="text-gray-600">info@shivinsurance.co.ke</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
