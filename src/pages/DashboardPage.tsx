import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  FileCode2,
  ImagePlus,
  Inbox,
  Plus,
  RotateCcw,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { GuideArticle, GalleryMediaItem } from '../config/guides.config';
import { useTranslation } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { SeoHead } from '../components/seo/SeoHead';
import { SeoImage } from '../components/common/SeoImage';

type AdminTab = 'guides' | 'media' | 'exact' | 'quotes' | 'sitemap';

export const DashboardPage: React.FC = () => {
  const { locale } = useTranslation();
  const {
    exactContent,
    guides,
    gallery,
    recentQuotes,
    refreshQuotes,
    toggleGuideStatus,
    updateGuide,
    addGalleryItem,
    deleteGalleryItem,
    updateGuarantee,
    updateExpectation,
    resetCmsToDefaults,
    generateSitemapXml,
  } = useCms();

  const [activeTab, setActiveTab] = useState<AdminTab>('guides');
  const [editingGuide, setEditingGuide] = useState<GuideArticle | null>(null);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Guarantee state
  const [guaranteeFr, setGuaranteeFr] = useState(exactContent.operator.mainGuarantee.fr);
  const [guaranteeEn, setGuaranteeEn] = useState(exactContent.operator.mainGuarantee.en);

  // New Media Form State
  const [mediaKind, setMediaKind] = useState<'before_after' | 'diploma'>('before_after');
  const [mediaTitleFr, setMediaTitleFr] = useState('');
  const [mediaTitleEn, setMediaTitleEn] = useState('');
  const [mediaCaptionFr, setMediaCaptionFr] = useState('');
  const [mediaCaptionEn, setMediaCaptionEn] = useState('');
  const [mediaUrl, setMediaUrl] = useState('/images/detachage-vin-rouge-avant-apres.jpg');

  const flashNotice = (msg: string) => {
    setSavedNotice(msg);
    window.setTimeout(() => setSavedNotice(null), 3500);
  };

  const handleSaveGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuide) return;
    updateGuide(editingGuide);
    setEditingGuide(null);
    flashNotice(locale === 'fr' ? 'Guide enregistré avec succès.' : 'Guide saved.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setMediaUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitleFr.trim() || !mediaUrl.trim()) return;
    const newItem: GalleryMediaItem = {
      id: `media-${Date.now()}`,
      kind: mediaKind,
      src: mediaUrl.trim(),
      title: {
        fr: mediaTitleFr.trim(),
        en: (mediaTitleEn || mediaTitleFr).trim(),
      },
      caption: {
        fr: mediaCaptionFr.trim() || mediaTitleFr.trim(),
        en: (mediaCaptionEn || mediaCaptionFr || mediaTitleFr).trim(),
      },
      alt: {
        fr: mediaTitleFr.trim(),
        en: (mediaTitleEn || mediaTitleFr).trim(),
      },
    };
    addGalleryItem(newItem);
    setMediaTitleFr('');
    setMediaTitleEn('');
    setMediaCaptionFr('');
    setMediaCaptionEn('');
    flashNotice(
      locale === 'fr'
        ? 'Élément ajouté à la médiathèque (3:4).'
        : 'Media item added to 3:4 library.'
    );
  };

  const sitemapXml = generateSitemapXml();

  const handleDownloadSitemap = () => {
    const blob = new Blob([sitemapXml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SeoHead
        pageTitle={`Administration CMS | ${SITE_CONFIG.companyName}`}
        pageDescription="Gestion directe du contenu authentique (ravivaExactContent), des 6 guides conseils, des diplômes et réalisations."
      />

      <div className="bg-[#f4f7f5] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-300 pb-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold text-[#146c43]">
                {SITE_CONFIG.shortName} · {SITE_CONFIG.founderName}
              </p>
              <h1 className="mt-1 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {locale === 'fr'
                  ? 'Tableau de bord Admin — Exécution directe'
                  : 'Admin Dashboard — Owner-Operator CMS'}
              </h1>
            </div>

            <button
              type="button"
              onClick={() => {
                resetCmsToDefaults();
                setGuaranteeFr(exactContent.operator.mainGuarantee.fr);
                setGuaranteeEn(exactContent.operator.mainGuarantee.en);
                flashNotice(
                  locale === 'fr'
                    ? 'Contenu réinitialisé aux valeurs authentiques initiales.'
                    : 'Content reset to exact defaults.'
                );
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>{locale === 'fr' ? 'Réinitialiser ravivaExactContent' : 'Reset Exact Content'}</span>
            </button>
          </div>

          {savedNotice && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-950"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              <span>{savedNotice}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Sections Admin">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'guides'}
              onClick={() => setActiveTab('guides')}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                activeTab === 'guides'
                  ? 'bg-[#0b3d2e] text-white'
                  : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Guides ({guides.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'media'}
              onClick={() => setActiveTab('media')}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                activeTab === 'media'
                  ? 'bg-[#0b3d2e] text-white'
                  : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>
                {locale === 'fr'
                  ? `Travaux réels & Diplômes (${gallery.length})`
                  : `Real Work & Diplomas (${gallery.length})`}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'exact'}
              onClick={() => setActiveTab('exact')}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                activeTab === 'exact'
                  ? 'bg-[#0b3d2e] text-white'
                  : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>
                {locale === 'fr'
                  ? `Engagements exacts (${exactContent.expectations.length})`
                  : `Exact Commitments (${exactContent.expectations.length})`}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'quotes'}
              onClick={() => {
                refreshQuotes();
                setActiveTab('quotes');
              }}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                activeTab === 'quotes'
                  ? 'bg-[#0b3d2e] text-white'
                  : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Inbox className="h-4 w-4" aria-hidden="true" />
              <span>
                {locale === 'fr'
                  ? `Soumissions (${recentQuotes.length})`
                  : `Quotes (${recentQuotes.length})`}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'sitemap'}
              onClick={() => setActiveTab('sitemap')}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                activeTab === 'sitemap'
                  ? 'bg-[#0b3d2e] text-white'
                  : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <FileCode2 className="h-4 w-4" aria-hidden="true" />
              <span>sitemap.xml</span>
            </button>
          </div>

          {/* Tab 1: Guides */}
          {activeTab === 'guides' && (
            <div className="mt-6 space-y-4">
              {editingGuide ? (
                <form
                  onSubmit={handleSaveGuide}
                  className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h2 className="font-display text-lg font-bold text-slate-900">
                      {locale === 'fr' ? 'Modifier le guide' : 'Edit Guide'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setEditingGuide(null)}
                      className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                    >
                      {locale === 'fr' ? 'Annuler' : 'Cancel'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-800">Titre (FR)</label>
                      <input
                        type="text"
                        value={editingGuide.title.fr}
                        onChange={(e) =>
                          setEditingGuide({
                            ...editingGuide,
                            title: { ...editingGuide.title, fr: e.target.value },
                          })
                        }
                        className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800">Title (EN)</label>
                      <input
                        type="text"
                        value={editingGuide.title.en}
                        onChange={(e) =>
                          setEditingGuide({
                            ...editingGuide,
                            title: { ...editingGuide.title, en: e.target.value },
                          })
                        }
                        className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800">Résumé (FR)</label>
                      <textarea
                        rows={2}
                        value={editingGuide.excerpt.fr}
                        onChange={(e) =>
                          setEditingGuide({
                            ...editingGuide,
                            excerpt: { ...editingGuide.excerpt, fr: e.target.value },
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800">Excerpt (EN)</label>
                      <textarea
                        rows={2}
                        value={editingGuide.excerpt.en}
                        onChange={(e) =>
                          setEditingGuide({
                            ...editingGuide,
                            excerpt: { ...editingGuide.excerpt, en: e.target.value },
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800">
                        Paragraphes FR (séparés par une ligne vide)
                      </label>
                      <textarea
                        rows={6}
                        value={editingGuide.paragraphs.fr.join('\n\n')}
                        onChange={(e) =>
                          setEditingGuide({
                            ...editingGuide,
                            paragraphs: {
                              ...editingGuide.paragraphs,
                              fr: e.target.value
                                .split(/\n\n+/)
                                .map((s) => s.trim())
                                .filter(Boolean),
                            },
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800">
                        Paragraphs EN (separated by blank line)
                      </label>
                      <textarea
                        rows={6}
                        value={editingGuide.paragraphs.en.join('\n\n')}
                        onChange={(e) =>
                          setEditingGuide({
                            ...editingGuide,
                            paragraphs: {
                              ...editingGuide.paragraphs,
                              en: e.target.value
                                .split(/\n\n+/)
                                .map((s) => s.trim())
                                .filter(Boolean),
                            },
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082d22]"
                    >
                      {locale === 'fr' ? 'Enregistrer les modifications' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {guides.map((g) => (
                    <div
                      key={g.id}
                      className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5 text-xs font-bold">
                          <span
                            className={
                              g.status === 'published' ? 'text-[#146c43]' : 'text-amber-700'
                            }
                          >
                            {g.status === 'published'
                              ? locale === 'fr'
                                ? 'PUBLIÉ'
                                : 'PUBLISHED'
                              : locale === 'fr'
                                ? 'BROUILLON'
                                : 'DRAFT'}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-600">{g.category[locale]}</span>
                        </div>
                        <h2 className="font-display text-base font-bold text-slate-900">
                          {g.title[locale]}
                        </h2>
                        <p className="text-xs text-slate-600">
                          /guides/{g.slug} · {g.internal_links.length}{' '}
                          {locale === 'fr' ? 'liens internes' : 'internal links'}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleGuideStatus(g.id)}
                          className={`min-h-[40px] rounded-lg px-3.5 py-1.5 text-xs font-semibold ${
                            g.status === 'published'
                              ? 'border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                              : 'bg-[#0b3d2e] text-white hover:bg-[#082d22]'
                          }`}
                        >
                          {g.status === 'published'
                            ? locale === 'fr'
                              ? 'Passer en brouillon'
                              : 'Set Draft'
                            : locale === 'fr'
                              ? 'Publier'
                              : 'Publish'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingGuide(g)}
                          className="min-h-[40px] rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                        >
                          {locale === 'fr' ? 'Éditer' : 'Edit'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Real Work Gallery & Diplomas */}
          {activeTab === 'media' && (
            <div className="mt-6 space-y-8">
              <form
                onSubmit={handleAddMedia}
                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h2 className="font-display text-lg font-bold text-slate-900">
                  {locale === 'fr'
                    ? 'Ajouter une photo de travaux réels (/images/) ou un diplôme (/images/diplomes/)'
                    : 'Add Real Work Photo (/images/) or Diploma (/images/diplomes/)'}
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-800">
                      {locale === 'fr' ? 'Catégorie' : 'Category'}
                    </label>
                    <select
                      value={mediaKind}
                      onChange={(e) => setMediaKind(e.target.value as 'before_after' | 'diploma')}
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
                    >
                      <option value="before_after">
                        {locale === 'fr'
                          ? 'Réalisation terrain (ratio vertical 3:4)'
                          : 'Field Project (3:4 vertical)'}
                      </option>
                      <option value="diploma">
                        {locale === 'fr'
                          ? 'Diplôme / Accréditation IICRC (/a-propos)'
                          : 'Diploma / IICRC Accreditation (/a-propos)'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800">
                      {locale === 'fr'
                        ? 'Chemin local (/images/...) ou téléversement'
                        : 'Local path (/images/...) or file upload'}
                    </label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        className="min-h-[42px] flex-1 rounded-lg border border-slate-300 px-3 text-sm"
                      />
                      <label className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-100">
                        <ImagePlus className="h-4 w-4 text-[#0b3d2e]" aria-hidden="true" />
                        <span>{locale === 'fr' ? 'Fichier' : 'File'}</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800">Titre (FR) *</label>
                    <input
                      type="text"
                      required
                      value={mediaTitleFr}
                      onChange={(e) => setMediaTitleFr(e.target.value)}
                      placeholder="Ex. Nettoyage de divan à la mousse sèche"
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800">Title (EN)</label>
                    <input
                      type="text"
                      value={mediaTitleEn}
                      onChange={(e) => setMediaTitleEn(e.target.value)}
                      placeholder="e.g. Dry foam sofa upholstery cleaning"
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800">Légende / Alt (FR)</label>
                    <input
                      type="text"
                      value={mediaCaptionFr}
                      onChange={(e) => setMediaCaptionFr(e.target.value)}
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800">Caption / Alt (EN)</label>
                    <input
                      type="text"
                      value={mediaCaptionEn}
                      onChange={(e) => setMediaCaptionEn(e.target.value)}
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0b3d2e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082d22]"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>{locale === 'fr' ? 'Ajouter à la galerie' : 'Add to Gallery'}</span>
                </button>
              </form>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <SeoImage
                      src={item.src}
                      alt={item.alt[locale]}
                      aspectRatio={item.kind === 'diploma' ? '4/3' : '3/4'}
                      width={900}
                      height={item.kind === 'diploma' ? 675 : 1200}
                      imgClassName={item.kind === 'diploma' ? 'object-contain bg-slate-50 p-2' : 'object-cover'}
                      includeSchema={false}
                    />
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <div className="text-xs font-bold text-[#146c43]">
                          {item.kind === 'diploma'
                            ? locale === 'fr'
                              ? 'DIPLÔME / ACCRÉDITATION'
                              : 'DIPLOMA / ACCREDITATION'
                            : locale === 'fr'
                              ? 'TRAVAIL RÉEL (3:4)'
                              : 'REAL WORK (3:4)'}
                        </div>
                        <h3 className="mt-1 font-display text-sm font-bold text-slate-900">
                          {item.title[locale]}
                        </h3>
                        <p className="mt-1 text-xs text-slate-600">{item.caption[locale]}</p>
                        <p className="mt-1 font-mono text-[11px] text-slate-500">{item.src}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteGalleryItem(item.id)}
                        className="mt-4 inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-800 hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{locale === 'fr' ? 'Retirer' : 'Remove'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Edit ravivaExactContent Commitments & Main Guarantee */}
          {activeTab === 'exact' && (
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  {locale === 'fr' ? 'Engagement principal' : 'Primary Guarantee'}
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-800">Français</label>
                    <input
                      type="text"
                      value={guaranteeFr}
                      onChange={(e) => setGuaranteeFr(e.target.value)}
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800">English</label>
                    <input
                      type="text"
                      value={guaranteeEn}
                      onChange={(e) => setGuaranteeEn(e.target.value)}
                      className="mt-1 min-h-[42px] w-full rounded-lg border border-slate-300 px-3 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateGuarantee(guaranteeFr, guaranteeEn);
                    flashNotice(
                      locale === 'fr' ? 'Engagement mis à jour.' : 'Guarantee updated.'
                    );
                  }}
                  className="mt-4 min-h-[42px] rounded-lg bg-[#0b3d2e] px-4 py-2 text-xs font-semibold text-white hover:bg-[#082d22]"
                >
                  {locale === 'fr' ? 'Enregistrer' : 'Save'}
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  {exactContent.expectationsTitle[locale]}
                </h2>
                <div className="mt-4 space-y-3">
                  {exactContent.expectations.map((exp, idx) => (
                    <div
                      key={exp.id}
                      className="grid grid-cols-1 gap-3 rounded-lg border border-slate-200 p-3 md:grid-cols-2"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-[#146c43]">#{idx + 1} FR</span>
                        <input
                          type="text"
                          value={exp.fr}
                          onChange={(e) => updateExpectation({ ...exp, fr: e.target.value })}
                          className="mt-1 min-h-[40px] w-full rounded-md border border-slate-300 px-2.5 text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#146c43]">#{idx + 1} EN</span>
                        <input
                          type="text"
                          value={exp.en}
                          onChange={(e) => updateExpectation({ ...exp, en: e.target.value })}
                          className="mt-1 min-h-[40px] w-full rounded-md border border-slate-300 px-2.5 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Direct Quote Submissions */}
          {activeTab === 'quotes' && (
            <div className="mt-6 space-y-4">
              {recentQuotes.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
                  {locale === 'fr'
                    ? 'Aucune soumission enregistrée localement pour le moment. Les demandes envoyées via le formulaire direct apparaîtront ici (sans transfert à des tiers).'
                    : 'No locally stored quotes yet. Submissions sent via the direct form appear here (never forwarded to third parties).'}
                </div>
              ) : (
                recentQuotes.map((q, i) => (
                  <div
                    key={`${q.submitted_at}-${i}`}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="font-display text-base font-bold text-slate-900">
                        {q.first_name} {q.last_name} · {q.phone}
                      </div>
                      <span className="text-xs text-slate-500 tabular-nums">
                        {new Date(q.submitted_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-slate-700 sm:grid-cols-3">
                      <div>
                        <strong>{locale === 'fr' ? 'Secteur' : 'Sector'}:</strong>{' '}
                        {q.sector || q.property_type}
                      </div>
                      <div>
                        <strong>{locale === 'fr' ? 'Besoin' : 'Need'}:</strong>{' '}
                        {q.primary_need || q.selected_services.join(', ')}
                      </div>
                      <div>
                        <strong>{locale === 'fr' ? 'Ville / Code postal' : 'City / Postal'}:</strong>{' '}
                        {q.city} ({q.postal_code})
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 5: Dynamic Sitemap XML Preview & Export */}
          {activeTab === 'sitemap' && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900">
                    {locale === 'fr'
                      ? 'Plan de site dynamique (sitemap.xml)'
                      : 'Dynamic Sitemap (sitemap.xml)'}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    {locale === 'fr'
                      ? 'Inclut automatiquement les services actifs, les secteurs, /zones-desservies, /realisations et tous les guides publiés.'
                      : 'Automatically includes active services, regions, /zones-desservies, /realisations, and all published guides.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadSitemap}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0b3d2e] px-4 py-2 text-xs font-semibold text-white hover:bg-[#082d22]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>{locale === 'fr' ? 'Télécharger sitemap.xml' : 'Download sitemap.xml'}</span>
                </button>
              </div>
              <pre className="mt-4 max-h-96 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-emerald-300">
                {sitemapXml}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
