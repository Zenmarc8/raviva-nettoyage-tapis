import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { useTranslation } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useConsent } from '../context/ConsentContext';
import { SeoHead } from '../components/seo/SeoHead';

export const AccessibilityPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SeoHead
        pageTitle={`${t.pages.accessibility.title} | ${SITE_CONFIG.companyName}`}
        pageDescription={t.pages.accessibility.subtitle}
      />
      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t.pages.accessibility.title}
          </h1>
          <p className="mt-3 text-base text-slate-600">{t.pages.accessibility.subtitle}</p>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900">
              {t.pages.accessibility.standardTitle}
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              {t.pages.accessibility.standardBody}
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900">
              {t.pages.accessibility.measuresTitle}
            </h2>
            <ul className="space-y-3">
              {t.pages.accessibility.measures.map((m) => (
                <li key={m} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#146c43]"
                    aria-hidden="true"
                  />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 rounded-xl border border-slate-200 bg-[#f4f7f5] p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">
              {t.pages.accessibility.feedbackTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {t.pages.accessibility.feedbackBody}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SeoHead
        pageTitle={`${t.pages.privacy.title} | ${SITE_CONFIG.companyName}`}
        pageDescription={t.pages.privacy.subtitle}
      />
      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t.pages.privacy.title}
          </h1>
          <p className="mt-3 text-base text-slate-600">{t.pages.privacy.subtitle}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">{t.pages.privacy.updated}</p>

          <div className="mt-10 space-y-8">
            {t.pages.privacy.sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="font-display text-xl font-bold text-slate-900">{sec.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{sec.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const CookiesPolicyPage: React.FC = () => {
  const { t } = useTranslation();
  const { openPreferences } = useConsent();

  return (
    <>
      <SeoHead
        pageTitle={`${t.pages.cookiesPage.title} | ${SITE_CONFIG.companyName}`}
        pageDescription={t.pages.cookiesPage.subtitle}
      />
      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t.pages.cookiesPage.title}
          </h1>
          <p className="mt-3 text-base text-slate-600">{t.pages.cookiesPage.subtitle}</p>

          <div className="mt-10 space-y-8">
            {t.pages.cookiesPage.sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="font-display text-xl font-bold text-slate-900">{sec.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{sec.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={openPreferences}
              className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
            >
              {t.footer.manageCookiesBtn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SeoHead
        pageTitle={`${t.pages.terms.title} | ${SITE_CONFIG.companyName}`}
        pageDescription={t.pages.terms.subtitle}
      />
      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t.pages.terms.title}
          </h1>
          <p className="mt-3 text-base text-slate-600">{t.pages.terms.subtitle}</p>

          <div className="mt-10 space-y-8">
            {t.pages.terms.sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="font-display text-xl font-bold text-slate-900">{sec.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{sec.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } = useRouter();

  return (
    <div className="bg-white py-24 text-center">
      <div className="mx-auto max-w-xl px-4">
        <p className="font-display text-5xl font-extrabold text-[#0b3d2e] tabular-nums">
          {t.pages.notFound.code}
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
          {t.pages.notFound.title}
        </h1>
        <p className="mt-2 text-sm text-slate-600">{t.pages.notFound.body}</p>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="mt-6 inline-flex min-h-[44px] items-center rounded-lg bg-[#0b3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
        >
          {t.pages.notFound.backHome}
        </a>
      </div>
    </div>
  );
};
