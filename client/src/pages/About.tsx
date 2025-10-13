import { Card, CardContent } from "@/components/ui/card";
import { companyData } from "@/lib/data";
import { Target, Star, Lightbulb, Zap, CheckCircle } from "lucide-react";
import shieldIcon from "@assets/shield.svg";
import visionIcon from "@assets/vision.svg";
import handshakeIcon from "@assets/handshake.svg";

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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shiv-blue to-shiv-light-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            About Shiv Insurance Brokers Ltd
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Over 25 years of professional insurance brokerage services in Kenya
          </p>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional business meeting"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Background
              </h3>
              <p className="text-gray-600 mb-4">{companyData.background}</p>
              <p className="text-gray-600 mb-6">
                We are a licensed broker by the Insurance Regulatory Association (IRA) and a proud member of the Association of Insurance Brokers of Kenya (AIBK).
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <CheckCircle className="text-shiv-blue mr-2 h-5 w-5" />
                  <span className="text-sm text-gray-600">
                    IRA Licensed Broker
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-shiv-blue mr-2 h-5 w-5" />
                  <span className="text-sm text-gray-600">AIBK Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Ethics */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Foundation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={shieldIcon} alt="Mission" className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h4>
                <p className="text-gray-600">{companyData.mission}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={visionIcon} alt="Vision" className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h4>
                <p className="text-gray-600">{companyData.vision}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={handshakeIcon} alt="Ethics" className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our Ethics
                </h4>
                <p className="text-gray-600">
                  We pledge to maintain expertise, place clients' needs first,
                  and compete with integrity while fulfilling our commitments to
                  the greatest extent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
          </div>

          <div className="bg-gradient-to-r from-shiv-blue to-shiv-light-blue rounded-2xl p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {companyData.coreValues.map((value, index) => {
                const IconComponent = iconMap[value.icon];
                return (
                  <div key={index} className="text-center">
                    <IconComponent className="h-12 w-12 mx-auto mb-4 text-shiv-accent" />
                    <h5 className="font-bold text-lg mb-2">{value.name}</h5>
                    <p className="text-sm opacity-90">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Company Strengths */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Strengths
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {companyData.strengths.map((strength, index) => (
              <Card key={index} className="text-center p-6 bg-white">
                <CardContent className="pt-6">
                  <CheckCircle className="h-12 w-12 text-shiv-blue mx-auto mb-4" />
                  <p className="text-gray-600 text-sm">{strength}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
