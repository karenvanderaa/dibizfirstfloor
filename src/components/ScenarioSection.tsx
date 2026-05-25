const scenarios = [
  {
    label: "KANTOOR IN TRANSITIE",
    title: "U bent managing partner van een kantoor met 60-150 professionals.",
    desc: "AI verandert wat uw klanten van u verwachten. Uw organisatie is nog ingericht voor het werk van vijf jaar geleden. U weet dat het moet veranderen, maar niet waar te beginnen.",
    accent: "hsl(var(--ff-blue))",
  },
  {
    label: "NA EEN OVERNAME",
    title: "U hebt net een overname gedaan.",
    desc: "Twee culturen, twee systemen, twee manieren van werken. De integratie loopt niet. Meerwaarde verdampt terwijl u wacht tot het vanzelf goed komt.",
    accent: "hsl(var(--ff-mint))",
  },
  {
    label: "KLAAR VOOR GROEI",
    title: "U hebt funding opgehaald en moet professionaliseren.",
    desc: "Uw investeerder vraagt maturiteit. Uw organisatie is gebouwd op improvisatie. U hebt 12 maanden om te laten zien dat het team kan schalen.",
    accent: "hsl(var(--ff-amber))",
  },
];

const ScenarioSection = () => (
  <section className="bg-ff-light py-12 md:py-16">
    <div className="container">
      <p className="section-label mb-3">HERKENBAAR?</p>
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-10 leading-snug">
        Wij werken met bedrijven die dit herkennen.
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {scenarios.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-6 border border-border shadow-sm border-t-4"
            style={{ borderTopColor: s.accent }}
          >
            <p
              className="section-label mb-3"
              style={{ color: s.accent }}
            >
              {s.label}
            </p>
            <h3 className="font-heading font-bold text-foreground text-base md:text-lg mb-3 leading-snug">
              {s.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ScenarioSection;
