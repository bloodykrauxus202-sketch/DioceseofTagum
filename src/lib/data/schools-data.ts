export interface School {
  id: number;
  name: string;
  abbreviation: string;
  image: string | null;
  location: string;
  coordinates?: { lat: number; lng: number } | null;
  contact: string;
  foundingYear: string;
  foundingAnniversary: string;
  patronSaint: string;
  administration: string;
  currentHead: string;
  charism?: string;
  motto?: string;
  mission: string;
  website: string | null;
  history: string;
  color: string;
  category: 'Congregational' | 'DOTES Member';
  scheduleOfEvents: {
    [year: number]: Array<{
      date: string;
      title: string;
      description?: string;
    }>;
  };
}

export const schoolsData: School[] = [
  {
    id: 1,
    name: "St. Mary's College of Tagum",
    abbreviation: "SMCT",
    image: null,
    location: "Tagum City 8100, Davao del Norte",
    coordinates: { lat: 7.4478, lng: 125.8078 },
    contact: "president@smctagum.edu.ph",
    foundingYear: "1946",
    foundingAnniversary: "1946 (Originally as Holy Cross College)",
    patronSaint: "Blessed Virgin Mary",
    administration: "Religious of the Virgin Mary (RVM)",
    currentHead: "Sr. Ma. Marilou B. Madronero, RVM",
    charism: "Ignacian Spirituality",
    mission: "Operating under Ignacian Spirituality, SMCT emphasizes a life of deep prayer, joyful service, and serving as a prophetic witness to the Gospel in the modern world.",
    website: "smctagum.edu.ph",
    history: "St. Mary's College of Tagum stands as the oldest Catholic higher education institution in the diocese. Following World War II, the Religious of the Virgin Mary (RVM)—founded in 1684 by Venerable Ignacia del Espiritu Santo—established Holy Cross College in 1946 at Bishop Thibault's invitation. SMCT maintains a 'Mother Ignacia Collection' in its Filipiniana library and frequently hosts major academic summits. The creation of Letran de Davao in 1967 was linked to SMCT, as the boys' department was spun off to create the exclusive boys' academy.",
    color: "#1e3a8a",
    category: "Congregational",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 2,
    name: "Assumption College of Nabunturan",
    abbreviation: "ACN",
    image: null,
    location: "Nabunturan 8800, Davao de Oro",
    coordinates: { lat: 7.6071, lng: 126.0631 },
    contact: "acn.excelsior@yahoo.com",
    foundingYear: "1954",
    foundingAnniversary: "June 1955 (Classes opened)",
    patronSaint: "Our Lady of the Assumption",
    administration: "Daughters of Mary of the Assumption (FMA)",
    currentHead: "Sr. Ramona E. Bastasa, fma",
    mission: "Founded to provide 'Christian Education for the youth especially in the parishes too poor to maintain a Catholic school,' ACN bears witness to Jesus Christ with joy and simplicity.",
    website: "acn.edu.ph",
    history: "The origins trace back to a 1950 request by Msgr. Clovis Thibault. On May 7, 1951, the FMA—founded in 1922 by Msgr. Louis Joseph Arthur Melanson in Canada—accepted this mission. Led by Sr. Elodie Marie Richard and Sr. Oveline Doucet, the FMA sisters established the academy in 1954, opening to 206 students in June 1955. It is the first Catholic High School in Compostela Valley. By 1995, a new college building was financed by the FMA Motherhouse in Canada.",
    color: "#047857",
    category: "Congregational",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 3,
    name: "Letran de Davao",
    abbreviation: "LDDI",
    image: null,
    location: "Seminary Drive, Tagum City 8100, Davao del Norte",
    coordinates: { lat: 7.4459, lng: 125.8093 },
    contact: "letrande_davao@yahoo.com",
    foundingYear: "1965",
    foundingAnniversary: "June 1967 (Formally opened)",
    patronSaint: "St. Dominic",
    administration: "Congregation of the Schools of Charity (Cavanis Fathers - CSCH)",
    currentHead: "Rev. Fr. Larry Jay P. Lantano, CSCH",
    mission: "Guided by the Cavanis charism of providing paternal care and rigorous education to the youth, Letran de Davao operates as a coeducational institution offering grade school through senior high school.",
    website: null,
    history: "In 1965, Bishop Joseph W. Regan proposed creating an exclusive high school for boys as a seminary preparatory. Land was donated by the Domingo and Ostrea families. Initially operating under St. Mary's College's permit as 'Saint Mary's School for Boys,' it opened in June 1967. On June 16, 1987, Fr. Jerry R. Manlangit, O.P. renamed it 'Letran de Davao.' In 2001-2002, the Cavanis Fathers assumed control, initiating major renovations with Italian benefactor funding.",
    color: "#7c2d12",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 4,
    name: "Maryknoll College of Panabo",
    abbreviation: "MCPI",
    image: null,
    location: "Panabo City 8105, Davao del Norte",
    coordinates: { lat: 7.3089, lng: 125.6847 },
    contact: "maryknollcollege@yahoo.com",
    foundingYear: "1960",
    foundingAnniversary: "February 1960",
    patronSaint: "St. John Vianney",
    administration: "Diocesan Clergy",
    currentHead: "Fr. Richell P. Fuentes",
    motto: "Ad Iesum Per Mariam Matrem De Perpetuo Succursu (To Jesus through Mary, Mother of Perpetual Help)",
    mission: "Committed to holistic formation, offering diverse competencies and modern tech-voc programs while drawing inspiration from the simplicity of Mary and the pastoral dedication of St. John Vianney.",
    website: "mcpi.edu.ph",
    history: "Established in February 1960, MCPI was the first and only Catholic school in Panabo. Initially administered by Maryknoll sisters, in the 1970s they appointed Mr. Pio Galagala as the first lay principal. In 1980, Dominican Sisters assumed leadership under Sr. Ma. Virgilia Rivero, O.P., constructing a mini-auditorium and faculty dormitories. The school seal features Chi Rho, Marian symbols, and uniquely local Banana and Rice motifs honoring local agriculture.",
    color: "#0369a1",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 5,
    name: "Queen of Apostles College Seminary",
    abbreviation: "QACS",
    image: null,
    location: "Seminary Drive, Tagum City 8100, Davao del Norte",
    coordinates: { lat: 7.4452, lng: 125.8090 },
    contact: "qacsems@yahoo.com",
    foundingYear: "1967",
    foundingAnniversary: "1967",
    patronSaint: "Queen of Apostles (Blessed Virgin Mary)",
    administration: "Diocesan Clergy",
    currentHead: "Rev. Fr. Marlon L. Pates (Rector)",
    mission: "The theological and formational heart of the Diocese of Tagum, ensuring a steady, self-reliant pipeline of local, native-born vocations for the diocesan priesthood through collegiate-level philosophical formation.",
    website: null,
    history: "Founded in 1967 by Bishop Regan on land donated by the Domingo and Ostrea families. Seminarians complete philosophy here before proceeding to St. Francis Xavier Regional Major Seminary in Davao City. The seminary hosts major diocesan events and relies on grassroots campaigns like 'Buy a Parole (Star)' for funding. In April 2024, the Apostolic Nuncio blessed the newly renovated Oratory and commemorated Bishop Regan's legacy.",
    color: "#581c87",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 6,
    name: "Assumpta School of Tagum",
    abbreviation: "AST",
    image: null,
    location: "FMA Novitiate, Mankilam, Tagum City 8100, Davao del Norte",
    coordinates: { lat: 7.4388, lng: 125.8012 },
    contact: "assumpta.tagum@yahoo.com",
    foundingYear: "1995",
    foundingAnniversary: "1995",
    patronSaint: "Mary in the mystery of her Assumption",
    administration: "Daughters of Mary of the Assumption (FMA)",
    currentHead: "Sr. Maria Gilia E. Rosales, fma",
    mission: "Geared toward total integral formation and active promotion of social justice within the local community. The AST seal features 'AM' for Ave Maria and Arthur Melanson, with blue representing the Marian Spirit.",
    website: null,
    history: "Founded in 1995 by Sr. Aurelia Bardenas, fma, and Sr. Consolacion Josue, fma, who opened a humble nursery of just seven pupils in the Old Social Action Center. By 1996-1997, enrollment exceeded 200 students with SEC registration. The Department of Education granted permission to open High School in 1999-2000.",
    color: "#0d9488",
    category: "Congregational",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 7,
    name: "Assumption Academy of Compostela",
    abbreviation: "AACI",
    image: null,
    location: "Compostela 8109, Davao de Oro",
    coordinates: { lat: 7.6681, lng: 126.0876 },
    contact: "assumptionacademycompostela@gmail.com",
    foundingYear: "1961",
    foundingAnniversary: "1961",
    patronSaint: "St. James the Apostle",
    administration: "Daughters of Mary of the Assumption (FMA)",
    currentHead: "Sr. Rosalinda A. Bernil, fma",
    mission: "Bearing witness to Christ with profound joy and simplicity, emphasizing a preferential option for the poor and the promotion of a culture of life, directly engaging with the socioeconomic realities of an agrarian community.",
    website: null,
    history: "The municipality of Compostela was named by an early Spanish friar carrying a statue of Saint James the Apostle. Founded in 1961 during the diocese's rural expansion era, the academy serves children of settlers and indigenous populations. The school maintains old photographs documenting the early FMA missionary efforts, used for congregational jubilees.",
    color: "#b45309",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 8,
    name: "Assumption Academy of Mawab",
    abbreviation: "AAMbI",
    image: null,
    location: "Mawab 8108, Davao de Oro",
    coordinates: { lat: 7.5049, lng: 125.9870 },
    contact: "assumptionmawab@yahoo.com",
    foundingYear: "1965",
    foundingAnniversary: "1965",
    patronSaint: "Our Lady of the Assumption",
    administration: "Dominican Sisters of the Most Holy Rosary (OP)",
    currentHead: "Sr. Ma. Kristine Rose R. Escaño, OP",
    mission: "Integrating the Dominican pillars of prayer, study, community, and preaching (Veritas) with rural educational development needs, ensuring the curriculum cultivates moral discernment among local youth.",
    website: null,
    history: "Established in 1965 as a collaborative effort between local Mawab parochial leadership and missionary sisters. Originally named in honor of the Assumption (reflecting early FMA influence), it is now guided by the Dominican Sisters of the Most Holy Rosary—a uniquely Filipino congregation founded by Venerable Rosario in Molo, Iloilo, in 1927.",
    color: "#dc2626",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 9,
    name: "Assumption Academy of Monkayo",
    abbreviation: "AAMkI",
    image: null,
    location: "Poblacion, Monkayo 8111, Davao de Oro",
    coordinates: { lat: 7.8176, lng: 126.0549 },
    contact: "assumptionacademymonkayo@yahoo.com",
    foundingYear: "1959",
    foundingAnniversary: "1959",
    patronSaint: "Our Lady of the Assumption",
    administration: "Diocesan Clergy",
    currentHead: "Fr. Niño T. Estebaya",
    mission: "Designed to cultivate moral discernment, foster deep community engagement, and nurture individuals committed to ethical living and compassionate citizenship within a highly diverse cultural landscape.",
    website: null,
    history: "One of the oldest rural academies in the DOTES network, established in 1959 before the major 1960s expansion wave. Monkayo blends indigenous pre-colonial folklore (celebrated in the Kariyawan Festival honoring diwata/nature spirits) and Spanish-influenced patronal fiestas. The academy harmonizes these complex cultural identities with Catholic doctrine.",
    color: "#059669",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 10,
    name: "Cor Jesu Institute of Mabini",
    abbreviation: "CJIM",
    image: null,
    location: "Mabini 8115, Davao de Oro",
    coordinates: { lat: 7.7325, lng: 126.1518 },
    contact: "corjesuhighschoolofmabini@gmail.com",
    foundingYear: "1965",
    foundingAnniversary: "1965",
    patronSaint: "Sacred Heart of Jesus",
    administration: "Dominican Sisters of the Most Holy Rosary (OP)",
    currentHead: "Sr. Ma. Teofila F. Frondozo, OP",
    mission: "Operating under the DOTES framework to provide holistic, Christ-centered education, integrating the Dominican charism with devotion to the Sacred Heart to serve the coastal and agricultural communities.",
    website: null,
    history: "Founded in 1965 to serve the coastal and agricultural communities of Davao de Oro. Managed by the Dominican Sisters of the Most Holy Rosary, the school illustrates the collaborative theological nature of the diocese, where varying spiritual devotions are synthesized to serve the spiritual and academic requirements of the Mabini youth.",
    color: "#be123c",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 11,
    name: "Letran de Davao of Maco",
    abbreviation: "LDDMI",
    image: null,
    location: "Prk. 8, Poblacion, Maco 8114, Davao de Oro",
    coordinates: { lat: 7.3698, lng: 125.8647 },
    contact: "letranmaco65@gmail.com",
    foundingYear: "1964",
    foundingAnniversary: "1964",
    patronSaint: "St. Dominic",
    administration: "Diocesan Clergy / Dominican Sisters of the Most Holy Rosary (OP)",
    currentHead: "Rev. Fr. Ian Esmerald G. Pillo",
    mission: "Continuing the legacy of Maryknoll missionaries through Dominican and diocesan leadership, providing quality Catholic education to the municipality of Maco.",
    website: null,
    history: "Originally founded in 1964 as 'Maryknoll High School of Maco' by Maryknoll Fathers John Lennon, M.M., and Charles McHugh, M.M. Physical construction was overseen by Fr. Joseph Dawling under Bishop Regan. From inception until 1988, FMA sisters managed the school. In 1988, Dominican Fathers rebranded it as Letran de Davao of Maco. In 1993, Dominican Sisters of the Most Holy Rosary assumed management. Ownership resides with the Bishop of Tagum.",
    color: "#4338ca",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 12,
    name: "Maryknoll High School of Asuncion",
    abbreviation: "MHSAI",
    image: null,
    location: "Asuncion 8102, Davao del Norte",
    coordinates: { lat: 7.5477, lng: 125.8909 },
    contact: "mhsa_64@gmail.com",
    foundingYear: "1964",
    foundingAnniversary: "1964",
    patronSaint: "Our Lady of the Assumption",
    administration: "Diocesan Clergy",
    currentHead: "Fr. Niño T. Estebaya",
    mission: "Providing vital secondary education including comprehensive Senior High School tracks (ABM, STEM, GAS, TVL) while integrating modern media education into traditional Catholic pedagogy.",
    website: null,
    history: "Founded during the height of Maryknoll expansion in 1964, MHSAI serves the inland municipality of Asuncion. The school actively participates in regional media awareness and ecclesiastical communication seminars, demonstrating early integration of modern media education. Students participate in regional civic events like the 10th Infantry Division's poster-making contests.",
    color: "#0891b2",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 13,
    name: "Maryknoll High School of New Corella",
    abbreviation: "MHSNCI",
    image: null,
    location: "New Corella 8104, Davao del Norte",
    coordinates: { lat: 7.5890, lng: 125.8213 },
    contact: "newcorellamarynollhighschool@gmail.com",
    foundingYear: "1968",
    foundingAnniversary: "1968",
    patronSaint: "Our Lady of Perpetual Help",
    administration: "Teresian Daughters of Mary (TDM)",
    currentHead: "Sr. Ma. Florifes C. Bejod, TDM",
    mission: "Serving as a critical, stabilizing educational hub in the agricultural interior of Davao del Norte, offering GAS and TVL tracks imbued with Teresian spiritual values.",
    website: null,
    history: "Established toward the end of the region's massive school-building decade in 1968. Distinctly managed by the Teresian Daughters of Mary (TDM), differentiating it from OP-managed institutions. The school serves the agricultural community of New Corella, capping off the primary wave of 1960s educational expansion in the diocese.",
    color: "#7c3aed",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 14,
    name: "Maryknoll School of Maniki",
    abbreviation: "MSMI",
    image: null,
    location: "Kapalong 8113, Davao del Norte",
    coordinates: { lat: 7.5772, lng: 125.7098 },
    contact: "maryknollhighschool_maniki@yahoo.com",
    foundingYear: "1961",
    foundingAnniversary: "1961",
    patronSaint: "Our Lady of Perpetual Help",
    administration: "Dominican Sisters of the Most Holy Rosary (OP)",
    currentHead: "Sr. Ma. Joycelyn E. Hagos, OP",
    mission: "Sharing the congregational focus on truth (Veritas) and regional youth development, operating in a frontier town known for vast agricultural outputs and proximity to indigenous communities.",
    website: null,
    history: "Founded in 1961 as part of the initial wave of Maryknoll rural deployments, serving the sprawling municipality of Kapalong. Handled by the Dominican Sisters, the school operates in a frontier town historically known for vast agricultural outputs and close geographic proximity to indigenous communities.",
    color: "#16a34a",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 15,
    name: "Maryknoll School of Sto. Tomas",
    abbreviation: "MSSTI",
    image: null,
    location: "Sto. Tomas 8112, Davao del Norte",
    coordinates: { lat: 6.9601, lng: 125.2219 },
    contact: "maryknoll.sto.tomas@gmail.com",
    foundingYear: "1961",
    foundingAnniversary: "1961",
    patronSaint: "St. Thomas the Apostle",
    administration: "Dominican Sisters of the Most Holy Rosary (OP)",
    currentHead: "Sr. Marilou B. Jormigos, OP",
    mission: "Aligning curricular offerings with the agrarian and commercial needs of the local populace, ensuring Catholic education remains practically relevant to the economic realities of its student body.",
    website: null,
    history: "Founded simultaneously with the Maniki and Compostela branches in 1961, the Sto. Tomas institution is another formidable pillar of the Dominican Sisters' educational apostolate. It operates in the bustling, densely populated agricultural center of Sto. Tomas, serving the diverse needs of the local community.",
    color: "#ea580c",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 16,
    name: "Saint Vincent Academy of Maragusan",
    abbreviation: "SVAMI",
    image: null,
    location: "San Mariano, Maragusan 8116, Davao de Oro",
    coordinates: { lat: 7.7074, lng: 126.3137 },
    contact: "svam_15@yahoo.com",
    foundingYear: "1979",
    foundingAnniversary: "1979",
    patronSaint: "St. Vincent de Paul",
    administration: "Dominican Sisters of the Holy Trinity (OP)",
    currentHead: "Sr. Bambina P. Lapara, OP",
    mission: "Acting as a crucial developmental bridge in a remote region, fulfilling the Church's mandate to reach marginalized and geographically disadvantaged populations through essential secondary education.",
    website: null,
    history: "Geographically isolated in the rugged, mountainous terrain of Maragusan, Saint Vincent Academy was established later than its lowland peers in 1979. Managed by the Dominican Sisters of the Holy Trinity, the academy provides essential secondary education including specialized GAS tracks to a highland community, reaching those in remote areas.",
    color: "#2563eb",
    category: "DOTES Member",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  }
];

export function getSchoolById(id: string | number): School | undefined {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return schoolsData.find(s => s.id === numId);
}
