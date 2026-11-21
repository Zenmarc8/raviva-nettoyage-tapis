import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedLinksBlock } from '../components/RelatedLinksBlock';
import {
  applyHeadSeo,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from '../lib/seo';

export const AboutPage: React.FC = () => {
  const { site, lang } = useSite();

  const breadcrumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    {
      label: lang === 'fr' ? 'À propos' : 'About',
      path: lang === 'fr' ? '/a-propos' : '/about',
    },
  ];

  useEffect(() => {
    applyHeadSeo(site, lang, {
      title:
        lang === 'fr'
          ? `À propos de ${site.brand_name} | ${site.city_or_region}`
          : `About ${site.brand_name} | ${site.city_or_region}`,
      description:
        lang === 'fr'
          ? `Découvrez l'approche opérationnelle de ${site.brand_name} : contrats commerciaux directs et mise en relation résidentielle transparente.`
          : `Learn about ${site.brand_name}'s operational model: direct commercial contracts and transparent residential partner matching.`,
      pathFr: '/a-propos',
      pathEn: '/about',
      jsonLd: [buildBreadcrumbSchema(breadcrumbs)],
    });
  }, [site, lang]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        {lang === 'fr' ? `À propos de ${site.brand_name}` : `About ${site.brand_name}`}
      </h1>
      <p className="mt-4 text-base text-slate-600 a11y-muted leading-relaxed">
        {lang === 'fr'
          ? `${site.brand_name} dessert la région ${site.city_or_region} avec une architecture opérationnelle conçue pour offrir clarté contractuelle et rigueur technique.`
          : `${site.brand_name} serves ${site.city_or_region} with an operating structure built around contractual clarity and technical rigor.`}
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 bg-white a11y-surface rounded-lg border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            {lang === 'fr' ? '01. Volet commercial direct' : '01. Direct Commercial Model'}
          </h2>
          <p className="mt-2.5 text-sm text-slate-600 a11y-muted leading-relaxed">
            {lang === 'fr'
              ? 'Dans le secteur commercial, Raviva agit comme fournisseur contractuel unique. Raviva conclut les contrats, planifie les interventions selon les horaires d’immeubles et dirige directement les travaux avec ses propres équipes ou des sous-traitants encadrés sous la responsabilité de Raviva.'
              : 'In the commercial sector, Raviva acts as the sole contractual provider. Raviva signs the contracts, coordinates schedules around building operations, and directs execution through its own crews or supervised subcontractors under Raviva’s direct responsibility.'}
          </p>
        </section>

        <section className="p-6 bg-white a11y-surface rounded-lg border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            {lang === 'fr'
              ? '02. Volet résidentiel transparent'
              : '02. Transparent Residential Model'}
          </h2>
          <p className="mt-2.5 text-sm text-slate-600 a11y-muted leading-relaxed">
            {lang === 'fr'
              ? 'Dans le secteur résidentiel, Raviva agit uniquement comme plateforme de commercialisation et de mise en relation. Une entreprise partenaire indépendante vérifiée — dont l’identité est communiquée au client au moment approprié — prépare la soumission, conclut le contrat, facture et exécute les travaux.'
              : 'In the residential sector, Raviva operates strictly as a marketing and matching platform. A verified independent partner company—whose identity is disclosed to the client at the appropriate time—prepares the quote, enters into the contract, bills, and completes the work.'}
          </p>
        </section>
      </div>

      <section className="mt-8 p-6 bg-white a11y-surface rounded-lg border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">
          {lang === 'fr' ? 'Coordonnées configurées du site' : 'Site Contact Details'}
        </h2>
        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-xs font-semibold text-slate-500">
              {lang === 'fr' ? 'Téléphone' : 'Phone'}
            </dt>
            <dd className="mt-1 font-medium text-slate-900 tabular-nums">{site.phone}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-500">
              {lang === 'fr' ? 'Courriel' : 'Email'}
            </dt>
            <dd className="mt-1 font-medium text-slate-900">{site.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-500">
              {lang === 'fr' ? 'Adresse' : 'Address'}
            </dt>
            <dd className="mt-1 font-medium text-slate-900">{site.address_display}</dd>
          </div>
        </dl>
      </section>

      <RelatedLinksBlock currentPath={lang === 'fr' ? '/a-propos' : '/about'} />
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const { site, lang } = useSite();

  const faqs =
    lang === 'fr'
      ? [
          {
            question:
              'Quelle est la différence entre un contrat commercial et une demande résidentielle chez Raviva ?',
            answer:
              'Pour le volet commercial, Raviva Nettoyage de tapis agit comme fournisseur contractuel unique, conclut le contrat et dirige directement les travaux. Pour le volet résidentiel, Raviva agit uniquement comme plateforme de commercialisation et de mise en relation ; une entreprise partenaire indépendante vérifiée (dont l’identité vous est communiquée au moment approprié) prépare la soumission, conclut le contrat, facture et exécute les travaux.',
          },
          {
            question:
              'Pourquoi la case de consentement est-elle obligatoire pour les demandes résidentielles ?',
            answer:
              'Conformément à la Loi 25 du Québec et à nos engagements de transparence, vos coordonnées résidentielles ne sont transmises à une entreprise partenaire indépendante vérifiée qu’avec votre consentement explicite, non pré-coché et horodaté.',
          },
          {
            question:
              'Quelle méthode de nettoyage est généralement recommandée pour un nettoyage en profondeur ?',
            answer:
              'L’extraction à l’eau chaude (souvent appelée à tort nettoyage à la vapeur), combinée au besoin à un roto-shampoing mécanique, est généralement la méthode de référence pour retirer les saletés incrustées et préserver les garanties des fabricants.',
          },
          {
            question: 'Quelles municipalités sont couvertes dans le Grand Montréal ?',
            answer: `Le réseau couvre ${site.served_municipalities.length} municipalités du Grand Montréal, incluant Montréal, Laval, Longueuil, Brossard, Terrebonne, Repentigny, Blainville, Vaudreuil-Dorion et les secteurs environnants.`,
          },
          {
            question: 'À quelle fréquence faut-il faire nettoyer des tapis ?',
            answer:
              'Selon l’achalandage et les conditions d’utilisation, un entretien en profondeur tous les 6 à 18 mois est généralement recommandé afin de limiter l’usure abrasive des fibres et maintenir la qualité de l’air intérieur.',
          },
        ]
      : [
          {
            question:
              'What is the difference between a commercial contract and a residential request at Raviva?',
            answer:
              'For commercial inquiries, Raviva Nettoyage de tapis acts as the sole contractual provider, enters into the contract, and directs the work. For residential inquiries, Raviva acts solely as a marketing and matching platform; a verified independent partner company (whose identity is disclosed at the appropriate time) prepares the quote, signs the contract, invoices, and completes the work.',
          },
          {
            question:
              'Why is the consent checkbox mandatory on residential quote forms?',
            answer:
              'In compliance with Quebec Law 25 and our transparency framework, your residential contact details are shared with a verified independent partner only with your explicit, non-prechecked, timestamped consent.',
          },
          {
            question:
              'Which cleaning method is typically recommended for deep carpet restoration?',
            answer:
              'Hot-water extraction (often referred to as steam cleaning), paired where needed with rotary mechanical agitation, is generally recommended by carpet manufacturers to flush out deeply embedded soil.',
          },
          {
            question: 'Which Greater Montreal municipalities are served?',
            answer: `Coverage spans ${site.served_municipalities.length} Greater Montreal municipalities including Montreal, Laval, Longueuil, Brossard, Terrebonne, Repentigny, Blainville, Vaudreuil-Dorion, and neighboring communities.`,
          },
          {
            question: 'How often should carpets be professionally cleaned?',
            answer:
              'Depending on foot traffic and usage conditions, professional deep cleaning every 6 to 18 months is generally recommended to reduce abrasive fiber wear and support indoor air quality.',
          },
        ];

  const breadcrumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    { label: 'FAQ', path: '/faq' },
  ];

  useEffect(() => {
    applyHeadSeo(site, lang, {
      title: `FAQ | ${site.brand_name}`,
      description:
        lang === 'fr'
          ? 'Réponses aux questions fréquentes sur le fonctionnement commercial et résidentiel de Raviva Nettoyage de tapis.'
          : 'Frequently asked questions about Raviva Nettoyage de tapis commercial contracts and residential partner matching.',
      pathFr: '/faq',
      pathEn: '/faq',
      jsonLd: [buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(faqs)],
    });
  }, [site, lang, faqs]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        {lang === 'fr' ? 'Foire aux questions' : 'Frequently Asked Questions'}
      </h1>
      <p className="mt-3 text-base text-slate-600 a11y-muted">
        {lang === 'fr'
          ? 'Précisions contractuelles, méthodes techniques et couverture régionale.'
          : 'Contractual clarity, technical methods, and regional coverage.'}
      </p>

      <div className="mt-10 space-y-4">
        {faqs.map((item, idx) => (
          <details
            key={idx}
            open={idx === 0}
            className="bg-white a11y-surface rounded-lg border border-slate-200 p-5"
          >
            <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
              <span>{item.question}</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600 a11y-muted leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-10 p-6 bg-white a11y-surface rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-900">
          {lang === 'fr'
            ? 'Prêt à soumettre votre projet commercial ou résidentiel ?'
            : 'Ready to submit your commercial or residential request?'}
        </p>
        <Link
          to={lang === 'fr' ? '/soumission' : '/quote'}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          {lang === 'fr' ? 'Aller au formulaire' : 'Go to Quote Form'}
        </Link>
      </div>

      <RelatedLinksBlock currentPath="/faq" />
    </div>
  );
};
