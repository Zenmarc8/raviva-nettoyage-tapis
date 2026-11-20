import { SITE_CONFIG } from './site.config';

export type ServiceCategory = 'residential' | 'specialty' | 'commercial';

export type ServiceId =
  | 'wall-to-wall-carpet'
  | 'area-rugs'
  | 'upholstery-sofas'
  | 'pet-odor-urine'
  | 'antibacterial-treatment'
  | 'eco-stain-protector'
  | 'water-damage-restoration'
  | 'mattress-sanitization'
  | 'stain-removal'
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
      fr: 'Pré-inspection gratuite · Sur évaluation',
      en: 'Free pre-inspection · On-site quote',
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
      fr: 'Méthode adaptée à la fibre · Sur devis',
      en: 'Fiber-matched method · By quote',
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
      fr: 'Tissus délicats & cuir · Sur évaluation',
      en: 'Delicate fabrics & leather · On-site quote',
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
      fr: 'Urine, fumée, moufette · Sur devis',
      en: 'Pet urine, smoke, skunk · By quote',
    },
  },
  {
    id: 'water-damage-restoration',
    slug: 'restauration-degat-eau',
    enabled: true,
    category: 'specialty',
    featured: true,
    image: SITE_CONFIG.images.waterDamage,
    indicativePrice: {
      fr: 'Extraction d’urgence & assèchement',
      en: 'Emergency extraction & structural drying',
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
      fr: 'Assainissement vapeur & agent doux',
      en: 'Dry steam & eco sanitization',
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
      fr: 'Protecteur au fluorine · En option',
      en: 'Fluorine fiber protector · Optional add-on',
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
      fr: 'Vapeur sèche & extraction · Sur devis',
      en: 'Dry steam & extraction · By quote',
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
      fr: 'Vin rouge, café, encre · Sur évaluation',
      en: 'Red wine, coffee, ink · By assessment',
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
      fr: 'Logement & maison · Sur évaluation',
      en: 'Home & apartment · On-site quote',
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
      fr: 'Exécution directe soir & week-end',
      en: 'Direct evening & weekend service',
    },
  },
];

export const ACTIVE_SERVICES = SERVICES_CONFIG.filter((s) => s.enabled);
