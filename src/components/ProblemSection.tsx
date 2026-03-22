import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const cards = [
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
];

const ProblemSection = () => {
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
            {/* Left quote */}
            <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-2xl md:text-3xl font-heading font-semibold leading-snug text-foreground italic">
                "Je lanceert nieuwe diensten, maar intern loopt het vast."
              </p>
            </motion.div>

            {/* Right cards */}
            <div className="flex flex-col gap-5">
              {cards.map((c, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  className="border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="font-heading font-semibold text-foreground mb-1">{c.title}</p>
                  <p className="text-muted-foreground text-sm">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 text-muted-foreground"
          >
            Herkenbaar?{" "}
            <a href="/dri" className="text-primary underline underline-offset-4 hover:text-ff-mint transition-colors">
              Doe de Delivery Readiness Index en ontdek waar het wringt →
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
