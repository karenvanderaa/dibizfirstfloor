import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  key: "aanbod" | "organisatie";
  label: string;
  title: string;
  accent: "ff-blue" | "ff-mint";
  cards: { title: string; desc: string }[];
}

const tabs: Tab[] = [
  {
    key: "aanbod",
    label: "Mijn aanbod",
    title: "Uw digitaal aanbod klopt niet meer.",
    accent: "ff-blue",
    cards: [
      {
        title: "Wat onderscheidend was, is commodity.",
        desc: "AI commoditiseert wat gisteren nog uniek was. Uw aanbod evolueert niet mee.",
      },
      {
        title: "Klanten zien de digitale meerwaarde niet helder.",
        desc: "Sales kan het niet uitleggen. Wat digitaal beloofd wordt, sluit niet aan op wat geleverd wordt.",
      },
      {
        title: "Pricing past niet bij een digitaal model.",
        desc: "Tarieven zijn gebouwd op uren, niet op waarde of data. Margebewaking ontbreekt.",
      },
      {
        title: "Digitale diensten lanceren lukt, landen niet.",
        desc: "De nieuwe digitale dienst staat in het portfolio. Intern volgt de organisatie niet.",
      },
    ],
  },
  {
    key: "organisatie",
    label: "Mijn organisatie",
    title: "Uw digitale strategie staat. Uw organisatie volgt niet.",
    accent: "ff-mint",
    cards: [
      {
        title: "Structuren ingericht voor wat u vroeger was.",
        desc: "Vestigingen als eilanden. Data zit verspreid. Beslissingen blijven hangen.",
      },
      {
        title: "Rollen kloppen niet meer voor een digitale organisatie.",
        desc: "Mensen doen werk dat geautomatiseerd kan. Of missen de skills voor wat de organisatie wél nodig heeft.",
      },
      {
        title: "Leiderschap zonder digitale hefbomen.",
        desc: "Directie wil digitaal transformeren. Middenkader trekt de oude lijn door.",
      },
      {
        title: "Na elke digitale uitrol: terugval naar het oude.",
        desc: "Adoption blijft beperkt. Tools worden niet gebruikt. De winst verdwijnt.",
      },
    ],
  },
];

const ProblemSection = () => {
  const [active, setActive] = useState<Tab["key"]>("aanbod");
  const current = tabs.find((t) => t.key === active)!;
  const accentColor = current.accent === "ff-blue" ? "hsl(var(--ff-blue))" : "hsl(var(--ff-mint))";

  return (
    <section id="probleem" className="bg-background py-14 md:py-24 scroll-mt-16">
      <div className="container">
        <p className="section-label mb-3">HERKEN JE DIT?</p>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
          De digitale transformatie loopt vast. In uw aanbod of in uw organisatie. Vaak in allebei.
        </p>

        {/* Tabs */}
        <div className="inline-flex bg-ff-light rounded-lg p-1 mb-10 border border-border">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-5 py-2.5 rounded-md font-heading font-semibold text-sm transition-all duration-200 ${
                active === t.key
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 max-w-2xl leading-snug">
              {current.title}
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
              {current.cards.map((c, i) => (
                <div
                  key={i}
                  className="border border-border rounded-lg p-5 shadow-sm bg-white"
                  style={{
                    borderLeftWidth: 3,
                    borderLeftColor: accentColor,
                  }}
                >
                  <p className="font-heading font-semibold text-foreground mb-1">
                    {c.title}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-muted-foreground text-lg font-heading font-medium">
            Herkenbaar?
          </span>
          <a
            href="/dri"
            className="inline-flex items-center gap-2 bg-ff-blue text-white font-heading font-semibold px-7 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-md"
          >
            Doe de Delivery Readiness Index
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
