import { motion } from "framer-motion";

const cards = [
  {
    icon: "◇",
    title: "Holistisch",
    desc: "Drie expertises samen in één keten.",
  },
  {
    icon: "→",
    title: "Pragmatisch",
    desc: "(Door)denken én (door)doen.",
  },
  {
    icon: "⚓",
    title: "Verankerd",
    desc: "Wij stappen uit als u zelfstandig staat.",
  },
];

const firstFloorQuestions = [
  "Wie doet wat?",
  "Kloppen de rollen?",
  "Zijn de juiste skills aanwezig?",
  "Groeit het leiderschap mee?",
];

const dibizQuestions = [
  "Hoe loopt het werk?",
  "Kloppen de processen?",
  "Helpt de tooling echt?",
  "Waar past automatisatie?",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const OvertuigingSection = () => {
  return (
    <section className="bg-background py-10 md:py-16">
      <div className="container">
        <p className="section-label mb-6">ONZE OVERTUIGING</p>

        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 leading-snug whitespace-nowrap">
          Geen generalisten. Wel specialisten die elkaar versterken.
        </h2>

        <div className="mb-12">
          <p className="text-foreground text-lg md:text-xl leading-relaxed">
            Wij zijn systeemdenkers en doeners.{" "}
            <span className="text-ff-mint italic">
              Want strategie, executie en organisatie bouw je niet los van elkaar. Toch niet als je wil dat het werkt.
            </span>
          </p>
        </div>

        {/* Venn-visual: First Floor + Dibiz → één keten */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:items-center gap-6 md:gap-2">
              {/* First Floor kaart */}
              <motion.div
                variants={fadeUp}
                custom={0}
                className="relative z-10 rounded-2xl bg-ff-light-blue/80 border border-ff-light-blue p-6 md:p-7 shadow-sm"
              >
                <h3 className="font-heading font-bold text-foreground text-lg md:text-xl mb-4">First Floor</h3>
                <ul className="space-y-2 text-foreground/80 text-sm md:text-base">
                  {firstFloorQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Centrale cirkel */}
              <motion.div variants={fadeUp} custom={2} className="relative z-20 mx-auto">
                <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full bg-[#F5EFE0] border border-[#E8DFC9] shadow-sm flex items-center justify-center p-8 md:p-10">
                  <div className="text-center">
                    <p className="font-heading font-bold text-foreground text-base md:text-lg leading-snug mb-3">
                      Uw organisatie voert uit wat uw strategie belooft
                    </p>
                    <p className="text-foreground/70 text-xs md:text-sm leading-relaxed">
                      Rollen kloppen. Processen werken. Tooling helpt. Skills zijn aanwezig.
                    </p>
                    <p className="text-foreground/70 text-xs md:text-sm leading-relaxed mt-2">
                      Mensen én AI agents werken samen als één team.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Dibiz kaart */}
              <motion.div
                variants={fadeUp}
                custom={1}
                className="relative z-10 rounded-2xl bg-ff-light-mint/80 border border-ff-light-mint p-6 md:p-7 shadow-sm"
              >
                <h3 className="font-heading font-bold text-foreground text-lg md:text-xl mb-4 md:text-right">Dibiz</h3>
                <ul className="space-y-2 text-foreground/80 text-sm md:text-base md:text-right">
                  {dibizQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Gebogen pijlen — desktop only */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 360"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--ff-blue))" />
                </marker>
                <marker id="arrow-mint" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--ff-mint))" />
                </marker>
              </defs>
              <motion.path
                d="M 290 180 Q 380 110, 440 180"
                fill="none"
                stroke="hsl(var(--ff-blue))"
                strokeWidth="2"
                strokeLinecap="round"
                markerEnd="url(#arrow-blue)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
              />
              <motion.path
                d="M 710 180 Q 620 110, 560 180"
                fill="none"
                stroke="hsl(var(--ff-mint))"
                strokeWidth="2"
                strokeLinecap="round"
                markerEnd="url(#arrow-mint)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
              />
            </svg>

            {/* 1 + 1 = 3 pill */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="relative z-10 mt-8 md:mt-10 mx-auto max-w-2xl rounded-2xl bg-ff-light-blue/60 border border-ff-light-blue px-6 py-5 text-center"
            >
              <p className="font-heading font-bold text-foreground text-base md:text-lg mb-1">
                Daar waar 1 + 1 = 3
              </p>
              <p className="text-foreground/75 text-sm md:text-base">
                AI agents zijn de nieuwe teamleden. Wie ontwerpt hun rol in de organisatie?
              </p>
            </motion.div>

            {/* Afsluitende claim */}
            <motion.div variants={fadeUp} custom={4} className="mt-8 md:mt-10 text-center">
              <p className="font-heading font-bold text-foreground text-lg md:text-xl mb-2">
                De organisatie van de toekomst
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Mensen, processen, tooling, automatisatie en AI agents die naadloos samenwerken.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-2xl text-ff-mint mb-3 block" aria-hidden="true">
                {c.icon}
              </span>
              <h3 className="font-heading font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Point of view */}
        <div className="mt-12 rounded-2xl bg-ff-dark text-white p-8 md:p-10 border-l-4 border-ff-mint">
          <p className="section-label text-ff-mint mb-4">ONS PERSPECTIEF</p>
          <p className="font-heading font-bold text-xl md:text-2xl leading-snug mb-4">
            Over twee jaar staan er niet alleen mensen in uw organigram. Er staan ook AI agents. De vraag is niet óf dat gebeurt, maar wie hun rol ontwerpt.
          </p>
          <p className="text-ff-mint font-heading font-semibold text-base md:text-lg">
            Wij doen dat. Samen met u.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OvertuigingSection;

