import React from 'react';
import { Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { useTranslation } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/seo/SeoHead';
import { SeoImage } from '../components/common/SeoImage';
import { AccreditationsSection } from '../components/common/AccreditationsSection';

export const GalleryPage: React.FC = () => {
  const { locale, t } = useTranslation();
  const { openQuoteModal } = useRouter();
  const { beforeAfterItems } = useCms();

  return (
    <>
      <SeoHead
        pageTitle={`${t.nav.gallery} | ${SITE_CONFIG.companyName}`}
        pageDescription={t.beforeAfterSection.subheading}
        breadcrumbs={[
          { name: t.nav.home, url: '/' },
          { name: t.nav.gallery, url: '/realisations' },
        ]}
      />

      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#146c43]">{t.beforeAfterSection.kicker}</p>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
                {locale === 'fr'
                  ? 'Galerie de mes travaux réels'
                  : 'Gallery of My Real Work'}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {t.beforeAfterSection.subheading}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
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
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beforeAfterItems.map((item) => (
              <figure
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <SeoImage
                  src={item.src}
                  alt={item.alt[locale]}
                  caption={item.caption[locale]}
                  aspectRatio="3/4"
                  width={900}
                  height={1200}
                />
                <figcaption className="flex flex-1 flex-col justify-between border-t border-slate-100 p-4">
                  <div className="font-display text-base font-bold text-slate-900">
                    {item.title[locale]}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {item.caption[locale]}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <AccreditationsSection />
    </>
  );
};
