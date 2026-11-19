import React, { useEffect, useState } from 'react';
import { useConsent } from '../../context/ConsentContext';
import { useTranslation } from '../../context/LanguageContext';
import { AccessibleModal } from '../common/AccessibleModal';

export const CookieConsent: React.FC = () => {
  const { t } = useTranslation();
  const {
    preferences,
    hasResponded,
    isModalOpen,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useConsent();

  const [analyticsDraft, setAnalyticsDraft] = useState(preferences.analytics);
  const [marketingDraft, setMarketingDraft] = useState(preferences.marketing);

  useEffect(() => {
    setAnalyticsDraft(preferences.analytics);
    setMarketingDraft(preferences.marketing);
  }, [preferences, isModalOpen]);

  return (
    <>
      {/* Loi 25 Bottom Consent Banner with 3 equal-prominence options */}
      {!hasResponded && (
        <aside
          role="region"
          aria-label={t.cookies.bannerTitle}
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-base font-bold text-slate-900">
                {t.cookies.bannerTitle}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {t.cookies.bannerText}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                {t.cookies.rejectNonEssential}
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                {t.cookies.customize}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#082d22]"
              >
                {t.cookies.acceptAll}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Accessible Preferences Modal */}
      <AccessibleModal
        isOpen={isModalOpen}
        onClose={closePreferences}
        titleId="cookie-preferences-title"
        title={t.cookies.modalTitle}
        subtitle={t.cookies.modalIntro}
        maxWidthClass="max-w-xl"
      >
        <div className="space-y-4">
          {/* Strictly Necessary */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{t.cookies.necessaryTitle}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {t.cookies.necessaryDesc}
                </p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-[#0b3d2e]">
                {t.cookies.alwaysActive}
              </span>
            </div>
          </div>

          {/* Analytics Opt-in */}
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <label
                  htmlFor="cookie-analytics-switch"
                  className="text-sm font-bold text-slate-900"
                >
                  {t.cookies.analyticsTitle}
                </label>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {t.cookies.analyticsDesc}
                </p>
              </div>
              <button
                id="cookie-analytics-switch"
                type="button"
                role="switch"
                aria-checked={analyticsDraft}
                onClick={() => setAnalyticsDraft((v) => !v)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
                  analyticsDraft ? 'bg-[#0b3d2e]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    analyticsDraft ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Marketing Opt-in */}
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <label
                  htmlFor="cookie-marketing-switch"
                  className="text-sm font-bold text-slate-900"
                >
                  {t.cookies.marketingTitle}
                </label>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {t.cookies.marketingDesc}
                </p>
              </div>
              <button
                id="cookie-marketing-switch"
                type="button"
                role="switch"
                aria-checked={marketingDraft}
                onClick={() => setMarketingDraft((v) => !v)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
                  marketingDraft ? 'bg-[#0b3d2e]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    marketingDraft ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={rejectNonEssential}
            className="min-h-[44px] rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            {t.cookies.rejectNonEssential}
          </button>
          <button
            type="button"
            onClick={() => savePreferences(analyticsDraft, marketingDraft)}
            className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082d22]"
          >
            {t.cookies.savePreferences}
          </button>
        </div>
      </AccessibleModal>
    </>
  );
};
