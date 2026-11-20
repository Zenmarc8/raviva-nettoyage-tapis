import { SupportedLocale } from './site.config';

/**
 * FICHIER DÉDIÉ À VOS TEXTES PERSONNALISÉS (FR / EN)
 * Modifiez librement ces textes pour personnaliser l'accueil, l'histoire du fondateur,
 * vos témoignages Google vérifiés et vos statistiques réelles sans toucher aux composants.
 */
export interface CustomContentConfig {
  heroOverrides: Record<
    SupportedLocale,
    {
      eyebrow: string;
      headline: string;
      subheadline: string;
      rightPanelTitle: string;
      rightPanelParagraphs: string[];
      rightPanelSignature: string;
    }
  >;
  founderStoryOverrides: Record<
    SupportedLocale,
    {
      heading: string;
      leadParagraph: string;
      bodyParagraph: string;
      guaranteeTitle: string;
      guaranteeText: string;
    }
  >;
  verifiableMetrics: Array<{
    value: string;
    label: Record<SupportedLocale, string>;
    detail: Record<SupportedLocale, string>;
  }>;
  configurableReviews: Array<{
    id: string;
    author: string;
    neighborhood: string;
    serviceLabel: Record<SupportedLocale, string>;
    quote: Record<SupportedLocale, string>;
    isPlaceholder: boolean;
  }>;
}

