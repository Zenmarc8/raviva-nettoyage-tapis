import type {
  ArticleRecord,
  InternalLinkRecord,
  SiteMediaRecord,
  SiteRecord,
} from '../types/database';

export const DEFAULT_SITE_ID = '11111111-1111-4111-8111-111111111101';

export const GREATER_MONTREAL_MUNICIPALITIES: string[] = [
  'Beaconsfield',
  'Beloeil',
  'Blainville',
  'Boisbriand',
  'Bois-des-Filion',
  'Boucherville',
  'Brossard',
  'Candiac',
  'Carignan',
  'Chambly',
  'Charlemagne',
  'Châteauguay',
  'Côte-Saint-Luc',
  'Delson',
  'Deux-Montagnes',
  'Dollard-Des Ormeaux',
  'Dorval',
  'Hampstead',
  'Hudson',
  'Kirkland',
  'La Prairie',
  'Lanoraie',
  "L'Assomption",
  'Laval',
  'Lavaltrie',
  "L'Épiphanie",
  'Léry',
  'Les Cèdres',
  "L'Île-Dorval",
  "L'Île-Perrot",
  'Longueuil',
  'Lorraine',
  'Mascouche',
  'McMasterville',
  'Mercier',
  'Mirabel',
  'Montréal',
  'Montréal-Est',
  'Montréal-Ouest',
  'Mont-Royal',
  'Mont-Saint-Hilaire',
  "Notre-Dame-de-l'Île-Perrot",
  'Oka',
  'Otterburn Park',
  'Pincourt',
  'Pointe-Calumet',
  'Pointe-Claire',
  'Pointe-des-Cascades',
  'Repentigny',
  'Richelieu',
  'Rosemère',
  'Saint-Amable',
  'Saint-Basile-le-Grand',
  'Saint-Bruno-de-Montarville',
  'Saint-Constant',
  'Sainte-Anne-de-Bellevue',
  'Sainte-Anne-des-Plaines',
  'Sainte-Catherine',
  'Sainte-Julie',
  'Sainte-Marthe-sur-le-Lac',
  'Sainte-Thérèse',
  'Saint-Eustache',
  'Saint-Lambert',
  'Saint-Mathias-sur-Richelieu',
  'Saint-Mathieu',
  'Saint-Mathieu-de-Beloeil',
  "Saint-Roch-de-l'Achigan",
  'Saint-Roch-Ouest',
  'Saint-Sulpice',
  'Terrebonne',
  'Varennes',
  'Vaudreuil-Dorion',
  'Vaudreuil-sur-Lac',
  'Verchères',
  'Westmount',
].map((m) => (m === 'Vaudreuil-sur-Lac' ? 'Vaudreuil-sur-le-Lac' : m));

