export interface SearchEntry {
  id: string;
  title: string;
  url: string;
  keywords: string;
}

/**
 * Site-wide search index. Add pages and keywords so header search can find them.
 * Keywords are matched case-insensitively against the query.
 */
export const searchIndex: SearchEntry[] = [
  {
    id: 'home',
    title: 'Home',
    url: '/',
    keywords: 'home shiv insurance brokers overview mission vision ethics cyber insurance',
  },
  {
    id: 'about',
    title: 'About Us',
    url: '/about',
    keywords: 'about us company background team IRA AIBK licensed broker foundation mission vision',
  },
  {
    id: 'services',
    title: 'Our Services / Insurance Products',
    url: '/services',
    keywords: 'services insurance products motor property health life medical business marine cyber quote inquiry',
  },
  {
    id: 'buy-now',
    title: 'Buy Now',
    url: '/buy-now',
    keywords: 'buy now purchase quote request insurance COMESA yellow card motor health cyber life pension property liability travel cover',
  },
  {
    id: 'downloads',
    title: 'Downloads',
    url: '/downloads',
    keywords: 'downloads brochures forms PDF claim form motor claim windscreen travel burglary fire marine cargo proposal domestic package fidelity guarantee public liability contractors erection all risks',
  },
  {
    id: 'contact',
    title: 'Contact',
    url: '/contact',
    keywords: 'contact us get quote email phone address location',
  },
];

export function searchSite(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return searchIndex.filter((entry) => {
    const titleLower = entry.title.toLowerCase();
    const keywordsLower = entry.keywords.toLowerCase();
    const matchText = `${titleLower} ${keywordsLower}`;
    return terms.every((term) => matchText.includes(term));
  });
}
