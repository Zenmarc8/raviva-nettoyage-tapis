import React from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { CUSTOM_CONTENT } from '../config/custom-content.config';
import { useTranslation } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/seo/SeoHead';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesGridSection } from '../components/home/ServicesGridSection';
import { ServiceAreasSection } from '../components/home/ServiceAreasSection';
import { OptimizedImage } from '../components/common/OptimizedImage';
import { FaqAccordion } from '../components/common/FaqAccordion';

export const HomePage: React.FC = () => {
  const { locale, t } = useTranslation();
  const { openQuoteModal, navigate } = useRouter();
  const founderCopy = CUSTOM_CONTENT.founderStoryOverrides[locale];

  return (
    <>
      <SeoHead
        pageTitle={t.meta.homeTitle}
        pageDescription={t.meta.homeDescription}
        includeFaqSchema
      />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Standards & Equipment Reassurance Band */}
      <section
        aria-label={t.standardsBand.heading}
        className="border-b border-slate-200 bg-[#f4f7f5] py-10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.standardsBand.items.map((item) => (
              <div key={item.title} className="space-y-1">
                <h2 className="font-display text-sm font-bold text-slate-900">{item.title}</h2>
                <p className="text-xs leading-relaxed text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Specialized Carpet & Textile Services Grid */}
      <ServicesGridSection />

      {/* 4. Why Eco / Why Choose Raviva */}
      <section
        aria-labelledby="why-eco-heading"
        className="border-t border-slate-200 bg-[#f4f7f5] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#146c43]">{t.whyEco.kicker}</p>
            <h2
              id="why-eco-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
            >
              {t.whyEco.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t.whyEco.subheading}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {t.whyEco.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <div className="font-display text-sm font-bold text-[#146c43] tabular-nums">
                  {pillar.number}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 4-Step Booking & Intervention Process */}
      <section aria-labelledby="process-heading" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#146c43]">{t.processSection.kicker}</p>
            <h2
              id="process-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
            >
              {t.processSection.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600">{t.processSection.subheading}</p>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.processSection.steps.map((s) => (
              <li
                key={s.step}
                className="flex flex-col rounded-xl border border-slate-200 bg-[#f4f7f5]/60 p-6"
              >
                <span className="font-display text-2xl font-extrabold text-[#0b3d2e] tabular-nums">
                  {s.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Verifiable Metrics & Configurable Reviews */}
      <section
        aria-labelledby="proof-heading"
        className="border-t border-slate-200 bg-[#f4f7f5] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#146c43]">{t.proofSection.kicker}</p>
            <h2
              id="proof-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
            >
              {t.proofSection.heading}
            </h2>
          </div>

          {/* 4 Verifiable Key Figures */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CUSTOM_CONTENT.verifiableMetrics.map((m) => (
              <div key={m.value} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="font-display text-3xl font-extrabold text-[#0b3d2e] tabular-nums">
                  {m.value}
                </div>
                <div className="mt-1 text-sm font-bold text-slate-900">{m.label[locale]}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{m.detail[locale]}</p>
              </div>
            ))}
          </div>

          {/* Configurable Review Slots (Transparently marked, no fake testimonials) */}
          <p className="mt-10 text-xs font-medium text-slate-600">
            {t.proofSection.configurableNotice}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CUSTOM_CONTENT.configurableReviews.map((rev) => (
              <blockquote
                key={rev.id}
                className="flex flex-col justify-between rounded-xl border border-dashed border-slate-300 bg-white p-6"
              >
                <p className="text-sm leading-relaxed text-slate-700">{rev.quote[locale]}</p>
                <footer className="mt-5 border-t border-slate-100 pt-4 text-xs">
                  <div className="font-bold text-slate-900">{rev.author}</div>
                  <div className="mt-0.5 text-slate-600">
                    {rev.neighborhood} · {rev.serviceLabel[locale]}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Meet the Founder — Marc Lemonnier */}
      <section aria-labelledby="founder-heading" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <OptimizedImage
                  src={SITE_CONFIG.images.founder}
                  alt={t.founderSection.portraitAlt}
                  aspectRatio="3/4"
                  width={900}
                  height={1200}
                  className="h-full w-full"
                  imgClassName="lg:h-full lg:w-full object-cover object-top"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-sm font-semibold text-[#146c43]">{t.founderSection.kicker}</p>
              <h2
                id="founder-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
              >
                {founderCopy.heading}
              </h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-slate-800">
                {founderCopy.leadParagraph}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {founderCopy.bodyParagraph}
              </p>

              {/* Satisfaction Guarantee Box (All-around hairline border, no thick left stripe) */}
              <div className="mt-7 rounded-xl border border-slate-200 bg-[#f4f7f5] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0b3d2e]" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">
                      {founderCopy.guaranteeTitle}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">
                      {founderCopy.guaranteeText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0b3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>{t.founderSection.ctaButton}</span>
                </a>
                <a
                  href="/a-propos"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/a-propos');
                  }}
                  className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {t.nav.about} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Before / After Gallery */}
      <section
        aria-labelledby="before-after-heading"
        className="border-t border-slate-200 bg-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <OptimizedImage
                  src={SITE_CONFIG.images.beforeAfter}
                  alt={t.beforeAfterSection.mainImageAlt}
                  aspectRatio="4/3"
                  width={1200}
                  height={900}
                />
                <div className="grid grid-cols-2 border-t border-slate-200 bg-slate-50 text-center text-xs font-bold text-slate-800">
                  <div className="border-r border-slate-200 py-2.5">
                    {t.beforeAfterSection.beforeLabel}
                  </div>
                  <div className="py-2.5 text-[#0b3d2e]">{t.beforeAfterSection.afterLabel}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-6">
              <p className="text-sm font-semibold text-[#146c43]">
                {t.beforeAfterSection.kicker}
              </p>
              <h2
                id="before-after-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
              >
                {t.beforeAfterSection.heading}
              </h2>
              <p className="mt-3 text-base text-slate-600">{t.beforeAfterSection.subheading}</p>

              <div className="mt-7 space-y-4">
                {t.beforeAfterSection.cases.map((c) => (
                  <div key={c.title} className="rounded-xl border border-slate-200 bg-[#f4f7f5]/50 p-4">
                    <h3 className="font-display text-base font-bold text-slate-900">{c.title}</h3>
                    <p className="mt-1 text-xs font-medium text-slate-600">
                      {c.surface} · {c.treatment}
                    </p>
                    <p className="mt-1.5 text-sm text-slate-800">{c.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Service Areas + Live Postal Checker */}
      <ServiceAreasSection />

      {/* 10. Move-In / Move-Out & Gift Certificates */}
      {SITE_CONFIG.features.enableMoveInAndGiftSection && (
        <section aria-label={t.moveInAndGift.moveInKicker} className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f4f7f5] p-8">
                <div>
                  <p className="text-xs font-bold text-[#146c43]">{t.moveInAndGift.moveInKicker}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">
                    {t.moveInAndGift.moveInTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {t.moveInAndGift.moveInDesc}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => openQuoteModal('move-in-move-out')}
                    className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
                  >
                    {t.moveInAndGift.moveInCta}
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8">
                <div>
                  <p className="text-xs font-bold text-[#146c43]">{t.moveInAndGift.giftKicker}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">
                    {t.moveInAndGift.giftTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {t.moveInAndGift.giftDesc}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => openQuoteModal()}
                    className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    {t.moveInAndGift.giftCta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 11. Accessible FAQ Accordion */}
      <section
        aria-labelledby="home-faq-heading"
        className="border-t border-slate-200 bg-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#146c43]">{t.faqSection.kicker}</p>
            <h2
              id="home-faq-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
            >
              {t.faqSection.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600">{t.faqSection.subheading}</p>
          </div>

          <div className="mt-10">
            <FaqAccordion items={t.faqSection.items} idPrefix="home-faq" />
          </div>
        </div>
      </section>

      {/* Final Conversion CTA Band */}
      <section aria-labelledby="final-cta-heading" className="bg-[#0b3d2e] py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <h2
              id="final-cta-heading"
              className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]"
            >
              {t.finalCta.heading}
            </h2>
            <p className="mt-3 text-base text-emerald-100">{t.finalCta.subheading}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              data-book="final-cta"
              onClick={() => openQuoteModal()}
              className="focus-light min-h-[48px] rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#0b3d2e] transition-colors hover:bg-emerald-50 whitespace-nowrap shrink-0"
            >
              {t.finalCta.primaryBtn}
            </button>
            <a
              href={SITE_CONFIG.phoneHref}
              className="focus-light inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 whitespace-nowrap shrink-0"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="tabular-nums">{t.finalCta.secondaryBtn}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