export const INITIAL_SITES: SiteRecord[] = [
  {
    id: DEFAULT_SITE_ID,
    domain: 'ravivanettoyagedetapis.com',
    brand_name: 'Raviva Nettoyage de tapis',
    city_or_region: 'Grand Montréal',
    phone: '514-820-0368',
    email: "[À CONFIGURER DANS L'ADMIN]",
    address_display: 'Montréal, Laval, Rive-Sud & Rive-Nord (Grand Montréal)',
    primary_color: '#163a5f',
    secondary_color: '#0f766e',
    logo_data: {
      wordmark: 'Raviva Nettoyage de Tapis',
      image_url: '/images/logo-raviva-nettoyage-tapis-montreal.png',
      alt_fr: 'Logo Raviva Nettoyage de Tapis — Montréal, Laval et Rive-Sud',
      alt_en: 'Raviva Carpet Cleaning Logo — Montreal, Laval & South Shore',
    },
    hero_fr: {
      eyebrow: 'Grand Montréal · Montréal, Laval, Rive-Sud & Rive-Nord',
      headline:
        'Nettoyage de tapis, carpettes et meubles rembourrés à Montréal, Laval & Rive-Sud',
      subheadline:
        'Deux cadres opérationnels clairs : contrats commerciaux gérés directement par Raviva Nettoyage de Tapis, et demandes résidentielles confiées à une entreprise partenaire indépendante vérifiée.',
      primary_cta: 'Demander une soumission',
      secondary_cta: 'Comparer les deux services',
      commercial_summary:
        'Pour les bureaux, commerces et immeubles : Raviva agit comme fournisseur contractuel unique, conclut le contrat et dirige directement l’exécution des travaux.',
      residential_summary:
        'Pour les résidences privées : Raviva agit comme plateforme de mise en relation ; un partenaire indépendant vérifié prépare la soumission, conclut le contrat, facture et exécute les travaux.',
    },
    hero_en: {
      eyebrow: 'Greater Montreal · Montreal, Laval, South Shore & North Shore',
      headline:
        'Carpet, Area Rug & Upholstery Cleaning in Montreal, Laval & South Shore',
      subheadline:
        'Two transparent operating models: commercial contracts managed directly by Raviva Nettoyage de Tapis, and residential requests matched with a verified independent partner.',
      primary_cta: 'Request a Quote',
      secondary_cta: 'Compare Both Services',
      commercial_summary:
        'For offices, retail, and buildings: Raviva acts as the sole contractual provider, enters into the agreement directly, and oversees execution.',
      residential_summary:
        'For private homes: Raviva operates strictly as a marketing and matching platform; a verified independent partner prepares the quote, contracts, invoices, and completes the work.',
    },
    services_commercial_fr: {
      page_title: 'Services commerciaux de nettoyage de tapis',
      page_subtitle:
        'Gestion contractuelle directe par Raviva Nettoyage de tapis pour bureaux, commerces, hôtellerie, établissements institutionnels et aires communes d’immeubles.',
      operational_disclosure:
        'Cadre contractuel commercial : Raviva Nettoyage de tapis agit à titre de fournisseur contractuel unique. Raviva conclut le contrat de service directement avec votre organisation, assure la coordination et dirige les travaux avec ses propres équipes ou des sous-traitants encadrés sous la responsabilité directe de Raviva.',
      items: [
        {
          id: 'comm-1',
          title: '01. Extraction à l’eau chaude et roto-shampoing commercial',
          description:
            'Traitement en profondeur des corridors, aires ouvertes et salles de réunion fortement sollicités afin de déloger les particules abrasives incrustées et préserver la structure des fibres.',
          method_note: 'Méthode recommandée pour la remise à neuf périodique et le respect des garanties de manufacturiers.',
        },
        {
          id: 'comm-2',
          title: '02. Entretien intermédiaire à faible humidité (encapsulation)',
          description:
            'Intervention rapide entre les nettoyages en profondeur pour les espaces exigeant une remise en circulation rapide, incluant les bureaux occupés en continu.',
          method_note: 'Planification flexible en dehors des heures d’ouverture selon les contraintes du bâtiment.',
        },
        {
          id: 'comm-3',
          title: '03. Nettoyage de mobilier de bureau et cloisons textiles',
          description:
            'Assainissement adapté des fauteuils ergonomiques, banquettes d’accueil et panneaux acoustiques en tissu ou en cuir selon la sensibilité des matériaux.',
          method_note: 'Sélection préalable du procédé humide, combiné ou par solvant selon l’étiquette du fabricant.',
        },
        {
          id: 'comm-4',
          title: '04. Application de protecteur fluoré et programmes planifiés',
          description:
            'Renouvellement de la barrière protectrice sur les zones à trafic intense et établissement de calendriers d’entretien trimestriels ou annuels sur mesure.',
          method_note: 'Devis détaillé au pied carré remis directement par Raviva.',
        },
      ],
    },
    services_commercial_en: {
      page_title: 'Commercial Carpet & Upholstery Cleaning Services',
      page_subtitle:
        'Direct contractual management by Raviva Nettoyage de tapis for offices, retail spaces, hospitality, institutions, and multi-unit common areas.',
      operational_disclosure:
        'Commercial Contractual Framework: Raviva Nettoyage de tapis acts as the sole contractual provider. Raviva executes the service agreement directly with your organization, coordinates scheduling, and directs the work using its own teams or supervised subcontractors under Raviva’s direct responsibility.',
      items: [
        {
          id: 'comm-1',
          title: '01. Commercial Hot-Water Extraction & Rotary Agitation',
          description:
            'Deep restoration for high-traffic corridors, open offices, and boardrooms designed to remove abrasive embedded soil and protect carpet fiber structure.',
          method_note: 'Recommended for periodic deep cleaning and maintaining manufacturer warranty compliance.',
        },
        {
          id: 'comm-2',
          title: '02. Low-Moisture Interim Maintenance (Encapsulation)',
          description:
            'Fast-drying maintenance between deep extractions for facilities requiring minimal downtime and continuous access.',
          method_note: 'After-hours or weekend scheduling aligned with building operations.',
        },
        {
          id: 'comm-3',
          title: '03. Office Seating & Textile Partition Cleaning',
          description:
            'Material-specific cleaning for ergonomic task chairs, lobby seating, and upholstered acoustic panels in fabric or leather.',
          method_note: 'Method selected (wet, combined, or dry solvent) based on textile care codes.',
        },
        {
          id: 'comm-4',
          title: '04. Fluorine Protector Application & Scheduled Programs',
          description:
            'Renewal of sacrificial stain-barrier protection on high-wear lanes alongside tailored quarterly or annual maintenance schedules.',
          method_note: 'Transparent square-footage estimates issued directly by Raviva.',
        },
      ],
    },
    services_residential_fr: {
      page_title: 'Services résidentiels via partenaires indépendants',
      page_subtitle:
        'Nettoyage de tapis mur à mur, escaliers, carpettes et meubles rembourrés à domicile dans le Grand Montréal.',
      operational_disclosure:
        'Divulgation obligatoire sur le rôle de Raviva (Résidentiel) : Pour toute demande résidentielle, Raviva Nettoyage de tapis agit uniquement comme plateforme de commercialisation et de mise en relation. Une entreprise partenaire indépendante vérifiée — dont l’identité complète est communiquée au client au moment approprié — prépare la soumission, conclut le contrat, assure la facturation et exécute les travaux.',
      items: [
        {
          id: 'res-1',
          title: '01. Tapis mur à mur, chambres et sous-sols',
          description:
            'Nettoyage en profondeur par extraction à l’eau chaude avec prétraitement ciblé des voies de circulation et des taches tenaces.',
          method_note: 'Évaluation et soumission préparées par le partenaire indépendant assigné.',
        },
        {
          id: 'res-2',
          title: '02. Escaliers recouverts et carpettes délicates',
          description:
            'Soin minutieux des marches, contremarches et tapis de laine ou synthétiques pour préserver l’apparence et la texture des fibres.',
          method_note: 'Choix de la méthode validé sur place selon la composition de la fibre.',
        },
        {
          id: 'res-3',
          title: '03. Canapés, fauteuils en tissu et mobilier en cuir',
          description:
            'Procédés adaptés aux tissus d’ameublement délicats (méthode humide contrôlée, mousse sèche, solvant ou Dry-Wet-Dry) et hydratation du cuir.',
          method_note: 'Inspection préalable des coutures, du rembourrage et de la stabilité des teintures.',
        },
        {
          id: 'res-4',
          title: '04. Traitement protecteur et réduction des allergènes',
          description:
            'Élimination en profondeur des poussières fines et allergènes piégés dans les fibres, avec option d’application d’un protecteur textile.',
          method_note: 'Contrat et garantie de service émis directement par l’entreprise partenaire.',
        },
      ],
    },
    services_residential_en: {
      page_title: 'Residential Services via Independent Partners',
      page_subtitle:
        'In-home cleaning for wall-to-wall carpets, staircases, area rugs, and upholstered furniture across Greater Montreal.',
      operational_disclosure:
        'Mandatory Residential Role Disclosure: For all residential inquiries, Raviva Nettoyage de tapis acts strictly as a marketing and lead-matching platform. A verified independent partner company—whose full identity is disclosed to the client at the appropriate time—prepares the quote, enters into the service contract, handles billing, and performs the work.',
      items: [
        {
          id: 'res-1',
          title: '01. Wall-to-Wall Carpets, Bedrooms & Basements',
          description:
            'Deep hot-water extraction cleaning with targeted pre-conditioning for high-traffic lanes and household spots.',
          method_note: 'Assessment and estimate prepared directly by the assigned independent partner.',
        },
        {
          id: 'res-2',
          title: '02. Carpeted Staircases & Delicate Area Rugs',
          description:
            'Detailed care for stair treads, risers, wool rugs, and synthetic weaves to preserve pile loft and fiber integrity.',
          method_note: 'Cleaning method confirmed on site according to fiber composition.',
        },
        {
          id: 'res-3',
          title: '03. Fabric Sofas, Armchairs & Leather Upholstery',
          description:
            'Tailored upholstery methods (controlled wet extraction, dry foam, solvent, or Dry-Wet-Dry) and conditioning care for leather.',
          method_note: 'Pre-inspection of seams, cushions, and dye fastness before treatment.',
        },
        {
          id: 'res-4',
          title: '04. Stain Protection & Allergen Reduction',
          description:
            'Thorough removal of trapped dust particles and airborne allergen reservoirs, with optional textile protector renewal.',
          method_note: 'Service contract and workmanship warranty issued directly by the independent partner.',
        },
      ],
    },
    served_municipalities: GREATER_MONTREAL_MUNICIPALITIES,
    legal_fr: {
      privacy_title: 'Politique de confidentialité (Loi 25 du Québec)',
      privacy_updated: 'Mise à jour : 2026',
      privacy_sections: [
        {
          heading: '1. Responsable de la protection des renseignements personnels',
          body: 'Raviva Nettoyage de tapis veille à la protection des renseignements personnels recueillis via ce site conformément à la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25, Québec). Pour toute demande d’accès, de rectification ou de retrait de consentement, veuillez communiquer avec le responsable à l’adresse courriel indiquée dans les coordonnées du site.',
        },
        {
          heading: '2. Distinction entre demandes commerciales et résidentielles',
          body: 'Lorsque vous soumettez une demande commerciale, vos renseignements sont traités directement par Raviva Nettoyage de tapis afin de préparer une soumission et d’exécuter un contrat de service commercial. Lorsque vous soumettez une demande résidentielle, Raviva agit comme intermédiaire de mise en relation : vos coordonnées et détails de projet ne sont transmis à une entreprise partenaire indépendante vérifiée qu’avec votre consentement explicite, libre, éclairé et horodaté au moment de l’envoi du formulaire.',
        },
        {
          heading: '3. Renseignements recueillis et finalités',
          body: 'Nous recueillons uniquement les renseignements nécessaires au traitement de votre demande : nom complet, nom de l’entreprise (volet commercial), courriel, téléphone, municipalité, description des besoins et preuve horodatée de consentement (volet résidentiel). Aucun renseignement personnel n’est vendu à des tiers non liés à votre demande.',
        },
        {
          heading: '4. Conservation, sécurité et droits d’accès',
          body: 'Les données sont hébergées sur une infrastructure sécurisée avec contrôles d’accès stricts. Vous disposez du droit d’accéder à vos renseignements, d’en demander la rectification ou de retirer votre consentement à tout moment.',
        },
      ],
      terms_title: 'Conditions d’utilisation et divulgations légales',
      terms_updated: 'Mise à jour : 2026',
      terms_sections: [
        {
          heading: '1. Rôle contractuel distinct (Commercial vs Résidentiel)',
          body: 'Volet Commercial : Raviva Nettoyage de tapis agit à titre de fournisseur contractuel unique, conclut les contrats commerciaux et dirige directement la prestation des services. Volet Résidentiel : Raviva Nettoyage de tapis agit exclusivement comme plateforme de commercialisation et de mise en relation ; le contrat de service, la soumission, la facturation et l’exécution des travaux relèvent entièrement d’une entreprise partenaire indépendante vérifiée dont l’identité vous est communiquée avant la conclusion de tout contrat.',
        },
        {
          heading: '2. Loi sur la protection du consommateur (Contrats à distance)',
          body: 'Dans le cadre des services résidentiels, tout contrat conclu à distance avec le partenaire indépendant est assujetti aux dispositions applicables de la Loi sur la protection du consommateur du Québec (L.R.Q., c. P-40.1), incluant les obligations d’information préalable sur l’identité du commerçant, la description détaillée des services, le prix total et les droits d’annulation prévus par la loi.',
        },
        {
          heading: '3. Exactitude des informations et propriété intellectuelle',
          body: 'Les guides conseils publiés sur ce site ont une vocation informative. Toute reproduction sans autorisation écrite des textes, photographies et contenus éditoriaux de ce site est interdite.',
        },
      ],
    },
    legal_en: {
      privacy_title: 'Privacy Policy (Quebec Law 25)',
      privacy_updated: 'Updated: 2026',
      privacy_sections: [
        {
          heading: '1. Privacy Officer & Legal Framework',
          body: 'Raviva Nettoyage de tapis safeguards personal information collected on this website in compliance with Quebec’s Act respecting the protection of personal information in the private sector (Law 25). To request access, correction, or withdrawal of consent, contact our Privacy Officer using the email configured on this site.',
        },
        {
          heading: '2. Commercial vs. Residential Data Handling',
          body: 'For commercial inquiries, your information is processed directly by Raviva Nettoyage de tapis to prepare an estimate and manage a direct commercial contract. For residential inquiries, Raviva acts strictly as a matching intermediary: your contact and project details are shared with a verified independent partner company only with your explicit, non-prechecked, timestamped consent.',
        },
        {
          heading: '3. Information Collected & Purpose',
          body: 'We collect only the information required to process your request: full name, company name (for commercial inquiries), email, phone number, municipality, service description, and timestamped partner-sharing consent (for residential inquiries). Personal data is never sold to unrelated third parties.',
        },
        {
          heading: '4. Retention, Security & Your Rights',
          body: 'Records are stored with strict access controls. You have the right to access your personal information, request corrections, or withdraw consent at any time.',
        },
      ],
      terms_title: 'Terms of Use & Legal Disclosures',
      terms_updated: 'Updated: 2026',
      terms_sections: [
        {
          heading: '1. Distinct Contractual Roles (Commercial vs. Residential)',
          body: 'Commercial Services: Raviva Nettoyage de tapis acts as the sole contractual provider, enters into commercial agreements directly, and oversees service delivery. Residential Services: Raviva Nettoyage de tapis operates solely as a marketing and matching platform; quotes, contracts, billing, and service execution are handled exclusively by a verified independent partner company whose identity is disclosed to you before any contract is formed.',
        },
        {
          heading: '2. Quebec Consumer Protection Act (Distance Contracts)',
          body: 'For residential services, any distance contract entered into with the independent partner is governed by the applicable provisions of the Quebec Consumer Protection Act (CQLR, c. P-40.1), including mandatory pre-contractual disclosure of merchant identity, itemized service descriptions, total pricing, and statutory cancellation rights.',
        },
        {
          heading: '3. Content Accuracy & Intellectual Property',
          body: 'Educational guides on this site are provided for informational purposes. Unauthorized reproduction of editorial texts, photography, or site content is prohibited.',
        },
      ],
    },
    seo_meta_fr: {
      site_title: 'Raviva Nettoyage de tapis – Commercial & Résidentiel | Grand Montréal',
      meta_description:
        'Nettoyage professionnel de tapis et meubles dans le Grand Montréal. Contrats commerciaux gérés par Raviva et demandes résidentielles via partenaires indépendants vérifiés.',
      og_title: 'Raviva Nettoyage de tapis | Grand Montréal',
      og_description:
        'Services commerciaux directs par Raviva et mise en relation résidentielle vérifiée pour tapis, carpettes et meubles rembourrés.',
    },
    seo_meta_en: {
      site_title: 'Raviva Nettoyage de tapis – Commercial & Residential | Greater Montreal',
      meta_description:
        'Carpet and upholstery cleaning across Greater Montreal. Direct commercial contracts managed by Raviva and residential requests matched with verified independent partners.',
      og_title: 'Raviva Nettoyage de tapis | Greater Montreal',
      og_description:
        'Direct B2B commercial carpet care by Raviva and verified residential partner matching across 75 Greater Montreal municipalities.',
    },
    is_active: true,
    created_at: '2026-01-15T12:00:00.000Z',
  },
];

