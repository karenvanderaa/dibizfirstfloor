import { Link } from "react-router-dom";
import karenEventImg from "@/assets/karen-event.jpeg";

const DRITeaser = () => {
  return (
    <section id="dri" className="bg-ff-light py-14 md:py-20 scroll-mt-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Photo side */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-xl" style={{ background: "hsl(var(--ff-blue) / 0.08)" }} />
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img src={karenEventImg} alt="Karen Van der Aa op een event" className="w-full h-72 md:h-80 object-cover object-top" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full" style={{ background: "hsl(var(--ff-amber))" }} />
          </div>

          {/* Text side */}
          <div>
            <p className="section-label mb-4">DELIVERY READINESS INDEX™</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
              Levert uw organisatie de waarde die u belooft?
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
              Twee derde van alle transformatietrajecten mislukt, niet door een slechte strategie, maar omdat de
              organisatie er niet op is ingericht. <em>(McKinsey, 2023)</em>
              <br /><br />
              Beantwoord 10 vragen en ontdek waar het wringt. Inclusief downloadbaar rapport.
            </p>
            <Link
              to="/dri"
              className="inline-flex items-center gap-2 bg-ff-blue text-white font-heading font-semibold px-8 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-lg shadow-ff-blue/20"
            >
              Start de Delivery Readiness Index
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DRITeaser;
