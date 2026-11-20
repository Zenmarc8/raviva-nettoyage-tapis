import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../config/site.config';
import { ACTIVE_SERVICES, ServiceDefinition } from '../../config/services.config';
import { ALL_CITIES } from '../../config/locations.config';
import { GuideArticle } from '../../config/guides.config';
import { useTranslation } from '../../context/LanguageContext';

interface SeoHeadProps {
  pageTitle?: string;
  pageDescription?: string;
  service?: ServiceDefinition;
  article?: GuideArticle;
  breadcrumbs?: Array<{ name: string; url: string }>;
  includeFaqSchema?: boolean;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  pageTitle,
  pageDescription,
  service,
  article,
  breadcrumbs,
  includeFaqSchema = false,
}) => {
  const { locale, t } = useTranslation();

  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle;
    }
    if (pageDescription) {
      const metaDesc = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (metaDesc) {
        metaDesc.content = pageDescription;
      }
      const ogDesc = document.head.querySelector<HTMLMetaElement>('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.content = pageDescription;
      }
    }
  }, [pageTitle, pageDescription]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.domain;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: SITE_CONFIG.companyName,
    url: SITE_CONFIG.domain,
    telephone: SITE_CONFIG.phoneDisplay,
    email: SITE_CONFIG.email,
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.founderName,
    },
    areaServed: ALL_CITIES.map((city) => ({
      '@type': 'City',
      name: city.name,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.province,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'fr' ? 'Services de nettoyage de tapis et textiles' : 'Carpet & Textile Cleaning Services',
      itemListElement: ACTIVE_SERVICES.map((srv) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: t.services[srv.id].title,
          description: t.services[srv.id].shortDesc,
        },
      })),
    },
  };

  const serviceSchema = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: t.services[service.id].title,
        description: t.services[service.id].fullDesc,
        provider: {
          '@type': 'LocalBusiness',
          name: SITE_CONFIG.companyName,
          telephone: SITE_CONFIG.phoneDisplay,
        },
        areaServed: 'Greater Montreal, Laval, South Shore, North Shore',
        url: currentUrl,
      }
    : null;

  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title[locale],
        description: article.excerpt[locale],
        datePublished: article.publishedAt,
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.founderName,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.companyName,
          url: SITE_CONFIG.domain,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_CONFIG.domain}/guides/${article.slug}`,
        },
      }
    : null;

  const faqSchema = includeFaqSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: t.faqSection.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }
    : null;

  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: b.name,
            item: b.url.startsWith('http') ? b.url : `${SITE_CONFIG.domain}${b.url}`,
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
};
