import React, { useEffect, useState } from 'react';
import { Trash2, Upload } from 'lucide-react';
import {
  deleteMedia,
  fetchMediaBySite,
  slugifySeoFilename,
  uploadMediaFile,
  upsertMedia,
} from '../../lib/store';
import type {
  MediaCategory,
  MediaWorkType,
  SiteMediaRecord,
} from '../../types/database';

interface MediaPanelProps {
  siteId: string;
  onMediaChanged: () => Promise<void>;
}

export const MediaPanel: React.FC<MediaPanelProps> = ({
  siteId,
  onMediaChanged,
}) => {
  const [items, setItems] = useState<SiteMediaRecord[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [seoFilename, setSeoFilename] = useState('');
  const [category, setCategory] = useState<MediaCategory>('portfolio');
  const [workType, setWorkType] = useState<MediaWorkType>('commercial');
  const [titleFr, setTitleFr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [altFr, setAltFr] = useState('');
  const [altEn, setAltEn] = useState('');
  const [captionFr, setCaptionFr] = useState('');
  const [captionEn, setCaptionEn] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    const list = await fetchMediaBySite(siteId);
    setItems(list);
  };

  useEffect(() => {
    void load();
  }, [siteId]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (!file || !titleFr.trim() || !titleEn.trim() || !altFr.trim() || !altEn.trim()) {
      setMsg(
        'Veuillez sélectionner un fichier et remplir obligatoirement les champs Title et Alt en FR et EN.'
      );
      return;
    }

    setBusy(true);
    try {
      const cleanName = slugifySeoFilename(seoFilename || file.name);
      const { fileUrl, width, height } = await uploadMediaFile(file, cleanName);

      await upsertMedia({
        id: crypto.randomUUID(),
        site_id: siteId,
        category,
        work_type: workType,
        file_url: fileUrl,
        seo_filename: cleanName,
        title_fr: titleFr.trim(),
        title_en: titleEn.trim(),
        alt_fr: altFr.trim(),
        alt_en: altEn.trim(),
        caption_fr: captionFr.trim(),
        caption_en: captionEn.trim(),
        width,
        height,
        display_order: items.length + 1,
        created_at: new Date().toISOString(),
      });

      setFile(null);
      setSeoFilename('');
      setTitleFr('');
      setTitleEn('');
      setAltFr('');
      setAltEn('');
      setCaptionFr('');
      setCaptionEn('');
      await load();
      await onMediaChanged();
      setMsg(`Média ${cleanName} enregistré avec ses balises SEO.`);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Erreur lors du téléversement.');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteMedia(id);
    await load();
    await onMediaChanged();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Médiathèque SEO & Galerie de travaux
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Renommage automatique en slug SEO propre, dimensions explicites (CLS = 0) et champs FR/EN obligatoires.
        </p>
      </div>

      <form
        onSubmit={handleUpload}
        className="bg-white rounded-lg border border-slate-200 p-6 space-y-4"
      >
        <h3 className="text-base font-semibold text-slate-900">
          Téléverser un média SEO
        </h3>
        {msg && (
          <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800">
            {msg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Fichier image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const picked = e.target.files?.[0] || null;
                setFile(picked);
                if (picked && !seoFilename) {
                  setSeoFilename(slugifySeoFilename(picked.name));
                }
              }}
              className="w-full text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nom de fichier SEO (slug) *
            </label>
            <input
              type="text"
              placeholder="nettoyage-tapis-montreal.jpg"
              value={seoFilename}
              onChange={(e) => setSeoFilename(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MediaCategory)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="portfolio">Galerie</option>
                <option value="general">Général</option>
                <option value="article">Article</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Volet
              </label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value as MediaWorkType)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="commercial">Commercial</option>
                <option value="residential">Résidentiel</option>
                <option value="all">Tous</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Title FR *
            </label>
            <input
              type="text"
              required
              value={titleFr}
              onChange={(e) => setTitleFr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Title EN *
            </label>
            <input
              type="text"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div className="hidden md:block" />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alt FR *
            </label>
            <input
              type="text"
              required
              value={altFr}
              onChange={(e) => setAltFr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alt EN *
            </label>
            <input
              type="text"
              required
              value={altEn}
              onChange={(e) => setAltEn(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div className="hidden md:block" />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Légende (Caption FR)
            </label>
            <input
              type="text"
              value={captionFr}
              onChange={(e) => setCaptionFr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Caption EN
            </label>
            <input
              type="text"
              value={captionEn}
              onChange={(e) => setCaptionEn(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50"
        >
          <Upload className="w-4 h-4" aria-hidden="true" />
          {busy ? 'Téléversement...' : 'Ajouter à la médiathèque'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={m.file_url}
                  alt={m.alt_fr}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs font-mono-tabular text-slate-500 truncate">
                  {m.seo_filename}
                </p>
                <p className="text-sm font-semibold text-slate-900">{m.title_fr}</p>
                <p className="text-xs text-slate-600">
                  {m.category} · {m.work_type} · {m.width}×{m.height}
                </p>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => void handleDelete(m.id)}
                className="inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
