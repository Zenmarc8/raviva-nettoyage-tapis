-- ============================================================================
-- RAVIVA NETTOYAGE DE TAPIS MONTRÉAL — SCHÉMA SUPABASE (POSTGRESQL + RLS)
-- Prêt pour l'enregistrement des demandes de soumission & photos (Loi 25)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  locale TEXT NOT NULL CHECK (locale IN ('fr', 'en')),
  source TEXT NOT NULL DEFAULT 'wizard' CHECK (source IN ('wizard', 'quick_modal')),

  -- Qualification
  selected_services TEXT[] NOT NULL DEFAULT '{}',
  property_type TEXT NOT NULL,
  specific_needs TEXT[] NOT NULL DEFAULT '{}',
  quantity_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  preferred_timeframe TEXT NOT NULL,
  preferred_date DATE NULL,
  notes TEXT NULL,

  -- Coordonnées client
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  in_service_zone BOOLEAN NOT NULL DEFAULT TRUE,

  -- Pièces jointes (URLs Supabase Storage bucket 'quote-photos')
  photo_paths TEXT[] NOT NULL DEFAULT '{}',

  -- Conformité Loi 25 (Québec)
  consent_loi25 BOOLEAN NOT NULL CHECK (consent_loi25 = TRUE),
  consent_loi25_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  consent_marketing BOOLEAN NOT NULL DEFAULT FALSE,

  -- Suivi CRM / GoHighLevel
  crm_sync_status TEXT NOT NULL DEFAULT 'pending' CHECK (crm_sync_status IN ('pending', 'synced', 'failed')),
  crm_contact_id TEXT NULL
);

-- Index pour tri chronologique et filtrage CRM
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_postal ON public.quote_requests (postal_code);

-- Sécurité : activer Row Level Security (RLS)
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Autoriser uniquement l'insertion publique (formulaire web anonyme)
-- Aucune lecture publique autorisée afin de protéger les renseignements personnels (Loi 25)
CREATE POLICY "Allow public quote submission insert"
  ON public.quote_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent_loi25 = TRUE);

-- Lecture réservée au rôle service_role (backend / Edge Function / tableau interne)
CREATE POLICY "Allow service_role full read"
  ON public.quote_requests
  FOR SELECT
  TO service_role
  USING (TRUE);

-- ============================================================================
-- BUCKET STORAGE POUR PHOTOS CLIENT (À exécuter dans Supabase SQL Editor)
-- ============================================================================
-- INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- VALUES ('quote-photos', 'quote-photos', FALSE, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
-- ON CONFLICT (id) DO NOTHING;
