export type RegionId = 'montreal' | 'laval' | 'rive-sud' | 'rive-nord';

export interface CityLocation {
  slug: string;
  name: string;
  regionId: RegionId;
  postalPrefixes: string[];
}

export interface RegionGroup {
  id: RegionId;
  slug: string;
  name: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  cities: CityLocation[];
}

export const REGIONS_CONFIG: RegionGroup[] = [
  {
    id: 'montreal',
    slug: 'ile-de-montreal',
    name: {
      fr: 'Île de Montréal',
      en: 'Island of Montreal',
    },
    description: {
      fr: 'Intervention rapide avec unité mobile dans tous les arrondissements et villes liées de l’île de Montréal.',
      en: 'Fast mobile unit service across all boroughs and municipalities on the Island of Montreal.',
    },
    cities: [
      { slug: 'montreal-centre', name: 'Montréal (Centre, Plateau, Rosemont, Villeray)', regionId: 'montreal', postalPrefixes: ['H1', 'H2', 'H3', 'H4'] },
      { slug: 'westmount', name: 'Westmount', regionId: 'montreal', postalPrefixes: ['H3Y', 'H3Z'] },
      { slug: 'outremont', name: 'Outremont', regionId: 'montreal', postalPrefixes: ['H2V'] },
      { slug: 'ville-mont-royal', name: 'Mont-Royal', regionId: 'montreal', postalPrefixes: ['H3P', 'H3R', 'H4P'] },
      { slug: 'ndg-cote-saint-luc', name: 'NDG & Côte-Saint-Luc', regionId: 'montreal', postalPrefixes: ['H4A', 'H4B', 'H4V', 'H4W'] },
      { slug: 'verdun-lasalle', name: 'Verdun, Griffintown & LaSalle', regionId: 'montreal', postalPrefixes: ['H3C', 'H4E', 'H4G', 'H4H', 'H8N', 'H8P'] },
      { slug: 'ouest-de-lile', name: 'Ouest-de-l’Île (Pointe-Claire, Dorval, Beaconsfield)', regionId: 'montreal', postalPrefixes: ['H9'] },
      { slug: 'anjou-saint-leonard', name: 'Anjou, Saint-Léonard & Montréal-Est', regionId: 'montreal', postalPrefixes: ['H1K', 'H1M', 'H1P', 'H1R', 'H1S', 'H1B'] },
    ],
  },
  {
    id: 'laval',
    slug: 'laval',
    name: {
      fr: 'Laval',
      en: 'Laval',
    },
    description: {
      fr: 'Service résidentiel et commercial complet sur l’ensemble de l’Île Jésus, sans frais de déplacement additionnels.',
      en: 'Complete residential and commercial carpet care across Laval with no extra travel surcharge.',
    },
    cities: [
      { slug: 'chomedey', name: 'Chomedey', regionId: 'laval', postalPrefixes: ['H7S', 'H7T', 'H7V', 'H7W'] },
      { slug: 'sainte-dorothee', name: 'Sainte-Dorothée & Laval-Ouest', regionId: 'laval', postalPrefixes: ['H7R', 'H7X', 'H7Y'] },
      { slug: 'vimont-auteuil', name: 'Vimont & Auteuil', regionId: 'laval', postalPrefixes: ['H7H', 'H7K', 'H7M'] },
      { slug: 'duvernay-saint-francois', name: 'Duvernay & Pont-Viau', regionId: 'laval', postalPrefixes: ['H7A', 'H7E', 'H7G', 'H7N'] },
      { slug: 'sainte-rose-fabreville', name: 'Sainte-Rose & Fabreville', regionId: 'laval', postalPrefixes: ['H7L', 'H7P'] },
    ],
  },
  {
    id: 'rive-sud',
    slug: 'rive-sud-montreal',
    name: {
      fr: 'Rive-Sud de Montréal',
      en: 'South Shore of Montreal',
    },
    description: {
      fr: 'Couverture régulière sur la Rive-Sud pour maisons unifamiliales, condos et immeubles commerciaux.',
      en: 'Regular mobile coverage across the South Shore for homes, condos, and commercial spaces.',
    },
    cities: [
      { slug: 'longueuil', name: 'Longueuil & Saint-Hubert', regionId: 'rive-sud', postalPrefixes: ['J3Y', 'J3Z', 'J4G', 'J4H', 'J4J', 'J4K', 'J4L', 'J4M', 'J4N'] },
      { slug: 'brossard', name: 'Brossard', regionId: 'rive-sud', postalPrefixes: ['J4W', 'J4X', 'J4Y', 'J4Z'] },
      { slug: 'saint-lambert', name: 'Saint-Lambert & Greenfield Park', regionId: 'rive-sud', postalPrefixes: ['J4P', 'J4R', 'J4S', 'J4T', 'J4V'] },
      { slug: 'boucherville', name: 'Boucherville & Saint-Bruno', regionId: 'rive-sud', postalPrefixes: ['J4B', 'J3V'] },
      { slug: 'la-prairie-candiac', name: 'La Prairie, Candiac & Chambly', regionId: 'rive-sud', postalPrefixes: ['J5R', 'J3L'] },
    ],
  },
  {
    id: 'rive-nord',
    slug: 'rive-nord-couronne',
    name: {
      fr: 'Couronne Nord',
      en: 'North Shore',
    },
    description: {
      fr: 'Déplacements planifiés dans les secteurs résidentiels et commerciaux de la Couronne Nord.',
      en: 'Scheduled mobile visits throughout North Shore residential and commercial neighborhoods.',
    },
    cities: [
      { slug: 'terrebonne-mascouche', name: 'Terrebonne & Mascouche', regionId: 'rive-nord', postalPrefixes: ['J6V', 'J6W', 'J6X', 'J6Y', 'J7K', 'J7L'] },
      { slug: 'repentigny', name: 'Repentigny & Charlemagne', regionId: 'rive-nord', postalPrefixes: ['J5Y', 'J5Z', 'J6A'] },
      { slug: 'blainville-rosemere', name: 'Blainville, Rosemère & Lorraine', regionId: 'rive-nord', postalPrefixes: ['J7A', 'J7B', 'J7C', 'J7E'] },
      { slug: 'boisbriand-saint-eustache', name: 'Boisbriand & Saint-Eustache', regionId: 'rive-nord', postalPrefixes: ['J7G', 'J7H', 'J7P', 'J7R'] },
    ],
  },
];

