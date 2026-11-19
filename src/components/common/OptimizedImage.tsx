import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '3/4' | '1/1';
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  decorative?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  aspectRatio = '4/3',
  width,
  height,
  priority = false,
  className = '',
  imgClassName = '',
  decorative = false,
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-video'
      : aspectRatio === '3/4'
        ? 'aspect-[3/4]'
        : aspectRatio === '1/1'
          ? 'aspect-square'
          : 'aspect-[4/3]';

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${aspectClass} ${className}`}
      aria-hidden={decorative ? 'true' : undefined}
    >
      {!hasError ? (
        <img
          src={src}
          alt={decorative ? '' : alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-950/10 via-slate-100 to-emerald-900/15 p-6 text-center">
          <Sparkles className="mb-2 h-7 w-7 text-emerald-900/50" aria-hidden="true" />
          <span className="text-xs font-medium text-slate-600">{alt || 'Raviva'}</span>
        </div>
      )}
    </div>
  );
};