export const INITIAL_MEDIA: SiteMediaRecord[] = [
  {
    id: '22222222-2222-4222-8222-222222222201',
    site_id: DEFAULT_SITE_ID,
    category: 'general',
    work_type: 'commercial',
    file_url: '/images/hero-apres-tapis.jpg',
    seo_filename: 'raviva-nettoyage-tapis-commercial-accueil-montreal.jpg',
    alt_fr: 'Hall commercial contemporain à Montréal avec tapis nettoyé en profondeur par Raviva',
    alt_en: 'Contemporary Montreal commercial lobby with deep-cleaned textured carpet by Raviva',
    title_fr: 'Entretien commercial de hall d’accueil à Montréal',
    title_en: 'Commercial lobby carpet care in Montreal',
    caption_fr: 'Tapis commercial à trafic élevé entretenu dans le cadre d’un contrat direct Raviva.',
    caption_en: 'High-traffic commercial carpet maintained under a direct Raviva contract.',
    width: 1408,
    height: 768,
    display_order: 1,
    created_at: '2026-01-15T12:00:00.000Z',
  },
  {
    id: '22222222-2222-4222-8222-222222222202',
    site_id: DEFAULT_SITE_ID,
    category: 'portfolio',
    work_type: 'commercial',
    file_url: '/images/commercial-office-carpet.jpg',
    seo_filename: 'nettoyage-tapis-bureaux-commerciaux-grand-montreal.jpg',
    alt_fr: 'Corridor de bureaux et salle de conférence avec tapis commercial fraîchement extrait',
    alt_en: 'Office corridor and boardroom featuring freshly extracted commercial carpet',
    title_fr: 'Bureaux corporatifs – Extraction à l’eau chaude',
    title_en: 'Corporate offices – Hot-water extraction',
    caption_fr: 'Remise à neuf complète des allées de circulation et salles de réunion.',
    caption_en: 'Full restoration of commercial traffic lanes and conference suites.',
    width: 1280,
    height: 960,
    display_order: 2,
    created_at: '2026-01-15T12:00:00.000Z',
  },
  {
    id: '22222222-2222-4222-8222-222222222203',
    site_id: DEFAULT_SITE_ID,
    category: 'portfolio',
    work_type: 'residential',
    file_url: '/images/residential-living-rug.jpg',
    seo_filename: 'nettoyage-carpette-laine-salon-residentiel-montreal.jpg',
    alt_fr: 'Salon résidentiel lumineux avec carpette en laine et canapé en lin nettoyés',
    alt_en: 'Bright residential living room with freshly cleaned wool area rug and linen sofa',
    title_fr: 'Salon résidentiel – Carpette en laine et divan en lin',
    title_en: 'Residential living room – Wool area rug and linen sofa',
    caption_fr: 'Intervention résidentielle coordonnée via un partenaire indépendant vérifié.',
    caption_en: 'Residential service performed by a verified independent partner.',
    width: 1280,
    height: 960,
    display_order: 3,
    created_at: '2026-01-15T12:00:00.000Z',
  },
  {
    id: '22222222-2222-4222-8222-222222222204',
    site_id: DEFAULT_SITE_ID,
    category: 'portfolio',
    work_type: 'residential',
    file_url: '/images/portfolio-vertical-carpet.jpg',
    seo_filename: 'nettoyage-tapis-escalier-residentiel-grand-montreal.jpg',
    alt_fr: 'Vue verticale d’un tapis d’escalier tissé fraîchement nettoyé sur bois franc',
    alt_en: 'Vertical view of a freshly cleaned woven staircase runner on hardwood steps',
    title_fr: 'Escalier résidentiel – Tapis tissé restauré',
    title_en: 'Residential staircase – Restored woven runner',
    caption_fr: 'Format vertical mettant en évidence la régularité des fibres sur les nez de marche.',
    caption_en: 'Vertical composition highlighting uniform fiber cleanliness across stair treads.',
    width: 960,
    height: 1280,
    display_order: 4,
    created_at: '2026-01-15T12:00:00.000Z',
  },
  {
    id: '22222222-2222-4222-8222-222222222205',
    site_id: DEFAULT_SITE_ID,
    category: 'article',
    work_type: 'all',
    file_url: '/images/upholstery-leather-care.jpg',
    seo_filename: 'nettoyage-meubles-rembourres-cuir-tissu-raviva.jpg',
    alt_fr: 'Canapé en tissu texturé et fauteuil en cuir entretenus avec soin',
    alt_en: 'Tailored fabric sofa and conditioned leather lounge chair carefully maintained',
    title_fr: 'Soin des meubles rembourrés en tissu et en cuir',
    title_en: 'Care for fabric and leather upholstered furniture',
    caption_fr: 'Illustration technique des surfaces d’ameublement en tissu et cuir.',
    caption_en: 'Technical reference for fabric and leather upholstery maintenance.',
    width: 1280,
    height: 960,
    display_order: 5,
    created_at: '2026-01-15T12:00:00.000Z',
  },
];

