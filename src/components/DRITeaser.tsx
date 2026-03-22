import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const DRITeaser = () => {
  return (
    <section id="dri" className="bg-ff-light py-20 md:py-28 scroll-mt-16">
      <div className="container max-w-3xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
        >
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
            className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xl mx-auto"
          >
            Twee derde van alle transformatietrajecten mislukt — niet door een slechte strategie, maar omdat de
            organisatie er niet op is ingericht. <em>(McKinsey, 2023)</em>
            <br />
            Beantwoord 10 vragen en ontdek waar het wringt. Inclusief downloadbaar rapport.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link
              to="/dri"
              className="inline-block bg-ff-blue text-white font-heading font-semibold px-8 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150"
            >
              Start de Delivery Readiness Index
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DRITeaser;
