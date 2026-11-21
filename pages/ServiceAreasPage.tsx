import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedLinksBlock } from '../components/RelatedLinksBlock';
import {
  applyHeadSeo,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
} from '../lib/seo';

export const ServiceAreasPage: React.FC = () => {
  const { site, lang } = useSite();
  const [query, setQuery] = useState('');

  const filtered = site.served_municipalities.filter((m) =>
    m.toLowerCase().includes(query.trim().toLowerCase())
  );

  const breadcrumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    {
      label: lang === 'fr' ? 'Zones desservies' : 'Service Areas',
      path: lang === 'fr' ? '/zones-desservies' : '/service-areas',
    },
  ];

  useEffect(() => {
    applyHeadSeo(site, lang, {
      title:
        lang === 'fr'
          ? `Zones desservies (${site.served_municipalities.length} municipalités) | ${site.brand_name}`
          : `Service Areas (${site.served_municipalities.length} Municipalities) | ${site.brand_name}`,
      description:
        lang === 'fr'
          ? `Couverture commerciale directe Raviva et réseau résidentiel dans ${site.served_municipalities.length} municipalités de la région ${site.city_or_region}.`
          : `Direct commercial coverage by Raviva and residential partner network across ${site.served_municipalities.length} municipalities in ${site.city_or_region}.`,
      pathFr: '/zones-desservies',
      pathEn: '/service-areas',
      jsonLd: [buildBreadcrumbSchema(breadcrumbs), buildLocalBusinessSchema(site)],
    });
  }, [site, lang]);

  const quotePath = lang === 'fr' ? '/soumission' : '/quote';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 a11y-muted">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>{site.city_or_region}</span>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {lang === 'fr'
              ? `${site.served_municipalities.length} municipalités desservies`
              : `${site.served_municipalities.length} Municipalities Served`}
          </h1>
          <p className="mt-3 text-base text-slate-600 a11y-muted">
            {lang === 'fr'
              ? 'Sélectionnez votre municipalité pour amorcer une demande commerciale directe avec Raviva ou une mise en relation résidentielle avec un partenaire indépendant vérifié.'
              : 'Select your municipality to initiate a direct commercial inquiry with Raviva or a residential partner matching request.'}
          </p>
        </div>

        <div className="w-full md:w-80">
          <label htmlFor="municipality-search" className="sr-only">
            {lang === 'fr' ? 'Filtrer les municipalités' : 'Filter municipalities'}
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              id="municipality-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                lang === 'fr'
                  ? 'Rechercher une ville...'
                  : 'Search municipality...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 p-8 bg-white rounded-lg border border-slate-200 text-center text-sm text-slate-600">
          {lang === 'fr'
            ? 'Aucune municipalité ne correspond à votre recherche.'
            : 'No municipalities match your search.'}
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((city) => (
            <li key={city}>
              <Link
                to={`${quotePath}?city=${encodeURIComponent(city)}`}
                className="flex items-center justify-between px-4 py-3 bg-white a11y-surface rounded-lg border border-slate-200 text-sm font-medium text-slate-900 hover:border-slate-400 transition-colors"
              >
                <span>{city}</span>
                <span className="text-xs text-slate-500">
                  {lang === 'fr' ? 'Soumission' : 'Quote'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <RelatedLinksBlock
        currentPath={lang === 'fr' ? '/zones-desservies' : '/service-areas'}
      />
    </div>
  );
};
