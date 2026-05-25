import { motion } from "framer-motion";
import teamMeetingImg from "@/assets/team-meeting.jpg";
import operatingModelImg from "@/assets/operating-model.png";

interface Phase {
  num: string;
  title: string;
  subtitle?: string;
  english: string;
  label?: string;
  accent: string;
  items: string[];
}

const phases: Phase[] = [
  {
    num: "01",
    title: "Diagnose",
    english: "Strategische context & organisational readiness",
    label: "EXTERN + INTERN",
    accent: "#315EFF",
    items: [
      "Strategische context en ambitie",
      "Maturiteitsscan",
      "Change readiness",
      "Stakeholder- en weerstandsanalyse",
      "Cultuurscan",
      "Leiderschapsbereidheid",
      "Financieel kader",
    ],
  },
  {
    num: "02",
    title: "Ontworpen & gebouwd",
    english: "Business & organization design",
    accent: "#6CC1BF",
    items: [
      "Business model",
      "Operating model",
      "Procesarchitectuur",
      "IT-design & tooling",
      "Automatisatie & AI-integratie",
      "Organisational design",
      "Competentiematrix",
      "Leiderschap & governance",
    ],
  },
  {
    num: "03",
    title: "Verankerd",
    english: "Adoption & embedding",
    accent: "#A78BFA",
    items: [
      "Adoption & change management",
      "Skill-integratie",
      "Eigenaarschap & overdracht",
      "Feedback loops & KPI's",
      "Leiderschap in verankering",
      "Procesborging & ritme",
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
    {phase.label && (
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
        {phase.label}
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

const AanpakSection = () => {
  return (
    <section id="aanpak" className="bg-background py-12 md:py-16 scroll-mt-16">
      <div className="container">
        {/* Editorial intro: copy left, visual right */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center mb-14 md:mb-20">
          <div className="md:col-span-6 lg:col-span-7">
            <p className="section-label mb-4">ONZE AANPAK</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
              Het Executiekracht-model: diagnose, ontwerp, verankering.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">
              People, proces, tooling en structuur, geïntegreerd tot één geheel ten dienste van uw strategie.
            </p>
            <div className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-10 bg-ff-blue" />
              Eén model, drie fases, één resultaat
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 lg:col-span-5 relative"
          >
            {/* Decorative backdrop */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 md:-inset-6 rounded-2xl bg-gradient-to-br from-ff-blue/5 via-transparent to-ff-mint/10"
            />
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-ff-blue/40 rounded-tl-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-ff-mint/60 rounded-br-2xl"
            />
            <img
              src={operatingModelImg}
              alt="Het Executiekracht-model: van strategie via people, proces, structuur en tools naar resultaat"
              loading="lazy"
              className="relative w-full h-auto max-w-sm md:max-w-none mx-auto"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {phases.map((p) => (
            <PhaseCard key={p.num} phase={p} />
          ))}
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
                Één doorlopend traject, van diagnose tot verankering. Geen gap tussen wat beslist wordt en wat uitgevoerd wordt. Geen verandering die na het project verdwijnt.{" "}
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
