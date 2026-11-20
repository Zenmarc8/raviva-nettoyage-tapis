import {
  DEFAULT_SITE_ID,
  INITIAL_ARTICLES,
  INITIAL_INTERNAL_LINKS,
  INITIAL_MEDIA,
  INITIAL_SITES,
} from '../data/seedData';
import type {
  ArticleRecord,
  InternalLinkRecord,
  LeadRecord,
  LeadStatus,
  SiteMediaRecord,
  SiteRecord,
} from '../types/database';
import { isSupabaseConfigured, supabase } from './supabase';

const STORAGE_KEYS = {
  SITES: 'raviva_cms_sites_v1',
  MEDIA: 'raviva_cms_media_v1',
  ARTICLES: 'raviva_cms_articles_v1',
  LINKS: 'raviva_cms_links_v1',
  LEADS: 'raviva_cms_leads_v1',
  PREVIEW_DOMAIN: 'raviva_preview_domain_v1',
  LOCAL_ADMIN_SESSION: 'raviva_local_admin_session_v1',
};

function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
}

export function ensureLocalSeed(): void {
  if (!window.localStorage.getItem(STORAGE_KEYS.SITES)) {
    writeLocal(STORAGE_KEYS.SITES, INITIAL_SITES);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.MEDIA)) {
    writeLocal(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.ARTICLES)) {
    writeLocal(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.LINKS)) {
    writeLocal(STORAGE_KEYS.LINKS, INITIAL_INTERNAL_LINKS);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.LEADS)) {
    writeLocal(STORAGE_KEYS.LEADS, [] as LeadRecord[]);
  }
}

export function slugifySeoFilename(input: string, fallbackExt = 'jpg'): string {
  const parts = input.split('.');
  const ext = parts.length > 1 ? parts.pop()!.toLowerCase().replace(/[^a-z0-9]/g, '') || fallbackExt : fallbackExt;
  const base = parts.join(' ');
  const normalized = base
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
  return `${normalized || 'raviva-image'}.${ext}`;
}

export function slugifyUrl(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isLocalDevHostname(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.local') ||
    hostname.includes('run.app')
  );
}

export function getPreviewDomainOverride(): string | null {
  if (!isLocalDevHostname(window.location.hostname)) return null;
  return window.localStorage.getItem(STORAGE_KEYS.PREVIEW_DOMAIN);
}

export function setPreviewDomainOverride(domain: string): void {
  if (!isLocalDevHostname(window.location.hostname)) return;
  window.localStorage.setItem(STORAGE_KEYS.PREVIEW_DOMAIN, domain);
}

export async function fetchAllSites(includeInactive = false): Promise<SiteRecord[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from('sites').select('*').order('created_at', { ascending: true });
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as SiteRecord[];
    }
  }
  ensureLocalSeed();
  const sites = readLocal<SiteRecord[]>(STORAGE_KEYS.SITES, INITIAL_SITES);
  return includeInactive ? sites : sites.filter((s) => s.is_active);
}

export async function resolveActiveSite(): Promise<SiteRecord> {
  const sites = await fetchAllSites(false);
  const hostname = window.location.hostname.replace(/^www\./, '').toLowerCase();
  const override = getPreviewDomainOverride();
  const targetDomain = (override || hostname).toLowerCase();

  const exactMatch = sites.find((s) => s.domain.toLowerCase() === targetDomain);
  if (exactMatch) return exactMatch;

  return sites.find((s) => s.id === DEFAULT_SITE_ID) || sites[0] || INITIAL_SITES[0];
}

