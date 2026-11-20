import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { PublicLayout } from './components/PublicLayout';
import { HomePage } from './pages/HomePage';
import { CommercialServicesPage } from './pages/CommercialServicesPage';
import { ResidentialServicesPage } from './pages/ResidentialServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { GuidesIndexPage } from './pages/GuidesIndexPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { AboutPage, FaqPage } from './pages/AboutFaqPage';
import { QuotePage } from './pages/QuotePage';
import { LegalPage } from './pages/LegalPage';
import { DashboardPage } from './pages/DashboardPage';

function withPublicLayout(element: React.ReactNode) {
  return <PublicLayout>{element}</PublicLayout>;
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={withPublicLayout(<HomePage />)} />

          {/* Commercial (FR / EN) */}
          <Route
            path="/services-commerciaux"
            element={withPublicLayout(<CommercialServicesPage />)}
          />
          <Route
            path="/commercial-services"
            element={withPublicLayout(<CommercialServicesPage />)}
          />

          {/* Residential (FR / EN) */}
          <Route
            path="/services-residentiels"
            element={withPublicLayout(<ResidentialServicesPage />)}
          />
          <Route
            path="/residential-services"
            element={withPublicLayout(<ResidentialServicesPage />)}
          />

          {/* Projects / Realisations */}
          <Route
            path="/realisations"
            element={withPublicLayout(<ProjectsPage />)}
          />
          <Route path="/projects" element={withPublicLayout(<ProjectsPage />)} />

          {/* Guides */}
          <Route path="/guides" element={withPublicLayout(<GuidesIndexPage />)} />
          <Route
            path="/guides/:slug"
            element={withPublicLayout(<GuideDetailPage />)}
          />

          {/* Service Areas */}
          <Route
            path="/zones-desservies"
            element={withPublicLayout(<ServiceAreasPage />)}
          />
          <Route
            path="/service-areas"
            element={withPublicLayout(<ServiceAreasPage />)}
          />

          {/* About & FAQ */}
          <Route path="/a-propos" element={withPublicLayout(<AboutPage />)} />
          <Route path="/about" element={withPublicLayout(<AboutPage />)} />
          <Route path="/faq" element={withPublicLayout(<FaqPage />)} />

          {/* Quote */}
          <Route path="/soumission" element={withPublicLayout(<QuotePage />)} />
          <Route path="/quote" element={withPublicLayout(<QuotePage />)} />

          {/* Legal */}
          <Route
            path="/politique-confidentialite"
            element={withPublicLayout(<LegalPage mode="privacy" />)}
          />
          <Route
            path="/privacy-policy"
            element={withPublicLayout(<LegalPage mode="privacy" />)}
          />
          <Route
            path="/conditions-utilisation"
            element={withPublicLayout(<LegalPage mode="terms" />)}
          />
          <Route
            path="/terms-of-use"
            element={withPublicLayout(<LegalPage mode="terms" />)}
          />

          {/* Hidden Admin Console (not linked in public nav/footer) */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}
