const cards = [
  {
    title: "Structuren ingericht voor wat u vroeger was.",
    desc: "Rollen en processen die niet meer kloppen met wat de organisatie vandaag en in de toekomst moet kunnen.",
    cost: "Gevolg: trage besluitvorming, dubbel werk, en talent dat vertrekt omdat het geen richting ziet.",
  },
  {
    title: "Tooling en automatisatie die niet de gehoopte efficiëntie opleveren.",
    desc: "Systemen die niemand gebruikt en de druk rond AI zonder te weten hoe of waar.",
    cost: "Gevolg: €50K-€200K aan licenties die niet renderen. Processen die manueel blijven terwijl de concurrent automatiseert.",
  },
  {
    title: "Leiderschap zonder de juiste hefbomen.",
    desc: "Directie wil transformeren. Middenkader trekt de oude lijn door.",
    cost: "Gevolg: strategische initiatieven die na 6 maanden stilletjes doodbloeden.",
  },
  {
    title: "Na elke verandering: terugval naar het oude.",
    desc: "Adoptie blijft beperkt. De winst van het project verdwijnt.",
    cost: "Gevolg: het volledige transformatiebudget verdampt. Twee jaar later begint u opnieuw.",
  },
];

const ProblemSection = () => {
  const accentColor = "hsl(var(--ff-blue))";

  return (
    <section id="probleem" className="bg-background py-10 md:py-16 scroll-mt-16">
      <div className="container">
        <p className="section-label mb-3">HERKEN JE DIT?</p>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
          Uw strategie klopt. Maar de uitvoering hapert. Herkenbaar?
        </p>

        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3 leading-snug">
          Uw strategie staat. Uw organisatie volgt niet.
        </h2>
        <p className="text-muted-foreground text-sm italic mb-8 max-w-2xl">
          Herkenbaar als u een bedrijf leidt en voelt dat de organisatie niet meebeweegt met de ambitie of technologie
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <div
              key={i}
              className="border border-border rounded-lg p-5 shadow-sm bg-white"
              style={{
                borderLeftWidth: 3,
                borderLeftColor: accentColor,
              }}
            >
              <p className="font-heading font-semibold text-foreground mb-1">
                {c.title}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              <p className="text-ff-blue text-xs font-medium mt-2">{c.cost}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-muted-foreground text-lg font-heading font-medium">
            Herkenbaar?
          </span>
          <a
            href="/dri"
            className="inline-flex items-center gap-2 bg-ff-blue text-white font-heading font-semibold px-7 py-3.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-md"
          >
            Doe de Delivery Readiness Index™
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
