import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import { companyData } from "@/lib/data";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ProcessSection } from "@/components/sections/ProcessIndustriesFaq";
import {
  ServicesProtectSection,
  ServicesTrustSection,
} from "@/components/sections/ServicesShowcaseSections";
import { PageCta } from "@/components/PageCta";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { FormSubmission } from "@shared/schema";

const FORM_NAME = "Services Inquiry";

const Services = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    insuranceType: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const submission: FormSubmission = {
        ...data,
        formName: FORM_NAME,
      };
      const response = await apiRequest("POST", "/api/submit-form", submission);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message || "Thank you for your interest! We will contact you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        insuranceType: "",
        message: "",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
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

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      insuranceType: value,
    }));
  };

  return (
    <div>
      <PageHero
        title="Our Insurance Products"
        subtitle="Comprehensive insurance solutions across 34+ product categories"
      />

      <section className="site-section bg-white">
        <div className="site-container max-w-3xl mx-auto text-center">
          <p className="section-subheading">
            Shiv Insurance Brokers Ltd arranges cover across health, motor, property, liability,
            cyber, pension, and specialty lines — comparing products from Kenya&apos;s leading
            insurers so you receive independent advice and competitive terms.
          </p>
        </div>
      </section>

      <ProcessSection />

      <section className="site-section site-section-cream-warm">
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyData.services.map((service, index) => (
              <Card
                key={index}
                className={`${service.featured ? "bg-gradient-to-br from-shiv-gold to-shiv-gold-light text-shiv-navy-deep ring-4 ring-shiv-gold ring-opacity-50" : "service-card bg-white"} shadow-sm hover:shadow-lg transition-all border-l-4`}
                style={{
                  borderLeftColor: service.featured
                    ? "transparent"
                    : `var(--${service.color})`,
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div
                        className={`${service.featured ? "text-white" : `text-${service.color}`} text-2xl mr-3`}
                      >
                        <i className={`fas fa-${service.icon}`}></i>
                      </div>
                      <h4
                        className={`font-bold text-lg ${service.featured ? "text-white" : "text-shiv-text"}`}
                      >
                        {service.category}
                      </h4>
                    </div>
                    {service.featured && (
                      <span className="bg-white text-shiv-accent text-xs font-bold px-2 py-1 rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <ul
                    className={`text-sm ${service.featured ? "text-white text-opacity-95" : "text-shiv-text-muted"} space-y-1`}
                  >
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
                  <h4 className="font-bold text-lg text-shiv-text">
                    Specialty Lines
                  </h4>
                </div>
                <ul className="text-sm text-shiv-text-muted space-y-1">
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
                  <h4 className="font-bold text-lg text-shiv-text">
                    Industries Served
                  </h4>
                </div>
                <ul className="text-sm text-shiv-text-muted space-y-1">
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
              <Button
                className="btn-cta px-8 py-3 !normal-case !tracking-normal font-semibold inline-flex gap-2"
                data-testid="button-contact-services"
              >
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
      <section className="site-section bg-white">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Industries We Serve
            </h2>
            <p className="section-subheading mt-4">
              We provide specialized insurance solutions across various sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.clientIndustries.map((industry, index) => (
              <Card key={index} className="text-center p-6 bg-shiv-cream-warm">
                <CardContent className="pt-6">
                  <h4 className="font-medium text-shiv-text">{industry}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ServicesProtectSection />

      <ServicesTrustSection />

      {/* Contact Section */}
      <section className="site-section bg-white">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">
              Any Query? Inform us.
            </h2>
            <p className="text-lg text-shiv-text-muted">
              We're glad to discuss your organisation's situation. Kindly
              contact us using the form below.
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
                        onChange={handleInputChange("firstName")}
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
                        onChange={handleInputChange("lastName")}
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
                      onChange={handleInputChange("email")}
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
                      onChange={handleInputChange("phone")}
                      required
                      className="mt-2"
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <Label htmlFor="insuranceType">Type of Insurance</Label>
                    <Select
                      onValueChange={handleSelectChange}
                      value={formData.insuranceType}
                      required
                    >
                      <SelectTrigger
                        className="mt-2"
                        data-testid="select-insurance-type"
                      >
                        <SelectValue placeholder="Select insurance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health">Health Insurance</SelectItem>
                        <SelectItem value="cyber">Cyber Insurance</SelectItem>
                        <SelectItem value="life">Life & Education</SelectItem>
                        <SelectItem value="pension">
                          Pension & Retirement
                        </SelectItem>
                        <SelectItem value="motor">Motor & Transport</SelectItem>
                        <SelectItem value="property">
                          Property & Assets
                        </SelectItem>
                        <SelectItem value="liability">
                          Liability Insurance
                        </SelectItem>
                        <SelectItem value="engineering">
                          Engineering & Technical
                        </SelectItem>
                        <SelectItem value="travel">
                          Personal & Travel
                        </SelectItem>
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
                      onChange={handleInputChange("message")}
                      placeholder="Tell us about your insurance needs..."
                      required
                      className="mt-2"
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-cta !normal-case !tracking-normal font-semibold"
                    disabled={contactMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-shiv-cream-warm">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-shiv-accent mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Our office address:</h4>
                <p className="text-shiv-text-muted">{companyData.contactInfo.address}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-shiv-cream-warm">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-shiv-accent mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Call for help:</h4>
                <p className="text-shiv-text-muted">{companyData.contactInfo.phone}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-shiv-cream-warm">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-shiv-accent mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Mail us:</h4>
                <p className="text-shiv-text-muted">{companyData.contactInfo.email}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <WhyChooseUsSection />

      <PageCta
        title="Need help choosing the right cover?"
        description="Our team will assess your risks and recommend policies from trusted insurers across Kenya."
        primaryLabel="Request a quote"
        primaryHref="/contact"
        secondaryLabel="Download forms"
        secondaryHref="/downloads"
      />
    </div>
  );
};

export default Services;
