import React, { useEffect } from 'react';
import { Home } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LeadForm } from '../components/LeadForm';
import { RelatedLinksBlock } from '../components/RelatedLinksBlock';
import { SeoImage } from '../components/SeoImage';
import {
  applyHeadSeo,
  buildBreadcrumbSchema,
  buildServiceSchema,
} from '../lib/seo';

export const ResidentialServicesPage: React.FC = () => {
  const { site, lang, media } = useSite();
  const content =
    lang === 'fr' ? site.services_residential_fr : site.services_residential_en;
  const resMedia = media.find((m) => m.work_type === 'residential') || media[0];

  const breadcrumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    {
      label: lang === 'fr' ? 'Services résidentiels' : 'Residential Services',
      path: lang === 'fr' ? '/services-residentiels' : '/residential-services',
    },
  ];

  useEffect(() => {
    applyHeadSeo(site, lang, {
      title: `${content.page_title} | ${site.brand_name}`,
      description: content.page_subtitle,
      pathFr: '/services-residentiels',
      pathEn: '/residential-services',
      ogImage: resMedia?.file_url,
      jsonLd: [
        buildBreadcrumbSchema(breadcrumbs),
        buildServiceSchema(
          site,
          content.page_title,
          content.operational_disclosure,
          'Residential'
        ),
      ],
    });
  }, [site, lang, content, resMedia]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 a11y-muted">
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>
              {lang === 'fr'
                ? 'Mise en relation · Partenaires indépendants vérifiés'
                : 'Partner Matching · Verified Independent Providers'}
            </span>
          </div>
          <h1
            className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {content.page_title}
          </h1>
          <p className="mt-4 text-base text-slate-600 a11y-muted leading-relaxed">
            {content.page_subtitle}
          </p>

          <div className="mt-6 p-5 rounded-lg bg-amber-50/70 a11y-surface border border-amber-200 text-sm text-slate-900 leading-relaxed">
            {content.operational_disclosure}
          </div>

          <div className="mt-10 space-y-6">
            {content.items.map((item) => (
              <article
                key={item.id}
                className="p-6 bg-white a11y-surface rounded-lg border border-slate-200"
              >
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600 a11y-muted leading-relaxed">
                  {item.description}
                </p>
                <p className="mt-3 text-xs font-medium text-slate-700">
                  {item.method_note}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          {resMedia && (
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
              <SeoImage
                media={resMedia}
                showCaption
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          )}
          <LeadForm category="residential" />
        </aside>
      </div>

      <RelatedLinksBlock
        currentPath={
          lang === 'fr' ? '/services-residentiels' : '/residential-services'
        }
      />
    </div>
  );
};
