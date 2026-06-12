import { companyData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export function ProcessSection() {
  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <div className="text-center mb-12">
          <h2 className="section-heading">How We Work</h2>
          <p className="mt-4 section-subheading max-w-2xl mx-auto">
            A straightforward process from first enquiry to ongoing policy support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyData.processSteps.map((step) => (
            <Card key={step.step} className="theme-card border-0 text-center p-6 relative">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-shiv-gold text-shiv-navy-deep font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="font-bold text-shiv-text mb-2">{step.title}</h3>
                <p className="text-sm text-shiv-text-muted">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <section className="site-section site-section-cream-warm">
      <div className="site-container">
        <div className="text-center mb-12">
          <h2 className="section-heading">Industries We Serve</h2>
          <p className="mt-4 section-subheading">
            Specialized insurance solutions tailored to your sector's unique risks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companyData.clientIndustries.map((industry) => (
            <div
              key={industry}
              className="theme-card px-5 py-4 text-sm font-medium text-shiv-text hover:border-shiv-gold/40 transition-colors"
            >
              {industry}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="site-section bg-white">
      <div className="site-container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="mt-4 section-subheading">
            Common questions about working with Shiv Insurance Brokers Ltd.
          </p>
        </div>

        <div className="space-y-4">
          {companyData.faqs.map((faq) => (
            <details key={faq.question} className="theme-card group">
              <summary className="cursor-pointer list-none px-6 py-4 font-semibold text-shiv-text flex items-center justify-between">
                {faq.question}
                <span className="text-shiv-gold text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-6 pb-5 text-shiv-text-muted text-sm leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactInfoSection() {
  const { contactInfo } = companyData;

  return (
    <section className="site-section site-section-cream-warm">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="theme-card p-6 text-center">
            <h3 className="font-bold text-shiv-text mb-2">Visit Us</h3>
            <p className="text-sm text-shiv-text-muted">{contactInfo.address}</p>
          </div>
          <div className="theme-card p-6 text-center">
            <h3 className="font-bold text-shiv-text mb-2">Call Us</h3>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="text-sm text-shiv-gold font-semibold hover:underline">
              {contactInfo.phone}
            </a>
            <p className="text-xs text-shiv-text-muted mt-2">{contactInfo.hours.weekdays}</p>
          </div>
          <div className="theme-card p-6 text-center">
            <h3 className="font-bold text-shiv-text mb-2">Email Us</h3>
            <a href={`mailto:${contactInfo.email}`} className="text-sm text-shiv-gold font-semibold hover:underline">
              {contactInfo.email}
            </a>
            <p className="text-xs text-shiv-text-muted mt-2">{contactInfo.hours.saturday}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
