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
    founder: string;
    antibacterial: string;
    protector: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  companyName: 'Raviva Nettoyage de Tapis Montréal',
  shortName: 'Raviva',
  domain: 'https://ravivanettoyage.ca',
  defaultLocale: 'fr',
  founderName: 'Marc Lemonnier',
  founderExperienceYears: 35,
  phoneDisplay: '514-820-0368',
  phoneHref: 'tel:+15148200368',
  smsHref: 'sms:+15148200368',
  email: 'marc@marclemonnier.com',
  address: {
    street: '[À CONFIGURER — ADRESSE D’AFFAIRES]',
    city: 'Montréal',
    province: 'QC',
    postalCode: 'H2X 1Y4',
    country: 'CA',
  },
  businessHours: {
    fr: 'Lundi au samedi : 7 h 30 à 19 h 30',
    en: 'Monday to Saturday: 7:30 AM – 7:30 PM',
  },
  legal: {
    neq: '[À CONFIGURER — NEQ QUÉBEC]',
    loi25OfficerName: 'Marc Lemonnier',
    loi25OfficerEmail: 'marc@marclemonnier.com',
    insuranceLabel: {
      fr: 'Assurance responsabilité civile commerciale complète',
      en: 'Full Commercial Liability Insurance',
    },
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
    areaRug: '/src/assets/images/service_area_rug_1794943209656.jpg',
    upholstery: '/src/assets/images/service_sofa_upholstery_1794943209960.jpg',
    beforeAfter: '/src/assets/images/before_after_carpet_1794943210645.jpg',
    founder: '/src/assets/images/founder_marc_clean_1794943224580.jpg',
    antibacterial: '/src/assets/images/service_antibacterial_1794949001292.jpg',
    protector: '/src/assets/images/service_protector_1794949001980.jpg',
  },
};
