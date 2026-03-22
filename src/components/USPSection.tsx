import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const usps = [
  {
    icon: "📐",
    title: "Structuur volgt strategie",
    desc: "Geen org chart-oefening. Uw operating model wordt afgeleid van uw strategische intent — zodat uitvoering geen frictie kent.",
  },
  {
    icon: "🔬",
    title: "Diagnose, geen buikgevoel",
    desc: "Readiness-score, competentiematrix en rollenkaart. Objectieve data als basis voor gerichte actie.",
  },
  {
    icon: "🤝",
    title: "Twee expertises, één traject",
    desc: "Service design en organisatiedesign lopen van dag één samen. Geen gap tussen wat beloofd wordt en wat geleverd wordt.",
  },
  {
    icon: "🔒",
    title: "Verandering die beklijft",
    desc: "Wij bouwen change capacity als meetbaar bedrijfsactief. Adoptie, leiderschap en borging zitten in het traject — niet erna.",
  },
];

const USPSection = () => {
  return (
    <section className="bg-ff-light py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="visible" animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          <p }
            className="section-label mb-4"
          >
            WAAROM MET ONS
          </p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-12 max-w-lg"
          >
            Geen blabla.{" "}
            <span className="text-ff-mint">Wel impact.</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {usps.map((usp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.06,
                }}
                className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-2xl mb-3 block">{usp.icon}</span>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {usp.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {usp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPSection;
