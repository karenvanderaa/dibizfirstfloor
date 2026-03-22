import { motion } from "framer-motion";
import teamMeetingImg from "@/assets/team-meeting.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const pillars = [
  {
    icon: "🎯",
    title: "Service Design",
    color: "ff-mint",
    painQuestion:
      "Sluiten uw diensten nog aan bij wat de markt vraagt? Of verkoopt u wat u altijd al deed?",
    description:
      "Wij ontwerpen diensten die vertrekken vanuit klantwaarde — onderscheidend, uitvoerbaar en schaalbaar. Van value proposition tot go-to-market.",
    items: [
      "Value & service design",
      "Business model validatie",
      "Propositie-architectuur",
      "Go-to-market strategie",
    ],
  },
  {
    icon: "🏗️",
    title: "Organisatie Design",
    color: "ff-blue",
    painQuestion:
      "Is uw structuur ingericht op uw ambitie — of op hoe het altijd al was?",
    description:
      "Structuur is een strategische variabele. Wij hertekenen rollen, beslislijnen en competenties zodat ze uw strategie versterken in plaats van vertragen.",
    items: [
      "Organisatiestructuur hertekenen",
      "Rollen & competentiematrix",
      "Decision rights & governance",
      "Capability architecture",
    ],
  },
  {
    icon: "🔄",
    title: "Change & Verankering",
    color: "ff-mint",
    painQuestion:
      "Verdwijnt de verandering zodra het project stopt? Valt iedereen terug op de oude manier?",
    description:
      "Verandering is geen project maar een operationele constante. Wij bouwen absorptiecapaciteit, adoptie en leiderschap in zodat transformatie blijft.",
    items: [
      "Change management & adoptie",
      "Transformatie-governance",
      "Leiderschapsontwikkeling",
      "Resultaatmeting & borging",
    ],
  },
];

const colorMap: Record<string, string> = {
  "ff-blue": "text-ff-blue",
  "ff-mint": "text-ff-mint",
};

const bgMap: Record<string, string> = {
  "ff-blue": "bg-ff-light-blue border-ff-blue/20",
  "ff-mint": "bg-ff-light-mint border-ff-mint/20",
};

const dotMap: Record<string, string> = {
  "ff-blue": "bg-ff-blue",
  "ff-mint": "bg-ff-mint",
};

const borderTopMap: Record<string, string> = {
  "ff-blue": "border-ff-blue",
  "ff-mint": "border-ff-mint",
};

const ServicesSection = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="section-label mb-4"
          >
            WAT WE SAMEN DOEN
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3 max-w-2xl"
          >
            Drie pijlers, één geïntegreerd traject.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground mb-12 max-w-xl leading-relaxed"
          >
            Organisatievitaliteit ontstaat wanneer strategie, structuur, mensen
            en veranderkracht op elkaar zijn afgestemd. Geen losse projecten —
            één keten.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.08,
                }}
                className={`rounded-lg p-7 border ${bgMap[pillar.color]} border-t-4 ${borderTopMap[pillar.color]}`}
              >
                <span className="text-2xl mb-3 block">{pillar.icon}</span>
                <h3
                  className={`font-heading font-bold text-lg mb-2 ${colorMap[pillar.color]}`}
                >
                  {pillar.title}
                </h3>
                <p className="text-foreground/70 text-sm italic mb-4 leading-relaxed">
                  "{pillar.painQuestion}"
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {pillar.description}
                </p>
                <ul className="space-y-2">
                  {pillar.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-foreground text-sm"
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full ${dotMap[pillar.color]} shrink-0`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full-width quote band with photo */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-ff-blue mt-16"
      >
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 py-14 px-8 md:px-16 flex items-center">
            <div className="max-w-xl">
              <p className="text-white text-lg md:text-xl leading-relaxed mb-4">
                "Strategie zonder structurele coherentie loopt vast.
                Structuur zonder competentiediepte creëert bottlenecks.
                HR zonder strategische integratie blijft reactief."
              </p>
              <p className="text-white text-lg md:text-xl">
                Wij bouwen de brug.{" "}
                <strong className="font-bold text-ff-mint">
                  Van ambitie tot uitvoering.
                </strong>
              </p>
            </div>
          </div>
          <div className="md:col-span-2 h-64 md:h-auto">
            <img
              src={teamMeetingImg}
              alt="Team in overleg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
