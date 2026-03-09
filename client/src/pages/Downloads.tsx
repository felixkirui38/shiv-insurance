import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { FileText, Download, Shield, Car, Heart, Building, Briefcase, Globe } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

interface DownloadItem {
  title: string;
  description: string;
  icon: typeof FileText;
  category: string;
  fileSize: string;
  filePath: string;
}

const downloads: DownloadItem[] = [
  {
    title: "All in one claim form Occidental",
    description: "Occidental Insurance Company Ltd",
    icon: Building,
    category: "Insurance",
    fileSize: "163 KB",
    filePath: "/downloads/All in one claim form Occidental (1).pdf",
  },
  {
    title: "All-Risks-Proposal",
    description: "Mayfair Insurance Company Limited",
    icon: Car,
    category: "Insurance",
    fileSize: "273 KB",
    filePath: "/downloads/All-Risks-Proposal.pdf",
  },
  {
    title: "BURGLARY-BUSINESS-PREMISES-PROPOSAL-FORM",
    description: "Buglary Business Promises.",
    icon: Heart,
    category: "Form",
    fileSize: "441 KB",
    filePath: "/downloads/BURGLARY-BUSINESS-PREMISES-PROPOSAL-FORM GApdf",
  },
  {
    title: "Burglary-Edited-Fillable-Form",
    description: "Burglary-Edited-Fillable-Form.",
    icon: Shield,
    category: "Form",
    fileSize: "151 KB",
    filePath: "/downloads/Burglary-Edited-Fillable-Form",
  },
  {
    title: "CIC-Personal-Accident-Brochure-Proposal-Form",
    description: "CIC-Personal-Accident-Brochure-Proposal.",
    icon: Globe,
    category: "Brochure",
    fileSize: "431  KB",
    filePath: "/downloads/CIC-Personal-Accident-Brochure-Proposal-Form_V.102022 (1)",
  },
  {
    title: "Claim Form English",
    description: "Claim Form.",
    icon: FileText,
    category: "Form",
    fileSize: "1.5 MB",
    filePath: "/downloads/CLAIM FORM ENGLISH_V4",
  },
  {
    title: "Claim Form Property GA Damage or Loss",
    description: "Claim Form Property GA Damage or Loss.",
    icon: Briefcase,
    category: "Form",
    fileSize: "50 KB",
    filePath: "/downloads/CLAIM FORM_PROPERTY  GA DAMAGE OR LOSS",
  },
  {
    title: "Contractors-All-Risks",
    description: "Contractors-All-Risks.",
    icon: Heart,
    category: "Form",
    fileSize: "303 KB",
    filePath: "/downloads/Contractors-All-Risks",
  },
  {
    title: "Domestic-Package",
    description: "Domestic-Package.",
    icon: Heart,
    category: "Form",
    fileSize: "333 KB",
    filePath: "/downloads/Domestic-Package",
  },
  {
    title: "Domestic Package Proposal Form",
    description: "Domestic Package Proposal Form.",
    icon: Heart,
    category: "Form",
    fileSize: "428 KB",
    filePath: "/downloads/DOMESTIC-PACKAGE-PROPOSAL-FORM GA pdf",
  },
  {
    title: "Erection-All-Risks",
    description: "Erection All Risks Form.",
    icon: Heart,
    category: "Form",
    fileSize: "307 KB",
    filePath: "/downloads/Erection-All-Risks",
  },
  {
    title: "Fidelity-Guarantee",
    description: "Fidelity-Guarantee.",
    icon: Heart,
    category: "Form",
    fileSize: "279 KB",
    filePath: "/downloads/Fidelity-Guarantee",
  },
  {
    title: "Fire",
    description: "Fire.",
    icon: Heart,
    category: "Form",
    fileSize: "307 KB",
    filePath: "/downloads/Fire",
  },
  {
    title: "Industrial All Risks Insurance Proposal Form",
    description: "Industrial All Risks Insurance Proposal Form.",
    icon: Heart,
    category: "Form",
    fileSize: "228 KB",
    filePath: "/downloads/INDUSTRIAL ALL RISKS INSURANCE PROPOSAL FORM",
  },
  {
    title: "Marine Cargo Proposal Form Mayfair",
    description: "Marine Cargo Proposal Form Mayfair.",
    icon: Heart,
    category: "Form",
    fileSize: "25 KB",
    filePath: "/downloads/Marine Cargo - Proposal Form Mayfair",
  },
  {
    title: "Mayfair Insurance New Motor Claim Form",
    description: "Mayfair Insurance New Motor Claim Form.",
    icon: Heart,
    category: "Form",
    fileSize: "169 KB",
    filePath: "/downloads/Mayfair Insurance New Motor Claim Form",
  },
  {
    title: "Mayfair New Windscreen Claim Form",
    description: "Mayfair New Windscreen Claim Form.",
    icon: Heart,
    category: "Form",
    fileSize: "625 KB",
    filePath: "/downloads/Mayfair -New Windscreen Claim Form",
  },
  {
    title: "Money Insurance Proposal Form",
    description: "Money Insurance Proposal Form.",
    icon: Heart,
    category: "Form",
    fileSize: "284 KB",
    filePath: "/downloads/MONEY INSURANCE PROPOSAL FORM",
  },
  {
    title: "Motor Accident Claim Form",
    description: "Motor Accident Claim Form.",
    icon: Heart,
    category: "Form",
    fileSize: "132 KB",
    filePath: "/downloads/MOTOR ACCIDENT CLAIM FORM - NEW GA",
  },
  {
    title: "Motor Claim Form OCCIDENTAL",
    description: "Motor Claim Form Occidental.",
    icon: Heart,
    category: "Form",
    fileSize: "181 KB",
    filePath: "/downloads/Motor Claim Form OCCIDENTAL (3)",
  },
  {
    title: "Motor-Commercial",
    description: "Motor-Commercial.",
    icon: Heart,
    category: "Form",
    fileSize: "181 KB",
    filePath: "/downloads/Motor-Commercial",
  },
  {
    title: "Motor-Private proposal form Mayfair",
    description: "Motor-Private proposal form Mayfair.",
    icon: Heart,
    category: "Form",
    fileSize: "362 KB",
    filePath: "/downloads/Motor-Private proposal form Mayfair",
  },
  {
    title: "Motor-Private proposal form Mayfair",
    description: "Motor-Private proposal form Mayfair.",
    icon: Heart,
    category: "Form",
    fileSize: "362 KB",
    filePath: "/downloads/Motor-Private proposal form Mayfair",
  },
  {
    title: "Motor-Private",
    description: "Motor-Private.",
    icon: Heart,
    category: "Form",
    fileSize: "362 KB",
    filePath: "/downloads/Motor-Private",
  }, 
  {
    title: "New Motor Claim OCC Form",
    description: "New Motor Claim OCC Form.",
    icon: Heart,
    category: "Form",
    fileSize: "162 KB",
    filePath: "/downloads/NEW MOTOR CLAIM OCC FORM (A4)",
  },
  {
    title: "PI Proposal Form",
    description: "PI Proposal Form.",
    icon: Heart,
    category: "Form",
    fileSize: "60 KB",
    filePath: "/downloads/PI PROPOSAL FORM",
  },
  {
    title: "Political Violence Insurance Proposal Form",
    description: "Political Violence Insurance Proposal Form.",
    icon: Heart,
    category: "Form",
    fileSize: "60 KB",
    filePath: "/downloads/POLITICAL-VIOLENCE-INSURANCE-PROPOSAL-FORM.",
  },
  {
    title: "Public-Liability",
    description: "Public-Liability.",
    icon: Heart,
    category: "Form",
    fileSize: "272 KB",
    filePath: "/downloads/Public-Liability.",
  },
  {
    title: "Tausi Motor Vehicle Claim Form",
    description: "Tausi Motor Vehicle.",
    icon: Heart,
    category: "Form",
    fileSize: "244 KB",
    filePath: "/downloads/TAUSI MOTOR VEHICLE CLAIM FORM.",
  },
  {
    title: "Tausi Windscreen Window Claim Form",
    description: "Tausi Windscreen Window Claim Form.",
    icon: Heart,
    category: "Form",
    fileSize: "244 KB",
    filePath: "/downloads/TAUSI WINDSCREEN  WINDOW CLAIM FORM.",
  },
  {
    title: "Travel Claim Form",
    description: "Travel Claim Form.",
    icon: Heart,
    category: "Form",
    fileSize: "244 KB",
    filePath: "/downloads/TRAVEL _CLAIM FORM.",
  },
  {
    title: "Windscreen Claim Form",
    description: "Windscreen Claim Form.",
    icon: Heart,
    category: "Form",
    fileSize: "244 KB",
    filePath: "/downloads/Windscreen Claim Form GA.",
  },
];

const Downloads = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(downloads.length / ITEMS_PER_PAGE);
  const paginatedDownloads = downloads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            {paginatedDownloads.map((item, index) => {
              const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
              const IconComponent = item.icon;
              return (
                <Card key={globalIndex} className="bg-white hover:shadow-lg transition-shadow duration-300 group">
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
                            asChild
                          >
                            <a href={item.filePath} download target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage((p) => p - 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={
                        currentPage <= 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
                      }}
                      className={
                        currentPage >= totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

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