export async function upsertSite(site: SiteRecord): Promise<SiteRecord> {
  const normalized: SiteRecord = {
    ...site,
    domain: site.domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('sites')
      .upsert(normalized, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as SiteRecord;
  }

  ensureLocalSeed();
  const sites = readLocal<SiteRecord[]>(STORAGE_KEYS.SITES, INITIAL_SITES);
  const existsIdx = sites.findIndex((s) => s.id === normalized.id);
  if (existsIdx >= 0) {
    sites[existsIdx] = normalized;
  } else {
    sites.push(normalized);
  }
  writeLocal(STORAGE_KEYS.SITES, sites);
  return normalized;
}

export async function duplicateSite(
  sourceSiteId: string,
  newDomain: string,
  newBrandName: string,
  newCityOrRegion: string
): Promise<SiteRecord> {
  const allSites = await fetchAllSites(true);
  const source = allSites.find((s) => s.id === sourceSiteId);
  if (!source) throw new Error('Source site not found.');

  const cleanDomain = newDomain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (!cleanDomain) throw new Error('Domain is required.');
  if (allSites.some((s) => s.domain.toLowerCase() === cleanDomain)) {
    throw new Error(`Domain ${cleanDomain} already exists.`);
  }

  const newSiteId = crypto.randomUUID();
  const clonedSite: SiteRecord = {
    ...structuredClone(source),
    id: newSiteId,
    domain: cleanDomain,
    brand_name: newBrandName.trim() || source.brand_name,
    city_or_region: newCityOrRegion.trim() || source.city_or_region,
    logo_data: {
      ...source.logo_data,
      wordmark: newBrandName.trim() || source.brand_name,
    },
    created_at: new Date().toISOString(),
  };

  await upsertSite(clonedSite);

  // Clone media records, internal links, and articles for total isolation
  const [sourceMedia, sourceLinks, sourceArticles] = await Promise.all([
    fetchMediaBySite(sourceSiteId),
    fetchInternalLinks(sourceSiteId),
    fetchArticlesBySite(sourceSiteId, true),
  ]);

  const mediaIdMap = new Map<string, string>();
  for (const media of sourceMedia) {
    const newMediaId = crypto.randomUUID();
    mediaIdMap.set(media.id, newMediaId);
    await upsertMedia({
      ...structuredClone(media),
      id: newMediaId,
      site_id: newSiteId,
      created_at: new Date().toISOString(),
    });
  }

  for (const link of sourceLinks) {
    await upsertInternalLink({
      ...structuredClone(link),
      id: crypto.randomUUID(),
      site_id: newSiteId,
      created_at: new Date().toISOString(),
    });
  }

  for (const article of sourceArticles) {
    await upsertArticle({
      ...structuredClone(article),
      id: crypto.randomUUID(),
      site_id: newSiteId,
      cover_media_id: article.cover_media_id ? mediaIdMap.get(article.cover_media_id) || null : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  return clonedSite;
}

export async function fetchMediaBySite(siteId: string): Promise<SiteMediaRecord[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('site_media')
      .select('*')
      .eq('site_id', siteId)
      .order('display_order', { ascending: true });
    if (!error && data) return data as SiteMediaRecord[];
  }
  ensureLocalSeed();
  return readLocal<SiteMediaRecord[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA)
    .filter((m) => m.site_id === siteId)
    .sort((a, b) => a.display_order - b.display_order);
}

export async function uploadMediaFile(
  file: File,
  seoFilename: string
): Promise<{ fileUrl: string; width: number; height: number }> {
  const cleanFilename = slugifySeoFilename(seoFilename || file.name);

  // Read dimensions cleanly in browser
  const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth || 1200, height: img.naturalHeight || 900 });
      URL.revokeObjectURL(objectUrl);
    };
    img.onerror = () => {
      resolve({ width: 1200, height: 900 });
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  });

  if (isSupabaseConfigured && supabase) {
    const storagePath = `${Date.now()}-${cleanFilename}`;
    const { error } = await supabase.storage.from('site-media').upload(storagePath, file, {
      cacheControl: '31536000',
      upsert: false,
    });
    if (error) throw new Error(error.message);
    const { data: publicUrlData } = supabase.storage.from('site-media').getPublicUrl(storagePath);
    return { fileUrl: publicUrlData.publicUrl, ...dimensions };
  }

  // Local fallback stores compressed Data URL for immediate preview
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Impossible de lire le fichier image.'));
    reader.readAsDataURL(file);
  });

  return { fileUrl: dataUrl, ...dimensions };
}

export async function upsertMedia(media: SiteMediaRecord): Promise<SiteMediaRecord> {
  const sanitized: SiteMediaRecord = {
    ...media,
    seo_filename: slugifySeoFilename(media.seo_filename),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('site_media')
      .upsert(sanitized, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as SiteMediaRecord;
  }

  ensureLocalSeed();
  const list = readLocal<SiteMediaRecord[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
  const idx = list.findIndex((m) => m.id === sanitized.id);
  if (idx >= 0) list[idx] = sanitized;
  else list.push(sanitized);
  writeLocal(STORAGE_KEYS.MEDIA, list);
  return sanitized;
}

export async function deleteMedia(mediaId: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('site_media').delete().eq('id', mediaId);
    if (error) throw new Error(error.message);
    return;
  }
  ensureLocalSeed();
  const list = readLocal<SiteMediaRecord[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA).filter(
    (m) => m.id !== mediaId
  );
  writeLocal(STORAGE_KEYS.MEDIA, list);
}

export async function fetchArticlesBySite(
  siteId: string,
  includeDrafts = false
): Promise<ArticleRecord[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('articles')
      .select('*')
      .eq('site_id', siteId)
      .order('created_at', { ascending: true });
    if (!includeDrafts) query = query.eq('status', 'published');
    const { data, error } = await query;
    if (!error && data) return data as ArticleRecord[];
  }
  ensureLocalSeed();
  const all = readLocal<ArticleRecord[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES).filter(
    (a) => a.site_id === siteId
  );
  return includeDrafts ? all : all.filter((a) => a.status === 'published');
}

