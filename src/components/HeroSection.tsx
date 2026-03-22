import { motion } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const HeroSection = () => {
  return (
    <section className="relative bg-ff-blue pt-28 pb-20 md:pb-28 overflow-hidden">
      {/* Vertical gradient line */}
      <div
        className="absolute left-6 md:left-12 top-20 bottom-0 w-1.5 rounded-full opacity-30"
        style={{
          background: "linear-gradient(180deg, #fff, hsl(var(--ff-mint)))",
        }}
      />

      <div className="container relative">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="max-w-2xl"
        >
          {/* Pills */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex gap-2 mb-8">
            <span className="bg-white/20 text-white font-heading font-semibold text-sm px-4 py-1.5 rounded-md backdrop-blur-sm">
              First Floor
            </span>
            <span className="bg-ff-mint text-ff-dark font-heading font-semibold text-sm px-4 py-1.5 rounded-md">
              × Dibiz
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-heading font-bold text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] mb-6"
          >
            Nieuwe diensten die landen.
            <br />
            Een organisatie die ze{" "}
            <strong className="font-bold">kan waarmaken.</strong>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Wij designen organisaties zodat ze de waarde leveren die ze beloven
            — van servicedesign tot de mensen die het waarmaken.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-ff-blue font-heading font-semibold px-7 py-3.5 rounded-md hover:bg-white/90 active:scale-[0.97] transition-all duration-150"
            >
              Plan een vrijblijvend gesprek
            </a>
            <a
              href="/dri"
              className="text-white underline underline-offset-4 font-medium hover:text-ff-mint transition-colors duration-200 py-3.5"
            >
              Doe de Delivery Readiness Index
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
