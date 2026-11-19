import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { SITE_CONFIG, SupportedLocale } from '../config/site.config';
import { FR_DICTIONARY } from '../config/i18n/fr';
import { EN_DICTIONARY } from '../config/i18n/en';
import { TranslationDictionary } from '../config/i18n/types';

const STORAGE_KEY = 'raviva_locale_pref';

interface LanguageContextValue {
  locale: SupportedLocale;
  setLocale: (lang: SupportedLocale) => void;
  toggleLocale: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLocale(): SupportedLocale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') {
      return saved;
    }
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'fr' || urlLang === 'en') {
      return urlLang;
    }
  } catch {
    // Ignore storage access errors
  }
  return SITE_CONFIG.defaultLocale;
}

function upsertHeadLink(rel: string, hreflang: string | null, href: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) {
      el.hreflang = hreflang;
    }
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(getInitialLocale);

  const setLocale = useCallback((lang: SupportedLocale) => {
    setLocaleState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'fr' ? 'en' : 'fr');
  }, [locale, setLocale]);

  const t = locale === 'fr' ? FR_DICTIONARY : EN_DICTIONARY;

  useEffect(() => {
    document.documentElement.lang = locale === 'fr' ? 'fr-CA' : 'en-CA';
    document.title = t.meta.homeTitle;
    upsertMeta('name', 'description', t.meta.homeDescription);
    upsertMeta('property', 'og:title', t.meta.homeTitle);
    upsertMeta('property', 'og:description', t.meta.homeDescription);
    upsertMeta('property', 'og:locale', locale === 'fr' ? 'fr_CA' : 'en_CA');
    upsertMeta('name', 'twitter:title', t.meta.homeTitle);
    upsertMeta('name', 'twitter:description', t.meta.homeDescription);

    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const baseUrl = `${origin}${pathname}`;

    upsertHeadLink('canonical', null, baseUrl);
    upsertHeadLink('alternate', 'fr-CA', `${baseUrl}?lang=fr`);
    upsertHeadLink('alternate', 'en-CA', `${baseUrl}?lang=en`);
    upsertHeadLink('alternate', 'x-default', baseUrl);
  }, [locale, t]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return ctx;
}
