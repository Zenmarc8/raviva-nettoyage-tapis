import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedLinksBlock } from '../components/RelatedLinksBlock';
import { SeoImage } from '../components/SeoImage';
import { applyHeadSeo, buildBreadcrumbSchema } from '../lib/seo';

export const GuidesIndexPage: React.FC = () => {
  const { site, lang, articles, media } = useSite();

  const breadcrumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    { label: lang === 'fr' ? 'Guides conseils' : 'Care Guides', path: '/guides' },
  ];

  useEffect(() => {
    applyHeadSeo(site, lang, {
      title:
        lang === 'fr'
          ? `Guides conseils et méthodes | ${site.brand_name}`
          : `Carpet & Upholstery Care Guides | ${site.brand_name}`,
      description:
        lang === 'fr'
          ? 'Articles techniques sur le choix d’un nettoyeur de tapis, l’extraction à l’eau chaude, les protecteurs et les meubles rembourrés.'
          : 'Technical guides on choosing a carpet cleaner, hot-water extraction, fiber protection, and upholstery maintenance.',
      pathFr: '/guides',
      pathEn: '/guides',
      jsonLd: [buildBreadcrumbSchema(breadcrumbs)],
    });
  }, [site, lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {lang === 'fr' ? 'Guides conseils' : 'Care Guides'}
        </h1>
        <p className="mt-3 text-base text-slate-600 a11y-muted">
          {lang === 'fr'
            ? 'Information technique vérifiée pour prendre des décisions éclairées concernant vos tapis, carpettes et meubles rembourrés.'
            : 'Technical guidance to make informed decisions about your carpets, area rugs, and upholstered furniture.'}
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="mt-10 p-10 bg-white rounded-lg border border-slate-200 text-center text-sm text-slate-600">
          {lang === 'fr'
            ? 'Aucun guide publié pour le moment.'
            : 'No guides published yet.'}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => {
            const slug = lang === 'fr' ? article.slug_fr : article.slug_en;
            const cover = media.find((m) => m.id === article.cover_media_id);
            return (
              <article
                key={article.id}
                className="bg-white a11y-surface rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between"
              >
                {cover && (
                  <Link
                    to={`/guides/${slug}`}
                    className="block aspect-[16/9] overflow-hidden bg-slate-100"
                  >
                    <SeoImage
                      media={cover}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 a11y-muted">
                      <span>
                        {lang === 'fr' ? article.category_fr : article.category_en}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {article.reading_time_min}{' '}
                        {lang === 'fr' ? 'min de lecture' : 'min read'}
                      </span>
                    </div>
                    <h2 className="mt-2.5 text-xl font-semibold text-slate-900">
                      <Link to={`/guides/${slug}`} className="hover:underline">
                        {lang === 'fr' ? article.title_fr : article.title_en}
                      </Link>
                    </h2>
                    <p className="mt-2.5 text-sm text-slate-600 a11y-muted leading-relaxed">
                      {lang === 'fr' ? article.excerpt_fr : article.excerpt_en}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/guides/${slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:underline"
                    >
                      {lang === 'fr' ? 'Lire le guide complet' : 'Read full guide'}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <RelatedLinksBlock currentPath="/guides" />
    </div>
  );
};
