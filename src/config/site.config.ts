export type SupportedLocale = 'fr' | 'en';

export interface SiteConfig {
  companyName: string;
  shortName: string;
  domain: string;
  defaultLocale: SupportedLocale;
  founderName: string;
  founderExperienceYears: number;
  phoneDisplay: string;
  phoneHref: string;
  smsHref: string;
  email: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  businessHours: {
    fr: string;
    en: string;
  };
  legal: {
    neq: string;
    loi25OfficerName: string;
    loi25OfficerEmail: string;
    insuranceLabel: {
      fr: string;
      en: string;
    };
  };
  operatorModel: {
    directExecutionOnly: true;
    accreditationName: string;
    freePreInspection: true;
    noHiddenFurnitureMovingFee: true;
  };
  features: {
    enableSmsQuickContact: boolean;
    enableMoveInAndGiftSection: boolean;
    enablePhotoUpload: boolean;
  };
  theme: {
    primary: string;
    primaryHover: string;
    accent: string;
    surfaceTint: string;
    ink: string;
    muted: string;
  };
  images: {
    hero: string;
    areaRug: string;
    upholstery: string;
    beforeAfter: string;
    iicrcCert: string;
    antibacterial: string;
    protector: string;
    waterDamage: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  companyName: 'Raviva Nettoyage de Tapis Montréal',
  shortName: 'Raviva',
  domain: 'https://ravivanettoyagedetapis.com',
  defaultLocale: 'fr',
  founderName: 'Marc Lemonnier',
  founderExperienceYears: 35,
  phoneDisplay: '514-820-0368',
  phoneHref: 'tel:+15148200368',
  smsHref: 'sms:+15148200368',
  email: 'marc@marclemonnier.com',
  address: {
    street: 'Service mobile — Grand Montréal',
    city: 'Montréal',
    province: 'QC',
    postalCode: 'H2X 1Y4',
    country: 'CA',
  },
  businessHours: {
    fr: 'Exécution directe sur rendez-vous (Urgences dégât d’eau)',
    en: 'Direct owner-operated scheduling (Water damage emergencies)',
  },
  legal: {
    neq: 'Entreprise indépendante — Marc Lemonnier',
    loi25OfficerName: 'Marc Lemonnier',
    loi25OfficerEmail: 'marc@marclemonnier.com',
    insuranceLabel: {
      fr: 'Assurance responsabilité civile — Accrédité IICRC',
      en: 'Commercial Liability Insurance — IICRC Accredited',
    },
  },
  operatorModel: {
    directExecutionOnly: true,
    accreditationName: 'IICRC',
    freePreInspection: true,
    noHiddenFurnitureMovingFee: true,
  },
  features: {
    enableSmsQuickContact: true,
    enableMoveInAndGiftSection: true,
    enablePhotoUpload: true,
  },
  theme: {
    primary: '#0b3d2e',
    primaryHover: '#082d22',
    accent: '#146c43',
    surfaceTint: '#f4f7f5',
    ink: '#111827',
    muted: '#4b5563',
  },
  images: {
    hero: '/src/assets/images/hero_carpet_cleaning_1794943209191.jpg',
    areaRug: '/images/travaux-tapis-beige-1.jpg',
    upholstery: '/src/assets/images/service_sofa_upholstery_1794943209960.jpg',
    beforeAfter: '/images/detachage-vin-rouge-avant-apres.jpg',
    iicrcCert: '/images/diplomes/iicrc.jpg',
    antibacterial: '/src/assets/images/service_antibacterial_1794949001292.jpg',
    protector: '/src/assets/images/service_protector_1794949001980.jpg',
    waterDamage: '/src/assets/images/service_water_damage_1795100765770.jpg',
  },
};
