import teamHallwayImg from "@/assets/team-hallway.jpg";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

const deliverables = [
  "Service design",
  "Organisational design",
  "Strategisch vertrekpunt",
  "Rollenkaart huidig vs. gewenst",
  "Competentiematrix",
  "Readiness-score",
  "Transformatie-roadmap 12 maanden",
];

const TransformationScanSection = () => {
  return (
    <section id="scan" className="bg-background py-16 md:py-24 scroll-mt-16">
      <div className="container">
        <p className="section-label mb-10">DE EERSTE STAP</p>

        <div className="grid lg:grid-cols-2 gap-10 mb-10">
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
              De Transformatie Scan
            </h2>
            <p className="text-lg italic text-foreground mb-6 max-w-xl">
              Klopt uw aanbod bij wat de markt vraagt — en is uw organisatie ingericht om dat ook waar te maken?
            </p>
            <p className="text-muted-foreground mb-8 max-w-xl leading-relaxed">
              In 4–5 weken brengen wij in kaart of uw aanbod de waarde levert die u belooft, en of uw organisatie
              ingericht is om dat waar te maken. Geen rapport dat in een lade verdwijnt — een concrete roadmap voor de
              volgende 12 maanden.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-ff-light-mint rounded-lg p-5 border border-ff-mint/20">
                <p className="font-heading font-semibold text-sm text-ff-mint mb-2">Dibiz-lens</p>
                <p className="text-sm leading-relaxed text-foreground">
                  Klopt uw aanbod bij wat de markt vraagt? Is het onderscheidend, uitvoerbaar en schaalbaar?
                </p>
              </div>
              <div className="bg-ff-light-blue rounded-lg p-5 border border-ff-blue/20">
                <p className="font-heading font-semibold text-sm text-ff-blue mb-2">First Floor-lens</p>
                <p className="text-sm leading-relaxed text-foreground">
                  Klopt de organisatie bij de ambitie? Hebben de juiste mensen de juiste rollen en competenties?
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {deliverables.map((d, i) => (
                <span key={i} className="bg-ff-light text-foreground font-medium text-xs px-3 py-1.5 rounded-full border border-border">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl overflow-hidden shadow-lg h-52 md:h-60">
              <img src={teamHallwayImg} alt="Teamgesprek in de hal" className="w-full h-full object-cover" />
            </div>

            <div className="bg-ff-mint rounded-lg p-8 flex flex-col justify-center w-full">
              <p className="text-white/70 text-sm mb-1">Vanaf</p>
              <p className="text-white font-heading font-bold text-4xl md:text-5xl mb-2">€18.500</p>
              <p className="text-ff-dark font-medium mb-1">4–5 weken</p>
              <p className="text-white/70 text-sm mb-8">7 concrete deliverables</p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-ff-mint font-heading font-semibold text-center px-6 py-3.5 rounded-md hover:bg-white/90 active:scale-[0.97] transition-all duration-150"
              >
                Vraag een vrijblijvende intake aan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationScanSection;
