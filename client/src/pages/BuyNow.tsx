import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, ChevronRight, Phone, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { BusinessInsuranceQuoteForm } from "@/components/buyNow/BusinessInsuranceQuoteForm";
import { HealthLifeInsuranceQuoteForm } from "@/components/buyNow/HealthLifeInsuranceQuoteForm";
import { MarineInsuranceQuoteForm } from "@/components/buyNow/MarineInsuranceQuoteForm";
import { MotorInsuranceQuoteForm } from "@/components/buyNow/MotorInsuranceQuoteForm";
import { PropertyInsuranceQuoteForm } from "@/components/buyNow/PropertyInsuranceQuoteForm";
import { buyNowProducts } from "@/lib/buyNowProducts";
import { companyData } from "@/lib/data";
import type { FormSubmission } from "@shared/schema";

const DETAILED_FORM_IDS = new Set([
  "motor-insurance",
  "property-insurance",
  "medical-insurance",
  "life-insurance",
  "business-insurance",
  "marine-insurance",
]);

const FORM_NAME = "Buy Now Quote Request";

const BuyNow = () => {
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState(buyNowProducts[0]?.id ?? "");
  const selected = buyNowProducts.find((p) => p.id === selectedId) ?? buyNowProducts[0];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");
    if (product && buyNowProducts.some((p) => p.id === product)) {
      setSelectedId(product);
    }
  }, []);

  const quoteMutation = useMutation({
    mutationFn: async (data: typeof formData & { insuranceType: string }) => {
      const submission: FormSubmission = {
        ...data,
        formName: FORM_NAME,
      };
      const response = await apiRequest("POST", "/api/submit-form", submission);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Quote request received",
        description:
          data.message ||
          "Thank you! Our team will contact you shortly with options and pricing.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    quoteMutation.mutate({
      ...formData,
      insuranceType: selected.title,
    });
  };

  if (!selected) return null;

  const hasDetailedForm = DETAILED_FORM_IDS.has(selectedId);

  const renderDetailedForm = () => {
    switch (selectedId) {
      case "motor-insurance":
        return <MotorInsuranceQuoteForm />;
      case "property-insurance":
        return <PropertyInsuranceQuoteForm />;
      case "medical-insurance":
        return <HealthLifeInsuranceQuoteForm insuranceType="Medical Insurance" />;
      case "life-insurance":
        return <HealthLifeInsuranceQuoteForm insuranceType="Life Insurance" />;
      case "business-insurance":
        return <BusinessInsuranceQuoteForm />;
      case "marine-insurance":
        return <MarineInsuranceQuoteForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <section className="buy-now-hero" data-testid="buy-now-hero">
        <div className="buy-now-hero-overlay" aria-hidden />
        <div className="site-container relative z-10 py-8 md:py-10 lg:py-12">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-shiv-gold">
              Buy Now
            </p>
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              Request a Quote or Purchase Cover
            </h1>
            <p className="buy-now-hero-description mt-3 text-base leading-relaxed sm:text-lg">
              Browse our insurance products, compare what each policy covers, and
              request a personalised quote — or speak to our team to complete your
              purchase.
            </p>
          </div>
        </div>
      </section>

      <section className="site-section bg-shiv-cream-warm">
        <div className="site-container">
          <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(220px,320px)_minmax(0,1fr)] lg:gap-10">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-shiv-text-muted">
                Insurance products
              </p>
              <nav className="flex flex-col gap-2" aria-label="Insurance products">
                {buyNowProducts.map((product) => {
                  const isActive = product.id === selectedId;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedId(product.id)}
                      className={
                        isActive ? "buy-now-nav-item buy-now-nav-item-active" : "buy-now-nav-item"
                      }
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="text-left leading-snug">{product.title}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="min-w-0">
              <article className="buy-now-detail" data-testid="buy-now-detail">
                <p className="text-sm font-medium text-shiv-accent">{selected.tagline}</p>
                <h2 className="mt-2 text-2xl font-bold text-shiv-text sm:text-3xl">
                  {selected.title}
                </h2>

                {hasDetailedForm ? (
                  renderDetailedForm()
                ) : (
                  <>
                    <div className="mt-6 space-y-4 text-shiv-text-muted leading-relaxed">
                      {selected.description.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                      ))}
                    </div>

                    <h3 className="mt-10 text-xl font-bold text-shiv-text">
                      {selected.coverageTitle}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {selected.coverageItems.map((item) => (
                        <li key={item} className="flex gap-3 text-shiv-text-muted">
                          <CheckCircle2
                            className="mt-0.5 h-5 w-5 shrink-0 text-shiv-blue"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="mt-10 text-xl font-bold text-shiv-text">Plans &amp; options</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selected.planItems.map((plan) => (
                        <span
                          key={plan}
                          className="rounded-full border border-shiv-navy/12 bg-white px-3 py-1.5 text-sm text-shiv-text"
                        >
                          {plan}
                        </span>
                      ))}
                    </div>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <a href="#buy-now-quote-form" className="btn-cta gap-2 normal-case tracking-normal">
                        <ShoppingBag className="h-4 w-4" aria-hidden />
                        Request quote for this cover
                      </a>
                      <Link
                        href="/contact"
                        className="btn-cta-outline-dark inline-flex items-center justify-center gap-2 normal-case tracking-normal"
                      >
                        Speak to an advisor
                      </Link>
                      <a
                        href={`tel:${companyData.contactInfo.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center justify-center gap-2 rounded-btn border border-shiv-navy/15 px-5 py-3 text-sm font-semibold text-shiv-navy transition-colors hover:bg-shiv-navy/5"
                      >
                        <Phone className="h-4 w-4" aria-hidden />
                        {companyData.contactInfo.phone}
                      </a>
                    </div>
                  </>
                )}
              </article>

              {!hasDetailedForm && (
                <Card
                  id="buy-now-quote-form"
                  className="theme-card mt-10 border-0 shadow-sm scroll-mt-28"
                >
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-shiv-text">
                      Get a quote — {selected.title}
                    </h3>
                    <p className="mt-2 text-sm text-shiv-text-muted">
                      Complete the form and we will respond within one business day with
                      tailored options and premium indications.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="buy-firstName">First name</Label>
                          <Input
                            id="buy-firstName"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                            }
                            required
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="buy-lastName">Last name</Label>
                          <Input
                            id="buy-lastName"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                            }
                            required
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="buy-email">Email</Label>
                          <Input
                            id="buy-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                            required
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="buy-phone">Phone</Label>
                          <Input
                            id="buy-phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                            required
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="buy-message">Additional details (optional)</Label>
                        <Textarea
                          id="buy-message"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, message: e.target.value }))
                          }
                          placeholder="Vehicle registration, sum insured, travel dates, number of employees, etc."
                          className="mt-2 min-h-[100px]"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="btn-cta w-full sm:w-auto normal-case tracking-normal"
                        disabled={quoteMutation.isPending}
                      >
                        {quoteMutation.isPending ? "Sending…" : "Submit quote request"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyNow;
