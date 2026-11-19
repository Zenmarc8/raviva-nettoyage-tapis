import React, { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, MapPin, Phone, Search } from 'lucide-react';
import {
  ALL_CITIES,
  REGIONS_CONFIG,
  validateCanadianPostalCode,
} from '../config/locations.config';
import { SITE_CONFIG } from '../config/site.config';
import { useTranslation } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/seo/SeoHead';

export const AreasDirectoryPage: React.FC = () => {
  const { locale, t } = useTranslation();
  const { navigate, openQuoteModal } = useRouter();
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [postalInput, setPostalInput] = useState('');
  const [postalResult, setPostalResult] = useState<{
    status: 'valid' | 'out' | 'invalid';
    message: string;
  } | null>(null);

  const filteredRegions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REGIONS_CONFIG.filter((r) => activeRegion === 'all' || r.id === activeRegion)
      .map((region) => ({
        ...region,
        cities: region.cities.filter((c) => c.name.toLowerCase().includes(q)),
      }))
      .filter((r) => r.cities.length > 0);
  }, [query, activeRegion]);

  const handlePostalCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateCanadianPostalCode(postalInput);
    if (!check.isValidFormat) {
      setPostalResult({ status: 'invalid', message: t.areasSection.postalInvalidFormatMsg });
      return;
    }
    if (check.inServiceZone) {
      setPostalResult({
        status: 'valid',
        message: t.areasSection.postalValidMsg.replace('{postal}', check.normalized),
      });
    } else {
      setPostalResult({
        status: 'out',
        message: t.areasSection.postalOutOfZoneMsg.replace('{postal}', check.normalized),
      });
    }
  };

  return (
    <>
      <SeoHead
        pageTitle={
          locale === 'fr'
            ? `75 municipalités desservies — Grand Montréal | ${SITE_CONFIG.companyName}`
            : `75 Municipalities Served — Greater Montreal | ${SITE_CONFIG.companyName}`
        }
        pageDescription={t.areasSection.subheading}
        breadcrumbs={[
          { name: t.nav.home, url: '/' },
          {
            name: locale === 'fr' ? 'Zones desservies' : 'Service Areas',
            url: '/zones-desservies',
          },
        ]}
      />

      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#146c43]">{t.areasSection.kicker}</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
              {locale === 'fr'
                ? `${ALL_CITIES.length} municipalités et arrondissements desservis directement`
                : `${ALL_CITIES.length} Municipalities & Boroughs Served Directly`}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {t.areasSection.subheading}
            </p>
          </div>

          {/* Search & Postal Validation Bar */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-xl border border-slate-200 bg-[#f4f7f5] p-5 lg:col-span-7">
              <label htmlFor="city-search-input" className="block text-sm font-bold text-slate-900">
                {locale === 'fr' ? 'Rechercher une municipalité ou un arrondissement' : 'Search a municipality or borough'}
              </label>
              <div className="relative mt-2.5">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="city-search-input"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={locale === 'fr' ? 'Ex. Longueuil, Westmount, Mirabel…' : 'e.g. Longueuil, Westmount, Mirabel…'}
                  className="min-h-[44px] w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={locale === 'fr' ? 'Filtrer par région' : 'Filter by region'}>
                <button
                  type="button"
                  onClick={() => setActiveRegion('all')}
                  aria-pressed={activeRegion === 'all'}
                  className={`min-h-[40px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    activeRegion === 'all'
                      ? 'bg-[#0b3d2e] text-white'
                      : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {locale === 'fr' ? `Toutes (${ALL_CITIES.length})` : `All (${ALL_CITIES.length})`}
                </button>
                {REGIONS_CONFIG.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActiveRegion(r.id)}
                    aria-pressed={activeRegion === r.id}
                    className={`min-h-[40px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      activeRegion === r.id
                        ? 'bg-[#0b3d2e] text-white'
                        : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {r.name[locale]} ({r.cities.length})
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handlePostalCheck}
              className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-5"
            >
              <label htmlFor="dir-postal-input" className="block text-sm font-bold text-slate-900">
                {t.areasSection.postalCheckerTitle}
              </label>
              <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
                <input
                  id="dir-postal-input"
                  type="text"
                  maxLength={7}
                  value={postalInput}
                  onChange={(e) => setPostalInput(e.target.value.toUpperCase())}
                  placeholder={t.areasSection.postalPlaceholder}
                  className="min-h-[44px] flex-1 rounded-lg border border-slate-300 px-3.5 py-2 text-sm uppercase text-slate-900"
                />
                <button
                  type="submit"
                  className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082d22] whitespace-nowrap shrink-0"
                >
                  {t.areasSection.postalCheckBtn}
                </button>
              </div>
              {postalResult && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-3 flex items-start gap-2 rounded-lg p-3 text-xs ${
                    postalResult.status === 'valid'
                      ? 'bg-emerald-50 text-emerald-950'
                      : postalResult.status === 'out'
                        ? 'bg-amber-50 text-amber-950'
                        : 'bg-red-50 text-red-900'
                  }`}
                >
                  {postalResult.status === 'valid' ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                  )}
                  <span>{postalResult.message}</span>
                </div>
              )}
            </form>
          </div>

          {/* Municipalities List */}
          <div className="mt-10 space-y-8">
            {filteredRegions.map((region) => (
              <section
                key={region.id}
                aria-labelledby={`dir-region-${region.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2
                      id={`dir-region-${region.id}`}
                      className="font-display text-2xl font-bold text-slate-900"
                    >
                      <a
                        href={`/secteurs/${region.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/secteurs/${region.slug}`);
                        }}
                        className="hover:text-[#0b3d2e] hover:underline"
                      >
                        {region.name[locale]}
                      </a>
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">{region.description[locale]}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0b3d2e] tabular-nums">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {region.cities.length} {locale === 'fr' ? 'secteurs' : 'areas'}
                  </span>
                </div>

                <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {region.cities.map((city) => (
                    <li
                      key={city.slug}
                      className="rounded-lg border border-slate-200 bg-[#f4f7f5]/50 px-3.5 py-2.5 text-sm font-medium text-slate-800"
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {filteredRegions.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-700">
                {locale === 'fr'
                  ? 'Aucune municipalité ne correspond à votre recherche. Appelez directement Marc Lemonnier au 514-820-0368 pour valider votre secteur.'
                  : 'No municipality matched your search. Call Marc Lemonnier directly at 514-820-0368 to confirm your area.'}
              </div>
            )}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-[#0b3d2e] p-8 text-white">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">{t.finalCta.heading}</h2>
                <p className="mt-2 text-sm text-emerald-100">{t.finalCta.subheading}</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="focus-light min-h-[44px] rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#0b3d2e] hover:bg-emerald-50"
                >
                  {t.nav.freeQuote}
                </button>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="focus-light inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span className="tabular-nums">{SITE_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
