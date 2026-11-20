import React, { useEffect, useState } from 'react';
import { Link2, Plus, Trash2 } from 'lucide-react';
import {
  deleteInternalLink,
  fetchInternalLinks,
  upsertInternalLink,
} from '../../lib/store';
import type { InternalLinkRecord, Language } from '../../types/database';

interface InternalLinksPanelProps {
  siteId: string;
  onChanged: () => Promise<void>;
}

export const InternalLinksPanel: React.FC<InternalLinksPanelProps> = ({
  siteId,
  onChanged,
}) => {
  const [links, setLinks] = useState<InternalLinkRecord[]>([]);
  const [language, setLanguage] = useState<Language>('fr');
  const [keyword, setKeyword] = useState('');
  const [targetUrl, setTargetUrl] = useState('/services-commerciaux');
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    const list = await fetchInternalLinks(siteId);
    setLinks(list);
  };

  useEffect(() => {
    void load();
  }, [siteId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const cleanUrl = targetUrl.trim();
    if (!keyword.trim() || !cleanUrl.startsWith('/')) {
      setErr(
        'Le mot-clé est requis et l’URL cible doit être une route interne du même site (commençant par /).'
      );
      return;
    }

    await upsertInternalLink({
      id: crypto.randomUUID(),
      site_id: siteId,
      language,
      keyword: keyword.trim(),
      target_url: cleanUrl,
      is_active: true,
      created_at: new Date().toISOString(),
    });
    setKeyword('');
    await load();
    await onChanged();
  };

  const handleToggle = async (link: InternalLinkRecord) => {
    await upsertInternalLink({ ...link, is_active: !link.is_active });
    await load();
    await onChanged();
  };

  const handleDelete = async (id: string) => {
    await deleteInternalLink(id);
    await load();
    await onChanged();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Maillage interne automatique (strictement intra-site)
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Définissez des paires « Mot-clé cible → URL interne du même site » injectées automatiquement dans les guides (max 1 lien par mot-clé et par article).
        </p>
      </div>

      <form
        onSubmit={handleAdd}
        className="bg-white rounded-lg border border-slate-200 p-6 space-y-4"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Link2 className="w-4 h-4" aria-hidden="true" />
          <span>Ajouter une règle de maillage interne</span>
        </div>

        {err && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900">
            {err}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Langue
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            >
              <option value="fr">Français (FR)</option>
              <option value="en">English (EN)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mot-clé cible
            </label>
            <input
              type="text"
              placeholder="ex: extraction à l'eau chaude"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              URL interne (/...)
            </label>
            <input
              type="text"
              placeholder="/services-commerciaux"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Ajouter
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
              <th className="py-3 px-4">Langue</th>
              <th className="py-3 px-4">Mot-clé</th>
              <th className="py-3 px-4">URL cible</th>
              <th className="py-3 px-4">État</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-slate-50/70">
                <td className="py-3 px-4 text-xs font-semibold uppercase">
                  {link.language}
                </td>
                <td className="py-3 px-4 font-medium text-slate-900">
                  {link.keyword}
                </td>
                <td className="py-3 px-4 font-mono-tabular text-xs text-slate-600">
                  {link.target_url}
                </td>
                <td className="py-3 px-4">
                  <button
                    type="button"
                    onClick={() => void handleToggle(link)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                      link.is_active
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    {link.is_active ? 'Actif' : 'Inactif'}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => void handleDelete(link.id)}
                    aria-label="Supprimer le lien interne"
                    className="p-1.5 text-red-700 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
