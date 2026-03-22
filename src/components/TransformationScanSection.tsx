import { motion } from "framer-motion";
import teamHallwayImg from "@/assets/team-hallway.jpg";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

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
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="section-label mb-10">
            DE EERSTE STAP
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-10 mb-10">
            {/* Left — text */}
            <div>
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
                <div className="bg-ff-light-mint rounded-lg p-5 border border-ff-mint/20">
                  <p className="font-heading font-semibold text-sm text-ff-mint mb-2">Dibiz-lens</p>
                  <p className="text-sm leading-relaxed text-foreground">
                    Kloppen de diensten bij wat de markt vraagt? Zijn ze onderscheidend, uitvoerbaar en schaalbaar?
                  </p>
                </div>
                <div className="bg-ff-light-blue rounded-lg p-5 border border-ff-blue/20">
                  <p className="font-heading font-semibold text-sm text-ff-blue mb-2">First Floor-lens</p>
                  <p className="text-sm leading-relaxed text-foreground">
                    Klopt de organisatie bij de ambitie? Hebben de juiste mensen de juiste rollen en competenties?
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

            {/* Right — photo + price card */}
            <div className="flex flex-col gap-6">
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl overflow-hidden shadow-lg h-52 md:h-60"
              >
                <img
                  src={teamHallwayImg}
                  alt="Teamgesprek in de hal"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-ff-mint rounded-lg p-8 flex flex-col justify-center w-full">
                  <p className="text-white/70 text-sm mb-1">Vanaf</p>
                  <p className="text-white font-heading font-bold text-4xl md:text-5xl mb-2">€18.500</p>
                  <p className="text-ff-dark font-medium mb-1">4–5 weken</p>
                  <p className="text-white/70 text-sm mb-8">5 concrete deliverables</p>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-ff-mint font-heading font-semibold text-center px-6 py-3.5 rounded-md hover:bg-white/90 active:scale-[0.97] transition-all duration-150"
                  >
                    Vraag een vrijblijvende intake aan
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationScanSection;
