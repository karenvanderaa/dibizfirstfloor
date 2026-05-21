export type Dimension = {
  id: number;
  name: string;
  kernvraag: string;
  badge: "Ontwerpen" | "Bouwen aan mensen" | "Verankeren" | "Ontwerpen + Verankeren";
  service: string; // "Wat wij hierin doen" — specifieke beschrijving per dimensie
  questions: string[];
};

export const dimensions: Dimension[] = [
  {
    id: 1,
    name: "Strategische helderheid & urgentie",
    kernvraag: "Weten we waarom, en is dat gedeeld?",
    badge: "Ontwerpen",
    service: "Ontwerpen — Diagnose & richting, Organisatieontwerp",
    questions: [
      "Onze directie heeft een helder en gedeeld beeld van waar de organisatie over 3–5 jaar wil staan.",
      "De noodzaak om te transformeren is breed gedragen in de organisatie — niet alleen bij de top.",
      "We hebben maximaal drie concrete prioriteiten gedefinieerd die de transformatie sturen, en iedereen kent ze.",
      "Onze strategische keuzes zijn vertaald in meetbare doelstellingen met een duidelijke tijdshorizon.",
    ],
  },
  {
    id: 2,
    name: "Leiderschap & ownership",
    kernvraag: "Stuurt het leiderschap vanuit visie, of vanuit controle?",
    badge: "Bouwen aan mensen",
    service: "Bouwen aan mensen — Leiderschapstrajecten, Teamwerking",
    questions: [
      "Onze leidinggevenden nemen zichtbaar eigenaarschap over de transformatie — het is geen 'HR-project' of 'IT-project'.",
      "Het leiderschap durft beslissingen te nemen, ook als niet alle informatie beschikbaar is.",
      "Leidinggevenden delegeren verantwoordelijkheid én mandaat — niet alleen taken.",
      "Het managementteam investeert actief in de ontwikkeling van andere leiders in de organisatie.",
    ],
  },
  {
    id: 3,
    name: "Cultuur & verandervermogen",
    kernvraag: "Hoe snel pakt deze organisatie iets nieuws op?",
    badge: "Bouwen aan mensen",
    service: "Bouwen aan mensen — Leiderschapstrajecten, Skill based organisatie",
    questions: [
      "Medewerkers durven fouten te maken en die openlijk te bespreken, zonder angst voor afrekening.",
      "Als we iets nieuws invoeren, wordt dat binnen een redelijke termijn opgepakt door de brede organisatie — niet alleen door early adopters.",
      "Feedback geven en ontvangen is een structureel onderdeel van hoe wij werken, niet een incidenteel moment.",
      "De organisatie leert actief van eerdere verandertrajecten — we herhalen niet steeds dezelfde fouten.",
    ],
  },
  {
    id: 4,
    name: "Operating model & executiekracht",
    kernvraag: "Is de organisatie zo ingericht dat ze kán uitvoeren?",
    badge: "Ontwerpen",
    questions: [
      "Rollen, verantwoordelijkheden en besluitlijnen zijn helder belegd en voor iedereen zichtbaar — niet afhankelijk van informele paden.",
      "Onze kernprocessen zijn gedocumenteerd, gestandaardiseerd en worden regelmatig geëvalueerd — we draaien niet op impliciete kennis in de hoofden van een paar sleutelfiguren.",
      "We hebben bewust nagedacht over welke taken door mensen gedaan moeten worden en welke door technologie of AI-agents kunnen worden overgenomen.",
      "Beslissingen worden genomen op het juiste niveau — er is geen cultuur waarin alles escaleert naar de top.",
    ],
  },
  {
    id: 5,
    name: "Tooling & slimme automatisering",
    kernvraag: "Automatiseren we de juiste dingen?",
    badge: "Verankeren",
    questions: [
      "We kiezen technologie en tools op basis van een procesanalyse — niet op basis van wat IT of een leverancier interessant vindt.",
      "Onze data is schoon, gestructureerd en toegankelijk over systemen heen — er zijn geen silo's met handmatige koppelingen als standaard.",
      "We beoordelen bewust en systematisch welke processen zich lenen voor automatisering of AI-ondersteuning, in plaats van ad hoc te experimenteren.",
      "Als we een nieuw systeem of tool invoeren, investeren we evenveel in adoptie en training als in de technologie zelf.",
    ],
  },
  {
    id: 6,
    name: "Mensen, skills & samenwerking",
    kernvraag: "Zijn de juiste competenties aanwezig voor de toekomst?",
    badge: "Bouwen aan mensen",
    questions: [
      "We weten welke skills en competenties we nodig hebben om onze strategie waar te maken — en waar de grootste gaps zitten.",
      "Er wordt structureel geïnvesteerd in de ontwikkeling van medewerkers — niet alleen via trainingen, maar ook via coaching, feedback en on-the-job learning.",
      "Teams werken effectief samen over afdelings- en silo-grenzen heen wanneer dat nodig is voor het resultaat.",
      "Kennis en expertise worden actief gedeeld in de organisatie — niet opgepot door individuen of teams.",
    ],
  },
];

