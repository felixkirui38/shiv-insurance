import { Card, CardContent } from '@/components/ui/card';
import { companyData } from '@/lib/data';

const Gallery = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shiv-blue to-shiv-light-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Kenya - Our Beautiful Home
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Celebrating the beauty and culture of Kenya where we proudly serve
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyData.galleryImages.map((image, index) => (
              <Card key={index} className="relative overflow-hidden shadow-lg group">
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-opacity flex items-end">
                    <CardContent className="p-4 text-white">
                      <h4 className="font-bold text-lg">{image.title}</h4>
                      <p className="text-sm opacity-90">{image.description}</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Kenya Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Proud to Serve Kenya
              </h2>
              <p className="text-gray-600 mb-6">
                Kenya is our home, and we are proud to serve this beautiful nation with its diverse landscapes, rich culture, and vibrant business community. From the bustling streets of Nairobi to the serene beaches of the coast, from Mount Kenya's majestic peaks to the vast savannas, our country inspires us every day.
              </p>
              <p className="text-gray-600 mb-6">
                As a Kenyan company, we understand the unique challenges and opportunities that businesses and individuals face in our market. This local knowledge, combined with our professional expertise, allows us to provide insurance solutions that are truly tailored to the Kenyan context.
              </p>
              <p className="text-gray-600">
                We are committed to contributing to Kenya's economic growth by protecting the assets and interests of our fellow Kenyans, helping them build a secure and prosperous future.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Nairobi skyline"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Heritage */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Kenya's Cultural Heritage
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our insurance services are deeply rooted in the values and traditions that make Kenya unique - community, trust, and mutual support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-shiv-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Ubuntu</h4>
                <p className="text-gray-600">
                  The African philosophy of Ubuntu - "I am because we are" - guides our approach to client relationships and community support.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-kenya-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🦁</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Strength</h4>
                <p className="text-gray-600">
                  Drawing inspiration from Kenya's wildlife, we embody the strength and resilience needed to protect our clients' interests.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-kenya-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Global Vision</h4>
                <p className="text-gray-600">
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
