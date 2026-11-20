import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { INITIAL_SITES } from '../data/seedData';
import { SITE_CONFIG } from '../config/site.config';
import {
  fetchAllSites,
  fetchArticlesBySite,
  fetchInternalLinks,
  fetchMediaBySite,
  isLocalDevHostname,
  resolveActiveSite,
  setPreviewDomainOverride,
} from '../lib/store';
import type {
  AccessibilitySettings,
  ArticleRecord,
  InternalLinkRecord,
  Language,
  LeadCategory,
  SiteMediaRecord,
  SiteRecord,
} from '../types/database';

declare global {
  interface Window {
    leadConnector?: {
      chatWidget?: {
        openWidget?: () => void;
        closeWidget?: () => void;
      };
    };
  }
}

interface SiteContextValue {
  site: SiteRecord;
  allSites: SiteRecord[];
  media: SiteMediaRecord[];
  articles: ArticleRecord[];
  internalLinks: InternalLinkRecord[];
  lang: Language;
  setLang: (lang: Language) => void;
  loading: boolean;
  isLocalPreview: boolean;
  switchPreviewDomain: (domain: string) => Promise<void>;
  refreshSiteData: () => Promise<void>;
  a11y: AccessibilitySettings;
  updateA11y: (patch: Partial<AccessibilitySettings>) => void;
  resetA11y: () => void;
  quoteModalOpen: boolean;
  quoteModalType: LeadCategory;
  openQuoteModal: (type?: LeadCategory) => void;
  closeQuoteModal: () => void;
  aiAssistantOpen: boolean;
  openAiAssistant: () => void;
  closeAiAssistant: () => void;
}

const DEFAULT_A11Y: AccessibilitySettings = {
  textScale: 100,
  highContrast: false,
  dyslexiaMode: false,
  reducedMotion: false,
  underlineLinks: false,
};

const A11Y_STORAGE_KEY = 'raviva_accessibility_v1';
const LANG_STORAGE_KEY = 'raviva_language_v1';

const SiteContext = createContext<SiteContextValue | null>(null);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [site, setSite] = useState<SiteRecord>(INITIAL_SITES[0]);
  const [allSites, setAllSites] = useState<SiteRecord[]>(INITIAL_SITES);
  const [media, setMedia] = useState<SiteMediaRecord[]>([]);
  const [articles, setArticles] = useState<ArticleRecord[]>([]);
  const [internalLinks, setInternalLinks] = useState<InternalLinkRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [quoteModalType, setQuoteModalType] = useState<LeadCategory>('commercial');
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);

  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      return saved === 'en' ? 'en' : 'fr';
    } catch {
      return 'fr';
    }
  });

  const [a11y, setA11y] = useState<AccessibilitySettings>(() => {
    try {
      const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
      if (raw) return { ...DEFAULT_A11Y, ...(JSON.parse(raw) as Partial<AccessibilitySettings>) };
    } catch {
      // ignore
    }
    return DEFAULT_A11Y;
  });

  const isLocalPreview = isLocalDevHostname(window.location.hostname);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [activeSite, sitesList] = await Promise.all([
        resolveActiveSite(),
        fetchAllSites(true),
      ]);
      setSite(activeSite);
      setAllSites(sitesList);

      const [siteMedia, siteArticles, siteLinks] = await Promise.all([
        fetchMediaBySite(activeSite.id),
        fetchArticlesBySite(activeSite.id, false),
        fetchInternalLinks(activeSite.id),
      ]);
      setMedia(siteMedia);
      setArticles(siteArticles);
      setInternalLinks(siteLinks);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // Optional GoHighLevel Chat Widget Loader (non-blocking)
  useEffect(() => {
    const widgetId = SITE_CONFIG.integrations.ghlChatWidgetId;
    if (!widgetId) return;
    if (document.querySelector(`script[data-ghl-widget-id="${widgetId}"]`)) return;

    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute(
      'data-resources-url',
      'https://widgets.leadconnectorhq.com/chat-widget/loader.js'
    );
    script.setAttribute('data-widget-id', widgetId);
    script.setAttribute('data-ghl-widget-id', widgetId);
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', site.primary_color || '#163a5f');
    root.style.setProperty('--brand-secondary', site.secondary_color || '#0f766e');
  }, [site.primary_color, site.secondary_color]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--a11y-font-scale', String(a11y.textScale / 100));
    root.classList.toggle('a11y-high-contrast', a11y.highContrast);
    root.classList.toggle('a11y-dyslexia', a11y.dyslexiaMode);
    root.classList.toggle('a11y-reduced-motion', a11y.reducedMotion);
    root.classList.toggle('a11y-underline-links', a11y.underlineLinks);
    root.classList.toggle(
      'a11y-strong-focus',
      a11y.highContrast || a11y.underlineLinks
    );
    try {
      window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(a11y));
    } catch {
      // ignore
    }
  }, [a11y]);

  const setLang = useCallback((nextLang: Language) => {
    setLangState(nextLang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, nextLang);
    } catch {
      // ignore
    }
  }, []);

  const switchPreviewDomain = useCallback(
    async (domain: string) => {
      setPreviewDomainOverride(domain);
      await loadData();
    },
    [loadData]
  );

  const updateA11y = useCallback((patch: Partial<AccessibilitySettings>) => {
    setA11y((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetA11y = useCallback(() => {
    setA11y(DEFAULT_A11Y);
  }, []);

  const openQuoteModal = useCallback((type: LeadCategory = 'commercial') => {
    setQuoteModalType(type);
    setQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setQuoteModalOpen(false);
  }, []);

  const openAiAssistant = useCallback(() => {
    const widgetId = SITE_CONFIG.integrations.ghlChatWidgetId;
    if (widgetId && window.leadConnector?.chatWidget?.openWidget) {
      window.leadConnector.chatWidget.openWidget();
      return;
    }
    setAiAssistantOpen(true);
  }, []);

  const closeAiAssistant = useCallback(() => {
    setAiAssistantOpen(false);
  }, []);

  return (
    <SiteContext.Provider
      value={{
        site,
        allSites,
        media,
        articles,
        internalLinks,
        lang,
        setLang,
        loading,
        isLocalPreview,
        switchPreviewDomain,
        refreshSiteData: loadData,
        a11y,
        updateA11y,
        resetA11y,
        quoteModalOpen,
        quoteModalType,
        openQuoteModal,
        closeQuoteModal,
        aiAssistantOpen,
        openAiAssistant,
        closeAiAssistant,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
