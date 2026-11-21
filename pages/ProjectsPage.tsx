import React, { useEffect, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedLinksBlock } from '../components/RelatedLinksBlock';
import { SeoImage } from '../components/SeoImage';
import {
  applyHeadSeo,
  buildBreadcrumbSchema,
  buildImageObjectSchema,
} from '../lib/seo';

export const ProjectsPage: React.FC = () => {
  const { site, lang, media } = useSite();
  const [filter, setFilter] = useState<'all' | 'commercial' | 'residential'>('all');

  const portfolioItems = media.filter((m) => m.category === 'portfolio' || m.category === 'general');
  const filteredItems =
    filter === 'all'
      ? portfolioItems
      : portfolioItems.filter((m) => m.work_type === filter || m.work_type === 'all');

  const breadcrumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    {
      label: lang === 'fr' ? 'Réalisations' : 'Projects',
      path: lang === 'fr' ? '/realisations' : '/projects',
    },
  ];

  useEffect(() => {
    applyHeadSeo(site, lang, {
      title:
        lang === 'fr'
          ? `Réalisations avant/après | ${site.brand_name}`
          : `Project Gallery | ${site.brand_name}`,
      description:
        lang === 'fr'
          ? 'Galerie des travaux de nettoyage de tapis commerciaux et résidentiels en formats vertical et horizontal.'
          : 'Gallery of commercial and residential carpet cleaning work in vertical and horizontal formats.',
      pathFr: '/realisations',
      pathEn: '/projects',
      jsonLd: [
        buildBreadcrumbSchema(breadcrumbs),
        ...filteredItems.map((item) => buildImageObjectSchema(item, lang)),
      ],
    });
  }, [site, lang, filteredItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {lang === 'fr' ? 'Galerie de réalisations' : 'Work & Project Gallery'}
          </h1>
          <p className="mt-3 text-base text-slate-600 a11y-muted max-w-2xl">
            {lang === 'fr'
              ? 'Travaux sur tapis commerciaux, carpettes résidentielles, escaliers en format vertical (3:4) et mobilier textile.'
              : 'Showcase of commercial carpeting, residential area rugs, vertical-format staircase runners (3:4), and upholstery.'}
          </p>
        </div>

        <div
          className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg shrink-0"
          role="group"
          aria-label={lang === 'fr' ? 'Filtrer les réalisations' : 'Filter projects'}
        >
          {(
            [
              { key: 'all', fr: 'Tous', en: 'All' },
              { key: 'commercial', fr: 'Commercial', en: 'Commercial' },
              { key: 'residential', fr: 'Résidentiel', en: 'Residential' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {lang === 'fr' ? tab.fr : tab.en}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="mt-10 p-10 text-center bg-white rounded-lg border border-slate-200 text-sm text-slate-600">
          {lang === 'fr'
            ? 'Aucune photo dans cette catégorie pour le moment.'
            : 'No media items in this category yet.'}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredItems.map((item) => {
            const isVertical = item.height > item.width;
            return (
              <article
                key={item.id}
                className="bg-white a11y-surface rounded-lg border border-slate-200 overflow-hidden"
              >
                <div
                  className={`w-full overflow-hidden bg-slate-100 ${
                    isVertical ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                >
                  <SeoImage media={item} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 a11y-muted">
                    <span>
                      {item.work_type === 'commercial'
                        ? lang === 'fr'
                          ? 'Commercial (Raviva)'
                          : 'Commercial (Raviva)'
                        : item.work_type === 'residential'
                        ? lang === 'fr'
                          ? 'Résidentiel (Partenaire)'
                          : 'Residential (Partner)'
                        : lang === 'fr'
                        ? 'Technique'
                        : 'Technical'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">
                      {isVertical ? '3:4' : `${item.width}×${item.height}`}
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-base font-semibold text-slate-900">
                    {lang === 'fr' ? item.title_fr : item.title_en}
                  </h2>
                  <p className="mt-1.5 text-xs text-slate-600 a11y-muted leading-relaxed">
                    {lang === 'fr' ? item.caption_fr : item.caption_en}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <RelatedLinksBlock
        currentPath={lang === 'fr' ? '/realisations' : '/projects'}
      />
    </div>
  );
};
