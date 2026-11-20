export type Language = 'fr' | 'en';

export interface LogoData {
  wordmark: string;
  image_url?: string;
  alt_fr: string;
  alt_en: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primary_cta: string;
  secondary_cta: string;
  commercial_summary: string;
  residential_summary: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  method_note: string;
}

export interface ServicesContent {
  page_title: string;
  page_subtitle: string;
  operational_disclosure: string;
  items: ServiceItem[];
}

export interface LegalContent {
  privacy_title: string;
  privacy_updated: string;
  privacy_sections: { heading: string; body: string }[];
  terms_title: string;
  terms_updated: string;
  terms_sections: { heading: string; body: string }[];
}

export interface SeoMetaContent {
  site_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
}

export interface SiteRecord {
  id: string;
  domain: string;
  brand_name: string;
  city_or_region: string;
  phone: string;
  email: string;
  address_display: string;
  primary_color: string;
  secondary_color: string;
  logo_data: LogoData;
  hero_fr: HeroContent;
  hero_en: HeroContent;
  services_commercial_fr: ServicesContent;
  services_commercial_en: ServicesContent;
  services_residential_fr: ServicesContent;
  services_residential_en: ServicesContent;
  served_municipalities: string[];
  legal_fr: LegalContent;
  legal_en: LegalContent;
  seo_meta_fr: SeoMetaContent;
  seo_meta_en: SeoMetaContent;
  is_active: boolean;
  created_at: string;
}

export type ArticleStatus = 'draft' | 'published';

export interface ArticleRecord {
  id: string;
  site_id: string;
  slug_fr: string;
  slug_en: string;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  content_fr: string;
  content_en: string;
  status: ArticleStatus;
  category_fr: string;
  category_en: string;
  reading_time_min: number;
  cover_media_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type MediaCategory = 'general' | 'portfolio' | 'article';
export type MediaWorkType = 'commercial' | 'residential' | 'all';

export interface SiteMediaRecord {
  id: string;
  site_id: string;
  category: MediaCategory;
  work_type: MediaWorkType;
  file_url: string;
  seo_filename: string;
  alt_fr: string;
  alt_en: string;
  title_fr: string;
  title_en: string;
  caption_fr: string;
  caption_en: string;
  width: number;
  height: number;
  display_order: number;
  created_at: string;
}

export interface InternalLinkRecord {
  id: string;
  site_id: string;
  language: Language;
  keyword: string;
  target_url: string;
  is_active: boolean;
  created_at: string;
}

export type LeadCategory = 'commercial' | 'residential';
export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'closed';

export interface LeadRecord {
  id: string;
  site_id: string;
  category: LeadCategory;
  full_name: string;
  company_name: string | null;
  email: string;
  phone: string;
  city: string;
  service_details: string;
  consent_partner_sharing: boolean;
  consent_timestamp: string | null;
  status: LeadStatus;
  created_at: string;
}

export interface AccessibilitySettings {
  textScale: 100 | 115 | 130;
  highContrast: boolean;
  dyslexiaMode: boolean;
  reducedMotion: boolean;
  underlineLinks: boolean;
}
