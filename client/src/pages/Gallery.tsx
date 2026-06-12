import { Card, CardContent } from '@/components/ui/card';
import { companyData } from '@/lib/data';
import { PageHero } from '@/components/PageHero';

const Gallery = () => {
  return (
    <div>
      <PageHero
        title="Kenya - Our Beautiful Home"
        subtitle="Celebrating the beauty and culture of Kenya where we proudly serve"
      />

      <section className="site-section site-section-cream-warm">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyData.galleryImages.map((image, index) => (
              <Card key={index} className="service-card relative overflow-hidden group border-0">
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-shiv-navy/50 group-hover:bg-shiv-navy/35 transition-opacity flex items-end">
                    <CardContent className="p-4 text-white">
                      <h4 className="font-bold text-lg">{image.title}</h4>
                      <p className="text-sm text-white/90">{image.description}</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading mb-6">Proud to Serve Kenya</h2>
              <p className="section-subheading mb-6">
                Kenya is our home, and we are proud to serve this beautiful nation with its diverse landscapes, rich culture, and vibrant business community. From the bustling streets of Nairobi to the serene beaches of the coast, from Mount Kenya's majestic peaks to the vast savannas, our country inspires us every day.
              </p>
              <p className="section-subheading mb-6">
                As a Kenyan company, we understand the unique challenges and opportunities that businesses and individuals face in our market. This local knowledge, combined with our professional expertise, allows us to provide insurance solutions that are truly tailored to the Kenyan context.
              </p>
              <p className="section-subheading">
                We are committed to contributing to Kenya's economic growth by protecting the assets and interests of our fellow Kenyans, helping them build a secure and prosperous future.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Nairobi skyline"
                className="rounded-[var(--radius-card)] shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="site-section site-section-cream-warm">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">Kenya's Cultural Heritage</h2>
            <p className="mt-4 section-subheading max-w-3xl mx-auto">
              Our insurance services are deeply rooted in the values and traditions that make Kenya unique - community, trust, and mutual support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="theme-card text-center p-8 border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-shiv-navy rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4">Ubuntu</h4>
                <p className="text-shiv-text-muted">
                  The African philosophy of Ubuntu - "I am because we are" - guides our approach to client relationships and community support.
                </p>
              </CardContent>
            </Card>

            <Card className="theme-card text-center p-8 border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-shiv-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-shiv-navy-deep text-2xl">🦁</span>
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4">Strength</h4>
                <p className="text-shiv-text-muted">
                  Drawing inspiration from Kenya's wildlife, we embody the strength and resilience needed to protect our clients' interests.
                </p>
              </CardContent>
            </Card>

            <Card className="theme-card text-center p-8 border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-shiv-navy-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h4 className="text-xl font-bold text-shiv-text mb-4">Global Vision</h4>
                <p className="text-shiv-text-muted">
                  While rooted in Kenya, we maintain a global perspective to provide world-class insurance solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
