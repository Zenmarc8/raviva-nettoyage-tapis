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
      fr: 'Service direct par le propriétaire-opérateur dans l’ensemble des 33 arrondissements et villes liées de l’Île de Montréal.',
      en: 'Direct owner-operator mobile service across all 33 boroughs and municipalities on the Island of Montreal.',
    },
    cities: [
      { slug: 'ahuntsic-cartierville', name: 'Ahuntsic-Cartierville', regionId: 'montreal', postalPrefixes: ['H2M', 'H2N', 'H3L', 'H4J', 'H4K'] },
      { slug: 'anjou', name: 'Anjou', regionId: 'montreal', postalPrefixes: ['H1J', 'H1K'] },
      { slug: 'baie-durfe', name: 'Baie-D’Urfé', regionId: 'montreal', postalPrefixes: ['H9X'] },
      { slug: 'beaconsfield', name: 'Beaconsfield', regionId: 'montreal', postalPrefixes: ['H9W'] },
      { slug: 'cote-des-neiges-ndg', name: 'Côte-des-Neiges–Notre-Dame-de-Grâce', regionId: 'montreal', postalPrefixes: ['H3S', 'H3T', 'H3V', 'H4A', 'H4B'] },
      { slug: 'cote-saint-luc', name: 'Côte-Saint-Luc', regionId: 'montreal', postalPrefixes: ['H4V', 'H4W'] },
      { slug: 'dollard-des-ormeaux', name: 'Dollard-Des Ormeaux', regionId: 'montreal', postalPrefixes: ['H9A', 'H9B', 'H9G'] },
      { slug: 'dorval', name: 'Dorval', regionId: 'montreal', postalPrefixes: ['H9P', 'H9S'] },
      { slug: 'hampstead', name: 'Hampstead', regionId: 'montreal', postalPrefixes: ['H3X'] },
      { slug: 'kirkland', name: 'Kirkland', regionId: 'montreal', postalPrefixes: ['H9H', 'H9J'] },
      { slug: 'lachine', name: 'Lachine', regionId: 'montreal', postalPrefixes: ['H8S', 'H8T'] },
      { slug: 'lasalle', name: 'LaSalle', regionId: 'montreal', postalPrefixes: ['H8N', 'H8P', 'H8R'] },
      { slug: 'plateau-mont-royal', name: 'Le Plateau-Mont-Royal', regionId: 'montreal', postalPrefixes: ['H2H', 'H2J', 'H2T', 'H2W'] },
      { slug: 'le-sud-ouest', name: 'Le Sud-Ouest (Griffintown & Saint-Henri)', regionId: 'montreal', postalPrefixes: ['H3C', 'H3J', 'H3K', 'H4C', 'H4E'] },
      { slug: 'ile-bizard-sainte-genevieve', name: 'L’Île-Bizard–Sainte-Geneviève', regionId: 'montreal', postalPrefixes: ['H9C', 'H9E'] },
      { slug: 'mercier-hochelaga-maisonneuve', name: 'Mercier–Hochelaga-Maisonneuve', regionId: 'montreal', postalPrefixes: ['H1K', 'H1L', 'H1M', 'H1N', 'H1V', 'H1W'] },
      { slug: 'mont-royal', name: 'Mont-Royal (Ville Mont-Royal)', regionId: 'montreal', postalPrefixes: ['H3P', 'H3R', 'H4P'] },
      { slug: 'montreal-est', name: 'Montréal-Est', regionId: 'montreal', postalPrefixes: ['H1B'] },
      { slug: 'montreal-nord', name: 'Montréal-Nord', regionId: 'montreal', postalPrefixes: ['H1G', 'H1H'] },
      { slug: 'montreal-ouest', name: 'Montréal-Ouest', regionId: 'montreal', postalPrefixes: ['H4X'] },
      { slug: 'outremont', name: 'Outremont', regionId: 'montreal', postalPrefixes: ['H2V'] },
      { slug: 'pierrefonds-roxboro', name: 'Pierrefonds-Roxboro', regionId: 'montreal', postalPrefixes: ['H8Y', 'H8Z', 'H9A', 'H9H'] },
      { slug: 'pointe-claire', name: 'Pointe-Claire', regionId: 'montreal', postalPrefixes: ['H9R', 'H9S'] },
      { slug: 'rdp-pat', name: 'Rivière-des-Prairies–Pointe-aux-Trembles', regionId: 'montreal', postalPrefixes: ['H1A', 'H1B', 'H1C', 'H1E'] },
      { slug: 'rosemont-petite-patrie', name: 'Rosemont–La Petite-Patrie', regionId: 'montreal', postalPrefixes: ['H1T', 'H1X', 'H1Y', 'H2G', 'H2S'] },
      { slug: 'saint-laurent', name: 'Saint-Laurent', regionId: 'montreal', postalPrefixes: ['H4L', 'H4M', 'H4N', 'H4R', 'H4S', 'H4T'] },
      { slug: 'saint-leonard', name: 'Saint-Léonard', regionId: 'montreal', postalPrefixes: ['H1P', 'H1R', 'H1S'] },
      { slug: 'sainte-anne-de-bellevue', name: 'Sainte-Anne-de-Bellevue', regionId: 'montreal', postalPrefixes: ['H9X'] },
      { slug: 'senneville', name: 'Senneville', regionId: 'montreal', postalPrefixes: ['H9X'] },
      { slug: 'verdun', name: 'Verdun & Île-des-Sœurs', regionId: 'montreal', postalPrefixes: ['H3E', 'H4G', 'H4H'] },
      { slug: 'ville-marie', name: 'Ville-Marie (Centre-ville)', regionId: 'montreal', postalPrefixes: ['H2K', 'H2L', 'H2X', 'H2Y', 'H2Z', 'H3A', 'H3B', 'H3G', 'H3H'] },
      { slug: 'villeray-saint-michel', name: 'Villeray–Saint-Michel–Parc-Extension', regionId: 'montreal', postalPrefixes: ['H1Z', 'H2A', 'H2E', 'H2P', 'H2R', 'H3N'] },
      { slug: 'westmount', name: 'Westmount', regionId: 'montreal', postalPrefixes: ['H3Y', 'H3Z'] },
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
      fr: 'Service résidentiel et commercial direct sur l’ensemble de l’Île Jésus, sans frais de déplacement additionnels.',
      en: 'Direct residential and commercial service across Laval with zero travel surcharge.',
    },
    cities: [
      { slug: 'chomedey', name: 'Chomedey', regionId: 'laval', postalPrefixes: ['H7S', 'H7T', 'H7V', 'H7W'] },
      { slug: 'duvernay-saint-francois', name: 'Duvernay & Saint-François', regionId: 'laval', postalPrefixes: ['H7A', 'H7B', 'H7E'] },
      { slug: 'laval-des-rapides', name: 'Laval-des-Rapides & Pont-Viau', regionId: 'laval', postalPrefixes: ['H7G', 'H7N'] },
      { slug: 'laval-ouest-fabreville', name: 'Laval-Ouest & Fabreville', regionId: 'laval', postalPrefixes: ['H7P', 'H7R'] },
      { slug: 'sainte-dorothee', name: 'Sainte-Dorothée & Laval-sur-le-Lac', regionId: 'laval', postalPrefixes: ['H7X', 'H7Y'] },
      { slug: 'sainte-rose', name: 'Sainte-Rose', regionId: 'laval', postalPrefixes: ['H7L'] },
      { slug: 'vimont-auteuil', name: 'Vimont & Auteuil', regionId: 'laval', postalPrefixes: ['H7H', 'H7K', 'H7M'] },
    ],
  },
  {
    id: 'rive-sud',
    slug: 'rive-sud-montreal',
    name: {
      fr: 'Rive-Sud & Montérégie',
      en: 'South Shore & Montérégie',
    },
    description: {
      fr: 'Couverture complète sur la Rive-Sud pour maisons unifamiliales, condos, immeubles et bureaux commerciaux.',
      en: 'Complete South Shore coverage for homes, condos, apartment buildings, and commercial offices.',
    },
    cities: [
      { slug: 'beloeil', name: 'Belœil', regionId: 'rive-sud', postalPrefixes: ['J3G'] },
      { slug: 'boucherville', name: 'Boucherville', regionId: 'rive-sud', postalPrefixes: ['J4B'] },
      { slug: 'brossard', name: 'Brossard', regionId: 'rive-sud', postalPrefixes: ['J4W', 'J4X', 'J4Y', 'J4Z'] },
      { slug: 'candiac', name: 'Candiac', regionId: 'rive-sud', postalPrefixes: ['J5R'] },
      { slug: 'carignan', name: 'Carignan', regionId: 'rive-sud', postalPrefixes: ['J3L'] },
      { slug: 'chambly', name: 'Chambly', regionId: 'rive-sud', postalPrefixes: ['J3L'] },
      { slug: 'chateauguay', name: 'Châteauguay', regionId: 'rive-sud', postalPrefixes: ['J6J', 'J6K'] },
      { slug: 'delson', name: 'Delson', regionId: 'rive-sud', postalPrefixes: ['J5B'] },
      { slug: 'greenfield-park', name: 'Greenfield Park', regionId: 'rive-sud', postalPrefixes: ['J4V'] },
      { slug: 'la-prairie', name: 'La Prairie', regionId: 'rive-sud', postalPrefixes: ['J5R'] },
      { slug: 'longueuil', name: 'Longueuil', regionId: 'rive-sud', postalPrefixes: ['J4G', 'J4H', 'J4J', 'J4K', 'J4L', 'J4M', 'J4N'] },
      { slug: 'mcmasterville', name: 'McMasterville', regionId: 'rive-sud', postalPrefixes: ['J3G'] },
      { slug: 'mont-saint-hilaire', name: 'Mont-Saint-Hilaire', regionId: 'rive-sud', postalPrefixes: ['J3H'] },
      { slug: 'otterburn-park', name: 'Otterburn Park', regionId: 'rive-sud', postalPrefixes: ['J3H'] },
      { slug: 'saint-basile-le-grand', name: 'Saint-Basile-le-Grand', regionId: 'rive-sud', postalPrefixes: ['J3N'] },
      { slug: 'saint-bruno-de-montarville', name: 'Saint-Bruno-de-Montarville', regionId: 'rive-sud', postalPrefixes: ['J3V'] },
      { slug: 'saint-constant', name: 'Saint-Constant', regionId: 'rive-sud', postalPrefixes: ['J5A'] },
      { slug: 'saint-hubert', name: 'Saint-Hubert', regionId: 'rive-sud', postalPrefixes: ['J3Y', 'J3Z'] },
      { slug: 'saint-lambert', name: 'Saint-Lambert', regionId: 'rive-sud', postalPrefixes: ['J4P', 'J4R', 'J4S'] },
      { slug: 'sainte-catherine', name: 'Sainte-Catherine', regionId: 'rive-sud', postalPrefixes: ['J5C'] },
    ],
  },
  {
    id: 'rive-nord',
    slug: 'rive-nord-couronne',
    name: {
      fr: 'Couronne Nord & Ouest',
      en: 'North Shore & Vaudreuil',
    },
    description: {
      fr: 'Déplacements directs dans les municipalités de la Couronne Nord et de Vaudreuil-Soulanges.',
      en: 'Direct owner-operator visits throughout North Shore and Vaudreuil-Soulanges municipalities.',
    },
    cities: [
      { slug: 'blainville', name: 'Blainville', regionId: 'rive-nord', postalPrefixes: ['J7C'] },
      { slug: 'bois-des-filion', name: 'Bois-des-Filion', regionId: 'rive-nord', postalPrefixes: ['J6Z'] },
      { slug: 'boisbriand', name: 'Boisbriand', regionId: 'rive-nord', postalPrefixes: ['J7G', 'J7H'] },
      { slug: 'charlemagne', name: 'Charlemagne', regionId: 'rive-nord', postalPrefixes: ['J5Z'] },
      { slug: 'deux-montagnes', name: 'Deux-Montagnes', regionId: 'rive-nord', postalPrefixes: ['J7R'] },
      { slug: 'lassomption', name: 'L’Assomption', regionId: 'rive-nord', postalPrefixes: ['J5W'] },
      { slug: 'lorraine', name: 'Lorraine', regionId: 'rive-nord', postalPrefixes: ['J6Z'] },
      { slug: 'mascouche', name: 'Mascouche', regionId: 'rive-nord', postalPrefixes: ['J7K', 'J7L'] },
      { slug: 'repentigny', name: 'Repentigny', regionId: 'rive-nord', postalPrefixes: ['J5Y', 'J5Z', 'J6A'] },
      { slug: 'rosemere', name: 'Rosemère', regionId: 'rive-nord', postalPrefixes: ['J7A'] },
      { slug: 'saint-eustache', name: 'Saint-Eustache', regionId: 'rive-nord', postalPrefixes: ['J7P', 'J7R'] },
      { slug: 'saint-lazare', name: 'Saint-Lazare', regionId: 'rive-nord', postalPrefixes: ['J7T'] },
      { slug: 'sainte-therese', name: 'Sainte-Thérèse', regionId: 'rive-nord', postalPrefixes: ['J7E'] },
      { slug: 'terrebonne', name: 'Terrebonne', regionId: 'rive-nord', postalPrefixes: ['J6V', 'J6W', 'J6X', 'J6Y'] },
      { slug: 'vaudreuil-dorion', name: 'Vaudreuil-Dorion', regionId: 'rive-nord', postalPrefixes: ['J7V'] },
    ],
  },
];

export const ALL_CITIES: CityLocation[] = REGIONS_CONFIG.flatMap((r) => r.cities);

export const VALID_POSTAL_PREFIXES: string[] = [
  'H1', 'H2', 'H3', 'H4', 'H5', 'H7', 'H8', 'H9',
  'J3G', 'J3H', 'J3L', 'J3N', 'J3V', 'J3Y', 'J3Z',
  'J4', 'J5A', 'J5B', 'J5C', 'J5R', 'J5W', 'J5Y', 'J5Z',
  'J6A', 'J6J', 'J6K', 'J6V', 'J6W', 'J6X', 'J6Y', 'J6Z',
  'J7A', 'J7C', 'J7E', 'J7G', 'J7H', 'J7K', 'J7L', 'J7P', 'J7R', 'J7T', 'J7V',
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