// interpretations[dimId][bandIdx 0..3]
export const interpretations: Record<number, string[]> = {
  1: [
    "De organisatie mist een gedeelde visie op de transformatie. De urgentie is niet voelbaar buiten de directiekamer. Zonder dit fundament wordt elke verandering een losstaand project dat strandt. Prioriteit: directie-alignment op waarom transformatie nodig is en wat de top-3 prioriteiten zijn.",
    "Er is een visie, maar die is niet breed vertaald naar concrete prioriteiten. Medewerkers ervaren de urgentie niet als de hunne. Het risico is dat veranderingen top-down worden opgelegd zonder draagvlak. Focus: de strategische keuzes vertalen naar maximaal 3 meetbare doelstellingen en die actief communiceren.",
    "De strategische richting is helder en redelijk breed gedragen. Er zijn concrete prioriteiten, maar de vertaling naar de dagelijkse praktijk kan scherper. Verdieping: toets of alle niveaus de prioriteiten kunnen benoemen en of ze vertaald zijn in team- en individuele doelen.",
    "Sterke strategische helderheid. De organisatie weet waarom ze transformeert en heeft dat vertaald in scherpe prioriteiten. Dit is een solide vertrekpunt. Aandachtspunt: blijf de strategie toetsen aan veranderende omstandigheden en vermijd dat helderheid omslaat in rigiditeit.",
  ],
  2: [
    "Het leiderschap neemt onvoldoende eigenaarschap over de transformatie. Er is een patroon van reactief gedrag: micromanagement, conflictvermijding of besluiteloosheid. Dit is het grootste plafond voor de organisatie. Organisaties schalen niet verder dan hun leiders. Prioriteit: individuele leiderschapsontwikkeling gericht op het herkennen van reactieve patronen.",
    "Er is bewustzijn maar de vertaling naar gedrag is inconsistent. Sommige leiders nemen eigenaarschap, anderen schuiven de transformatie door naar HR of IT. Sterke punten worden geneutraliseerd door reactieve patronen. Focus: het leiderschapsteam alignen op wat hun rol is in de transformatie — niet alleen inhoudelijk maar in gedrag.",
    "Het leiderschap toont overwegend eigenaarschap en durft te beslissen. Verbeterpunten zitten in het consequent delegeren van mandaat (niet alleen taken) en het actief ontwikkelen van de volgende generatie leiders. Verdieping: coach individuele leiders op hun specifieke reactieve patronen.",
    "Sterk creatief leiderschap. De directie neemt eigenaarschap, durft te beslissen, delegeert effectief en investeert in anderen. Aandachtspunt: naarmate de organisatie groeit, veranderen de eisen aan het leiderschap mee — blijf dat monitoren.",
  ],
  3: [
    "De organisatie heeft een lage verandersnelheid. Fouten worden afgestraft, feedback wordt vermeden, en eerdere veranderingen hebben littekens achtergelaten. Nieuwe initiatieven stuiten op wantrouwen. Prioriteit: werk eerst aan psychologische veiligheid op teamniveau voordat inhoudelijke veranderingen worden doorgevoerd.",
    "Er is bereidheid om te veranderen, maar het absorptievermogen is beperkt. Nieuwe werkwijzen worden opgepakt door early adopters maar niet door de brede organisatie. Feedback is incidenteel, niet structureel. Focus: implementeer een structureel feedbackmechanisme en investeer in het leervermogen van teams.",
    "De organisatie pakt veranderingen redelijk snel op. Er is psychologische veiligheid in de meeste teams, en er wordt geleerd van eerdere trajecten. Verdieping: maak het expliciet — welke lessen zijn er getrokken, en hoe worden die geborgd?",
    "Sterk verandervermogen. De organisatie leert snel, geeft en ontvangt feedback structureel, en heeft een cultuur waarin experimenteren normaal is. Aandachtspunt: bescherm deze cultuur actief — ze is kwetsbaar bij leiderschapswissels of grote reorganisaties.",
  ],
  4: [
    "Het operating model is historisch gegroeid, niet bewust ontworpen. Rollen en besluitlijnen zijn onduidelijk, processen zijn niet gedocumenteerd, en er is niet nagedacht over de verdeling van werk tussen mens en technologie. Dit is het structurele plafond van de organisatie. Prioriteit: voer een operating model review uit — breng structuur, rollen en besluitlijnen in kaart en confronteer die met wat de strategie vraagt.",
    "Er is structuur, maar die past niet bij de ambitie. Beslissingen escaleren te veel naar boven, kernprocessen draaien op impliciete kennis, en de vraag mens-versus-AI is niet gesteld. Focus: herdefinieer besluitlijnen en documenteer de 10 belangrijkste processen. Begin met het bewust in kaart brengen van taken die door AI-agents overgenomen kunnen worden.",
    "Het operating model is redelijk helder. Er zijn gedocumenteerde processen en duidelijke rollen. De volgende stap is het bewust ontwerpen van een workforce model waarin mens en AI samenwerken — niet als experiment maar als strategische keuze. Verdieping: piloteer een hybride team waar AI-agents taken overnemen.",
    "Sterk operating model met heldere rollen, besluitlijnen en procesvolwassenheid. De organisatie denkt bewust na over de verdeling mens/AI. Aandachtspunt: houd het model flexibel — een sterk operating model kan verstikken als het niet mee-evolueert met de strategie.",
  ],
  5: [
    "Tooling en automatisering worden ad hoc ingezet. Er is geen systematische beoordeling van welke processen zich lenen voor automatisering. Data zit in silo's. Het risico is groot: automatisering versterkt alles wat het raakt, inclusief kapotte processen en slechte data. Prioriteit: begin niet met tools maar met processen.",
    "Er zijn tools en er wordt geautomatiseerd, maar de keuzes zijn technologiegedreven, niet procesgedreven. De data-infrastructuur is onvoldoende geïntegreerd. Focus: verschuif van 'welke tool is er?' naar 'welk proces willen we verbeteren en wat is de beste manier om dat te doen?' Investeer in datakwaliteit en -integratie.",
    "De organisatie zet tooling bewust in op basis van procesanalyse. Data is redelijk toegankelijk. Er wordt nagedacht over AI-ondersteuning, maar dit is nog geen systematische praktijk. Verdieping: ontwikkel een automatiseringsstrategie die expliciet maakt welke processen geautomatiseerd worden, welke AI-ondersteund, en welke bewust mensenwerk blijven.",
    "Tooling en automatisering zijn strategisch verankerd. Data is schoon en geïntegreerd. Er is een bewuste strategie voor AI-inzet. Aandachtspunt: blijf investeren in adoptie en training — technologie is slechts zo goed als de mensen die ermee werken.",
  ],
  6: [
    "De organisatie heeft geen zicht op welke skills nodig zijn voor de toekomst. Ontwikkeling is ad hoc. Teams werken in silo's. Kennis zit opgesloten in individuen. Prioriteit: voer een skills mapping uit — welke competenties vraagt de strategie, waar zitten de gaps?",
    "Er is bewustzijn van de skills gap maar geen structurele aanpak. Ontwikkeling beperkt zich tot trainingen. Samenwerking over silo's is moeizaam. Focus: koppel ontwikkeling aan de strategische prioriteiten. Investeer in cross-functionele samenwerking — niet als waarde maar als werkwijze.",
    "De organisatie investeert structureel in ontwikkeling en weet waar de gaps zitten. Teams werken redelijk goed samen over grenzen heen. Verdieping: verschuif van 'skills ontwikkelen' naar 'skill based organiseren' — de competenties die de strategie vraagt als basis voor hoe werk georganiseerd wordt.",
    "Sterke ontwikkelingscultuur met structurele investeringen. Teams werken vloeiend samen. Kennis wordt actief gedeeld. Aandachtspunt: de skills die de toekomst vraagt verschuiven continu — houd de mapping actueel en anticipeer op AI-gerelateerde vaardigheidsverschuivingen.",
  ],
};

