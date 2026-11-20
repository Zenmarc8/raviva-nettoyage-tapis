-- Raviva Multi-Site Platform: Initial Seed SQL for Supabase
-- Run after 001_initial_schema.sql

INSERT INTO public.sites (
  id,
  domain,
  brand_name,
  city_or_region,
  phone,
  email,
  address_display,
  primary_color,
  secondary_color,
  logo_data,
  hero_fr,
  hero_en,
  services_commercial_fr,
  services_commercial_en,
  services_residential_fr,
  services_residential_en,
  served_municipalities,
  legal_fr,
  legal_en,
  seo_meta_fr,
  seo_meta_en,
  is_active
) VALUES (
  '11111111-1111-4111-8111-111111111101',
  'ravivanettoyagedetapis.com',
  'Raviva Nettoyage de tapis',
  'Grand Montréal',
  '[À CONFIGURER DANS L''ADMIN]',
  '[À CONFIGURER DANS L''ADMIN]',
  '[À CONFIGURER DANS L''ADMIN]',
  '#163a5f',
  '#0f766e',
  '{"wordmark":"Raviva Nettoyage de tapis","image_url":"/assets/aistudio/Gemini_Generated_Image_jwdcxyjwdcxyjwdc_9a57b113.jpg","alt_fr":"Logo de Raviva Nettoyage de tapis","alt_en":"Raviva Nettoyage de tapis logo"}'::jsonb,
  '{
    "eyebrow": "Grand Montréal · Commercial & Résidentiel",
    "headline": "Entretien rigoureux des tapis, carpettes et meubles rembourrés",
    "subheadline": "Deux cadres opérationnels clairs : contrats commerciaux gérés directement par Raviva Nettoyage de tapis, et demandes résidentielles confiées à une entreprise partenaire indépendante vérifiée.",
    "primary_cta": "Demander une soumission",
    "secondary_cta": "Comparer les deux services",
    "commercial_summary": "Pour les bureaux, commerces et immeubles : Raviva agit comme fournisseur contractuel unique, conclut le contrat et dirige directement l''exécution des travaux.",
    "residential_summary": "Pour les résidences privées : Raviva agit comme plateforme de mise en relation ; un partenaire indépendant vérifié prépare la soumission, conclut le contrat, facture et exécute les travaux."
  }'::jsonb,
  '{
    "eyebrow": "Greater Montreal · Commercial & Residential",
    "headline": "Structured Care for Carpets, Area Rugs, and Upholstered Furniture",
    "subheadline": "Two transparent operating models: commercial contracts managed directly by Raviva Nettoyage de tapis, and residential requests matched with a verified independent partner.",
    "primary_cta": "Request a Quote",
    "secondary_cta": "Compare Both Services",
    "commercial_summary": "For offices, retail, and buildings: Raviva acts as the sole contractual provider, enters into the agreement directly, and oversees execution.",
    "residential_summary": "For private homes: Raviva operates strictly as a marketing and matching platform; a verified independent partner prepares the quote, contracts, invoices, and completes the work."
  }'::jsonb,
  '{
    "page_title": "Services commerciaux de nettoyage de tapis",
    "page_subtitle": "Gestion contractuelle directe par Raviva Nettoyage de tapis pour bureaux, commerces, hôtellerie, établissements institutionnels et aires communes d''immeubles.",
    "operational_disclosure": "Cadre contractuel commercial : Raviva Nettoyage de tapis agit à titre de fournisseur contractuel unique. Raviva conclut le contrat de service directement avec votre organisation, assure la coordination et dirige les travaux avec ses propres équipes ou des sous-traitants encadrés sous la responsabilité directe de Raviva.",
    "items": [
      {"id":"comm-1","title":"01. Extraction à l''eau chaude et roto-shampoing commercial","description":"Traitement en profondeur des corridors, aires ouvertes et salles de réunion fortement sollicités afin de déloger les particules abrasives incrustées et préserver la structure des fibres.","method_note":"Méthode recommandée pour la remise à neuf périodique et le respect des garanties de manufacturiers."},
      {"id":"comm-2","title":"02. Entretien intermédiaire à faible humidité (encapsulation)","description":"Intervention rapide entre les nettoyages en profondeur pour les espaces exigeant une remise en circulation rapide, incluant les bureaux occupés en continu.","method_note":"Planification flexible en dehors des heures d''ouverture selon les contraintes du bâtiment."},
      {"id":"comm-3","title":"03. Nettoyage de mobilier de bureau et cloisons textiles","description":"Assainissement adapté des fauteuils ergonomiques, banquettes d''accueil et panneaux acoustiques en tissu ou en cuir selon la sensibilité des matériaux.","method_note":"Sélection préalable du procédé humide, combiné ou par solvant selon l''étiquette du fabricant."},
      {"id":"comm-4","title":"04. Application de protecteur fluoré et programmes planifiés","description":"Renouvellement de la barrière protectrice sur les zones à trafic intense et établissement de calendriers d''entretien trimestriels ou annuels sur mesure.","method_note":"Devis détaillé au pied carré remis directement par Raviva."}
    ]
  }'::jsonb,
  '{
    "page_title": "Commercial Carpet & Upholstery Cleaning Services",
    "page_subtitle": "Direct contractual management by Raviva Nettoyage de tapis for offices, retail spaces, hospitality, institutions, and multi-unit common areas.",
    "operational_disclosure": "Commercial Contractual Framework: Raviva Nettoyage de tapis acts as the sole contractual provider. Raviva executes the service agreement directly with your organization, coordinates scheduling, and directs the work using its own teams or supervised subcontractors under Raviva''s direct responsibility.",
    "items": [
      {"id":"comm-1","title":"01. Commercial Hot-Water Extraction & Rotary Agitation","description":"Deep restoration for high-traffic corridors, open offices, and boardrooms designed to remove abrasive embedded soil and protect carpet fiber structure.","method_note":"Recommended for periodic deep cleaning and maintaining manufacturer warranty compliance."},
      {"id":"comm-2","title":"02. Low-Moisture Interim Maintenance (Encapsulation)","description":"Fast-drying maintenance between deep extractions for facilities requiring minimal downtime and continuous access.","method_note":"After-hours or weekend scheduling aligned with building operations."},
      {"id":"comm-3","title":"03. Office Seating & Textile Partition Cleaning","description":"Material-specific cleaning for ergonomic task chairs, lobby seating, and upholstered acoustic panels in fabric or leather.","method_note":"Method selected (wet, combined, or dry solvent) based on textile care codes."},
      {"id":"comm-4","title":"04. Fluorine Protector Application & Scheduled Programs","description":"Renewal of sacrificial stain-barrier protection on high-wear lanes alongside tailored quarterly or annual maintenance schedules.","method_note":"Transparent square-footage estimates issued directly by Raviva."}
    ]
  }'::jsonb,
  '{
    "page_title": "Services résidentiels via partenaires indépendants",
    "page_subtitle": "Nettoyage de tapis mur à mur, escaliers, carpettes et meubles rembourrés à domicile dans le Grand Montréal.",
    "operational_disclosure": "Divulgation obligatoire sur le rôle de Raviva (Résidentiel) : Pour toute demande résidentielle, Raviva Nettoyage de tapis agit uniquement comme plateforme de commercialisation et de mise en relation. Une entreprise partenaire indépendante vérifiée — dont l''identité complète est communiquée au client au moment approprié — prépare la soumission, conclut le contrat, assure la facturation et exécute les travaux.",
    "items": [
      {"id":"res-1","title":"01. Tapis mur à mur, chambres et sous-sols","description":"Nettoyage en profondeur par extraction à l''eau chaude avec prétraitement ciblé des voies de circulation et des taches tenaces.","method_note":"Évaluation et soumission préparées par le partenaire indépendant assigné."},
      {"id":"res-2","title":"02. Escaliers recouverts et carpettes délicates","description":"Soin minutieux des marches, contremarches et tapis de laine ou synthétiques pour préserver l''apparence et la texture des fibres.","method_note":"Choix de la méthode validé sur place selon la composition de la fibre."},
      {"id":"res-3","title":"03. Canapés, fauteuils en tissu et mobilier en cuir","description":"Procédés adaptés aux tissus d''ameublement délicats (méthode humide contrôlée, mousse sèche, solvant ou Dry-Wet-Dry) et hydratation du cuir.","method_note":"Inspection préalable des coutures, du rembourrage et de la stabilité des teintures."},
      {"id":"res-4","title":"04. Traitement protecteur et réduction des allergènes","description":"Élimination en profondeur des poussières fines et allergènes piégés dans les fibres, avec option d''application d''un protecteur textile.","method_note":"Contrat et garantie de service émis directement par l''entreprise partenaire."}
    ]
  }'::jsonb,
  '{
    "page_title": "Residential Services via Independent Partners",
    "page_subtitle": "In-home cleaning for wall-to-wall carpets, staircases, area rugs, and upholstered furniture across Greater Montreal.",
    "operational_disclosure": "Mandatory Residential Role Disclosure: For all residential inquiries, Raviva Nettoyage de tapis acts strictly as a marketing and lead-matching platform. A verified independent partner company—whose full identity is disclosed to the client at the appropriate time—prepares the quote, enters into the service contract, handles billing, and performs the work.",
    "items": [
      {"id":"res-1","title":"01. Wall-to-Wall Carpets, Bedrooms & Basements","description":"Deep hot-water extraction cleaning with targeted pre-conditioning for high-traffic lanes and household spots.","method_note":"Assessment and estimate prepared directly by the assigned independent partner."},
      {"id":"res-2","title":"02. Carpeted Staircases & Delicate Area Rugs","description":"Detailed care for stair treads, risers, wool rugs, and synthetic weaves to preserve pile loft and fiber integrity.","method_note":"Cleaning method confirmed on site according to fiber composition."},
      {"id":"res-3","title":"03. Fabric Sofas, Armchairs & Leather Upholstery","description":"Tailored upholstery methods (controlled wet extraction, dry foam, solvent, or Dry-Wet-Dry) and conditioning care for leather.","method_note":"Pre-inspection of seams, cushions, and dye fastness before treatment."},
      {"id":"res-4","title":"04. Stain Protection & Allergen Reduction","description":"Thorough removal of trapped dust particles and airborne allergen reservoirs, with optional textile protector renewal.","method_note":"Service contract and workmanship warranty issued directly by the independent partner."}
    ]
  }'::jsonb,
  '[
    "Beaconsfield","Beloeil","Blainville","Boisbriand","Bois-des-Filion","Boucherville","Brossard","Candiac","Carignan","Chambly",
    "Charlemagne","Châteauguay","Côte-Saint-Luc","Delson","Deux-Montagnes","Dollard-Des Ormeaux","Dorval","Hampstead","Hudson","Kirkland",
    "La Prairie","Lanoraie","L''Assomption","Laval","Lavaltrie","L''Épiphanie","Léry","Les Cèdres","L''Île-Dorval","L''Île-Perrot",
    "Longueuil","Lorraine","Mascouche","McMasterville","Mercier","Mirabel","Montréal","Montréal-Est","Montréal-Ouest","Mont-Royal",
    "Mont-Saint-Hilaire","Notre-Dame-de-l''Île-Perrot","Oka","Otterburn Park","Pincourt","Pointe-Calumet","Pointe-Claire","Pointe-des-Cascades","Repentigny","Richelieu",
    "Rosemère","Saint-Amable","Saint-Basile-le-Grand","Saint-Bruno-de-Montarville","Saint-Constant","Sainte-Anne-de-Bellevue","Sainte-Anne-des-Plaines","Sainte-Catherine","Sainte-Julie","Sainte-Marthe-sur-le-Lac",
    "Sainte-Thérèse","Saint-Eustache","Saint-Lambert","Saint-Mathias-sur-Richelieu","Saint-Mathieu","Saint-Mathieu-de-Beloeil","Saint-Roch-de-l''Achigan","Saint-Roch-Ouest","Saint-Sulpice","Terrebonne",
    "Varennes","Vaudreuil-Dorion","Vaudreuil-sur-le-Lac","Verchères","Westmount"
  ]'::jsonb,
  '{
    "privacy_title": "Politique de confidentialité (Loi 25 du Québec)",
    "privacy_updated": "Mise à jour : 2026",
    "privacy_sections": [
      {"heading":"1. Responsable de la protection des renseignements personnels","body":"Raviva Nettoyage de tapis veille à la protection des renseignements personnels recueillis via ce site conformément à la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25, Québec)."},
      {"heading":"2. Distinction entre demandes commerciales et résidentielles","body":"Pour une demande commerciale, vos données sont traitées directement par Raviva. Pour une demande résidentielle, Raviva agit comme intermédiaire et ne transmet vos coordonnées à un partenaire indépendant vérifié qu''avec votre consentement explicite et horodaté."}
    ],
    "terms_title": "Conditions d''utilisation et divulgations légales",
    "terms_updated": "Mise à jour : 2026",
    "terms_sections": [
      {"heading":"1. Rôle contractuel distinct (Commercial vs Résidentiel)","body":"Volet Commercial : Raviva agit comme fournisseur contractuel unique et dirige les travaux. Volet Résidentiel : Raviva agit uniquement comme plateforme de commercialisation et de mise en relation ; un partenaire indépendant vérifié prépare la soumission, conclut le contrat, facture et exécute les travaux."},
      {"heading":"2. Loi sur la protection du consommateur (Contrats à distance)","body":"Tout contrat résidentiel conclu à distance avec le partenaire indépendant respecte les exigences de divulgation préalable et de droit d''annulation de la Loi sur la protection du consommateur du Québec."}
    ]
  }'::jsonb,
  '{
    "privacy_title": "Privacy Policy (Quebec Law 25)",
    "privacy_updated": "Updated: 2026",
    "privacy_sections": [
      {"heading":"1. Privacy Officer & Legal Framework","body":"Raviva Nettoyage de tapis safeguards personal information in compliance with Quebec Law 25."},
      {"heading":"2. Commercial vs. Residential Data Handling","body":"Commercial requests are processed directly by Raviva. Residential requests are shared with a verified independent partner only with explicit, timestamped consent."}
    ],
    "terms_title": "Terms of Use & Legal Disclosures",
    "terms_updated": "Updated: 2026",
    "terms_sections": [
      {"heading":"1. Distinct Contractual Roles (Commercial vs. Residential)","body":"Commercial: Raviva acts as sole contractual provider. Residential: Raviva acts solely as a marketing and matching platform; a verified independent partner prepares the quote, contracts, bills, and performs the work."},
      {"heading":"2. Quebec Consumer Protection Act (Distance Contracts)","body":"Residential distance contracts entered into with the independent partner comply with the Quebec Consumer Protection Act."}
    ]
  }'::jsonb,
  '{"site_title":"Raviva Nettoyage de tapis – Commercial & Résidentiel | Grand Montréal","meta_description":"Nettoyage professionnel de tapis et meubles dans le Grand Montréal. Contrats commerciaux gérés par Raviva et demandes résidentielles via partenaires vérifiés.","og_title":"Raviva Nettoyage de tapis | Grand Montréal","og_description":"Services commerciaux directs par Raviva et mise en relation résidentielle vérifiée."}'::jsonb,
  '{"site_title":"Raviva Nettoyage de tapis – Commercial & Residential | Greater Montreal","meta_description":"Carpet and upholstery cleaning across Greater Montreal. Direct commercial contracts by Raviva and residential requests via verified independent partners.","og_title":"Raviva Nettoyage de tapis | Greater Montreal","og_description":"Direct B2B commercial carpet care by Raviva and verified residential partner matching."}'::jsonb,
  true
) ON CONFLICT (domain) DO NOTHING;

