import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { companyData } from '@/lib/data';
import { PageHero } from '@/components/PageHero';
import { PageCta } from '@/components/PageCta';
import { FaqSection, ContactInfoSection } from '@/components/sections/ProcessIndustriesFaq';
import type { FormSubmission } from '@shared/schema';

const FORM_NAME = "Quote Request";

const Contact = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    insuranceType: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const submission: FormSubmission = {
        ...data,
        formName: FORM_NAME,
      };
      const response = await apiRequest('POST', '/api/submit-form', submission);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Quote Request Sent!",
        description: data.message || "Thank you for your interest! We will contact you soon with a personalized quote.",
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

  const handleInputChange = (field: keyof typeof formData) => (
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
      <PageHero
        title="Get in Touch"
        subtitle="Ready to protect what matters most? Contact us today for a personalized quote."
      />

      <section className="site-section site-section-cream-warm">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-shiv-text">Contact Information</h3>
              
              {/* Office Image */}
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Modern office building" 
                className="rounded-lg mb-8 w-full h-48 object-cover"
              />
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-shiv-accent h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-shiv-text">Our Office</h4>
                    <p className="text-shiv-text-muted">{companyData.contactInfo.address}</p>
                    <p className="text-sm text-shiv-text-muted mt-1">{companyData.contactInfo.licenses[0]}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-shiv-accent h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-shiv-text">Phone</h4>
                    <a href={`tel:${companyData.contactInfo.phone.replace(/\s/g, '')}`} className="text-shiv-text-muted hover:text-shiv-gold">
                      {companyData.contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-shiv-accent h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-shiv-text">Email</h4>
                    <p className="text-shiv-text-muted">{companyData.contactInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-shiv-accent h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-shiv-text">Business Hours</h4>
                    <p className="text-shiv-text-muted">{companyData.contactInfo.hours.weekdays}</p>
                    <p className="text-shiv-text-muted">{companyData.contactInfo.hours.saturday}</p>
                  </div>
                </div>
              </div>


            </div>

            {/* Contact Form */}
            <Card className="theme-card p-8 border-0 shadow-sm">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-6 text-shiv-text">Request a Quote</h3>
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
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="insuranceType">Type of Insurance</Label>
                    <Select onValueChange={handleSelectChange} value={formData.insuranceType} required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select insurance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motor">Motor Insurance</SelectItem>
                        <SelectItem value="property">Property Insurance</SelectItem>
                        <SelectItem value="health">Medical Insurance</SelectItem>
                        <SelectItem value="life">Life Insurance</SelectItem>
                        <SelectItem value="business">Business Insurance</SelectItem>
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
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-cta !normal-case !tracking-normal font-semibold"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? 'Sending...' : 'Send Quote Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FaqSection />

      <ContactInfoSection />

      <PageCta
        title="Protecting Kenya's Future, One Policy at a Time"
        description="Join thousands of satisfied clients who trust Shiv Insurance Brokers Ltd with their most valuable assets."
        primaryLabel="Get a quote"
        primaryHref="/contact"
      />
    </div>
  );
};

export default Contact;
