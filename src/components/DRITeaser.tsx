import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import karenEventImg from "@/assets/karen-event.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const DRITeaser = () => {
  return (
    <section id="dri" className="bg-ff-light py-20 md:py-28 scroll-mt-16">
      <div className="container">
        <motion.div
          initial="visible"
          transition={{ staggerChildren: 0.08 }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Photo side */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-full h-full rounded-xl" style={{ background: "hsl(var(--ff-blue) / 0.08)" }} />
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={karenEventImg}
                  alt="Karen Van der Aa op een event"
                  className="w-full h-72 md:h-80 object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full" style={{ background: "hsl(var(--ff-amber))" }} />
            </motion.div>

            {/* Text side */}
            <div>
              <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="section-label mb-4">
                DELIVERY READINESS INDEX™
              </motion.p>

              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4"
              >
                Levert uw organisatie de waarde die u belooft?
              </motion.h2>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md"
              >
                Twee derde van alle transformatietrajecten mislukt — niet door een slechte strategie, maar omdat de
                organisatie er niet op is ingericht. <em>(McKinsey, 2023)</em>
                <br /><br />
                Beantwoord 10 vragen en ontdek waar het wringt. Inclusief downloadbaar rapport.
              </motion.p>

              <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <Link
                  to="/dri"
                  className="inline-flex items-center gap-2 bg-ff-blue text-white font-heading font-semibold px-8 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-lg shadow-ff-blue/20"
                >
                  Start de Delivery Readiness Index
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DRITeaser;
