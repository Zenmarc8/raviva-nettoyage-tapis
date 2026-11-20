import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedLinksBlock } from '../components/RelatedLinksBlock';
import { SeoImage } from '../components/SeoImage';
import {
  applyHeadSeo,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from '../lib/seo';
import type { InternalLinkRecord } from '../types/database';

interface TocHeading {
  id: string;
  level: 2 | 3;
  text: string;
}

function headingToId(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function injectInternalLinksIntoParagraph(
  paragraph: string,
  links: InternalLinkRecord[],
  usedKeywords: Set<string>
): React.ReactNode[] {
  let nodes: Array<string | React.ReactNode> = [paragraph];

  for (const rule of links) {
    if (!rule.is_active || !rule.keyword.trim() || !rule.target_url.trim()) continue;
    const keyLower = rule.keyword.toLowerCase();
    if (usedKeywords.has(keyLower)) continue;

    let matchedThisRule = false;
    const nextNodes: Array<string | React.ReactNode> = [];

    for (const node of nodes) {
      if (typeof node !== 'string' || matchedThisRule) {
        nextNodes.push(node);
        continue;
      }

      const escaped = rule.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'i');
      const match = node.match(regex);
      if (match && match.index !== undefined) {
        const before = node.slice(0, match.index);
        const matchedText = match[1];
        const after = node.slice(match.index + matchedText.length);
        if (before) nextNodes.push(before);
        nextNodes.push(
          <Link
            key={`${rule.id}-${match.index}`}
            to={rule.target_url}
            className="font-semibold underline underline-offset-2 text-slate-900 hover:opacity-80"
          >
            {matchedText}
          </Link>
        );
        if (after) nextNodes.push(after);
        usedKeywords.add(keyLower);
        matchedThisRule = true;
      } else {
        nextNodes.push(node);
      }
    }

    nodes = nextNodes;
  }

  return nodes;
}

export const GuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { site, lang, articles, media, internalLinks } = useSite();
  const [readProgress, setReadProgress] = useState(0);

  const article = useMemo(
    () => articles.find((a) => a.slug_fr === slug || a.slug_en === slug),
    [articles, slug]
  );

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) {
        setReadProgress(0);
        return;
      }
      setReadProgress(Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  const title = article
    ? lang === 'fr'
      ? article.title_fr
      : article.title_en
    : '';
  const excerpt = article
    ? lang === 'fr'
      ? article.excerpt_fr
      : article.excerpt_en
    : '';
  const body = article
    ? lang === 'fr'
      ? article.content_fr
      : article.content_en
    : '';
  const coverMedia = article
    ? media.find((m) => m.id === article.cover_media_id)
    : undefined;

  const tocHeadings = useMemo<TocHeading[]>(() => {
    if (!body) return [];
    const lines = body.split('\n');
    const found: TocHeading[] = [];
    for (const line of lines) {
      if (line.startsWith('## ')) {
        const text = line.replace(/^##\s+/, '').trim();
        found.push({ id: headingToId(text), level: 2, text });
      } else if (line.startsWith('### ')) {
        const text = line.replace(/^###\s+/, '').trim();
        found.push({ id: headingToId(text), level: 3, text });
      }
    }
    return found;
  }, [body]);

  useEffect(() => {
    if (!article) return;
    const breadcrumbs = [
      { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
      { label: lang === 'fr' ? 'Guides' : 'Guides', path: '/guides' },
      {
        label: title,
        path: `/guides/${lang === 'fr' ? article.slug_fr : article.slug_en}`,
      },
    ];
    applyHeadSeo(site, lang, {
      title: `${title} | ${site.brand_name}`,
      description: excerpt,
      pathFr: `/guides/${article.slug_fr}`,
      pathEn: `/guides/${article.slug_en}`,
      ogType: 'article',
      ogImage: coverMedia?.file_url,
      jsonLd: [
        buildBreadcrumbSchema(breadcrumbs),
        buildArticleSchema(site, article, lang, coverMedia),
      ],
    });
  }, [site, lang, article, title, excerpt, coverMedia]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          {lang === 'fr' ? 'Guide introuvable' : 'Guide not found'}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {lang === 'fr'
            ? 'Cet article est introuvable ou n’est pas encore publié.'
            : 'This article was not found or has not been published yet.'}
        </p>
        <Link
          to="/guides"
          className="mt-6 inline-block px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold"
        >
          {lang === 'fr' ? 'Retour aux guides' : 'Back to guides'}
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    { label: lang === 'fr' ? 'Guides' : 'Guides', path: '/guides' },
    {
      label: title,
      path: `/guides/${lang === 'fr' ? article.slug_fr : article.slug_en}`,
    },
  ];

  const langLinks = internalLinks.filter((l) => l.language === lang && l.is_active);
  const usedKeywords = new Set<string>();
  const blocks = body.split('\n\n').filter((b) => b.trim().length > 0);
  const quotePath = lang === 'fr' ? '/soumission' : '/quote';

  return (
    <div>
      {/* Reading progress bar */}
      <div
        className="fixed top-16 left-0 right-0 h-1 bg-slate-200 z-30"
        role="progressbar"
        aria-valuenow={Math.round(readProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={lang === 'fr' ? 'Progression de lecture' : 'Reading progress'}
      >
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${readProgress}%`,
            backgroundColor: 'var(--brand-secondary)',
          }}
        />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbs} />

        <header className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-500 a11y-muted">
            <span>{lang === 'fr' ? article.category_fr : article.category_en}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {article.reading_time_min}{' '}
              {lang === 'fr' ? 'min de lecture' : 'min read'}
            </span>
          </div>
          <h1
            className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 a11y-muted leading-relaxed">
            {excerpt}
          </p>
        </header>

        {coverMedia && (
          <div className="mt-8 max-w-4xl rounded-lg overflow-hidden border border-slate-200 bg-white">
            <SeoImage
              media={coverMedia}
              showCaption
              className="w-full h-auto object-cover aspect-[16/9]"
            />
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Automatic Table of Contents */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {tocHeadings.length > 0 && (
              <nav
                aria-label={
                  lang === 'fr' ? 'Table des matières' : 'Table of contents'
                }
                className="p-5 bg-white a11y-surface rounded-lg border border-slate-200"
              >
                <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  {lang === 'fr' ? 'Table des matières' : 'Table of Contents'}
                </p>
                <ul className="mt-3 space-y-2 text-xs">
                  {tocHeadings.map((h) => (
                    <li
                      key={h.id}
                      className={h.level === 3 ? 'pl-3' : 'font-medium'}
                    >
                      <a
                        href={`#${h.id}`}
                        className="text-slate-600 hover:text-slate-900 hover:underline leading-snug block"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Contextual CTA */}
            <div className="p-5 bg-white a11y-surface rounded-lg border border-slate-200 space-y-3">
              <p className="text-sm font-semibold text-slate-900">
                {lang === 'fr'
                  ? 'Besoin d’une évaluation ?'
                  : 'Need an Assessment?'}
              </p>
              <p className="text-xs text-slate-600 a11y-muted leading-relaxed">
                {lang === 'fr'
                  ? 'Choisissez entre un contrat commercial géré directement par Raviva ou une mise en relation résidentielle avec un partenaire indépendant vérifié.'
                  : 'Choose between a direct commercial contract managed by Raviva or residential matching with a verified independent partner.'}
              </p>
              <div className="pt-1 flex flex-col gap-2">
                <Link
                  to={`${quotePath}?type=commercial`}
                  className="inline-flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold text-white"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  <span>
                    {lang === 'fr' ? 'Soumission commerciale' : 'Commercial Quote'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  to={`${quotePath}?type=residential`}
                  className="inline-flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-900 border border-slate-300 bg-white hover:bg-slate-50"
                >
                  <span>
                    {lang === 'fr' ? 'Demande résidentielle' : 'Residential Request'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Article Content with Internal Link Injection */}
          <div className="lg:col-span-8 bg-white a11y-surface rounded-lg border border-slate-200 p-6 sm:p-10 space-y-5">
            {blocks.map((block, index) => {
              const trimmed = block.trim();
              if (trimmed.startsWith('## ')) {
                const headingText = trimmed.replace(/^##\s+/, '');
                return (
                  <h2
                    key={index}
                    id={headingToId(headingText)}
                    className="pt-4 text-xl sm:text-2xl font-bold text-slate-900 scroll-mt-24"
                  >
                    {headingText}
                  </h2>
                );
              }
              if (trimmed.startsWith('### ')) {
                const headingText = trimmed.replace(/^###\s+/, '');
                return (
                  <h3
                    key={index}
                    id={headingToId(headingText)}
                    className="pt-2 text-lg font-semibold text-slate-900 scroll-mt-24"
                  >
                    {headingText}
                  </h3>
                );
              }
              return (
                <p
                  key={index}
                  className="text-sm sm:text-base text-slate-700 a11y-muted leading-relaxed"
                >
                  {injectInternalLinksIntoParagraph(trimmed, langLinks, usedKeywords)}
                </p>
              );
            })}
          </div>
        </div>

        <RelatedLinksBlock
          currentPath={`/guides/${lang === 'fr' ? article.slug_fr : article.slug_en}`}
        />
      </article>
    </div>
  );
};
