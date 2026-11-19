import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GalleryMediaItem, GuideArticle, GuideStatus } from '../config/guides.config';
import {
  ExactRavivaContent,
  ExpectationItem,
  INITIAL_RAVIVA_EXACT_CONTENT,
} from '../data/ravivaExactContent';
import { SITE_CONFIG } from '../config/site.config';
import { ACTIVE_SERVICES } from '../config/services.config';
import { REGIONS_CONFIG } from '../config/locations.config';

const STORAGE_KEY = 'raviva_cms_exact_v2';

export interface StoredQuoteSubmission {
  locale: 'fr' | 'en';
  source: string;
  sector?: string;
  primary_need?: string;
  selected_services: string[];
  property_type: string;
  specific_needs: string[];
  quantity_details: {
    rooms: string;
    stairs: string;
    areaSqFt: string;
    sofaSeats: string;
    notes: string;
  };
  preferred_timeframe: string;
  preferred_date: string | null;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  city: string;
  postal_code: string;
  in_service_zone: boolean;
  photo_count: number;
  consent_loi25: boolean;
  consent_marketing: boolean;
  submitted_at: string;
}

interface CmsContextValue {
  exactContent: ExactRavivaContent;
  guides: GuideArticle[];
  publishedGuides: GuideArticle[];
  gallery: GalleryMediaItem[];
  beforeAfterItems: GalleryMediaItem[];
  diplomaItems: GalleryMediaItem[];
  recentQuotes: StoredQuoteSubmission[];
  refreshQuotes: () => void;
  toggleGuideStatus: (id: string) => void;
  updateGuide: (updated: GuideArticle) => void;
  addGuide: (guide: GuideArticle) => void;
  deleteGuide: (id: string) => void;
  addGalleryItem: (item: GalleryMediaItem) => void;
  updateGalleryItem: (updated: GalleryMediaItem) => void;
  deleteGalleryItem: (id: string) => void;
  updateGuarantee: (fr: string, en: string) => void;
  updateExpectation: (item: ExpectationItem) => void;
  resetCmsToDefaults: () => void;
  generateSitemapXml: () => string;
}

const CmsContext = createContext<CmsContextValue | undefined>(undefined);

function loadInitialState(): ExactRavivaContent {
  if (typeof window === 'undefined') {
    return INITIAL_RAVIVA_EXACT_CONTENT;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_RAVIVA_EXACT_CONTENT;
    }
    const parsed = JSON.parse(raw) as Partial<ExactRavivaContent>;
    return {
      ...INITIAL_RAVIVA_EXACT_CONTENT,
      ...parsed,
      operator: {
        ...INITIAL_RAVIVA_EXACT_CONTENT.operator,
        ...(parsed.operator ?? {}),
      },
      raviva6x:
        Array.isArray(parsed.raviva6x) && parsed.raviva6x.length === 6
          ? parsed.raviva6x
          : INITIAL_RAVIVA_EXACT_CONTENT.raviva6x,
      expectations:
        Array.isArray(parsed.expectations) && parsed.expectations.length > 0
          ? parsed.expectations
          : INITIAL_RAVIVA_EXACT_CONTENT.expectations,
      realWorkGallery:
        Array.isArray(parsed.realWorkGallery) && parsed.realWorkGallery.length > 0
          ? parsed.realWorkGallery
          : INITIAL_RAVIVA_EXACT_CONTENT.realWorkGallery,
      diplomasGallery:
        Array.isArray(parsed.diplomasGallery) && parsed.diplomasGallery.length > 0
          ? parsed.diplomasGallery
          : INITIAL_RAVIVA_EXACT_CONTENT.diplomasGallery,
      guides:
        Array.isArray(parsed.guides) && parsed.guides.length > 0
          ? parsed.guides
          : INITIAL_RAVIVA_EXACT_CONTENT.guides,
    };
  } catch {
    return INITIAL_RAVIVA_EXACT_CONTENT;
  }
}

