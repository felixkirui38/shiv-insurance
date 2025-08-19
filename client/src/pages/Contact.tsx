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
import logoImg from '@assets/SHIV LOGO_1755505090610.png';
import type { InsertContact } from '@shared/schema';

const Contact = () => {
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
            Get in Touch
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ready to protect what matters most? Contact us today for a personalized quote.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Contact Information</h3>
              
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
                    <h4 className="font-bold text-lg mb-1 text-gray-900">Our Office</h4>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                    <p className="text-sm text-gray-500">Licensed by Insurance Regulatory Authority (IRA)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-shiv-accent h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900">Phone</h4>
                    <p className="text-gray-600">Contact us for phone details</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-shiv-accent h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900">Email</h4>
                    <p className="text-gray-600">info@shivinsurance.co.ke</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-shiv-accent h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>


            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Request a Quote</h3>
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
                    className="w-full bg-shiv-blue hover:bg-shiv-light-blue text-white py-3"
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

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Protecting Kenya's Future, One Policy at a Time
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust Shiv Insurance Brokers Ltd with their most valuable assets.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
