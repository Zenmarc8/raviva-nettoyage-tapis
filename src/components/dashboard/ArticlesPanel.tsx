import React, { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import {
  deleteArticle,
  fetchArticlesBySite,
  slugifyUrl,
  upsertArticle,
} from '../../lib/store';
import type { ArticleRecord, ArticleStatus } from '../../types/database';

interface ArticlesPanelProps {
  siteId: string;
  onArticlesChanged: () => Promise<void>;
}

export const ArticlesPanel: React.FC<ArticlesPanelProps> = ({
  siteId,
  onArticlesChanged,
}) => {
  const [articles, setArticles] = useState<ArticleRecord[]>([]);
  const [editing, setEditing] = useState<ArticleRecord | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const list = await fetchArticlesBySite(siteId, true);
    setArticles(list);
  };

  useEffect(() => {
    void load();
    setEditing(null);
  }, [siteId]);

  const handleToggleStatus = async (article: ArticleRecord) => {
    const nextStatus: ArticleStatus =
      article.status === 'published' ? 'draft' : 'published';
    await upsertArticle({ ...article, status: nextStatus });
    await load();
    await onArticlesChanged();
  };

  const handleNewArticle = () => {
    setEditing({
      id: crypto.randomUUID(),
      site_id: siteId,
      slug_fr: '',
      slug_en: '',
      title_fr: '',
      title_en: '',
      excerpt_fr: '',
      excerpt_en: '',
      content_fr: '## Introduction\n\n',
      content_en: '## Introduction\n\n',
      status: 'draft',
      category_fr: 'Guides conseils',
      category_en: 'Care Guides',
      reading_time_min: 5,
      cover_media_id: null,
      published_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  };

  const handleSaveEditing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      await upsertArticle({
        ...editing,
        slug_fr: editing.slug_fr || slugifyUrl(editing.title_fr),
        slug_en: editing.slug_en || slugifyUrl(editing.title_en),
      });
      setEditing(null);
      await load();
      await onArticlesChanged();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteArticle(id);
    if (editing?.id === id) setEditing(null);
    await load();
    await onArticlesChanged();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Gestionnaire d’articles & libération graduelle
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Basculez entre Brouillon (draft) et Publié (published) pour contrôler l’indexation progressive dans sitemap.xml.
          </p>
        </div>
        <button
          type="button"
          onClick={handleNewArticle}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          Nouvel article
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
              <th className="py-3 px-4">Titre (FR)</th>
              <th className="py-3 px-4">Catégorie</th>
              <th className="py-3 px-4">Statut</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {articles.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50/70">
                <td className="py-3 px-4 font-medium text-slate-900 max-w-md">
                  {a.title_fr}
                </td>
                <td className="py-3 px-4 text-xs text-slate-600">{a.category_fr}</td>
                <td className="py-3 px-4">
                  <button
                    type="button"
                    onClick={() => void handleToggleStatus(a)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                      a.status === 'published'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    {a.status === 'published' ? 'Publié' : 'Brouillon'}
                  </button>
                </td>
                <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setEditing(a)}
                    className="px-3 py-1 rounded border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(a.id)}
                    aria-label="Supprimer l'article"
                    className="p-1.5 text-red-700 hover:bg-red-50 rounded align-middle"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <form
          onSubmit={handleSaveEditing}
          className="bg-white rounded-lg border border-slate-200 p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              Édition bilingue de l’article
            </h3>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Annuler
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Titre FR
              </label>
              <input
                type="text"
                required
                value={editing.title_fr}
                onChange={(e) =>
                  setEditing({ ...editing, title_fr: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Title EN
              </label>
              <input
                type="text"
                required
                value={editing.title_en}
                onChange={(e) =>
                  setEditing({ ...editing, title_en: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Extrait FR
              </label>
              <textarea
                rows={2}
                value={editing.excerpt_fr}
                onChange={(e) =>
                  setEditing({ ...editing, excerpt_fr: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Excerpt EN
              </label>
              <textarea
                rows={2}
                value={editing.excerpt_en}
                onChange={(e) =>
                  setEditing({ ...editing, excerpt_en: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contenu FR (Markdown ## / ###)
              </label>
              <textarea
                rows={10}
                value={editing.content_fr}
                onChange={(e) =>
                  setEditing({ ...editing, content_fr: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Content EN (Markdown ## / ###)
              </label>
              <textarea
                rows={10}
                value={editing.content_en}
                onChange={(e) =>
                  setEditing({ ...editing, content_en: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Statut de publication
              </label>
              <select
                value={editing.status}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    status: e.target.value as ArticleStatus,
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="draft">Brouillon (draft)</option>
                <option value="published">Publié (published)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            {saving ? 'Sauvegarde...' : 'Enregistrer l’article'}
          </button>
        </form>
      )}
    </div>
  );
};
