import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/site.config';

interface SeoImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: '3/4' | '4/3' | '16/9' | '1/1';
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  includeSchema?: boolean;
}

export const SeoImage: React.FC<SeoImageProps> = ({
  src,
  alt,
  caption,
  aspectRatio = '3/4',
  width = 900,
  height = 1200,
  priority = false,
  className = '',
  imgClassName = '',
  includeSchema = true,
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspectRatio === '3/4'
      ? 'aspect-[3/4]'
      : aspectRatio === '16/9'
        ? 'aspect-video'
        : aspectRatio === '1/1'
          ? 'aspect-square'
          : 'aspect-[4/3]';

  const resolvedUrl = src.startsWith('http') || src.startsWith('data:')
    ? src
    : `${SITE_CONFIG.domain}${src.startsWith('/') ? src : `/${src}`}`;

  const imageObjectSchema = includeSchema && !src.startsWith('data:')
    ? {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        contentUrl: resolvedUrl,
        name: alt,
        description: caption || alt,
        width,
        height,
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.founderName,
        },
        copyrightHolder: {
          '@type': 'Organization',
          name: SITE_CONFIG.companyName,
        },
      }
    : null;

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${aspectClass} ${className}`}>
      {imageObjectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }}
        />
      )}
      {hasError ? (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full items-center justify-center bg-[#f4f7f5] p-6 text-center text-xs font-medium text-slate-600"
        >
          {alt}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
};