export async function upsertArticle(article: ArticleRecord): Promise<ArticleRecord> {
  const now = new Date().toISOString();
  const cleanArticle: ArticleRecord = {
    ...article,
    slug_fr: slugifyUrl(article.slug_fr || article.title_fr),
    slug_en: slugifyUrl(article.slug_en || article.title_en),
    published_at:
      article.status === 'published' ? article.published_at || now : null,
    updated_at: now,
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('articles')
      .upsert(cleanArticle, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as ArticleRecord;
  }

  ensureLocalSeed();
  const list = readLocal<ArticleRecord[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  const idx = list.findIndex((a) => a.id === cleanArticle.id);
  if (idx >= 0) list[idx] = cleanArticle;
  else list.push(cleanArticle);
  writeLocal(STORAGE_KEYS.ARTICLES, list);
  return cleanArticle;
}

export async function deleteArticle(articleId: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('articles').delete().eq('id', articleId);
    if (error) throw new Error(error.message);
    return;
  }
  ensureLocalSeed();
  const list = readLocal<ArticleRecord[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES).filter(
    (a) => a.id !== articleId
  );
  writeLocal(STORAGE_KEYS.ARTICLES, list);
}

export async function fetchInternalLinks(siteId: string): Promise<InternalLinkRecord[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('internal_links')
      .select('*')
      .eq('site_id', siteId)
      .order('created_at', { ascending: true });
    if (!error && data) return data as InternalLinkRecord[];
  }
  ensureLocalSeed();
  return readLocal<InternalLinkRecord[]>(STORAGE_KEYS.LINKS, INITIAL_INTERNAL_LINKS).filter(
    (l) => l.site_id === siteId
  );
}

export async function upsertInternalLink(
  link: InternalLinkRecord
): Promise<InternalLinkRecord> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('internal_links')
      .upsert(link, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as InternalLinkRecord;
  }
  ensureLocalSeed();
  const list = readLocal<InternalLinkRecord[]>(STORAGE_KEYS.LINKS, INITIAL_INTERNAL_LINKS);
  const idx = list.findIndex((l) => l.id === link.id);
  if (idx >= 0) list[idx] = link;
  else list.push(link);
  writeLocal(STORAGE_KEYS.LINKS, list);
  return link;
}

export async function deleteInternalLink(linkId: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('internal_links').delete().eq('id', linkId);
    if (error) throw new Error(error.message);
    return;
  }
  ensureLocalSeed();
  const list = readLocal<InternalLinkRecord[]>(STORAGE_KEYS.LINKS, INITIAL_INTERNAL_LINKS).filter(
    (l) => l.id !== linkId
  );
  writeLocal(STORAGE_KEYS.LINKS, list);
}

export async function submitLead(
  payload: Omit<LeadRecord, 'id' | 'status' | 'created_at'>
): Promise<LeadRecord> {
  if (
    payload.category === 'residential' &&
    (!payload.consent_partner_sharing || !payload.consent_timestamp)
  ) {
    throw new Error(
      'Le consentement explicite au partage avec le partenaire indépendant est obligatoire pour toute demande résidentielle.'
    );
  }

  const record: LeadRecord = {
    ...payload,
    id: crypto.randomUUID(),
    status: 'new',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('leads').insert(record).select().single();
    if (error) throw new Error(error.message);
    return data as LeadRecord;
  }

  ensureLocalSeed();
  const list = readLocal<LeadRecord[]>(STORAGE_KEYS.LEADS, []);
  list.unshift(record);
  writeLocal(STORAGE_KEYS.LEADS, list);
  return record;
}

export async function fetchLeads(): Promise<LeadRecord[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data as LeadRecord[];
  }
  ensureLocalSeed();
  return readLocal<LeadRecord[]>(STORAGE_KEYS.LEADS, []);
}

export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('leads').update({ status }).eq('id', leadId);
    if (error) throw new Error(error.message);
    return;
  }
  ensureLocalSeed();
  const list = readLocal<LeadRecord[]>(STORAGE_KEYS.LEADS, []);
  const target = list.find((l) => l.id === leadId);
  if (target) target.status = status;
  writeLocal(STORAGE_KEYS.LEADS, list);
}

export function getLocalAdminSession(): { email: string } | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.LOCAL_ADMIN_SESSION);
    return raw ? (JSON.parse(raw) as { email: string }) : null;
  } catch {
    return null;
  }
}

export function setLocalAdminSession(session: { email: string } | null): void {
  if (!session) {
    window.localStorage.removeItem(STORAGE_KEYS.LOCAL_ADMIN_SESSION);
  } else {
    window.localStorage.setItem(STORAGE_KEYS.LOCAL_ADMIN_SESSION, JSON.stringify(session));
  }
}
