import { Link } from "react-router-dom";
import karenEventImg from "@/assets/karen-event.jpeg";

const DRITeaser = () => {
  return (
    <section id="dri" className="bg-ff-light py-12 md:py-16 scroll-mt-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Photo side */}
          <div className="relative md:sticky md:top-24">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-xl" style={{ background: "hsl(var(--ff-blue) / 0.08)" }} />
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img src={karenEventImg} alt="Karen Van der Aa op een event" className="w-full h-80 md:h-[460px] object-cover object-top" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full" style={{ background: "hsl(var(--ff-amber))" }} />
          </div>

          {/* Text side */}
          <div>
            <p className="section-label mb-3">DELIVERY READINESS INDEX™</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
              Levert uw organisatie de waarde die u belooft?
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Twee derde van alle transformatietrajecten mislukt, niet door een slechte strategie, maar omdat de
              organisatie er niet op is ingericht. <em>(McKinsey, 2023)</em>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              De Delivery Readiness Index™ meet in 24 vragen over 6 dimensies hoe klaar uw organisatie werkelijk is, van strategische helderheid en leiderschap tot operating model, tooling en skills. Wetenschappelijk verankerd in o.a. Weiner's Organizational Readiness for Change, Scaling Leadership (Anderson &amp; Adams) en de TMA-competenties.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              ±10 minuten. Direct een visueel rapport met uw scores per dimensie en concrete aanbevelingen.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "Strategische helderheid",
                "Leiderschap & ownership",
                "Cultuur & verandervermogen",
                "Operating model",
                "Tooling & automatisering",
                "Mensen, skills & samenwerking",
              ].map((tag, i) => (
                <span
                  key={tag}
                  className="font-heading font-semibold text-foreground"
                  style={{
                    fontSize: "12px",
                    background: i % 2 === 0 ? "#E8EEFF" : "#DDF3F2",
                    borderRadius: "20px",
                    padding: "5px 14px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              to="/dri"
              className="inline-flex items-center gap-2 bg-ff-blue text-white font-heading font-semibold px-8 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-lg shadow-ff-blue/20"
            >
              Start de Delivery Readiness Index™
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DRITeaser;
