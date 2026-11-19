import React from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { useTranslation } from '../context/LanguageContext';
import { SeoHead } from '../components/seo/SeoHead';
import { QuoteWizard } from '../components/quote/QuoteWizard';

export const QuotePage: React.FC = () => {
  const { locale, t } = useTranslation();

  return (
    <>
      <SeoHead
        pageTitle={`${t.nav.freeQuote} | ${SITE_CONFIG.companyName}`}
        pageDescription={t.quoteForm.pageSubtitle}
        breadcrumbs={[
          { name: t.nav.home, url: '/' },
          { name: t.nav.freeQuote, url: '/soumission' },
        ]}
      />

      <div className="bg-[#f4f7f5] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#146c43]">{t.quoteForm.pageKicker}</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
              {t.quoteForm.pageTitle}
            </h1>
            <p className="mt-3 text-base text-slate-600">{t.quoteForm.pageSubtitle}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-8">
              <QuoteWizard />
            </div>

            <aside className="space-y-5 lg:col-span-4">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  {locale === 'fr' ? 'Parler directement à Marc' : 'Speak directly with Marc'}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {locale === 'fr'
                    ? 'Une tache urgente ou une question sur une carpette délicate ?'
                    : 'Urgent spill or question about a delicate wool rug?'}
                </p>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#0b3d2e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span className="tabular-nums">{SITE_CONFIG.phoneDisplay}</span>
                </a>
                <p className="mt-3 text-xs text-slate-500">{SITE_CONFIG.businessHours[locale]}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#146c43]" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {locale === 'fr' ? '35 ans d’expérience terrain' : '35 years of experience'}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {SITE_CONFIG.legal.insuranceLabel[locale]}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};
