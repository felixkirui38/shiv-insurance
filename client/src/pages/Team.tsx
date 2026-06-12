import { Card, CardContent } from '@/components/ui/card';
import { companyData } from '@/lib/data';
import { GraduationCap, Clock, Users, Settings, TrendingUp } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

const Team = () => {
  const strengthIcons = [GraduationCap, Clock, Users, Settings, TrendingUp];

  return (
    <div>
      <PageHero
        title="Our Leadership Team"
        subtitle="Professional expertise built on education, experience, and commitment"
      />

      <section className="site-section bg-white">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">Our Leadership</h2>
            <p className="mt-4 section-subheading">
              Meet the experienced professionals leading Shiv Insurance Brokers Ltd
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {companyData.team.map((member, index) => (
              <Card key={index} className="theme-card text-center p-8 border-0 shadow-sm">
                <CardContent className="pt-6">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.position}`}
                    className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
                  />
                  <h4 className="text-xl font-bold text-shiv-text mb-2">{member.name}</h4>
                  <p className="text-shiv-gold font-medium mb-2">{member.position}</p>
                  <p className="text-shiv-text-muted text-sm">{member.qualification}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-shiv-text-muted max-w-3xl mx-auto">
              Everything depends on communication. With our professional staff and thorough understanding of your business, we strive to meet the goals we establish for ourselves and our clients. Built on a foundation of honesty, integrity and trust, we work as a team to develop exceptional programs our clients rely on to grow and succeed in today's ever-changing market.
            </p>
          </div>
        </div>
      </section>

      <section className="site-section site-section-cream-warm">
        <div className="site-container">
          <div className="theme-panel-navy p-8 md:p-12">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">Our Strengths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {companyData.strengths.map((strength, index) => {
                const IconComponent = strengthIcons[index];
                return (
                  <div key={index} className="text-center">
                    <IconComponent className="h-12 w-12 mx-auto mb-4 text-shiv-gold" />
                    <h5 className="font-bold text-lg mb-2 text-white">
                      {strength.split(' ').slice(0, 2).join(' ')}
                    </h5>
                    <p className="text-sm text-white/85">{strength}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional team meeting"
                className="rounded-[var(--radius-card)] shadow-lg w-full"
              />
            </div>
            <div>
              <h3 className="section-heading mb-6">Professional Excellence</h3>
              <p className="section-subheading mb-6">
                We are connecting with our clients, showing them we care, asking them the right questions and listening to their concerns. This enables us to respond with the best advice, services and products, whether on the phone, or in person.
              </p>
              <p className="section-subheading mb-6">
                Through individual attention and a thorough understanding of your business, Shiv Insurance can recommend a customized plan to fit your specific needs. We develop programs that strategically address our clients' insurance requirements with the ultimate goal of protecting their assets.
              </p>
              <p className="section-subheading">
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
