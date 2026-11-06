import { ServiceItem } from '../types';

export type ActivePage =
  | 'home'
  | 'about'
  | 'tax-calculator'
  | 'compliance-calendar'
  | 'diagnostic'
  | 'testimonials'
  | 'faq'
  | 'contact';

export const PREFERRED_SITE_URL = 'https://www.sajidtaxconsultant.online';
export const DEFAULT_IMAGE = '/assets/images/hero_financial_advisory_1792759874948.webp';

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
}

const PAGE_SEO_CONFIGS: Record<ActivePage, PageSEOConfig> = {
  home: {
    title: 'Sajid Tax Consultant | Best Tax Consultant | Accounting Firm | CA Work',
    description:
      'Professional Income Tax Return (ITR) filing, GST registration & returns, Private Limited & LLP company registration, ROC compliance, and bookkeeping services in Opera House, Mumbai. Call +91 77620 67143.',
    keywords:
      'Sajid Tax Consultant, Tax Consultant Mumbai, Income Tax Return Filing Mumbai, ITR Filing Opera House, GST Registration Mumbai, GST Return Filing, Company Registration Mumbai, Private Limited Registration, LLP Registration, ROC Compliance Mumbai, Udyam Registration, Mumbai Gumasta License, Accounting Bookkeeping, TDS Filing, FSSAI Registration Mumbai, DSC Digital Signature, Trademark Registration, Import Export Code IEC, CA firm Mumbai, Tax advisor South Mumbai',
    canonicalPath: '/',
  },
  'tax-calculator': {
    title: 'Old vs New Tax Regime Calculator FY 2024-25 (AY 2025-26) | Sajid Tax Consultant',
    description:
      'Compare Income Tax liability under Old vs New Tax Regime for FY 2024-25 (AY 2025-26). Calculate standard deduction, HRA, 80C, 80D tax savings instantly.',
    keywords:
      'Income tax calculator FY 2024-25, Old vs New tax regime calculator, AY 2025-26 tax calculator, salary tax calculator India, tax calculation Mumbai, tax regime comparison',
    canonicalPath: '/#tax-calculator',
  },
  'compliance-calendar': {
    title: 'Tax Compliance Calendar 2025-26 - GST, ITR & TDS Due Dates | Sajid Tax Consultant',
    description:
      'Never miss a statutory tax due date. Complete Indian compliance calendar for GST (GSTR-1, 3B), Advance Tax, TDS, ROC Annual Returns, and ITR deadlines in Mumbai.',
    keywords:
      'Tax compliance calendar 2025, GST return due dates, Advance tax due date, TDS payment due date, ITR filing deadline, MCA compliance due dates, tax calendar India',
    canonicalPath: '/#compliance-calendar',
  },
  about: {
    title: 'About Us | Sajid Tax Consultant - Tax & Legal Advisory Practice Mumbai',
    description:
      'Learn about Sajid Tax Consultant, a premier tax, corporate advisory & statutory compliance practice based in Opera House, Mumbai. Trusted by 500+ clients across Maharashtra.',
    keywords:
      'About Sajid Tax Consultant, tax firm Mumbai, CA practice Opera House, corporate advisory Mumbai, tax consultant profile, tax consultancy history',
    canonicalPath: '/#about',
  },
  diagnostic: {
    title: 'Business Tax & Statutory Diagnostic Tool | Sajid Tax Consultant Mumbai',
    description:
      'Assess your business tax compliance, licensing obligations, and potential savings with Sajid Tax Consultant\'s interactive statutory diagnostic advisor.',
    keywords:
      'tax health check, business tax diagnostic, tax planner Mumbai, statutory audit checklist, corporate tax review',
    canonicalPath: '/#diagnostic',
  },
  testimonials: {
    title: 'Client Success Stories & Reviews | Sajid Tax Consultant Mumbai',
    description:
      'Read genuine reviews and success stories from entrepreneurs, traders, salaried professionals, and MSMEs across Mumbai who trust Sajid Tax Consultant.',
    keywords:
      'Sajid Tax Consultant reviews, client testimonials, best tax consultant Mumbai reviews, rating CA Opera House, client satisfaction',
    canonicalPath: '/#testimonials',
  },
  faq: {
    title: 'Tax, GST & Company Registration FAQs | Sajid Tax Consultant Mumbai',
    description:
      'Frequently asked questions about Income Tax filing, GST registration, MCA corporate compliance, Gumasta licenses, and statutory due dates in India.',
    keywords:
      'income tax FAQ, GST FAQ, company registration questions, Mumbai Gumasta license questions, tax help India',
    canonicalPath: '/#faq',
  },
  contact: {
    title: 'Contact Sajid Tax Consultant | Opera House, South Mumbai Office',
    description:
      'Get in touch with Sajid Tax Consultant. Office No. 114A, 2nd Floor, Paras Juice Building, Tata Road No. 2, Opera House, Mumbai 400004. Call +91 77620 67143.',
    keywords:
      'contact Sajid Tax Consultant, tax consultant Opera House Mumbai phone number, CA office address Mumbai, tax consultation appointment',
    canonicalPath: '/#contact',
  },
};

