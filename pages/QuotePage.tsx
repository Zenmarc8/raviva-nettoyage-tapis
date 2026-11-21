import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building2, Home } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LeadForm } from '../components/LeadForm';
import { RelatedLinksBlock } from '../components/RelatedLinksBlock';
import { applyHeadSeo, buildBreadcrumbSchema } from '../lib/seo';
import type { LeadCategory } from '../types/database';

export const QuotePage: React.FC = () => {
  const { site, lang } = useSite();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType: LeadCategory =
    searchParams.get('type') === 'residential' ? 'residential' : 'commercial';
  const defaultCity = searchParams.get('city') || '';
  const [selectedType, setSelectedType] = useState<LeadCategory>(initialType);

  useEffect(() => {
    const paramType = searchParams.get('type');
    if (paramType === 'commercial' || paramType === 'residential') {
      setSelectedType(paramType);
    }
  }, [searchParams]);

  const handleSelectType = (nextType: LeadCategory) => {
    setSelectedType(nextType);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('type', nextType);
    setSearchParams(nextParams, { replace: true });
  };

  const breadcrumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    {
      label: lang === 'fr' ? 'Soumission' : 'Request a Quote',
      path: lang === 'fr' ? '/soumission' : '/quote',
    },
  ];

  useEffect(() => {
    applyHeadSeo(site, lang, {
      title:
        lang === 'fr'
          ? `Demander une soumission | ${site.brand_name}`
          : `Request a Quote | ${site.brand_name}`,
      description:
        lang === 'fr'
          ? 'Sélectionnez votre parcours : demande commerciale directe avec Raviva ou demande résidentielle transmise à un partenaire indépendant vérifié.'
          : 'Select your pathway: direct commercial request with Raviva or residential request matched with a verified independent partner.',
      pathFr: '/soumission',
      pathEn: '/quote',
      jsonLd: [buildBreadcrumbSchema(breadcrumbs)],
    });
  }, [site, lang]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        {lang === 'fr' ? 'Demander une soumission' : 'Request a Quote'}
      </h1>
      <p className="mt-3 text-base text-slate-600 a11y-muted">
        {lang === 'fr'
          ? 'Veuillez d’abord sélectionner la nature de votre demande afin d’appliquer le cadre contractuel approprié.'
          : 'Please first select the nature of your inquiry so the appropriate contractual framework is applied.'}
      </p>

      {/* Explicit Pathway Selector */}
      <div
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        role="radiogroup"
        aria-label={
          lang === 'fr' ? 'Choix du type de demande' : 'Select inquiry pathway'
        }
      >
        <button
          type="button"
          role="radio"
          aria-checked={selectedType === 'commercial'}
          onClick={() => handleSelectType('commercial')}
          className={`text-left p-5 rounded-lg border transition-colors ${
            selectedType === 'commercial'
              ? 'bg-white border-slate-900 ring-2 ring-slate-900'
              : 'bg-white border-slate-200 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-900">
            <Building2 className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>
              {lang === 'fr'
                ? 'Demande Commerciale (Contrat direct Raviva)'
                : 'Commercial Request (Direct Raviva Contract)'}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {lang === 'fr'
              ? 'Bureaux, commerces, immeubles et institutions. Raviva conclut le contrat et dirige directement les travaux.'
              : 'Offices, retail, buildings, and institutions. Raviva enters into the contract and oversees the work directly.'}
          </p>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={selectedType === 'residential'}
          onClick={() => handleSelectType('residential')}
          className={`text-left p-5 rounded-lg border transition-colors ${
            selectedType === 'residential'
              ? 'bg-white border-slate-900 ring-2 ring-slate-900'
              : 'bg-white border-slate-200 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-900">
            <Home className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>
              {lang === 'fr'
                ? 'Demande Résidentielle (Partenaire indépendant)'
                : 'Residential Request (Independent Partner)'}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {lang === 'fr'
              ? 'Maisons, condos et appartements. Mise en relation avec une entreprise partenaire indépendante vérifiée.'
              : 'Homes, condos, and apartments. Matching with a verified independent partner company.'}
          </p>
        </button>
      </div>

      <div className="mt-8">
        <LeadForm category={selectedType} defaultCity={defaultCity} />
      </div>

      <RelatedLinksBlock
        currentPath={lang === 'fr' ? '/soumission' : '/quote'}
      />
    </div>
  );
};
