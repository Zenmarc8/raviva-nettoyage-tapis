-- Raviva Multi-Site Platform: Initial PostgreSQL Schema & Row Level Security
-- Compatible with Supabase Postgres 15+

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. SITES (1 to 50+ isolated domains on a single deployment)
CREATE TABLE IF NOT EXISTS public.sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL UNIQUE,
  brand_name TEXT NOT NULL,
  city_or_region TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '[À CONFIGURER DANS L''ADMIN]',
  email TEXT NOT NULL DEFAULT '[À CONFIGURER DANS L''ADMIN]',
  address_display TEXT NOT NULL DEFAULT '[À CONFIGURER DANS L''ADMIN]',
  primary_color TEXT NOT NULL DEFAULT '#163a5f',
  secondary_color TEXT NOT NULL DEFAULT '#0f766e',
  logo_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  hero_fr JSONB NOT NULL DEFAULT '{}'::jsonb,
  hero_en JSONB NOT NULL DEFAULT '{}'::jsonb,
  services_commercial_fr JSONB NOT NULL DEFAULT '{}'::jsonb,
  services_commercial_en JSONB NOT NULL DEFAULT '{}'::jsonb,
  services_residential_fr JSONB NOT NULL DEFAULT '{}'::jsonb,
  services_residential_en JSONB NOT NULL DEFAULT '{}'::jsonb,
  served_municipalities JSONB NOT NULL DEFAULT '[]'::jsonb,
  legal_fr JSONB NOT NULL DEFAULT '{}'::jsonb,
  legal_en JSONB NOT NULL DEFAULT '{}'::jsonb,
  seo_meta_fr JSONB NOT NULL DEFAULT '{}'::jsonb,
  seo_meta_en JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. SITE MEDIA (SEO media library & portfolio before/after showcase)
CREATE TABLE IF NOT EXISTS public.site_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES public.sites(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('general', 'portfolio', 'article')),
  work_type TEXT NOT NULL CHECK (work_type IN ('commercial', 'residential', 'all')),
  file_url TEXT NOT NULL,
  seo_filename TEXT NOT NULL,
  alt_fr TEXT NOT NULL,
  alt_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  caption_fr TEXT NOT NULL DEFAULT '',
  caption_en TEXT NOT NULL DEFAULT '',
  width INTEGER NOT NULL CHECK (width > 0),
  height INTEGER NOT NULL CHECK (height > 0),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_site_media_site_category ON public.site_media(site_id, category, display_order);

-- 3. ARTICLES (Bilingual Guides Conseils with gradual draft -> published rollout)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES public.sites(id) ON DELETE CASCADE,
  slug_fr TEXT NOT NULL,
  slug_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt_fr TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  content_fr TEXT NOT NULL,
  content_en TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category_fr TEXT NOT NULL DEFAULT 'Guides conseils',
  category_en TEXT NOT NULL DEFAULT 'Care guides',
  reading_time_min INTEGER NOT NULL DEFAULT 5,
  cover_media_id UUID REFERENCES public.site_media(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (site_id, slug_fr),
  UNIQUE (site_id, slug_en)
);

CREATE INDEX IF NOT EXISTS idx_articles_site_status ON public.articles(site_id, status);

-- 4. INTERNAL LINKS (Intra-site keyword -> URL pairs per language)
CREATE TABLE IF NOT EXISTS public.internal_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES public.sites(id) ON DELETE CASCADE,
  language TEXT NOT NULL CHECK (language IN ('fr', 'en')),
  keyword TEXT NOT NULL,
  target_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_internal_links_site_lang ON public.internal_links(site_id, language);

-- 5. LEADS (Strict Commercial vs Residential separation & Law 25 consent check)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES public.sites(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('commercial', 'residential')),
  full_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  service_details TEXT NOT NULL,
  consent_partner_sharing BOOLEAN NOT NULL DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT residential_requires_partner_consent CHECK (
    category = 'commercial'
    OR (
      category = 'residential'
      AND consent_partner_sharing = true
      AND consent_timestamp IS NOT NULL
    )
  )
);

CREATE INDEX IF NOT EXISTS idx_leads_site_category ON public.leads(site_id, category, created_at DESC);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public read policies (strictly active/published content only)
CREATE POLICY "Public read active sites"
  ON public.sites FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public read site media"
  ON public.site_media FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.sites s WHERE s.id = site_id AND s.is_active = true));

CREATE POLICY "Public read published articles"
  ON public.articles FOR SELECT
  USING (
    status = 'published'
    AND EXISTS (SELECT 1 FROM public.sites s WHERE s.id = site_id AND s.is_active = true)
  );

CREATE POLICY "Public read active internal links"
  ON public.internal_links FOR SELECT
  USING (
    is_active = true
    AND EXISTS (SELECT 1 FROM public.sites s WHERE s.id = site_id AND s.is_active = true)
  );

-- Public insert on leads (enforces consent check via table constraint)
CREATE POLICY "Public submit leads"
  ON public.leads FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.sites s WHERE s.id = site_id AND s.is_active = true)
    AND (
      category = 'commercial'
      OR (category = 'residential' AND consent_partner_sharing = true AND consent_timestamp IS NOT NULL)
    )
  );

-- Authenticated admin full access
CREATE POLICY "Admin full access sites"
  ON public.sites FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access site_media"
  ON public.site_media FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access articles"
  ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access internal_links"
  ON public.internal_links FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access leads"
  ON public.leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket for SEO-named media uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read site-media bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

CREATE POLICY "Authenticated upload site-media bucket"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-media');

CREATE POLICY "Authenticated delete site-media bucket"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-media');

-- 6. QUOTE REQUESTS (Direct QuoteWizard & GHL webhook sync table)
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL DEFAULT '',
  selected_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  property_type TEXT NOT NULL CHECK (property_type IN ('commercial', 'residential')),
  preferred_timeframe TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  locale TEXT NOT NULL DEFAULT 'fr' CHECK (locale IN ('fr', 'en')),
  source TEXT NOT NULL DEFAULT 'raviva-website',
  consent_partner_sharing BOOLEAN NOT NULL DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT quote_requests_residential_consent CHECK (
    property_type = 'commercial'
    OR (
      property_type = 'residential'
      AND consent_partner_sharing = true
      AND consent_timestamp IS NOT NULL
    )
  )
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public submit quote_requests"
  ON public.quote_requests FOR INSERT
  WITH CHECK (
    property_type = 'commercial'
    OR (property_type = 'residential' AND consent_partner_sharing = true AND consent_timestamp IS NOT NULL)
  );

CREATE POLICY "Admin full access quote_requests"
  ON public.quote_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);
