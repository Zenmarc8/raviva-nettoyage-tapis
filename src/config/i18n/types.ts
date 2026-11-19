import { ServiceId } from '../services.config';

export interface ServiceTranslation {
  title: string;
  shortDesc: string;
  categoryLabel: string;
  fullDesc: string;
  processPoints: string[];
  idealFor: string[];
  faqSpecific: Array<{ q: string; a: string }>;
}

export interface TranslationDictionary {
  meta: {
    siteTitle: string;
    siteDescription: string;
    homeTitle: string;
    homeDescription: string;
  };
  a11y: {
    skipToContent: string;
    mainNavLabel: string;
    languageSwitcherLabel: string;
    openMenu: string;
    closeMenu: string;
    closeModal: string;
    requiredField: string;
    breadcrumbLabel: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    areas: string;
    guides: string;
    gallery: string;
    faq: string;
    contact: string;
    freeQuote: string;
    callNow: string;
    textUs: string;
    viewAllServices: string;
    viewAllAreas: string;
  };
  hero: {
    primaryCta: string;
    callCta: string;
    smsCta: string;
    reassuranceItems: string[];
    imageAlt: string;
  };
  raviva6x: {
    kicker: string;
    heading: string;
    subheading: string;
    steps: Array<{
      letter: string;
      title: string;
      description: string;
    }>;
  };
  accreditationsSection: {
    kicker: string;
    heading: string;
    subheading: string;
    iicrcTitle: string;
    iicrcDesc: string;
    directTitle: string;
    directDesc: string;
    manageInAdminNote: string;
    viewGalleryCta: string;
  };
  standardsBand: {
    heading: string;
    items: Array<{ title: string; detail: string }>;
  };
  servicesSection: {
    kicker: string;
    heading: string;
    subheading: string;
    filterAll: string;
    filterResidential: string;
    filterSpecialty: string;
    filterCommercial: string;
    learnMore: string;
    requestQuoteFor: string;
  };
  services: Record<ServiceId, ServiceTranslation>;
  whyEco: {
    kicker: string;
    heading: string;
    subheading: string;
    pillars: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  processSection: {
    kicker: string;
    heading: string;
    subheading: string;
    steps: Array<{
      step: string;
      title: string;
      description: string;
    }>;
  };
  proofSection: {
    kicker: string;
    heading: string;
  };
  founderSection: {
    kicker: string;
    ctaButton: string;
    portraitAlt: string;
  };
  beforeAfterSection: {
    kicker: string;
    heading: string;
    subheading: string;
    beforeLabel: string;
    afterLabel: string;
    mainImageAlt: string;
    cases: Array<{
      title: string;
      surface: string;
      treatment: string;
      result: string;
    }>;
  };
  areasSection: {
    kicker: string;
    heading: string;
    subheading: string;
    postalCheckerTitle: string;
    postalPlaceholder: string;
    postalCheckBtn: string;
    postalValidMsg: string;
    postalOutOfZoneMsg: string;
    postalInvalidFormatMsg: string;
    citiesCoveredLabel: string;
  };
  moveInAndGift: {
    moveInKicker: string;
    moveInTitle: string;
    moveInDesc: string;
    moveInCta: string;
    giftKicker: string;
    giftTitle: string;
    giftDesc: string;
    giftCta: string;
  };
  faqSection: {
    kicker: string;
    heading: string;
    subheading: string;
    items: Array<{ q: string; a: string }>;
  };
  finalCta: {
    heading: string;
    subheading: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
  quoteForm: {
    pageKicker: string;
    pageTitle: string;
    pageSubtitle: string;
    modalTitle: string;
    modalSubtitle: string;
    stepOf: string;
    nextStep: string;
    prevStep: string;
    submitQuote: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    newRequestBtn: string;
    steps: {
      s1Title: string;
      s1Subtitle: string;
      s2Title: string;
      s2Subtitle: string;
      s3Title: string;
      s3Subtitle: string;
      s4Title: string;
      s4Subtitle: string;
      s5Title: string;
      s5Subtitle: string;
      s6Title: string;
      s6Subtitle: string;
    };
    sectors: Array<{ id: 'residential' | 'commercial'; label: string }>;
    sectorLabel: string;
    needCategories: Array<{ id: string; label: string; serviceIds: string[] }>;
    needCategoryLabel: string;
    propertyTypes: Array<{ id: string; label: string }>;
    specificNeeds: Array<{ id: string; label: string }>;
    quantities: {
      roomsLabel: string;
      stairsLabel: string;
      areaSqFtLabel: string;
      sofaSeatsLabel: string;
      notesLabel: string;
      notesPlaceholder: string;
    };
    timeframes: Array<{ id: string; label: string }>;
    preferredDateLabel: string;
    fields: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      city: string;
      postalCode: string;
      photosLabel: string;
      photosHint: string;
      photosBtn: string;
      photosTooMany: string;
      photosTooLarge: string;
      consentLoi25: string;
      consentMarketing: string;
    };
    errors: {
      selectOneService: string;
      selectProperty: string;
      firstNameRequired: string;
      lastNameRequired: string;
      phoneInvalid: string;
      emailInvalid: string;
      cityRequired: string;
      postalInvalid: string;
      consentRequired: string;
    };
    outOfZoneNotice: string;
  };
  cookies: {
    bannerTitle: string;
    bannerText: string;
    acceptAll: string;
    rejectNonEssential: string;
    customize: string;
    modalTitle: string;
    modalIntro: string;
    necessaryTitle: string;
    necessaryDesc: string;
    alwaysActive: string;
    analyticsTitle: string;
    analyticsDesc: string;
    marketingTitle: string;
    marketingDesc: string;
    savePreferences: string;
  };
  footer: {
    tagline: string;
    servicesHeading: string;
    areasHeading: string;
    legalHeading: string;
    accessibilityLink: string;
    privacyLink: string;
    cookiesLink: string;
    termsLink: string;
    guidesLink: string;
    galleryLink: string;
    allZonesLink: string;
    dashboardLink: string;
    manageCookiesBtn: string;
    copyright: string;
    hoursLabel: string;
    neqLabel: string;
  };
  pages: {
    about: {
      title: string;
      subtitle: string;
      pillarsTitle: string;
      commitmentsTitle: string;
      commitments: string[];
    };
    contact: {
      title: string;
      subtitle: string;
      directCallTitle: string;
      emailTitle: string;
      hoursTitle: string;
      serviceZoneTitle: string;
      loi25ContactTitle: string;
    };
    accessibility: {
      title: string;
      subtitle: string;
      standardTitle: string;
      standardBody: string;
      measuresTitle: string;
      measures: string[];
      feedbackTitle: string;
      feedbackBody: string;
    };
    privacy: {
      title: string;
      subtitle: string;
      updated: string;
      sections: Array<{ heading: string; body: string }>;
    };
    cookiesPage: {
      title: string;
      subtitle: string;
      sections: Array<{ heading: string; body: string }>;
    };
    terms: {
      title: string;
      subtitle: string;
      sections: Array<{ heading: string; body: string }>;
    };
    notFound: {
      code: string;
      title: string;
      body: string;
      backHome: string;
    };
  };
}