export const INITIAL_INTERNAL_LINKS: InternalLinkRecord[] = [
  {
    id: '33333333-3333-4333-8333-333333333301',
    site_id: DEFAULT_SITE_ID,
    language: 'fr',
    keyword: "extraction à l'eau chaude",
    target_url: '/services-commerciaux',
    is_active: true,
    created_at: '2026-01-15T12:00:00.000Z',
  },
  {
    id: '33333333-3333-4333-8333-333333333302',
    site_id: DEFAULT_SITE_ID,
    language: 'fr',
    keyword: 'demander une soumission',
    target_url: '/soumission',
    is_active: true,
    created_at: '2026-01-15T12:00:00.000Z',
  },
  {
    id: '33333333-3333-4333-8333-333333333303',
    site_id: DEFAULT_SITE_ID,
    language: 'fr',
    keyword: 'meubles rembourrés',
    target_url: '/services-residentiels',
    is_active: true,
    created_at: '2026-01-15T12:00:00.000Z',
  },
  {
    id: '33333333-3333-4333-8333-333333333304',
    site_id: DEFAULT_SITE_ID,
    language: 'en',
    keyword: 'hot-water extraction',
    target_url: '/commercial-services',
    is_active: true,
    created_at: '2026-01-15T12:00:00.000Z',
  },
  {
    id: '33333333-3333-4333-8333-333333333305',
    site_id: DEFAULT_SITE_ID,
    language: 'en',
    keyword: 'request a quote',
    target_url: '/quote',
    is_active: true,
    created_at: '2026-01-15T12:00:00.000Z',
  },
  {
    id: '33333333-3333-4333-8333-333333333306',
    site_id: DEFAULT_SITE_ID,
    language: 'en',
    keyword: 'upholstered furniture',
    target_url: '/residential-services',
    is_active: true,
    created_at: '2026-01-15T12:00:00.000Z',
  },
];

