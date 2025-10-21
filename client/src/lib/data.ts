interface MedicalInsuranceProvider {
  name: string;
  logo: string;
  specialization: string;
}

interface UnderwritingPartner {
  name: string;
  logo: string;
}

export const companyData = {
  mission: "To provide professional insurance brokerage services to all our clients and to advice and recommend suitable insurance products as well as continuously evaluate our client's needs with a view of improvement, thereby providing them not only with peace of mind but also optimum value for money, security & protection of assets.",
  
  vision: "To be one of the market leader in providing world class insurance brokerage services in this region and beyond.",
  
  background: "Before becoming Shiv Insurance Brokers Ltd, we operated as an agency under the name Shiv Agencies Limited, which initially started as a sole proprietorship.",
  
  strengths: [
    "Competent and educated staff",
    "Long service to our clients with total commitment",
    "Professional and personalized services with a dedicated team",
    "Customized products to match client requirements",
    "Regular evaluation of clients insurance needs with a view of continuous improvement"
  ],
  
  coreValues: [
    {
      name: "Integrity",
      description: "We strive to earn and maintain trust, by continually acting in our clients' best interests. Each and every transaction conducted by our organization is done in a professional manner, placing our integrity above all else.",
      icon: "shield-alt"
    },
    {
      name: "Objectives",
      description: "We strive to communicate clearly our ambitious objectives and our people's personal and team objectives. We evaluate performance against all these objectives.",
      icon: "target"
    },
    {
      name: "Excellence",
      description: "We strive constantly to improve in order to meet and exceed the highest expectations of our customers, shareholders and people.",
      icon: "star"
    },
    {
      name: "Innovation",
      description: "We consistently seek to develop creative methods of transferring risks, communicating information to better help our clients manage risks.",
      icon: "lightbulb"
    },
    {
      name: "Intensity",
      description: "We may not have all the answers initially, but we are totally, unconditionally committed to finding them.",
      icon: "bolt"
    }
  ],
  
  team: [
    {
      name: "Mr. Swapnil S. Trivedy",
      position: "Chief Executive Officer",
      qualification: "BBM and MBA from UK",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    }
  ],
  
  services: [
    {
      category: "Health Insurance",
      icon: "heartbeat",
      color: "shiv-blue",
      featured: true,
      products: [
        "Individual & Family Medical Cover",
        "Group Medical Insurance",
        "International Health Insurance",
        "Inpatient & Outpatient Cover",
        "Maternity & Dental Cover",
        "Critical Illness Cover"
      ]
    },
    {
      category: "Cyber Insurance",
      icon: "shield-check",
      color: "shiv-accent",
      featured: true,
      products: [
        "Data Breach Protection",
        "Ransomware Coverage",
        "Cyber Extortion Insurance",
        "Network Security Liability",
        "Crisis Management & PR",
        "Business Interruption Coverage"
      ]
    },
    {
      category: "Life & Education",
      icon: "users",
      color: "shiv-light-blue",
      products: [
        "Term Life Assurance",
        "Whole Life Insurance",
        "Education Savings Plans",
        "Group Life Assurance",
        "Mortgage Protection",
        "Credit Life Insurance"
      ]
    },
    {
      category: "Pension & Retirement",
      icon: "trending-up",
      color: "kenya-brown",
      products: [
        "Personal Pension Plans",
        "Umbrella Pension Schemes",
        "Retirement Annuities",
        "Investment Funds",
        "Provident Funds"
      ]
    },
    {
      category: "Motor & Transport",
      icon: "truck",
      color: "shiv-blue",
      products: [
        "Comprehensive Motor Insurance",
        "Third Party Cover",
        "Goods in Transit",
        "Marine Insurance",
        "Aviation Insurance",
        "Fleet Management"
      ]
    },
    {
      category: "Property & Assets",
      icon: "home",
      color: "shiv-accent",
      products: [
        "Fire & Allied Perils",
        "Domestic Package Policy",
        "Burglary & Theft",
        "All Risks Insurance",
        "Business Interruption",
        "Contractors All Risks"
      ]
    },
    {
      category: "Liability Insurance",
      icon: "balance-scale",
      color: "shiv-light-blue",
      products: [
        "Public Liability",
        "Professional Indemnity",
        "Employer's Liability",
        "WIBA",
        "Product Liability",
        "Directors & Officers Insurance"
      ]
    },
    {
      category: "Engineering & Technical",
      icon: "cogs",
      color: "kenya-brown",
      products: [
        "Machinery Breakdown",
        "Contractors Plant & Machinery",
        "Erection All Risks",
        "Electronic Equipment",
        "Computer & Technology Insurance"
      ]
    },
    {
      category: "Personal & Travel",
      icon: "user-shield",
      color: "shiv-accent-light",
      products: [
        "Personal Accident",
        "Travel Insurance",
        "Domestic Package",
        "Student Insurance",
        "Golfers Insurance",
        "Pet Insurance"
      ]
    }
  ],
  
  clientIndustries: [
    "Wood Manufacturing Industry",
    "Hospitality Industry (Restaurants and Hotels)",
    "Motor Industry",
    "Horticulture Industry",
    "Chemical Industry",
    "Packaging Industry",
    "Real Estate (Contractors, Buildings, etc.)",
    "Financial Services",
    "Healthcare & Pharmaceuticals",
    "Technology & IT Services",
    "Education Institutions",
    "Agriculture & Agribusiness",
    "Mining & Energy",
    "Transportation & Logistics",
    "Retail & Wholesale Trade"
  ],
  
  underwritingPartners: [
    {
      name: "ASUS",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/LCI-ASUS.png"
    },
    {
      name: "dentsu",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/LCI-dentsu.png"
    },
    {
      name: "DNO",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/LCI-DNO.png"
    },
    {
      name: "Dubai Offshore Sailing Club",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/LCI-dubai.png"
    },
    {
      name: "Hapag-Lloyd",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/LCI-Hapag-lloyd.png"
    }
  ] satisfies UnderwritingPartner[],
  
  medicalInsuranceProviders: [
    {
      name: "Allianz",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/03/Logos-04.png",
      specialization: "Global Health Insurance"
    },
    {
      name: "Bupa",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/03/Logos-03.png",
      specialization: "International Health Plans"
    },
    {
      name: "Cigna",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/03/Logos-02.png",
      specialization: "Comprehensive Medical Coverage"
    },
    {
      name: "AXA",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/Logos-01-01-2.png",
      specialization: "Premium Health Solutions"
    },
    {
      name: "AIG",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/logo-6-AIG.png",
      specialization: "Executive Medical Plans"
    },
    {
      name: "Integra Global",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/Logos-7.png",
      specialization: "International Medical Insurance"
    },
    {
      name: "GIG",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/Logos-8.png",
      specialization: "Gulf Medical Coverage"
    },
    {
      name: "NOW Health International",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/03/Logos-01.png",
      specialization: "Global Health Insurance"
    },
    {
      name: "Expacare",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/Logos-10.png",
      specialization: "Expatriate Health Plans"
    },
    {
      name: "Sukoon",
      logo: "https://www.lifecareinternational.com/wp-content/uploads/2025/04/Logos-9.png",
      specialization: "Regional Medical Insurance"
    }
  ] satisfies MedicalInsuranceProvider[],
  
  galleryImages: [
    {
      url: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Nairobi Skyline",
      description: "Modern business hub of East Africa"
    },
    {
      url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Mount Kenya",
      description: "Majestic peak of our homeland"
    },
    {
      url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Kenyan Savanna",
      description: "Iconic acacia landscape"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Local Markets",
      description: "Vibrant cultural heritage"
    },
    {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Coastal Beauty",
      description: "Indian Ocean coastline"
    },
    {
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Rural Communities",
      description: "Heart of Kenya"
    }
  ]
};
