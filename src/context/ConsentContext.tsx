import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string | null;
}

interface ConsentContextValue {
  preferences: CookiePreferences;
  hasResponded: boolean;
  isModalOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (analytics: boolean, marketing: boolean) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CONSENT_STORAGE_KEY = 'raviva_loi25_consent_v1';

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: null,
};

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

function loadSavedConsent(): { prefs: CookiePreferences; responded: boolean } {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return { prefs: DEFAULT_PREFERENCES, responded: false };
    }
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return {
      prefs: {
        necessary: true,
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
        updatedAt: parsed.updatedAt ?? new Date().toISOString(),
      },
      responded: true,
    };
  } catch {
    return { prefs: DEFAULT_PREFERENCES, responded: false };
  }
}

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = loadSavedConsent();
  const [preferences, setPreferences] = useState<CookiePreferences>(initial.prefs);
  const [hasResponded, setHasResponded] = useState<boolean>(initial.responded);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const persist = useCallback((analytics: boolean, marketing: boolean) => {
    const next: CookiePreferences = {
      necessary: true,
      analytics,
      marketing,
      updatedAt: new Date().toISOString(),
    };
    setPreferences(next);
    setHasResponded(true);
    setIsModalOpen(false);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage error
    }
  }, []);

  const acceptAll = useCallback(() => persist(true, true), [persist]);
  const rejectNonEssential = useCallback(() => persist(false, false), [persist]);
  const savePreferences = useCallback(
    (analytics: boolean, marketing: boolean) => persist(analytics, marketing),
    [persist]
  );
  const openPreferences = useCallback(() => setIsModalOpen(true), []);
  const closePreferences = useCallback(() => setIsModalOpen(false), []);

  // Loi 25: Strictly block GA4 / GTM injection until explicit opt-in consent
  useEffect(() => {
    if (!preferences.analytics) {
      return;
    }
    const gaId = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
    if (gaId && gaId.trim() !== '' && !document.getElementById('raviva-ga4-script')) {
      const script = document.createElement('script');
      script.id = 'raviva-ga4-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId.trim())}`;
      document.head.appendChild(script);

      const inline = document.createElement('script');
      inline.id = 'raviva-ga4-inline';
      inline.text = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId.trim()}', { anonymize_ip: true });`;
      document.head.appendChild(inline);
    }
  }, [preferences.analytics]);

  return (
    <ConsentContext.Provider
      value={{
        preferences,
        hasResponded,
        isModalOpen,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return ctx;
}