function loadRecentQuotes(): StoredQuoteSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('raviva_recent_quotes');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ExactRavivaContent>(loadInitialState);
  const [recentQuotes, setRecentQuotes] = useState<StoredQuoteSubmission[]>(loadRecentQuotes);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      // Ignore storage quota errors
    }
  }, [content]);

  const refreshQuotes = () => {
    setRecentQuotes(loadRecentQuotes());
  };

  const toggleGuideStatus = (id: string) => {
    setContent((prev) => ({
      ...prev,
      guides: prev.guides.map((g) => {
        if (g.id !== id) return g;
        const nextStatus: GuideStatus = g.status === 'published' ? 'draft' : 'published';
        return { ...g, status: nextStatus };
      }),
    }));
  };

  const updateGuide = (updated: GuideArticle) => {
    setContent((prev) => ({
      ...prev,
      guides: prev.guides.map((g) => (g.id === updated.id ? updated : g)),
    }));
  };

  const addGuide = (guide: GuideArticle) => {
    setContent((prev) => ({
      ...prev,
      guides: [guide, ...prev.guides],
    }));
  };

  const deleteGuide = (id: string) => {
    setContent((prev) => ({
      ...prev,
      guides: prev.guides.filter((g) => g.id !== id),
    }));
  };

  const addGalleryItem = (item: GalleryMediaItem) => {
    setContent((prev) => ({
      ...prev,
      realWorkGallery:
        item.kind === 'before_after' ? [item, ...prev.realWorkGallery] : prev.realWorkGallery,
      diplomasGallery:
        item.kind === 'diploma' ? [item, ...prev.diplomasGallery] : prev.diplomasGallery,
    }));
  };

  const updateGalleryItem = (updated: GalleryMediaItem) => {
    setContent((prev) => ({
      ...prev,
      realWorkGallery: prev.realWorkGallery.map((item) =>
        item.id === updated.id ? updated : item
      ),
      diplomasGallery: prev.diplomasGallery.map((item) =>
        item.id === updated.id ? updated : item
      ),
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setContent((prev) => ({
      ...prev,
      realWorkGallery: prev.realWorkGallery.filter((item) => item.id !== id),
      diplomasGallery: prev.diplomasGallery.filter((item) => item.id !== id),
    }));
  };

  const updateGuarantee = (fr: string, en: string) => {
    setContent((prev) => ({
      ...prev,
      operator: {
        ...prev.operator,
        mainGuarantee: { fr, en },
      },
    }));
  };

  const updateExpectation = (updated: ExpectationItem) => {
    setContent((prev) => ({
      ...prev,
      expectations: prev.expectations.map((e) => (e.id === updated.id ? updated : e)),
    }));
  };

  const resetCmsToDefaults = () => {
    setContent(INITIAL_RAVIVA_EXACT_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage error
    }
  };

  const publishedGuides = useMemo(
    () => content.guides.filter((g) => g.status === 'published'),
    [content.guides]
  );

  const gallery = useMemo(
    () => [...content.realWorkGallery, ...content.diplomasGallery],
    [content.realWorkGallery, content.diplomasGallery]
  );

  const generateSitemapXml = (): string => {
    const base = SITE_CONFIG.domain.replace(/\/+$/, '');
    const staticPaths = [
      '/',
      '/a-propos',
      '/soumission',
      '/zones-desservies',
      '/realisations',
      '/guides',
      '/faq',
      '/contact',
      '/accessibilite',
      '/confidentialite',
      '/temoins',
      '/conditions',
    ];
    const servicePaths = ACTIVE_SERVICES.map((s) => `/services/${s.slug}`);
    const regionPaths = REGIONS_CONFIG.map((r) => `/secteurs/${r.slug}`);
    const guidePaths = publishedGuides.map((g) => `/guides/${g.slug}`);

    const allPaths = [...staticPaths, ...servicePaths, ...regionPaths, ...guidePaths];
    const today = new Date().toISOString().slice(0, 10);

    const urlEntries = allPaths
      .map(
        (p) =>
          `  <url>\n    <loc>${base}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${p === '/' ? '1.0' : p.startsWith('/services/') || p === '/zones-desservies' ? '0.9' : '0.8'}</priority>\n  </url>`
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
  };

  return (
    <CmsContext.Provider
      value={{
        exactContent: content,
        guides: content.guides,
        publishedGuides,
        gallery,
        beforeAfterItems: content.realWorkGallery,
        diplomaItems: content.diplomasGallery,
        recentQuotes,
        refreshQuotes,
        toggleGuideStatus,
        updateGuide,
        addGuide,
        deleteGuide,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        updateGuarantee,
        updateExpectation,
        resetCmsToDefaults,
        generateSitemapXml,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms must be used within CmsProvider');
  }
  return ctx;
}
