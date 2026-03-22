import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const steps = [
  {
    num: "01",
    title: "Opstart · Diagnose & richting",
    items: [
      "Value & service design (Dibiz)",
      "Organisatieanalyse (First Floor)",
      "Bevindingen samenleggen",
      "Gezamenlijke roadmap",
    ],
  },
  {
    num: "02",
    title: "Traject · Uitvoering & verandering",
    items: [
      "Servicedesign uitwerken",
      "Organisatiestructuur herdenken",
      "Rollen & competenties hertekenen",
      "Change management integreren",
    ],
  },
  {
    num: "03",
    title: "Verankeren · Borging & zelfstandigheid",
    items: [
      "Adoptie- en competentietrack",
      "Nieuwe werkwijzen borgen",
      "Resultaten meten & opschalen",
      "Organisatie staat zelfstandig",
    ],
  },
];

const ApproachSection = () => {
  return (
    <section className="bg-ff-light py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="section-label mb-10">
            HOE HET WERKT
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <span className="font-heading font-bold text-3xl text-ff-blue">{step.num}</span>
                <h3 className="font-heading font-semibold text-foreground mt-2 mb-4">{step.title}</h3>
                <ul className="space-y-2">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApproachSection;
