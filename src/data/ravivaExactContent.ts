import { GalleryMediaItem, GuideArticle } from '../config/guides.config';
import { SupportedLocale } from '../config/site.config';

export interface ExpectationItem {
  id: string;
  fr: string;
  en: string;
}

export interface ExactRavivaContent {
  operator: {
    brand: string;
    domain: string;
    ownerName: string;
    experienceYears: number;
    phoneDisplay: string;
    phoneHref: string;
    accreditationBody: string;
    accreditationDescription: Record<SupportedLocale, string>;
    mainGuarantee: Record<SupportedLocale, string>;
    positioning: Record<SupportedLocale, string>;
  };
  raviva6x: Array<{
    letter: string;
    title: Record<SupportedLocale, string>;
    description: Record<SupportedLocale, string>;
  }>;
  expectationsTitle: Record<SupportedLocale, string>;
  expectationsSubtitle: Record<SupportedLocale, string>;
  expectations: ExpectationItem[];
  specialtiesSummary: Array<{
    id: string;
    title: Record<SupportedLocale, string>;
    description: Record<SupportedLocale, string>;
  }>;
  realWorkGallery: GalleryMediaItem[];
  diplomasGallery: GalleryMediaItem[];
  guides: GuideArticle[];
}

export const INITIAL_RAVIVA_EXACT_CONTENT: ExactRavivaContent = {
  operator: {
    brand: 'Raviva',
    domain: 'ravivanettoyagedetapis.com',
    ownerName: 'Marc Lemonnier',
    experienceYears: 35,
    phoneDisplay: '514-820-0368',
    phoneHref: 'tel:+15148200368',
    accreditationBody: 'IICRC',
    accreditationDescription: {
      fr: 'Accrédité auprès du IICRC (reconnu comme le principal organisme régissant et établissant les normes en nettoyage et restauration après dégât d’eau).',
      en: 'Accredited by the IICRC (recognized as the leading governing and standard-setting body in cleaning and water damage restoration).',
    },
    mainGuarantee: {
      fr: 'Le Meilleur Nettoyage, ou c’est Gratuit !',
      en: 'The Best Cleaning Ever, or It’s Free!',
    },
    positioning: {
      fr: 'Plus de 35 ans d’expérience terrain en nettoyage professionnel de tapis, carpettes, meubles rembourrés, traitement des odeurs et restauration après dégât d’eau (clientèle résidentielle et commerciale, travaux effectués personnellement).',
      en: 'Over 35 years of hands-on field experience in professional carpet, area rug, upholstery cleaning, odor treatment, and water damage restoration (residential and commercial clients, work performed personally).',
    },
  },
  raviva6x: [
    {
      letter: 'R',
      title: {
        fr: 'Retrait des saletés sèches',
        en: 'Removal of dry soil',
      },
      description: {
        fr: 'Passage rigoureux d’un aspirateur puissant lorsque requis pour déloger les poussières et grains abrasifs secs avant tout traitement humide.',
        en: 'Thorough high-powered vacuuming when required to lift dry dust and abrasive grit prior to moisture treatment.',
      },
    },
    {
      letter: 'A',
      title: {
        fr: 'Analyse et inspection',
        en: 'Analysis & inspection',
      },
      description: {
        fr: 'Pré-inspection gratuite incluant un rapport de l’état des tapis, l’identification des fibres et le choix de la méthode optimale.',
        en: 'Free pre-inspection including a carpet condition report, fiber identification, and selection of the optimal method.',
      },
    },
    {
      letter: 'V',
      title: {
        fr: 'Vaporisation et prétraitement',
        en: 'Vaporization & pre-treatment',
      },
      description: {
        fr: 'Application ciblée de produits biodégradables non toxiques adaptés à chaque fibre et aux taches identifiées.',
        en: 'Targeted application of non-toxic biodegradable solutions matched to each fiber and identified stain.',
      },
    },
    {
      letter: 'I',
      title: {
        fr: 'Intervention mécanique (agitation)',
        en: 'Intensive mechanical agitation',
      },
      description: {
        fr: 'Agitation en profondeur et utilisation d’un système de restauration des tapis avec roto-shampoing lorsque requis.',
        en: 'Deep mechanical agitation and carpet restoration using a rotary shampoo system when required.',
      },
    },
    {
      letter: 'V',
      title: {
        fr: 'Vidange et extraction des contaminants',
        en: 'Vacuum extraction & flushing',
      },
      description: {
        fr: 'Extraction puissante et deuxième extraction systématique afin de retirer les contaminants et laisser votre tapis le plus sec possible.',
        en: 'High-recovery extraction followed by a systematic second extraction pass to remove contaminants and leave carpets as dry as possible.',
      },
    },
    {
      letter: 'A',
      title: {
        fr: 'Assèchement et assurance qualité',
        en: 'Air drying & quality assurance',
      },
      description: {
        fr: 'Possibilité de fournir des ventilateurs et déshumidificateurs (moyennant un léger supplément) pour accélérer le séchage et validation de satisfaction : le meilleur nettoyage ou c’est gratuit.',
        en: 'Optional air movers and dehumidifiers (for a small fee) to speed drying, plus final satisfaction sign-off: the best cleaning or it’s free.',
      },
    },
  ],
  expectationsTitle: {
    fr: 'Ce à quoi vous devez vous attendre',
    en: 'What You Should Expect',
  },
  expectationsSubtitle: {
    fr: 'Les engagements exacts appliqués personnellement sur chaque mandat résidentiel ou commercial par Marc Lemonnier.',
    en: 'The exact commitments personally upheld on every residential and commercial job by Marc Lemonnier.',
  },
  expectations: [
    {
      id: 'exp-1',
      fr: 'Tout travail, petit ou d’envergure, reçoit la même attention aux détails et le même niveau de qualité et de service.',
      en: 'Every job, small or large, receives the same attention to detail and the same level of quality and service.',
    },
    {
      id: 'exp-2',
      fr: 'Les nettoyages de tapis sont toujours effectués par le propriétaire et/ou un technicien formé.',
      en: 'Carpet cleanings are always performed by the owner and/or a trained technician.',
    },
    {
      id: 'exp-3',
      fr: 'Pré-inspection gratuite incluant un rapport de l’état des tapis.',
      en: 'Free pre-inspection including a carpet condition report.',
    },
    {
      id: 'exp-4',
      fr: 'Passage rigoureux d’un aspirateur puissant lorsque requis.',
      en: 'Thorough passage with a powerful vacuum cleaner when required.',
    },
    {
      id: 'exp-5',
      fr: 'Utilisation d’un système de restauration des tapis avec roto-shampoing lorsque requis.',
      en: 'Use of a carpet restoration system with rotary shampoo when required.',
    },
    {
      id: 'exp-6',
      fr: 'Aucun frais supplémentaire pour bouger les meubles standards (pour des raisons d’assurances, nous ne pouvons bouger les équipements électroniques et nous demandons de retirer les bibelots et objets fragiles ou de valeur).',
      en: 'No extra charge for moving standard furniture (for insurance reasons, we cannot move electronic equipment and we ask that knick-knacks and fragile or valuable items be removed).',
    },
    {
      id: 'exp-7',
      fr: 'Aucun frais supplémentaire pour traiter les taches, à l’exception de certaines taches tenaces telles que le vin rouge et les urines d’animaux.',
      en: 'No extra charge for stain treatment, except for certain stubborn stains such as red wine and pet urine.',
    },
    {
      id: 'exp-8',
      fr: 'Deuxième extraction systématique afin de laisser votre tapis le plus sec possible.',
      en: 'Systematic second extraction pass to leave your carpet as dry as possible.',
    },
    {
      id: 'exp-9',
      fr: 'Satisfaction toujours garantie : vous aurez le meilleur nettoyage ou c’est gratuit.',
      en: 'Satisfaction always guaranteed: you will get the best cleaning, or it’s free.',
    },
    {
      id: 'exp-10',
      fr: 'Possibilité de fournir des ventilateurs et déshumidificateurs (moyennant un léger supplément) pour accélérer le séchage et intervenir après dégât d’eau.',
      en: 'Option to provide air movers and dehumidifiers (for a small additional charge) to speed up drying and respond after water damage.',
    },
    {
      id: 'exp-11',
      fr: 'Produits biodégradables non toxiques.',
      en: 'Non-toxic biodegradable products.',
    },
    {
      id: 'exp-12',
      fr: 'Protecteur de tapis et meubles garanti 1 an.',
      en: '1-year warranty on carpet and upholstery protector.',
    },
  ],
  specialtiesSummary: [
    {
      id: 'spec-carpets',
      title: {
        fr: 'Nettoyage de tapis et carpettes',
        en: 'Carpet & Area Rug Cleaning',
      },
      description: {
        fr: 'Extraction à l’eau chaude (souvent appelée à tort nettoyage à la vapeur), extraction combinée au roto-shampoing, méthodes intermédiaires à sec (mousse sèche, bonnet, encapsulation, poudre sèche) et application de protecteur chimique au fluorine (300 à 500 PPM).',
        en: 'Hot water extraction (often mistakenly called steam cleaning), extraction combined with rotary shampoo, intermediate dry methods (dry foam, bonnet, encapsulation, dry powder), and fluorine chemical protector application (300 to 500 PPM).',
      },
    },
    {
      id: 'spec-upholstery',
      title: {
        fr: 'Nettoyage de meubles rembourrés et du cuir',
        en: 'Upholstery & Leather Cleaning',
      },
      description: {
        fr: 'Extraction à l’eau chaude, méthode de shampoing humide, méthode de mousse sèche à l’éponge de mer naturelle, nettoyage à sec par extraction ou manuel, méthode combinée Dry-Wet-Dry, et nettoyage/entretien du cuir.',
        en: 'Hot water extraction, wet shampoo method, natural sea-sponge dry foam method, solvent/manual dry cleaning, combined Dry-Wet-Dry method, and leather cleaning/maintenance.',
      },
    },
    {
      id: 'spec-odors',
      title: {
        fr: 'Traitement des taches et élimination des odeurs de tous types',
        en: 'Stain Treatment & Odor Removal (All Types)',
      },
      description: {
        fr: 'Intervention spécialisée sur les taches tenaces (vin rouge, café, urine d’animaux) et élimination ciblée des odeurs de tous types sur tapis, carpettes et meubles rembourrés.',
        en: 'Targeted intervention on stubborn stains (red wine, coffee, pet urine) and elimination of odors of all types on carpets, rugs, and upholstery.',
      },
    },
    {
      id: 'spec-water',
      title: {
        fr: 'Intervention et restauration après dégât d’eau (accrédité IICRC)',
        en: 'Water Damage Intervention & Restoration (IICRC Accredited)',
      },
      description: {
        fr: 'Extraction d’urgence de l’eau, décontamination et installation de ventilateurs et déshumidificateurs professionnels selon les normes IICRC.',
        en: 'Emergency water extraction, decontamination, and deployment of professional air movers and dehumidifiers following IICRC standards.',
      },
    },
  ],
  realWorkGallery: [
    {
      id: 'work-vin-rouge',
      kind: 'before_after',
      src: '/images/detachage-vin-rouge-avant-apres.jpg',
      title: {
        fr: 'Détachage de tache de vin rouge avant et après',
        en: 'Red wine stain removal before and after',
      },
      caption: {
        fr: 'Tache de vin rouge sur tapis beige avant et après le travail de détachage professionnel.',
        en: 'Red wine stain on beige carpet before and after professional spot removal.',
      },
      alt: {
        fr: 'Tache de vin rouge sur tapis beige avant et après le travail de détachage professionnel',
        en: 'Red wine stain on beige carpet before and after professional spot removal',
      },
    },
    {
      id: 'work-tapis-beige-1',
      kind: 'before_after',
      src: '/images/travaux-tapis-beige-1.jpg',
      title: {
        fr: 'Nettoyage en profondeur tapis beige – Contraste avant/après',
        en: 'Deep cleaning beige carpet – Before/after contrast',
      },
      caption: {
        fr: 'Démarcation nette entre la moitié nettoyée et la moitié sale d’un tapis beige.',
        en: 'Sharp contrast between the cleaned half and soiled half of a beige carpet.',
      },
      alt: {
        fr: 'Démarcation nette entre la moitié nettoyée et la moitié sale d’un tapis beige',
        en: 'Sharp contrast between the cleaned half and soiled half of a beige carpet',
      },
    },
    {
      id: 'work-tapis-beige-2',
      kind: 'before_after',
      src: '/images/travaux-tapis-beige-2.jpg',
      title: {
        fr: 'Traitement à la mousse contrôlée sur tapis beige',
        en: 'Controlled foam treatment on beige carpet',
      },
      caption: {
        fr: 'Comparaison avant et après nettoyage sur tapis résidentiel beige.',
        en: 'Before and after cleaning comparison on residential beige carpet.',
      },
      alt: {
        fr: 'Comparaison avant et après nettoyage sur tapis résidentiel beige',
        en: 'Before and after cleaning comparison on residential beige carpet',
      },
    },
    {
      id: 'work-salon-machine',
      kind: 'before_after',
      src: '/images/travaux-tapis-salon-machine.jpg',
      title: {
        fr: 'Équipement professionnel en action en salon',
        en: 'Professional equipment in action in living room',
      },
      caption: {
        fr: 'Appareil de nettoyage professionnel et pulvérisateur de prétraitement sur tapis de salon.',
        en: 'Professional cleaning unit and pre-treatment sprayer on living room carpet.',
      },
      alt: {
        fr: 'Appareil de nettoyage professionnel et pulvérisateur de prétraitement sur tapis de salon',
        en: 'Professional cleaning unit and pre-treatment sprayer on living room carpet',
      },
    },
    {
      id: 'work-commercial-1',
      kind: 'before_after',
      src: '/images/travaux-tapis-commercial-1.jpg',
      title: {
        fr: 'Nettoyage de tapis commercial – Bureaux',
        en: 'Commercial carpet cleaning – Offices',
      },
      caption: {
        fr: 'Démarcation avant et après nettoyage sur tapis commercial de bureau.',
        en: 'Before and after cleaning line on commercial office carpeting.',
      },
      alt: {
        fr: 'Démarcation avant et après nettoyage sur tapis commercial de bureau',
        en: 'Before and after cleaning line on commercial office carpeting',
      },
    },
    {
      id: 'work-commercial-2',
      kind: 'before_after',
      src: '/images/travaux-tapis-commercial-2.jpg',
      title: {
        fr: 'Entretien de tapis commercial sous mobilier de bureau',
        en: 'Commercial carpet care under office desks',
      },
      caption: {
        fr: 'Nettoyage de tapis commercial sous des tables de travail montrant la zone nettoyée.',
        en: 'Commercial carpet cleaning beneath office tables showing the cleaned section.',
      },
      alt: {
        fr: 'Nettoyage de tapis commercial sous des tables de travail montrant la zone nettoyée',
        en: 'Commercial carpet cleaning beneath office tables showing the cleaned section',
      },
    },
    {
      id: 'work-gris-passage',
      kind: 'before_after',
      src: '/images/travaux-tapis-gris-passage.jpg',
      title: {
        fr: 'Restauration zone de fort passage sur tapis gris',
        en: 'High-traffic lane restoration on grey carpet',
      },
      caption: {
        fr: 'Tapis gris montrant la moitié nettoyée à droite et la trace d’usure à gauche.',
        en: 'Grey carpet showing the cleaned half on the right and traffic wear on the left.',
      },
      alt: {
        fr: 'Tapis gris montrant la moitié nettoyée à droite et la trace d’usure à gauche',
        en: 'Grey carpet showing the cleaned half on the right and traffic wear on the left',
      },
    },
    {
      id: 'work-mousse-bureau',
      kind: 'before_after',
      src: '/images/travaux-tapis-mousse-bureau.jpg',
      title: {
        fr: 'Application ciblée sur tapis commercial sous tables de bureau',
        en: 'Targeted commercial carpet application under desks',
      },
      caption: {
        fr: 'Traitement sur tapis de bureau gris avec démarcation nette entre les zones traitées.',
        en: 'Commercial grey carpet treatment showing clear contrast across treated lanes.',
      },
      alt: {
        fr: 'Traitement de tapis commercial gris sous mobilier de bureau',
        en: 'Grey commercial carpet treatment under office desks',
      },
    },
    {
      id: 'work-beige-entree',
      kind: 'before_after',
      src: '/images/travaux-tapis-beige-entree.jpg',
      title: {
        fr: 'Nettoyage en profondeur tapis résidentiel en bordure de céramique',
        en: 'Deep residential carpet cleaning along tile transition',
      },
      caption: {
        fr: 'Tapis résidentiel beige nettoyé jusqu’au seuil de céramique.',
        en: 'Beige residential carpet cleaned up to the tile threshold.',
      },
      alt: {
        fr: 'Tapis résidentiel beige nettoyé jusqu’à la bordure de céramique',
        en: 'Beige residential carpet cleaned up to the tile border',
      },
    },
  ],
  diplomasGallery: [
    {
      id: 'diploma-iicrc',
      kind: 'diploma',
      src: '/images/diplomes/iicrc.jpg',
      title: {
        fr: 'Accréditation officielle IICRC — Marc Lemonnier (#88175)',
        en: 'Official IICRC Registration — Marc Lemonnier (#88175)',
      },
      caption: {
        fr: 'Institute of Inspection Cleaning and Restoration Certification : Water Damage Restoration & Odor Control.',
        en: 'Institute of Inspection Cleaning and Restoration Certification: Water Damage Restoration & Odor Control.',
      },
      alt: {
        fr: 'Certificat officiel IICRC décerné à Marc Lemonnier pour la restauration après dégât d’eau et le contrôle des odeurs',
        en: 'Official IICRC certificate awarded to Marc Lemonnier for Water Damage Restoration and Odor Control',
      },
    },
    {
      id: 'diploma-microbienne-210',
      kind: 'diploma',
      src: '/images/diplomes/decontamination-microbienne-210.jpg',
      title: {
        fr: 'Certificat RSA — Décontamination microbienne 210',
        en: 'RSA Certificate — Microbial Decontamination 210',
      },
      caption: {
        fr: 'Formation spécialisée complétée par Marc Lemonnier auprès de Restoration Sciences Academy.',
        en: 'Specialized course completed by Marc Lemonnier at Restoration Sciences Academy.',
      },
      alt: {
        fr: 'Certificat de participation Décontamination microbienne 210 décerné à Marc Lemonnier',
        en: 'Certificate of completion for Microbial Decontamination 210 awarded to Marc Lemonnier',
      },
    },
    {
      id: 'diploma-moisissure',
      kind: 'diploma',
      src: '/images/diplomes/enlevement-moisissure-decontamination.jpg',
      title: {
        fr: 'Certificat RSA #1046 — Enlèvement de moisissure et décontamination microbienne',
        en: 'RSA Certificate #1046 — Microbial Remediation',
      },
      caption: {
        fr: 'Attestation de compétence technique en remédiation microbienne — Restoration Sciences Academy.',
        en: 'Technical proficiency certificate in microbial remediation — Restoration Sciences Academy.',
      },
      alt: {
        fr: 'Certificat Restoration Sciences Academy en remédiation microbienne décerné à Marc Lemonnier',
        en: 'Restoration Sciences Academy certificate in Microbial Remediation awarded to Marc Lemonnier',
      },
    },
    {
      id: 'diploma-sechage-101',
      kind: 'diploma',
      src: '/images/diplomes/sechage-101.jpg',
      title: {
        fr: 'Dri-Eaz Education — Le séchage restauratif 101',
        en: 'Dri-Eaz Education — Restorative Drying 101',
      },
      caption: {
        fr: 'Certificat de réussite décerné à Marc Lemonnier pour la maîtrise du séchage après sinistre.',
        en: 'Certificate of achievement awarded to Marc Lemonnier in structural restorative drying.',
      },
      alt: {
        fr: 'Certificat de réussite Dri-Eaz Education Le séchage restauratif 101 décerné à Marc Lemonnier',
        en: 'Dri-Eaz Education Restorative Drying 101 certificate awarded to Marc Lemonnier',
      },
    },
    {
      id: 'diploma-camp-2012',
      kind: 'diploma',
      src: '/images/diplomes/camp-aout-2012.jpg',
      title: {
        fr: 'Certificat de formation continue — Restauration après sinistre (2012)',
        en: 'Continuing Training Certificate — Disaster Restoration Workshops (2012)',
      },
      caption: {
        fr: 'Ateliers spécialisés sur la restauration après sinistre décernés à Marc Lemonnier.',
        en: 'Specialized workshops on disaster restoration awarded to Marc Lemonnier.',
      },
      alt: {
        fr: 'Certificat de participation aux ateliers sur la restauration après sinistre décerné à Marc Lemonnier',
        en: 'Certificate of participation in disaster restoration workshops awarded to Marc Lemonnier',
      },
    },
  ],
  guides: [
    {
      id: 'guide-11-questions',
      slug: '11-questions-a-poser-nettoyeur-de-tapis',
      status: 'published',
      publishedAt: '2026-11-18',
      authorName: 'Marc Lemonnier · Raviva (514-820-0368)',
      category: {
        fr: 'Guide consommateur',
        en: 'Consumer Guide',
      },
      title: {
        fr: '11 Questions à poser avant de laisser un nettoyeur de tapis entrer dans votre maison',
        en: '11 Questions to Ask Before Letting a Carpet Cleaner Into Your Home',
      },
      excerpt: {
        fr: 'Pourquoi comparer les services de nettoyage ne se résume jamais au prix le plus bas — et les 11 questions exactes pour évaluer le professionnalisme d’une entreprise.',
        en: 'Why comparing carpet cleaning services is never just about the lowest price — and the exact 11 questions to evaluate a company’s standards.',
      },
      paragraphs: {
        fr: [
          'Choisir un nettoyeur de tapis ressemble souvent à l’achat d’une voiture ou au choix d’un restaurant : une Lada et une Mercedes-Benz servent toutes deux à se déplacer, tout comme un repas rapide chez McDonald et un souper au Ritz-Carlton nourrissent tous deux leur client — mais ni la qualité de l’exécution ni le résultat durable ne sont comparables.',
          'Avant d’accorder votre confiance à une entreprise, posez systématiquement ces 11 questions essentielles :',
          '1. Depuis quand la compagnie est-elle en affaires ?',
          '2. Combien d’années d’expérience le technicien qui vient chez vous possède-t-il ?',
          '3. Quelles formations et certifications formelles a-t-il complétées ?',
          '4. A-t-il suivi des cours d’appoint ou de mise à jour cette année ?',
          '5. L’entreprise est-elle membre et accréditée auprès d’un organisme reconnu comme l’IICRC ?',
          '6. Dispose-t-elle de recommandations reconnues dans son domaine ?',
          '7. Offre-t-elle une seule méthode passe-partout ou plusieurs méthodes adaptées à chaque fibre ?',
          '8. Le prix affiché est-il le seul critère mis de l’avant ?',
          '9. La tarification fonctionne-t-elle « à la pièce » sans égard à la superficie, ou au pied carré réel après évaluation ?',
          '10. Peut-elle vous fournir des références de clients satisfaits ?',
          '11. Garantit-elle formellement son travail ?',
          'À propos de la tarification juste : compter par pièce sans mesurer pénalise les petites chambres au profit des très grands salons, tandis qu’une évaluation juste au pied carré lors de la pré-inspection gratuite vous assure de ne payer que pour la surface réellement travaillée. Chez Raviva (514-820-0368), j’effectue personnellement votre pré-inspection gratuite et vous bénéficiez de mon engagement : « Le Meilleur Nettoyage, ou c’est Gratuit ! »',
        ],
        en: [
          'Choosing a carpet cleaner is very much like choosing a vehicle or a restaurant: a Lada and a Mercedes-Benz both get you from point A to point B, just as a fast-food meal at McDonald’s and fine dining at the Ritz-Carlton both feed you — yet neither the craftsmanship nor the outcome are comparable.',
          'Before trusting any company inside your home, make sure you ask these 11 essential questions:',
          '1. How long has the company been in business?',
          '2. How many years of hands-on experience does the actual technician coming to your home have?',
          '3. What formal training and certifications has the technician completed?',
          '4. Did they take refresher or continuing education courses this year?',
          '5. Is the company a member in good standing and accredited by a recognized body such as the IICRC?',
          '6. Does the company hold recognized industry or consumer recommendations?',
          '7. Do they use a single one-size-fits-all method or multiple methods matched to each textile?',
          '8. Is low price the only selling point?',
          '9. Do they price strictly "per room" regardless of size, or fairly by actual square footage after inspection?',
          '10. Can they provide references from satisfied clients?',
          '11. Do they formally guarantee their work?',
          'On fair pricing: flat "per-room" pricing often overcharges smaller bedrooms while underestimating oversized living areas, whereas measuring square footage fairly during a free pre-inspection ensures you pay strictly for the surface cleaned. With Raviva (514-820-0368), Marc Lemonnier performs your free pre-inspection personally under our pledge: "The Best Cleaning Ever, or It’s Free!"',
        ],
      },
      internal_links: [
        {
          labelFr: 'Demander une pré-inspection gratuite',
          labelEn: 'Request a free pre-inspection',
          to: '/soumission',
        },
        {
          labelFr: 'Voir mes diplômes IICRC & 35 ans d’expertise',
          labelEn: 'View IICRC diplomas & 35 years expertise',
          to: '/a-propos',
        },
      ],
    },
    {
      id: 'guide-meilleure-methode',
      slug: 'quelle-est-la-meilleure-methode-nettoyage-tapis',
      status: 'published',
      publishedAt: '2026-11-18',
      authorName: 'Marc Lemonnier · Raviva (514-820-0368)',
      category: {
        fr: 'Méthodes professionnelles',
        en: 'Cleaning Methods',
      },
      title: {
        fr: 'Quelle est la meilleure méthode de nettoyage des tapis ?',
        en: 'What Is the Best Carpet Cleaning Method?',
      },
      excerpt: {
        fr: 'Fréquence recommandée de 6 à 18 mois selon l’usage et les garanties des manufacturiers, et comparaison entre extraction à l’eau chaude, roto-shampoing et méthodes à sec.',
        en: 'Recommended 6 to 18 month cleaning intervals for carpet warranties, plus a detailed look at hot water extraction with rotary shampoo vs. intermediate dry methods.',
      },
      paragraphs: {
        fr: [
          'Les manufacturiers de tapis et les normes d’entretien recommandent généralement un nettoyage professionnel tous les 6 à 18 mois selon l’achalandage de la maison ou du commerce — une exigence d’ailleurs fréquente pour maintenir la garantie du fabricant.',
          'Pour un nettoyage en profondeur véritablement complet, la méthode de référence demeure l’extraction à l’eau chaude (souvent appelée à tort « nettoyage à la vapeur »), particulièrement lorsqu’elle est combinée à un système mécanique au roto-shampoing sur les fibres très sollicitées. Cette approche déloge les graisses, le calcium et les saletés lourdes incrustées à la base du tapis avant de les rincer et de les extraire par une double passe haute dépression.',
          'À l’opposé, plusieurs méthodes intermédiaires dites « à sec » ou à très faible humidité existent pour l’entretien régulier ou les contextes commerciaux nécessitant une remise en circulation rapide : la mousse sèche, le bonnet de coton rotatif, l’encapsulation et la poudre sèche. Bien que très efficaces en entretien de surface ou sur des fibres sensibles à l’eau, ces techniques intermédiaires ne remplacent pas le rinçage en profondeur de l’extraction à l’eau chaude.',
          'Lors de ma pré-inspection gratuite (514-820-0368), j’évalue toujours la fibre de votre tapis afin d’appliquer la méthode — ou la combinaison — la plus performante et sécuritaire.',
        ],
        en: [
          'Carpet manufacturers and industry maintenance guidelines generally recommend professional cleaning every 6 to 18 months depending on household or commercial traffic—often a direct condition for keeping mill warranties valid.',
          'For truly restorative deep cleaning, the gold-standard method remains hot water extraction (often mistakenly referred to as "steam cleaning"), especially when paired with a rotary shampoo agitation system on heavily soiled lanes. This process breaks down oils, winter salt, and deep grit at the base of the pile before flushing and recovering them with a systematic double extraction pass.',
          'By contrast, several intermediate "dry" or low-moisture methods are designed for interim maintenance or commercial offices requiring rapid turnaround: dry foam, rotary cotton bonnet cleaning, encapsulation, and dry powder. While highly useful for surface upkeep and moisture-sensitive textiles, these interim methods do not replace the deep flushing power of hot water extraction.',
          'During your free pre-inspection (514-820-0368), I evaluate your carpet construction directly to select the safest and most effective method.',
        ],
      },
      internal_links: [
        {
          labelFr: 'Service de nettoyage de tapis et carpettes',
          labelEn: 'Deep carpet & area rug service',
          to: '/services/nettoyage-tapis-mur-a-mur',
        },
        {
          labelFr: 'Voir mes réalisations réelles avant/après',
          labelEn: 'View real before/after projects',
          to: '/realisations',
        },
      ],
    },
    {
      id: 'guide-protecteur-fluorine',
      slug: 'verite-protecteurs-tapis-fluorine-250-600-ppm',
      status: 'draft',
      publishedAt: '2026-11-18',
      authorName: 'Marc Lemonnier · Raviva (514-820-0368)',
      category: {
        fr: 'Protection des fibres',
        en: 'Fiber Protection',
      },
      title: {
        fr: 'La vérité sur les protecteurs de tapis au fluorine (250 à 600 PPM)',
        en: 'The Truth About Fluorine Carpet Protectors (250 to 600 PPM)',
      },
      excerpt: {
        fr: 'Comment fonctionnent les fibres de nylon, les bloqueurs d’acides de colorants et la différence entre l’application en usine (250–600 PPM) et le traitement renouvelable sur place (300–500 PPM).',
        en: 'How nylon fibers and dye-blocking acid treatments work, and why on-site fluorine protector (300–500 PPM) acts as a renewable sacrificial shield.',
      },
      paragraphs: {
        fr: [
          'La majorité des tapis résidentiels modernes sont fabriqués en nylon protégé dès l’usine par des acides bloquants de colorants (acides de colorants résistants) qui empêchent les liquides acides comme les boissons colorées de teindre chimiquement la fibre.',
          'En usine, ce traitement est complété par un apprêt au fluorine appliqué sous haute pression et à haute température entre 250 et 600 PPM (parties par million). Avec le frottement des pas, l’aspiration et le temps, cette couche protectrice de surface finit toutefois par s’user dans les passages.',
          'Après un nettoyage en profondeur, l’application sur place d’un protecteur au fluorine à basse pression et température ambiante (300 à 500 PPM) vient rétablir cette couche sacrificielle renouvelable — exactement comme le lavage suivi du cirage périodique protège la peinture d’une voiture neuve contre les agressions extérieures. Ce traitement offert par Raviva (514-820-0368) est garanti 1 an.',
        ],
        en: [
          'Most modern residential carpets are manufactured from nylon treated at the mill with dye-blocking / acid dye-resist technology to keep colored spills from chemically bonding to the fiber.',
          'At the mill, that internal resistance is topped with a high-pressure, high-heat fluorine finish applied at roughly 250 to 600 parts per million (PPM). Over time, foot traffic and regular vacuuming gradually wear away that surface coating in traffic lanes.',
          'Following deep cleaning, an on-site low-pressure ambient fluorine application (300 to 500 PPM) restores this renewable sacrificial barrier—much like washing and periodically waxing a new car protects the factory clearcoat from wear. Applied by Raviva (514-820-0368), our carpet and upholstery protector carries a 1-year warranty.',
        ],
      },
      internal_links: [
        {
          labelFr: 'Protecteur de tapis et meubles garanti 1 an',
          labelEn: '1-Year Carpet & Upholstery Protector',
          to: '/protecteur',
        },
      ],
    },
    {
      id: 'guide-acariens-buffet',
      slug: 'votre-tapis-est-il-un-buffet-pour-acariens',
      status: 'draft',
      publishedAt: '2026-11-18',
      authorName: 'Marc Lemonnier · Raviva (514-820-0368)',
      category: {
        fr: 'Santé & allergènes',
        en: 'Health & Allergens',
      },
      title: {
        fr: 'Votre tapis est-il un buffet pour acariens ?',
        en: 'Is Your Carpet a Buffet for Dust Mites?',
      },
      excerpt: {
        fr: 'Jusqu’à 2 millions d’acariens dans une maison moyenne : données médicales et environnementales sur les allergènes invisibles et l’importance du nettoyage annuel en profondeur.',
        en: 'Up to 2 million dust mites in an average home: medical and EPA findings on airborne allergens and why annual deep cleaning matters.',
      },
      paragraphs: {
        fr: [
          'Saviez-vous qu’une maison moyenne peut abriter jusqu’à 2 millions d’acariens ? On en dénombre souvent plus de 40 000 par once de poussière domestique. Chaque acarien produit de 10 à 20 excréments par jour — représentant plus de 30 millions de particules fécales accumulées dans les tapis et les meubles rembourrés, sans compter environ 100 000 cadavres d’acariens générés quotidiennement.',
          'Selon les observations cliniques du Dr Thomas Platts-Mills (University of Virginia Medical), environ 80 % des personnes souffrant d’allergies sont sensibles à ces débris et déjections microscopiques qui deviennent aéroportés à chaque passage sur un tapis ou lorsqu’on s’assoit sur un divan. Par ailleurs, jusqu’à un dixième du poids d’un oreiller vieux de 2 ans peut être constitué d’acariens morts et de leurs résidus.',
          'Comme l’a souligné le Dr Michael Berry de l’EPA (Environmental Protection Agency), les tapis et textiles agissent comme un filtre qui retient les poussières et allergènes — mais comme tout filtre, s’il n’est pas nettoyé régulièrement, il sature et relâche ces contaminants dans l’air intérieur.',
          'Passer fréquemment l’aspirateur sur toutes les surfaces (tapis, divans, matelas) et faire exécuter un nettoyage en profondeur professionnel annuel au 514-820-0368 contribue directement à assainir votre environnement.',
        ],
        en: [
          'Did you know an average home can harbor up to 2 million dust mites, often exceeding 40,000 mites per ounce of household dust? Each mite produces 10 to 20 waste pellets per day—adding up to over 30 million microscopic fecal particles inside carpets and upholstered furniture, alongside roughly 100,000 mite carcasses daily.',
          'According to clinical research led by Dr. Thomas Platts-Mills of the University of Virginia Medical School, roughly 80% of people with allergies are sensitive to these microscopic waste particles that become airborne when walking across carpets or sitting on upholstered sofas. Remarkably, up to one-tenth of the weight of a two-year-old pillow can consist of dead dust mites and their droppings.',
          'As noted by Dr. Michael Berry of the U.S. Environmental Protection Agency (EPA), carpets act like a sink that traps indoor dust and allergens—but just like any filter, when left uncleaned it eventually releases pollutants back into indoor air.',
          'Thoroughly vacuuming all surfaces and scheduling an annual professional deep cleaning with Raviva at 514-820-0368 helps keep your living spaces hygienic.',
        ],
      },
      internal_links: [
        {
          labelFr: 'Désinfection et nettoyage de matelas',
          labelEn: 'Mattress cleaning & sanitization',
          to: '/services/nettoyage-desinfection-matelas',
        },
        {
          labelFr: 'Traitement antibactérien & assainissant',
          labelEn: 'Antibacterial treatment',
          to: '/antibacterien',
        },
      ],
    },
    {
      id: 'guide-valeur-et-prix',
      slug: 'importance-de-la-valeur-et-du-prix',
      status: 'draft',
      publishedAt: '2026-11-18',
      authorName: 'Marc Lemonnier · Raviva (514-820-0368)',
      category: {
        fr: 'Qualité & durabilité',
        en: 'Value & Craftsmanship',
      },
      title: {
        fr: 'L’importance de la valeur et du prix',
        en: 'The Importance of Value and Price',
      },
      excerpt: {
        fr: '« Le prix est ce que vous payez. La valeur est ce que vous obtenez. » Pourquoi Shaw Industries recommande l’extraction à haute pression avec agitation mécanique face aux appareils loués en épicerie.',
        en: '"Price is what you pay. Value is what you get." Why Shaw Industries recommends high-pressure extraction with mechanical agitation over grocery-store rental units.',
      },
      paragraphs: {
        fr: [
          'Comme le résume l’adage bien connu : « Le prix est ce que vous payez. La valeur est ce que vous obtenez. »',
          'Un manufacturier majeur comme Shaw Industries recommande explicitement l’extraction à l’eau chaude à haute pression combinée à une agitation mécanique professionnelle plutôt que la location d’un petit appareil d’épicerie. Ces machines portatives grand public manquent de puissance de récupération, laissent souvent trop d’eau et un excès de savon collant dans le tapis — ce qui fait réapparaître les taches plus rapidement qu’avant.',
          'Avec plus de 35 ans d’expérience, Raviva (514-820-0368) effectue une double extraction systématique, un passage mécanique au roto-shampoing lorsque requis, et garantit chaque intervention : « Le Meilleur Nettoyage, ou c’est Gratuit ! »',
        ],
        en: [
          'As the well-known maxim states: "Price is what you pay. Value is what you get."',
          'Leading carpet manufacturer Shaw Industries explicitly recommends professional high-pressure hot water extraction paired with mechanical agitation rather than renting a small unit from a grocery store. Consumer rental machines lack vacuum recovery, frequently overwet backing, and leave behind sticky detergent residues that cause spots to attract soil faster.',
          'Backed by over 35 years of experience, Raviva (514-820-0368) performs a systematic second extraction pass, uses rotary shampoo restoration when needed, and stands behind every visit with our pledge: "The Best Cleaning Ever, or It’s Free!"',
        ],
      },
      internal_links: [
        {
          labelFr: 'Demander une soumission directe',
          labelEn: 'Request a direct quote',
          to: '/soumission',
        },
      ],
    },
    {
      id: 'guide-meubles-et-cuir',
      slug: 'methodes-nettoyage-meubles-rembourres-et-cuir',
      status: 'draft',
      publishedAt: '2026-11-18',
      authorName: 'Marc Lemonnier · Raviva (514-820-0368)',
      category: {
        fr: 'Meubles & cuir',
        en: 'Upholstery & Leather',
      },
      title: {
        fr: 'Méthodes de nettoyage des meubles rembourrés et du cuir',
        en: 'Upholstery and Leather Cleaning Methods',
      },
      excerpt: {
        fr: 'Méthodes humides (extraction, shampoing humide, mousse sèche à l’éponge de mer naturelle), méthodes à sec, Dry-Wet-Dry et soin régulier du cuir véritable.',
        en: 'Wet methods (extraction, wet shampoo, natural sea-sponge dry foam), dry solvent methods, Dry-Wet-Dry, and routine genuine leather care.',
      },
      paragraphs: {
        fr: [
          'Les meubles rembourrés requièrent une adaptation rigoureuse au type de revêtement et au code de nettoyage du fabricant :',
          'Méthodes humides : l’extraction à l’eau chaude (pour les tissus robustes et lavables à l’eau), la méthode du shampoing humide, et la méthode de mousse sèche appliquée délicatement à l’éponge de mer naturelle pour limiter l’humidité sur les tissus délicats.',
          'Méthodes à sec et combinées : le nettoyage à sec par extraction au solvant ou nettoyage manuel à sec pour les tissus sensibles à l’eau (code S), ainsi que la méthode combinée Dry-Wet-Dry offrant un contrôle maximal.',
          'Entretien du cuir : un divan ou fauteuil en cuir véritable gagne à être essuyé doucement avec un chiffon propre et légèrement humide toutes les semaines ou deux afin de retirer la poussière et les sels corporels, préserver son équilibre naturel d’hydratation et prolonger son revêtement protecteur — en complément d’un nettoyage et conditionnement professionnel périodique au 514-820-0368.',
        ],
        en: [
          'Upholstered furniture calls for careful selection based on fiber weave and manufacturer cleaning codes:',
          'Wet cleaning methods: hot water extraction (for durable water-safe fabrics), wet shampooing, and dry foam applied carefully with a natural sea sponge to control moisture on delicate weaves.',
          'Dry and combined methods: solvent extraction or hand dry cleaning for water-sensitive fabrics (code S), along with the combined Dry-Wet-Dry method for balanced soil release and rapid drying.',
          'Routine leather care: genuine leather sofas benefit from gentle wiping with a clean, slightly damp cloth every week or two to lift dust and body salts, preserve natural moisture balance, and protect the topcoat—paired with periodic professional cleaning and conditioning from Raviva (514-820-0368).',
        ],
      },
      internal_links: [
        {
          labelFr: 'Service de nettoyage de meubles rembourrés et cuir',
          labelEn: 'Upholstery & Leather Cleaning Service',
          to: '/meubles-rembourres',
        },
      ],
    },
  ],
};
