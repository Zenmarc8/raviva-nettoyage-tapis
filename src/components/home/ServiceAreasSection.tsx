import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, MapPin } from 'lucide-react';
import { REGIONS_CONFIG, validateCanadianPostalCode } from '../../config/locations.config';
import { useTranslation } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';

export const ServiceAreasSection: React.FC = () => {
  const { locale, t } = useTranslation();
  const { navigate } = useRouter();
  const [postalInput, setPostalInput] = useState('');
  const [result, setResult] = useState<{
    status: 'valid' | 'out' | 'invalid';
    message: string;
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateCanadianPostalCode(postalInput);
    if (!check.isValidFormat) {
      setResult({
        status: 'invalid',
        message: t.areasSection.postalInvalidFormatMsg,
      });
      return;
    }
    if (check.inServiceZone) {
      setResult({
        status: 'valid',
        message: t.areasSection.postalValidMsg.replace('{postal}', check.normalized),
      });
    } else {
      setResult({
        status: 'out',
        message: t.areasSection.postalOutOfZoneMsg.replace('{postal}', check.normalized),
      });
    }
  };

  return (
    <section
      id="secteurs"
      aria-labelledby="areas-heading"
      className="border-t border-slate-200 bg-[#f4f7f5] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: Heading + Live Postal Code Checker */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#146c43]">{t.areasSection.kicker}</p>
            <h2
              id="areas-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
            >
              {t.areasSection.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {t.areasSection.subheading}
            </p>

            <form
              onSubmit={handleCheck}
              className="mt-7 rounded-xl border border-slate-200 bg-white p-5"
            >
              <label
                htmlFor="postal-zone-input"
                className="block text-sm font-bold text-slate-900"
              >
                {t.areasSection.postalCheckerTitle}
              </label>
              <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
                <input
                  id="postal-zone-input"
                  type="text"
                  maxLength={7}
                  value={postalInput}
                  onChange={(e) => setPostalInput(e.target.value.toUpperCase())}
                  placeholder={t.areasSection.postalPlaceholder}
                  className="min-h-[44px] flex-1 rounded-lg border border-slate-300 px-3.5 py-2 text-sm uppercase text-slate-900"
                />
                <button
                  type="submit"
                  className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#082d22] whitespace-nowrap shrink-0"
                >
                  {t.areasSection.postalCheckBtn}
                </button>
              </div>

              {result && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-3 flex items-start gap-2 rounded-lg p-3 text-xs leading-relaxed ${
                    result.status === 'valid'
                      ? 'bg-emerald-50 text-emerald-950'
                      : result.status === 'out'
                        ? 'bg-amber-50 text-amber-950'
                        : 'bg-red-50 text-red-900'
                  }`}
                >
                  {result.status === 'valid' ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                  )}
                  <span>{result.message}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right: 4 Regions Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {REGIONS_CONFIG.map((region) => (
              <div
                key={region.id}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-slate-900">
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
                  </h3>
                  <MapPin className="h-4 w-4 shrink-0 text-[#146c43]" aria-hidden="true" />
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {region.description[locale]}
                </p>
                <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm text-slate-700">
                  {region.cities.slice(0, 6).map((city) => (
                    <li key={city.slug}>{city.name}</li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <a
                    href="/zones-desservies"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/zones-desservies');
                    }}
                    className="text-xs font-semibold text-[#0b3d2e] hover:underline"
                  >
                    + {region.cities.length} {locale === 'fr' ? 'secteurs → Voir les 75 municipalités' : 'areas → View all 75 municipalities'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
