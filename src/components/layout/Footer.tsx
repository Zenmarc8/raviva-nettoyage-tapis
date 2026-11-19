import React from 'react';
import { Phone, Mail, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site.config';
import { ACTIVE_SERVICES } from '../../config/services.config';
import { REGIONS_CONFIG } from '../../config/locations.config';
import { useTranslation } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { useConsent } from '../../context/ConsentContext';

export const Footer: React.FC = () => {
  const { locale, t } = useTranslation();
  const { navigate } = useRouter();
  const { openPreferences } = useConsent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Direct Contact */}
          <div>
            <div className="font-display text-lg font-extrabold text-white">
              {SITE_CONFIG.companyName}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{t.footer.tagline}</p>

            <div className="mt-5 space-y-2.5 text-sm">
              <a
                href={SITE_CONFIG.phoneHref}
                className="focus-light flex items-center gap-2 font-semibold text-white hover:text-emerald-300"
              >
                <Phone className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span className="tabular-nums">{SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="focus-light flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <Mail className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <div className="pt-1 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">{t.footer.hoursLabel} :</span>{' '}
                {SITE_CONFIG.businessHours[locale]}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.legal.insuranceLabel[locale]}</span>
              </div>
            </div>
          </div>

          {/* Specialized Services */}
          <div>
            <h2 className="font-display text-sm font-bold text-white">
              {t.footer.servicesHeading}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {ACTIVE_SERVICES.map((srv) => (
                <li key={srv.id}>
                  <a
                    href={`/services/${srv.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/services/${srv.slug}`);
                    }}
                    className="focus-light text-slate-300 transition-colors hover:text-white"
                  >
                    {t.services[srv.id].title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h2 className="font-display text-sm font-bold text-white">
              {t.footer.areasHeading}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {REGIONS_CONFIG.map((region) => (
                <li key={region.id}>
                  <a
                    href={`/secteurs/${region.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/secteurs/${region.slug}`);
                    }}
                    className="focus-light text-slate-300 transition-colors hover:text-white"
                  >
                    {region.name[locale]}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/zones-desservies"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/zones-desservies');
                  }}
                  className="focus-light font-semibold text-emerald-300 hover:underline"
                >
                  {t.footer.allZonesLink} →
                </a>
              </li>
              <li>
                <a
                  href="/realisations"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/realisations');
                  }}
                  className="focus-light text-slate-300 transition-colors hover:text-white"
                >
                  {t.footer.galleryLink}
                </a>
              </li>
              <li>
                <a
                  href="/guides"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/guides');
                  }}
                  className="focus-light text-slate-300 transition-colors hover:text-white"
                >
                  {t.footer.guidesLink}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="/soumission"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/soumission');
                  }}
                  className="focus-light font-semibold text-emerald-300 hover:underline"
                >
                  {t.nav.freeQuote} →
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal (Loi 25 + WCAG 2.2) */}
          <div>
            <h2 className="font-display text-sm font-bold text-white">
              {t.footer.legalHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="/accessibilite"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accessibilite');
                  }}
                  className="focus-light text-slate-300 hover:text-white"
                >
                  {t.footer.accessibilityLink}
                </a>
              </li>
              <li>
                <a
                  href="/confidentialite"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/confidentialite');
                  }}
                  className="focus-light text-slate-300 hover:text-white"
                >
                  {t.footer.privacyLink}
                </a>
              </li>
              <li>
                <a
                  href="/temoins"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/temoins');
                  }}
                  className="focus-light text-slate-300 hover:text-white"
                >
                  {t.footer.cookiesLink}
                </a>
              </li>
              <li>
                <a
                  href="/conditions"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/conditions');
                  }}
                  className="focus-light text-slate-300 hover:text-white"
                >
                  {t.footer.termsLink}
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/dashboard');
                  }}
                  className="focus-light text-slate-400 hover:text-white"
                >
                  {t.footer.dashboardLink}
                </a>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="focus-light inline-flex min-h-[40px] items-center rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                >
                  {t.footer.manageCookiesBtn}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>{t.footer.copyright.replace('{year}', String(year))}</p>
          <p>
            {t.footer.neqLabel}: {SITE_CONFIG.legal.neq} · {SITE_CONFIG.legal.loi25OfficerName}
          </p>
        </div>
      </div>
    </footer>
  );
};
