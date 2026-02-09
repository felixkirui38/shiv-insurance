import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Shield, Car, Heart, Building, Briefcase, Globe } from 'lucide-react';

interface DownloadItem {
  title: string;
  description: string;
  icon: typeof FileText;
  category: string;
  fileSize: string;
}

const downloads: DownloadItem[] = [
  {
    title: "Company Profile",
    description: "Learn about Shiv Insurance Brokers Ltd, our history, mission, and services.",
    icon: Building,
    category: "Corporate",
    fileSize: "2.4 MB",
  },
  {
    title: "Motor Insurance Brochure",
    description: "Comprehensive motor insurance coverage options for private and commercial vehicles.",
    icon: Car,
    category: "Motor",
    fileSize: "1.8 MB",
  },
  {
    title: "Health Insurance Guide",
    description: "Overview of medical insurance plans and coverage options available through our partners.",
    icon: Heart,
    category: "Health",
    fileSize: "3.1 MB",
  },
  {
    title: "Property Insurance Brochure",
    description: "Protect your home, business premises, and assets with our property insurance solutions.",
    icon: Shield,
    category: "Property",
    fileSize: "2.0 MB",
  },
  {
    title: "Cyber Insurance Overview",
    description: "Protect your business from cyber threats, data breaches, and ransomware attacks.",
    icon: Globe,
    category: "Cyber",
    fileSize: "1.5 MB",
  },
  {
    title: "Claims Procedure Guide",
    description: "Step-by-step guide on how to file and process insurance claims.",
    icon: FileText,
    category: "Claims",
    fileSize: "1.2 MB",
  },
  {
    title: "Business Insurance Brochure",
    description: "Tailored insurance solutions for businesses across various industries.",
    icon: Briefcase,
    category: "Business",
    fileSize: "2.6 MB",
  },
  {
    title: "Life & Education Policy Guide",
    description: "Secure your family's future with our life insurance and education policies.",
    icon: Heart,
    category: "Life",
    fileSize: "1.9 MB",
  },
];

const Downloads = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shiv-blue to-shiv-light-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Downloads
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Access our brochures, guides, and resources to learn more about our insurance solutions
          </p>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Resources & Documents
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Download our brochures and guides to explore our insurance products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {downloads.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-shiv-blue/10 rounded-lg flex items-center justify-center group-hover:bg-shiv-blue/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-shiv-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-xs font-semibold text-shiv-accent bg-shiv-accent/10 px-2 py-0.5 rounded mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">PDF • {item.fileSize}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-shiv-blue text-shiv-blue hover:bg-shiv-blue hover:text-white transition-colors"
                            onClick={() => {
                              alert("This document will be available for download soon.");
                            }}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Note */}
          <div className="mt-16 text-center">
            <Card className="inline-block bg-shiv-blue/5 border-shiv-blue/20">
              <CardContent className="p-6">
                <p className="text-gray-700">
                  Need a specific document or have questions about our resources?{' '}
                  <a href="/contact" className="text-shiv-blue font-semibold hover:underline">
                    Contact us
                  </a>{' '}
                  and we'll be happy to assist you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;
