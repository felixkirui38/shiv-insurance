import { Card, CardContent } from '@/components/ui/card';
import { companyData } from '@/lib/data';
import { GraduationCap, Clock, Users, Settings, TrendingUp } from 'lucide-react';

const Team = () => {
  const strengthIcons = [GraduationCap, Clock, Users, Settings, TrendingUp];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shiv-blue to-shiv-light-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Our Leadership Team
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Professional expertise built on education, experience, and commitment
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Leadership
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet the experienced professionals leading Shiv Insurance Brokers Ltd
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {companyData.team.map((member, index) => (
              <Card key={index} className="text-center p-8 bg-warm-gray">
                <CardContent className="pt-6">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.position}`}
                    className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
                  />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-shiv-blue font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.qualification}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything depends on communication. With our professional staff and thorough understanding of your business, we strive to meet the goals we establish for ourselves and our clients. Built on a foundation of honesty, integrity and trust, we work as a team to develop exceptional programs our clients rely on to grow and succeed in today's ever-changing market.
            </p>
          </div>
        </div>
      </section>

      {/* Company Strengths */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-shiv-accent to-shiv-accent-light rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-12">Our Strengths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {companyData.strengths.map((strength, index) => {
                const IconComponent = strengthIcons[index];
                return (
                  <div key={index} className="text-center">
                    <IconComponent className="h-12 w-12 mx-auto mb-4" />
                    <h5 className="font-bold text-lg mb-2">
                      {strength.split(' ').slice(0, 2).join(' ')}
                    </h5>
                    <p className="text-sm opacity-90">{strength}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Commitment */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional team meeting"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Professional Excellence
              </h3>
              <p className="text-gray-600 mb-6">
                We are connecting with our clients, showing them we care, asking them the right questions and listening to their concerns. This enables us to respond with the best advice, services and products, whether on the phone, or in person.
              </p>
              <p className="text-gray-600 mb-6">
                Through individual attention and a thorough understanding of your business, Shiv Insurance can recommend a customized plan to fit your specific needs. We develop programs that strategically address our clients' insurance requirements with the ultimate goal of protecting their assets.
              </p>
              <p className="text-gray-600">
                With our partnership approach and knowledgeable staff, we can develop insurance solutions with a level of service and coverage you can't find anywhere else.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
