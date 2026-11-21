import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Home, MapPin, ShieldCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { SeoImage } from '../components/SeoImage';
import {
  applyHeadSeo,
  buildLocalBusinessSchema,
  buildServiceSchema,
} from '../lib/seo';

export const HomePage: React.FC = () => {
  const { site, lang, media, articles } = useSite();
  const hero = lang === 'fr' ? site.hero_fr : site.hero_en;
  const seo = lang === 'fr' ? site.seo_meta_fr : site.seo_meta_en;

  const heroMedia = media.find((m) => m.category === 'general') || media[0];
  const portfolioPreview = media.filter((m) => m.category === 'portfolio').slice(0, 3);

  useEffect(() => {
    applyHeadSeo(site, lang, {
      title: seo.site_title,
      description: seo.meta_description,
      pathFr: '/',
      pathEn: '/',
      ogImage: heroMedia?.file_url,
      jsonLd: [
        buildLocalBusinessSchema(site),
        buildServiceSchema(
          site,
          lang === 'fr'
            ? 'Nettoyage de tapis commercial (Contrat direct Raviva)'
            : 'Commercial Carpet Cleaning (Direct Raviva Contract)',
          hero.commercial_summary,
          'Commercial'
        ),
        buildServiceSchema(
          site,
          lang === 'fr'
            ? 'Nettoyage de tapis résidentiel (Partenaires indépendants)'
            : 'Residential Carpet Cleaning (Independent Partners)',
          hero.residential_summary,
          'Residential'
        ),
      ],
    });
  }, [site, lang, seo, hero, heroMedia]);

  const commercialPath = lang === 'fr' ? '/services-commerciaux' : '/commercial-services';
  const residentialPath = lang === 'fr' ? '/services-residentiels' : '/residential-services';
  const quotePath = lang === 'fr' ? '/soumission' : '/quote';
  const projectsPath = lang === 'fr' ? '/realisations' : '/projects';
  const areasPath = lang === 'fr' ? '/zones-desservies' : '/service-areas';

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white a11y-surface border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-wide text-slate-600 a11y-muted">
                {hero.eyebrow}
              </p>
              <h1
                className="mt-3 font-display font-bold tracking-tight text-slate-900 leading-[1.12]"
                style={{
                  fontSize: 'clamp(2.1rem, 3.6vw, 3.25rem)',
                  textWrap: 'balance',
                }}
              >
                {hero.headline}
              </h1>
              <p className="mt-5 text-base text-slate-600 a11y-muted leading-relaxed max-w-xl">
                {hero.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={quotePath}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  {hero.primary_cta}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href="#operational-models"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-800 border border-slate-300 bg-white hover:bg-slate-50 whitespace-nowrap"
                >
                  {hero.secondary_cta}
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                <SeoImage
                  media={heroMedia}
                  priority
                  className="w-full h-full object-cover aspect-video lg:aspect-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Separation: Commercial Raviva vs Residential Partners */}
      <section
        id="operational-models"
        aria-labelledby="models-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-2xl">
          <h2 id="models-heading" className="text-2xl sm:text-3xl font-bold text-slate-900">
            {lang === 'fr'
              ? 'Deux modèles opérationnels distincts et transparents'
              : 'Two Distinct, Transparent Operating Models'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 a11y-muted">
            {lang === 'fr'
              ? 'Chaque demande suit un cadre contractuel précis afin que vous sachiez toujours exactement qui prépare le devis, signe le contrat et exécute le nettoyage.'
              : 'Each request follows a clear contractual framework so you always know exactly who prepares the estimate, signs the contract, and performs the cleaning.'}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Commercial Card */}
          <article className="bg-white a11y-surface rounded-lg border border-slate-200 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Building2
                  className="w-5 h-5 text-slate-900 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold text-slate-600 a11y-muted">
                  {lang === 'fr'
                    ? '01. Volet B2B · Gestion directe'
                    : '01. B2B Track · Direct Management'}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {lang === 'fr'
                  ? 'Commercial — Contrat direct avec Raviva'
                  : 'Commercial — Direct Contract with Raviva'}
              </h3>
              <p className="mt-3 text-sm text-slate-600 a11y-muted leading-relaxed">
                {hero.commercial_summary}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <ShieldCheck
                    className="w-4 h-4 text-slate-700 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>
                    {lang === 'fr'
                      ? 'Fournisseur contractuel unique : Raviva conclut le contrat commercial.'
                      : 'Sole contractual provider: Raviva enters into the commercial contract.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck
                    className="w-4 h-4 text-slate-700 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>
                    {lang === 'fr'
                      ? 'Équipes propres ou sous-traitants encadrés sous la responsabilité directe de Raviva.'
                      : 'Own teams or supervised subcontractors under Raviva’s direct responsibility.'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              <Link
                to={commercialPath}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline"
              >
                {lang === 'fr'
                  ? 'Voir l’offre commerciale'
                  : 'View Commercial Services'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to={`${quotePath}?type=commercial`}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white whitespace-nowrap"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                {lang === 'fr' ? 'Soumission B2B' : 'B2B Quote'}
              </Link>
            </div>
          </article>

          {/* Residential Card */}
          <article className="bg-white a11y-surface rounded-lg border border-slate-200 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-slate-900 shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-600 a11y-muted">
                  {lang === 'fr'
                    ? '02. Volet B2C · Mise en relation vérifiée'
                    : '02. B2C Track · Verified Partner Matching'}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {lang === 'fr'
                  ? 'Résidentiel — Entreprise partenaire indépendante'
                  : 'Residential — Independent Partner Company'}
              </h3>
              <p className="mt-3 text-sm text-slate-600 a11y-muted leading-relaxed">
                {hero.residential_summary}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <ShieldCheck
                    className="w-4 h-4 text-slate-700 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>
                    {lang === 'fr'
                      ? 'Divulgation claire : l’identité du partenaire vérifié est communiquée au moment approprié.'
                      : 'Clear disclosure: the verified partner’s identity is shared at the appropriate time.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck
                    className="w-4 h-4 text-slate-700 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>
                    {lang === 'fr'
                      ? 'Consentement explicite requis (Loi 25) avant le transfert de votre demande.'
                      : 'Explicit consent required (Law 25) prior to sharing your inquiry.'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              <Link
                to={residentialPath}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline"
              >
                {lang === 'fr'
                  ? 'Voir le service résidentiel'
                  : 'View Residential Services'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to={`${quotePath}?type=residential`}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white whitespace-nowrap"
                style={{ backgroundColor: 'var(--brand-secondary)' }}
              >
                {lang === 'fr' ? 'Demande résidentielle' : 'Residential Request'}
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Cleaning Methods Overview */}
      <section className="bg-white a11y-surface border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {lang === 'fr'
                ? 'Méthodes adaptées à chaque fibre et revêtement'
                : 'Cleaning Methods Matched to Each Fiber & Surface'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 a11y-muted">
              {lang === 'fr'
                ? 'Du nettoyage en profondeur par extraction à l’eau chaude jusqu’aux procédés à faible humidité ou spécialisés pour meubles et cuirs.'
                : 'From deep hot-water extraction to low-moisture interim processes and delicate upholstery or leather care.'}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-slate-200 bg-slate-50 a11y-surface">
              <h3 className="text-base font-semibold text-slate-900">
                {lang === 'fr'
                  ? '01. Extraction à l’eau chaude et roto-shampoing'
                  : '01. Hot-Water Extraction & Rotary Agitation'}
              </h3>
              <p className="mt-2.5 text-sm text-slate-600 a11y-muted leading-relaxed">
                {lang === 'fr'
                  ? 'Méthode recommandée par la majorité des manufacturiers pour déloger les saletés incrustées jusqu’à la base des fibres sans résidus collants.'
                  : 'Recommended by major flooring manufacturers to flush deeply embedded grit and soil from the yarn base without sticky residue.'}
              </p>
            </div>

            <div className="p-6 rounded-lg border border-slate-200 bg-slate-50 a11y-surface">
              <h3 className="text-base font-semibold text-slate-900">
                {lang === 'fr'
                  ? '02. Entretien intermédiaire à sec ou faible humidité'
                  : '02. Low-Moisture & Dry Interim Systems'}
              </h3>
              <p className="mt-2.5 text-sm text-slate-600 a11y-muted leading-relaxed">
                {lang === 'fr'
                  ? 'Mousse sèche, bonnet rotatif, encapsulation ou poudre sèche lorsque la rapidité de remise en service ou la sensibilité de la fibre l’exige.'
                  : 'Dry foam, rotary bonnet, encapsulation, or dry compound powder when fast drying or moisture sensitivity is critical.'}
              </p>
            </div>

            <div className="p-6 rounded-lg border border-slate-200 bg-slate-50 a11y-surface">
              <h3 className="text-base font-semibold text-slate-900">
                {lang === 'fr'
                  ? '03. Ameublement délicat, Dry-Wet-Dry et cuir'
                  : '03. Delicate Upholstery, Dry-Wet-Dry & Leather'}
              </h3>
              <p className="mt-2.5 text-sm text-slate-600 a11y-muted leading-relaxed">
                {lang === 'fr'
                  ? 'Sélection rigoureuse selon les codes textiles : extraction contrôlée, solvant, éponge de mer naturelle et conditionnement hydratant du cuir.'
                  : 'Method tailored to fabric care codes: controlled aqueous extraction, dry solvent, natural sea sponge foam, and leather conditioning.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      {portfolioPreview.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {lang === 'fr' ? 'Aperçu des réalisations' : 'Featured Work'}
              </h2>
              <p className="mt-2 text-sm text-slate-600 a11y-muted">
                {lang === 'fr'
                  ? 'Exemples d’interventions commerciales et résidentielles sur tapis, escaliers et mobilier.'
                  : 'Commercial and residential projects across office carpeting, stair runners, and living spaces.'}
              </p>
            </div>
            <Link
              to={projectsPath}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:underline"
            >
              {lang === 'fr' ? 'Voir la galerie complète' : 'View full gallery'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {portfolioPreview.map((item) => {
              const isVertical = item.height > item.width;
              return (
                <article
                  key={item.id}
                  className="bg-white a11y-surface rounded-lg border border-slate-200 overflow-hidden"
                >
                  <div
                    className={`w-full overflow-hidden bg-slate-100 ${
                      isVertical ? 'aspect-[3/4]' : 'aspect-[4/3]'
                    }`}
                  >
                    <SeoImage
                      media={item}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-slate-500 a11y-muted">
                      {item.work_type === 'commercial'
                        ? lang === 'fr'
                          ? 'Commercial · Raviva'
                          : 'Commercial · Raviva'
                        : lang === 'fr'
                        ? 'Résidentiel · Partenaire indépendant'
                        : 'Residential · Independent Partner'}
                    </div>
                    <h3 className="mt-1.5 text-base font-semibold text-slate-900">
                      {lang === 'fr' ? item.title_fr : item.title_en}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 a11y-muted leading-relaxed">
                      {lang === 'fr' ? item.caption_fr : item.caption_en}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Guides Excerpt */}
      <section className="bg-white a11y-surface border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {lang === 'fr' ? 'Guides conseils techniques' : 'Technical Care Guides'}
              </h2>
              <p className="mt-2 text-sm text-slate-600 a11y-muted">
                {lang === 'fr'
                  ? 'Ressources pratiques sur le choix d’un prestataire et les méthodes d’entretien textile.'
                  : 'Practical guidance on provider selection, fiber science, and carpet maintenance.'}
              </p>
            </div>
            <Link
              to="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:underline"
            >
              {lang === 'fr' ? 'Tous les guides' : 'All guides'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map((article) => {
              const slug = lang === 'fr' ? article.slug_fr : article.slug_en;
              return (
                <article
                  key={article.id}
                  className="p-6 rounded-lg border border-slate-200 bg-slate-50 a11y-surface flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 a11y-muted">
                      <span>
                        {lang === 'fr' ? article.category_fr : article.category_en}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {article.reading_time_min}{' '}
                        {lang === 'fr' ? 'min de lecture' : 'min read'}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-lg font-semibold text-slate-900">
                      <Link to={`/guides/${slug}`} className="hover:underline">
                        {lang === 'fr' ? article.title_fr : article.title_en}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 a11y-muted leading-relaxed">
                      {lang === 'fr' ? article.excerpt_fr : article.excerpt_en}
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link
                      to={`/guides/${slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:underline"
                    >
                      {lang === 'fr' ? 'Lire le guide' : 'Read guide'}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Greater Montreal Coverage Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 bg-white a11y-surface rounded-lg border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 a11y-muted">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{site.city_or_region}</span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {lang === 'fr'
                ? `${site.served_municipalities.length} municipalités desservies`
                : `${site.served_municipalities.length} Municipalities Served`}
            </h2>
            <p className="mt-2 text-sm text-slate-600 a11y-muted">
              {site.served_municipalities.slice(0, 12).join(', ')}{' '}
              {lang === 'fr' ? 'et les secteurs environnants.' : 'and surrounding communities.'}
            </p>
          </div>
          <Link
            to={areasPath}
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-900 hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            {lang === 'fr' ? 'Consulter les 75 zones' : 'View all 75 areas'}
          </Link>
        </div>
      </section>
    </div>
  );
};
