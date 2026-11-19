import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ACTIVE_SERVICES, ServiceCategory } from '../../config/services.config';
import { useTranslation } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { OptimizedImage } from '../common/OptimizedImage';

type FilterState = 'all' | ServiceCategory;

export const ServicesGridSection: React.FC = () => {
  const { locale, t } = useTranslation();
  const { navigate, openQuoteModal } = useRouter();
  const [filter, setFilter] = useState<FilterState>('all');

  const filteredServices =
    filter === 'all'
      ? ACTIVE_SERVICES
      : ACTIVE_SERVICES.filter((srv) => srv.category === filter);

  const filterOptions: Array<{ id: FilterState; label: string }> = [
    { id: 'all', label: t.servicesSection.filterAll },
    { id: 'residential', label: t.servicesSection.filterResidential },
    { id: 'specialty', label: t.servicesSection.filterSpecialty },
    { id: 'commercial', label: t.servicesSection.filterCommercial },
  ];

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#146c43]">{t.servicesSection.kicker}</p>
            <h2
              id="services-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
            >
              {t.servicesSection.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {t.servicesSection.subheading}
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented Buttons) */}
          <div
            role="group"
            aria-label={t.servicesSection.kicker}
            className="flex flex-wrap items-center gap-1.5 rounded-lg bg-slate-100 p-1.5 shrink-0"
          >
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                aria-pressed={filter === opt.id}
                onClick={() => setFilter(opt.id)}
                className={`min-h-[40px] rounded-md px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  filter === opt.id
                    ? 'bg-[#0b3d2e] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((srv) => {
            const copy = t.services[srv.id];
            return (
              <article
                key={srv.id}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-slate-300"
              >
                <OptimizedImage
                  src={srv.image}
                  alt={copy.title}
                  aspectRatio="4/3"
                  width={800}
                  height={600}
                />

                <div className="flex flex-1 flex-col p-6">
                  {/* Unboxed quiet typography metadata (Zero-pill discipline) */}
                  <p className="text-xs font-semibold text-[#146c43]">{copy.categoryLabel}</p>

                  <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
                    <a
                      href={`/services/${srv.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/services/${srv.slug}`);
                      }}
                      className="hover:text-[#0b3d2e]"
                    >
                      {copy.title}
                    </a>
                  </h3>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
                    {copy.shortDesc}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <div className="text-sm font-bold text-slate-900 tabular-nums">
                      {srv.indicativePrice[locale]}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      <a
                        href={`/services/${srv.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/services/${srv.slug}`);
                        }}
                        className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#0b3d2e] hover:underline whitespace-nowrap shrink-0"
                      >
                        <span>{t.servicesSection.learnMore}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        data-book={srv.id}
                        onClick={() => openQuoteModal(srv.id)}
                        className="min-h-[40px] rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-[#0b3d2e] hover:bg-[#f4f7f5] hover:text-[#0b3d2e] whitespace-nowrap shrink-0"
                      >
                        {t.nav.freeQuote}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
