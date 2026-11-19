export type GuideStatus = 'published' | 'draft';

export interface InternalLinkRef {
  labelFr: string;
  labelEn: string;
  to: string;
}

export interface GuideArticle {
  id: string;
  slug: string;
  status: GuideStatus;
  publishedAt: string;
  authorName: string;
  category: {
    fr: string;
    en: string;
  };
  title: {
    fr: string;
    en: string;
  };
  excerpt: {
    fr: string;
    en: string;
  };
  paragraphs: {
    fr: string[];
    en: string[];
  };
  internal_links: InternalLinkRef[];
}

export interface GalleryMediaItem {
  id: string;
  kind: 'before_after' | 'diploma';
  src: string;
  title: {
    fr: string;
    en: string;
  };
  caption: {
    fr: string;
    en: string;
  };
  alt: {
    fr: string;
    en: string;
  };
  isPlaceholder?: boolean;
}