export const INITIAL_ARTICLES: ArticleRecord[] = [
  {
    id: '44444444-4444-4444-8444-444444444401',
    site_id: DEFAULT_SITE_ID,
    slug_fr: '11-questions-a-poser-avant-nettoyage-tapis',
    slug_en: '11-questions-to-ask-before-carpet-cleaning',
    title_fr: '11 Questions à poser avant de laisser un nettoyeur de tapis entrer chez vous',
    title_en: '11 Questions to Ask Before Letting a Carpet Cleaner Into Your Home',
    excerpt_fr:
      'Comment distinguer un véritable professionnel d’une offre à rabais : formation des techniciens, certifications reconnues comme l’IICRC, choix des méthodes et tarification transparente.',
    excerpt_en:
      'How to separate thorough workmanship from low-ball offers: technician training, recognized certifications such as the IICRC, cleaning methods, and transparent pricing.',
    content_fr: `## Qualité durable ou prix le plus bas ?

Choisir une entreprise de nettoyage de tapis sur le seul critère du tarif le plus bas expose souvent à un nettoyage superficiel, à un séchage trop lent ou à des frais imprévus ajoutés sur place. Avant d’accorder l’accès à votre résidence ou à vos locaux professionnels, il est recommandé d’évaluer l’intervenant selon des critères objectifs.

## Les 11 questions essentielles à vérifier

### 1. Depuis combien de temps l’entreprise exerce-t-elle ses activités ?
Une présence établie démontre une stabilité opérationnelle et une maîtrise des différents types de revêtements textiles rencontrés sur le terrain.

### 2. Quelle est l’expérience pratique du technicien qui interviendra sur place ?
Le nom de l’entreprise ne suffit pas : il importe de savoir si la personne qui manipule l’équipement possède une expérience concrète avec vos fibres et vos taches.

### 3. Le technicien suit-il une formation continue ?
Les textiles synthétiques, les laines, les mélanges et les produits détachants évoluent constamment. Une formation régulière évite les erreurs de température, de pression ou de pH.

### 4. L’intervenant détient-il une certification reconnue (comme l’IICRC) ?
Les certifications délivrées par des organismes reconnus tels que l’IICRC attestent que le technicien a suivi des cours structurés et réussi des examens techniques sur l’entretien des textiles.

### 5. Quelles méthodes de nettoyage sont maîtrisées et proposées ?
Un professionnel compétent ne limite pas ses interventions à une seule approche universelle : il maîtrise l'extraction à l'eau chaude ainsi que les méthodes à faible humidité ou à sec lorsque la fibre l’exige.

### 6. Quel équipement est utilisé ?
La puissance d’aspiration, le contrôle de la température et la qualité des buses déterminent la quantité de résidus et d’humidité extraits du tapis.

### 7. Quelles garanties accompagnent l’intervention ?
Assurez-vous de connaître la portée exacte de la garantie de satisfaction et les recours disponibles si une zone nécessite une retouche après séchage.

### 8. Comment la tarification est-elle calculée ?
Privilégiez une tarification transparente au pied carré plutôt qu’un forfait vague « par pièce » qui ne tient compte ni de la superficie réelle ni de l’état d’encombrement.

### 9. Le devis précise-t-il tout ce qui est inclus ?
Vérifiez si le déplacement, le prétraitement des voies de circulation, le détachage de base et le brossage mécanique font partie du prix annoncé.

### 10. L’entreprise peut-elle fournir des références vérifiables ?
La transparence sur les travaux antérieurs et les coordonnées vérifiables de clients satisfaits confirme le sérieux de l’organisation.

### 11. Qui est votre véritable cocontractant ?
Dans le modèle Raviva Nettoyage de tapis, la distinction est explicite : pour vos besoins commerciaux, Raviva signe directement le contrat et dirige l’exécution. Pour une demande résidentielle, vous pouvez demander une soumission qui sera confiée à un partenaire indépendant vérifié dont l’identité vous est communiquée avant toute entente.`,
    content_en: `## Lasting Quality vs. the Lowest Advertised Price

Selecting a carpet cleaner solely on the lowest advertised price often leads to superficial rinsing, overly wet carpets, or unexpected on-site add-ons. Before granting access to your home or commercial property, evaluate the provider against clear technical standards.

## The 11 Essential Questions to Ask

### 1. How long has the company been operating?
An established operational track record reflects familiarity with diverse carpet constructions and real-world soil conditions.

### 2. What is the hands-on experience of the technician coming to your property?
Beyond the company name, confirm the practical background of the person operating the equipment on your floors.

### 3. Does the technician participate in ongoing training?
Carpet fibers, backing adhesives, and stain chemistry evolve continuously. Ongoing technical education helps prevent shrinkage, browning, or residue buildup.

### 4. Does the technician hold recognized certifications (such as IICRC)?
Independent credentials from organizations like the Institute of Inspection Cleaning and Restoration Certification (IICRC) confirm structured coursework and verified testing.

### 5. Which cleaning methods are offered?
A qualified specialist does not force a single method onto every textile. They should be proficient in both hot-water extraction and low-moisture or dry methods when required by the fiber.

### 6. What equipment is used on site?
Vacuum recovery airflow, controlled water temperature, and proper tool calibration directly govern how thoroughly soil and moisture are extracted.

### 7. What satisfaction warranty applies to the work?
Confirm the scope of the workmanship guarantee in writing before work begins.

### 8. How is pricing calculated?
Favor transparent pricing based on square footage rather than vague "per room" offers that ignore room dimensions and soil levels.

### 9. Does the estimate clarify everything included?
Verify whether pre-conditioning, basic spot treatment, and mechanical agitation are included in the quoted rate.

### 10. Are verifiable references available?
Clear references demonstrate consistent execution and accountability.

### 11. Who is your actual contracting party?
At Raviva Nettoyage de tapis, this distinction is always explicit: for commercial facilities, Raviva signs the contract directly and manages execution. For residential properties, you can request a quote that is matched with a verified independent partner whose identity is disclosed before any agreement is finalized.`,
    status: 'published',
    category_fr: 'Choix du prestataire',
    category_en: 'Choosing a Provider',
    reading_time_min: 6,
    cover_media_id: '22222222-2222-4222-8222-222222222202',
    published_at: '2026-02-01T10:00:00.000Z',
    created_at: '2026-01-20T10:00:00.000Z',
    updated_at: '2026-02-01T10:00:00.000Z',
  },
  {
    id: '44444444-4444-4444-8444-444444444402',
    site_id: DEFAULT_SITE_ID,
    slug_fr: 'meilleure-methode-nettoyage-tapis',
    slug_en: 'best-carpet-cleaning-method',
    title_fr: 'Quelle est la meilleure méthode de nettoyage des tapis ?',
    title_en: 'What Is the Best Carpet Cleaning Method?',
    excerpt_fr:
      'Fréquence recommandée de 6 à 18 mois selon l’achalandage et comparaison technique entre l’extraction à l’eau chaude, le roto-shampoing et les méthodes intermédiaires à sec.',
    excerpt_en:
      'Recommended 6-to-18-month cleaning intervals by traffic level and a technical comparison of hot-water extraction, rotary shampooing, and low-moisture interim methods.',
    content_fr: `## À quelle fréquence nettoyer vos tapis ?

Selon le niveau d’achalandage, la présence d’animaux domestiques ou les exigences des fabricants de revêtements de sol, un nettoyage professionnel en profondeur est généralement recommandé tous les 6 à 18 mois. Respecter cet intervalle évite que les particules abrasives ne cisaillent les fibres à la base et permet de préserver les garanties des manufacturiers.

## L’extraction à l’eau chaude (souvent appelée à tort « nettoyage à la vapeur »)

L’extraction à l’eau chaude demeure la méthode de référence recommandée par la grande majorité des fabricants de tapis pour un nettoyage en profondeur. Contrairement à l’appellation courante de « nettoyage à la vapeur », le procédé repose sur l’injection d’une solution d’eau chaude sous pression contrôlée suivie d’une aspiration puissante qui retire l’eau, les détergents et les saletés dissoutes.

### L’apport du roto-shampoing en prélavage mécanique

Sur les tapis très encrassés ou les couloirs commerciaux fortement sollicités, le recours préalable à un roto-shampoing ou à une agitation mécanique rotative permet de décoller les graisses et les particules tenaces sur toutes les faces de la fibre avant le rinçage par extraction à l'eau chaude. Cette combinaison restaure l’apparence uniforme sans laisser de résidus savonneux collants.

## Les méthodes dites « à sec » ou à faible humidité

Les procédés intermédiaires utilisent très peu d’eau et permettent une remise en service rapide des lieux, particulièrement utile entre deux nettoyages en profondeur :

### 1. Mousse sèche
Un agent nettoyant fouetté en mousse est brossé à la surface des fibres puis aspiré après séchage, limitant la pénétration d’humidité dans le dossier du tapis.

### 2. Bonnet rotatif
Un tampon textile absorbant humidifié d’une solution nettoyante tourne à plat sur la surface du tapis afin de capter la saleté superficielle dans les zones commerciales à fort passage.

### 3. Encapsulation
Des polymères cristallisent autour des particules de saleté en séchant ; l’ensemble est ensuite éliminé lors des passages réguliers d’aspirateur.

### 4. Poudre sèche
Une poudre absorbante imprégnée d’agents nettoyants est brossée dans le velours puis aspirée, ce qui convient notamment aux fibres sensibles à l’humidité.

## Quelle approche choisir pour votre bâtiment ou votre domicile ?

Si votre objectif est l’assainissement complet jusqu’à la base des fibres, l’extraction à l’eau chaude (combinée au besoin à une agitation mécanique) s’impose. Si vous gérez un espace commercial nécessitant un séchage quasi immédiat entre les entretiens majeurs, l’encapsulation ou le bonnet rotatif constituent d’excellents compléments. Pour planifier une intervention adaptée, vous pouvez demander une soumission selon votre profil commercial ou résidentiel.`,
    content_en: `## How Often Should Carpets Be Cleaned?

Depending on foot traffic, indoor air conditions, and manufacturer warranty schedules, professional deep cleaning is typically recommended every 6 to 18 months. Maintaining this interval prevents abrasive grit from cutting into yarn bases and supports carpet warranty requirements.

## Hot-Water Extraction (Often Misnamed "Steam Cleaning")

Hot-water extraction remains the benchmark deep-cleaning method endorsed by most major carpet manufacturers. Although frequently referred to as "steam cleaning," the process actually injects heated water and conditioning solution under controlled pressure, immediately followed by high-airflow vacuum extraction to flush out suspended soil and detergent residues.

### Combining Rotary Shampoo Agitation for Heavy Soil

On heavily soiled residential traffic lanes or commercial corridors, pairing mechanical rotary agitation before the hot-water extraction rinse loosens compacted oils and soil on all sides of the yarn. The extraction step then flushes everything out cleanly without leaving sticky detergent residues behind.

## Low-Moisture and "Dry" Interim Methods

Interim maintenance systems use minimal moisture to allow rapid return to service between periodic deep extractions:

### 1. Dry Foam
A whipped cleaning foam is worked into the upper pile and vacuumed once dry, minimizing moisture transfer to the backing.

### 2. Rotary Bonnet
An absorbent pad dampened with cleaning solution rotates across the carpet surface to lift surface traffic soil in commercial hallways.

### 3. Encapsulation
Specialized polymers surround soil particles and dry into brittle crystals that are removed during subsequent routine vacuuming.

### 4. Dry Compound Powder
An absorbent carrier compound is brushed into the carpet pile to absorb soil before being vacuumed out, useful for moisture-sensitive textiles.

## Choosing the Right Method

For thorough deep restoration down to the backing, hot-water extraction—paired with mechanical agitation where appropriate—is the primary choice. For commercial spaces needing fast-drying interim upkeep between deep cleanings, encapsulation offers reliable appearance management. To schedule an assessment, you can request a quote tailored to your commercial or residential needs.`,
    status: 'published',
    category_fr: 'Méthodes techniques',
    category_en: 'Technical Methods',
    reading_time_min: 5,
    cover_media_id: '22222222-2222-4222-8222-222222222201',
    published_at: '2026-02-05T10:00:00.000Z',
    created_at: '2026-01-22T10:00:00.000Z',
    updated_at: '2026-02-05T10:00:00.000Z',
  },
  {
    id: '44444444-4444-4444-8444-444444444403',
    site_id: DEFAULT_SITE_ID,
    slug_fr: 'verite-protecteurs-tapis-fluorine-ppm',
    slug_en: 'truth-about-carpet-protectors-fluorine-ppm',
    title_fr: 'La vérité sur les protecteurs de tapis (Fluorine et PPM)',
    title_en: 'The Truth About Carpet Protectors (Fluorine and PPM)',
    excerpt_fr:
      'Analyse technique des fibres de nylon, du rôle des acides bloquants de colorants et de la concentration en fluorine (PPM) entre l’usine et la réapplication sur place.',
    excerpt_en:
      'Technical breakdown of nylon carpet fibers, acid dye blockers, and fluorine concentration (PPM) comparing factory mill treatments with on-site low-pressure renewal.',
    content_fr: `## Comment les tapis résistent-ils aux taches ?

Les fibres de nylon modernes comportent naturellement des sites récepteurs susceptibles d’absorber les colorants acides présents dans de nombreuses boissons et aliments. En usine, les fabricants intègrent d’abord des acides bloquants de colorants dans la fibre pour freiner la teinture accidentelle, puis appliquent un traitement fluorochimique.

## Traitement en usine vs application sur place (Fluorine et PPM)

La quantité de fluorine active mesurée en parties par million (PPM) permet de comprendre l’efficacité et la durabilité d’un protecteur :

### Traitement thermique en usine : 250 à 600 PPM
Lors de la fabrication, le protecteur à base de fluorine est fixé à chaud sur la fibre à une concentration généralement située entre 250 et 600 PPM. Cette barrière réduit l’énergie de surface de la fibre, ce qui permet aux liquides de perler et à l’aspirateur de retirer plus facilement les particules sèches.

### Réapplication à basse pression sur site : 300 à 500 PPM
Avec le frottement quotidien des pas et les nettoyages successifs, cette couche superficielle s’use graduellement. Après un nettoyage par extraction à l'eau chaude, l’application sur place à basse pression permet de déposer à nouveau entre 300 et 500 PPM de fluorine sur les fibres propres et encore légèrement humides.

## Une couche sacrificielle comparable au cirage d’une voiture

Un protecteur de tapis ne rend jamais un revêtement invulnérable : il agit comme une couche sacrificielle renouvelable, exactement comme une cire appliquée sur la carrosserie d’une automobile. Il retarde l’absorption des déversements pour vous laisser le temps d’éponger et protège la fibre contre l’abrasion des poussières fines entre les entretiens.`,
    content_en: `## How Modern Carpet Fibers Resist Staining

Nylon carpet fibers naturally contain dye sites capable of bonding with acid dyes found in common beverages and foods. During manufacturing, mills apply acid dye blockers to occupy those sites and finish the yarn with a fluorochemical barrier.

## Mill-Applied vs. On-Site Protector (Fluorine and PPM)

Measuring active fluorine in parts per million (PPM) clarifies how factory protection and post-cleaning renewal work together:

### Factory Heat-Set Application: 250 to 600 PPM
At the mill, fluorochemical protection is heat-cured onto the fiber typically at 250 to 600 PPM. This lowers fiber surface tension so liquid spills bead up longer and dry soil releases more easily during routine vacuuming.

### On-Site Low-Pressure Renewal: 300 to 500 PPM
Foot traffic abrasion and repeated cleanings gradually wear away this microscopic coating. Following thorough hot-water extraction, a calibrated low-pressure spray application restores roughly 300 to 500 PPM of active protection onto clean, damp fibers.

## A Renewable Sacrificial Layer

Carpet protector does not make carpet stain-proof; rather, it acts as a renewable sacrificial barrier—much like wax on an automobile finish. It buys valuable time to blot spills before they set and slows abrasive wear in high-traffic corridors.`,
    status: 'draft',
    category_fr: 'Protection des fibres',
    category_en: 'Fiber Protection',
    reading_time_min: 4,
    cover_media_id: '22222222-2222-4222-8222-222222222204',
    published_at: null,
    created_at: '2026-01-25T10:00:00.000Z',
    updated_at: '2026-01-25T10:00:00.000Z',
  },
  {
    id: '44444444-4444-4444-8444-444444444404',
    site_id: DEFAULT_SITE_ID,
    slug_fr: 'tapis-refuge-acariens-impact-allergies',
    slug_en: 'carpet-dust-mites-allergies-impact',
    title_fr: 'Votre tapis est-il un refuge pour les acariens ? Impact sur les allergies',
    title_en: 'Is Your Carpet a Haven for Dust Mites? Impact on Allergies',
    excerpt_fr:
      'Données scientifiques sur les acariens domestiques, travaux du Dr Thomas Platts-Mills et du Dr Michael Berry (EPA), et rôle du nettoyage en profondeur annuel.',
    excerpt_en:
      'Scientific context on household dust mites, research cited by Dr. Thomas Platts-Mills and Dr. Michael Berry (EPA), and the role of thorough vacuuming and annual deep extraction.',
    content_fr: `## Les acariens dans l’environnement intérieur

Les acariens domestiques sont des organismes microscopiques qui se nourrissent principalement de squames humaines et animales accumulées dans les matelas, les divans et les revêtements textiles. Des recherches entomologiques estiment qu’une habitation peut abriter jusqu’à 2 millions d’acariens, et qu’une seule once de poussière domestique peut contenir jusqu’à 40 000 acariens.

## L’impact respiratoire des allergènes aéroportés

Ce ne sont pas les acariens eux-mêmes qui déclenchent les réactions allergiques, mais leurs déjections microscopiques et fragments biologiques. Lorsque les déplacements ou les courants d’air remettent ces particules en suspension, elles deviennent aéroportées et peuvent irriter les voies respiratoires chez les personnes sensibles.

Le Dr Thomas Platts-Mills, chercheur reconnu sur les allergies liées aux acariens, ainsi que le Dr Michael Berry, ancien directeur de recherche environnementale à l’Agence américaine de protection de l’environnement (EPA), ont tous deux souligné l’importance de contrôler les réservoirs de poussière intérieure plutôt que de laisser les allergènes s’accumuler. Contrairement à une surface dure où chaque pas soulève immédiatement la poussière dans l’air ambiant, le tapis agit comme un filtre qui piège les particules jusqu’à ce qu’elles soient retirées.

## Aspiration rigoureuse et nettoyage en profondeur annuel

Pour que ce rôle de filtre demeure bénéfique plutôt que problématique, deux gestes complémentaires sont indispensables : une aspiration fréquente à l’aide d’un appareil doté d’une bonne filtration, et un nettoyage annuel en profondeur par extraction à l'eau chaude afin d’éliminer les résidus organiques et allergènes incrustés à la base du velours.`,
    content_en: `## Dust Mites in the Indoor Environment

Household dust mites are microscopic organisms that feed primarily on skin flakes shed indoors, thriving in mattresses, upholstered furniture, and textile floorings. Research indicates that a typical home may harbor up to 2 million dust mites, with as many as 40,000 mites recorded in a single ounce of household dust.

## Respiratory Impact of Airborne Allergens

Allergic reactions are triggered primarily by microscopic mite waste particles and biological fragments. When indoor movement disturbs settled dust, these tiny particles become airborne and can aggravate respiratory symptoms in sensitized individuals.

Research highlighted by allergy specialist Dr. Thomas Platts-Mills and former U.S. Environmental Protection Agency (EPA) researcher Dr. Michael Berry underscores the value of managing indoor dust reservoirs systematically. Unlike smooth floors where footsteps readily kick settled dust back into the breathing zone, carpet fibers trap particulates until they are removed.

## Thorough Vacuuming and Annual Deep Extraction

For carpet to function effectively as a particulate trap rather than an overloaded reservoir, regular high-filtration vacuuming must be paired with annual deep hot-water extraction to flush out deeply embedded allergens and organic matter from the base of the pile.`,
    status: 'draft',
    category_fr: 'Qualité de l’air intérieur',
    category_en: 'Indoor Air Quality',
    reading_time_min: 5,
    cover_media_id: '22222222-2222-4222-8222-222222222203',
    published_at: null,
    created_at: '2026-01-26T10:00:00.000Z',
    updated_at: '2026-01-26T10:00:00.000Z',
  },
  {
    id: '44444444-4444-4444-8444-444444444405',
    site_id: DEFAULT_SITE_ID,
    slug_fr: 'prix-vs-valeur-vrai-cout-nettoyage-tapis',
    slug_en: 'price-vs-value-true-cost-carpet-cleaning',
    title_fr: "Prix vs Valeur : comment évaluer le vrai coût d'un nettoyage professionnel",
    title_en: 'Price vs. Value: How to Evaluate the True Cost of Professional Cleaning',
    excerpt_fr:
      'Pourquoi les coupons à prix dérisoire mènent souvent à des ventes sous pression et pourquoi Shaw Industries recommande l’extraction à l’eau chaude avec agitation mécanique.',
    excerpt_en:
      'Why ultra-low teaser coupons often lead to high-pressure upsells, and why Shaw Industries recommends professional hot-water extraction with mechanical agitation over rental machines.',
    content_fr: `## Le piège des offres d’appel à prix dérisoire

Il est tentant de réserver une offre promotionnelle affichant un tarif extrêmement bas pour plusieurs pièces. Dans bien des cas, ces campagnes servent uniquement de porte d’entrée à une stratégie de vente sous pression une fois l’intervenant sur place : prétraitement facturé en supplément, détachage exclu du forfait, ou pression pour ajouter des traitements coûteux afin d’obtenir un résultat minimalement acceptable.

## Pourquoi la location d’appareils grand public montre ses limites

Louer un appareil portatif peut sembler économique à première vue, mais ces machines disposent d’une pression d’injection et d’une puissance d’aspiration nettement inférieures à l’équipement professionnel. Le risque le plus fréquent consiste à saturer le tapis d’eau et de détergent sans pouvoir extraire le surplus, ce qui attire rapidement la saleté après le séchage et favorise le développement d’odeurs d’humidité.

## Les recommandations de Shaw Industries

De grands manufacturiers comme Shaw Industries recommandent explicitement le nettoyage professionnel par extraction à l'eau chaude combiné à une agitation mécanique adéquate plutôt que l’utilisation d’appareils de location grand public. Un travail bien exécuté prolonge la durée de vie utile du revêtement et retarde un remplacement coûteux.

## Transparence avant l’intervention

Avant de confirmer tout rendez-vous, exigez une explication claire des surfaces mesurées, des méthodes employées et de l’identité de l’entreprise qui facturera la prestation. Vous pouvez demander une soumission claire adaptée à votre bâtiment commercial ou à votre résidence.`,
    content_en: `## The Hidden Cost of Ultra-Low Teaser Offers

Discount coupons advertising rock-bottom whole-home rates frequently rely on aggressive on-site upselling once a crew arrives—charging extra for basic pre-sprays, traffic-lane agitation, or spot removal that should be standard practice.

## Limitations of Consumer Rental Machines

Renting a grocery-store carpet machine may look economical initially, but portable rental units lack the water heating stability and vacuum recovery lift of commercial extraction systems. Over-wetting and leftover soap residue often cause rapid re-soiling and prolonged dampness.

## Recommendations from Shaw Industries

Major flooring manufacturers such as Shaw Industries specifically recommend professional hot-water extraction paired with appropriate mechanical agitation over consumer rental equipment. Proper deep extraction protects the investment made in the carpet itself and postpones premature replacement.

## Demand Clarity Before Booking

Before confirming any appointment, insist on transparent scope details, clear measurement pricing, and full clarity on the contracting entity. You can request a quote structured for either commercial property management or residential service.`,
    status: 'draft',
    category_fr: 'Conseils budgétaires',
    category_en: 'Budget & Value',
    reading_time_min: 4,
    cover_media_id: '22222222-2222-4222-8222-222222222202',
    published_at: null,
    created_at: '2026-01-27T10:00:00.000Z',
    updated_at: '2026-01-27T10:00:00.000Z',
  },
  {
    id: '44444444-4444-4444-8444-444444444406',
    site_id: DEFAULT_SITE_ID,
    slug_fr: 'guide-methodes-nettoyage-meubles-rembourres-cuir',
    slug_en: 'complete-guide-upholstery-leather-cleaning-methods',
    title_fr: 'Guide complet : les méthodes de nettoyage des meubles rembourrés et du cuir',
    title_en: 'Complete Guide: Cleaning Methods for Upholstered Furniture and Leather',
    excerpt_fr:
      'Pourquoi les tissus d’ameublement exigent plus de précautions que les tapis : méthodes humides, extraction par solvant, méthode combinée Dry-Wet-Dry et soin du cuir.',
    excerpt_en:
      'Why upholstery requires gentler protocols than carpet: wet methods, dry solvent extraction, the combined Dry-Wet-Dry process, and routine leather conditioning.',
    content_fr: `## Tissus d’ameublement vs tapis : une fragilité bien différente

Contrairement aux tapis conçus en fibres synthétiques robustes pour résister au piétinement, les meubles rembourrés utilisent souvent des tissus naturels ou délicats (coton, lin, velours, soie, rayonne, mélanges teints) montés sur des mousses et structures internes sensibles à l’humidité excessive ou aux variations de pH. Un diagnostic préalable du tissu et des codes d’entretien est toujours requis avant d’intervenir sur vos meubles rembourrés.

## Les méthodes de nettoyage humides

### 1. Extraction à l’eau chaude adaptée à l’ameublement
Réalisée avec des embouts spécialisés à faible débit et aspiration contrôlée pour éviter de détremper les coussins.

### 2. Shampoing humide
Utilisé sur certains tissus synthétiques compatibles nécessitant un brassage manuel ou mécanique doux avant rinçage.

### 3. Mousse sèche à l’éponge de mer naturelle
La mousse est appliquée manuellement à l’aide d’une éponge de mer naturelle afin de nettoyer la surface du textile tout en limitant au maximum l’apport d’eau.

## Les méthodes à sec

### 1. Extraction par solvant
Indiquée pour les textiles portant le code « S » (solvant uniquement) qui risquent de rétrécir, de gondoler ou de déteindre au contact de l’eau.

### 2. Nettoyage manuel à sec
Application contrôlée de solvants ou agents secs par tamponnage manuel sur les zones très délicates comme les passepoils, les franges ou les étoffes anciennes.

## La méthode combinée Dry-Wet-Dry

Pour certains tissus très souillés présentant à la fois des graisses corporelles et des salissures solubles à l’eau, l’approche Dry-Wet-Dry consiste à dégraisser d’abord au solvant sec, à effectuer ensuite une extraction humide contrôlée, puis à terminer par un traitement sec et un séchage accéléré afin de prévenir les cernes d’eau.

## L’entretien régulier du cuir

Le cuir véritable est une matière organique qui perd progressivement ses huiles naturelles sous l’effet de la chaleur ambiante, du soleil et des frottements. Un nettoyage doux suivi d’un conditionnement hydratant régulier préserve sa souplesse, évite le dessèchement et protège la couche de finition pigmentée ou aniline contre les craquelures prématurées.`,
    content_en: `## Upholstery vs. Carpet: Very Different Textile Sensitivities

Unlike floor carpets engineered to withstand heavy foot traffic, upholstered furniture frequently incorporates delicate natural or blended fibers—such as cotton, linen, velvet, rayon, or fine weaves—over foam cushions and wooden frames sensitive to excess moisture or harsh pH. Inspecting textile construction and dye stability is essential before cleaning upholstered furniture.

## Wet Upholstery Cleaning Methods

### 1. Low-Moisture Hot-Water Extraction
Performed with precision upholstery tools designed to control water flow and maximize vacuum recovery so interior cushions do not become saturated.

### 2. Wet Shampooing
Appropriate for resilient synthetic weaves where gentle surface agitation helps lift embedded soils prior to controlled rinsing.

### 3. Dry Foam with Natural Sea Sponge
Thick low-moisture foam is worked lightly across the fabric surface using a natural sea sponge to clean delicate weaves without soaking the backing.

## Dry Cleaning Methods

### 1. Dry Solvent Extraction
Specified for "S"-coded textiles that could shrink, ripple, or bleed dyes if exposed to water-based solutions.

### 2. Manual Dry Spotting and Buffing
Careful hand application of dry cleaning agents on piping, trims, or fragile heritage fabrics.

## The Combined Dry-Wet-Dry Method

When delicate upholstery carries both oily body soils and water-soluble stains, the Dry-Wet-Dry sequence pre-treats oils with dry solvent, follows with controlled low-moisture aqueous extraction, and finishes with rapid drying and protective grooming to prevent water rings.

## Routine Leather Maintenance

Natural leather gradually loses moisture and protective oils due to dry indoor heating, sunlight, and daily contact. Gentle pH-balanced cleaning paired with regular leather conditioning preserves suppleness and protects its topcoat finish against premature cracking.`,
    status: 'draft',
    category_fr: 'Meubles & Cuir',
    category_en: 'Upholstery & Leather',
    reading_time_min: 6,
    cover_media_id: '22222222-2222-4222-8222-222222222205',
    published_at: null,
    created_at: '2026-01-28T10:00:00.000Z',
    updated_at: '2026-01-28T10:00:00.000Z',
  },
];