function setMetaTag(name: string, content: string, isProperty = false) {
  const attribute = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonicalUrl(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function setStructuredData(data: Record<string, any> | null) {
  const SCRIPT_ID = 'service-json-ld';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (!data) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Updates dynamic SEO meta tags, OpenGraph images, canonical links, and JSON-LD structured data
 * when inspecting individual service pages or navigating between application views.
 */
export function updatePageSEO(service: ServiceItem | null, activePage: ActivePage = 'home') {
  if (service) {
    const title = service.seoTitle || `${service.title} | Sajid Tax Consultant`;
    const description = service.metaDescription || service.description;
    const fullImageUrl = service.ogImage.startsWith('http')
      ? service.ogImage
      : `${PREFERRED_SITE_URL}${service.ogImage}`;
    const pageUrl = `${PREFERRED_SITE_URL}/#/service/${service.id}`;

    // Update document title & primary meta
    document.title = title;
    setMetaTag('title', title);
    setMetaTag('description', description);
    setMetaTag('keywords', service.keywords.join(', '));
    setCanonicalUrl(pageUrl);

    // OpenGraph Meta
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', fullImageUrl, true);
    setMetaTag('og:image:secure_url', fullImageUrl, true);
    setMetaTag('og:url', pageUrl, true);
    setMetaTag('og:type', 'article', true);
    setMetaTag('og:site_name', 'Sajid Tax Consultant', true);

    // Twitter Meta
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', fullImageUrl);

    // Service-Specific Schema.org Structured Data
    setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      serviceType: service.title,
      description: service.description,
      provider: {
        '@type': 'ProfessionalService',
        name: 'Sajid Tax Consultant',
        telephone: '+91-77620-67143',
        email: 'workwithsajid@zohomail.in',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Office No. 114A, 2nd Floor, Paras Juice Building, Tata Road No. 2, Near Prasad Chamber, Opera House',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          postalCode: '400004',
          addressCountry: 'IN',
        },
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Mumbai, Maharashtra, India',
      },
      image: fullImageUrl,
      url: pageUrl,
    });
  } else {
    // Handle Page-Level SEO
    const pageConfig = PAGE_SEO_CONFIGS[activePage] || PAGE_SEO_CONFIGS.home;
    const pageUrl = `${PREFERRED_SITE_URL}${pageConfig.canonicalPath}`;
    const defaultImageUrl = `${PREFERRED_SITE_URL}${DEFAULT_IMAGE}`;

    // Update document title & primary meta
    document.title = pageConfig.title;
    setMetaTag('title', pageConfig.title);
    setMetaTag('description', pageConfig.description);
    setMetaTag('keywords', pageConfig.keywords);
    setCanonicalUrl(pageUrl);

    // OpenGraph
    setMetaTag('og:title', pageConfig.title, true);
    setMetaTag('og:description', pageConfig.description, true);
    setMetaTag('og:image', defaultImageUrl, true);
    setMetaTag('og:image:secure_url', defaultImageUrl, true);
    setMetaTag('og:url', pageUrl, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'Sajid Tax Consultant', true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', pageConfig.title);
    setMetaTag('twitter:description', pageConfig.description);
    setMetaTag('twitter:image', defaultImageUrl);

    // Remove temporary service JSON-LD script so homepage structured data takes precedence
    setStructuredData(null);
  }
}
