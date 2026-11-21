import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface RelatedLinksBlockProps {
  currentPath: string;
}

export const RelatedLinksBlock: React.FC<RelatedLinksBlockProps> = ({
  currentPath,
}) => {
  const { lang, articles } = useSite();

  const coreLinks =
    lang === 'fr'
      ? [
          {
            title: 'Services commerciaux directs (Raviva)',
            desc: 'Contrats directs et supervision complète pour bureaux, commerces et immeubles.',
            path: '/services-commerciaux',
          },
          {
            title: 'Services résidentiels (Partenaires vérifiés)',
            desc: 'Mise en relation transparente avec une entreprise partenaire indépendante.',
            path: '/services-residentiels',
          },
          {
            title: 'Zones desservies (Grand Montréal)',
            desc: 'Consultez les 75 municipalités couvertes par le réseau.',
            path: '/zones-desservies',
          },
          {
            title: 'Demander une soumission',
            desc: 'Choisissez votre parcours commercial ou résidentiel.',
            path: '/soumission',
          },
        ]
      : [
          {
            title: 'Direct Commercial Services (Raviva)',
            desc: 'Direct B2B contracts and full oversight for offices, retail, and buildings.',
            path: '/commercial-services',
          },
          {
            title: 'Residential Services (Verified Partners)',
            desc: 'Transparent matching with a verified independent local company.',
            path: '/residential-services',
          },
          {
            title: 'Service Areas (Greater Montreal)',
            desc: 'View all 75 Greater Montreal municipalities covered.',
            path: '/service-areas',
          },
          {
            title: 'Request a Quote',
            desc: 'Select your commercial or residential service pathway.',
            path: '/quote',
          },
        ];

  const publishedGuides = articles.slice(0, 2).map((a) => ({
    title: lang === 'fr' ? a.title_fr : a.title_en,
    desc: lang === 'fr' ? a.excerpt_fr : a.excerpt_en,
    path: `/guides/${lang === 'fr' ? a.slug_fr : a.slug_en}`,
  }));

  const items = [...coreLinks, ...publishedGuides]
    .filter((item) => item.path !== currentPath)
    .slice(0, 4);

  return (
    <section
      aria-labelledby="related-links-heading"
      className="mt-16 pt-12 border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="related-links-heading"
          className="text-xl font-semibold text-slate-900 mb-6"
        >
          {lang === 'fr'
            ? 'Services et guides connexes'
            : 'Related Services and Guides'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="group flex flex-col justify-between p-5 bg-white a11y-surface rounded-lg border border-slate-200 hover:border-slate-400 transition-colors"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:underline">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 a11y-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                {lang === 'fr' ? 'Consulter' : 'Explore'}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
