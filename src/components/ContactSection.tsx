import ellenImg from "@/assets/ellen.jpeg";
import karenImg from "@/assets/karen.png";

const CALENDLY_URL = "https://calendly.com/karenvda/letstalk";

const ContactSection = () => {
  return (
    <section id="contact" className="bg-ff-light py-12 md:py-16 scroll-mt-16">
      <div className="container">
        {/* Personal CTA band */}
        <div className="bg-ff-blue rounded-xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-white/70 text-sm font-heading font-semibold tracking-wider uppercase mb-3">
                KLAAR OM TE STARTEN?
              </p>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">
                Plan een gesprek met<br />Karen & Ellen
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 max-w-md">
                Een vrijblijvende kennismaking. Geen verkooppraatje. Een open gesprek over waar het wringt en wat er mogelijk is. Binnen 30 minuten weet u of we kunnen helpen.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-ff-blue font-heading font-semibold px-8 py-3.5 rounded-md hover:bg-white/90 active:scale-[0.97] transition-all duration-150"
              >
                Plan een kennismaking
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="flex gap-4 justify-center md:justify-end">
              <div className="w-36 h-44 rounded-xl overflow-hidden shadow-lg ring-4 ring-white/20">
                <img src={ellenImg} alt="Ellen Poppe" className="w-full h-full object-cover object-[center_30%]" />
              </div>
              <div className="w-36 h-44 rounded-xl overflow-hidden shadow-lg ring-4 ring-white/20">
                <img src={karenImg} alt="Karen Van der Aa" className="w-full h-full object-cover object-[center_30%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Direct contact CTAs */}
        <h3 className="font-heading font-bold text-foreground text-2xl md:text-3xl mb-10">
          Of contacteer ons direct
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-border shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-ff-mint/10 text-ff-mint flex items-center justify-center mb-4 text-xl" aria-hidden="true">
              ✓
            </div>
            <h4 className="font-heading font-bold text-foreground text-lg mb-1">Doe de Delivery Readiness Index™ scan</h4>
            <p className="text-muted-foreground text-sm mb-5">In 5 minuten, gratis</p>
            <a
              href="/dri"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-ff-mint/10 text-ff-mint font-heading font-semibold text-sm px-5 py-3 rounded-md hover:bg-ff-mint/20 active:scale-[0.97] transition-all duration-150"
            >
              Start de DRI <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-ff-blue/10 text-ff-blue flex items-center justify-center mb-4 text-xl" aria-hidden="true">
              ◷
            </div>
            <h4 className="font-heading font-bold text-foreground text-lg mb-1">Plan een werksessie</h4>
            <p className="text-muted-foreground text-sm mb-5">Halve dag, €2.500</p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-ff-blue text-white font-heading font-semibold text-sm px-5 py-3 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150"
            >
              Boek een werksessie <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-ff-blue/10 text-ff-blue flex items-center justify-center mb-4 text-xl" aria-hidden="true">
              ✉
            </div>
            <h4 className="font-heading font-bold text-foreground text-lg mb-1">Stuur ons een bericht</h4>
            <p className="text-muted-foreground text-sm mb-5">Voor alles wat niet in een formulier past</p>
            <a
              href="mailto:karen@firstfloortalent.be"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-ff-light text-foreground font-heading font-semibold text-sm px-5 py-3 rounded-md hover:bg-ff-light-mint active:scale-[0.97] transition-all duration-150 border border-border break-all"
            >
              karen@firstfloortalent.be
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
