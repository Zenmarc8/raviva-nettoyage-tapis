import { TranslationDictionary } from './types';

export const EN_DICTIONARY: TranslationDictionary = {
  meta: {
    siteTitle: 'Raviva Nettoyage de Tapis Montréal',
    siteDescription:
      'Eco-friendly residential and commercial carpet, area rug, upholstery, and mattress cleaning across Greater Montreal & Laval. 35 years of expertise. Free quote: 514-820-0368.',
    homeTitle: 'Raviva Carpet Cleaning Montreal | Carpets, Rugs & Upholstery',
    homeDescription:
      'Specialized eco-friendly carpet, wool rug, sofa, and mattress cleaning in Greater Montreal. Led by Marc Lemonnier with 35 years of cleaning & restoration experience.',
  },
  a11y: {
    skipToContent: 'Skip to main content',
    mainNavLabel: 'Primary navigation',
    languageSwitcherLabel: 'Switch language',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    closeModal: 'Close dialog',
    requiredField: 'Required field',
    breadcrumbLabel: 'Breadcrumb',
  },
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    areas: 'Service Areas',
    faq: 'FAQ',
    contact: 'Contact',
    freeQuote: 'Free Quote',
    callNow: 'Call Now',
    textUs: 'Text Us',
    viewAllServices: 'View all carpet & textile services',
    viewAllAreas: 'View all covered municipalities',
  },
  hero: {
    primaryCta: 'Request a Free Quote',
    callCta: 'Call 514-820-0368',
    smsCta: 'Text a Photo',
    reassuranceItems: [
      'High-temperature low-moisture extraction',
      'Biodegradable formulas safe for children and pets',
      'Full commercial liability insurance',
    ],
    imageAlt:
      'Sunlit Montreal living room featuring an immaculate freshly deep-cleaned cream carpet and linen sectional sofa',
  },
  standardsBand: {
    heading: 'Technical standards & service commitments',
    items: [
      {
        title: 'High-recovery mobile extraction',
        detail: 'Deep vacuum recovery removes embedded grit and moisture in one pass.',
      },
      {
        title: 'VOC-free plant-based solutions',
        detail: 'pH-neutral rinsing leaves zero sticky detergent residue behind.',
      },
      {
        title: '35 years of restoration background',
        detail: 'Field-tested stain and fiber protocols from disaster restoration.',
      },
      {
        title: 'Floor and trim protection',
        detail: 'Corner guards, shoe covers, and clean drop cloths at every visit.',
      },
    ],
  },
  servicesSection: {
    kicker: 'Carpet & textile care specialties',
    heading: 'Targeted care for every fiber and room',
    subheading:
      'We focus exclusively on carpets, fine area rugs, upholstered furniture, and mattresses — with tailored protocols for synthetic pile, wool, and delicate fabrics.',
    filterAll: 'All services',
    filterResidential: 'Residential',
    filterSpecialty: 'Stains & delicate fibers',
    filterCommercial: 'Commercial',
    learnMore: 'Service details',
    requestQuoteFor: 'Quote for this service',
  },
  services: {
    'wall-to-wall-carpet': {
      title: 'Wall-to-Wall Carpet Cleaning',
      shortDesc:
        'High-powered hot water extraction for bedrooms, basements, hallways, and carpeted stairs. Fast 4–6 hour drying.',
      categoryLabel: 'Residential · Hot water extraction',
      fullDesc:
        'Our 5-step deep extraction lifts abrasive grit from the base of the pile, neutralizes winter salt residue, and restores high-traffic hallways without over-wetting the backing or pad.',
      processPoints: [
        'Fiber identification (nylon, polyester, olefin, wool) and traffic-lane inspection',
        'Targeted plant-based or enzymatic pre-conditioning on walkways and stairs',
        'Gentle mechanical agitation followed by high-recovery hot water extraction',
        'pH-balancing rinse and pile grooming for uniform drying',
      ],
      idealFor: [
        'Bedrooms, living rooms, and finished basements',
        'Carpeted staircases and upper landings',
        'Family homes with toddlers or indoor pets',
      ],
      faqSpecific: [
        {
          q: 'How long does it take for carpets to dry?',
          a: 'Typically 4 to 6 hours thanks to high-recovery vacuum extraction and controlled moisture output.',
        },
        {
          q: 'Do I need to move all furniture beforehand?',
          a: 'We move small lightweight items (chairs, side tables) at no charge. Beds, bookcases, and heavy pieces remain in place and we clean thoroughly around them.',
        },
      ],
    },
    'area-rugs': {
      title: 'Area Rugs & Fine Rug Cleaning',
      shortDesc:
        'Custom care for wool, silk, viscose, and Persian or Oriental rugs. Dye-fastness testing and pH-balanced solutions.',
      categoryLabel: 'Delicate fibers · Specialty care',
      fullDesc:
        'Hand-knotted Oriental rugs, New Zealand wool weaves, and viscose blends require controlled chemistry and gentle moisture management to prevent dye bleed or fiber distortion.',
      processPoints: [
        'Mandatory dye-fastness test prior to any moisture application',
        'Deep dry dusting to remove trapped grit inside the weave',
        'Wool-safe, pH-neutral wash formulated for natural dyes',
        'Controlled flat drying and fringe grooming',
      ],
      idealFor: [
        'Persian, Oriental, and hand-knotted kilim rugs',
        'Thick wool living room area rugs',
        'Contemporary viscose, tencel, and cotton weaves',
      ],
      faqSpecific: [
        {
          q: 'Can area rugs be cleaned on site?',
          a: 'Yes, most rugs are cleaned safely on site over protective floor barriers; heavily saturated pieces are assessed directly with Marc Lemonnier.',
        },
      ],
    },
    'upholstery-sofas': {
      title: 'Upholstery & Sofa Cleaning',
      shortDesc:
        'Sofas, sectionals, armchairs, and dining chairs (W, S, WS fabrics and leather). Removes body oils and everyday rings.',
      categoryLabel: 'Residential · Fabric & leather',
      fullDesc:
        'Armrests and headrests absorb body oils, fine dust, and allergens. Our low-penetration upholstery tools refresh fabric fibers cleanly without soaking the inner cushion foam.',
      processPoints: [
        'Manufacturer cleaning code check (W, S, WS, or X) and hidden-spot test',
        'Detailed crevice and cushion seam vacuuming',
        'Gentle emulsifying pre-spray on high-contact areas',
        'Low-moisture extraction and accelerated cushion drying',
      ],
      idealFor: [
        '3-seat sofas, loveseats, and L-shaped sectionals',
        'Upholstered dining chairs and bar stools',
        'Microfiber, linen-blend, velvet, and leather seating',
      ],
      faqSpecific: [
        {
          q: 'Can you clean a sofa labeled with code “S” (solvent only)?',
          a: 'Yes. We match our low-moisture or solvent-safe method strictly to your furniture manufacturer code.',
        },
      ],
    },
    'mattress-sanitization': {
      title: 'Mattress Cleaning & Sanitization',
      shortDesc:
        'High-temperature dry steam treatment and hygienic extraction targeting dust mites, allergens, and perspiration marks.',
      categoryLabel: 'Sleep hygiene · Dry steam',
      fullDesc:
        'Mattresses accumulate moisture, dead skin cells, and dust mites over time. Our process combines high-temperature dry steam sanitization with controlled extraction without saturating the core.',
      processPoints: [
        'High-filtration extraction of surface allergens and debris',
        'Targeted treatment of organic perspiration rings',
        'High-temperature dry steam sanitization pass',
        'Fragrance-free odor neutralization safe for sensitive sleepers',
      ],
      idealFor: [
        'Twin, Double, Queen, and King mattresses',
        'Households managing dust-mite or seasonal allergies',
        'Guest rooms and between-tenant turnovers',
      ],
      faqSpecific: [
        {
          q: 'Can we sleep on the mattress the same night?',
          a: 'Yes, when booked in the morning or early afternoon, the mattress is dry and ready by bedtime.',
        },
      ],
    },
    'stain-removal': {
      title: 'Stubborn Stain & Ring Removal',
      shortDesc:
        'Targeted chemistry for coffee, red wine, grease, ink, rust, wax, and everyday spills without bleaching fibers.',
      categoryLabel: 'Specialty · Spot restoration',
      fullDesc:
        'Scrubbing a spill with store-bought cleaners often locks pigments deeper into the yarn. Drawing on 35 years of restoration work, we identify the stain chemistry first and break it down safely.',
      processPoints: [
        'Diagnostic identification (tannin, protein, oil, dye, oxidation)',
        'Removal of sticky DIY cleaner residues when present',
        'Fiber-safe targeted spotting without color loss',
        'Immediate extraction and clean water rinse',
      ],
      idealFor: [
        'Coffee, tea, red wine, juice, and food spills',
        'Cooking grease, cosmetics, shoe polish, and ink',
        'Water rings left after minor spills',
      ],
      faqSpecific: [
        {
          q: 'Can every single stain be removed 100%?',
          a: 'No honest specialist promises the impossible if a dye has chemically altered the fiber, so we give you an honest assessment on site before starting.',
        },
      ],
    },
    'pet-odor-urine': {
      title: 'Odor Removal (Pets, Urine & Mustiness)',
      shortDesc:
        'Deep bio-enzymatic and molecular neutralization for pet urine, damp basement smells, smoke, and trapped household odors.',
      categoryLabel: 'Specialty · Odor neutralization',
      fullDesc:
        'Stubborn odors seep beneath carpet backing and into upholstery cushions, reactivating whenever indoor humidity rises. Using proven disaster-restoration protocols, we break down odor molecules at the source rather than masking them with fragrance.',
      processPoints: [
        'Accurate mapping of affected areas via light and odor inspection',
        'Controlled bio-enzymatic saturation to digest uric acid crystals',
        'Deep subsurface extraction from carpet backing, pad, or upholstery',
        'Targeted secondary neutralization (hydroxyl/unoccupied ozone if needed)',
      ],
      idealFor: [
        'Recent or set-in dog and cat urine accidents',
        'Musty basements, smoke, or lingering cooking odors in textiles',
        'Preparing a residence for possession or real estate listing',
      ],
      faqSpecific: [
        {
          q: 'Will the odor come back on humid days?',
          a: 'No. Unlike surface sprays, enzymatic treatment breaks down uric acid crystals and organic compounds so odors do not return during humid weather.',
        },
      ],
    },
    'antibacterial-treatment': {
      title: 'Antibacterial & Fiber Sanitization Treatment',
      shortDesc:
        'Deep sanitization for carpets, sofas, and mattresses combining high-temperature dry steam with a gentle, residue-free eco sanitizer.',
      categoryLabel: 'Specialty · Hygiene & sanitization',
      fullDesc:
        'Designed for families with young children, allergy sufferers, daycares, or recovery after minor water spills or illness. Our antibacterial treatment sanitizes textile fibers thoroughly without leaving harsh chemical fumes or sticky residues.',
      processPoints: [
        'Pre-extraction of organic soil that harbors bacteria and allergens',
        'High-temperature dry steam thermal pass across carpets and cushions',
        'Application of a biodegradable, chlorine-free sanitizing agent',
        'Balanced rinse leaving fibers fresh, soft, and comfortable to touch',
      ],
      idealFor: [
        'Nurseries, playrooms, and living room rugs where babies crawl',
        'Sofas, mattresses, and carpets after minor water intrusion',
        'Daycares, clinics, offices, and move-in turnovers',
      ],
      faqSpecific: [
        {
          q: 'Does the antibacterial treatment leave a strong chemical smell?',
          a: 'No. We use low-toxicity, fragrance-free eco sanitizers that are safe for babies and pets as soon as the fibers are dry.',
        },
      ],
    },
    'move-in-move-out': {
      title: 'Move-Out / Move-In Carpet Renewal',
      shortDesc:
        'Complete hygienic carpet and stair refresh required for lease turnovers, home purchases, or pre-listing preparation.',
      categoryLabel: 'Residential · Move-in & real estate',
      fullDesc:
        'Moving into a new home and want fresh, sanitized carpets? Or fulfilling a lease cleaning clause on your way out? We schedule cleanly around your moving window.',
      processPoints: [
        'Ideal access in empty rooms, closets, and hallways',
        'Heavy-traffic restoration and removal of previous occupant odors',
        'Itemized official receipt for landlords, property managers, or buyers',
        'Flexible availability around July 1st and month-end moves',
      ],
      idealFor: [
        'Homebuyers taking possession before furniture arrives',
        'Tenants completing end-of-lease requirements',
        'Realtors preparing listings for open houses',
      ],
      faqSpecific: [
        {
          q: 'Do you provide an official invoice for my landlord?',
          a: 'Yes, you receive a detailed email invoice listing the rooms cleaned and service date.',
        },
      ],
    },
    'commercial-carpets': {
      title: 'Commercial Carpets & Office Tiles',
      shortDesc:
        'One-time or scheduled maintenance for offices, hotels, daycares, clinics, and condos. Evening and weekend hours available.',
      categoryLabel: 'Commercial · Offices & facilities',
      fullDesc:
        'Clean commercial carpets extend flooring lifespan and support healthier indoor air. We schedule work outside business hours so your staff and clients experience zero disruption.',
      processPoints: [
        'Deep extraction or fast-dry encapsulation (1–2 hour dry time)',
        'Focused care for lobbies, elevator corridors, and boardrooms',
        'After-hours, early morning, or Saturday scheduling',
        'Annual or semi-annual maintenance plans with commercial invoicing',
      ],
      idealFor: [
        'Corporate offices, law firms, and conference rooms',
        'Condominium common hallways and foyers',
        'Medical clinics, daycares, and retail spaces',
      ],
      faqSpecific: [
        {
          q: 'Can you work evenings or weekends?',
          a: 'Yes, commercial appointments are routinely scheduled evenings or Saturdays so everything is dry before opening.',
        },
      ],
    },
    'eco-stain-protector': {
      title: 'Eco-Friendly Stain Protector',
      shortDesc:
        'Protective barrier applied after cleaning to slow liquid absorption, guard against wear, and make future spot care easier.',
      categoryLabel: 'Protection · Fiber longevity',
      fullDesc:
        'Freshly rinsed carpet and sofa fibers readily accept an invisible protective shield. Our modern PFAS-free eco protector buys valuable time to blot spills before they set.',
      processPoints: [
        'Even application immediately following deep extraction',
        'Beading action slows coffee, juice, or wine penetration',
        'Reduces dry soil adhesion in high-traffic lanes',
        'Odor-free once dry',
      ],
      idealFor: [
        'Newly cleaned light-colored sofas and family sectionals',
        'Dining room carpets, hallways, and staircases',
        'Wool area rugs after professional washing',
      ],
      faqSpecific: [
        {
          q: 'How long does the protector last?',
          a: 'Depending on foot traffic, protection remains active for 12 to 18 months or until the next deep cleaning.',
        },
      ],
    },
  },
  whyEco: {
    kicker: 'Why choose Raviva',
    heading: 'Deep restoration that respects your indoor air and textiles',
    subheading:
      'Backed by 35 years in specialized cleaning and disaster restoration, Marc Lemonnier relies on disciplined methods that protect occupant health and extend carpet life.',
    pillars: [
      {
        number: '01.',
        title: 'Controlled moisture & fast drying (4–6 hours)',
        description:
          'High-recovery wands extract up to 95% of applied water. Your carpets dry quickly without over-wetting the backing or risking musty odors.',
      },
      {
        number: '02.',
        title: 'Plant-based, biodegradable & hypoallergenic formulas',
        description:
          'Zero sticky soap film and no harsh solvent fumes left in fibers. Safe once dry for crawling infants and household pets.',
      },
      {
        number: '03.',
        title: 'Low-noise professional & truck-mounted equipment',
        description:
          'Commercial extraction power paired with corner guards and clean floor protection for homes, condos, and offices.',
      },
      {
        number: '04.',
        title: 'Meticulous finish & satisfaction commitment',
        description:
          'Final room-by-room walkthrough with you. We take the extra time needed on stairs, edges, and traffic lanes.',
      },
    ],
  },
  processSection: {
    kicker: 'Clear & simple process',
    heading: 'How your appointment works',
    subheading: 'Four straightforward steps from your first call to final inspection.',
    steps: [
      {
        step: '01',
        title: 'Request or send photos',
        description:
          'Complete our guided quote form or call 514-820-0368 directly. Upload up to 5 photos for an even more accurate estimate.',
      },
      {
        step: '02',
        title: 'Free, transparent quote',
        description:
          'Receive a clear price tailored to your rooms, furniture pieces, and stain needs — with zero surprises at the door.',
      },
      {
        step: '03',
        title: 'On-time mobile arrival',
        description:
          'We arrive within your scheduled window, protect surrounding floors, inspect fibers, pre-treat stains, and deep extract.',
      },
      {
        step: '04',
        title: 'Clean, sanitized & inspected',
        description:
          'We review the finished work together, apply eco stain protector if selected, and leave simple drying tips.',
      },
    ],
  },
  proofSection: {
    kicker: 'Verifiable standards & reviews',
    heading: '35 years of trade discipline applied to every textile',
    configurableNotice:
      'Transparency notice: The review cards below are clearly marked slots ready for your verified Google customer reviews (no fabricated testimonials are displayed).',
  },
  founderSection: {
    kicker: 'Meet the founder',
    ctaButton: 'Speak with Marc Lemonnier',
    portraitAlt:
      'Portrait of Marc Lemonnier, founder of Raviva Nettoyage de Tapis Montréal, standing in a sunlit Montreal home hallway',
  },
  beforeAfterSection: {
    kicker: 'Real fiber restoration',
    heading: 'Before & after specialized treatment',
    subheading:
      'Representative restoration outcomes across traffic lanes, coffee spills, family sectionals, and wool rugs.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    mainImageAlt:
      'Before and after split comparison on a beige residential carpet: left side shows dark traffic soil and coffee stain, right side shows spotless restored fibers',
    cases: [
      {
        title: 'Living room traffic lane & set coffee spill',
        surface: 'Beige wall-to-wall synthetic carpet',
        treatment: 'Enzymatic pre-treatment + pH-neutral hot water extraction',
        result: 'Stain lifted cleanly and matted traffic pile restored.',
      },
      {
        title: '5-seat linen-blend family sectional',
        surface: 'Code W/S upholstery fabric',
        treatment: 'Gentle armrest degreasing + low-moisture extraction',
        result: 'Body-oil rings removed with zero water-ring markings.',
      },
      {
        title: 'Hand-knotted Persian wool rug',
        surface: 'Natural vegetable-dyed wool (8 x 10 ft)',
        treatment: 'Dye-fastness test + dry dusting + wool-safe wash',
        result: 'Restored color clarity and brightened cotton fringes without bleed.',
      },
    ],
  },
  areasSection: {
    kicker: 'Mobile coverage zones',
    heading: 'Areas served across Greater Montreal',
    subheading:
      'We bring our mobile unit directly to homes and businesses across Montreal, Laval, the South Shore, and the North Shore. Verify your postal code below.',
    postalCheckerTitle: 'Check your postal code',
    postalPlaceholder: 'E.g., H2X 1Y4',
    postalCheckBtn: 'Check zone',
    postalValidMsg: 'Good news: your postal code ({postal}) is inside our regular mobile zone with no extra travel fee.',
    postalOutOfZoneMsg:
      'Postal code ({postal}) appears outside our core zone. Call 514-820-0368 to confirm scheduling availability based on project size.',
    postalInvalidFormatMsg: 'Please enter a valid Canadian postal code (e.g., H2X 1Y4).',
    citiesCoveredLabel: 'Municipalities & boroughs',
  },
  moveInAndGift: {
    moveInKicker: 'Moving & home possession',
    moveInTitle: 'Moving into a new home or ending a lease?',
    moveInDesc:
      'Start fresh in a sanitized home or satisfy lease-end carpet clauses with full carpet and stair cleaning scheduled right before your furniture arrives.',
    moveInCta: 'Book a moving window',
    giftKicker: 'Raviva Gift Certificates',
    giftTitle: 'Gift a deep carpet or sofa refresh',
    giftDesc:
      'Thoughtful for new parents, housewarmings, or older relatives. Digital or printable certificate valid toward any residential cleaning service.',
    giftCta: 'Request a gift certificate',
  },
  faqSection: {
    kicker: 'Frequently asked questions',
    heading: 'Common questions about carpet & upholstery care',
    subheading: 'Straightforward answers on safety, drying times, pricing, and booking.',
    items: [
      {
        q: 'Are your cleaning solutions safe for babies, children, and pets?',
        a: 'Yes. We use biodegradable plant-based formulas with no harsh VOCs, rinsed with pH-neutral water so zero sticky or irritating detergent remains in the fibers.',
      },
      {
        q: 'How long do carpets and sofas take to dry?',
        a: 'Most wall-to-wall carpets dry in 4 to 6 hours and upholstered sofas in 3 to 5 hours. Moderate airflow or ceiling fans speed drying even further.',
      },
      {
        q: 'Will spots reappear a few days after cleaning?',
        a: 'No. Reappearing spots are usually caused by soapy residues from grocery-store rental machines or over-wetting that wicks dirt back up. Our pH-neutral rinse and high extraction prevent wicking.',
      },
      {
        q: 'How is my quote calculated?',
        a: 'Pricing is based on the number of rooms or stairs, rug dimensions, sofa seating count, and any specialty treatments such as pet urine enzymes. You always approve the exact price before work begins.',
      },
      {
        q: 'Do you service condos and upper-floor apartments?',
        a: 'Yes. We operate both truck-mounted access and quiet professional portable units designed specifically for high-rise condos and walk-ups.',
      },
      {
        q: 'Can you remove cat or dog urine odors permanently?',
        a: 'Yes. We apply bio-enzymatic treatments that break down uric acid crystals deep in the carpet backing rather than masking smells with fragrance.',
      },
      {
        q: 'Do I need to vacuum before you arrive?',
        a: 'A quick vacuum over loose debris helps save time, though it is not mandatory—we inspect and prep every area prior to extraction.',
      },
      {
        q: 'Do you clean delicate wool, silk, or viscose area rugs?',
        a: 'Yes. We perform dye-fastness testing first and use wool-safe, pH-neutral cleaning agents tailored to natural fibers.',
      },
      {
        q: 'Which payment methods do you accept?',
        a: 'We accept Interac e-Transfer, major credit/debit cards, and commercial invoicing on approved accounts. An itemized receipt with taxes is provided.',
      },
      {
        q: 'How can I book quickly or send photos for an estimate?',
        a: 'Use our 6-step quote wizard on this site (up to 5 photos supported) or call Marc Lemonnier directly at 514-820-0368.',
      },
    ],
  },
  finalCta: {
    heading: 'Ready to refresh your carpets, rugs, and sofas?',
    subheading:
      'Get a transparent, no-obligation quote backed by 35 years of specialized experience across Greater Montreal.',
    primaryBtn: 'Request a Free Quote',
    secondaryBtn: 'Call 514-820-0368',
  },
  quoteForm: {
    pageKicker: 'Guided free quote',
    pageTitle: 'Tell us about your carpets or furniture in 6 quick steps',
    pageSubtitle:
      'Receive an accurate estimate tailored to your surfaces, with optional photo upload. Fast follow-up directly from our team.',
    modalTitle: 'Quick Quote Request',
    modalSubtitle: 'Share your project details and contact info for a free, clear estimate.',
    stepOf: 'Step {current} of {total}',
    nextStep: 'Next step',
    prevStep: 'Previous step',
    submitQuote: 'Submit Free Quote Request',
    submitting: 'Submitting…',
    successTitle: 'Quote Request Received',
    successBody:
      'Thank you! We have received your project details. Marc Lemonnier or a Raviva specialist will contact you shortly via your preferred phone or email. For urgent requests, call 514-820-0368.',
    newRequestBtn: 'Submit another request',
    steps: {
      s1Title: '1. Which services do you need?',
      s1Subtitle: 'Select one or more carpet and textile services.',
      s2Title: '2. What type of property is this?',
      s2Subtitle: 'Helps us plan parking, access, and the right equipment.',
      s3Title: '3. Specific needs & fiber details',
      s3Subtitle: 'Let us know about stairs, wool rugs, stains, or pet odors.',
      s4Title: '4. Approximate quantities or dimensions',
      s4Subtitle: 'Rough estimates are completely fine to prepare your quote.',
      s5Title: '5. Preferred timeframe',
      s5Subtitle: 'Pick the scheduling window that works best for you.',
      s6Title: '6. Contact details & photos (optional)',
      s6Subtitle: 'Under Quebec Law 25, your details are used strictly to process your quote.',
    },
    propertyTypes: [
      { id: 'house', label: 'Detached or semi-detached house' },
      { id: 'condo', label: 'Condo (elevator or multi-storey access)' },
      { id: 'apartment', label: 'Apartment / Duplex / Triplex' },
      { id: 'office', label: 'Professional office' },
      { id: 'retail', label: 'Storefront, clinic, or daycare' },
      { id: 'building', label: 'Multi-unit building (common areas)' },
    ],
    specificNeeds: [
      { id: 'wall-carpet', label: 'Wall-to-wall carpet (bedrooms / basement)' },
      { id: 'stairs', label: 'Carpeted staircases' },
      { id: 'wool-rug', label: 'Wool, silk, or Oriental area rug' },
      { id: 'stains', label: 'Stubborn stains (coffee, wine, grease, traffic)' },
      { id: 'pet-odor', label: 'Odor removal (pets, urine, mustiness)' },
      { id: 'antibacterial', label: 'Antibacterial & sanitization treatment' },
      { id: 'sofa', label: 'Upholstered furniture (sofa, sectional, armchair)' },
      { id: 'mattress', label: 'Mattress sanitization' },
      { id: 'protector', label: 'Add eco-friendly stain protector' },
    ],
    quantities: {
      roomsLabel: 'Number of carpeted rooms',
      stairsLabel: 'Number of carpeted steps',
      areaSqFtLabel: 'Approx. square footage or rug dimensions',
      sofaSeatsLabel: 'Number of seating spots (sofa / chairs)',
      notesLabel: 'Helpful notes (floor level, parking, stain type)',
      notesPlaceholder: 'E.g., 3rd floor walk-up, coffee spot on linen sofa...',
    },
    timeframes: [
      { id: 'asap', label: 'As soon as possible (this week)' },
      { id: 'next-2-weeks', label: 'Within the next 2 weeks' },
      { id: 'this-month', label: 'This month (flexible)' },
      { id: 'move-date', label: 'Specific date (e.g., moving day)' },
    ],
    preferredDateLabel: 'Preferred date (optional)',
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      phone: 'Phone number',
      email: 'Email address',
      city: 'City or borough',
      postalCode: 'Postal code',
      photosLabel: 'Attach photos (optional, max 5 files, 5 MB each)',
      photosHint: 'Accepted: JPG, PNG, WebP. Photos help assess stains or rug weaves accurately.',
      photosBtn: 'Choose photos',
      photosTooMany: 'Maximum 5 photos allowed.',
      photosTooLarge: 'One file exceeds the 5 MB limit.',
      consentLoi25:
        'I consent to Raviva Nettoyage de Tapis Montréal collecting and using this information solely to prepare my quote and contact me regarding this request, in accordance with the Privacy Policy (Quebec Law 25).',
      consentMarketing:
        '(Optional) I agree to receive occasional seasonal care reminders or offers from Raviva by email. I may unsubscribe at any time.',
    },
    errors: {
      selectOneService: 'Please select at least one service.',
      selectProperty: 'Please select your property type.',
      firstNameRequired: 'Please enter your first name.',
      lastNameRequired: 'Please enter your last name.',
      phoneInvalid: 'Please enter a valid 10-digit phone number.',
      emailInvalid: 'Please enter a valid email address.',
      cityRequired: 'Please enter your city or borough.',
      postalInvalid: 'Please enter a valid Canadian postal code (e.g., H2X 1Y4).',
      consentRequired: 'Privacy consent (Law 25) is required to submit your request.',
    },
    outOfZoneNotice:
      'Note: This postal code appears outside our standard service zone, but you may still submit—Marc will confirm if travel can be arranged.',
  },
  cookies: {
    bannerTitle: 'Cookie & Privacy Preferences (Law 25)',
    bannerText:
      'We use essential cookies required for site operation and language selection. Analytics and marketing cookies remain disabled unless you explicitly consent.',
    acceptAll: 'Accept all',
    rejectNonEssential: 'Reject non-essential',
    customize: 'Customize',
    modalTitle: 'Privacy & Cookie Preferences',
    modalIntro:
      'In compliance with Quebec Law 25, you retain complete control over optional cookie categories on this website.',
    necessaryTitle: 'Strictly necessary cookies',
    necessaryDesc: 'Required to remember your language (FR/EN), consent choice, and secure form submissions.',
    alwaysActive: 'Always active',
    analyticsTitle: 'Audience analytics',
    analyticsDesc: 'Helps us understand which service pages are helpful so we can improve the site (GA4/GTM blocked by default).',
    marketingTitle: 'Marketing measurement',
    marketingDesc: 'Measures local campaign relevance without ever selling your personal information.',
    savePreferences: 'Save preferences',
  },
  footer: {
    tagline:
      'Dedicated to eco-friendly carpet, area rug, upholstery, and mattress cleaning across Greater Montreal. Backed by 35 years of specialized trade experience.',
    servicesHeading: 'Specialized Services',
    areasHeading: 'Service Areas',
    legalHeading: 'Compliance & Legal',
    accessibilityLink: 'Accessibility (WCAG 2.2 AA)',
    privacyLink: 'Privacy Policy (Law 25)',
    cookiesLink: 'Cookie Policy',
    termsLink: 'Terms of Service',
    manageCookiesBtn: 'Manage Cookies',
    copyright: '© {year} Raviva Nettoyage de Tapis Montréal. All rights reserved.',
    hoursLabel: 'Business Hours',
    neqLabel: 'NEQ',
  },
  pages: {
    about: {
      title: 'About Raviva & Marc Lemonnier',
      subtitle: '35 years of specialized cleaning and disaster restoration experience serving Greater Montreal homes and businesses.',
      pillarsTitle: 'Our technical approach',
      commitmentsTitle: 'Verifiable commitments',
      commitments: [
        '35 years of hands-on experience led by Marc Lemonnier in specialized cleaning and disaster restoration.',
        'High-recovery extraction equipment designed for 4 to 6 hour average drying.',
        'Biodegradable, VOC-free cleaning agents leaving zero sticky soap residue.',
        'Full commercial liability coverage and clear upfront pricing before work begins.',
      ],
    },
    contact: {
      title: 'Contact Raviva Carpet Cleaning Montreal',
      subtitle: 'Speak directly with our team for technical questions, urgent stain care, or commercial quotes.',
      directCallTitle: 'Phone & Text',
      emailTitle: 'Email',
      hoursTitle: 'Hours',
      serviceZoneTitle: 'Mobile coverage',
      loi25ContactTitle: 'Privacy Officer (Quebec Law 25)',
    },
    accessibility: {
      title: 'Digital Accessibility Statement',
      subtitle: 'Commitment to WCAG 2.2 Level AA and Quebec SGQRI 008 accessibility standards.',
      standardTitle: 'Our compliance goal',
      standardBody:
        'Raviva Nettoyage de Tapis Montréal is committed to ensuring this website is usable by everyone, including visitors relying on screen readers, keyboard-only navigation, or up to 200% text magnification.',
      measuresTitle: 'Technical accessibility measures implemented',
      measures: [
        'Skip-to-main-content link placed first in DOM order and revealed on keyboard focus.',
        'Strict semantic HTML landmarks (<header>, <nav>, <main>, <footer>, single <h1> per page).',
        'Verified contrast ratios of at least 4.5:1 for normal text and 3:1 for large headings and UI elements.',
        'Full keyboard operation with high-contrast focus rings, Escape key dismissal, and focus trapping inside modals.',
        'Explicitly labeled form controls with live validation announcements and prefers-reduced-motion support.',
      ],
      feedbackTitle: 'Need assistance or want to report a barrier?',
      feedbackBody:
        'If you experience any difficulty accessing information or submitting a quote request, please call Marc Lemonnier directly at 514-820-0368 or email marc@marclemonnier.com.',
    },
    privacy: {
      title: 'Privacy Policy (Quebec Law 25)',
      subtitle: 'How we collect, use, store, and safeguard your personal information.',
      updated: 'Last updated: November 2026',
      sections: [
        {
          heading: '1. Privacy Officer',
          body: 'In accordance with Quebec Law 25, the designated Privacy Officer for Raviva Nettoyage de Tapis Montréal is Marc Lemonnier, reachable at marc@marclemonnier.com or 514-820-0368.',
        },
        {
          heading: '2. Information collected and purpose',
          body: 'When submitting a quote request, we collect only what is needed to serve you: name, phone, email, city, postal code, carpet/furniture details, and any photos you voluntarily attach. Data is used strictly to prepare your estimate, verify service coverage, and schedule service.',
        },
        {
          heading: '3. Explicit consent & cookies',
          body: 'No analytics or marketing cookies are activated without your prior opt-in consent. Promotional emails are strictly optional and unchecked by default.',
        },
        {
          heading: '4. Retention, security & your rights',
          body: 'We never sell or rent your personal information. You may request access, correction, or deletion of your data at any time by contacting our Privacy Officer.',
        },
      ],
    },
    cookiesPage: {
      title: 'Cookie Policy',
      subtitle: 'Overview of cookies used on this website and how to adjust your settings.',
      sections: [
        {
          heading: 'Strictly necessary cookies',
          body: 'Store your selected language (French or English) and your consent choices so you are not prompted repeatedly.',
        },
        {
          heading: 'Analytics & marketing cookies (opt-in only)',
          body: 'Disabled by default. Activated only if you click “Accept all” or enable them via the permanent “Manage Cookies” link in the footer.',
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'General terms governing quotes and residential or commercial cleaning visits.',
      sections: [
        {
          heading: '1. Quotes & on-site verification',
          body: 'Online or photo estimates rely on described dimensions and conditions. Prior to starting, the technician confirms the exact price with you after inspecting fiber type and staining.',
        },
        {
          heading: '2. Technical limitations',
          body: 'Permanent chemical discoloration (bleach, dye transfer, or heat damage) cannot be reversed by cleaning. Any limitation is always explained transparently before work begins.',
        },
        {
          heading: '3. Cancellations & rescheduling',
          body: 'Please notify us at least 24 hours in advance at 514-820-0368 to reschedule or cancel without fee.',
        },
      ],
    },
    notFound: {
      code: '404',
      title: 'Page not found',
      body: 'The page you are looking for may have moved or the URL may be incorrect.',
      backHome: 'Back to Home',
    },
  },
};
