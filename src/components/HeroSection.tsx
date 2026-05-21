import { motion } from "framer-motion";
import ellenKarenLaptopImg from "@/assets/ellen-karen-laptop.jpg";
import ellenImg from "@/assets/ellen.jpeg";


const CALENDLY_URL = "https://calendly.com/karenvda/letstalk";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const checkItems = [
  "Mensen, rollen en processen die kloppen met de strategie",
  "Tooling, automatisatie en AI die de uitvoering versterkt",
  "Eén doorlopende keten van strategie tot verankering",
  "Verandering die blijft, niet verdwijnt na oplevering",
];

const HeroSection = () => {
  return (
    <section className="relative bg-white pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-24 right-[8%] w-14 h-14 rounded-full opacity-50" style={{ background: "hsl(var(--ff-amber))" }} />
      <div className="absolute bottom-20 left-[12%] w-8 h-8 rounded-full opacity-40" style={{ background: "hsl(var(--ff-warm))" }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left, copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          >
            {/* Pills */}
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap gap-2 mb-8">
              <span className="bg-ff-blue text-white font-heading font-semibold text-sm px-4 py-1.5 rounded-md">
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
              className="text-foreground font-heading font-bold text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] mb-5"
            >
              Uw strategie klopt. Maar voert uw{" "}
              <span className="text-ff-mint">organisatie</span>{" "}
              ze ook uit?
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md"
            >
              Strategie waarmaken vraagt executie. Executie vraagt de juiste organisatie. Wij bouwen die organisatie met u, waar mensen, processen, tooling, automatisatie en AI agents naadloos samenwerken.
            </motion.p>

            {/* Checklist */}
            <motion.ul
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 mb-10"
            >
              {checkItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(var(--ff-mint))" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-foreground text-sm md:text-base leading-snug">{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ff-blue text-white font-heading font-semibold px-7 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-lg shadow-ff-blue/25"
              >
                Plan een vrijblijvend gesprek →
              </a>
              <a
                href="/dri"
                className="inline-flex items-center gap-2 bg-ff-mint text-ff-dark font-heading font-semibold px-7 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150"
              >
                Doe de Delivery Readiness Index™ scan
              </a>
            </motion.div>
          </motion.div>

          {/* Right, photo composition */}
          <motion.div
            initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            {/* Warm bg shape */}
            <div
              className="absolute -top-6 -right-6 w-[90%] h-[85%] rounded-[2.5rem]"
              style={{ background: "hsl(var(--ff-warm) / 0.12)" }}
            />
            {/* Mint accent shape */}
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 rounded-[1.5rem]"
              style={{ background: "hsl(var(--ff-mint) / 0.15)" }}
            />

            {/* Main photo, duo */}
            <div className="relative z-10 rounded-[1.5rem] overflow-hidden shadow-2xl">
              <img
                src={ellenKarenLaptopImg}
                alt="Ellen Poppe en Karen Van der Aa"
                className="w-full h-[420px] object-cover object-center"
              />
            </div>

            {/* Floating small photo */}
            <div className="absolute -bottom-8 -left-8 z-20 w-36 h-44 rounded-xl overflow-hidden shadow-xl ring-4 ring-white">
              <img
                src={ellenImg}
                alt="Ellen Poppe"
                className="w-full h-full object-cover object-[center_25%]"
              />
            </div>

            {/* Decorative dots */}
            <div className="absolute top-4 -left-6 w-10 h-10 rounded-full" style={{ background: "hsl(var(--ff-blue))" }} />
            <div className="absolute -bottom-2 right-12 w-6 h-6 rounded-full" style={{ background: "hsl(var(--ff-amber))" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