export const risks: Record<number, string> = {
  1: "Zonder gedeelde strategische helderheid stranden initiatieven in losstaande projecten en raakt de organisatie haar momentum kwijt.",
  2: "Reactief leiderschap is het plafond van de transformatie — sterke initiatieven worden geneutraliseerd door inconsistent gedrag aan de top.",
  3: "Een lage verandersnelheid maakt elke transformatie traag, duur en kwetsbaar voor terugval naar oude patronen.",
  4: "Een operating model dat niet bewust ontworpen is, verstikt executie — beslissingen escaleren, processen blokkeren en strategie blijft op papier.",
  5: "Automatisering versterkt alles wat het raakt — ook kapotte processen en vervuilde data. Zonder discipline groeit de schade mee met de investering.",
  6: "Zonder de juiste skills en samenwerking blijft de strategie een belofte — de uitvoering hangt af van een paar sleutelfiguren.",
};

export const firstSteps: Record<number, string> = {
  1: "Lijn directie uit op één gedeelde strategische narrative en vertaal die in maximaal drie meetbare prioriteiten met tijdshorizon.",
  2: "Start een gericht leiderschapstraject dat creative en reactive patronen blootlegt op individueel én teamniveau.",
  3: "Implementeer een structureel feedbackmechanisme op teamniveau en maak psychologische veiligheid expliciet meetbaar.",
  4: "Voer een operating model review uit: rollen, besluitlijnen en kernprocessen confronteren met wat de strategie vraagt.",
  5: "Stap weg van toolgedreven keuzes — begin met procesanalyse en bouw een automatiserings- en AI-strategie van daaruit.",
  6: "Maak een skills map die de strategie vertaalt naar concrete competenties en gebruik die als basis voor ontwikkeling én organisatieontwerp.",
};

