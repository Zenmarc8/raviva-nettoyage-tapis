import { SITE_CONFIG } from './site.config';

export type ServiceCategory = 'residential' | 'specialty' | 'commercial';

export type ServiceId =
  | 'wall-to-wall-carpet'
  | 'area-rugs'
  | 'upholstery-sofas'
  | 'mattress-sanitization'
  | 'stain-removal'
  | 'pet-odor-urine'
  | 'antibacterial-treatment'
  | 'eco-stain-protector'
  | 'move-in-move-out'
  | 'commercial-carpets';

export interface ServiceDefinition {
  id: ServiceId;
  slug: string;
  enabled: boolean;
  category: ServiceCategory;
  featured: boolean;
  image: string;
  indicativePrice: {
    fr: string;
    en: string;
  };
}

export const SERVICES_CONFIG: ServiceDefinition[] = [
  {
    id: 'wall-to-wall-carpet',
    slug: 'nettoyage-tapis-mur-a-mur',
    enabled: true,
    category: 'residential',
    featured: true,
    image: SITE_CONFIG.images.hero,
    indicativePrice: {
      fr: 'À partir de 149 $ (3 pièces)',
      en: 'Starting at $149 (3 rooms)',
    },
  },
  {
    id: 'area-rugs',
    slug: 'nettoyage-carpettes-tapis-fins',
    enabled: true,
    category: 'specialty',
    featured: true,
    image: SITE_CONFIG.images.areaRug,
    indicativePrice: {
      fr: 'À partir de 3,50 $ / pi²',
      en: 'Starting at $3.50 / sq.ft.',
    },
  },
  {
    id: 'upholstery-sofas',
    slug: 'nettoyage-meubles-rembourres-sofas',
    enabled: true,
    category: 'residential',
    featured: true,
    image: SITE_CONFIG.images.upholstery,
    indicativePrice: {
      fr: 'Divan 3 places dès 135 $',
      en: '3-seat sofa from $135',
    },
  },
  {
    id: 'pet-odor-urine',
    slug: 'enlevement-des-odeurs',
    enabled: true,
    category: 'specialty',
    featured: true,
    image: SITE_CONFIG.images.beforeAfter,
    indicativePrice: {
      fr: 'Traitement enzymatique · Sur devis',
      en: 'Enzymatic treatment · By quote',
    },
  },
  {
    id: 'antibacterial-treatment',
    slug: 'traitement-antibacterien',
    enabled: true,
    category: 'specialty',
    featured: true,
    image: SITE_CONFIG.images.antibacterial,
    indicativePrice: {
      fr: 'Assainissement vapeur & agent doux · Sur devis',
      en: 'Steam & eco sanitizer · By quote',
    },
  },
  {
    id: 'eco-stain-protector',
    slug: 'protecteur-antitaches-ecologique',
    enabled: true,
    category: 'specialty',
    featured: true,
    image: SITE_CONFIG.images.protector,
    indicativePrice: {
      fr: 'En ajout au nettoyage · Sur devis',
      en: 'Add-on protection · By quote',
    },
  },
  {
    id: 'mattress-sanitization',
    slug: 'desinfection-nettoyage-matelas',
    enabled: true,
    category: 'residential',
    featured: false,
    image: SITE_CONFIG.images.hero,
    indicativePrice: {
      fr: 'Matelas grand format dès 95 $',
      en: 'Queen mattress from $95',
    },
  },
  {
    id: 'stain-removal',
    slug: 'traitement-taches-tenaces',
    enabled: true,
    category: 'specialty',
    featured: false,
    image: SITE_CONFIG.images.beforeAfter,
    indicativePrice: {
      fr: 'Sur évaluation / dès 45 $',
      en: 'By assessment / from $45',
    },
  },
  {
    id: 'move-in-move-out',
    slug: 'menage-fin-de-bail-emmenagement',
    enabled: true,
    category: 'residential',
    featured: false,
    image: SITE_CONFIG.images.hero,
    indicativePrice: {
      fr: 'Forfait logement sur soumission',
      en: 'Move-in/out package by quote',
    },
  },
  {
    id: 'commercial-carpets',
    slug: 'tapis-commerciaux-bureaux',
    enabled: true,
    category: 'commercial',
    featured: false,
    image: SITE_CONFIG.images.upholstery,
    indicativePrice: {
      fr: 'Contrat ou visite · Sur soumission',
      en: 'Contract or one-time · By quote',
    },
  },
];

export const ACTIVE_SERVICES = SERVICES_CONFIG.filter((s) => s.enabled);
