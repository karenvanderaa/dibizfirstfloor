const cards = [
  {
    icon: "◇",
    title: "Holistisch",
    desc: "Drie expertises samen in één keten.",
  },
  {
    icon: "→",
    title: "Pragmatisch",
    desc: "(Door)denken én (door)doen.",
  },
  {
    icon: "⚓",
    title: "Verankerd",
    desc: "Wij stappen uit als u zelfstandig staat.",
  },
];

const OvertuigingSection = () => {
  return (
    <section className="bg-background py-14 md:py-24">
      <div className="container">
        <p className="section-label mb-6">ONZE OVERTUIGING</p>

        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 max-w-3xl leading-snug">
          Digitale transformatie vraagt geen generalisten. Wel specialisten die elkaar versterken.
        </h2>

        <div className="max-w-2xl mb-14">
          <p className="text-foreground text-lg md:text-xl leading-relaxed mb-2">
            Marktaanbod en organisatie zijn nooit los van elkaar te ontwerpen.
          </p>
          <p className="text-ff-mint text-lg md:text-xl italic leading-relaxed">
            Want aanbod, digitale structuur en organisatie ontwerp je nooit los van elkaar.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-2xl text-ff-mint mb-3 block" aria-hidden="true">
                {c.icon}
              </span>
              <h3 className="font-heading font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OvertuigingSection;
