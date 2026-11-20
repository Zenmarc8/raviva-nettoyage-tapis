import { SupportedLocale } from './site.config';

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
}

export const CUSTOM_CONTENT: CustomContentConfig = {
  heroOverrides: {
    fr: {
      eyebrow: 'Grand Montréal · Exécution directe par Marc Lemonnier · Produits biodégradables',
      headline: 'Nettoyage écologique de tapis, carpettes et meubles à votre porte',
      subheadline:
        'Plus de 35 ans d’expérience terrain, pré-inspection gratuite, deuxième extraction systématique et satisfaction garantie : « Le Meilleur Nettoyage, ou c’est Gratuit ! »',
      rightPanelTitle: 'Notre conviction',
      rightPanelParagraphs: [
        'J’ai fondé Raviva Nettoyage de Tapis Montréal avec une conviction simple : votre intérieur doit être impeccable sans que cela coûte la Terre — au sens propre comme au figuré. Depuis plus de 35 ans, j’offre des services haut de gamme de nettoyage de tapis et de meubles directement à domicile ou en entreprise partout dans le Grand Montréal. J’utilise des produits écologiques et des équipements de pointe pour le nettoyage en profondeur, l’élimination des odeurs, la désinfection et l’assainissement de tous types de surfaces, des divans et tapis du quotidien aux tissus les plus délicats.',
        'Je prends soin de chaque intérieur comme si c’était le mien. C’est pourquoi je ne fais jamais de soumission sans avoir évalué le travail à réaliser, je m’adapte toujours à votre budget et je ne quitte jamais les lieux tant que le résultat n’est pas irréprochable.',
      ],
      rightPanelSignature: 'Marc Lemonnier · Propriétaire-opérateur',
    },
    en: {
      eyebrow: 'Greater Montreal · Direct Execution by Marc Lemonnier · Biodegradable Solutions',
      headline: 'Eco-friendly carpet, area rug, and upholstery cleaning at your door',
      subheadline:
        'Over 35 years of hands-on experience, free pre-inspection, systematic second extraction pass, and guaranteed satisfaction: "The Best Cleaning Ever, or It’s Free!"',
      rightPanelTitle: 'Our Conviction',
      rightPanelParagraphs: [
        'I founded Raviva Nettoyage de Tapis Montréal with a simple conviction: your interior should be spotless without costing the Earth — literally and figuratively. For over 35 years, I have delivered high-end carpet and furniture cleaning directly to homes and businesses across Greater Montreal. I use eco-friendly solutions and advanced equipment for deep cleaning, odor elimination, disinfection, and sanitization across all surfaces, from everyday sofas and carpets to the most delicate textiles.',
        'I care for every interior as if it were my own. That is why I never issue a quote without assessing the work to be done, I always adapt to your budget, and I never leave the premises until the result is spotless.',
      ],
      rightPanelSignature: 'Marc Lemonnier · Owner-Operator',
    },
  },
  founderStoryOverrides: {
    fr: {
      heading: 'Plus de 35 ans d’expérience terrain — exécution directe par Marc Lemonnier',
      leadParagraph:
        'Accrédité auprès du IICRC (reconnu comme le principal organisme régissant et établissant les normes en nettoyage et restauration après dégât d’eau), j’effectue personnellement chaque mandat résidentiel et commercial.',
      bodyParagraph:
        'Tout travail, petit ou d’envergure, reçoit la même attention aux détails et le même niveau de qualité et de service : pré-inspection gratuite avec rapport de l’état des tapis, produits biodégradables non toxiques et deuxième extraction systématique afin de laisser votre tapis le plus sec possible.',
      guaranteeTitle: 'Le Meilleur Nettoyage, ou c’est Gratuit !',
      guaranteeText:
        'Satisfaction toujours garantie : vous aurez le meilleur nettoyage ou c’est gratuit.',
    },
    en: {
      heading: 'Over 35 years of hands-on experience — personally performed by Marc Lemonnier',
      leadParagraph:
        'Accredited by the IICRC (recognized as the leading governing and standard-setting body in cleaning and water damage restoration), I personally carry out every residential and commercial appointment.',
      bodyParagraph:
        'Every job, small or large, receives the same attention to detail and level of service: free pre-inspection including a carpet condition report, non-toxic biodegradable products, and a systematic second extraction pass to leave carpets as dry as possible.',
      guaranteeTitle: 'The Best Cleaning Ever, or It’s Free!',
      guaranteeText:
        'Satisfaction always guaranteed: you will get the best cleaning, or it’s free.',
    },
  },
};
