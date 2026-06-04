import { SliderHeader } from '@/components/SliderHeader';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { companyData } from '@/lib/data';
import { ArrowRight, Shield, Target, Star, Lightbulb, Zap } from 'lucide-react';
import shieldIcon from '@assets/shield.svg';
import visionIcon from '@assets/vision.svg';
import handshakeIcon from '@assets/handshake.svg';

const Home = () => {
  return (
    <div>
      <SliderHeader />
      
      {/* Quick Overview */}
      <section className="site-section bg-white" data-testid="section-overview">
        <div className="site-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="section-heading">
              About Shiv Insurance Brokers Ltd
            </h2>
            <p className="mt-4 section-subheading">
              We are a leading insurance brokerage firm committed to excellence, integrity, and delivering personalized solutions that protect what matters most to our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-shiv-cream-warm border-0 shadow-sm hover:shadow-lg transition-all duration-300 group rounded-[var(--radius-card)]" data-testid="card-mission">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-shiv-accent/15 rounded-full group-hover:bg-shiv-accent/25 transition-colors duration-300">
                  <img src={shieldIcon} alt="Mission" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4 group-hover:text-shiv-accent transition-colors duration-300">Our Mission</h4>
                <p className="text-shiv-text-muted">{companyData.mission}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-shiv-cream-warm border-0 shadow-sm hover:shadow-lg transition-all duration-300 group rounded-[var(--radius-card)]" data-testid="card-vision">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-shiv-accent/10 rounded-full group-hover:bg-shiv-accent/20 transition-colors duration-300">
                  <img src={visionIcon} alt="Vision" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4 group-hover:text-shiv-accent transition-colors duration-300">Our Vision</h4>
                <p className="text-shiv-text-muted">{companyData.vision}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-shiv-cream-warm border-0 shadow-sm hover:shadow-lg transition-all duration-300 group rounded-[var(--radius-card)]" data-testid="card-ethics">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-shiv-navy/10 rounded-full group-hover:bg-shiv-navy/15 transition-colors duration-300">
                  <img src={handshakeIcon} alt="Ethics" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4 group-hover:text-shiv-navy transition-colors duration-300">Our Ethics</h4>
                <p className="text-shiv-text-muted">
                  We pledge to maintain expertise, place clients' needs first, and compete with integrity while fulfilling our commitments.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/about" data-testid="button-learn-more">
              <Button className="btn-cta gap-2 group">
                <span className="flex items-center space-x-2 normal-case tracking-normal font-semibold">
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
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
                <div className="inline-block bg-shiv-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-4" data-testid="badge-cyber-new">
                  NEW & ESSENTIAL
                </div>
                <h2 className="text-3xl font-bold mb-4" data-testid="heading-cyber-insurance">
                  Cyber Insurance Protection
                </h2>
                <p className="text-lg mb-6 text-white/90" data-testid="text-cyber-description">
                  Protect your business from the growing threat of cyberattacks, data breaches, and ransomware. 
                  Our comprehensive cyber insurance covers network security, crisis management, and business interruption.
                </p>
                <Link href="/services" data-testid="button-cyber-learn-more">
                  <Button className="btn-cta normal-case tracking-normal font-semibold">
                    Learn More About Cyber Insurance
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-breach">
                  <Shield className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2">Data Breach Protection</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Comprehensive coverage for data theft and loss</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-ransomware">
                  <Target className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2">Ransomware Coverage</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Protection against cyber extortion</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-crisis">
                  <Zap className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2">Crisis Management</h4>
                  <p className="text-sm text-white/90 leading-relaxed">24/7 expert support and PR repair</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6" data-testid="tile-cyber-continuity">
                  <Star className="w-8 h-8 mb-3" />
                  <h4 className="text-base font-semibold mb-2">Business Continuity</h4>
                  <p className="text-sm text-white/90 leading-relaxed">Coverage for business interruption</p>
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
              Our Insurance Products
            </h2>
            <p className="mt-4 section-subheading">
              Comprehensive insurance solutions across 34+ product categories
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
                      <h4 className="font-bold text-lg text-gray-900 group-hover:scale-105 transition-transform duration-300">
                        {service.category}
                      </h4>
                    </div>
                    
                    <ul className="text-sm text-gray-600 space-y-2 relative z-10">
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
            <Link href="/services" data-testid="button-view-services">
              <Button className="btn-cta gap-2 group">
                <span className="flex items-center space-x-2 normal-case tracking-normal font-semibold">
                  <span>View All Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="site-section site-section-navy relative overflow-hidden" data-testid="section-stats">
        <div className="site-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
              Trusted by Thousands Across Kenya
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Nearly three decades of excellence in insurance brokerage services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group" data-testid="stat-experience">
              <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/10 p-8 transition-colors group-hover:bg-white/15">
                <AnimatedCounter
                  target={28}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-light-blue"
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
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-light-blue"
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
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-light-blue"
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
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-light-blue"
                />
                <div className="text-lg font-semibold mb-1 text-white">Industries</div>
                <div className="text-sm text-white/80">We Serve</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="site-section bg-shiv-cream-warm" data-testid="section-cta">
        <div className="site-container">
          <div className="site-section-navy rounded-[var(--radius-card)] p-10 md:p-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
              Ready to Protect What Matters Most?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Contact us today for personalized insurance solutions tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" data-testid="button-contact-us">
                <Button
                  size="lg"
                  className="bg-white text-shiv-navy hover:bg-gray-100 px-10 py-3 text-base font-semibold uppercase tracking-wide"
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/services" data-testid="button-view-services-cta">
                <Button
                  size="lg"
                  className="bg-white text-shiv-navy hover:bg-gray-100 px-10 py-3 text-base font-semibold uppercase tracking-wide"
                >
                  View Services
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
