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
    <section className="bg-background py-10 md:py-16">
      <div className="container">
        <p className="section-label mb-6">ONZE OVERTUIGING</p>

        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 leading-snug whitespace-nowrap">
          Geen generalisten. Wel specialisten die elkaar versterken.
        </h2>

        <div className="mb-14">
          <p className="text-foreground text-lg md:text-xl leading-relaxed">
            Wij zijn systeemdenkers en doeners.{" "}
            <span className="text-ff-mint italic">
              Want strategie, executie en organisatie bouw je niet los van elkaar. Toch niet als je wil dat het werkt.
            </span>
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
