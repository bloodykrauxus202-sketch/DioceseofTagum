// BEC/GKK Data for Diocese of Tagum

export interface GKK {
  name: string;
  location: string;
  district: string;
}

export interface BECParish {
  id: string;
  name: string;
  location: string;
  gkks: GKK[];
}

// All parishes for BEC directory
export const becParishes: BECParish[] = [
  { id: "bec-1", name: "Birhen sa Kasilak Parish", location: "Madaum, Tagum City", gkks: [] },
  { id: "bec-2", name: "Birhen sa Sto. Rosario Parish", location: "Mapawa, Maragusan, Davao de Oro", gkks: [] },
  { id: "bec-3", name: "Christ the King Cathedral Parish", location: "Don Juan Gonzales Ave., Tagum City", gkks: [] },
  { id: "bec-4", name: "Diocesan Shrine of Our Lady of Mother Perpetual Help Parish", location: "Maco, Davao de Oro", gkks: [] },
  { id: "bec-5", name: "Holy Family Parish", location: "Laak, Davao de Oro", gkks: [] },
  { id: "bec-6", name: "Immaculate Conception Quasi Parish", location: "Seminary Drive, Magugpo West, Tagum City", gkks: [] },
  { id: "bec-7", name: "Immaculate Conception Quasi Parish", location: "Elizalde, Maco, Davao de Oro", gkks: [] },
  { id: "bec-8", name: "Inahan sa Kanunay'ng Panabang Parish", location: "Suaybaguio, Tagum City", gkks: [] },
  { id: "bec-9", name: "Inahan sa Kanunay'ng Panabang Parish", location: "Bantacan, New Bataan, Davao de Oro", gkks: [] },
  { id: "bec-10", name: "Mary Mediatrix of All Grace Quasi Parish", location: "Pagakpak, Pantukan, Davao de Oro", gkks: [] },
  { id: "bec-11", name: "Mary Mediatrix of All Grace Quasi Parish", location: "New Visayas, Panabo City", gkks: [] },
  {
    id: "bec-12",
    name: "Nuestra Señora del Pilar Quasi Parish",
    location: "Babag, Monkayo, Davao de Oro",
    gkks: [
      { name: "San Roque GKK", location: "Purok 1 Naboc | Purok 1, Naboc, Monkayo, Davao de Oro", district: "Bethania District" },
      { name: "San Isidro Labrador GKK", location: "Farm 7 | Purok 7, Naboc, Monkayo, Davao de Oro", district: "Bethania District" },
      { name: "Christ the King GKK", location: "Catian | Purok 4, Naboc, Monkayo, Davao de Oro", district: "Bethania District" },
      { name: "Saint Jude of Thaddeus GKK", location: "Purok 6 Naboc | Purok 6, Naboc, Monkayo, Davao de Oro", district: "Bethania District" },
      { name: "San Miguel the Archangel GKK", location: "Bliss | Purok 3, Macopa, Monkayo, Davao de Oro", district: "Bethlehem District" },
      { name: "Saint Joseph - The Husband of Mary GKK", location: "Macopa | Purok 1B, Macopa, Monkayo, Davao de Oro", district: "Bethlehem District" },
      { name: "San Vicente Ferrer GKK", location: "Upper Tandawan | Purok 4A, Macopa, Monkayo, Davao de Oro", district: "Bethlehem District" },
      { name: "San Roque GKK", location: "Tandawan | Purok 6, Macopa, Monkayo, Davao de Oro", district: "Bethlehem District" },
      { name: "Birhen sa Pilar GKK", location: "Pilar | Purok 8, Babag, Monkayo, Davao de Oro", district: "Bethsaida District" },
      { name: "San Vicente Ferrer GKK", location: "Mamacao | Purok 7, Mangayon, Monkayo, Davao de Oro", district: "Bethsaida District" },
      { name: "Immaculate Conception GKK", location: "Nassa | Purok 9, Babag, Monkayo, Davao de Oro", district: "Bethsaida District" },
      { name: "San Isidro Labrador GKK", location: "Lagab | Purok 6, Mamunga, Monkayo, Davao de Oro", district: "Emmaus District" },
      { name: "San Vicente Ferrer GKK", location: "Purok 1 Inambatan | Purok 1, Inambatan, Monkayo, Davao de Oro", district: "Emmaus District" },
      { name: "San Roque GKK", location: "Purok 2 Inambatan | Purok 2, Inambatan, Monkayo, Davao de Oro", district: "Emmaus District" },
      { name: "Saint Joseph - The Husband of Mary GKK", location: "Tubo-Tubo | Purok 1, Tubo-Tubo, Monkayo, Davao de Oro", district: "Jericho District" },
      { name: "San Vicente Ferrer GKK", location: "Sarphil | Purok 8, Tubo-Tubo, Monkayo, Davao de Oro", district: "Jericho District" },
      { name: "San Roque GKK", location: "Candalid 1 | Purok 3, Tubo-Tubo, Monkayo, Davao de Oro", district: "Jericho District" },
      { name: "San Roque GKK", location: "Candalid 2 | Purok 2, Tubo-Tubo, Monkayo, Davao de Oro", district: "Jericho District" },
      { name: "Birhen sa Fatima GKK", location: "Purok 3 Babag | Purok 3, Babag, Monkayo, Davao de Oro", district: "Jerusalem District" },
      { name: "Santo Niño GKK", location: "Purok 2 Babag | Purok 2, Babag, Monkayo, Davao de Oro", district: "Jerusalem District" },
      { name: "Immaculate Conception GKK", location: "Purok 4 Babag | Purok 4, Babag, Monkayo, Davao de Oro", district: "Jerusalem District" },
      { name: "San Vicente Ferrer GKK", location: "Purok 3 Naboc | Purok 3, Naboc, Monkayo, Davao de Oro", district: "Jerusalem District" },
      { name: "San Vicente Ferrer GKK", location: "Pilian | Purok 4, Tubo-Tubo, Monkayo, Davao de Oro", district: "Peraea District" },
      { name: "San Francisco Xavier GKK", location: "Mamunga | Purok 1, Mamunga, Monkayo, Davao de Oro", district: "Peraea District" },
      { name: "Santo Niño GKK", location: "Mambugawon | Purok 5, Mamunga, Monkayo, Davao de Oro", district: "Peraea District" },
      { name: "Birhen sa Kasilak GKK", location: "Magmon | Purok 11, Babag, Monkayo, Davao de Oro", district: "Peraea District" },
    ]
  },
  { id: "bec-13", name: "Nuestra Señora dela Candelaria Parish", location: "Kimamon, Sto. Tomas, Davao del Norte", gkks: [] },
  { id: "bec-14", name: "Nuestra Señora dela Salvacion Quasi Parish", location: "La Libertad, Sto. Tomas, Davao del Norte", gkks: [] },
  { id: "bec-15", name: "Nuestra Señora la Virgen dela Asuncion Quasi Parish", location: "Limbaan, New Corella, Davao del Norte", gkks: [] },
  { id: "bec-16", name: "Our Lady of Assumption Parish", location: "Merville Subd., Tagum City", gkks: [] },
  { id: "bec-17", name: "Our Lady of Fatima Parish", location: "3rd Ave., Teachers Village, Tagum City", gkks: [] },
  { id: "bec-18", name: "Our Lady of Mount Carmel Parish", location: "Carmen, Davao del Norte", gkks: [] },
  { id: "bec-19", name: "Our Lady of the Assumption Parish", location: "Asuncion, Davao del Norte", gkks: [] },
  { id: "bec-20", name: "Parish of Christ the Eucharistic King", location: "Rizal St., Tagum City", gkks: [] },
  { id: "bec-21", name: "Sacred Heart of Jesus Quasi Parish", location: "Apokon Highway, Tagum City", gkks: [] },
  { id: "bec-22", name: "Sagrado Corazon de Jesus Nazareno Parish", location: "Bermudez Compound, Apokon, Tagum City", gkks: [] },
  { id: "bec-23", name: "San Agustin Parish", location: "Cagangohan, Panabo City", gkks: [] },
  { id: "bec-24", name: "San Agustin Quasi Parish", location: "Kapatagan, Laak, Davao de Oro", gkks: [] },
  { id: "bec-25", name: "San Antonio de Padua Chapel Parish", location: "Fuentes, Pantukan, Davao de Oro", gkks: [] },
  { id: "bec-26", name: "San Antonio de Padua Chaplaincy", location: "B.O. A.O. Floirendo, Panabo City", gkks: [] },
  { id: "bec-27", name: "San Antonio de Padua Parish", location: "New Bataan, Davao de Oro", gkks: [] },
  { id: "bec-28", name: "San Francisco Javier Quasi Parish", location: "Gabi, Compostela, Davao de Oro", gkks: [] },
  { id: "bec-29", name: "San Ignacio de Loyola Parish", location: "Monkayo, Davao de Oro", gkks: [] },
  { id: "bec-30", name: "San Isidro Labrador Parish", location: "New Corella, Davao del Norte", gkks: [] },
  { id: "bec-31", name: "San Isidro Labrador Parish", location: "Manay, Panabo City", gkks: [] },
  { id: "bec-32", name: "San Isidro Labrador Parish", location: "Camanlangan, New Bataan, Davao de Oro", gkks: [] },
  { id: "bec-33", name: "San Isidro Labrador Parish", location: "Maniki, Kapalong, Davao del Norte", gkks: [] },
  { id: "bec-34", name: "San Isidro Labrador Parish", location: "Aguinaldo, Laak, Davao de Oro", gkks: [] },
  { id: "bec-35", name: "San Isidro Labrador Parish", location: "Sawata, Laak, Davao de Oro", gkks: [] },
  { id: "bec-36", name: "San Isidro Labrador Quasi Parish", location: "Union, Monkayo, Davao de Oro", gkks: [] },
  { id: "bec-37", name: "San Jose Parish", location: "Pantukan, Davao de Oro", gkks: [] },
  { id: "bec-38", name: "San Jose Parish", location: "Gamao, Panabo City", gkks: [] },
  { id: "bec-39", name: "San Jose Parish", location: "Dujali, Davao del Norte", gkks: [] },
  { id: "bec-40", name: "San Jose Parish", location: "Montevista, Davao de Oro", gkks: [] },
  { id: "bec-41", name: "San Miguel Parish", location: "Sto. Tomas, Davao del Norte", gkks: [] },
  { id: "bec-42", name: "San Pedro Parish", location: "San Vicente, Panabo City", gkks: [] },
  { id: "bec-43", name: "San Roque Parish", location: "Mawab, Davao de Oro", gkks: [] },
  { id: "bec-44", name: "San Vicente Ferrer Parish", location: "Maragusan, Davao de Oro", gkks: [] },
  { id: "bec-45", name: "San Vicente Ferrer Quasi Parish", location: "Manat, Nabunturan, Davao de Oro", gkks: [] },
  { id: "bec-46", name: "San Vicente Ferrer Quasi Parish", location: "Pasian, Monkayo, Davao de Oro", gkks: [] },
  { id: "bec-47", name: "Señor Santiago Apostol Parish", location: "Compostela, Davao de Oro", gkks: [] },
  { id: "bec-48", name: "St. Michael the Archangel Quasi Parish", location: "La Filipina, Tagum City", gkks: [] },
  { id: "bec-49", name: "Sta. Faustina Quasi Parish", location: "Alejal, Carmen, Davao del Norte", gkks: [] },
  { id: "bec-50", name: "Sta. Teresita of Avila Chapel", location: "Capungagan, Kapalong, Davao del Norte", gkks: [] },
  { id: "bec-51", name: "Sta. Teresita Parish", location: "Nabunturan, Davao de Oro", gkks: [] },
  { id: "bec-52", name: "Sto. Niño Chapel", location: "Melale, Laak, Davao de Oro", gkks: [] },
  { id: "bec-53", name: "Sto. Niño Chaplaincy", location: "Penal Colony, Panabo City", gkks: [] },
  { id: "bec-54", name: "Sto. Niño Parish", location: "Mabini, Davao de Oro", gkks: [] },
  { id: "bec-55", name: "Sto. Niño Parish", location: "Talaingod, Davao del Norte", gkks: [] },
  { id: "bec-56", name: "Sto. Niño Parish", location: "Panabo City", gkks: [] },
  { id: "bec-57", name: "Sto. Niño Quasi Parish", location: "Antiquera, Nabunturan, Davao de Oro", gkks: [] },
];

// Get BEC parish by ID
export function getBECParishById(id: string): BECParish | undefined {
  return becParishes.find(p => p.id === id);
}

// Search BEC parishes
export function searchBECParishes(query: string): BECParish[] {
  const q = query.toLowerCase().trim();
  if (!q) return becParishes;

  return becParishes.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.location.toLowerCase().includes(q)
  );
}
