import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { upsertSite } from '../../lib/store';
import type { SiteRecord } from '../../types/database';

interface SiteEditorPanelProps {
  site: SiteRecord;
  onSaved: () => Promise<void>;
}

export const SiteEditorPanel: React.FC<SiteEditorPanelProps> = ({
  site,
  onSaved,
}) => {
  const [draft, setDraft] = useState<SiteRecord>(site);
  const [tab, setTab] = useState<'identity' | 'hero' | 'services' | 'municipalities' | 'legal'>(
    'identity'
  );
  const [municipalitiesText, setMunicipalitiesText] = useState(
    site.served_municipalities.join('\n')
  );
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setDraft(site);
    setMunicipalitiesText(site.served_municipalities.join('\n'));
    setMsg(null);
  }, [site]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const cleanedMunicipalities = municipalitiesText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      await upsertSite({
        ...draft,
        served_municipalities: cleanedMunicipalities,
      });
      await onSaved();
      setMsg('Modifications enregistrées pour ce domaine.');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Éditeur du site : <span className="font-mono-tabular">{site.domain}</span>
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Modifiez les coordonnées, couleurs, textes FR/EN, zones et pages légales sans toucher au code.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50"
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          {saving ? 'Sauvegarde...' : 'Enregistrer'}
        </button>
      </div>

      {msg && (
        <div
          role="status"
          className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900"
        >
          {msg}
        </div>
      )}

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-1 p-1 bg-slate-200/70 rounded-lg">
        {(
          [
            { key: 'identity', label: 'Identité & Coordonnées' },
            { key: 'hero', label: 'Accueil & SEO FR/EN' },
            { key: 'services', label: 'Services FR/EN' },
            { key: 'municipalities', label: 'Municipalités' },
            { key: 'legal', label: 'Pages légales' },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
              tab === t.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'identity' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nom de marque
            </label>
            <input
              type="text"
              value={draft.brand_name}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  brand_name: e.target.value,
                  logo_data: { ...draft.logo_data, wordmark: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ville ou région
            </label>
            <input
              type="text"
              value={draft.city_or_region}
              onChange={(e) => setDraft({ ...draft, city_or_region: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Téléphone affiché
            </label>
            <input
              type="text"
              value={draft.phone}
              onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Courriel affiché
            </label>
            <input
              type="text"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Adresse affichée
            </label>
            <input
              type="text"
              value={draft.address_display}
              onChange={(e) =>
                setDraft({ ...draft, address_display: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Couleur principale
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={draft.primary_color}
                onChange={(e) =>
                  setDraft({ ...draft, primary_color: e.target.value })
                }
                className="h-9 w-12 rounded border border-slate-300"
              />
              <input
                type="text"
                value={draft.primary_color}
                onChange={(e) =>
                  setDraft({ ...draft, primary_color: e.target.value })
                }
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Couleur secondaire
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={draft.secondary_color}
                onChange={(e) =>
                  setDraft({ ...draft, secondary_color: e.target.value })
                }
                className="h-9 w-12 rounded border border-slate-300"
              />
              <input
                type="text"
                value={draft.secondary_color}
                onChange={(e) =>
                  setDraft({ ...draft, secondary_color: e.target.value })
                }
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
              />
            </div>
          </div>
          <label className="md:col-span-2 flex items-center gap-2 text-sm font-medium text-slate-800 pt-2">
            <input
              type="checkbox"
              checked={draft.is_active}
              onChange={(e) => setDraft({ ...draft, is_active: e.target.checked })}
              className="h-4 w-4 accent-slate-900"
            />
            <span>Site actif publiquement (inclus dans son propre sitemap.xml)</span>
          </label>
        </div>
      )}

      {tab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">Français (FR)</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Titre SEO (&lt;title&gt;)
              </label>
              <input
                type="text"
                value={draft.seo_meta_fr.site_title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    seo_meta_fr: { ...draft.seo_meta_fr, site_title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meta description FR
              </label>
              <textarea
                rows={2}
                value={draft.seo_meta_fr.meta_description}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    seo_meta_fr: {
                      ...draft.seo_meta_fr,
                      meta_description: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Grand titre Hero FR
              </label>
              <input
                type="text"
                value={draft.hero_fr.headline}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    hero_fr: { ...draft.hero_fr, headline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sous-titre Hero FR
              </label>
              <textarea
                rows={3}
                value={draft.hero_fr.subheadline}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    hero_fr: { ...draft.hero_fr, subheadline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">English (EN)</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SEO Title (&lt;title&gt;)
              </label>
              <input
                type="text"
                value={draft.seo_meta_en.site_title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    seo_meta_en: { ...draft.seo_meta_en, site_title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meta description EN
              </label>
              <textarea
                rows={2}
                value={draft.seo_meta_en.meta_description}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    seo_meta_en: {
                      ...draft.seo_meta_en,
                      meta_description: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hero Headline EN
              </label>
              <input
                type="text"
                value={draft.hero_en.headline}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    hero_en: { ...draft.hero_en, headline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hero Subheadline EN
              </label>
              <textarea
                rows={3}
                value={draft.hero_en.subheadline}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    hero_en: { ...draft.hero_en, subheadline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {tab === 'services' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">
              Commercial FR (Contrat direct Raviva)
            </h3>
            <input
              type="text"
              value={draft.services_commercial_fr.page_title}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  services_commercial_fr: {
                    ...draft.services_commercial_fr,
                    page_title: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
            <textarea
              rows={3}
              value={draft.services_commercial_fr.operational_disclosure}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  services_commercial_fr: {
                    ...draft.services_commercial_fr,
                    operational_disclosure: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">
              Résidentiel FR (Partenaires indépendants)
            </h3>
            <input
              type="text"
              value={draft.services_residential_fr.page_title}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  services_residential_fr: {
                    ...draft.services_residential_fr,
                    page_title: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
            <textarea
              rows={3}
              value={draft.services_residential_fr.operational_disclosure}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  services_residential_fr: {
                    ...draft.services_residential_fr,
                    operational_disclosure: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
        </div>
      )}

      {tab === 'municipalities' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-3">
          <label
            htmlFor="muni-textarea"
            className="block text-sm font-semibold text-slate-900"
          >
            Municipalités desservies (1 municipalité par ligne)
          </label>
          <textarea
            id="muni-textarea"
            rows={14}
            value={municipalitiesText}
            onChange={(e) => setMunicipalitiesText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
          />
        </div>
      )}

      {tab === 'legal' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">
              Pages légales FR (Loi 25 & LPC)
            </h3>
            <input
              type="text"
              value={draft.legal_fr.privacy_title}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  legal_fr: { ...draft.legal_fr, privacy_title: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
            <input
              type="text"
              value={draft.legal_fr.terms_title}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  legal_fr: { ...draft.legal_fr, terms_title: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">
              Legal Pages EN (Law 25 & CPA)
            </h3>
            <input
              type="text"
              value={draft.legal_en.privacy_title}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  legal_en: { ...draft.legal_en, privacy_title: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
            <input
              type="text"
              value={draft.legal_en.terms_title}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  legal_en: { ...draft.legal_en, terms_title: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
        </div>
      )}
    </form>
  );
};
