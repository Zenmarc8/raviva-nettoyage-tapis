import React, { useState } from 'react';
import { Copy, Globe, Plus } from 'lucide-react';
import { duplicateSite, upsertSite } from '../../lib/store';
import { INITIAL_SITES } from '../../data/seedData';
import type { SiteRecord } from '../../types/database';

interface SitesPanelProps {
  sites: SiteRecord[];
  selectedSiteId: string;
  onSelectSite: (siteId: string) => void;
  onSitesChanged: () => Promise<void>;
}

export const SitesPanel: React.FC<SitesPanelProps> = ({
  sites,
  selectedSiteId,
  onSelectSite,
  onSitesChanged,
}) => {
  const [mode, setMode] = useState<'duplicate' | 'create'>('duplicate');
  const [sourceSiteId, setSourceSiteId] = useState<string>(
    selectedSiteId || sites[0]?.id || ''
  );
  const [domain, setDomain] = useState('');
  const [brandName, setBrandName] = useState('');
  const [cityRegion, setCityRegion] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!domain.trim() || !brandName.trim() || !cityRegion.trim()) {
      setFeedback({
        type: 'err',
        text: 'Veuillez renseigner le domaine, le nom de marque et la ville ou région.',
      });
      return;
    }

    setBusy(true);
    try {
      let created: SiteRecord;
      if (mode === 'duplicate') {
        created = await duplicateSite(
          sourceSiteId || sites[0].id,
          domain,
          brandName,
          cityRegion
        );
      } else {
        const template = structuredClone(INITIAL_SITES[0]);
        created = await upsertSite({
          ...template,
          id: crypto.randomUUID(),
          domain: domain.trim().toLowerCase(),
          brand_name: brandName.trim(),
          city_or_region: cityRegion.trim(),
          logo_data: {
            ...template.logo_data,
            wordmark: brandName.trim(),
          },
          created_at: new Date().toISOString(),
        });
      }
      await onSitesChanged();
      onSelectSite(created.id);
      setDomain('');
      setBrandName('');
      setCityRegion('');
      setFeedback({
        type: 'ok',
        text: `Site ${created.domain} prêt et isolé.`,
      });
    } catch (err) {
      setFeedback({
        type: 'err',
        text: err instanceof Error ? err.message : 'Erreur lors de la création.',
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Gestionnaire multi-sites (1 à 50+ domaines)
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Chaque domaine est totalement isolé (aucun lien croisé, sitemap.xml et robots.txt dédiés).
        </p>
      </div>

      {/* Sites Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
              <th className="py-3 px-4">Domaine</th>
              <th className="py-3 px-4">Marque</th>
              <th className="py-3 px-4">Région</th>
              <th className="py-3 px-4">Statut</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sites.map((s) => (
              <tr
                key={s.id}
                className={
                  s.id === selectedSiteId ? 'bg-slate-50' : 'hover:bg-slate-50/60'
                }
              >
                <td className="py-3 px-4 font-mono-tabular font-medium text-slate-900">
                  {s.domain}
                </td>
                <td className="py-3 px-4 text-slate-800">{s.brand_name}</td>
                <td className="py-3 px-4 text-slate-600">{s.city_or_region}</td>
                <td className="py-3 px-4 text-xs font-medium">
                  {s.is_active ? 'Actif' : 'Inactif'}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onSelectSite(s.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${
                      s.id === selectedSiteId
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {s.id === selectedSiteId ? 'Sélectionné' : 'Éditer ce site'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create or Duplicate Site Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-slate-200 p-6 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-800" aria-hidden="true" />
            <h3 className="text-base font-semibold text-slate-900">
              Déployer un nouveau domaine local
            </h3>
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setMode('duplicate')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
                mode === 'duplicate'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              Dupliquer un site existant
            </button>
            <button
              type="button"
              onClick={() => setMode('create')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
                mode === 'create'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Créer un site vierge
            </button>
          </div>
        </div>

        {feedback && (
          <div
            role="status"
            className={`p-3 rounded-lg text-xs font-medium border ${
              feedback.type === 'ok'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {feedback.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mode === 'duplicate' && (
            <div className="md:col-span-2">
              <label
                htmlFor="dup-source"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Site modèle à cloner (textes FR/EN, services, municipalités, pages légales, médias, liens)
              </label>
              <select
                id="dup-source"
                value={sourceSiteId}
                onChange={(e) => setSourceSiteId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.domain} — {s.brand_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label
              htmlFor="new-site-domain"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Nom de domaine (sans https://)
            </label>
            <input
              id="new-site-domain"
              type="text"
              placeholder="ex: nettoyagetapislaval.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="new-site-brand"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Nom de marque affiché
            </label>
            <input
              id="new-site-brand"
              type="text"
              placeholder="ex: Raviva Nettoyage de tapis"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="new-site-region"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Ville ou région ciblée
            </label>
            <input
              id="new-site-region"
              type="text"
              placeholder="ex: Laval et Rive-Nord"
              value={cityRegion}
              onChange={(e) => setCityRegion(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50"
        >
          {busy
            ? 'Déploiement en cours...'
            : mode === 'duplicate'
            ? 'Dupliquer et créer le site'
            : 'Créer le nouveau site'}
        </button>
      </form>
    </div>
  );
};