-- Seed 6 Articles (2 published, 4 draft)
INSERT INTO public.articles (
  id, site_id, slug_fr, slug_en, title_fr, title_en, excerpt_fr, excerpt_en, content_fr, content_en, status, category_fr, category_en, reading_time_min, published_at
) VALUES
(
  '44444444-4444-4444-8444-444444444401',
  '11111111-1111-4111-8111-111111111101',
  '11-questions-a-poser-avant-nettoyage-tapis',
  '11-questions-to-ask-before-carpet-cleaning',
  '11 Questions à poser avant de laisser un nettoyeur de tapis entrer chez vous',
  '11 Questions to Ask Before Letting a Carpet Cleaner Into Your Home',
  'Comment distinguer un véritable professionnel d''une offre à rabais : formation, certifications reconnues comme l''IICRC, méthodes et tarification transparente.',
  'How to separate thorough workmanship from low-ball offers: technician training, recognized certifications such as the IICRC, cleaning methods, and transparent pricing.',
  '## Qualité durable ou prix le plus bas ?\n\nChoisir une entreprise de nettoyage de tapis sur le seul critère du tarif le plus bas expose souvent à un nettoyage superficiel. Vérifiez l''expérience pratique du technicien, sa formation continue, ses certifications (comme l''IICRC), la diversité des méthodes proposées, la tarification transparente au pied carré plutôt que par pièce, les références vérifiables et la garantie de satisfaction.',
  '## Lasting Quality vs. the Lowest Advertised Price\n\nSelecting a carpet cleaner solely on price often leads to poor rinsing. Verify years in operation, technician hands-on experience, ongoing training, recognized certifications such as IICRC, multi-method capability, transparent square-footage pricing, verifiable references, and satisfaction guarantees.',
  'published',
  'Choix du prestataire',
  'Choosing a Provider',
  6,
  '2026-02-01T10:00:00Z'
),
(
  '44444444-4444-4444-8444-444444444402',
  '11111111-1111-4111-8111-111111111101',
  'meilleure-methode-nettoyage-tapis',
  'best-carpet-cleaning-method',
  'Quelle est la meilleure méthode de nettoyage des tapis ?',
  'What Is the Best Carpet Cleaning Method?',
  'Fréquence recommandée de 6 à 18 mois et comparaison technique entre l''extraction à l''eau chaude combinée au roto-shampoing et les méthodes intermédiaires à sec.',
  'Recommended 6-to-18-month frequency and technical comparison between hot-water extraction paired with rotary agitation and low-moisture dry methods.',
  '## Fréquence de nettoyage recommandée\n\nUn entretien professionnel tous les 6 à 18 mois préserve les fibres et respecte les garanties des fabricants. L''extraction à l''eau chaude (souvent appelée à tort nettoyage à la vapeur), combinée au besoin au roto-shampoing, reste la référence en profondeur, complétée par les méthodes intermédiaires à sec : mousse sèche, bonnet rotatif, encapsulation et poudre sèche.',
  '## Recommended Cleaning Frequency\n\nProfessional cleaning every 6 to 18 months preserves carpet fibers and manufacturer warranties. Hot-water extraction (often misnamed steam cleaning), paired with rotary shampooing where needed, delivers deep rinsing alongside interim dry methods: dry foam, rotary bonnet, encapsulation, and dry powder.',
  'published',
  'Méthodes techniques',
  'Technical Methods',
  5,
  '2026-02-05T10:00:00Z'
),
(
  '44444444-4444-4444-8444-444444444403',
  '11111111-1111-4111-8111-111111111101',
  'verite-protecteurs-tapis-fluorine-ppm',
  'truth-about-carpet-protectors-fluorine-ppm',
  'La vérité sur les protecteurs de tapis (Fluorine et PPM)',
  'The Truth About Carpet Protectors (Fluorine and PPM)',
  'Analyse technique des fibres de nylon, acides bloquants de colorants et concentration en fluorine (PPM) en usine (250-600 PPM) vs sur place (300-500 PPM).',
  'Technical breakdown of nylon fibers, acid dye blockers, and fluorine levels (PPM) at the mill (250-600 PPM) vs. on-site low-pressure application (300-500 PPM).',
  '## Traitement en usine vs application sur site\n\nLes fibres de nylon reçoivent des acides bloquants de colorants et un traitement au fluorine fixé à chaud en usine (250 à 600 PPM). Sur place, une application à basse pression (300 à 500 PPM) restaure cette couche sacrificielle renouvelable comparable au cirage d''une voiture.',
  '## Factory Treatment vs. On-Site Application\n\nNylon fibers receive acid dye blockers and heat-set fluorine at the mill (250 to 600 PPM). On-site low-pressure application (300 to 500 PPM) restores this renewable sacrificial barrier similar to waxing a vehicle.',
  'draft',
  'Protection des fibres',
  'Fiber Protection',
  4,
  NULL
),
(
  '44444444-4444-4444-8444-444444444404',
  '11111111-1111-4111-8111-111111111101',
  'tapis-refuge-acariens-impact-allergies',
  'carpet-dust-mites-allergies-impact',
  'Votre tapis est-il un refuge pour les acariens ? Impact sur les allergies',
  'Is Your Carpet a Haven for Dust Mites? Impact on Allergies',
  'Faits scientifiques sur les acariens domestiques, citations du Dr Thomas Platts-Mills et du Dr Michael Berry (EPA), et importance du nettoyage annuel en profondeur.',
  'Scientific facts on dust mites, insights from Dr. Thomas Platts-Mills and Dr. Michael Berry (EPA), and the importance of vacuuming and annual deep extraction.',
  '## Acariens domestiques et qualité de l''air\n\nUne maison peut abriter jusqu''à 2 millions d''acariens et jusqu''à 40 000 par once de poussière. Les travaux cités du Dr Thomas Platts-Mills et du Dr Michael Berry (EPA) rappellent le rôle de l''aspiration rigoureuse et du nettoyage en profondeur annuel pour maîtriser les allergènes aéroportés.',
  '## Dust Mites and Indoor Air Quality\n\nA home can harbor up to 2 million dust mites and up to 40,000 per ounce of dust. Findings referenced from Dr. Thomas Platts-Mills and Dr. Michael Berry (EPA) highlight thorough vacuuming and annual deep cleaning to manage airborne allergens.',
  'draft',
  'Qualité de l''air intérieur',
  'Indoor Air Quality',
  5,
  NULL
),
(
  '44444444-4444-4444-8444-444444444405',
  '11111111-1111-4111-8111-111111111101',
  'prix-vs-valeur-vrai-cout-nettoyage-tapis',
  'price-vs-value-true-cost-carpet-cleaning',
  'Prix vs Valeur : comment évaluer le vrai coût d''un nettoyage professionnel',
  'Price vs. Value: How to Evaluate the True Cost of Professional Cleaning',
  'Pourquoi les offres à prix dérisoire cachent des ventes sous pression et pourquoi Shaw Industries recommande l''extraction à l''eau chaude avec agitation mécanique.',
  'Why ultra-low offers hide high-pressure upsells and why Shaw Industries recommends hot-water extraction with mechanical agitation over consumer rentals.',
  '## Éviter les tactiques de vente sous pression\n\nLes offres à prix dérisoire dissimulent souvent des suppléments imposés sur place. Shaw Industries recommande l''extraction à l''eau chaude avec agitation mécanique plutôt que les appareils de location grand public.',
  '## Avoiding High-Pressure Upsell Tactics\n\nTeaser pricing frequently masks mandatory on-site add-ons. Shaw Industries recommends professional hot-water extraction with mechanical agitation over rental machines.',
  'draft',
  'Conseils budgétaires',
  'Budget & Value',
  4,
  NULL
),
(
  '44444444-4444-4444-8444-444444444406',
  '11111111-1111-4111-8111-111111111101',
  'guide-methodes-nettoyage-meubles-rembourres-cuir',
  'complete-guide-upholstery-leather-cleaning-methods',
  'Guide complet : les méthodes de nettoyage des meubles rembourrés et du cuir',
  'Complete Guide: Cleaning Methods for Upholstered Furniture and Leather',
  'Distinction entre tissus d''ameublement et tapis : méthodes humides, extraction par solvant, méthode combinée Dry-Wet-Dry et soin régulier du cuir.',
  'Distinguishing upholstery from carpet: wet methods, solvent extraction, Dry-Wet-Dry combined cleaning, and routine leather conditioning.',
  '## Tissus délicats, méthode Dry-Wet-Dry et soin du cuir\n\nLes meubles rembourrés exigent des protocoles distincts des tapis : méthodes humides (extraction à l''eau chaude, shampoing humide, mousse sèche à l''éponge de mer naturelle), méthodes à sec (solvant, nettoyage manuel), méthode combinée Dry-Wet-Dry et hydratation régulière du cuir.',
  '## Delicate Fabrics, Dry-Wet-Dry, and Leather Care\n\nUpholstered furniture requires tailored care: wet methods (hot-water extraction, wet shampoo, dry foam with natural sea sponge), dry methods (solvent extraction, manual dry spotting), Dry-Wet-Dry combined process, and regular leather conditioning.',
  'draft',
  'Meubles & Cuir',
  'Upholstery & Leather',
  6,
  NULL
)
ON CONFLICT (site_id, slug_fr) DO NOTHING;