export const ALL_CITIES: CityLocation[] = REGIONS_CONFIG.flatMap((r) => r.cities);

// Valid FSA prefixes (3 chars or 2 chars) for Greater Montreal / Laval / South & North Shores
export const VALID_POSTAL_PREFIXES: string[] = [
  'H1', 'H2', 'H3', 'H4', 'H5', 'H7', 'H8', 'H9',
  'J3L', 'J3V', 'J3Y', 'J3Z', 'J4', 'J5R', 'J5Y', 'J5Z',
  'J6A', 'J6V', 'J6W', 'J6X', 'J6Y', 'J7A', 'J7B', 'J7C',
  'J7E', 'J7G', 'J7H', 'J7K', 'J7L', 'J7P', 'J7R',
];

export function validateCanadianPostalCode(raw: string): {
  isValidFormat: boolean;
  normalized: string;
  inServiceZone: boolean;
  matchedRegion?: RegionId;
} {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const canadianRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/;
  const isValidFormat = canadianRegex.test(cleaned);
  const normalized = cleaned.length === 6 ? `${cleaned.slice(0, 3)} ${cleaned.slice(3)}` : raw.toUpperCase().trim();

  if (!isValidFormat) {
    return { isValidFormat: false, normalized, inServiceZone: false };
  }

  const fsa3 = cleaned.slice(0, 3);
  const fsa2 = cleaned.slice(0, 2);

  const inServiceZone = VALID_POSTAL_PREFIXES.some(
    (prefix) => (prefix.length === 3 ? fsa3 === prefix : fsa2 === prefix)
  );

  let matchedRegion: RegionId | undefined;
  for (const region of REGIONS_CONFIG) {
    const match = region.cities.some((c) =>
      c.postalPrefixes.some((p) => (p.length === 3 ? fsa3 === p : fsa2 === p))
    );
    if (match) {
      matchedRegion = region.id;
      break;
    }
  }

  return { isValidFormat, normalized, inServiceZone, matchedRegion };
}