export const CUSTOM_CONTENT: CustomContentConfig = {
  heroOverrides: {
    fr: {
      eyebrow: 'Grand Montréal & Laval · Unité mobile · Produits biodégradables',
      headline: 'Nettoyage écologique de tapis, carpettes et meubles à votre porte',
      subheadline:
        'Extraction haute température à faible taux d’humidité, produits sans résidus collants ni danger pour les enfants et animaux.',
      rightPanelTitle: 'Notre conviction',
      rightPanelParagraphs: [
        'J’ai fondé Raviva Nettoyage de Tapis Montréal avec une conviction simple : votre intérieur doit être impeccable sans que cela coûte la Terre — au sens propre comme au figuré. Depuis plus de 35 ans, j’offre des services haut de gamme de nettoyage de tapis et de meubles directement à domicile ou en entreprise partout dans le Grand Montréal. J’utilise des produits écologiques et des équipements de pointe pour le nettoyage en profondeur, l’élimination des odeurs, la désinfection et l’assainissement de tous types de surfaces, des divans et tapis du quotidien aux tissus les plus délicats.',
        'Je prends soin de chaque intérieur comme si c’était le mien. C’est pourquoi je ne fais jamais de soumission sans avoir évalué le travail à réaliser, je m’adapte toujours à votre budget et je ne quitte jamais les lieux tant que le résultat n’est pas irréprochable.',
      ],
      rightPanelSignature: 'Marc Lemonnier · Fondateur',
    },
    en: {
      eyebrow: 'Greater Montreal & Laval · Mobile Unit · Biodegradable Solutions',
      headline: 'Eco-friendly carpet, area rug, and upholstery cleaning at your door',
      subheadline:
        'High-temperature low-moisture extraction with zero sticky residue and plant-based formulas safe for children and pets.',
      rightPanelTitle: 'Our Conviction',
      rightPanelParagraphs: [
        'I founded Raviva Nettoyage de Tapis Montréal with a simple conviction: your interior should be spotless without costing the Earth — literally and figuratively. For over 35 years, I have delivered high-end carpet and furniture cleaning directly to homes and businesses across Greater Montreal. I use eco-friendly solutions and advanced equipment for deep cleaning, odor elimination, disinfection, and sanitization across all surfaces, from everyday sofas and carpets to the most delicate textiles.',
        'I care for every interior as if it were my own. That is why I never issue a quote without assessing the work to be done, I always adapt to your budget, and I never leave the premises until the result is spotless.',
      ],
      rightPanelSignature: 'Marc Lemonnier · Founder',
    },
  },
  founderStoryOverrides: {
    fr: {
      heading: '35 ans d’expertise terrain en nettoyage spécialisé et restauration après sinistre',
      leadParagraph:
        'Je m’appelle Marc Lemonnier. Pendant 35 ans, j’ai dirigé une entreprise prospère spécialisée en nettoyage technique et en restauration après sinistre au Québec.',
      bodyParagraph:
        'Aujourd’hui, avec Raviva Nettoyage de Tapis Montréal, j’applique cette même rigueur de restauration à vos tapis, carpettes délicates, sofas et matelas. Chaque fibre réagit différemment : nous testons, traitons en profondeur avec des solutions biodégradables sans COV, et extrayons l’humidité au maximum pour un séchage rapide sans jamais laisser de résidu savonneux.',
      guaranteeTitle: 'Engagement satisfaction Raviva',
      guaranteeText:
        'Inspection conjointe avant et après chaque intervention. Si une zone traitable demande une retouche, nous repassons sans frais.',
    },
    en: {
      heading: '35 years of hands-on expertise in specialized cleaning and disaster restoration',
      leadParagraph:
        'My name is Marc Lemonnier. For 35 years, I owned and operated a successful specialized cleaning and disaster restoration company in Quebec.',
      bodyParagraph:
        'With Raviva Nettoyage de Tapis Montréal, I bring that exact restoration-grade discipline to residential and commercial carpets, fine wool rugs, upholstered sofas, and mattresses. Every textile is inspected first, treated with biodegradable VOC-free solutions, and extracted cleanly for fast drying with zero soapy residue.',
      guaranteeTitle: 'The Raviva Satisfaction Commitment',
      guaranteeText:
        'Walkthrough inspection before and after every visit. If any treatable spot needs additional attention, we return at no extra charge.',
    },
  },
  verifiableMetrics: [
    {
      value: '35 ans',
      label: {
        fr: 'd’expérience terrain',
        en: 'years of field expertise',
      },
      detail: {
        fr: 'Nettoyage spécialisé et restauration après sinistre',
        en: 'Specialized cleaning & disaster restoration background',
      },
    },
    {
      value: '4 – 6 h',
      label: {
        fr: 'temps de séchage moyen',
        en: 'average drying window',
      },
      detail: {
        fr: 'Extraction haute puissance qui limite l’humidité résiduelle',
        en: 'High-recovery extraction that prevents over-wetting',
      },
    },
    {
      value: '0 %',
      label: {
        fr: 'résidu savonneux ou COV nocif',
        en: 'soapy residue or harsh VOCs',
      },
      detail: {
        fr: 'Solutions d’origine végétale sécuritaires pour bébés et animaux',
        en: 'Plant-based formulas safe for babies and pets',
      },
    },
    {
      value: '100 %',
      label: {
        fr: 'soumission claire avant travaux',
        en: 'upfront transparent quote',
      },
      detail: {
        fr: 'Aucun frais caché à la porte, assurance responsabilité incluse',
        en: 'No surprise fees at the door, full liability coverage',
      },
    },
  ],
  configurableReviews: [
    {
      id: 'review-slot-1',
      author: '[À REMPLACER PAR VOS AVIS RÉELS — Client 1]',
      neighborhood: 'Plateau-Mont-Royal, Montréal',
      serviceLabel: {
        fr: 'Tapis mur à mur & escaliers',
        en: 'Wall-to-wall carpet & stairs',
      },
      quote: {
        fr: '[Emplacement réservé à un avis Google vérifié de votre clientèle montréalaise. Ajoutez uniquement des témoignages authentiques.]',
        en: '[Reserved slot for a verified Google review from your Montreal clients. Replace with authentic customer feedback only.]',
      },
      isPlaceholder: true,
    },
    {
      id: 'review-slot-2',
      author: '[À REMPLACER PAR VOS AVIS RÉELS — Client 2]',
      neighborhood: 'Chomedey, Laval',
      serviceLabel: {
        fr: 'Divan sectionnel & odeurs d’animaux',
        en: 'Sectional sofa & pet odor removal',
      },
      quote: {
        fr: '[Emplacement réservé à un avis vérifié concernant le nettoyage de sofa ou l’élimination des odeurs d’animaux.]',
        en: '[Reserved slot for a verified review about upholstery cleaning or pet odor treatment.]',
      },
      isPlaceholder: true,
    },
    {
      id: 'review-slot-3',
      author: '[À REMPLACER PAR VOS AVIS RÉELS — Client 3]',
      neighborhood: 'Brossard, Rive-Sud',
      serviceLabel: {
        fr: 'Carpette en laine & fin de bail',
        en: 'Wool area rug & move-out cleaning',
      },
      quote: {
        fr: '[Emplacement réservé à un avis vérifié sur l’entretien de carpettes délicates ou la remise à neuf avant emménagement.]',
        en: '[Reserved slot for a verified review about wool rug care or move-in carpet renewal.]',
      },
      isPlaceholder: true,
    },
  ],
};
