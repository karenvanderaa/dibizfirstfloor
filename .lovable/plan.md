# Digitale transformatie expliciet maken

Op dit moment voelt de site té generiek "strategie + organisatie". Wat jullie écht doen, digitale transformatie van aanbod én organisatie, springt nergens uit. Voorstel: dit op een handvol scherpe plekken inbouwen, zonder de structuur of het visuele design om te gooien.

## 1 · HeroSection (src/components/HeroSection.tsx)

Headline scherper positioneren rond digitale transformatie.

- **H1 huidig:** "Een aanbod dat landt. Een organisatie die het kan waarmaken."
- **H1 nieuw:** "Digitale transformatie die landt. In uw aanbod én uw organisatie."
- **Subtitel nieuw:** "Wij ontwerpen uw digitale aanbod en de organisatie die het levert als één geheel. AI, data en nieuwe diensten, vertaald naar wat klanten kopen en wat uw mensen waarmaken."
- **Pills:** "First Floor × Dibiz" behouden, daaronder kleine tagline-pill toevoegen: `Digitale transformatie, end-to-end`.
- Checklist eerste item wordt: "Digitaal aanbod dat aansluit bij klant én markt".

## 2 · ProblemSection (de screenshot, src/components/ProblemSection.tsx)

Dit is de plek waar het nu het zwakst staat. Twee ingrepen:

**a. Tab-titels en intro herframen rond digitale transformatie:**

- Tab A label blijft "Mijn aanbod", titel wordt: **"Uw digitaal aanbod klopt niet meer."**
- Tab B label blijft "Mijn organisatie", titel wordt: **"Uw digitale strategie staat. Uw organisatie volgt niet."**
- Section label "HERKEN JE DIT?" krijgt subkop eronder (nieuwe `<p>`): "De digitale transformatie loopt vast, in uw aanbod of in uw organisatie. Vaak in allebei."

**b. Kaartteksten aanscherpen met digitaal/AI-vocabulaire (alleen tekst, kaart-structuur ongewijzigd):**

Tab A (Mijn aanbod):
- "Wat onderscheidend was, is commodity." → desc: "AI commoditiseert wat gisteren nog uniek was. Uw aanbod evolueert niet mee."
- "Klanten zien de digitale meerwaarde niet helder." → desc: "Sales kan het niet uitleggen. Wat digitaal beloofd wordt, sluit niet aan op wat geleverd wordt."
- "Pricing past niet bij een digitaal model." → desc: "Tarieven zijn gebouwd op uren, niet op waarde of data. Margebewaking ontbreekt."
- "Digitale diensten lanceren lukt, landen niet." → desc: "De nieuwe digitale dienst staat in het portfolio. Intern volgt de organisatie niet."

Tab B (Mijn organisatie):
- "Structuren ingericht voor wat u vroeger was." → desc: "Vestigingen als eilanden. Data zit verspreid. Beslissingen blijven hangen."
- "Rollen kloppen niet meer voor een digitale organisatie." → desc: "Mensen doen werk dat geautomatiseerd kan. Of missen de skills voor wat de organisatie wél nodig heeft."
- "Leiderschap zonder digitale hefbomen." → desc: "Directie wil digitaal transformeren. Middenkader trekt de oude lijn door."
- "Na elke digitale uitrol: terugval naar het oude." → desc: "Adoption blijft beperkt. Tools worden niet gebruikt. De winst verdwijnt."

CTA-rij onderaan ongewijzigd.

## 3 · AanpakSection (src/components/AanpakSection.tsx)

Twee subtiele woordwijzigingen, geen layout-aanpassing:

- Subtitel paragraaf: "Een geïntegreerd traject voor digitale transformatie, van marktaanbod tot verankering. Diagnose extern en intern lopen parallel. Pas wanneer beide scherp zijn, gaan we naar ontwerp en verankering."
- Fase 03 ("Ontworpen & gebouwd"), english subtitle wordt: "Digital service, business & organization design"

## 4 · OvertuigingSection (src/components/OvertuigingSection.tsx)

- H2 wordt: "Digitale transformatie vraagt geen generalisten. Wel specialisten die elkaar versterken."
- Mint italic regel wordt: "Want digitaal aanbod en digitale organisatie ontwerp je nooit los van elkaar."

## 5 · TeamSection (src/components/TeamSection.tsx)

Korte aanscherping van lead-rollen:

- Ellen: "Lead Digital service & business design"
- Karen: "Lead Digitale organisatie & mensen"
- Inleidende H2 tweede regel: "Wij verkopen expertise voor digitale transformatie, op maat en holistisch."

## 6 · StickyHeader (optioneel)

Onder logo-blok kan een micro-tagline staan: `Digitale transformatie, end-to-end`. Alleen op desktop, in subtiele muted color. Skip als jij vindt dat de header te druk wordt, dan laten we het bij hero.

## Wat ik NIET aanpas

- Geen nieuwe secties, geen nieuwe componenten.
- Geen wijzigingen aan FunnelStepsSection, KleurlogicaSection, TransformationScanSection, DRITeaser, ContactSection, Footer, ExitIntentPopup.
- Geen kleuren, fonts, spacing, animaties, Calendly-links of mailto's.
- Geen SEO meta-tags (kan in een volgende stap als je wil).

## Technisch

Pure tekstvervangingen in 5 componenten + optioneel 1 kleine markup-toevoeging in HeroSection (extra pill) en eventueel StickyHeader (micro-tagline span). Alle bestaande classes en structuur blijven staan.
