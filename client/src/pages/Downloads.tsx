import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { Download } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { companyData } from '@/lib/data';
import { PageCta } from '@/components/PageCta';
import { getDownloadIcon } from '@/lib/downloadIcons';

const ITEMS_PER_PAGE = 9;

interface PublicDownload {
  id: string;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  filePath: string;
  icon: string;
  sortOrder: number;
}

async function fetchPublicDownloads(): Promise<PublicDownload[]> {
  const res = await fetch('/api/content/downloads');
  if (!res.ok) throw new Error('Failed to load downloads');
  const data = await res.json();
  return data.downloads ?? [];
}

const Downloads = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: downloads = [], isLoading } = useQuery({
    queryKey: ['/api/content/downloads'],
    queryFn: fetchPublicDownloads,
  });

  const totalPages = Math.ceil(downloads.length / ITEMS_PER_PAGE);
  const paginatedDownloads = downloads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <PageHero
        title="Downloads"
        subtitle="Access our brochures, guides, and resources to learn more about our insurance solutions"
      />

      <section className="site-section bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {companyData.downloadCategories.map((cat, index) => (
              <div key={cat.title} className="theme-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-shiv-gold/15 text-shiv-gold font-bold">
                  {index + 1}
                </div>
                <h3 className="font-bold text-shiv-text mb-2">{cat.title}</h3>
                <p className="text-sm text-shiv-text-muted">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section site-section-cream-warm">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">Resources & Documents</h2>
            <p className="mt-4 section-subheading">
              Download our brochures and guides to explore our insurance products
            </p>
          </div>

          {isLoading ? (
            <p className="text-center text-shiv-text-muted py-12">Loading documents…</p>
          ) : downloads.length === 0 ? (
            <p className="text-center text-shiv-text-muted py-12">
              No documents available at the moment. Please check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedDownloads.map((item) => {
                const IconComponent = getDownloadIcon(item.icon);
                return (
                  <Card key={item.id} className="service-card group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-shiv-gold/10 rounded-lg flex items-center justify-center group-hover:bg-shiv-gold/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-shiv-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="inline-block text-xs font-semibold text-shiv-accent bg-shiv-accent/10 px-2 py-0.5 rounded mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-lg font-bold text-shiv-text mb-2">{item.title}</h3>
                          <p className="text-sm text-shiv-text-muted mb-4">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-shiv-text-muted">
                              PDF{item.fileSize ? ` • ${item.fileSize}` : ''}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-shiv-gold text-shiv-gold hover:bg-shiv-gold hover:text-shiv-navy-deep transition-colors"
                              asChild
                            >
                              <a
                                href={item.filePath}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                              >
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
          )}

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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                  ))}
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

          <div className="mt-16 text-center">
            <Card className="inline-block bg-shiv-gold/10 border-shiv-gold/25">
              <CardContent className="p-6">
                <p className="text-shiv-text-muted">
                  Need a specific document or have questions about our resources?{' '}
                  <a href="/contact" className="text-shiv-gold font-semibold hover:underline">
                    Contact us
                  </a>{' '}
                  and we&apos;ll be happy to assist you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PageCta
        title="Can't find the document you need?"
        description="Contact Shiv Insurance Brokers Ltd and we'll send the right form or brochure for your policy."
        primaryLabel="Contact us"
        primaryHref="/contact"
      />
    </div>
  );
};

export default Downloads;
