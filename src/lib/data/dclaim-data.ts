export interface DclaimGroup {
  id: number;
  name: string;
  coordinator: string;
  mission: string;
  website: string | null;
  socialMedia: string[];
  history: string;
  contacts: {
    phones: string[];
    email: string | null;
  };
  scheduleOfEvents: {
    [year: number]: Array<{
      date: string;
      title: string;
      description?: string;
    }>;
  };
}

export const dclaimGroups: DclaimGroup[] = [
  {
    id: 1,
    name: "Catholic Faith Defenders (CFD)",
    coordinator: "Bro. Delio Betonio",
    mission: "A deeply active apologetics organization operating under the explicit mandate of the Second Plenary Council of the Philippines (PCP II No. 222) to defend Catholic doctrine against aggressive proselytization by other sects. The organization's mission centers entirely on theological defense and evangelization.",
    website: "https://cfddavao.wordpress.com",
    socialMedia: ["YouTube: Catholic Faith Defenders Panabo Chapter"],
    history: "Tracing its national origins to 1935 in Cebu, the CFD operates with a highly sophisticated digital and field preaching strategy. In Tagum, the Panabo Chapter operates a heavily trafficked YouTube channel with nearly 9,000 subscribers and tens of thousands of cumulative views, showcasing their primary events: public debates, plaza preaching, and publishing conversion stories.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 2,
    name: "Serra Club International",
    coordinator: "Mr. Bernardino Lapined",
    mission: "A globally recognized lay apostolate dedicated explicitly to its core mission: promoting and financially supporting vocations to the ministerial priesthood and consecrated life.",
    website: "https://serrainternational.org",
    socialMedia: [],
    history: "The Tagum Chapter operates under the direct international chaplaincy of Bishop Medil S. Aseo, D.D., with Fr. Marlon L. Pates serving as Assistant Chaplain. Recent communications (2024–2025) reveal the chapter's robust financial and operational capabilities, including the 'Buy a Parole (Star) Campaign,' which successfully raised PHP 500,000 to alleviate unpaid tuition fees of seminarians impacted by the pandemic. A 'Love Month' serenading campaign generated PHP 470,000 to fund a state-of-the-art sound system for the local seminary.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 3,
    name: "Light of Jesus (LoJ) / The Feast Tagum",
    coordinator: "To be assigned",
    mission: "Founded nationally by lay preacher Bo Sanchez, the Light of Jesus Family operates highly structured, weekly charismatic gatherings known as 'The Feast.' Their core mission is accessible, highly engaging charismatic evangelization.",
    website: "https://feast.ph/location/the-feast-tagum/",
    socialMedia: ["Facebook: The Feast Tagum"],
    history: "In Tagum, The Feast maintains a verified, consistent schedule of events, gathering every Sunday from 9:30 AM to 12:00 PM at Eloisa's Events Place on Lapu-Lapu Street. Distinctively, the Feast Tagum integrates the celebration of the Holy Mass with powerful charismatic worship and inspiring talks delivered primarily in the Bisayan vernacular, ensuring deep cultural resonance with the local population.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 4,
    name: "Lord's Flock Catholic Charismatic Community",
    coordinator: "To be assigned",
    mission: "A major international Catholic charismatic community focused on spiritual renewal and active evangelization.",
    website: "https://lordsflock.org",
    socialMedia: ["Email: help@lordsflock.org"],
    history: "While headquartered in Quezon City, the organization maintains a clearly documented missionary footprint in Mindanao, specifically holding local missions and establishing chapters in areas like Tagum. A verified major mission by the 'First Elders' to the Mindanao chapters occurred from August 11-14, 2023, establishing their historical and ongoing operational presence in the region.",
    contacts: {
      phones: [],
      email: "help@lordsflock.org"
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 5,
    name: "Healing Missionaries of the Holy Spirit (HMHS)",
    coordinator: "To be assigned",
    mission: "An active external ministry whose mission is providing specialized spiritual retreats, value-formation seminars, and team-building sessions.",
    website: "https://ajperez.ph",
    socialMedia: [],
    history: "Their footprint in the Diocese of Tagum is unique as it heavily intersects with institutional and civic spheres. Verified local clients in the Tagum region include the Local Government of Tagum City, the Local Government of Braulio Dujali, and regional entities like the Davao City Water District. This demonstrates how Catholic lay movements in Tagum frequently cross over into secular, civic, and governmental spheres, providing organizational development anchored in Christian ethical frameworks.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 6,
    name: "Banal na Pag-aaral (BNP)",
    coordinator: "To be assigned",
    mission: "A religious fraternity with historical presence in the region. Status: Requires pastoral verification.",
    website: null,
    socialMedia: [],
    history: "The Banal na Pag-aaral (BNP) presents a complex operational profile within the region. While historically established as a religious fraternity, public records indicate administrative irregularities. A corporate entity named 'Banal Na Pag-aaral, Inc.' faced official suspension of its Certificate of Incorporation by the Philippine Securities and Exchange Commission (SEC) in 2008 (SEC Number CN200818500). Its canonical standing within the current DCLAIM structure requires pastoral verification.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 7,
    name: "Adoracion Nocturna",
    coordinator: "To be assigned",
    mission: "A venerable apostolate dedicated to the nocturnal adoration of the Blessed Sacrament.",
    website: null,
    socialMedia: [],
    history: "Universally known as a venerable apostolate dedicated to the nocturnal adoration of the Blessed Sacrament. Specific data regarding the Tagum chapter's founding, leadership, or scheduling is being gathered through the diocesan curia.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 8,
    name: "Brotherhood of Christian Businessmen and Professionals (BCBP)",
    coordinator: "To be assigned",
    mission: "A prominent national corporate evangelization group focused on bringing Christ into the marketplace through fellowship and discipleship.",
    website: null,
    socialMedia: [],
    history: "A prominent national corporate evangelization group. The Tagum chapter coordinates through parish-level networks and the diocesan curia rather than centralized digital platforms.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 9,
    name: "Bukas Loob sa Dios (BLD)",
    coordinator: "To be assigned",
    mission: "A major Catholic charismatic covenant community dedicated to building a community of loving disciples.",
    website: null,
    socialMedia: [],
    history: "A major Catholic charismatic covenant community. Local operations coordinate through the Gagmayng Kristohanong Katilingban (GKK) system and parish-level networks.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 10,
    name: "Catholic Charismatic Renewal Apostolate (CCRA)",
    coordinator: "To be assigned",
    mission: "An umbrella organization coordinating charismatic renewal activities within the diocese, fostering personal spiritual renewal among the laity.",
    website: null,
    socialMedia: [],
    history: "Serves as an umbrella term for charismatic activities within the Diocese of Tagum, coordinating various charismatic movements and fostering spiritual renewal.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 11,
    name: "Catholic Women's League (CWL)",
    coordinator: "To be assigned",
    mission: "A ubiquitous parish-level organization globally dedicated to empowering Catholic women in service to the Church and community.",
    website: null,
    socialMedia: [],
    history: "A ubiquitous parish-level organization operating across the 89 parishes of the Diocese of Tagum, coordinating women's ministry and outreach programs in Davao del Norte.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 12,
    name: "Communitas Sancti Infantis (CSI)",
    coordinator: "To be assigned",
    mission: "A devotional community centered on the spirituality of the Holy Infant Jesus.",
    website: null,
    socialMedia: [],
    history: "Operating within the Diocese of Tagum as part of the devotional communities honoring the Santo Niño, reflecting the deep cultural veneration of the Holy Infant in the Philippine Church.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 13,
    name: "Confraternity of Perpetual Rosary Movement (CPRM)",
    coordinator: "To be assigned",
    mission: "A Marian devotional group dedicated to maintaining perpetual rosary prayer relays in honor of the Blessed Virgin Mary.",
    website: null,
    socialMedia: [],
    history: "A Marian devotional group maintaining perpetual rosary relays across the parishes of the diocese, supporting the deep Marian devotion characteristic of the Philippine Catholic Church.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 14,
    name: "Couples for Christ (CFC)",
    coordinator: "To be assigned",
    mission: "One of the largest Catholic family ministries globally, dedicated to renewing marriages and strengthening families through Christ-centered programs.",
    website: null,
    socialMedia: [],
    history: "CFC and its family ministries represent one of the largest Catholic lay movements globally. The Tagum chapter operates extensively at the GKK level, coordinating through localized community networks rather than centralized digital platforms.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 15,
    name: "Singles for Christ (SFC)",
    coordinator: "To be assigned",
    mission: "A ministry for single men and women, part of the Couples for Christ family, dedicated to helping singles live Christ-centered lives.",
    website: null,
    socialMedia: [],
    history: "As part of the Couples for Christ Family Ministries, Singles for Christ operates in Tagum through the parish and GKK network, providing fellowship and formation for single Catholics in the diocese.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 16,
    name: "Handmaids of the Lord",
    coordinator: "To be assigned",
    mission: "A ministry for mature women within the Couples for Christ family, dedicated to service and spiritual growth.",
    website: null,
    socialMedia: [],
    history: "Part of the Couples for Christ Family Ministries, the Handmaids of the Lord serve mature women in the Diocese of Tagum, operating through the parish and GKK infrastructure.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 17,
    name: "Daughters of Mary Immaculate International (DMII)",
    coordinator: "To be assigned",
    mission: "A prominent Catholic women's service organization dedicated to fostering Marian devotion and charitable works.",
    website: null,
    socialMedia: [],
    history: "A prominent Catholic women's service organization operating within the Diocese of Tagum, promoting Marian devotion and charitable activities through parish-level circles.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 18,
    name: "Divine Mercy",
    coordinator: "To be assigned",
    mission: "A devotional group dedicated to spreading the message of Divine Mercy as revealed to St. Faustina Kowalska.",
    website: null,
    socialMedia: [],
    history: "The devotion to the Divine Mercy is ubiquitous in the Philippines and strongly present in the Diocese of Tagum. The establishment of Sta. Faustina Quasi-Parish in Alejal, Carmen in 2017 reflects the growing devotion to Divine Mercy in the region.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 19,
    name: "El Shaddai",
    coordinator: "To be assigned",
    mission: "A massive charismatic movement focused on healing, spiritual renewal, and evangelization through Gawain (fellowship) gatherings.",
    website: null,
    socialMedia: [],
    history: "The massive charismatic movement led by Bro. Mike Velarde operates in the Diocese of Tagum through localized Gawain (fellowship) gatherings, serving the spiritual needs of its members in the Davao del Norte region.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 20,
    name: "Holy Infant Community of Jose Agusto Sison (HICJAS)",
    coordinator: "To be assigned",
    mission: "A devotional community honoring the Holy Infant Jesus within the Diocese of Tagum.",
    website: null,
    socialMedia: [],
    history: "Operating within the ecclesiastical framework of the Diocese of Tagum as part of the devotional communities centered on the Santo Niño spirituality.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 21,
    name: "Knights of Columbus (K of C)",
    coordinator: "To be assigned",
    mission: "A global Catholic fraternal service order dedicated to charity, unity, fraternity, and patriotism.",
    website: null,
    socialMedia: [],
    history: "A global Catholic fraternal service order with councils operating across the 89 parishes of the Diocese of Tagum, providing charitable services and fraternal support to Catholic families.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 22,
    name: "Legion of Mary",
    coordinator: "To be assigned",
    mission: "A highly structured, parish-based Marian organization dedicated to the sanctification of its members through prayer and active apostolate.",
    website: null,
    socialMedia: [],
    history: "A highly structured, parish-based Marian organization operating through praesidia across the parishes of the Diocese of Tagum, coordinating Marian devotion and apostolic work at the grassroots level.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 23,
    name: "Mother Butler Mission Guilds (MBMG)",
    coordinator: "To be assigned",
    mission: "An organization dedicated to creating liturgical vestments, altar linens, and sacred items for use in Divine Worship.",
    website: null,
    socialMedia: [],
    history: "An organization dedicated to making liturgical vestments and altar linens, serving the liturgical needs of the parishes and chapels throughout the Diocese of Tagum.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 24,
    name: "Pope's Worldwide Prayer Network (Apostleship of Prayer)",
    coordinator: "To be assigned",
    mission: "A worldwide organization promoting the daily offering of one's life for the mission of Christ and the Church through the Morning Offering.",
    website: null,
    socialMedia: [],
    history: "Historically a massive devotion emphasizing the Morning Offering, the Apostleship of Prayer continues to operate within the Diocese of Tagum, promoting daily prayer intentions set by the Holy Father.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 25,
    name: "Rosary of Our Lord (RooL)",
    coordinator: "To be assigned",
    mission: "A devotional group dedicated to promoting the praying of the Rosary and Marian devotion.",
    website: null,
    socialMedia: [],
    history: "Operating within the Diocese of Tagum as part of the vibrant Marian devotional life of the local Church, promoting the praying of the Holy Rosary.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 26,
    name: "St. Padre Pio",
    coordinator: "To be assigned",
    mission: "A devotional group dedicated to spreading the spirituality and devotion to St. Padre Pio of Pietrelcina.",
    website: null,
    socialMedia: [],
    history: "Devotion to Padre Pio is rapidly expanding globally, and within the Diocese of Tagum, devotees gather to honor the beloved Capuchin saint known for his stigmata and spiritual gifts.",
    contacts: {
      phones: [],
      email: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  }
];

export function getDclaimGroupById(id: string | number): DclaimGroup | undefined {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return dclaimGroups.find(g => g.id === numId);
}
