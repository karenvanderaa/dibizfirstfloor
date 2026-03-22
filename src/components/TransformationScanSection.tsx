import { motion } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const deliverables = [
  "Strategisch vertrekpunt",
  "Rollenkaart huidig vs. gewenst",
  "Competentiematrix",
  "Readiness-score",
  "Transformatie-roadmap 12 maanden",
];

const TransformationScanSection = () => {
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
            DE EERSTE STAP
          </motion.p>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left — 3 cols */}
            <div className="lg:col-span-3">
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4"
              >
                De Transformatie Scan
              </motion.h2>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg italic text-foreground mb-6 max-w-xl"
              >
                Klopt uw organisatie bij uw ambitie — en kunnen uw diensten de waarde leveren die u belooft?
              </motion.p>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-muted-foreground mb-8 max-w-xl leading-relaxed"
              >
                In 4–5 weken brengen wij in kaart of uw diensten de waarde leveren die u belooft, en of uw organisatie
                ingericht is om dat waar te maken. Geen rapport dat in een lade verdwijnt — een concrete roadmap voor de
                volgende 12 maanden.
              </motion.p>

              {/* Two lens cards */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid sm:grid-cols-2 gap-4 mb-8"
              >
                <div className="bg-ff-mint text-ff-dark rounded-lg p-5">
                  <p className="font-heading font-semibold text-sm mb-2">Dibiz-lens</p>
                  <p className="text-sm leading-relaxed opacity-80">
                    Kloppen de diensten bij wat de markt vraagt? Zijn ze onderscheidend, uitvoerbaar en schaalbaar?
                  </p>
                </div>
                <div className="bg-ff-blue text-white rounded-lg p-5">
                  <p className="font-heading font-semibold text-sm mb-2">First Floor-lens</p>
                  <p className="text-sm leading-relaxed opacity-90">
                    Klopt de organisatie bij de ambitie? Hebben de juiste mensen de juiste rollen en competenties om te
                    leveren?
                  </p>
                </div>
              </motion.div>

              {/* Deliverables */}
              <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap gap-2">
                {deliverables.map((d, i) => (
                  <span
                    key={i}
                    className="bg-ff-light text-foreground font-medium text-xs px-3 py-1.5 rounded-full border border-border"
                  >
                    {d}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — price card, blue bg */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 flex"
            >
              <div className="bg-ff-blue rounded-lg p-8 flex flex-col justify-center w-full">
                <p className="text-white/70 text-sm mb-1">Vanaf</p>
                <p className="text-white font-heading font-bold text-4xl md:text-5xl mb-2">€18.500</p>
                <p className="text-ff-mint font-medium mb-1">4–5 weken</p>
                <p className="text-white/60 text-sm mb-8">5 concrete deliverables</p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-ff-blue font-heading font-semibold text-center px-6 py-3.5 rounded-md hover:bg-white/90 active:scale-[0.97] transition-all duration-150"
                >
                  Vraag een vrijblijvende intake aan
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationScanSection;
