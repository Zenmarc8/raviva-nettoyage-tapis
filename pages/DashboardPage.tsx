import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Globe,
  Image as ImageIcon,
  Inbox,
  Link2,
  LogOut,
  Settings,
  Shield,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { applyHeadSeo } from '../lib/seo';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import {
  fetchAllSites,
  getLocalAdminSession,
  setLocalAdminSession,
} from '../lib/store';
import { SitesPanel } from '../components/dashboard/SitesPanel';
import { SiteEditorPanel } from '../components/dashboard/SiteEditorPanel';
import { MediaPanel } from '../components/dashboard/MediaPanel';
import { ArticlesPanel } from '../components/dashboard/ArticlesPanel';
import { InternalLinksPanel } from '../components/dashboard/InternalLinksPanel';
import { LeadsPanel } from '../components/dashboard/LeadsPanel';
import type { SiteRecord } from '../types/database';

type DashboardTab =
  | 'leads'
  | 'sites'
  | 'editor'
  | 'media'
  | 'articles'
  | 'links';

export const DashboardPage: React.FC = () => {
  const { site, lang, refreshSiteData } = useSite();
  const [authChecking, setAuthChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);

  const [activeTab, setActiveTab] = useState<DashboardTab>('leads');
  const [sites, setSites] = useState<SiteRecord[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useState<string>(site.id);

  // Always enforce noindex, nofollow on /dashboard
  useEffect(() => {
    applyHeadSeo(site, lang, {
      title: `Administration | ${site.brand_name}`,
      description: 'Administration multi-sites protégée.',
      pathFr: '/dashboard',
      pathEn: '/dashboard',
      noIndex: true,
    });
  }, [site, lang]);

  useEffect(() => {
    const initAuth = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        setUserEmail(data.session?.user?.email || null);
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
          setUserEmail(session?.user?.email || null);
        });
        setAuthChecking(false);
        return () => sub.subscription.unsubscribe();
      } else {
        const localSession = getLocalAdminSession();
        setUserEmail(localSession?.email || null);
        setAuthChecking(false);
      }
      return undefined;
    };
    void initAuth();
  }, []);

  const loadSites = async () => {
    const list = await fetchAllSites(true);
    setSites(list);
    if (!list.some((s) => s.id === selectedSiteId) && list[0]) {
      setSelectedSiteId(list[0].id);
    }
  };

  useEffect(() => {
    if (userEmail) {
      void loadSites();
    }
  }, [userEmail]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!emailInput.trim() || !passwordInput.trim()) {
      setAuthError('Courriel et mot de passe requis.');
      return;
    }

    setAuthBusy(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailInput.trim(),
          password: passwordInput,
        });
        if (error) throw new Error(error.message);
        setUserEmail(data.user?.email || emailInput.trim());
      } else {
        setLocalAdminSession({ email: emailInput.trim() });
        setUserEmail(emailInput.trim());
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Échec de connexion.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSignOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      setLocalAdminSession(null);
    }
    setUserEmail(null);
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-sm text-slate-600">
        Vérification de la session...
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md bg-white rounded-lg border border-slate-200 p-8 space-y-6">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-slate-900" aria-hidden="true" />
            <h1 className="text-xl font-bold text-slate-900">
              Administration Raviva
            </h1>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {isSupabaseConfigured
              ? 'Authentification protégée par Supabase Auth et Row Level Security (RLS).'
              : 'Mode aperçu local (variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY non configurées). Connectez-vous pour tester la console multi-sites.'}
          </p>

          {authError && (
            <div
              role="alert"
              className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900"
            >
              {authError}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Courriel administrateur
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={authBusy}
              className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50"
            >
              {authBusy ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 text-center">
            <Link to="/" className="text-xs text-slate-600 hover:text-slate-900">
              Retour au site public
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeEditingSite =
    sites.find((s) => s.id === selectedSiteId) || sites[0] || site;

  const navItems: Array<{
    key: DashboardTab;
    label: string;
    icon: React.FC<{ className?: string }>;
  }> = [
    { key: 'leads', label: 'Demandes & CRM', icon: Inbox },
    { key: 'sites', label: 'Sites (1 → 50+)', icon: Globe },
    { key: 'editor', label: 'Éditeur du site', icon: Settings },
    { key: 'media', label: 'Médiathèque SEO', icon: ImageIcon },
    { key: 'articles', label: 'Guides & Articles', icon: FileText },
    { key: 'links', label: 'Maillage interne', icon: Link2 },
  ];

  const handleRefreshAll = async () => {
    await loadSites();
    await refreshSiteData();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* WordPress-style Sidebar */}
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-200 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-slate-800">
            <p className="font-display text-sm font-bold text-white">
              Console Multi-Sites
            </p>
            <p className="mt-1 text-xs text-slate-400 truncate">{userEmail}</p>
          </div>

          <div className="p-4 border-b border-slate-800">
            <label
              htmlFor="dashboard-active-site"
              className="block text-xs font-semibold text-slate-400 mb-1.5"
            >
              Site en cours d’édition
            </label>
            <select
              id="dashboard-active-site"
              value={activeEditingSite.id}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="w-full px-2.5 py-2 rounded bg-slate-800 border border-slate-700 text-xs text-white"
            >
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.domain}
                </option>
              ))}
            </select>
          </div>

          <nav aria-label="Dashboard navigation" className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-white text-slate-900'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="block text-center py-2 px-3 rounded-lg border border-slate-700 text-xs font-medium text-slate-200 hover:bg-slate-800"
          >
            Voir le site public
          </Link>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {!isSupabaseConfigured && (
            <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3">
              <span>
                <strong>Mode aperçu local :</strong> Configurez{' '}
                <code className="font-mono-tabular">VITE_SUPABASE_URL</code> et{' '}
                <code className="font-mono-tabular">VITE_SUPABASE_ANON_KEY</code>{' '}
                puis exécutez{' '}
                <code className="font-mono-tabular">
                  supabase/migrations/001_initial_schema.sql
                </code>{' '}
                et{' '}
                <code className="font-mono-tabular">supabase/seed.sql</code> pour
                connecter votre base PostgreSQL Supabase en production.
              </span>
            </div>
          )}

          {activeTab === 'leads' && <LeadsPanel sites={sites} />}
          {activeTab === 'sites' && (
            <SitesPanel
              sites={sites}
              selectedSiteId={activeEditingSite.id}
              onSelectSite={(id) => {
                setSelectedSiteId(id);
                setActiveTab('editor');
              }}
              onSitesChanged={handleRefreshAll}
            />
          )}
          {activeTab === 'editor' && (
            <SiteEditorPanel
              site={activeEditingSite}
              onSaved={handleRefreshAll}
            />
          )}
          {activeTab === 'media' && (
            <MediaPanel
              siteId={activeEditingSite.id}
              onMediaChanged={refreshSiteData}
            />
          )}
          {activeTab === 'articles' && (
            <ArticlesPanel
              siteId={activeEditingSite.id}
              onArticlesChanged={refreshSiteData}
            />
          )}
          {activeTab === 'links' && (
            <InternalLinksPanel
              siteId={activeEditingSite.id}
              onChanged={refreshSiteData}
            />
          )}
        </div>
      </main>
    </div>
  );
};
