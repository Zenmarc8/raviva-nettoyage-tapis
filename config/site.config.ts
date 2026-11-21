export const SITE_CONFIG = {
  brandName: 'Raviva Nettoyage de Tapis',
  domain: 'ravivanettoyagedetapis.com',
  url: 'https://ravivanettoyagedetapis.com',
  founderOrContact: 'Marc Lemonnier',
  phoneDisplay: '514-820-0368',
  phoneHref: 'tel:+15148200368',
  phoneSchema: '+1-514-820-0368',
  businessHours: {
    fr: 'Lun–Ven, 8h à 18h',
    en: 'Mon–Fri, 8 AM – 6 PM',
  },
  serviceRegions: [
    'Montréal',
    'Laval',
    'Longueuil',
    'Brossard',
    'Rive-Sud',
    'Rive-Nord',
    'Grand Montréal',
  ],
  logo: {
    src: '/images/logo-raviva-nettoyage-tapis-montreal.png',
    fallbackSrc:
      '/assets/aistudio/Gemini_Generated_Image_jwdcxyjwdcxyjwdc_9a57b113.jpg',
    favicon: '/images/icone-raviva-nettoyage-tapis.png',
    altFr: 'Logo Raviva Nettoyage de Tapis — Montréal, Laval et Rive-Sud',
    altEn: 'Raviva Carpet Cleaning Logo — Montreal, Laval & South Shore',
  },
  heroImages: {
    before: '/images/hero-avant-tapis.jpg',
    after: '/images/hero-apres-tapis.jpg',
    fallback: '/images/hero-apres-tapis.jpg',
  },
  integrations: {
    ghlWebhookUrl:
      (import.meta.env.VITE_GHL_WEBHOOK_URL as string | undefined)?.trim() || '',
    ghlChatWidgetId:
      (import.meta.env.VITE_GHL_CHAT_WIDGET_ID as string | undefined)?.trim() || '',
  },
} as const;
