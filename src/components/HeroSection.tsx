import { motion } from "framer-motion";
import ellenImg from "@/assets/ellen.jpeg";
import karenImg from "@/assets/karen.png";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const checkItems = [
  "Diensten die écht aansluiten bij klant én markt",
  "Een organisatie die ingericht is om te leveren",
  "Eén resultaatsgerichte keten van marketready services én een interne organisatie on point",
  "Verandering die blijft — niet verdwijnt na oplevering",
];

const HeroSection = () => {
  return (
    <section className="relative bg-ff-blue pt-28 pb-20 md:pb-28 overflow-hidden">
      {/* Subtle accent shape */}
      <div
        className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "hsl(var(--ff-mint))" }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
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
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Wij designen organisaties zodat ze de waarde leveren die ze beloven
              — van servicedesign tot de mensen die het waarmaken.
            </motion.p>

            {/* Checklist */}
            <motion.ul
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 mb-10"
            >
              {checkItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <span className="mt-1 w-5 h-5 rounded-full bg-ff-mint/90 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 4" stroke="hsl(var(--ff-dark))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </motion.ul>

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
                className="bg-white text-ff-blue font-heading font-semibold px-7 py-3.5 rounded-md hover:bg-white/90 active:scale-[0.97] transition-all duration-150 shadow-lg"
              >
                Plan een vrijblijvend gesprek
              </a>
              <a
                href="/dri"
                className="inline-flex items-center gap-2 bg-ff-mint text-ff-dark font-heading font-semibold px-7 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-md"
              >
                Doe de Delivery Readiness Index
                <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — photos */}
          <motion.div
            initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-end justify-center gap-4 relative"
          >
            {/* Ellen */}
            <div className="relative">
              <div className="w-52 h-64 rounded-lg overflow-hidden shadow-xl ring-4 ring-white/20">
                <img src={ellenImg} alt="Ellen Poppe — Dibiz" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-ff-mint text-ff-dark font-heading font-semibold text-xs px-3 py-1 rounded-md shadow whitespace-nowrap">
                Ellen · Dibiz
              </div>
            </div>
            {/* Karen */}
            <div className="relative -mb-4">
              <div className="w-52 h-72 rounded-lg overflow-hidden shadow-xl ring-4 ring-white/20">
                <img src={karenImg} alt="Karen Van der Aa — First Floor" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-ff-blue border-2 border-white/30 text-white font-heading font-semibold text-xs px-3 py-1 rounded-md shadow whitespace-nowrap">
                Karen · First Floor
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
