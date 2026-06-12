import { Card, CardContent } from "@/components/ui/card";
import { companyData } from "@/lib/data";
import { Target, Star, Lightbulb, Zap, CheckCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageCta } from "@/components/PageCta";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TeamSection } from "@/components/sections/TeamTestimonialsSection";
import { ProcessSection, IndustriesSection } from "@/components/sections/ProcessIndustriesFaq";
import { MarqueeBanner } from "@/components/sections/MarqueeBanner";
import shieldIcon from "@assets/shield.svg";
import visionIcon from "@assets/vision.svg";
import handshakeIcon from "@assets/handshake.svg";
import aboutImage from "@assets/stock_images/professional_busines_0dbd9b6f.jpg";

const iconMap: Record<string, any> = {
  "shield-alt": Target,
  target: Target,
  star: Star,
  lightbulb: Lightbulb,
  bolt: Zap,
};

const About = () => {
  return (
    <div>
      <PageHero
        title="About Shiv Insurance Brokers Ltd"
        subtitle="Professional insurance brokerage services in Kenya"
      />

      <section className="site-section bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={aboutImage}
                alt="Shiv Insurance Brokers - Professional Team"
                className="rounded-[var(--radius-card)] shadow-lg w-full"
                data-testid="img-about-team"
              />
            </div>
            <div>
              <h3 className="section-heading mb-6">Our Background</h3>
              <p className="section-subheading mb-4">{companyData.background}</p>
              <p className="section-subheading mb-6">
                {companyData.contactInfo.licenses.join(". ")}.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <CheckCircle className="text-shiv-gold mr-2 h-5 w-5" />
                  <span className="text-sm text-shiv-text-muted">
                    IRA Licensed Broker
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-shiv-gold mr-2 h-5 w-5" />
                  <span className="text-sm text-shiv-text-muted">AIBK Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section site-section-cream-warm">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">Our Foundation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="theme-card text-center p-8 border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={shieldIcon} alt="Mission" className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4">Our Mission</h4>
                <p className="text-shiv-text-muted">{companyData.mission}</p>
              </CardContent>
            </Card>

            <Card className="theme-card text-center p-8 border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={visionIcon} alt="Vision" className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4">Our Vision</h4>
                <p className="text-shiv-text-muted">{companyData.vision}</p>
              </CardContent>
            </Card>

            <Card className="theme-card text-center p-8 border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={handshakeIcon} alt="Ethics" className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4">Our Ethics</h4>
                <p className="text-shiv-text-muted">
                  We pledge to maintain expertise, place clients' needs first,
                  and compete with integrity while fulfilling our commitments to
                  the greatest extent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">Our Core Values</h2>
          </div>

          <div className="theme-panel-navy p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {companyData.coreValues.map((value, index) => {
                const IconComponent = iconMap[value.icon];
                return (
                  <div key={index} className="text-center">
                    <IconComponent className="h-12 w-12 mx-auto mb-4 text-shiv-gold" />
                    <h5 className="font-bold text-lg mb-2 text-white">{value.name}</h5>
                    <p className="text-sm text-white/85">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section site-section-cream-warm">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">Our Strengths</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {companyData.strengths.map((strength, index) => (
              <Card key={index} className="theme-card text-center p-6 border-0 shadow-sm">
                <CardContent className="pt-6">
                  <CheckCircle className="h-12 w-12 text-shiv-gold mx-auto mb-4" />
                  <p className="text-shiv-text-muted text-sm">{strength}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUsSection showCta />

      <ProcessSection />

      <TeamSection />

      <IndustriesSection />

      <MarqueeBanner />

      <PageCta
        title="Partner with a broker you can trust"
        description="Let Shiv Insurance Brokers Ltd help you protect what matters most with tailored cover and ongoing support."
        primaryLabel="Get a quote"
        primaryHref="/contact"
        secondaryLabel="View services"
        secondaryHref="/services"
      />
    </div>
  );
};

export default About;
