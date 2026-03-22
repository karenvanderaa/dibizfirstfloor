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
    <section className="relative bg-white pt-28 pb-16 md:pb-24 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-[10%] w-16 h-16 rounded-full opacity-60" style={{ background: "hsl(var(--ff-amber))" }} />
      <div className="absolute bottom-12 left-[15%] w-10 h-10 rounded-full opacity-50" style={{ background: "hsl(var(--ff-mint))" }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left — copy (5 cols) */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
            className="lg:col-span-5"
          >
            {/* Pills */}
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex gap-2 mb-8">
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
              Nieuwe diensten die landen.
              <br />
              Een organisatie die ze{" "}
              <span className="text-ff-blue">kan waarmaken.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md"
            >
              Wij designen organisaties zodat ze de waarde leveren die ze beloven
              — van servicedesign tot de mensen die het waarmaken.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start gap-3 mb-10"
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
                Doe de DRI scan
              </a>
            </motion.div>
          </motion.div>

          {/* Center — photos (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-4 items-end justify-center relative h-[420px]"
          >
            {/* Pink/warm bg shape behind Ellen */}
            <div
              className="absolute left-2 top-8 w-56 h-80 rounded-[2rem]"
              style={{ background: "hsl(var(--ff-warm) / 0.2)" }}
            />
            {/* Blue bg shape behind Karen */}
            <div
              className="absolute right-0 top-0 w-56 h-80 rounded-[2rem]"
              style={{ background: "hsl(var(--ff-light-blue))" }}
            />

            {/* Ellen photo */}
            <div className="relative z-10 mr-[-16px]">
              <div className="w-48 h-[340px] rounded-[1.5rem] overflow-hidden shadow-xl">
                <img src={ellenImg} alt="Ellen Poppe — Dibiz" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-ff-mint text-ff-dark font-heading font-semibold text-xs px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                Ellen · Dibiz
              </div>
            </div>

            {/* Karen photo */}
            <div className="relative z-10 -mt-8">
              <div className="w-48 h-[370px] rounded-[1.5rem] overflow-hidden shadow-xl">
                <img src={karenImg} alt="Karen Van der Aa — First Floor" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-ff-blue text-white font-heading font-semibold text-xs px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                Karen · First Floor
              </div>
            </div>

            {/* Decorative dot */}
            <div className="absolute -bottom-2 left-0 w-8 h-8 rounded-full" style={{ background: "hsl(var(--ff-amber))" }} />
          </motion.div>

          {/* Right — checklist (3 cols) */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
            className="lg:col-span-3"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-ff-light rounded-lg p-6"
            >
              <p className="font-heading font-semibold text-foreground text-sm mb-4 tracking-wide uppercase" style={{ color: "hsl(var(--ff-mint))" }}>
                Wat je krijgt
              </p>
              <ul className="space-y-3.5">
                {checkItems.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(var(--ff-mint))" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-foreground text-sm leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
