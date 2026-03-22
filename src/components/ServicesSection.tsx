import { motion } from "framer-motion";
import teamMeetingImg from "@/assets/team-meeting.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const dibizItems = [
  "Value & service design",
  "Business transformatie in kaart brengen",
  "Projectorganisatie en -oplevering",
  "Change management en adoptie",
];

const ffItems = [
  "Organisatiestructuur hertekenen",
  "Rollen & competenties in kaart brengen",
  "Competentie-ontwikkeling begeleiden",
  "Reward, performance & skill-integratie",
];

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
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="section-label mb-10">
            WAT WE SAMEN DOEN
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Dibiz card */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-ff-light-mint rounded-lg p-8 border-t-4 border-ff-mint"
            >
              <h3 className="font-heading font-bold text-lg text-foreground mb-1">Dibiz</h3>
              <p className="text-sm text-ff-mint font-medium mb-5">Service & Business Transformatie</p>
              <ul className="space-y-2.5">
                {dibizItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ff-mint shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* First Floor card */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="bg-ff-light rounded-lg p-8 border-t-4 border-ff-blue"
            >
              <h3 className="font-heading font-bold text-lg text-foreground mb-1">First Floor</h3>
              <p className="text-sm text-ff-blue font-medium mb-5">Organisatie & Competentie</p>
              <ul className="space-y-2.5">
                {ffItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ff-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Full-width quote band with photo */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-ff-blue mt-16"
      >
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 py-14 px-8 md:px-16 flex items-center">
            <div className="max-w-xl">
              <p className="text-white text-lg md:text-xl leading-relaxed mb-4">
                "Één doorlopend traject — van servicedesign tot organisatiedesign. Geen gap
                tussen wat beloofd wordt en wat geleverd wordt. Geen verandering die na het
                project verdwijnt."
              </p>
              <p className="text-white text-lg md:text-xl">
                Wij noemen dat geen consultancy. Wij noemen dat{" "}
                <strong className="font-bold text-ff-mint">fixen.</strong>
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
