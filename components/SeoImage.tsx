import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import type { SiteMediaRecord } from '../types/database';

interface SeoImageProps {
  media?: SiteMediaRecord;
  src?: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  showCaption?: boolean;
}

export const SeoImage: React.FC<SeoImageProps> = ({
  media,
  src,
  alt,
  title,
  width,
  height,
  priority = false,
  className = '',
  showCaption = false,
}) => {
  const { lang } = useSite();
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = media?.file_url || src || '';
  const resolvedAlt =
    alt ||
    (media ? (lang === 'fr' ? media.alt_fr : media.alt_en) : '');
  const resolvedTitle =
    title ||
    (media ? (lang === 'fr' ? media.title_fr : media.title_en) : '');
  const resolvedCaption = media
    ? lang === 'fr'
      ? media.caption_fr
      : media.caption_en
    : '';
  const resolvedWidth = width || media?.width || 1280;
  const resolvedHeight = height || media?.height || 960;

  if (!resolvedSrc || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 text-slate-500 border border-slate-200 ${className}`}
        style={{ aspectRatio: `${resolvedWidth} / ${resolvedHeight}` }}
        role="img"
        aria-label={resolvedAlt || resolvedTitle || 'Image'}
      >
        <ImageIcon className="w-8 h-8 mb-2 text-slate-400" aria-hidden="true" />
        <span className="text-xs font-medium px-4 text-center">
          {resolvedTitle || resolvedAlt}
        </span>
      </div>
    );
  }

  return (
    <figure className="m-0">
      <img
        src={resolvedSrc}
        alt={resolvedAlt}
        title={resolvedTitle}
        width={resolvedWidth}
        height={resolvedHeight}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
      />
      {showCaption && resolvedCaption && (
        <figcaption className="mt-2 text-xs text-slate-600 a11y-muted">
          {resolvedCaption}
        </figcaption>
      )}
    </figure>
  );
};
