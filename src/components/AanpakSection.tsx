import teamMeetingImg from "@/assets/team-meeting.jpg";

interface Phase {
  num: string;
  title: string;
  subtitle?: string;
  english: string;
  accent: string;
  items: string[];
}

const diagnose: Phase[] = [
  {
    num: "01",
    title: "Marktklaar",
    english: "Market & business fit",
    subtitle: "Extern",
    accent: "#F59E0B",
    items: ["Strategie & ambitie", "Go-to-market", "Product-market fit", "Marktanalyse & data", "Pricing & financieel"],
  },
  {
    num: "02",
    title: "Voorbereid",
    english: "Organisational readiness",
    subtitle: "Intern",
    accent: "#315EFF",
    items: ["Maturiteitsscan", "Change readiness", "Stakeholder & weerstand", "Cultuurscan", "Leiderschapsbereidheid"],
  },
];

const realisatie: Phase[] = [
  {
    num: "03",
    title: "Ontworpen & gebouwd",
    english: "Digital service, business & organization design",
    accent: "#6CC1BF",
    items: [
      "Service design",
      "Business model",
      "Operating model",
      "Procesarchitectuur (Dibiz)",
      "IT-design (Dibiz)",
      "Organisational design (FF)",
      "Competentiematrix (FF)",
      "Leiderschap (FF)",
    ],
  },
  {
    num: "04",
    title: "Verankerd",
    english: "Adoption & embedding",
    accent: "#A78BFA",
    items: [
      "Adoption & change mgmt",
      "Skill-integratie",
      "Eigenaarschap & overdracht",
      "Feedback loops & KPI's",
      "Leiderschap (FF)",
      "Procesborging (Dibiz)",
    ],
  },
];

const PhaseCard = ({ phase }: { phase: Phase }) => (
  <div
    className="bg-white rounded-lg p-6 border-t-4 border border-border shadow-sm flex-1"
    style={{ borderTopColor: phase.accent }}
  >
    <div className="flex items-baseline gap-3 mb-1">
      <span className="font-heading font-bold text-2xl" style={{ color: phase.accent }}>
        {phase.num}
      </span>
      <h4 className="font-heading font-bold text-foreground text-base">{phase.title}</h4>
    </div>
    {phase.subtitle && (
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
        {phase.subtitle}
      </p>
    )}
    <p className="text-xs italic text-muted-foreground mb-4">{phase.english}</p>
    <ul className="space-y-1.5">
      {phase.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
          <span
            className="mt-1.5 w-1 h-1 rounded-full shrink-0"
            style={{ background: phase.accent }}
          />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Zone = ({ label, phases }: { label: string; phases: Phase[] }) => (
  <div
    className="rounded-xl p-5 md:p-6 bg-ff-light"
    style={{ border: "2px dashed hsl(var(--border))" }}
  >
    <p className="section-label mb-4 text-foreground/60">{label}</p>
    <div className="grid sm:grid-cols-2 gap-4">
      {phases.map((p) => (
        <PhaseCard key={p.num} phase={p} />
      ))}
    </div>
  </div>
);

const AanpakSection = () => {
  return (
    <section id="aanpak" className="bg-background py-16 md:py-24 scroll-mt-16">
      <div className="container">
        <p className="section-label mb-4">ONZE AANPAK</p>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3 max-w-2xl">
          Vier fases. Twee parallelle fundamenten.
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl leading-relaxed">
          Een geïntegreerd traject voor digitale transformatie, van marktaanbod tot verankering. Diagnose extern en intern lopen parallel. Pas wanneer beide scherp zijn, gaan we naar ontwerp en verankering.
        </p>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          <Zone label="DIAGNOSE, twee parallelle analyses" phases={diagnose} />

          {/* Chevron */}
          <div className="flex items-center justify-center py-2 lg:py-0">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="text-ff-mint rotate-90 lg:rotate-0"
              aria-hidden="true"
            >
              <path
                d="M14 8L26 20L14 32"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <Zone label="REALISATIE, bouwen en verankeren" phases={realisatie} />
        </div>

        {/* Callout */}
        <div className="mt-10 bg-ff-blue text-white rounded-lg p-5 md:p-6 flex items-start gap-3">
          <span className="text-xl leading-none" aria-hidden="true">⇋</span>
          <p className="leading-relaxed">
            <strong className="font-heading font-bold">Flexibele instap.</strong>{" "}
            Niet elke klant doorloopt alle fases. We starten waar uw vraag begint.
          </p>
        </div>
      </div>

      {/* Full-width quote band */}
      <div className="bg-ff-blue mt-16">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 py-14 px-8 md:px-16 flex items-center">
            <div className="max-w-2xl">
              <p className="text-white text-lg md:text-xl leading-relaxed">
                Één doorlopend traject, van marktaanbod tot organisatie. Geen gap tussen wat beloofd wordt en wat geleverd wordt. Geen verandering die na het project verdwijnt.{" "}
                <strong className="font-bold text-ff-mint">Wij noemen dat geen consultancy. Wij noemen dat fixen.</strong>
              </p>
            </div>
          </div>
          <div className="md:col-span-2 h-64 md:h-auto">
            <img src={teamMeetingImg} alt="Team in overleg" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AanpakSection;
