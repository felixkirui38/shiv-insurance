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
      <section className="py-24 bg-white" data-testid="section-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              About Shiv Insurance Brokers Ltd
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Established in 1997, we are a leading insurance brokerage firm committed to excellence and integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-warm-gray hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group" data-testid="card-mission">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-shiv-blue/10 rounded-full group-hover:bg-shiv-blue/20 transition-colors duration-300">
                  <img src={shieldIcon} alt="Mission" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-shiv-blue transition-colors duration-300">Our Mission</h4>
                <p className="text-gray-600 group-hover:text-gray-700">{companyData.mission}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-warm-gray hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group" data-testid="card-vision">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-shiv-accent/10 rounded-full group-hover:bg-shiv-accent/20 transition-colors duration-300">
                  <img src={visionIcon} alt="Vision" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-shiv-accent transition-colors duration-300">Our Vision</h4>
                <p className="text-gray-600 group-hover:text-gray-700">{companyData.vision}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-warm-gray hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group" data-testid="card-ethics">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-shiv-light-blue/10 rounded-full group-hover:bg-shiv-light-blue/20 transition-colors duration-300">
                  <img src={handshakeIcon} alt="Ethics" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-shiv-light-blue transition-colors duration-300">Our Ethics</h4>
                <p className="text-gray-600 group-hover:text-gray-700">
                  We pledge to maintain expertise, place clients' needs first, and compete with integrity while fulfilling our commitments.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/about">
              <Button className="bg-shiv-blue hover:bg-shiv-light-blue text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group" data-testid="button-learn-more">
                <span className="flex items-center space-x-2">
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Insurance Products
            </h2>
            <p className="mt-4 text-lg text-gray-600">
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
                  className="bg-white shadow-md hover:shadow-2xl transition-all duration-500 border-l-4 transform hover:-translate-y-3 hover:scale-105 group cursor-pointer" 
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
            <Link href="/services">
              <Button className="bg-shiv-blue hover:bg-shiv-light-blue text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group" data-testid="button-view-services">
                <span className="flex items-center space-x-2">
                  <span>View All Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-shiv-blue via-shiv-light-blue to-shiv-accent text-white relative overflow-hidden" data-testid="section-stats">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Trusted by Thousands Across Kenya
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Nearly three decades of excellence in insurance brokerage services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer" data-testid="stat-experience">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 group-hover:bg-white/20 transition-all duration-500 transform group-hover:scale-105">
                <AnimatedCounter
                  target={28}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-accent group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-lg font-semibold mb-1">Years</div>
                <div className="text-sm text-white/80">of Excellence</div>
              </div>
            </div>

            <div className="text-center group cursor-pointer" data-testid="stat-products">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 group-hover:bg-white/20 transition-all duration-500 transform group-hover:scale-105">
                <AnimatedCounter
                  target={34}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-accent group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-lg font-semibold mb-1">Products</div>
                <div className="text-sm text-white/80">Insurance Categories</div>
              </div>
            </div>

            <div className="text-center group cursor-pointer" data-testid="stat-partners">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 group-hover:bg-white/20 transition-all duration-500 transform group-hover:scale-105">
                <AnimatedCounter
                  target={12}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-accent group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-lg font-semibold mb-1">Partners</div>
                <div className="text-sm text-white/80">Insurance Companies</div>
              </div>
            </div>

            <div className="text-center group cursor-pointer" data-testid="stat-industries">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 group-hover:bg-white/20 transition-all duration-500 transform group-hover:scale-105">
                <AnimatedCounter
                  target={8}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold mb-2 text-shiv-accent group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-lg font-semibold mb-1">Industries</div>
                <div className="text-sm text-white/80">We Serve</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-shiv-blue via-shiv-accent to-shiv-light-blue"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-shiv-blue to-shiv-light-blue rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Ready to Protect What Matters Most?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Contact us today for a personalized insurance quote tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact">
                  <Button className="bg-shiv-accent hover:bg-shiv-accent/90 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group" data-testid="button-get-quote">
                    <span className="flex items-center space-x-2">
                      <span>Get Your Quote Today</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-shiv-blue px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300" data-testid="button-explore-services">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
