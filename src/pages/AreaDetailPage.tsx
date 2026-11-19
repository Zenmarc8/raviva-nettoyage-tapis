import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { RegionGroup } from '../config/locations.config';
import { ACTIVE_SERVICES } from '../config/services.config';
import { SITE_CONFIG } from '../config/site.config';
import { useTranslation } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/seo/SeoHead';

interface AreaDetailPageProps {
  region: RegionGroup;
}

export const AreaDetailPage: React.FC<AreaDetailPageProps> = ({ region }) => {
  const { locale, t } = useTranslation();
  const { navigate, openQuoteModal } = useRouter();

  const title =
    locale === 'fr'
      ? `Nettoyage de tapis à ${region.name.fr} | ${SITE_CONFIG.companyName}`
      : `Carpet Cleaning in ${region.name.en} | ${SITE_CONFIG.companyName}`;

  const breadcrumbs = [
    { name: t.nav.home, url: '/' },
    { name: t.nav.areas, url: '/#secteurs' },
    { name: region.name[locale], url: `/secteurs/${region.slug}` },
  ];

  return (
    <>
      <SeoHead
        pageTitle={title}
        pageDescription={region.description[locale]}
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label={t.a11y.breadcrumbLabel} className="mb-6 text-xs text-slate-600">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                  className="hover:text-[#0b3d2e] hover:underline"
                >
                  {t.nav.home}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-slate-900">
                {region.name[locale]}
              </li>
            </ol>
          </nav>

          <p className="text-sm font-semibold text-[#146c43]">{t.areasSection.kicker}</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {locale === 'fr'
              ? `Nettoyage de tapis et meubles — ${region.name.fr}`
              : `Carpet & Upholstery Cleaning — ${region.name.en}`}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            {region.description[locale]}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
            >
              {t.nav.freeQuote}
            </button>
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <Phone className="h-4 w-4 text-[#0b3d2e]" aria-hidden="true" />
              <span className="tabular-nums">{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>

          <h2 className="mt-12 font-display text-2xl font-bold text-slate-900">
            {t.areasSection.citiesCoveredLabel}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {region.cities.map((city) => (
              <div
                key={city.slug}
                className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-[#f4f7f5]/60 p-5"
              >
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">{city.name}</h3>
                  <p className="mt-1 text-xs text-slate-600">
                    {locale === 'fr' ? 'Préfixes postaux :' : 'Postal prefixes:'}{' '}
                    <span className="font-mono font-semibold">{city.postalPrefixes.join(', ')}</span>
                  </p>
                </div>
                <MapPin className="h-5 w-5 shrink-0 text-[#146c43]" aria-hidden="true" />
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl font-bold text-slate-900">
            {locale === 'fr'
              ? `Services offerts dans le secteur ${region.name.fr}`
              : `Services available in ${region.name.en}`}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ACTIVE_SERVICES.map((srv) => (
              <a
                key={srv.id}
                href={`/services/${srv.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/services/${srv.slug}`);
                }}
                className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#0b3d2e]"
              >
                <div className="text-sm font-bold text-slate-900">{t.services[srv.id].title}</div>
                <div className="mt-1 text-xs text-slate-600">{srv.indicativePrice[locale]}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
