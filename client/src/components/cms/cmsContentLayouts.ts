export interface CmsLayoutElement {
  id: string;
  label: string;
  category: CmsElementCategory;
  html: string;
}

export const cmsElementCategories = [
  { key: "layout", label: "Layout" },
  { key: "content", label: "Content" },
  { key: "media", label: "Media" },
  { key: "components", label: "Components" },
] as const;

export type CmsElementCategory = (typeof cmsElementCategories)[number]["key"];

export const cmsLayoutElements: CmsLayoutElement[] = [
  // —— Layout ——
  {
    id: "section",
    category: "layout",
    label: "Section (Full Width)",
    html: `<section class="cms-section">\n  <p>Full-width section content goes here.</p>\n</section>`,
  },
  {
    id: "container",
    category: "layout",
    label: "Container (Centered)",
    html: `<div class="cms-container">\n  <p>Centered container content goes here.</p>\n</div>`,
  },
  {
    id: "grid-1",
    category: "layout",
    label: "1-Column Grid",
    html: `<div class="cms-grid cms-grid-1">\n  <div class="cms-col"><p>Column 1</p></div>\n</div>`,
  },
  {
    id: "grid-2",
    category: "layout",
    label: "2-Column Grid",
    html: `<div class="cms-grid cms-grid-2">\n  <div class="cms-col"><p>Column 1</p></div>\n  <div class="cms-col"><p>Column 2</p></div>\n</div>`,
  },
  {
    id: "grid-3",
    category: "layout",
    label: "3-Column Grid",
    html: `<div class="cms-grid cms-grid-3">\n  <div class="cms-col"><p>Column 1</p></div>\n  <div class="cms-col"><p>Column 2</p></div>\n  <div class="cms-col"><p>Column 3</p></div>\n</div>`,
  },
  {
    id: "grid-4",
    category: "layout",
    label: "4-Column Grid",
    html: `<div class="cms-grid cms-grid-4">\n  <div class="cms-col"><p>Column 1</p></div>\n  <div class="cms-col"><p>Column 2</p></div>\n  <div class="cms-col"><p>Column 3</p></div>\n  <div class="cms-col"><p>Column 4</p></div>\n</div>`,
  },
  {
    id: "hero",
    category: "layout",
    label: "Hero Banner",
    html: `<section class="cms-hero">\n  <div class="cms-container">\n    <p class="cms-eyebrow">Insurance Brokers</p>\n    <h2>Your headline goes here</h2>\n    <p class="cms-lead">Supporting text for your page hero section.</p>\n    <a href="/contact" class="cms-btn">Get a Free Quote</a>\n  </div>\n</section>`,
  },
  {
    id: "split",
    category: "layout",
    label: "Split Section (Image + Text)",
    html: `<section class="cms-split">\n  <div class="cms-split-media">\n    <img src="" alt="Section image" class="cms-image" />\n  </div>\n  <div class="cms-split-content">\n    <h3>Section heading</h3>\n    <p>Describe your insurance product or service here.</p>\n    <a href="/contact" class="cms-btn cms-btn-outline">Learn more</a>\n  </div>\n</section>`,
  },
  {
    id: "sidebar",
    category: "layout",
    label: "Sidebar Layout",
    html: `<div class="cms-sidebar-layout">\n  <main class="cms-sidebar-main">\n    <h3>Main content</h3>\n    <p>Primary page content goes here.</p>\n  </main>\n  <aside class="cms-sidebar-aside">\n    <h4>Sidebar</h4>\n    <p>Related links or quick facts.</p>\n  </aside>\n</div>`,
  },
  {
    id: "spacer",
    category: "layout",
    label: "Spacer",
    html: `<div class="cms-spacer" aria-hidden="true"></div>`,
  },
  {
    id: "divider",
    category: "layout",
    label: "Divider",
    html: `<hr class="cms-divider" />`,
  },

  // —— Content ——
  {
    id: "heading-block",
    category: "content",
    label: "Heading + Intro",
    html: `<div class="cms-heading-block">\n  <h2>Section title</h2>\n  <p class="cms-lead">A short introduction paragraph for this section.</p>\n</div>`,
  },
  {
    id: "text-block",
    category: "content",
    label: "Text Block",
    html: `<div class="cms-text-block">\n  <p>Write your paragraph content here. Explain coverage, benefits, or policy details clearly for your clients.</p>\n</div>`,
  },
  {
    id: "quote",
    category: "content",
    label: "Blockquote",
    html: `<blockquote class="cms-quote">\n  <p>&ldquo;A trusted quote or client testimonial goes here.&rdquo;</p>\n  <cite>— Client name, Company</cite>\n</blockquote>`,
  },
  {
    id: "feature-list",
    category: "content",
    label: "Feature List",
    html: `<ul class="cms-feature-list">\n  <li><strong>Comprehensive cover</strong> — Protection tailored to your risks.</li>\n  <li><strong>Claims support</strong> — We advocate for you with insurers.</li>\n  <li><strong>Competitive premiums</strong> — Independent advice from top underwriters.</li>\n</ul>`,
  },
  {
    id: "checklist",
    category: "content",
    label: "Checklist",
    html: `<ul class="cms-checklist">\n  <li>First item to verify or include</li>\n  <li>Second item to verify or include</li>\n  <li>Third item to verify or include</li>\n</ul>`,
  },
  {
    id: "faq",
    category: "content",
    label: "FAQ Block",
    html: `<div class="cms-faq">\n  <details class="cms-faq-item">\n    <summary>What does this policy cover?</summary>\n    <p>Answer your most common client question here.</p>\n  </details>\n  <details class="cms-faq-item">\n    <summary>How do I make a claim?</summary>\n    <p>Explain the claims process step by step.</p>\n  </details>\n  <details class="cms-faq-item">\n    <summary>How quickly can I get a quote?</summary>\n    <p>Most quotes are returned within 24 hours.</p>\n  </details>\n</div>`,
  },
  {
    id: "table",
    category: "content",
    label: "Data Table",
    html: `<div class="cms-table-wrap">\n  <table class="cms-table">\n    <thead>\n      <tr><th>Cover type</th><th>Limit</th><th>Notes</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Motor comprehensive</td><td>KES —</td><td>Details here</td></tr>\n      <tr><td>Third party</td><td>KES —</td><td>Details here</td></tr>\n    </tbody>\n  </table>\n</div>`,
  },

  // —— Media ——
  {
    id: "image-figure",
    category: "media",
    label: "Image with Caption",
    html: `<figure class="cms-figure">\n  <img src="" alt="Descriptive alt text" class="cms-image" />\n  <figcaption>Image caption goes here.</figcaption>\n</figure>`,
  },
  {
    id: "image-gallery",
    category: "media",
    label: "Image Gallery (3)",
    html: `<div class="cms-gallery cms-grid cms-grid-3">\n  <figure class="cms-col"><img src="" alt="" class="cms-image" /></figure>\n  <figure class="cms-col"><img src="" alt="" class="cms-image" /></figure>\n  <figure class="cms-col"><img src="" alt="" class="cms-image" /></figure>\n</div>`,
  },
  {
    id: "video",
    category: "media",
    label: "Video Embed",
    html: `<div class="cms-video">\n  <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Video" allowfullscreen loading="lazy"></iframe>\n</div>`,
  },
  {
    id: "icon-row",
    category: "media",
    label: "Logo / Partner Row",
    html: `<div class="cms-logo-row">\n  <img src="" alt="Partner 1" />\n  <img src="" alt="Partner 2" />\n  <img src="" alt="Partner 3" />\n  <img src="" alt="Partner 4" />\n</div>`,
  },

  // —— Components ——
  {
    id: "cta-band",
    category: "components",
    label: "CTA Band",
    html: `<section class="cms-cta-band">\n  <div class="cms-container cms-cta-inner">\n    <h3>Ready to get covered?</h3>\n    <p>Speak to our brokers for a tailored quote within 24 hours.</p>\n    <a href="/contact" class="cms-btn">Contact Us</a>\n  </div>\n</section>`,
  },
  {
    id: "button",
    category: "components",
    label: "Button",
    html: `<a href="/contact" class="cms-btn">Button label</a>`,
  },
  {
    id: "card",
    category: "components",
    label: "Content Card",
    html: `<div class="cms-card">\n  <h4>Card title</h4>\n  <p>Short description for this card content block.</p>\n  <a href="#" class="cms-link">Read more</a>\n</div>`,
  },
  {
    id: "feature-cards",
    category: "components",
    label: "Feature Cards (3)",
    html: `<div class="cms-grid cms-grid-3 cms-feature-cards">\n  <div class="cms-card cms-col">\n    <h4>Motor Insurance</h4>\n    <p>Comprehensive and third-party cover for private and commercial vehicles.</p>\n  </div>\n  <div class="cms-card cms-col">\n    <h4>Medical Insurance</h4>\n    <p>Individual and group medical plans from Kenya&rsquo;s leading insurers.</p>\n  </div>\n  <div class="cms-card cms-col">\n    <h4>Property Insurance</h4>\n    <p>Protect buildings, contents, and business assets against loss and damage.</p>\n  </div>\n</div>`,
  },
  {
    id: "stats",
    category: "components",
    label: "Stats Row",
    html: `<div class="cms-stats">\n  <div class="cms-stat">\n    <span class="cms-stat-value">28+</span>\n    <span class="cms-stat-label">Years of experience</span>\n  </div>\n  <div class="cms-stat">\n    <span class="cms-stat-value">34+</span>\n    <span class="cms-stat-label">Insurance products</span>\n  </div>\n  <div class="cms-stat">\n    <span class="cms-stat-value">15+</span>\n    <span class="cms-stat-label">Partner insurers</span>\n  </div>\n</div>`,
  },
  {
    id: "testimonial",
    category: "components",
    label: "Testimonial Card",
    html: `<div class="cms-testimonial">\n  <p class="cms-testimonial-text">&ldquo;Shiv Insurance made our renewal simple and found us better cover at a fair premium.&rdquo;</p>\n  <p class="cms-testimonial-author"><strong>Client name</strong> — Industry / Location</p>\n</div>`,
  },
  {
    id: "team-card",
    category: "components",
    label: "Team Member Card",
    html: `<div class="cms-team-card">\n  <img src="" alt="Team member" class="cms-team-photo" />\n  <h4>Name Surname</h4>\n  <p class="cms-team-role">Job title</p>\n  <p class="cms-team-bio">Short professional bio.</p>\n</div>`,
  },
  {
    id: "contact-block",
    category: "components",
    label: "Contact Info Block",
    html: `<div class="cms-contact-block">\n  <h4>Get in touch</h4>\n  <p><strong>Phone:</strong> <a href="tel:+254000000000">+254 000 000 000</a></p>\n  <p><strong>Email:</strong> <a href="mailto:info@shivinsurance.co.ke">info@shivinsurance.co.ke</a></p>\n  <p><strong>Office:</strong> Nairobi, Kenya</p>\n</div>`,
  },
  {
    id: "alert",
    category: "components",
    label: "Notice / Alert Box",
    html: `<div class="cms-alert cms-alert-info">\n  <strong>Important:</strong> Key policy information or disclaimer for your clients.\n</div>`,
  },
  {
    id: "pricing",
    category: "components",
    label: "Pricing Card",
    html: `<div class="cms-pricing-card">\n  <h4>Plan name</h4>\n  <p class="cms-pricing-price">From KES —/month</p>\n  <ul class="cms-checklist">\n    <li>Benefit one</li>\n    <li>Benefit two</li>\n    <li>Benefit three</li>\n  </ul>\n  <a href="/contact" class="cms-btn">Request quote</a>\n</div>`,
  },
];

export function getCmsElementsByCategory(category: CmsElementCategory) {
  return cmsLayoutElements.filter((el) => el.category === category);
}
