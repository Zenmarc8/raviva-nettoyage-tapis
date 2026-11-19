import React from 'react';
import { Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { useCms } from '../../context/CmsContext';
import { SeoImage } from './SeoImage';

export const AccreditationsSection: React.FC = () => {
  const { locale, t } = useTranslation();
  const { navigate } = useRouter();
  const { diplomaItems, exactContent } = useCms();

  return (
    <section
      aria-labelledby="accreditations-heading"
      className="border-t border-slate-200 bg-[#f4f7f5] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#146c43]">{t.accreditationsSection.kicker}</p>
            <h2
              id="accreditations-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]"
            >
              {t.accreditationsSection.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {exactContent.operator.accreditationDescription[locale]}
            </p>
          </div>
          <a
            href="/realisations"
            onClick={(e) => {
              e.preventDefault();
              navigate('/realisations');
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            <span>{t.accreditationsSection.viewGalleryCta}</span>
            <ArrowRight className="h-4 w-4 text-[#0b3d2e]" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0b3d2e] text-white">
                <Award className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {t.accreditationsSection.iicrcTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {exactContent.operator.accreditationDescription[locale]}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0b3d2e] text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {exactContent.operator.mainGuarantee[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {exactContent.operator.positioning[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {diplomaItems.length > 0 && (
          <div className="mt-10">
            <h3 className="font-display text-lg font-bold text-slate-900">
              {locale === 'fr' ? 'Diplômes & Accréditations' : 'Diplomas & Accreditations'}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {diplomaItems.map((item) => (
                <figure
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <SeoImage
                    src={item.src}
                    alt={item.alt[locale]}
                    caption={item.caption[locale]}
                    aspectRatio="4/3"
                    width={1200}
                    height={900}
                    imgClassName="object-contain bg-slate-50 p-2"
                  />
                  <figcaption className="border-t border-slate-100 p-4">
                    <div className="font-display text-sm font-bold text-slate-900">
                      {item.title[locale]}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {item.caption[locale]}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
