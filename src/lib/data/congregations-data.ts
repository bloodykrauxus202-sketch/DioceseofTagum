export interface Congregation {
  id: number;
  name: string;
  acronym: string;
  image: string | null;
  foundingAnniversary: string;
  patronSaint: string;
  history: string;
  mission: string;
  location: string;
  coordinates: { lat: number; lng: number } | null;
  contacts: {
    phones: string[];
    email: string | null;
  };
  website: string | null;
  scheduleOfEvents: {
    [year: number]: Array<{
      date: string;
      title: string;
      description?: string;
    }>;
  };
}

export const congregationsData: Congregation[] = [
  {
    id: 1,
    name: "ACR – Ancillae Christi Regis",
    acronym: "ACR",
    image: null,
    foundingAnniversary: "Founded 1989",
    patronSaint: "Christ the King",
    history: "Locally founded diocesan congregation (1989) to support spirituality/formation and retreat ministry in the Diocese of Tagum.",
    mission: "Retreat ministry; Bishop Joseph Regan Spirituality Center; diocesan spirituality/formation support.",
    location: "ACR Center House, Prk. 8 Upper La Filipina, Tagum City, 8100 Davao del Norte, Philippines",
    coordinates: { lat: 7.4510, lng: 125.8045 },
    contacts: {
      phones: ["0951 832 5918", "0907 365 0623", "0995 612 7239", "0922 804 6420", "0999 995 6508"],
      email: "acrsisters@gmail.com"
    },
    website: "https://www.facebook.com/ACRSpiritualityCenter",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 2,
    name: "Benedictine Nuns of the Eucharistic King",
    acronym: "BNEK",
    image: null,
    foundingAnniversary: "Not specified",
    patronSaint: "St. Benedict; Eucharistic King",
    history: "Listed as cloistered contemplative presence in Tagum (canonical status noted as 'Domus' in directory).",
    mission: "Cloistered contemplative monastic life; perpetual prayer and contemplation.",
    location: "Our Lady of Good Counsel Convent, Purok Campagnagn, Mangga, Visayan Village, Tagum City, 8100",
    coordinates: { lat: 7.4455, lng: 125.8110 },
    contacts: {
      phones: ["(084) 218-1921"],
      email: "curiaosb@anselmianum.com"
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 3,
    name: "Sisters of the Poor of St. Catherine of Siena",
    acronym: "OP",
    image: null,
    foundingAnniversary: "Not specified",
    patronSaint: "St. Catherine of Siena",
    history: "Listed among additional women's congregations operating within diocesan jurisdiction.",
    mission: "Service to people in absolute poverty; disaster relief / emergency response.",
    location: "Contact via Diocese of Tagum Chancery",
    coordinates: null,
    contacts: {
      phones: ["(084) 655-0302", "(084) 218-1617", "(084) 218-1402"],
      email: "dioceseoftagum@yahoo.com"
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 4,
    name: "OP Molo – Dominican Sisters of the Most Holy Rosary",
    acronym: "OP Molo",
    image: null,
    foundingAnniversary: "Founded 1925; Tagum 1953",
    patronSaint: "St. Dominic; Our Lady of the Most Holy Rosary",
    history: "Founded 1925; arrived in Tagum area in 1953 to staff Holy Rosary School in New Corella.",
    mission: "Education, catechesis; local apostolate includes Holy Rosary School and Holy Rosary Shrine.",
    location: "Dominican Sisters Convent, Holy Rosary Shrine, Dominican Heights, Agan Magdum, Tagum City, 8100",
    coordinates: { lat: 7.4430, lng: 125.8055 },
    contacts: {
      phones: ["(084) 216-7337", "0919 405 8165", "0907 448 0031"],
      email: "opmolo.tagum@gmail.com"
    },
    website: "https://www.opmolo.org/",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 5,
    name: "FMA Sisters – Daughters of Mary of the Assumption",
    acronym: "FMA",
    image: null,
    foundingAnniversary: "Founded 1922; Philippines 1951",
    patronSaint: "Mary (Assumption)",
    history: "International missionary congregation; strong Tagum presence as a regional center via Assumpta School.",
    mission: "Education apostolate; owns/operates Assumpta School of Tagum and related educational works.",
    location: "Regional House, P.O. Box 612, Mankilam, Tagum City, 8100",
    coordinates: { lat: 7.4303, lng: 125.8087 },
    contacts: {
      phones: ["(084) 216-8877", "(084) 216-6208", "(084) 216-9425", "(084) 216-9324"],
      email: "fmasisters@yahoo.com"
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 6,
    name: "OP Trinity – Dominican Sisters of the Trinity",
    acronym: "OP Trinity",
    image: null,
    foundingAnniversary: "San Pedro Hospital est. 1948",
    patronSaint: "Holy Trinity; St. Dominic",
    history: "Directory highlights San Pedro Hospital post-war establishment (1948) and ongoing regional healthcare management.",
    mission: "Healthcare apostolate; ownership/management linked to San Pedro Hospital and allied works.",
    location: "Christ the King Regional House, corner Lakatan & Rambutan Sts., Cabaguio Ave., Bajada, Davao",
    coordinates: { lat: 7.0731, lng: 125.6128 },
    contacts: {
      phones: ["(082) 221-1838", "(082) 221-5405"],
      email: "domking1632003@yahoo.com"
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 7,
    name: "OP Rosarii – Dominican Sisters of Regina Rosarii",
    acronym: "OP Rosarii",
    image: null,
    foundingAnniversary: "Founded May 13, 2005",
    patronSaint: "Our Lady of Fatima; St. Dominic",
    history: "Founded 2005; Tagum ministry focus includes outreach in Mankilam.",
    mission: "Contemplative witness + social outreach (feeding, catechesis, support to sick/elderly).",
    location: "Brgy. Mankilam, Tagum City",
    coordinates: { lat: 7.4295, lng: 125.8095 },
    contacts: {
      phones: ["(02) 372-5327", "(02) 372-4302", "0915 125 7479"],
      email: "info@reginarosarii.org"
    },
    website: "https://reginarosarii.org/",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 8,
    name: "Reparatrix Sisters Servants of Mary",
    acronym: "SMR",
    image: null,
    foundingAnniversary: "Not specified",
    patronSaint: "Mary (Reparatrix)",
    history: "Listed among additional women's congregations operating within diocesan jurisdiction.",
    mission: "Reparation and Eucharistic adoration (contemplative charism).",
    location: "Contact via Diocese of Tagum Chancery",
    coordinates: null,
    contacts: {
      phones: ["(084) 655-0302", "(084) 218-1617", "(084) 218-1402"],
      email: "dioceseoftagum@yahoo.com"
    },
    website: "https://smr.org/",
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 9,
    name: "Bridgettine Sisters",
    acronym: "OSsS",
    image: null,
    foundingAnniversary: "Not specified",
    patronSaint: "St. Bridget",
    history: "Listed as active within territorial boundaries.",
    mission: "Hospitality and ecumenical unity.",
    location: "Contact via Diocese of Tagum Chancery",
    coordinates: null,
    contacts: {
      phones: ["(084) 655-0302", "(084) 218-1617", "(084) 218-1402"],
      email: "dioceseoftagum@yahoo.com"
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 10,
    name: "Scalabrinians",
    acronym: "CS",
    image: null,
    foundingAnniversary: "Not specified",
    patronSaint: "St. Charles Borromeo",
    history: "Included in official directory list within diocesan jurisdiction.",
    mission: "Serves migrants/refugees; formal presence/coordination in diocese.",
    location: "Contact via Diocese of Tagum Chancery",
    coordinates: null,
    contacts: {
      phones: ["(084) 655-0302", "(084) 218-1617", "(084) 218-1402"],
      email: "dioceseoftagum@yahoo.com"
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 11,
    name: "Teresian Daughters of Mary",
    acronym: "TDM",
    image: null,
    foundingAnniversary: "Not specified",
    patronSaint: "St. Teresa; Mary",
    history: "Listed due to broad operational footprint; major role in BEC organization.",
    mission: "Retreat coordination/formation; credited with organizing BEC structure in the diocese.",
    location: "St. Teresa Teachers College, Km. 5 Apokon Road, Tagum City, 8100",
    coordinates: { lat: 7.4495, lng: 125.8130 },
    contacts: {
      phones: ["0907 218 9313", "(082) 299-2311"],
      email: null
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 12,
    name: "Religious of the Virgin Mary",
    acronym: "RVM",
    image: null,
    foundingAnniversary: "St. Mary's College founded 1948",
    patronSaint: "Virgin Mary",
    history: "RVM is a major indigenous Filipina congregation; Tagum presence anchored in the college.",
    mission: "Higher education apostolate; governance/operation of Saint Mary's College of Tagum.",
    location: "St. Mary's College of Tagum, National Highway, Tagum City, 8100",
    coordinates: { lat: 7.4465, lng: 125.8092 },
    contacts: {
      phones: ["(084) 216-6205"],
      email: "nina.dympna@gmail.com"
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 13,
    name: "Hospitaller Sisters",
    acronym: "HSC",
    image: null,
    foundingAnniversary: "ACT Community F-1991",
    patronSaint: "Sacred Heart of Jesus",
    history: "Directory clarifies congregation identity and local community details.",
    mission: "Healthcare apostolate.",
    location: "ACT Community, St. Teresa division, Tagum City, 8100",
    coordinates: { lat: 7.4520, lng: 125.8098 },
    contacts: {
      phones: ["(062) 991-5899"],
      email: "hscmanila@hospitallersisters.org"
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 14,
    name: "Parochial Handmaids of the Holy Spirit",
    acronym: "PHHS",
    image: null,
    foundingAnniversary: "Not specified",
    patronSaint: "Holy Spirit",
    history: "Listed among additional women's congregations operating within diocesan jurisdiction.",
    mission: "Assist diocesan clergy with logistical and catechetical demands at parish level.",
    location: "Operates through rural parish conventos",
    coordinates: null,
    contacts: {
      phones: ["0917 596 9931"],
      email: null
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 15,
    name: "LMM — Lay Missionaries of Mary",
    acronym: "LMM",
    image: null,
    foundingAnniversary: "Not specified",
    patronSaint: "Mary",
    history: "Categorized under secular institutes/organized lay bodies in directory.",
    mission: "Secular institute for women supporting spiritual, logistical, and social missions of the local church.",
    location: "Contact via Diocese of Tagum Chancery",
    coordinates: null,
    contacts: {
      phones: ["(084) 655-0302", "(084) 218-1617", "(084) 218-1402"],
      email: "dioceseoftagum@yahoo.com"
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 16,
    name: "Marian Faithful Servants Community",
    acronym: "MFSC",
    image: null,
    foundingAnniversary: "Not specified",
    patronSaint: "Mary",
    history: "Recognized lay association operating from Tagum hub.",
    mission: "Lay association; lay ministry and community service.",
    location: "Community House, Apokon Road, Tagum City, 8100",
    coordinates: { lat: 7.4442, lng: 125.8035 },
    contacts: {
      phones: ["(084) 218-XXXX"],
      email: null
    },
    website: null,
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  }
];

export function getCongregationById(id: string | number): Congregation | undefined {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return congregationsData.find(c => c.id === numId);
}
