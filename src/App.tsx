import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ConsentProvider } from './context/ConsentContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ACTIVE_SERVICES } from './config/services.config';
import { REGIONS_CONFIG } from './config/locations.config';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CookieConsent } from './components/layout/CookieConsent';
import { QuickQuoteModal } from './components/quote/QuickQuoteModal';
import { HomePage } from './pages/HomePage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AreaDetailPage } from './pages/AreaDetailPage';
import { QuotePage } from './pages/QuotePage';
import { AboutPage, ContactPage, FaqPage } from './pages/SecondaryPages';
import {
  AccessibilityPage,
  CookiesPolicyPage,
  NotFoundPage,
  PrivacyPage,
  TermsPage,
} from './pages/LegalPages';

const RouteView: React.FC = () => {
  const { pathname } = useRouter();
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  if (normalized === '/' || normalized === '/index.html') {
    return <HomePage />;
  }
  if (normalized === '/a-propos') {
    return <AboutPage />;
  }
  if (normalized === '/soumission') {
    return <QuotePage />;
  }
  if (normalized === '/faq') {
    return <FaqPage />;
  }
  if (normalized === '/contact') {
    return <ContactPage />;
  }
  if (normalized === '/accessibilite') {
    return <AccessibilityPage />;
  }
  if (normalized === '/confidentialite') {
    return <PrivacyPage />;
  }
  if (normalized === '/temoins') {
    return <CookiesPolicyPage />;
  }
  if (normalized === '/conditions') {
    return <TermsPage />;
  }

  if (normalized === '/meubles-rembourres') {
    const matched = ACTIVE_SERVICES.find((s) => s.id === 'upholstery-sofas');
    if (matched) return <ServiceDetailPage service={matched} />;
  }
  if (normalized === '/enlevement-des-odeurs' || normalized === '/enlevement-odeurs') {
    const matched = ACTIVE_SERVICES.find((s) => s.id === 'pet-odor-urine');
    if (matched) return <ServiceDetailPage service={matched} />;
  }
  if (normalized === '/traitement-antibacterien' || normalized === '/antibacterien') {
    const matched = ACTIVE_SERVICES.find((s) => s.id === 'antibacterial-treatment');
    if (matched) return <ServiceDetailPage service={matched} />;
  }
  if (normalized === '/protecteur' || normalized === '/protecteur-antitaches') {
    const matched = ACTIVE_SERVICES.find((s) => s.id === 'eco-stain-protector');
    if (matched) return <ServiceDetailPage service={matched} />;
  }

  if (normalized.startsWith('/services/')) {
    const slug = normalized.replace('/services/', '');
    const aliasId = slug === 'elimination-odeurs-urine-animaux' ? 'pet-odor-urine' : null;
    const matched = ACTIVE_SERVICES.find((s) => s.slug === slug || (aliasId && s.id === aliasId));
    if (matched) {
      return <ServiceDetailPage service={matched} />;
    }
  }

  if (normalized.startsWith('/secteurs/')) {
    const slug = normalized.replace('/secteurs/', '');
    const matchedRegion = REGIONS_CONFIG.find((r) => r.slug === slug);
    if (matchedRegion) {
      return <AreaDetailPage region={matchedRegion} />;
    }
  }

  return <NotFoundPage />;
};

export default function App() {
  return (
    <LanguageProvider>
      <ConsentProvider>
        <RouterProvider>
          <div className="flex min-h-screen flex-col bg-white text-slate-900">
            <Header />
            <main id="main-content" className="flex-1 focus:outline-none">
              <RouteView />
            </main>
            <Footer />
            <QuickQuoteModal />
            <CookieConsent />
          </div>
        </RouterProvider>
      </ConsentProvider>
    </LanguageProvider>
  );
}
