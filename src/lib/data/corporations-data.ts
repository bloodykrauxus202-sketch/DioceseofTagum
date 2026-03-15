export interface Corporation {
  id: number;
  name: string;
  abbreviation: string;
  image: string | null;
  location: string;
  coordinates?: { lat: number; lng: number } | null;
  contact: string;
  foundingAnniversary: string;
  patron: string;
  mission: string;
  website: string | null;
  photos: string;
  history: string;
  color: string;
  iconType: 'landmark' | 'printer' | 'building' | 'stethoscope' | 'briefcase' | 'heart' | 'cross';
}

export const corporationsData: Corporation[] = [
  {
    id: 1,
    name: 'Christus Imperat Corporation',
    abbreviation: 'CIC',
    image: null,
    location: 'Chancery Office, Rizal St., 8100 Tagum City',
    coordinates: { lat: 7.4478, lng: 125.8078 },
    contact: 'Internal (Operates via Chancery)',
    foundingAnniversary: 'Not publicly listed (Internal Holding)',
    patron: 'Christ the King ("Christ Commands")',
    mission: 'Corporate vehicle for managing diocesan assets and restricted funds securely under the Solidaritas Fund.',
    website: null,
    photos: 'No public photos available (Internal Office)',
    history: 'Forms a critical part of a sophisticated triad of asset management corporations. Documented in the Revised Instrumentum Laboris, it functions as a financial conduit within the "Solidaritas Fund," holding specialized accounts and receiving loan guarantees authorized by the Bishop.',
    color: '#1e3a8a',
    iconType: 'landmark',
  },
  {
    id: 2,
    name: 'DPPPI (Diocesan Printing Press)',
    abbreviation: 'DPPPI',
    image: null,
    location: 'Chancery Office Compound, Rizal St., 8100 Tagum City',
    coordinates: { lat: 7.4480, lng: 125.8080 },
    contact: '(084) 655-6499',
    foundingAnniversary: 'Originally founded pre-1994; Revitalized post-2018',
    patron: 'Christ the King (Implicit)',
    mission: '"Evangelizing through Excellence in Print and Service." Serves as a socially responsible apostolate bridging business professionalism with ecclesial mission.',
    website: 'dpppi.net',
    photos: 'Available in Davao Catholic Herald archives',
    history: 'Originally conceived by Bishop Joseph William Regan to subsidize the Queen of Apostles College Seminary. Recently revitalized by Bishop Medil S. Aseo into a fully incorporated business entity that competes in the commercial printing sector to generate sustainable revenue.',
    color: '#4338ca',
    iconType: 'printer',
  },
  {
    id: 3,
    name: 'Rex Faber Corporation',
    abbreviation: 'RFC',
    image: null,
    location: 'Chancery Office (Internal), Tagum City',
    coordinates: { lat: 7.4476, lng: 125.8076 },
    contact: 'Internal (Operates via Chancery)',
    foundingAnniversary: 'Not publicly listed',
    patron: 'Christ the King ("King the Builder")',
    mission: 'Manages real estate development, property holdings, and construction logistics for the Diocese.',
    website: null,
    photos: 'No public photos available',
    history: 'A critical structural component of the financial firewall constructed by the Diocese. It is listed alongside Rex Mercator and Christus Imperat as entities whose loans are guaranteed by the Bishop, managing extensive land grants and DOTES educational facility construction.',
    color: '#4b5563',
    iconType: 'building',
  },
  {
    id: 4,
    name: 'Rex Medicus Corporation',
    abbreviation: 'RMC',
    image: null,
    location: 'Christ the King Road, Magugpo East, Tagum City',
    coordinates: { lat: 7.4352, lng: 125.8121 },
    contact: '0981-167-7839 / 0930-623-3975',
    foundingAnniversary: 'Modern corporate management established post-2018',
    patron: 'Christ the King ("King the Physician")',
    mission: 'To provide specialized medical services, specifically operating advanced hemodialysis clinics and related diagnostic centers.',
    website: 'ctksh.rexmedicuscorp@gmail.com',
    photos: 'Shared with Christ the King Specialists Hospital',
    history: "Represents the diocese's modern corporate strategy for healthcare. While the hospital provides holistic care, Rex Medicus is the legal corporate entity managing high-liability services like dialysis, maintaining direct accreditations with PCSO and PhilHealth.",
    color: '#dc2626',
    iconType: 'stethoscope',
  },
  {
    id: 5,
    name: 'Rex Mercator Corporation',
    abbreviation: 'RMeC',
    image: null,
    location: 'Chancery Office (Internal), Tagum City',
    coordinates: { lat: 7.4474, lng: 125.8074 },
    contact: 'Internal (Operates via Chancery)',
    foundingAnniversary: 'Not publicly listed',
    patron: 'Christ the King ("King the Merchant")',
    mission: 'Oversees commercial, retail, or leasing operations to generate independent diocesan revenue.',
    website: null,
    photos: 'No public photos available',
    history: 'The final pillar of the financial back-end. Designed to rigidly separate retail and leasing revenue streams from pastoral tithes, ensuring tax compliance and transparent accounting within the Solidaritas ecosystem.',
    color: '#059669',
    iconType: 'briefcase',
  },
  {
    id: 6,
    name: 'Spes Pauperum Foundation',
    abbreviation: 'SPF',
    image: null,
    location: '3/F DCT-MPC Bldg. Rizal St. Tagum City',
    coordinates: { lat: 7.4468, lng: 125.8068 },
    contact: '(084) 216-2199',
    foundingAnniversary: 'July 1998 (25th Anniversary celebrated July 2023)',
    patron: 'Holy Family / Christ the King (Preferential Option for the Poor)',
    mission: 'Alleviation of severe poverty through the "Bangko sa Kabus" microfinance community development project.',
    website: 'spespauperum.com',
    photos: 'Available in MUST Academe reports',
    history: "The crown jewel of the Diocese's social action. It localized global microfinance models to fit the Mindanao GKK structure. Recently celebrated its 25th anniversary and was specifically inspected by the Papal Nuncio in 2024 as a model of charity.",
    color: '#ea580c',
    iconType: 'heart',
  },
  {
    id: 7,
    name: 'Christ the King Specialists Hospital',
    abbreviation: 'CTKSH',
    image: null,
    location: 'Christ the King Road, Magugpo East, Tagum City',
    coordinates: { lat: 7.4350, lng: 125.8119 },
    contact: '0981-167-7839',
    foundingAnniversary: 'Founded mid-20th century; Upgraded post-2018',
    patron: 'Christ the King',
    mission: 'To serve as the premier diocesan healthcare facility, providing advanced Level 2 hospital services to the DADITAMA region.',
    website: null,
    photos: 'Photos available from Papal Nuncio visit (April 2024)',
    history: "Originally Bishop Regan Memorial Hospital. Revitalized and renamed by Bishop Aseo to align with the diocesan patron. It now houses the Rex Medicus dialysis centers and serves as the central hub for diocesan health apostolates.",
    color: '#0d9488',
    iconType: 'cross',
  },
];

export function getCorporationById(id: string | number): Corporation | undefined {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return corporationsData.find((c) => c.id === numId);
}
