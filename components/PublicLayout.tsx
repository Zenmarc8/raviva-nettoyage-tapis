import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, Globe, Menu, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { AccessibilityPanel } from './AccessibilityPanel';

const ROUTE_PAIRS: Array<{ fr: string; en: string }> = [
  { fr: '/', en: '/' },
  { fr: '/services-commerciaux', en: '/commercial-services' },
  { fr: '/services-residentiels', en: '/residential-services' },
  { fr: '/realisations', en: '/projects' },
  { fr: '/guides', en: '/guides' },
  { fr: '/zones-desservies', en: '/service-areas' },
  { fr: '/a-propos', en: '/about' },
  { fr: '/faq', en: '/faq' },
  { fr: '/soumission', en: '/quote' },
  { fr: '/politique-confidentialite', en: '/privacy-policy' },
  { fr: '/conditions-utilisation', en: '/terms-of-use' },
];

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    site,
    allSites,
    lang,
    setLang,
    articles,
    isLocalPreview,
    switchPreviewDomain,
  } = useSite();
  const location = useLocation();
  const navigate = useNavigate();
  const [a11yOpen, setA11yOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleLanguage = () => {
    const nextLang = lang === 'fr' ? 'en' : 'fr';
    setLang(nextLang);

    const currentPath = location.pathname;
    if (currentPath.startsWith('/guides/')) {
      const slug = currentPath.replace('/guides/', '');
      const matched = articles.find(
        (a) => a.slug_fr === slug || a.slug_en === slug
      );
      if (matched) {
        navigate(`/guides/${nextLang === 'fr' ? matched.slug_fr : matched.slug_en}`);
        return;
      }
    }

    const pair = ROUTE_PAIRS.find(
      (p) => p.fr === currentPath || p.en === currentPath
    );
    if (pair) {
      navigate(nextLang === 'fr' ? pair.fr : pair.en);
    }
  };

  const navLinks =
    lang === 'fr'
      ? [
          { label: 'Commercial', to: '/services-commerciaux' },
          { label: 'Résidentiel', to: '/services-residentiels' },
          { label: 'Réalisations', to: '/realisations' },
          { label: 'Guides', to: '/guides' },
          { label: 'Zones', to: '/zones-desservies' },
        ]
      : [
          { label: 'Commercial', to: '/commercial-services' },
          { label: 'Residential', to: '/residential-services' },
          { label: 'Projects', to: '/projects' },
          { label: 'Guides', to: '/guides' },
          { label: 'Areas', to: '/service-areas' },
        ];

  const quotePath = lang === 'fr' ? '/soumission' : '/quote';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <a href="#main-content" className="skip-link">
        {lang === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>

      {/* Local-only Multi-Site Preview Switcher (never rendered on production custom domains) */}
      {isLocalPreview && allSites.length > 0 && (
        <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <span className="font-medium">
              {lang === 'fr'
                ? 'Prévisualisation locale du domaine :'
                : 'Local domain preview:'}{' '}
              <strong className="font-mono-tabular text-white">{site.domain}</strong>
            </span>
            {allSites.length > 1 && (
              <label className="flex items-center gap-2">
                <span className="sr-only">
                  {lang === 'fr' ? 'Choisir un domaine local' : 'Select local domain'}
                </span>
                <select
                  value={site.domain}
                  onChange={(e) => void switchPreviewDomain(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-700 rounded px-2.5 py-1 text-xs"
                >
                  {allSites.map((s) => (
                    <option key={s.id} value={s.domain}>
                      {s.domain} ({s.city_or_region})
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm a11y-surface border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Brand Logo & Title */}
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 min-w-0 font-display text-sm sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink"
          >
            <img
              src={
                site.logo_data.image_url ||
                '/assets/aistudio/Gemini_Generated_Image_jwdcxyjwdcxyjwdc_9a57b113.jpg'
              }
              alt={
                lang === 'fr'
                  ? site.logo_data.alt_fr || site.brand_name
                  : site.logo_data.alt_en || site.brand_name
              }
              width={40}
              height={40}
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded bg-white shrink-0"
            />
            <span className="truncate">
              {site.logo_data.wordmark || site.brand_name}
            </span>
          </Link>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav
            aria-label={lang === 'fr' ? 'Navigation principale' : 'Primary navigation'}
            className="hidden lg:flex items-center gap-6"
          >
            {navLinks.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
                    active
                      ? 'text-slate-900 underline underline-offset-4'
                      : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Language + Accessibility + Primary CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleToggleLanguage}
              aria-label={
                lang === 'fr' ? 'Switch to English' : 'Passer en français'
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <button
              type="button"
              onClick={() => setA11yOpen(true)}
              aria-label={
                lang === 'fr'
                  ? 'Ouvrir les options d’accessibilité'
                  : 'Open accessibility options'
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
            >
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">
                {lang === 'fr' ? 'Accessibilité' : 'Accessibility'}
              </span>
            </button>

            <Link
              to={quotePath}
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              {lang === 'fr' ? 'Soumission' : 'Quote'}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={lang === 'fr' ? 'Menu mobile' : 'Mobile menu'}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label={lang === 'fr' ? 'Menu mobile' : 'Mobile navigation'}
            className="lg:hidden bg-white a11y-surface border-t border-slate-200 px-4 py-4 space-y-2"
          >
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={quotePath}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm font-semibold text-white text-center"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              {lang === 'fr' ? 'Demander une soumission' : 'Request a Quote'}
            </Link>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 a11y-dark-surface text-slate-300 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="inline-flex items-center gap-3">
                <img
                  src={
                    site.logo_data.image_url ||
                    '/assets/aistudio/Gemini_Generated_Image_jwdcxyjwdcxyjwdc_9a57b113.jpg'
                  }
                  alt={
                    lang === 'fr'
                      ? site.logo_data.alt_fr || site.brand_name
                      : site.logo_data.alt_en || site.brand_name
                  }
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain rounded-md bg-white p-0.5 shrink-0"
                />
                <span className="font-display text-base font-bold text-white">
                  {site.brand_name}
                </span>
              </Link>
              <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
                {site.city_or_region}
              </p>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                {lang === 'fr'
                  ? 'Commercial : fournisseur contractuel direct. Résidentiel : plateforme de mise en relation avec partenaires indépendants vérifiés.'
                  : 'Commercial: direct contractual provider. Residential: matching platform with verified independent partners.'}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-3">
                {lang === 'fr' ? 'Services et secteurs' : 'Services & Coverage'}
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to={lang === 'fr' ? '/services-commerciaux' : '/commercial-services'}
                    className="hover:text-white transition-colors"
                  >
                    {lang === 'fr' ? 'Services commerciaux' : 'Commercial Services'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={lang === 'fr' ? '/services-residentiels' : '/residential-services'}
                    className="hover:text-white transition-colors"
                  >
                    {lang === 'fr' ? 'Services résidentiels' : 'Residential Services'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={lang === 'fr' ? '/realisations' : '/projects'}
                    className="hover:text-white transition-colors"
                  >
                    {lang === 'fr' ? 'Réalisations' : 'Projects'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={lang === 'fr' ? '/zones-desservies' : '/service-areas'}
                    className="hover:text-white transition-colors"
                  >
                    {lang === 'fr' ? 'Zones desservies' : 'Service Areas'}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-3">
                {lang === 'fr' ? 'Informations' : 'Information'}
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/guides" className="hover:text-white transition-colors">
                    {lang === 'fr' ? 'Guides conseils' : 'Care Guides'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={lang === 'fr' ? '/a-propos' : '/about'}
                    className="hover:text-white transition-colors"
                  >
                    {lang === 'fr' ? 'À propos' : 'About'}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      lang === 'fr'
                        ? '/politique-confidentialite'
                        : '/privacy-policy'
                    }
                    className="hover:text-white transition-colors"
                  >
                    {lang === 'fr' ? 'Confidentialité (Loi 25)' : 'Privacy Policy (Law 25)'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={lang === 'fr' ? '/conditions-utilisation' : '/terms-of-use'}
                    className="hover:text-white transition-colors"
                  >
                    {lang === 'fr' ? 'Conditions d’utilisation' : 'Terms of Use'}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-3">
                {lang === 'fr' ? 'Coordonnées' : 'Contact'}
              </p>
              <dl className="space-y-2 text-xs text-slate-400">
                <div>
                  <dt className="inline font-medium text-slate-300">
                    {lang === 'fr' ? 'Téléphone : ' : 'Phone: '}
                  </dt>
                  <dd className="inline tabular-nums">{site.phone}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-slate-300">
                    {lang === 'fr' ? 'Courriel : ' : 'Email: '}
                  </dt>
                  <dd className="inline">{site.email}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-slate-300">
                    {lang === 'fr' ? 'Adresse : ' : 'Address: '}
                  </dt>
                  <dd className="inline">{site.address_display}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} {site.brand_name}.{' '}
              {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </p>
            <p className="font-mono-tabular">{site.domain}</p>
          </div>
        </div>
      </footer>

      <AccessibilityPanel isOpen={a11yOpen} onClose={() => setA11yOpen(false)} />
    </div>
  );
};
