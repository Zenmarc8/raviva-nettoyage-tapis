import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ServiceId } from '../config/services.config';

interface RouterContextValue {
  pathname: string;
  navigate: (to: string) => void;
  isQuoteModalOpen: boolean;
  preselectedService: ServiceId | null;
  openQuoteModal: (serviceId?: ServiceId) => void;
  closeQuoteModal: () => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState<string>(() => window.location.pathname || '/');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceId | null>(null);

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const [pathOnly, hash] = to.split('#');
    const targetPath = pathOnly || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', to);
      setPathname(targetPath);
    }

    if (hash) {
      window.setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
      const main = document.getElementById('main-content');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    }
  }, []);

  const openQuoteModal = useCallback((serviceId?: ServiceId) => {
    setPreselectedService(serviceId ?? null);
    setIsQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
  }, []);

  return (
    <RouterContext.Provider
      value={{
        pathname,
        navigate,
        isQuoteModalOpen,
        preselectedService,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}
