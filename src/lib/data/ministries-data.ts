// Ministries & Apostolates Data - Diocese of Tagum

export interface Ministry {
  id: string;
  name: string;
  coordinator: string;
  description: string;
  mission: string;
  history: string;
  contacts: {
    phones: string[];
    email: string | null;
  };
  links: {
    website: string | null;
    youtube: string | null;
    facebook: string | null;
    radio: string | null;
  };
  scheduleOfEvents: {
    [year: number]: Array<{
      date: string;
      title: string;
      description?: string;
    }>;
  };
}

export const ministriesData: Ministry[] = [
  {
    id: 'm1',
    name: "Diocesan Bible Apostolate",
    coordinator: "Mr. Jose Alverio",
    description: "Promotes love for Sacred Scripture through Bible studies, seminars, and parish formation programs that help the faithful deepen their relationship with the Word of God.",
    mission: "Operating at the vanguard of scriptural literacy, the Bible Apostolate focuses on experiential scripture engagement rather than purely academic exegesis. The apostolate emphasizes encountering the Word as a dynamic, cultural action—describing it as being 'like water that flows from the mountain'—reflecting an ongoing effort to tailor biblical pedagogy to the highly expressive, kinetic cultural realities of the local populace.",
    history: "The Diocesan Bible Apostolate operates under the Prophetic Cluster of the Diocese of Tagum, with clerical direction from Fr. Ben Jerson Cañete. A prime indicator of their progressive methodology is the recent integration of the 'Dancing Bible' retreat workshops, which utilize physical movement, indigenous dance, and psychodrama to internalize scriptural narratives.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm2',
    name: "Diocesan Commission for the Pastoral Care of Migrants and Itinerant People",
    coordinator: "Fr. Bobby Castillo",
    description: "Accompanies overseas workers and displaced individuals, ensuring they receive pastoral guidance, moral support, and the sacraments wherever they are.",
    mission: "With the Philippine economy structurally reliant on the remittances of Overseas Filipino Workers (OFWs), the social fabric of rural provinces like Davao del Norte has been radically altered by absentee parenting, family dissolution, and international human trafficking. This commission offers direct intervention, legal advocacy, and psychological support for both the OFWs and the families left behind.",
    history: "A defining event illustrating their methodology was the celebration of the 108th World Day of Migrants and Refugees held at the Queen of Apostles College Seminary (QACS) in Tagum on September 25, 2022. Collaborating with Scalabrinian nuns (specifically Sr. Noemie E. Digo) and dozens of parish-level coordinators, the ministry provided a safe platform for returning OFWs from Davao del Norte and Davao de Oro to publicly testify regarding their experiences. The commission operates essentially as a localized crisis intervention network and human rights advocacy group.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm3',
    name: "Diocesan Commission on Catechesis",
    coordinator: "Ms. Estelita Garcia",
    description: "Focuses on faith education and formation, training catechists and developing programs for children, youth, and adults to strengthen Catholic understanding.",
    mission: "Tasked with foundational faith formation, the Catechetical commission faces the monumental logistical challenge of educating an exploding youth demographic across both urban centers and mountainous rural terrains. The commission employs a layered coordination strategy—one handling diocesan-level administrative liaison and the other directing fieldwork execution among the thousands of volunteer GKK catechists.",
    history: "The commission relies on the infrastructure of the Christian Formation Center (CFC), an institution dating back to the 1970s, designed specifically to systematically train native catechists to operate autonomously in remote chapels. This was established during the Maryknoll era to address the critical shortage of priests in the region. Clerical direction is provided by Fr. Vicente L. Arado Jr.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm4',
    name: "Diocesan Commission on New Evangelization",
    coordinator: "Fr. Marc Leo Celada",
    description: "Responds to the call of the Church for renewed missionary zeal through creative evangelization, media, and parish renewal movements.",
    mission: "This commission represents a direct response to global ecclesiastical mandates to re-evangelize increasingly secularized, nominal, or disenfranchised Catholic populations. 'New Evangelization' in Tagum is tightly coupled with the strategic establishment of new mission areas and the rapid elevation of burgeoning chapels into functional quasi-parishes to manage population density and urban sprawl.",
    history: "Fr. Marc Leo Celada concurrently serves in quasi-parish capacities, such as assisting at the Mary Mediatrix of All Grace Quasi-Parish in Panabo. This dual role—balancing quasi-parish administration with diocesan evangelization strategies—demonstrates the integrated approach of evangelization in the Diocese of Tagum.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm5',
    name: "Diocesan Commission on Family and Life",
    coordinator: "Mr. and Mrs. Jane and Allan Crausos",
    description: "Upholds the sanctity of marriage and family life through seminars, counseling, and formation programs inspired by the teachings of St. John Paul II.",
    mission: "This commission tackles the volatile intersection of Catholic moral theology and contemporary family crises. The operational scope frequently involves combating the psychosocial strains of poverty, navigating the moral and political complexities of reproductive health policies, and solidifying marital validity within the GKKs.",
    history: "Coordinated by a married couple and directed by Fr. Joseph D. Armamento, the presence of lay couple-coordinators is a strategic necessity; it provides experiential credibility and empathetic connection when conducting marriage formation programs that a celibate clerical director simply cannot offer firsthand.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm6',
    name: "Diocesan Council of Lay Apostolates and Integrated Movements (DCLAIM)",
    coordinator: "Mrs. Emma Peligro",
    description: "Unites all lay organizations and movements in the Diocese to foster active lay participation in Church life and mission.",
    mission: "DCLAIM serves as the umbrella regulatory and coordinating body for all trans-parochial charismatic, mandated, and integrated lay organizations operating within the diocese (e.g., Knights of Columbus, Catholic Women's League, Legion of Mary, Couples for Christ). Mrs. Peligro ensures that these highly active, well-funded, and sometimes fiercely independent movements align strictly with the bishop's overarching pastoral agenda.",
    history: "DCLAIM's logistical capacity is massive and indispensable. During major diocesan events like the DADITAMA Youth Convention, DCLAIM members act as the primary intercessors, security liaisons, and logistical facilitators, proving conclusively that these lay movements provide the operational muscle for large-scale diocesan execution. The council operates under the Priestly Cluster.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm7',
    name: "Diocesan Lay Ministers on Liturgy – Kaabag",
    coordinator: "Mr. Cecillio Medellin",
    description: "Serves in the liturgical life of the Church, assisting priests in the celebration of the Eucharist and bringing Holy Communion to the sick and elderly.",
    mission: "The term 'Kaabag' translates from Cebuano as 'helper' or 'assistant.' The Kaabag are the elite corps of Eucharistic Lay Ministers who form the absolute liturgical backbone of the GKK system. Because the 143 diocesan priests cannot physically visit all 89 parishes and their thousands of sub-chapels every Sunday, the Kaabag are highly trained, canonically deputized, and dispatched to conduct Liturgy of the Word services and distribute pre-consecrated communion.",
    history: "Mr. Medellin's role involves stringent theological formation, complex logistical scheduling, and standardizing the liturgical conduct of these ministers, ensuring that doctrinal integrity and reverence are maintained perfectly in the physical absence of the ordained clergy. The ministry operates under the Priestly Cluster with clerical direction from Fr. Ben Jerson M. Cañete.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm8',
    name: "Diocesan Health Apostolate",
    coordinator: "Sr. Mary Jean Ortega",
    description: "Extends pastoral care to the sick, medical professionals, and health institutions, integrating healing ministry with faith and compassion.",
    mission: "The Health Apostolate operates distinctly as a 'Community-Based Health Program' embedded at the absolute grassroots level. Rather than building massive centralized hospitals, the apostolate trains lay health workers within the individual GKKs to administer primary care, promote scientifically validated herbal medicine protocols, and teach preventative hygiene in areas where government health infrastructure is practically nonexistent or financially inaccessible.",
    history: "Led operationally by religious sisters—specifically Sr. Mary Jean Ortega alongside Sr. Elna Portillo—and directed by Fr. Jestoni Llanera, the apostolate addresses the severe disparities in rural healthcare access. They operate under the holistic theological framework that physical healing is intrinsically linked to the restorative, life-giving message of the Gospel. The ministry is part of the Kingly Cluster.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm9',
    name: "Diocesan Social Action Ministry",
    coordinator: "Mrs. Arlene Rey",
    description: "The social arm of the Diocese that responds to poverty, injustice, and environmental issues through community outreach, relief operations, and advocacy.",
    mission: "The Social Action Ministry engages directly with poverty alleviation, disaster response, and systemic injustice. Operating in strict alignment with national Caritas Philippines directives, the ministry is transitioning from a model of reactive charity to proactive community empowerment, ensuring that aid is delivered not just with a 'pure heart,' but with systemic efficiency and maximum dignity for the poor.",
    history: "Directed by Fr. Jojit M. Besinga, recent macro-level ecclesiastical developments, such as the opening of the Catholic Church's first 'social action academy' (the Center for Resiliency, Empowerment, and Integral Development) in Tagaytay City by Cardinal Luis Antonio Tagle, directly impact Tagum's personnel. Mrs. Rey's coordination ensures that local Social Action workers receive advanced, professionalized training in resiliency and humanitarian response.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm10',
    name: "Diocesan Youth Apostolate",
    coordinator: "Mr. Warren Felix",
    description: "Forms and empowers the youth as responsible Christian leaders, fostering spiritual growth through camps, parish youth ministries, and diocesan gatherings.",
    mission: "With Mindanao possessing a pronounced youth demographic, the DYA is arguably one of the most operationally intense and well-resourced ministries in the diocese. The DYA operates not just at the diocesan level but serves as a crucial architectural hub for sub-regional mobilization, demonstrating nuanced understanding that modern evangelization requires explicitly addressing the escalating mental health crisis among rural and semi-urban youth.",
    history: "A defining achievement under Mr. Felix's coordination was the execution of the massive 5th DADITAMA (Davao, Digos, Tagum, Mati) Youth Convention, held from June 7 to 9, 2024, at the Queen of Apostles College Seminary. Themed 'DADITAMA Youth: Joyful in Hope,' the event moved beyond traditional spiritual retreats by integrating contemporary sociological crises, including a plenary session on 'Hinga: Mental Health and Soul-Caring' by Dr. Mary Fil M. Bauyot. Clerical direction is provided by Fr. Jhoniel D. Poliquit.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm11',
    name: "Diocese of Tagum Social Communications Ministry (DITASCOM)",
    coordinator: "Fr. Joben Planteras",
    description: "Manages diocesan media and digital communications, promoting evangelization through radio, livestreams, and online platforms.",
    mission: "Operating at the critical intersection of media, public relations, and mission, DITASCOM controls the narrative and informational distribution for the diocese. The ministry maintains an aggressive digital and physical presence, ensuring financial viability while controlling the means of mass communication to project audio homilies, liturgical events, and pastoral programs deep into remote areas inaccessible by physical infrastructure.",
    history: "A major subsidiary of this ministry is the Diocesan Printing Press (DPPPI). Under Fr. Planteras, DPPPI functions as a strategic, self-sustaining social enterprise, explicitly designed to bridge 'business professionalism and ecclesial mission.' By providing affordable, high-quality printing services for educational, liturgical, and commercial materials across Mindanao, DITASCOM ensures financial viability. DITASCOM collaborates tightly with DXGN 89.9 Spirit FM to reach isolated communities.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: "https://dpppi.net/",
      youtube: "https://www.youtube.com/@DXGN899SpiritFM",
      facebook: null,
      radio: "DXGN 89.9 Spirit FM"
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm12',
    name: "Gagmay'ng Kristohanong Katilingban (GKK)",
    coordinator: "Mr. Leo Pontilar",
    description: "The basic ecclesial communities of the Diocese—small groups of faithful who gather for prayer, reflection, and service, forming the Church at the grassroots.",
    mission: "The GKK is not an apostolate in the traditional sense; it is the fundamental 'way of being Church' in the Diocese of Tagum. Governed locally by chapel-based organizations rather than centralized parish structures, a standard GKK consists of 25 to 50 localized families residing in a specific rural enclave or urban neighborhood. This micro-scale grouping is designed intentionally to foster interpersonal accountability, shared spiritual engagement, and mutual socioeconomic support.",
    history: "Decades before the Second Plenary Council of the Philippines (PCP II) mandated Basic Ecclesial Communities nationwide in 1991, Tagum served as the experimental laboratory for this radical ecclesiological shift, pioneered by Maryknoll missionaries in the late 1960s. In 1976, the Prelature Pastoral Planning Assembly (PPPA) formally declared the building of GKK as the definitive pastoral thrust of the territory. As Fr. Emmanuel Nabayra noted: 'When a kapilya organization has too many members, only a few are involved in its growth; a small kapilya organization is lively because all its members have an assignment to do.'",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm13',
    name: "Indigenous People's Apostolate",
    coordinator: "Mrs. Cynthia Masinaring",
    description: "Advocates for the spiritual and cultural preservation of indigenous communities, promoting justice and respect for ancestral traditions in light of the Gospel.",
    mission: "The provinces of Davao del Norte and Davao de Oro encompass the ancestral domains of numerous Lumad (indigenous) tribes, including the Mansaka, Mandaya, and Ata-Manobo. This apostolate exists to provide 'comprehensive pastoral care for the ethnic tribes.' This care goes far beyond mere spiritual conversion or liturgical inculturation—it fundamentally involves political advocacy, protecting indigenous land rights against aggressive commercial mining concessions and corporate agricultural expansion.",
    history: "Directed by Rev. Fr. Novie Fernand Bagnaan, the history of the diocese demonstrates that the early Maryknoll missionaries prioritized this demographic, creating the Apostolate for Cultural Communities (ACC) in the 1970s to ensure that indigenous integration into the broader Catholic community did not result in cultural erasure or economic exploitation. Mrs. Masinaring continues this complex, often politically dangerous advocacy today. The ministry operates under the Kingly Cluster.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  },
  {
    id: 'm14',
    name: "Ministry on Ecology and Diocesan Farmers Apostolate (Eco-farmers Apostolate)",
    coordinator: "Mr. Ian Gallo",
    description: "Promotes stewardship of creation, organic farming, and environmental awareness grounded in Pope Francis' Laudato Si'.",
    mission: "The local economy of the diocese is fiercely agrarian, dominated by massive banana plantations, coconut farms, and rice paddies. This renders the local population highly susceptible to climate change, devastating typhoons, and the severe health impacts of unregulated pesticide poisoning by multinational agricultural corporations. The region also faces intense ecological threats from both legal and illegal mining operations in Davao de Oro. Mr. Gallo's coordination focuses on advancing sustainable agricultural practices, promoting food sovereignty, and resisting ecologically destructive resource extraction.",
    history: "By explicitly merging 'Ecology' and the 'Farmers Apostolate' into a single, unified ministerial body, the diocese astutely acknowledges that in Mindanao, environmental degradation and agrarian poverty are not separate issues, but structurally inseparable crises demanding a unified pastoral response. The ministry operates synergistically with the Indigenous People's Apostolate under the Kingly Cluster.",
    contacts: {
      phones: [],
      email: null
    },
    links: {
      website: null,
      youtube: null,
      facebook: null,
      radio: null
    },
    scheduleOfEvents: {
      2026: [],
      2027: []
    }
  }
];

export function getMinistryById(id: string): Ministry | undefined {
  return ministriesData.find(m => m.id === id);
}
