import { SliderHeader } from '@/components/SliderHeader';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Shield, Target, Star, Zap } from 'lucide-react';
import { DedicatedSection } from '@/components/sections/DedicatedSection';
import { CoveragePreviewSection } from '@/components/sections/CoveragePreviewSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { MarqueeBanner } from '@/components/sections/MarqueeBanner';
import { TestimonialsSection } from '@/components/sections/TeamTestimonialsSection';

const Home = () => {
  return (
    <div>
      <SliderHeader />

      <DedicatedSection />

      <CoveragePreviewSection />

      <section className="site-section bg-white site-section-tight-top" data-testid="section-overview">
        <div className="site-container">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h2 className="section-heading">
              Your Risk. Our Expertise. Your Peace of Mind.
            </h2>
            <p className="mt-4 section-subheading">
              As independent brokers, we shop Kenya&apos;s leading insurers on your behalf — comparing policies so you get the right cover at a fair price, not just the cheapest quote on the table.
            </p>
          </div>

          <div className="text-center">
            <Link href="/about" className="btn-cta gap-2 group normal-case tracking-normal" data-testid="button-learn-more">
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <section className="site-section site-section-navy" data-testid="section-cyber-highlight">
        <div className="site-container">
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-shiv-gold text-shiv-navy-deep text-xs font-bold px-3 py-1 rounded-full mb-4" data-testid="badge-cyber-new">
                  ESSENTIAL COVER
                </div>
                <h2 className="text-3xl font-bold mb-4 text-shiv-gold" data-testid="heading-cyber-insurance">
                  Cyber Insurance — Because Hackers Don&apos;t Send Warnings
                </h2>
                <p className="text-lg mb-6 text-white/90" data-testid="text-cyber-description">
                  One breach can shut down operations overnight. Our cyber policies cover data loss, ransomware, crisis response, and business interruption — so a digital attack doesn&apos;t become a financial disaster.
                </p>
                <Link href="/services" className="btn-cta normal-case tracking-normal font-semibold" data-testid="button-cyber-learn-more">
                  Get Cyber Cover Today
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-breach">
                  <Shield className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2 text-white">Data Breach Response</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Legal, notification, and recovery costs covered</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-ransomware">
                  <Target className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2 text-white">Ransomware & Extortion</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Protection when criminals hold your systems hostage</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-crisis">
                  <Zap className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2 text-white">Crisis Management</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Expert incident response and reputation repair</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-continuity">
                  <Star className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2 text-white">Business Interruption</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Lost income while systems are down</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUsSection />

      <MarqueeBanner />

      {/* Stats Section */}
      <section className="site-section site-section-navy relative overflow-hidden" data-testid="section-stats">
        <div className="site-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
              A Track Record You Can Insure On
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Decades of placing policies, handling claims, and earning trust across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group" data-testid="stat-experience">
              <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/10 p-8 transition-colors group-hover:bg-white/15">
                <AnimatedCounter
                  target={28}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-gold"
                />
                <div className="text-lg font-semibold mb-1 text-white">Years</div>
                <div className="text-sm text-white/80">of Excellence</div>
              </div>
            </div>

            <div className="text-center group" data-testid="stat-products">
              <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/10 p-8 transition-colors group-hover:bg-white/15">
                <AnimatedCounter
                  target={34}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-gold"
                />
                <div className="text-lg font-semibold mb-1 text-white">Products</div>
                <div className="text-sm text-white/80">Insurance Categories</div>
              </div>
            </div>

            <div className="text-center group" data-testid="stat-partners">
              <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/10 p-8 transition-colors group-hover:bg-white/15">
                <AnimatedCounter
                  target={15}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-gold"
                />
                <div className="text-lg font-semibold mb-1 text-white">Partners</div>
                <div className="text-sm text-white/80">Insurance Companies</div>
              </div>
            </div>

            <div className="text-center group" data-testid="stat-industries">
              <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/10 p-8 transition-colors group-hover:bg-white/15">
                <AnimatedCounter
                  target={15}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-gold"
                />
                <div className="text-lg font-semibold mb-1 text-white">Industries</div>
                <div className="text-sm text-white/80">We Serve</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Section */}
      <section className="site-section bg-shiv-cream-warm" data-testid="section-cta">
        <div className="site-container">
          <div className="site-section-navy rounded-[var(--radius-card)] p-10 md:p-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
              Don&apos;t Leave Your Future to Chance
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Get a tailored quote within 24 hours. Whether it&apos;s your car, clinic, factory, or family — we&apos;ll find the cover that fits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" data-testid="button-contact-us">
                <Button
                  size="lg"
                  className="bg-white text-shiv-navy hover:bg-gray-100 px-10 py-3 text-base font-semibold uppercase tracking-wide"
                >
                  Contact Us for a Quote
                </Button>
              </Link>
              <Link href="/services" data-testid="button-view-services-cta">
                <Button
                  size="lg"
                  className="bg-white text-shiv-navy hover:bg-gray-100 px-10 py-3 text-base font-semibold uppercase tracking-wide"
                >
                  Browse All Covers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
