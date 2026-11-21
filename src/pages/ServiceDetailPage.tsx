import React from 'react';
import { ArrowLeft, Check, Phone } from 'lucide-react';
import { ACTIVE_SERVICES, ServiceDefinition } from '../config/services.config';
import { SITE_CONFIG } from '../config/site.config';
import { useTranslation } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/seo/SeoHead';
import { OptimizedImage } from '../components/common/OptimizedImage';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { Raviva6XSection } from '../components/common/Raviva6XSection';

interface ServiceDetailPageProps {
  service: ServiceDefinition;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
  const { locale, t } = useTranslation();
  const { navigate, openQuoteModal } = useRouter();
  const copy = t.services[service.id];

  const breadcrumbs = [
    { name: t.nav.home, url: '/' },
    { name: t.nav.services, url: '/#services' },
    { name: copy.title, url: `/services/${service.slug}` },
  ];

  const otherServices = ACTIVE_SERVICES.filter((s) => s.id !== service.id).slice(0, 5);

  return (
    <>
      <SeoHead
        pageTitle={`${copy.title} | ${SITE_CONFIG.companyName}`}
        pageDescription={copy.shortDesc}
        service={service}
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Accessible Breadcrumb */}
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
              <li>
                <a
                  href="/#services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/#services');
                  }}
                  className="hover:text-[#0b3d2e] hover:underline"
                >
                  {t.nav.services}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-slate-900">
                {copy.title}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-[#146c43]">{copy.categoryLabel}</p>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
                {copy.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">{copy.fullDesc}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-slate-200 py-4">
                <div>
                  <span className="block text-xs font-medium text-slate-500">
                    {locale === 'fr' ? 'Tarif indicatif' : 'Indicative pricing'}
                  </span>
                  <span className="text-lg font-bold text-[#0b3d2e] tabular-nums">
                    {service.indicativePrice[locale]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 sm:ml-auto">
                  <button
                    type="button"
                    data-book={`detail-${service.id}`}
                    onClick={() => openQuoteModal(service.id)}
                    className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
                  >
                    {t.servicesSection.requestQuoteFor}
                  </button>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    <Phone className="h-4 w-4 text-[#0b3d2e]" aria-hidden="true" />
                    <span className="tabular-nums">{SITE_CONFIG.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Technical Process */}
              <div className="mt-8">
                <h2 className="font-display text-xl font-bold text-slate-900">
                  {locale === 'fr' ? 'Protocole d’intervention' : 'Our treatment protocol'}
                </h2>
                <ul className="mt-4 space-y-3">
                  {copy.processPoints.map((pt, i) => (
                    <li
                      key={pt}
                      className="flex items-start gap-3 rounded-lg border border-slate-200 bg-[#f4f7f5]/50 p-3.5 text-sm text-slate-800"
                    >
                      <span className="font-display font-bold text-[#0b3d2e] tabular-nums">
                        0{i + 1}.
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div className="mt-8">
                <h2 className="font-display text-xl font-bold text-slate-900">
                  {locale === 'fr' ? 'Idéal pour' : 'Ideal for'}
                </h2>
                <ul className="mt-3 space-y-2">
                  {copy.idealFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#146c43]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specific FAQ */}
              {copy.faqSpecific.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 font-display text-xl font-bold text-slate-900">
                    {locale === 'fr' ? 'Questions spécifiques' : 'Service FAQ'}
                  </h2>
                  <FaqAccordion items={copy.faqSpecific} idPrefix={`srv-${service.id}`} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <OptimizedImage
                  src={service.image}
                  alt={copy.title}
                  aspectRatio="4/3"
                  width={900}
                  height={675}
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#f4f7f5] p-6">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  {locale === 'fr' ? 'Autres services Raviva' : 'Other Raviva Services'}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {otherServices.map((other) => (
                    <li key={other.id}>
                      <a
                        href={`/services/${other.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/services/${other.slug}`);
                        }}
                        className="block rounded-lg bg-white p-3 text-sm font-semibold text-slate-800 border border-slate-200 hover:border-[#0b3d2e] hover:text-[#0b3d2e]"
                      >
                        {t.services[other.id].title}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="/#services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/#services');
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b3d2e] hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.nav.viewAllServices}</span>
                </a>
              </div>
            </aside>
          </div>

          <Raviva6XSection compact />
        </div>
      </div>
    </>
  );
};
