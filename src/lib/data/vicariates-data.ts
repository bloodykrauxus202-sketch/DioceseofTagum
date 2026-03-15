// Vicariates Data for Diocese of Tagum

export interface VicariateParish {
  name: string;
  location: string;
  priest: string;
  fiesta: string;
  lat?: number;
  lon?: number;
}

export interface Vicariate {
  id: number;
  name: string;
  shortName: string;
  vicarForane: string;
  parishes: VicariateParish[];
  history: string;
  lat: number;
  lon: number;
}

export const vicariatesData: Vicariate[] = [
  {
    id: 1,
    name: "Christ the King Vicariate",
    shortName: "Christ the King",
    vicarForane: "Rev. Fr. Joseph D. Armamento",
    lat: 7.5570,
    lon: 125.8000,
    parishes: [
      { name: "Birhen sa Kasilak Parish", location: "Madaum, Tagum City", priest: "Rev. Fr. Emmanuel U. Emata", fiesta: "September 8 – Nativity of the Blessed Virgin Mary", lat: 7.5220, lon: 125.7870 },
      { name: "Christ the King Cathedral Parish", location: "Don Juan Gonzales Ave., Tagum City", priest: "Rev. Fr. Joseph D. Armamento", fiesta: "Last Sunday of November – Solemnity of Christ the King", lat: 7.5451, lon: 125.8095 },
      { name: "Parish of Christ the Eucharistic King", location: "Rizal St., Tagum City", priest: "Msgr. Federico M. Mantica", fiesta: "Corpus Christi Sunday (June)", lat: 7.5505, lon: 125.8130 },
      { name: "Sacred Heart of Jesus Quasi Parish", location: "Apokon Highway, Tagum City", priest: "Rev. Fr. John Kristoffer Nalam", fiesta: "Friday after Corpus Christi – Solemnity of the Sacred Heart", lat: 7.5390, lon: 125.8230 },
      { name: "Sagrado Corazon de Jesus Nazareno Parish", location: "Bermudez Compound, Apokon, Tagum City", priest: "Rev. Fr. Jojit M. Besinga", fiesta: "Friday after Corpus Christi – Solemnity of the Sacred Heart", lat: 7.5330, lon: 125.8310 }
    ],
    history: "Christ the King Vicariate serves as one of the central vicariates of the diocese, anchored by the Christ the King Cathedral. It has been instrumental in fostering spiritual growth and community development in Tagum City."
  },
  {
    id: 2,
    name: "Our Lady of Fatima Vicariate",
    shortName: "Our Lady of Fatima",
    vicarForane: "Rev. Fr. Rosil D. Naparan",
    lat: 7.5720,
    lon: 125.7900,
    parishes: [
      { name: "Immaculate Conception Quasi Parish", location: "Seminary Drive, Magugpo West, Tagum City", priest: "Rev. Fr. Vicente L. Arado Jr.", fiesta: "December 8 – Solemnity of the Immaculate Conception", lat: 7.5630, lon: 125.7980 },
      { name: "Inahan sa Kanunay'ng Panabang Parish", location: "Suaybaguio, Tagum City", priest: "Rev. Fr. Romeo I. Castillo", fiesta: "Patronal feast day (local schedule)", lat: 7.5710, lon: 125.8180 },
      { name: "Nuestra Señora la Virgen dela Asuncion Quasi Parish", location: "Limbaan, New Corella, Davao del Norte", priest: "Rev. Fr. Ver Anthony C. Abucay", fiesta: "Patronal feast day (local schedule)", lat: 7.5930, lon: 125.8450 },
      { name: "Our Lady of Assumption Parish", location: "Merville Subd., Tagum City", priest: "Rev. Fr. Antonio G. Llanes", fiesta: "August 15 – Solemnity of the Assumption", lat: 7.5570, lon: 125.8050 },
      { name: "Our Lady of Fatima Parish", location: "3rd Ave., Teachers Village, Tagum City", priest: "Rev. Fr. Rosil D. Naparan", fiesta: "May 13 – Our Lady of Fatima", lat: 7.5540, lon: 125.7950 },
      { name: "San Isidro Labrador Parish", location: "New Corella, Davao del Norte", priest: "Rev. Fr. Warren P. Paramio", fiesta: "May 15 – Feast of San Isidro Labrador", lat: 7.6050, lon: 125.8600 },
      { name: "St. Michael the Archangel Quasi Parish", location: "La Filipina, Tagum City", priest: "Rev. Fr. Carmelito B. Redondo", fiesta: "September 29 – Feast of Sts. Michael, Gabriel and Raphael", lat: 7.5480, lon: 125.7820 }
    ],
    history: "Our Lady of Fatima Vicariate is dedicated to the Blessed Virgin Mary under her title of Our Lady of Fatima. The vicariate has grown to encompass several parishes across Tagum City and New Corella."
  },
  {
    id: 3,
    name: "Our Lady of Mt. Carmel Vicariate",
    shortName: "Our Lady of Mt. Carmel",
    vicarForane: "Rev. Fr. Jack R. Malnegro",
    lat: 7.3900,
    lon: 125.7100,
    parishes: [
      { name: "Our Lady of Mount Carmel Parish", location: "Carmen, Davao del Norte", priest: "Rev. Fr. Jack R. Malnegro", fiesta: "July 16 – Feast of Our Lady of Mount Carmel", lat: 7.4135, lon: 125.6925 },
      { name: "San Antonio de Padua Chaplaincy", location: "B.O. A.O. Floirendo, Panabo City", priest: "Rev. Fr. Jhoniel D. Poliquit", fiesta: "June 13 – Feast of St. Anthony of Padua", lat: 7.3550, lon: 125.7150 },
      { name: "San Isidro Labrador Parish", location: "Manay, Panabo City", priest: "Rev. Fr. Rey D. Ringo", fiesta: "May 15 – Feast of San Isidro Labrador", lat: 7.3080, lon: 125.7280 },
      { name: "Sta. Faustina Quasi Parish", location: "Alejal, Carmen, Davao del Norte", priest: "Rev. Fr. Dande J. Cercado", fiesta: "Patronal feast day (local schedule)", lat: 7.4050, lon: 125.6720 },
      { name: "Sto. Niño Chaplaincy", location: "Penal Colony, Panabo City", priest: "Rev. Fr. Noel A. Gastones", fiesta: "Third Sunday of January – Feast of the Sto. Niño", lat: 7.3350, lon: 125.7050 }
    ],
    history: "Our Lady of Mt. Carmel Vicariate serves the faithful in Carmen and parts of Panabo City, promoting Carmelite spirituality and devotion to Our Lady of Mount Carmel."
  },
  {
    id: 4,
    name: "Sagrada Familia Vicariate",
    shortName: "Sagrada Familia",
    vicarForane: "Rev. Fr. Edwin B. Casa",
    lat: 7.8780,
    lon: 125.9450,
    parishes: [
      { name: "Holy Family Parish", location: "Laak, Davao de Oro", priest: "Rev. Fr. Edwin B. Casa", fiesta: "Sunday within Octave of Christmas – Feast of the Holy Family", lat: 7.8520, lon: 125.9650 },
      { name: "San Agustin Quasi Parish", location: "Kapatagan, Laak, Davao de Oro", priest: "Rev. Fr. Rey M. Aruy", fiesta: "Patronal feast day (local schedule)", lat: 7.8700, lon: 125.9850 },
      { name: "San Isidro Labrador Parish", location: "Aguinaldo, Laak, Davao de Oro", priest: "Rev. Fr. Darius Joseph T. Abuela", fiesta: "May 15 – Feast of San Isidro Labrador", lat: 7.8350, lon: 125.9500 },
      { name: "San Isidro Labrador Parish", location: "Sawata, Laak, Davao de Oro", priest: "Rev. Fr. Rey F. Amora", fiesta: "May 15 – Feast of San Isidro Labrador", lat: 7.8200, lon: 125.9400 },
      { name: "Sto. Niño Chapel", location: "Melale, Laak, Davao de Oro", priest: "Rev. Fr. Roy A. Andoy", fiesta: "Third Sunday of January – Feast of the Sto. Niño", lat: 7.8950, lon: 125.9950 }
    ],
    history: "Sagrada Familia Vicariate is centered in Laak, Davao de Oro, dedicated to the Holy Family. It serves rural communities with a focus on family-centered evangelization."
  },
  {
    id: 5,
    name: "San Ignacio Vicariate",
    shortName: "San Ignacio",
    vicarForane: "Rev. Fr. Joedemar J. Gumban",
    lat: 7.8300,
    lon: 126.0750,
    parishes: [
      { name: "Nuestra Señora del Pilar Quasi Parish", location: "Babag, Monkayo, Davao de Oro", priest: "Rev. Fr. Roel Delos Reyes", fiesta: "October 12 – Our Lady of the Pillar", lat: 7.8150, lon: 126.0250 },
      { name: "San Ignacio de Loyola Parish", location: "Monkayo, Davao de Oro", priest: "Rev. Fr. Joedemar J. Gumban", fiesta: "Patronal feast day (local schedule)", lat: 7.8580, lon: 126.0520 },
      { name: "San Isidro Labrador Quasi Parish", location: "Union, Monkayo, Davao de Oro", priest: "Rev. Fr. Marvin Goles", fiesta: "May 15 – Feast of San Isidro Labrador", lat: 7.8750, lon: 126.0700 },
      { name: "San Vicente Ferrer Quasi Parish", location: "Pasian, Monkayo, Davao de Oro", priest: "Rev. Fr. Jemeuel P. Tadanon", fiesta: "April 5 – Feast of St. Vincent Ferrer", lat: 7.8950, lon: 126.0950 }
    ],
    history: "San Ignacio Vicariate is dedicated to St. Ignatius of Loyola, founder of the Society of Jesus. Based in Monkayo, it promotes Ignatian spirituality and serves the mining communities of the area."
  },
  {
    id: 6,
    name: "San Isidro Vicariate",
    shortName: "San Isidro",
    vicarForane: "Rev. Fr. Joel S. Boco",
    lat: 7.5500,
    lon: 125.7050,
    parishes: [
      { name: "Our Lady of the Assumption Parish", location: "Asuncion, Davao del Norte", priest: "Rev. Fr. Jerson D. Estose", fiesta: "August 15 – Solemnity of the Assumption", lat: 7.5790, lon: 125.7360 },
      { name: "San Isidro Labrador Parish", location: "Maniki, Kapalong, Davao del Norte", priest: "Rev. Fr. Joel S. Boco", fiesta: "May 15 – Feast of San Isidro Labrador", lat: 7.5180, lon: 125.6970 },
      { name: "Sta. Teresita of Avila Chapel", location: "Capungagan, Kapalong, Davao del Norte", priest: "Rev. Fr. Nestor M. Hingco Jr.", fiesta: "October 1 – St. Thérèse of the Child Jesus", lat: 7.5050, lon: 125.6800 },
      { name: "Sto. Niño Parish", location: "Talaingod, Davao del Norte", priest: "Rev. Fr. Nestor C. Bonghanoy", fiesta: "Third Sunday of January – Feast of the Sto. Niño", lat: 7.6550, lon: 125.6400 }
    ],
    history: "San Isidro Vicariate serves the agricultural communities of Kapalong, Asuncion, and Talaingod. Named after San Isidro Labrador, patron of farmers, it supports the spiritual needs of rural families."
  },
  {
    id: 7,
    name: "San Jose Vicariate",
    shortName: "San Jose",
    vicarForane: "Rev. Fr. Themistocles T. Tuyac Jr.",
    lat: 7.6600,
    lon: 125.9550,
    parishes: [
      { name: "Immaculate Conception Quasi Parish", location: "Elizalde, Maco, Davao de Oro", priest: "Rev. Fr. Julius Cesar L. Anas", fiesta: "December 8 – Solemnity of the Immaculate Conception", lat: 7.3620, lon: 125.8580 },
      { name: "San Jose Parish", location: "Montevista, Davao de Oro", priest: "Rev. Fr. Themistocles T. Tuyac Jr.", fiesta: "March 19 – Solemnity of St. Joseph (or May 1 – St. Joseph the Worker)", lat: 7.7050, lon: 126.0050 },
      { name: "San Roque Parish", location: "Mawab, Davao de Oro", priest: "Rev. Fr. Ruel C. Gualderama", fiesta: "August 16 – Feast of St. Roch (San Roque)", lat: 7.5020, lon: 125.9100 }
    ],
    history: "San Jose Vicariate is dedicated to St. Joseph, foster father of Jesus. It serves communities in Montevista, Mawab, and parts of Maco in Davao de Oro."
  },
  {
    id: 8,
    name: "San Miguel Vicariate",
    shortName: "San Miguel",
    vicarForane: "Rev. Fr. Kim A. Munez",
    lat: 7.4280,
    lon: 125.6200,
    parishes: [
      { name: "Nuestra Señora dela Candelaria Parish", location: "Kimamon, Sto. Tomas, Davao del Norte", priest: "Rev. Fr. Kim A. Munez", fiesta: "February 2 – Feast of the Presentation (Candlemas)", lat: 7.4650, lon: 125.6480 },
      { name: "Nuestra Señora dela Salvacion Quasi Parish", location: "La Libertad, Sto. Tomas, Davao del Norte", priest: "Rev. Fr. Jenino D. Agudulo", fiesta: "August 15 – Our Lady of Salvation (regional devotion)", lat: 7.4380, lon: 125.6320 },
      { name: "San Jose Parish", location: "Dujali, Davao del Norte", priest: "Rev. Fr. Salvador Cuenca", fiesta: "March 19 – Solemnity of St. Joseph (or May 1 – St. Joseph the Worker)", lat: 7.4800, lon: 125.6600 },
      { name: "San Miguel Parish", location: "Sto. Tomas, Davao del Norte", priest: "Rev. Fr. Melton Melvin B. Dela Cuesta", fiesta: "September 29 – Feast of Sts. Michael, Gabriel and Raphael", lat: 7.4520, lon: 125.6400 }
    ],
    history: "San Miguel Vicariate is dedicated to St. Michael the Archangel. Based in Sto. Tomas, it serves the faithful across Sto. Tomas and Dujali municipalities."
  },
  {
    id: 9,
    name: "San Vicente Ferrer Vicariate",
    shortName: "San Vicente Ferrer",
    vicarForane: "Rev. Fr. Christopher P. Segura",
    lat: 7.7100,
    lon: 126.1400,
    parishes: [
      { name: "Birhen sa Sto. Rosario Parish", location: "Mapawa, Maragusan, Davao de Oro", priest: "Rev. Fr. Jason Abril Y. Escote", fiesta: "September 8 – Nativity of the Blessed Virgin Mary", lat: 7.7680, lon: 126.1950 },
      { name: "San Isidro Labrador Parish", location: "Camanlangan, New Bataan, Davao de Oro", priest: "Rev. Fr. Victor C. Lechido Jr.", fiesta: "May 15 – Feast of San Isidro Labrador", lat: 7.5720, lon: 125.9880 },
      { name: "San Vicente Ferrer Parish", location: "Maragusan, Davao de Oro", priest: "Rev. Fr. Christopher P. Segura", fiesta: "April 5 – Feast of St. Vincent Ferrer", lat: 7.7450, lon: 126.1750 }
    ],
    history: "San Vicente Ferrer Vicariate is dedicated to the great Dominican preacher St. Vincent Ferrer. It serves Maragusan and parts of New Bataan in Davao de Oro."
  },
  {
    id: 10,
    name: "St. James the Apostle Vicariate",
    shortName: "St. James the Apostle",
    vicarForane: "Rev. Fr. Benjamin V. Lucena Jr.",
    lat: 7.6350,
    lon: 126.0500,
    parishes: [
      { name: "Inahan sa Kanunay'ng Panabang Parish", location: "Bantacan, New Bataan, Davao de Oro", priest: "Rev. Fr. Jay V. Bagot", fiesta: "Patronal feast day (local schedule)", lat: 7.5720, lon: 126.0000 },
      { name: "San Antonio de Padua Parish", location: "New Bataan, Davao de Oro", priest: "Rev. Fr. Adonis D. Rancho", fiesta: "June 13 – Feast of St. Anthony of Padua", lat: 7.5870, lon: 126.0250 },
      { name: "San Francisco Javier Quasi Parish", location: "Gabi, Compostela, Davao de Oro", priest: "Rev. Fr. Ianeil James Melendres", fiesta: "Patronal feast day (local schedule)", lat: 7.6620, lon: 126.0750 },
      { name: "Señor Santiago Apostol Parish", location: "Compostela, Davao de Oro", priest: "Rev. Fr. Benjamin V. Lucena Jr.", fiesta: "July 25 – Feast of St. James the Apostle", lat: 7.6700, lon: 126.0900 }
    ],
    history: "St. James the Apostle Vicariate is named after the patron saint of pilgrims. Based in Compostela, it serves communities recovering from natural disasters with resilience and faith."
  },
  {
    id: 11,
    name: "Sta. Teresita sa Batang Hesus Vicariate",
    shortName: "Sta. Teresita",
    vicarForane: "Rev. Fr. Jaime S. Ozoa",
    lat: 7.5880,
    lon: 125.9400,
    parishes: [
      { name: "San Vicente Ferrer Quasi Parish", location: "Manat, Nabunturan, Davao de Oro", priest: "Rev. Fr. Reynaldo A. Biliran", fiesta: "April 5 – Feast of St. Vincent Ferrer", lat: 7.6150, lon: 125.9800 },
      { name: "Sta. Teresita Parish", location: "Nabunturan, Davao de Oro", priest: "Rev. Fr. Jaime S. Ozoa", fiesta: "October 1 – St. Thérèse of the Child Jesus", lat: 7.6020, lon: 125.9700 },
      { name: "Sto. Niño Quasi Parish", location: "Antiquera, Nabunturan, Davao de Oro", priest: "Rev. Fr. Tito C. Urbiztondo", fiesta: "Third Sunday of January – Feast of the Sto. Niño", lat: 7.5950, lon: 125.9550 }
    ],
    history: "Sta. Teresita sa Batang Hesus Vicariate is dedicated to St. Thérèse of the Child Jesus (St. Thérèse of Lisieux). Based in Nabunturan, it promotes the 'Little Way' of spiritual childhood."
  },
  {
    id: 12,
    name: "Sto. Niño Vicariate",
    shortName: "Sto. Niño",
    vicarForane: "Rev. Fr. Gregorio P. Dedal Jr.",
    lat: 7.2900,
    lon: 125.6700,
    parishes: [
      { name: "Mary Mediatrix of All Grace Quasi Parish", location: "New Visayas, Panabo City", priest: "Rev. Fr. Lou Jake M. Colarines", fiesta: "August 22 – Queenship of Mary (local Mediatrix devotions vary)", lat: 7.3280, lon: 125.7100 },
      { name: "San Agustin Parish", location: "Cagangohan, Panabo City", priest: "Rev. Fr. Gregorio P. Dedal Jr.", fiesta: "Patronal feast day (local schedule)", lat: 7.3120, lon: 125.6950 },
      { name: "San Jose Parish", location: "Gamao, Panabo City", priest: "Rev. Fr. Jeremy Tanong", fiesta: "March 19 – Solemnity of St. Joseph (or May 1 – St. Joseph the Worker)", lat: 7.3060, lon: 125.6780 },
      { name: "San Pedro Parish", location: "San Vicente, Panabo City", priest: "Rev. Fr. Lucas P. Carisma Jr.", fiesta: "June 29 – Solemnity of Sts. Peter and Paul", lat: 7.2980, lon: 125.6620 },
      { name: "Sto. Niño Parish", location: "Panabo City", priest: "Rev. Fr. Emerson B. Delos Reyes", fiesta: "Third Sunday of January – Feast of the Sto. Niño", lat: 7.3080, lon: 125.6840 }
    ],
    history: "Sto. Niño Vicariate is dedicated to the Holy Child Jesus (Santo Niño). Centered in Panabo City, it celebrates the beloved Filipino devotion to the Child Jesus."
  },
  {
    id: 13,
    name: "The Holy Family Vicariate",
    shortName: "The Holy Family",
    vicarForane: "Rev. Fr. Joseph C. Bajao",
    lat: 7.4000,
    lon: 125.9500,
    parishes: [
      { name: "Diocesan Shrine of Our Lady of Mother Perpetual Help Parish", location: "Maco, Davao de Oro", priest: "Rev. Fr. Joseph C. Bajao", fiesta: "June – Week of the Perpetual Help Novena (local)", lat: 7.3580, lon: 125.8580 },
      { name: "Mary Mediatrix of All Grace Quasi Parish", location: "Pagakpak, Pantukan, Davao de Oro", priest: "Rev. Fr. Norman Joseph P. Omay", fiesta: "August 22 – Queenship of Mary (local Mediatrix devotions vary)", lat: 7.4350, lon: 125.9280 },
      { name: "San Antonio de Padua Chapel Parish", location: "Fuentes, Pantukan, Davao de Oro", priest: "Rev. Fr. Ian Jade Balistoy", fiesta: "June 13 – Feast of St. Anthony of Padua", lat: 7.4180, lon: 125.9150 },
      { name: "San Jose Parish", location: "Pantukan, Davao de Oro", priest: "Rev. Fr. Joseph P. Remegia", fiesta: "March 19 – Solemnity of St. Joseph (or May 1 – St. Joseph the Worker)", lat: 7.4450, lon: 125.9380 },
      { name: "Sto. Niño Parish", location: "Mabini, Davao de Oro", priest: "Rev. Fr. Arturo S. Luayon", fiesta: "Third Sunday of January – Feast of the Sto. Niño", lat: 7.4650, lon: 126.0050 }
    ],
    history: "The Holy Family Vicariate is dedicated to the Holy Family of Nazareth. It serves Maco, Pantukan, and Mabini, promoting family life and Marian devotion."
  }
];

// Get vicariate by ID
export function getVicariateById(id: number): Vicariate | undefined {
  return vicariatesData.find(v => v.id === id);
}
