import { useState } from "react";
import { motion } from "framer-motion";
import ellenImg from "@/assets/ellen.jpeg";
import karenImg from "@/assets/karen.png";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            WIE WIJ ZIJN
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Ellen */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-lg overflow-hidden border border-border shadow-sm"
            >
              <div className="h-48 overflow-hidden">
                <img src={ellenImg} alt="Ellen Poppe" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <div className="w-10 h-1 bg-ff-mint rounded-full mb-4" />
                <h3 className="font-heading font-bold text-foreground text-lg">Ellen Poppe</h3>
                <p className="text-ff-mint text-sm font-medium mb-3">Dibiz — Service & Business Transformatie</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Begeleidt organisaties bij het vertalen van strategische ambities naar diensten die écht werken — voor
                  klanten én voor de mensen die ze leveren.
                </p>
                <a
                  href="mailto:ellen@dibiz.be"
                  className="inline-flex items-center gap-2 bg-ff-mint/10 text-ff-mint font-heading font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-ff-mint/20 active:scale-[0.97] transition-all duration-150"
                >
                  📧 ellen@dibiz.be
                </a>
              </div>
            </motion.div>

            {/* Karen */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="bg-white rounded-lg overflow-hidden border border-border shadow-sm"
            >
              <div className="h-48 overflow-hidden">
                <img src={karenImg} alt="Karen Van der Aa" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <div className="w-10 h-1 bg-ff-blue rounded-full mb-4" />
                <h3 className="font-heading font-bold text-foreground text-lg">Karen Van der Aa</h3>
                <p className="text-ff-blue text-sm font-medium mb-3">First Floor — Organisatie & Competentie</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bouwt de organisatie die de ambitie kan waarmaken — structuur, rollen, competenties en leiderschap
                  afgestemd op de diensten die de organisatie wil leveren.
                </p>
                <a
                  href="mailto:karen.vanderaa@firstfloortalent.be"
                  className="inline-flex items-center gap-2 bg-ff-blue/10 text-ff-blue font-heading font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-ff-blue/20 active:scale-[0.97] transition-all duration-150"
                >
                  📧 karen.vanderaa@firstfloortalent.be
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="max-w-lg">
            {submitted ? (
              <div className="bg-white rounded-lg p-8 border border-border">
                <p className="text-foreground font-heading font-semibold mb-2">Bericht ontvangen.</p>
                <p className="text-muted-foreground text-sm">We nemen binnen 48 uur contact op.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Naam"
                  required
                  className="w-full bg-white text-foreground placeholder:text-muted-foreground border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ff-mint"
                />
                <input
                  type="text"
                  placeholder="Organisatie"
                  required
                  className="w-full bg-white text-foreground placeholder:text-muted-foreground border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ff-mint"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  required
                  className="w-full bg-white text-foreground placeholder:text-muted-foreground border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ff-mint"
                />
                <textarea
                  placeholder="Bericht (optioneel)"
                  rows={3}
                  className="w-full bg-white text-foreground placeholder:text-muted-foreground border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ff-mint resize-none"
                />
                <button
                  type="submit"
                  className="bg-ff-mint text-white font-heading font-semibold px-7 py-3 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150"
                >
                  Stuur ons een bericht
                </button>
              </form>
            )}

            <div className="mt-6">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ff-blue text-white font-heading font-semibold px-7 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-md"
              >
                Of plan meteen een gesprek in
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