export function bandIndex(score: number): 0 | 1 | 2 | 3 {
  if (score <= 2.0) return 0;
  if (score <= 3.0) return 1;
  if (score <= 4.0) return 2;
  return 3;
}

export const levelLabels = [
  "Niet klaar",
  "Fundament nodig",
  "Klaar met aandachtspunten",
  "Klaar om te schalen",
] as const;

export const levelColors = ["#EF4444", "#F59E0B", "#315EFF", "#10B981"] as const;

export function overallSummary(score: number, lowestDims: string[]): string {
  const b = bandIndex(score);
  const a = lowestDims[0] ?? "";
  const c = lowestDims[1] ?? "";
  if (b === 0)
    return `Uw organisatie mist op dit moment fundamentele voorwaarden voor een succesvolle transformatie. Dat is geen oordeel — het is een startpunt. De scan laat zien waar de basis gelegd moet worden. Wij raden aan om eerst te investeren in ${a} en ${c} voordat u inhoudelijke verandertrajecten start.`;
  if (b === 1)
    return `Er is bewustzijn en bereidheid, maar de vertaling naar structuur, gedrag en executie ontbreekt nog. Uw organisatie loopt het risico om transformaties te starten die niet landen. Gerichte interventies op ${a} en ${c} leveren het meeste rendement op.`;
  if (b === 2)
    return `Uw organisatie heeft een solide basis voor transformatie. Specifieke dimensies vragen verdieping, maar het fundament staat. Dit is het niveau waar gerichte trajecten het meeste verschil maken. Focus op ${a} om de volgende stap te zetten.`;
  return `Uw organisatie beschikt over de fundamenten om transformatie succesvol te laten landen. De focus verschuift van 'klaar maken' naar 'versnellen en verankeren'. Houd scherp oog op ${a} — ook sterke organisaties hebben blinde vlekken.`;
}
