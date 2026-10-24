import { ServiceItem } from '../types';

const DEFAULT_TITLE = 'Sajid Tax Consultant - Best Tax Consultant in Mumbai & India';
const DEFAULT_DESCRIPTION =
  'Professional Income Tax Return (ITR) filing, GST registration & returns, Private Limited & LLP company registration, ROC compliance, and bookkeeping services in Opera House, Mumbai. Accurate statutory compliance.';
const DEFAULT_IMAGE = '/src/assets/images/hero_financial_advisory_1792759874948.jpg';
const DEFAULT_KEYWORDS =
  'Sajid Tax Consultant, Tax Consultant Mumbai, Income Tax Return Filing Mumbai, ITR Filing Opera House, GST Registration Mumbai, GST Return Filing, Company Registration Mumbai, Private Limited Registration, LLP Registration, ROC Compliance Mumbai, Udyam Registration, Mumbai Gumasta License, Accounting Bookkeeping, TDS Filing, FSSAI Registration Mumbai, DSC Digital Signature, Trademark Registration, Import Export Code IEC';

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
 * Updates dynamic SEO meta tags, OpenGraph images, and JSON-LD structured data
 * when inspecting individual service pages.
 */
export function updatePageSEO(service: ServiceItem | null) {
  const origin = window.location.origin;

  if (service) {
    const title = service.seoTitle || `${service.title} | Sajid Tax Consultant`;
    const description = service.metaDescription || service.description;
    const fullImageUrl = service.ogImage.startsWith('http')
      ? service.ogImage
      : `${origin}${service.ogImage}`;
    const pageUrl = `${origin}${window.location.pathname}#/service/${service.id}`;

    // Update document title
    document.title = title;

    // Standard Meta
    setMetaTag('description', description);
    setMetaTag('keywords', service.keywords.join(', '));
    setCanonicalUrl(pageUrl);

    // OpenGraph Meta
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', fullImageUrl, true);
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
    // Revert to Homepage Default SEO
    document.title = DEFAULT_TITLE;
    setMetaTag('description', DEFAULT_DESCRIPTION);
    setMetaTag('keywords', DEFAULT_KEYWORDS);
    const homeUrl = `${origin}${window.location.pathname}`;
    setCanonicalUrl(homeUrl);

    const defaultImageUrl = DEFAULT_IMAGE.startsWith('http')
      ? DEFAULT_IMAGE
      : `${origin}${DEFAULT_IMAGE}`;

    // OpenGraph
    setMetaTag('og:title', DEFAULT_TITLE, true);
    setMetaTag('og:description', DEFAULT_DESCRIPTION, true);
    setMetaTag('og:image', defaultImageUrl, true);
    setMetaTag('og:url', homeUrl, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'Sajid Tax Consultant', true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', DEFAULT_TITLE);
    setMetaTag('twitter:description', DEFAULT_DESCRIPTION);
    setMetaTag('twitter:image', defaultImageUrl);

    // Remove temporary service JSON-LD script so homepage defaults take precedence
    setStructuredData(null);
  }
}
