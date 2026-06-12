import { companyData } from "@/lib/data";

export interface BuyNowProduct {
  id: string;
  title: string;
  tagline: string;
  description: string[];
  coverageTitle: string;
  coverageItems: string[];
  planItems: string[];
  featured?: boolean;
}

function serviceProducts(category: string): string[] {
  return companyData.services.find((s) => s.category === category)?.products ?? [];
}

const siteInsuranceProducts: BuyNowProduct[] = [
  {
    id: "motor-insurance",
    title: "Motor Insurance",
    tagline: "Cover for private cars, commercial fleets, and PSVs",
    description: [
      "Comprehensive and third-party motor insurance for private vehicles, company fleets, and commercial operators — placed with competitive premiums from trusted Kenyan underwriters.",
      "We handle renewals, valuations, and claims guidance so your vehicles stay protected on Kenyan roads and cross-border routes where applicable.",
    ],
    coverageTitle: "What Motor Insurance Covers",
    coverageItems: [
      "Comprehensive and third-party motor damage",
      "Theft, fire, and accidental damage to your vehicle",
      "Windscreen and accessory cover (plan-dependent)",
      "Fleet and commercial vehicle programmes",
      "PSV and specialist motor risks",
    ],
    planItems: serviceProducts("Motor & Transport").filter(
      (p) => !["Marine Insurance", "Aviation Insurance"].includes(p),
    ),
  },
  {
    id: "property-insurance",
    title: "Property Insurance",
    tagline: "Protect buildings, contents, and business assets",
    description: [
      "Fire, burglary, all-risks, and domestic package policies safeguard homes, offices, warehouses, and equipment against loss or damage.",
      "We assess sums insured correctly — underinsurance is a common gap — and bundle related covers like business interruption where needed.",
    ],
    coverageTitle: "What Property Insurance Covers",
    coverageItems: [
      "Fire and allied perils for buildings and stock",
      "Burglary, theft, and money cover",
      "Domestic package for homes and contents",
      "All-risks for portable equipment",
      "Business interruption after insured damage",
    ],
    planItems: serviceProducts("Property & Assets"),
  },
  {
    id: "medical-insurance",
    title: "Medical Insurance",
    tagline: "Medical cover for you, your family, and your team",
    description: [
      "From inpatient and outpatient care to maternity and critical illness, we compare medical plans from Kenya's leading insurers to match your budget and healthcare needs.",
      "As independent brokers, we are not tied to one insurer — we shortlist options with the right hospitals, limits, and benefits, then help you enroll and manage renewals.",
    ],
    coverageTitle: "What Medical Insurance Covers",
    coverageItems: [
      "Inpatient hospitalisation and surgical procedures",
      "Outpatient consultations, diagnostics, and pharmacy",
      "Maternity, dental, and optical benefits (plan-dependent)",
      "International and regional treatment options",
      "Group schemes for SMEs and corporate teams",
    ],
    planItems: serviceProducts("Health Insurance"),
  },
  {
    id: "life-insurance",
    title: "Life Insurance",
    tagline: "Secure your family's future and financial goals",
    description: [
      "Life assurance and education savings plans protect dependents and fund school or university fees if the unexpected happens — or build disciplined long-term savings.",
      "We explain term vs whole life, group schemes, and education policies in plain language so you choose cover that fits your stage of life and financial plan.",
    ],
    coverageTitle: "What Life Insurance Covers",
    coverageItems: [
      "Death and disability benefits for beneficiaries",
      "Education savings and school-fee protection",
      "Mortgage and credit life linked to loans",
      "Group life schemes for employers",
      "Flexible premium and benefit structures",
    ],
    planItems: serviceProducts("Life & Education"),
  },
  {
    id: "business-insurance",
    title: "Business Insurance",
    tagline: "Commercial cover for operations, people, and liability",
    description: [
      "Public liability, professional indemnity, WIBA, cyber, and directors & officers insurance protect businesses when third parties claim — or when a digital or operational incident threatens your balance sheet.",
      "We match policy wordings to your industry — contractors, clinics, manufacturers, and professional firms each face different exposures. Shiv structures programmes that keep your business running.",
    ],
    coverageTitle: "What Business Insurance Covers",
    coverageItems: [
      "Third-party injury and property damage claims",
      "Professional negligence and indemnity",
      "Employer's liability and WIBA compliance",
      "Cyber incidents, data breach, and business interruption",
      "Directors & officers for governance risks",
    ],
    planItems: [
      ...serviceProducts("Liability Insurance"),
      ...serviceProducts("Cyber Insurance").slice(0, 3),
    ],
  },
  {
    id: "marine-insurance",
    title: "Marine Insurance",
    tagline: "Cargo, hull, and goods in transit on sea and land",
    description: [
      "Marine cargo and hull policies protect goods, freight, and vessels against loss or damage during domestic and international transit.",
      "Whether you import, export, or move stock across East Africa, we place marine cover with appropriate limits, clauses, and documentation for smooth claims handling.",
    ],
    coverageTitle: "What Marine Insurance Covers",
    coverageItems: [
      "Marine cargo all-risks and named perils",
      "Goods in transit by road, rail, air, or sea",
      "Hull and machinery for vessels where applicable",
      "Freight and forwarding liability",
      "War and strikes extensions (where required)",
    ],
    planItems: [
      "Marine Insurance",
      "Goods in Transit",
      "Marine Cargo All Risks",
      "Hull & Machinery",
      "Freight Forwarder Liability",
    ],
  },
];

export const buyNowProducts: BuyNowProduct[] = siteInsuranceProducts;

export function getBuyNowProduct(id: string): BuyNowProduct | undefined {
  return buyNowProducts.find((product) => product.id === id);
}
