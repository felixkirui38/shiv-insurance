import { SliderHeader } from '@/components/SliderHeader';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { companyData } from '@/lib/data';
import { ArrowRight, Shield, Target, Star, Lightbulb, Zap } from 'lucide-react';
import { DedicatedSection } from '@/components/sections/DedicatedSection';
import { CoveragePreviewSection } from '@/components/sections/CoveragePreviewSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { MarqueeBanner } from '@/components/sections/MarqueeBanner';
import { TeamSection, TestimonialsSection } from '@/components/sections/TeamTestimonialsSection';
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection';
import shieldIcon from '@assets/shield.svg';
import visionIcon from '@assets/vision.svg';
import handshakeIcon from '@assets/handshake.svg';

const Home = () => {
  return (
    <div>
      <SliderHeader />

      <DedicatedSection />

      <CoveragePreviewSection />
      
      {/* Quick Overview */}
      <section className="site-section bg-white site-section-tight-top" data-testid="section-overview">
        <div className="site-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="section-heading">
              Your Risk. Our Expertise. Your Peace of Mind.
            </h2>
            <p className="mt-4 section-subheading">
              As independent brokers, we shop Kenya&apos;s leading insurers on your behalf — comparing policies so you get the right cover at a fair price, not just the cheapest quote on the table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-shiv-cream-warm border-0 shadow-sm hover:shadow-lg transition-all duration-300 group rounded-[var(--radius-card)]" data-testid="card-mission">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-shiv-accent/15 rounded-full group-hover:bg-shiv-accent/25 transition-colors duration-300">
                  <img src={shieldIcon} alt="Mission" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4 group-hover:text-shiv-accent transition-colors duration-300">Our Mission</h4>
                <p className="text-shiv-text-muted">
                  To place the right insurance in your hands — honest advice, competitive premiums, and cover that protects what you&apos;ve worked hard to build.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-shiv-cream-warm border-0 shadow-sm hover:shadow-lg transition-all duration-300 group rounded-[var(--radius-card)]" data-testid="card-vision">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-shiv-accent/10 rounded-full group-hover:bg-shiv-accent/20 transition-colors duration-300">
                  <img src={visionIcon} alt="Vision" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4 group-hover:text-shiv-accent transition-colors duration-300">Our Vision</h4>
                <p className="text-shiv-text-muted">
                  To be Kenya&apos;s go-to insurance broker — known for world-class service, trusted advice, and putting clients first in every policy we place.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-shiv-cream-warm border-0 shadow-sm hover:shadow-lg transition-all duration-300 group rounded-[var(--radius-card)]" data-testid="card-ethics">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-shiv-navy/10 rounded-full group-hover:bg-shiv-navy/15 transition-colors duration-300">
                  <img src={handshakeIcon} alt="Ethics" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4 group-hover:text-shiv-navy transition-colors duration-300">Our Ethics</h4>
                <p className="text-shiv-text-muted">
                  We work for you, not the insurer. Expert guidance, transparent recommendations, and integrity in every renewal, placement, and claim.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/about" className="btn-cta gap-2 group normal-case tracking-normal" data-testid="button-learn-more">
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Cyber Insurance Highlight */}
      <section className="site-section site-section-navy" data-testid="section-cyber-highlight">
        <div className="site-container">
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-shiv-gold text-shiv-navy-deep text-xs font-bold px-3 py-1 rounded-full mb-4" data-testid="badge-cyber-new">
                  ESSENTIAL COVER
                </div>
                <h2 className="text-3xl font-bold mb-4" data-testid="heading-cyber-insurance">
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
                  <h4 className="text-base font-semibold mb-2">Data Breach Response</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Legal, notification, and recovery costs covered</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-ransomware">
                  <Target className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2">Ransomware & Extortion</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Protection when criminals hold your systems hostage</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-crisis">
                  <Zap className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2">Crisis Management</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Expert incident response and reputation repair</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-continuity">
                  <Star className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2">Business Interruption</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Lost income while systems are down</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="site-section site-section-cream-warm">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Cover for Every Risk You Face
            </h2>
            <p className="mt-4 section-subheading">
              Motor, medical, property, liability, cyber, and more — 34+ insurance products from one trusted broker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {companyData.services.map((service, index) => {
              const IconComponent = index === 0 ? Shield : 
                                   index === 1 ? Target : 
                                   index === 2 ? ArrowRight : 
                                   index === 3 ? Star : 
                                   index === 4 ? Lightbulb : 
                                   index === 5 ? Zap : Shield;
              
              return (
                <Card 
                  key={index} 
                  className="service-card border-l-4 group cursor-pointer" 
                  style={{borderLeftColor: `var(--${service.color})`}}
                  data-testid={`card-service-${index}`}
                >
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500" 
                         style={{backgroundColor: `var(--${service.color})`}}></div>
                    
                    <div className="flex items-center mb-4 relative z-10">
                      <div className="p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300" 
                           style={{backgroundColor: `var(--${service.color})20`}}>
                        <IconComponent 
                          className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
                          style={{color: `var(--${service.color})`}} 
                        />
                      </div>
                      <h4 className="font-bold text-lg text-shiv-text group-hover:scale-105 transition-transform duration-300">
                        {service.category}
                      </h4>
                    </div>
                    
                    <ul className="text-sm text-shiv-text-muted space-y-2 relative z-10">
                      {service.products.slice(0, 4).map((product, idx) => (
                        <li key={idx} className="flex items-center space-x-2 group-hover:translate-x-1 transition-transform duration-300" 
                            style={{transitionDelay: `${idx * 50}ms`}}>
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor: `var(--${service.color})`}}></div>
                          <span>{product}</span>
                        </li>
                      ))}
                      {service.products.length > 4 && (
                        <li className="text-xs font-semibold mt-2" style={{color: `var(--${service.color})`}}>
                          +{service.products.length - 4} more products
                        </li>
                      )}
                    </ul>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full border-current hover:bg-current hover:text-white transition-colors duration-300"
                        style={{borderColor: `var(--${service.color})`, color: `var(--${service.color})`}}
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <Link href="/services" className="btn-cta gap-2 group normal-case tracking-normal" data-testid="button-view-services">
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
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

      <TeamSection />

      <TestimonialsSection />

      <BlogPreviewSection />

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
