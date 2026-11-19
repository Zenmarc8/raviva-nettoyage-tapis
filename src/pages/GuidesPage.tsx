import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Phone, UserCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { useTranslation } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/seo/SeoHead';

interface GuidesPageProps {
  slug?: string;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ slug }) => {
  const { locale, t } = useTranslation();
  const { navigate, openQuoteModal } = useRouter();
  const { publishedGuides, guides } = useCms();

  if (slug) {
    const matched = guides.find((g) => g.slug === slug && g.status === 'published');

    if (!matched) {
      return (
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-2xl font-bold text-slate-900">
            {locale === 'fr' ? 'Guide introuvable ou en cours de rédaction' : 'Guide not found or draft'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {locale === 'fr'
              ? 'Cet article est actuellement en mode brouillon dans l’administration (/dashboard).'
              : 'This guide is currently set to draft in the admin console (/dashboard).'}
          </p>
          <a
            href="/guides"
            onClick={(e) => {
              e.preventDefault();
              navigate('/guides');
            }}
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0b3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{locale === 'fr' ? 'Retour aux guides' : 'Back to guides'}</span>
          </a>
        </div>
      );
    }

    return (
      <>
        <SeoHead
          pageTitle={`${matched.title[locale]} | ${SITE_CONFIG.companyName}`}
          pageDescription={matched.excerpt[locale]}
          article={matched}
          breadcrumbs={[
            { name: t.nav.home, url: '/' },
            { name: t.nav.guides, url: '/guides' },
            { name: matched.title[locale], url: `/guides/${matched.slug}` },
          ]}
        />

        <article className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav aria-label={t.a11y.breadcrumbLabel} className="mb-6 text-xs text-slate-600">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                    }}
                    className="hover:text-[#0b3d2e] hover:underline"
                  >
                    {t.nav.home}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a
                    href="/guides"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/guides');
                    }}
                    className="hover:text-[#0b3d2e] hover:underline"
                  >
                    {t.nav.guides}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-slate-900">
                  {matched.category[locale]}
                </li>
              </ol>
            </nav>

            <p className="text-sm font-semibold text-[#146c43]">{matched.category[locale]}</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
              {matched.title[locale]}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-5 border-y border-slate-200 py-3.5 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                <UserCheck className="h-4 w-4 text-[#0b3d2e]" aria-hidden="true" />
                {matched.authorName} · {SITE_CONFIG.founderExperienceYears}+ {locale === 'fr' ? 'ans terrain' : 'years field exp.'}
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Calendar className="h-4 w-4 text-[#146c43]" aria-hidden="true" />
                {matched.publishedAt}
              </span>
            </div>

            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-800">
              {matched.excerpt[locale]}
            </p>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
              {matched.paragraphs[locale].map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {matched.internal_links.length > 0 && (
              <div className="mt-10 rounded-xl border border-slate-200 bg-[#f4f7f5] p-6">
                <h2 className="font-display text-base font-bold text-slate-900">
                  {locale === 'fr' ? 'Pages et services liés' : 'Related Services & Pages'}
                </h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {matched.internal_links.map((link) => (
                    <a
                      key={link.to}
                      href={link.to}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.to);
                      }}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#0b3d2e] hover:border-[#0b3d2e]"
                    >
                      <span>{locale === 'fr' ? link.labelFr : link.labelEn}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <a
                href="/guides"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/guides');
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#0b3d2e]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>{locale === 'fr' ? 'Tous les guides Raviva' : 'All Raviva Guides'}</span>
              </a>
              <div className="flex flex-wrap gap-3">
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
        </article>
      </>
    );
  }

  return (
    <>
      <SeoHead
        pageTitle={`${t.nav.guides} | ${SITE_CONFIG.companyName}`}
        pageDescription={
          locale === 'fr'
            ? 'Guides pratiques rédigés par Marc Lemonnier (35+ ans d’expérience) sur le nettoyage de tapis, cuir, odeurs et dégât d’eau.'
            : 'Practical guides written by Marc Lemonnier (35+ years experience) on carpet, leather, odor, and water damage care.'
        }
        breadcrumbs={[
          { name: t.nav.home, url: '/' },
          { name: t.nav.guides, url: '/guides' },
        ]}
      />

      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#146c43]">
              {locale === 'fr' ? 'Conseils d’artisan · 35+ ans terrain' : 'Craftsman Guides · 35+ Years Field Experience'}
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t.nav.guides}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {locale === 'fr'
                ? 'Articles éducatifs rédigés sur la base de nos protocoles réels : pré-inspection gratuite, absence de frais cachés pour déplacer les meubles standards, produits biodégradables et double extraction.'
                : 'Educational guides grounded in our real protocols: free pre-inspection, zero hidden fees for moving standard furniture, biodegradable products, and double extraction.'}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {publishedGuides.map((guide) => (
              <article
                key={guide.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f4f7f5]/50 p-6 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#146c43]">
                    <span>{guide.category[locale]}</span>
                    <span className="text-slate-500 tabular-nums">{guide.publishedAt}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold text-slate-900">
                    <a
                      href={`/guides/${guide.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/guides/${guide.slug}`);
                      }}
                      className="hover:text-[#0b3d2e] hover:underline"
                    >
                      {guide.title[locale]}
                    </a>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {guide.excerpt[locale]}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-xs font-medium text-slate-600">{guide.authorName}</span>
                  <a
                    href={`/guides/${guide.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/guides/${guide.slug}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b3d2e] hover:underline"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    <span>{locale === 'fr' ? 'Lire le guide' : 'Read guide'}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600">
            {locale === 'fr'
              ? `${guides.length - publishedGuides.length} autres guides brouillons sont prêts à être révisés et publiés dans l’espace d’administration (/dashboard).`
              : `${guides.length - publishedGuides.length} additional draft guides are ready to review and publish in the admin console (/dashboard).`}
          </div>
        </div>
      </div>
    </>
  );
};
