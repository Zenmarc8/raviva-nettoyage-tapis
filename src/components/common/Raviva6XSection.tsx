import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useCms } from '../../context/CmsContext';

interface Raviva6XSectionProps {
  compact?: boolean;
}

export const Raviva6XSection: React.FC<Raviva6XSectionProps> = ({ compact = false }) => {
  const { locale, t } = useTranslation();
  const { exactContent } = useCms();
  const steps = exactContent.raviva6x;

  if (compact) {
    return (
      <section
        aria-labelledby="raviva-6x-compact-heading"
        className="mt-12 rounded-2xl border border-slate-200 bg-[#f4f7f5] p-6 sm:p-8"
      >
        <p className="text-xs font-bold text-[#146c43]">{t.raviva6x.kicker}</p>
        <h2
          id="raviva-6x-compact-heading"
          className="mt-1.5 font-display text-2xl font-bold tracking-tight text-slate-900"
        >
          {t.raviva6x.heading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.raviva6x.subheading}</p>

        <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <li
              key={`${step.letter}-${idx}`}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0b3d2e] font-display text-base font-extrabold text-white">
                  {step.letter}
                </span>
                <span className="text-xs font-semibold text-slate-500 tabular-nums">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="mt-3 font-display text-sm font-bold text-slate-900">
                {step.title[locale]}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {step.description[locale]}
              </p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      id="methode-raviva-6x"
      aria-labelledby="raviva-6x-heading"
      className="border-t border-slate-200 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#146c43]">{t.raviva6x.kicker}</p>
          <h2
            id="raviva-6x-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
          >
            {t.raviva6x.heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">{t.raviva6x.subheading}</p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <li
              key={`${step.letter}-${idx}`}
              className="flex flex-col rounded-xl border border-slate-200 bg-[#f4f7f5]/60 p-6 transition-colors hover:border-[#0b3d2e]/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0b3d2e] font-display text-xl font-extrabold text-white">
                  {step.letter}
                </span>
                <span className="font-mono text-xs font-bold text-slate-500 tabular-nums">
                  0{idx + 1} / 06
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                {step.title[locale]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description[locale]}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
