import React from 'react';
import { Check, MessageSquare, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site.config';
import { CUSTOM_CONTENT } from '../../config/custom-content.config';
import { useTranslation } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';

export const HeroSection: React.FC = () => {
  const { locale, t } = useTranslation();
  const { openQuoteModal, navigate } = useRouter();
  const copy = CUSTOM_CONTENT.heroOverrides[locale];

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-slate-900">
      {/* Full-bleed high-priority background image with measured contrast scrim */}
      <div className="absolute inset-0">
        <img
          src={SITE_CONFIG.images.hero}
          alt={t.hero.imageAlt}
          width={1600}
          height={900}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/60"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Portion: Headline + Primary Conversion Controls */}
          <div className="rounded-2xl border border-white/15 bg-slate-950/75 p-6 backdrop-blur-md sm:p-9 lg:col-span-6">
            <p className="text-xs font-semibold tracking-wide text-emerald-300 sm:text-sm">
              {copy.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className="mt-3 font-display font-extrabold leading-[1.12] tracking-tight text-white [text-wrap:balance]"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.1rem)' }}
            >
              {copy.headline}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-200">
              {copy.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                data-book="hero-primary"
                onClick={() => openQuoteModal()}
                className="focus-light inline-flex min-h-[48px] items-center justify-center rounded-lg bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-400 whitespace-nowrap shrink-0"
              >
                {t.hero.primaryCta}
              </button>

              <a
                href={SITE_CONFIG.phoneHref}
                className="focus-light inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20 whitespace-nowrap shrink-0"
              >
                <Phone className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                <span className="tabular-nums">{t.hero.callCta}</span>
              </a>

              {SITE_CONFIG.features.enableSmsQuickContact && (
                <a
                  href={SITE_CONFIG.smsHref}
                  className="focus-light inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg px-3.5 py-3 text-sm font-semibold text-emerald-200 transition-colors hover:bg-white/10 whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>{t.hero.smsCta}</span>
                </a>
              )}
            </div>

            <div className="mt-6 border-t border-white/15 pt-5">
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {t.hero.reassuranceItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-snug text-slate-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <a
                  href="/soumission"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/soumission');
                  }}
                  className="focus-light text-xs font-semibold text-emerald-300 underline-offset-4 hover:underline"
                >
                  {t.quoteForm.pageKicker} (6 {locale === 'fr' ? 'étapes avec photos' : 'steps with photos'}) →
                </a>
              </div>
            </div>
          </div>

          {/* Right Portion: ~80% transparent surface over the image with optimal reading contrast */}
          <div className="rounded-2xl border border-white/25 bg-slate-950/20 p-6 backdrop-blur-[3px] sm:p-8 lg:col-span-6">
            <p className="text-xs font-bold tracking-wide text-emerald-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.85)]">
              {copy.rightPanelTitle}
            </p>
            <div className="mt-3 space-y-4 text-sm font-medium leading-relaxed text-white sm:text-[15px] [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
              {copy.rightPanelParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-5 border-t border-white/25 pt-4 font-display text-sm font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
              {copy.rightPanelSignature}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
