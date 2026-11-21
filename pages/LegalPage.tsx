import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { applyHeadSeo, buildBreadcrumbSchema } from '../lib/seo';

interface LegalPageProps {
  mode: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ mode }) => {
  const { site, lang } = useSite();
  const legal = lang === 'fr' ? site.legal_fr : site.legal_en;

  const isPrivacy = mode === 'privacy';
  const title = isPrivacy ? legal.privacy_title : legal.terms_title;
  const updated = isPrivacy ? legal.privacy_updated : legal.terms_updated;
  const sections = isPrivacy ? legal.privacy_sections : legal.terms_sections;

  const pathFr = isPrivacy ? '/politique-confidentialite' : '/conditions-utilisation';
  const pathEn = isPrivacy ? '/privacy-policy' : '/terms-of-use';

  const breadcrumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    { label: title, path: lang === 'fr' ? pathFr : pathEn },
  ];

  useEffect(() => {
    applyHeadSeo(site, lang, {
      title: `${title} | ${site.brand_name}`,
      description: sections[0]?.body.slice(0, 155) || title,
      pathFr,
      pathEn,
      jsonLd: [buildBreadcrumbSchema(breadcrumbs)],
    });
  }, [site, lang, title, pathFr, pathEn, sections]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white a11y-surface rounded-lg border border-slate-200 p-6 sm:p-10">
        <p className="text-xs font-medium text-slate-500 a11y-muted">{updated}</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <div className="mt-8 space-y-6">
          {sections.map((sec, idx) => (
            <section key={idx} className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">{sec.heading}</h2>
              <p className="text-sm text-slate-700 a11y-muted leading-relaxed">
                {sec.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
