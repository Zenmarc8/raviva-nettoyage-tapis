import type { ArticleRecord, Language, SiteMediaRecord, SiteRecord } from '../types/database';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface PageSeoConfig {
  title: string;
  description: string;
  pathFr: string;
  pathEn: string;
  noIndex?: boolean;
  ogType?: 'website' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, unknown>[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applyHeadSeo(
  site: SiteRecord,
  lang: Language,
  config: PageSeoConfig
): void {
  const origin = window.location.origin;
  const activePath = lang === 'fr' ? config.pathFr : config.pathEn;
  const canonicalUrl = `${origin}${activePath}`;
  const frUrl = `${origin}${config.pathFr}`;
  const enUrl = `${origin}${config.pathEn}`;

  document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en-CA';
  document.title = config.title;

  upsertMeta('name', 'description', config.description);
  upsertMeta('property', 'og:title', config.title);
  upsertMeta('property', 'og:description', config.description);
  upsertMeta('property', 'og:type', config.ogType || 'website');
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:site_name', site.brand_name);
  upsertMeta('name', 'twitter:title', config.title);
  upsertMeta('name', 'twitter:description', config.description);

  if (config.ogImage) {
    const imgUrl = config.ogImage.startsWith('http')
      ? config.ogImage
      : `${origin}${config.ogImage}`;
    upsertMeta('property', 'og:image', imgUrl);
  }

  if (config.noIndex) {
    upsertMeta('name', 'robots', 'noindex, nofollow');
  } else {
    upsertMeta('name', 'robots', 'index, follow');
    upsertLink('canonical', canonicalUrl);
    upsertLink('alternate', frUrl, 'fr-CA');
    upsertLink('alternate', enUrl, 'en-CA');
    upsertLink('alternate', frUrl, 'x-default');
  }

  // Clear previous dynamic JSON-LD scripts
  document.head
    .querySelectorAll('script[data-raviva-jsonld="true"]')
    .forEach((node) => node.remove());

  if (!config.noIndex && config.jsonLd && config.jsonLd.length > 0) {
    for (const schema of config.jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-raviva-jsonld', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }
}

export function buildLocalBusinessSchema(site: SiteRecord): Record<string, unknown> {
  const origin = window.location.origin;
  const isConfigured = (val: string) =>
    Boolean(val && !val.includes('[À CONFIGURER'));

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.brand_name,
    url: origin,
    ...(isConfigured(site.phone) ? { telephone: site.phone } : {}),
    ...(isConfigured(site.email) ? { email: site.email } : {}),
    areaServed: site.served_municipalities.map((name) => ({
      '@type': 'City',
      name,
    })),
    ...(isConfigured(site.address_display)
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.address_display,
            addressRegion: 'QC',
            addressCountry: 'CA',
          },
        }
      : {}),
  };
}

export function buildServiceSchema(
  site: SiteRecord,
  name: string,
  description: string,
  serviceType: 'Commercial' | 'Residential'
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: site.brand_name,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: site.city_or_region,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  const origin = window.location.origin;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `${origin}${item.path}`,
    })),
  };
}

export function buildArticleSchema(
  site: SiteRecord,
  article: ArticleRecord,
  lang: Language,
  coverMedia?: SiteMediaRecord
): Record<string, unknown> {
  const origin = window.location.origin;
  const title = lang === 'fr' ? article.title_fr : article.title_en;
  const description = lang === 'fr' ? article.excerpt_fr : article.excerpt_en;
  const slug = lang === 'fr' ? article.slug_fr : article.slug_en;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at,
    mainEntityOfPage: `${origin}/guides/${slug}`,
    author: {
      '@type': 'Organization',
      name: site.brand_name,
    },
    publisher: {
      '@type': 'Organization',
      name: site.brand_name,
    },
    ...(coverMedia
      ? {
          image: {
            '@type': 'ImageObject',
            url: coverMedia.file_url.startsWith('http')
              ? coverMedia.file_url
              : `${origin}${coverMedia.file_url}`,
            width: coverMedia.width,
            height: coverMedia.height,
            caption: lang === 'fr' ? coverMedia.caption_fr : coverMedia.caption_en,
          },
        }
      : {}),
  };
}

export function buildImageObjectSchema(
  media: SiteMediaRecord,
  lang: Language
): Record<string, unknown> {
  const origin = window.location.origin;
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: media.file_url.startsWith('http')
      ? media.file_url
      : `${origin}${media.file_url}`,
    name: lang === 'fr' ? media.title_fr : media.title_en,
    description: lang === 'fr' ? media.alt_fr : media.alt_en,
    caption: lang === 'fr' ? media.caption_fr : media.caption_en,
    width: media.width,
    height: media.height,
  };
}

export function buildFaqSchema(
  faqs: Array<{ question: string; answer: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
