import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site.config';
import { ACTIVE_SERVICES } from '../../config/services.config';
import { REGIONS_CONFIG } from '../../config/locations.config';
import { useTranslation } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useTranslation();
  const { pathname, navigate, openQuoteModal } = useRouter();

  const [openDesktopMenu, setOpenDesktopMenu] = useState<'services' | 'areas' | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<'services' | 'areas' | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);

  // Close mega-menus on outside click or Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openDesktopMenu) {
          setOpenDesktopMenu(null);
        }
        if (mobileDrawerOpen) {
          setMobileDrawerOpen(false);
          mobileMenuBtnRef.current?.focus();
        }
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [openDesktopMenu, mobileDrawerOpen]);

  // Trap focus inside mobile drawer when open
  useEffect(() => {
    if (!mobileDrawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      const firstBtn = drawerRef.current?.querySelector<HTMLElement>('button, a');
      firstBtn?.focus();
    }, 20);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileDrawerOpen]);

  const handleNavClick = (to: string) => {
    setOpenDesktopMenu(null);
    setMobileDrawerOpen(false);
    navigate(to);
  };

  return (
    <>
      {/* Skip to main content link (first focusable item in DOM) */}
      <a href="#main-content" className="skip-link">
        {t.a11y.skipToContent}
      </a>

      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line clean Brand Wordmark (no subtitles or pill tags) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-lg font-extrabold tracking-tight text-[#0b3d2e]"
          >
            <img
              src="/images/logo-raviva-nettoyage-tapis-montreal.png"
              alt=""
              aria-hidden="true"
              width={40}
              height={45}
              className="h-10 w-auto shrink-0 object-contain"
            />
            <span>{SITE_CONFIG.shortName}</span>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav
            aria-label={t.a11y.mainNavLabel}
            className="hidden items-center gap-6 lg:flex"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`whitespace-nowrap shrink-0 text-sm font-medium transition-colors hover:text-[#0b3d2e] ${
                pathname === '/' ? 'text-[#0b3d2e] underline underline-offset-8 decoration-2' : 'text-slate-700'
              }`}
            >
              {t.nav.home}
            </a>

            <a
              href="/a-propos"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/a-propos');
              }}
              aria-current={pathname === '/a-propos' ? 'page' : undefined}
              className={`whitespace-nowrap shrink-0 text-sm font-medium transition-colors hover:text-[#0b3d2e] ${
                pathname === '/a-propos'
                  ? 'text-[#0b3d2e] underline underline-offset-8 decoration-2'
                  : 'text-slate-700'
              }`}
            >
              {t.nav.about}
            </a>

            {/* Services Mega-Menu Trigger */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={openDesktopMenu === 'services'}
                aria-haspopup="true"
                onClick={() =>
                  setOpenDesktopMenu((prev) => (prev === 'services' ? null : 'services'))
                }
                className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 text-sm font-medium transition-colors hover:text-[#0b3d2e] ${
                  pathname.startsWith('/services') ? 'text-[#0b3d2e]' : 'text-slate-700'
                }`}
              >
                <span>{t.nav.services}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openDesktopMenu === 'services' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {openDesktopMenu === 'services' && (
                <div
                  role="region"
                  aria-label={t.nav.services}
                  className="absolute left-1/2 top-full z-50 mt-4 w-[660px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {ACTIVE_SERVICES.map((srv) => (
                      <a
                        key={srv.id}
                        href={`/services/${srv.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(`/services/${srv.slug}`);
                        }}
                        className="group rounded-lg p-2.5 transition-colors hover:bg-[#f4f7f5]"
                      >
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-[#0b3d2e]">
                          {t.services[srv.id].title}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-600 line-clamp-1">
                          {srv.indicativePrice[locale]}
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
                    <a
                      href="/#services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('/#services');
                      }}
                      className="text-sm font-semibold text-[#0b3d2e] hover:underline"
                    >
                      {t.nav.viewAllServices} →
                    </a>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                      <a
                        href="/realisations"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick('/realisations');
                        }}
                        className="hover:text-[#0b3d2e] hover:underline"
                      >
                        {t.nav.gallery}
                      </a>
                      <a
                        href="/guides"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick('/guides');
                        }}
                        className="hover:text-[#0b3d2e] hover:underline"
                      >
                        {t.nav.guides}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Service Areas Mega-Menu Trigger */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={openDesktopMenu === 'areas'}
                aria-haspopup="true"
                onClick={() =>
                  setOpenDesktopMenu((prev) => (prev === 'areas' ? null : 'areas'))
                }
                className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 text-sm font-medium transition-colors hover:text-[#0b3d2e] ${
                  pathname.startsWith('/secteurs') ? 'text-[#0b3d2e]' : 'text-slate-700'
                }`}
              >
                <span>{t.nav.areas}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openDesktopMenu === 'areas' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {openDesktopMenu === 'areas' && (
                <div
                  role="region"
                  aria-label={t.nav.areas}
                  className="absolute left-1/2 top-full z-50 mt-4 w-[580px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
                >
                  <div className="grid grid-cols-2 gap-6">
                    {REGIONS_CONFIG.map((region) => (
                      <div key={region.id}>
                        <a
                          href={`/secteurs/${region.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(`/secteurs/${region.slug}`);
                          }}
                          className="text-sm font-bold text-[#0b3d2e] hover:underline"
                        >
                          {region.name[locale]}
                        </a>
                        <ul className="mt-2 space-y-1">
                          {region.cities.slice(0, 4).map((city) => (
                            <li key={city.slug}>
                              <a
                                href={`/secteurs/${region.slug}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(`/secteurs/${region.slug}`);
                                }}
                                className="text-xs text-slate-600 hover:text-slate-900"
                              >
                                {city.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-slate-200 pt-3">
                    <a
                      href="/zones-desservies"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('/zones-desservies');
                      }}
                      className="text-sm font-semibold text-[#0b3d2e] hover:underline"
                    >
                      {t.nav.viewAllAreas} →
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/faq"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/faq');
              }}
              aria-current={pathname === '/faq' ? 'page' : undefined}
              className={`whitespace-nowrap shrink-0 text-sm font-medium transition-colors hover:text-[#0b3d2e] ${
                pathname === '/faq' ? 'text-[#0b3d2e] underline underline-offset-8 decoration-2' : 'text-slate-700'
              }`}
            >
              {t.nav.faq}
            </a>

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/contact');
              }}
              aria-current={pathname === '/contact' ? 'page' : undefined}
              className={`whitespace-nowrap shrink-0 text-sm font-medium transition-colors hover:text-[#0b3d2e] ${
                pathname === '/contact'
                  ? 'text-[#0b3d2e] underline underline-offset-8 decoration-2'
                  : 'text-slate-700'
              }`}
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Language Switcher + Clickable Phone + 1 Primary Action */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Accessible FR / EN Switcher */}
            <div
              role="group"
              aria-label={t.a11y.languageSwitcherLabel}
              className="hidden items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 sm:inline-flex"
            >
              <button
                type="button"
                onClick={() => setLocale('fr')}
                aria-pressed={locale === 'fr'}
                aria-label="Français"
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  locale === 'fr'
                    ? 'bg-[#0b3d2e] text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
                aria-label="English"
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  locale === 'en'
                    ? 'bg-[#0b3d2e] text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={SITE_CONFIG.phoneHref}
              className="hidden items-center gap-1.5 whitespace-nowrap shrink-0 text-sm font-semibold text-slate-800 hover:text-[#0b3d2e] xl:inline-flex"
            >
              <Phone className="h-4 w-4 text-[#0b3d2e]" aria-hidden="true" />
              <span className="tabular-nums">{SITE_CONFIG.phoneDisplay}</span>
            </a>

            <button
              type="button"
              data-book="header-cta"
              onClick={() => openQuoteModal()}
              className="hidden whitespace-nowrap shrink-0 rounded-lg bg-[#0b3d2e] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#082d22] sm:inline-flex"
            >
              {t.nav.freeQuote}
            </button>

            {/* Mobile menu trigger (>= 44x44px touch target) */}
            <button
              ref={mobileMenuBtnRef}
              type="button"
              aria-label={t.a11y.openMenu}
              aria-expanded={mobileDrawerOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileDrawerOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 lg:hidden"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setMobileDrawerOpen(false);
              mobileMenuBtnRef.current?.focus();
            }
          }}
        >
          <div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.a11y.mainNavLabel}
            className="flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/logo-raviva-nettoyage-tapis-montreal.png"
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={41}
                  className="h-9 w-auto shrink-0 object-contain"
                />
                <span className="font-display text-lg font-extrabold text-[#0b3d2e]">
                  {SITE_CONFIG.shortName}
                </span>
              </div>
              <button
                type="button"
                aria-label={t.a11y.closeMenu}
                onClick={() => {
                  setMobileDrawerOpen(false);
                  mobileMenuBtnRef.current?.focus();
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Language Switcher */}
            <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <span className="text-xs font-semibold text-slate-600">
                {t.a11y.languageSwitcherLabel}
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setLocale('fr')}
                  aria-pressed={locale === 'fr'}
                  className={`min-h-[38px] rounded-md px-3 py-1.5 text-xs font-semibold ${
                    locale === 'fr' ? 'bg-[#0b3d2e] text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLocale('en')}
                  aria-pressed={locale === 'en'}
                  className={`min-h-[38px] rounded-md px-3 py-1.5 text-xs font-semibold ${
                    locale === 'en' ? 'bg-[#0b3d2e] text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <nav className="mt-5 flex flex-1 flex-col space-y-1" aria-label={t.a11y.mainNavLabel}>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/');
                }}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-900 hover:bg-slate-100"
              >
                {t.nav.home}
              </a>

              <a
                href="/a-propos"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/a-propos');
                }}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-900 hover:bg-slate-100"
              >
                {t.nav.about}
              </a>

              {/* Services Accordion */}
              <div>
                <button
                  type="button"
                  aria-expanded={mobileAccordion === 'services'}
                  onClick={() =>
                    setMobileAccordion((prev) => (prev === 'services' ? null : 'services'))
                  }
                  className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-left text-base font-medium text-slate-900 hover:bg-slate-100"
                >
                  <span>{t.nav.services}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileAccordion === 'services' ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {mobileAccordion === 'services' && (
                  <div className="mt-1 space-y-1 pl-4">
                    {ACTIVE_SERVICES.map((srv) => (
                      <a
                        key={srv.id}
                        href={`/services/${srv.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(`/services/${srv.slug}`);
                        }}
                        className="flex min-h-[40px] items-center rounded-md px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        {t.services[srv.id].title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Areas Accordion */}
              <div>
                <button
                  type="button"
                  aria-expanded={mobileAccordion === 'areas'}
                  onClick={() =>
                    setMobileAccordion((prev) => (prev === 'areas' ? null : 'areas'))
                  }
                  className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-left text-base font-medium text-slate-900 hover:bg-slate-100"
                >
                  <span>{t.nav.areas}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileAccordion === 'areas' ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {mobileAccordion === 'areas' && (
                  <div className="mt-1 space-y-1 pl-4">
                    {REGIONS_CONFIG.map((region) => (
                      <a
                        key={region.id}
                        href={`/secteurs/${region.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(`/secteurs/${region.slug}`);
                        }}
                        className="flex min-h-[40px] items-center rounded-md px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        {region.name[locale]}
                      </a>
                    ))}
                    <a
                      href="/zones-desservies"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('/zones-desservies');
                      }}
                      className="flex min-h-[40px] items-center rounded-md px-3 py-1.5 text-sm font-semibold text-[#0b3d2e] hover:bg-slate-100"
                    >
                      {t.nav.viewAllAreas}
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/realisations"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/realisations');
                }}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-900 hover:bg-slate-100"
              >
                {t.nav.gallery}
              </a>

              <a
                href="/guides"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/guides');
                }}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-900 hover:bg-slate-100"
              >
                {t.nav.guides}
              </a>

              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/faq');
                }}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-900 hover:bg-slate-100"
              >
                {t.nav.faq}
              </a>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/contact');
                }}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-900 hover:bg-slate-100"
              >
                {t.nav.contact}
              </a>
            </nav>

            <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() => {
                  setMobileDrawerOpen(false);
                  openQuoteModal();
                }}
                className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#0b3d2e] px-4 py-3 text-sm font-semibold text-white hover:bg-[#082d22]"
              >
                {t.nav.freeQuote}
              </button>
              <a
                href={SITE_CONFIG.phoneHref}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4 text-[#0b3d2e]" aria-hidden="true" />
                <span className="tabular-nums">{SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
