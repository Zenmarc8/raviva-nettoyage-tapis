import React from 'react';
import { Check, Clock, Mail, MapPin, Phone, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { CUSTOM_CONTENT } from '../config/custom-content.config';
import { useTranslation } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/seo/SeoHead';
import { OptimizedImage } from '../components/common/OptimizedImage';
import { FaqAccordion } from '../components/common/FaqAccordion';

export const AboutPage: React.FC = () => {
  const { locale, t } = useTranslation();
  const { openQuoteModal } = useRouter();
  const founder = CUSTOM_CONTENT.founderStoryOverrides[locale];

  return (
    <>
      <SeoHead
        pageTitle={`${t.pages.about.title} | ${SITE_CONFIG.companyName}`}
        pageDescription={t.pages.about.subtitle}
        breadcrumbs={[
          { name: t.nav.home, url: '/' },
          { name: t.nav.about, url: '/a-propos' },
        ]}
      />

      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#146c43]">{t.founderSection.kicker}</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t.pages.about.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.pages.about.subtitle}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="h-full overflow-hidden rounded-2xl border border-slate-200">
                <OptimizedImage
                  src={SITE_CONFIG.images.founder}
                  alt={t.founderSection.portraitAlt}
                  aspectRatio="3/4"
                  width={900}
                  height={1200}
                  className="h-full w-full"
                  imgClassName="lg:h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <h2 className="font-display text-2xl font-bold text-slate-900">{founder.heading}</h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-800">
                {founder.leadParagraph}
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {founder.bodyParagraph}
              </p>

              <h3 className="mt-8 font-display text-lg font-bold text-slate-900">
                {t.pages.about.commitmentsTitle}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {t.pages.about.commitments.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#146c43]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

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
            </div>
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-slate-900">
            {t.pages.about.pillarsTitle}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {t.whyEco.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="rounded-xl border border-slate-200 bg-[#f4f7f5]/60 p-6"
              >
                <div className="text-sm font-bold text-[#146c43] tabular-nums">{pillar.number}</div>
                <h3 className="mt-1.5 font-display text-lg font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const FaqPage: React.FC = () => {
  const { t } = useTranslation();
  const { openQuoteModal } = useRouter();

  return (
    <>
      <SeoHead
        pageTitle={`${t.nav.faq} | ${SITE_CONFIG.companyName}`}
        pageDescription={t.faqSection.subheading}
        includeFaqSchema
        breadcrumbs={[
          { name: t.nav.home, url: '/' },
          { name: t.nav.faq, url: '/faq' },
        ]}
      />

      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[#146c43]">{t.faqSection.kicker}</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t.faqSection.heading}
          </h1>
          <p className="mt-3 text-base text-slate-600">{t.faqSection.subheading}</p>

          <div className="mt-10">
            <FaqAccordion items={t.faqSection.items} idPrefix="page-faq" />
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-[#f4f7f5] p-8 text-center">
            <h2 className="font-display text-xl font-bold text-slate-900">
              {t.finalCta.heading}
            </h2>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
              >
                {t.nav.freeQuote}
              </button>
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4 text-[#0b3d2e]" aria-hidden="true" />
                <span className="tabular-nums">{SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ContactPage: React.FC = () => {
  const { locale, t } = useTranslation();
  const { navigate } = useRouter();

  return (
    <>
      <SeoHead
        pageTitle={`${t.nav.contact} | ${SITE_CONFIG.companyName}`}
        pageDescription={t.pages.contact.subtitle}
        breadcrumbs={[
          { name: t.nav.home, url: '/' },
          { name: t.nav.contact, url: '/contact' },
        ]}
      />

      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t.pages.contact.title}
            </h1>
            <p className="mt-3 text-base text-slate-600">{t.pages.contact.subtitle}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-[#f4f7f5]/60 p-6">
              <div className="flex items-center gap-2.5 text-sm font-bold text-[#0b3d2e]">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{t.pages.contact.directCallTitle}</span>
              </div>
              <a
                href={SITE_CONFIG.phoneHref}
                className="mt-3 block font-display text-2xl font-extrabold text-slate-900 hover:text-[#0b3d2e] tabular-nums"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
              <p className="mt-1 text-xs text-slate-600">{SITE_CONFIG.founderName}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#f4f7f5]/60 p-6">
              <div className="flex items-center gap-2.5 text-sm font-bold text-[#0b3d2e]">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{t.pages.contact.emailTitle}</span>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="mt-3 block text-lg font-bold text-slate-900 hover:text-[#0b3d2e]"
              >
                {SITE_CONFIG.email}
              </a>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
                <Clock className="h-4 w-4 text-[#146c43]" aria-hidden="true" />
                <span>{t.pages.contact.hoursTitle}</span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{SITE_CONFIG.businessHours[locale]}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
                <MapPin className="h-4 w-4 text-[#146c43]" aria-hidden="true" />
                <span>{t.pages.contact.serviceZoneTitle}</span>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                Montréal · Laval · Rive-Sud · Couronne Nord
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#0b3d2e]" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {t.pages.contact.loi25ContactTitle}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {SITE_CONFIG.legal.loi25OfficerName} — {SITE_CONFIG.legal.loi25OfficerEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="/soumission"
              onClick={(e) => {
                e.preventDefault();
                navigate('/soumission');
              }}
              className="inline-flex min-h-[44px] items-center rounded-lg bg-[#0b3d2e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#082d22]"
            >
              {t.quoteForm.pageKicker} →
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
