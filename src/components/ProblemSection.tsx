import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface ProblemAngle {
  quote: string;
  cards: { title: string; desc: string }[];
}

const angles: ProblemAngle[] = [
  {
    quote: "Je lanceert nieuwe diensten, maar intern loopt het vast.",
    cards: [
      {
        title: "De propositie klopt op papier — de uitvoering niet.",
        desc: "Teams missen richting en de competenties zijn er niet.",
      },
      {
        title: "Na de lancering valt iedereen terug",
        desc: "op de oude manier van werken. De verandering verdwijnt.",
      },
      {
        title: "Nieuwe diensten en organisatieverandering worden nooit samen opgepakt.",
        desc: "Tot nu.",
      },
    ],
  },
  {
    quote: "De wereld verandert razendsnel, jouw markt ook. Je diensten vragen herpositionering.",
    cards: [
      {
        title: "Klanten verwachten meer — maar je aanbod evolueert niet mee.",
        desc: "Wat vijf jaar geleden onderscheidend was, is vandaag commodity.",
      },
      {
        title: "Je voelt de druk van AI en digitalisering, maar weet niet waar te beginnen.",
        desc: "De technologie rent, de organisatie wandelt.",
      },
      {
        title: "Nieuw talent trekt naar concurrenten die sneller transformeren.",
        desc: "Zonder vernieuwde propositie verlies je niet alleen klanten, maar ook mensen.",
      },
    ],
  },
];

const ProblemSection = () => {
  const [activeAngle, setActiveAngle] = useState(0);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="section-label mb-10">
            HERKEN JE DIT?
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left — clickable quotes */}
            <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-4">
              {angles.map((angle, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAngle(i)}
                  className={`text-left rounded-lg p-5 transition-all duration-300 active:scale-[0.98] ${
                    activeAngle === i
                      ? "bg-ff-blue text-white shadow-lg"
                      : "bg-ff-light text-foreground hover:bg-ff-light-mint border border-border"
                  }`}
                >
                  <p
                    className={`text-lg md:text-xl font-heading font-semibold leading-snug italic ${
                      activeAngle === i ? "text-white" : "text-foreground"
                    }`}
                  >
                    "{angle.quote}"
                  </p>
                </button>
              ))}
            </motion.div>

            {/* Right — animated cards */}
            <div className="flex flex-col gap-5 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAngle}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-5"
                >
                  {angles[activeAngle].cards.map((c, i) => (
                    <div
                      key={i}
                      className="border border-border rounded-lg p-5 shadow-sm"
                      style={{ borderLeftWidth: 3, borderLeftColor: activeAngle === 0 ? "hsl(var(--ff-blue))" : "hsl(var(--ff-mint))" }}
                    >
                      <p className="font-heading font-semibold text-foreground mb-1">{c.title}</p>
                      <p className="text-muted-foreground text-sm">{c.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-muted-foreground text-lg font-heading font-medium">Herkenbaar?</span>
            <a
              href="/dri"
              className="inline-flex items-center gap-2 bg-ff-blue text-white font-heading font-semibold px-7 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-md"
            >
              Doe de Delivery Readiness Index
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
