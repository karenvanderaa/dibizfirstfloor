const CALENDLY_URL = "https://calendly.com/ff-dibiz";

interface Step {
  title: string;
  tijd: string;
  prijs: string;
  wat: string;
  cta: string;
  href: string;
  external?: boolean;
  variant: "light" | "mid" | "prominent";
}

const steps: Step[] = [
  {
    title: "Doe de Delivery Readiness Index™",
    tijd: "5 minuten",
    prijs: "gratis",
    wat: "Krijg een eerste inzicht in waar uw organisatie staat.",
    cta: "Start de DRI",
    href: "/dri",
    variant: "light",
  },
  {
    title: "Boek een Werksessie",
    tijd: "halve dag",
    prijs: "€2.500",
    wat: "Samen de échte vraag scherp krijgen. Voor wie eerst wil voelen of we matchen.",
    cta: "Plan een werksessie",
    href: CALENDLY_URL,
    external: true,
    variant: "mid",
  },
  {
    title: "Start een Transformatie Scan",
    tijd: "4–5 weken",
    prijs: "vanaf €18.500",
    wat: "Complete diagnose en roadmap. Voor wie weet dat hij wil starten en het fundament wil leggen.",
    cta: "Vraag de Scan aan",
    href: CALENDLY_URL,
    external: true,
    variant: "prominent",
  },
];

const variantStyles: Record<Step["variant"], string> = {
  light: "bg-white border-border",
  mid: "bg-ff-light-blue border-ff-blue/20",
  prominent: "bg-ff-light-mint border-ff-mint/30 ring-1 ring-ff-mint/20 shadow-lg",
};

const ctaStyles: Record<Step["variant"], string> = {
  light: "bg-ff-blue/10 text-ff-blue hover:bg-ff-blue/20",
  mid: "bg-ff-blue text-white hover:brightness-110",
  prominent: "bg-ff-mint text-white hover:brightness-110 shadow-md",
};

const FunnelStepsSection = () => {
  return (
    <section className="bg-background py-10 md:py-14">
      <div className="container">
        <p className="section-label mb-4">DRIE INSTAPPEN</p>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-12 max-w-2xl">
          Drie manieren om te starten, kies wat past.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`rounded-xl p-7 border flex flex-col ${variantStyles[s.variant]}`}
            >
              <h3 className="font-heading font-bold text-foreground text-lg mb-5">{s.title}</h3>
              <dl className="space-y-2 mb-5 text-sm">
                <div className="flex gap-2">
                  <dt className="text-muted-foreground font-medium w-16 shrink-0">Tijd:</dt>
                  <dd className="text-foreground">{s.tijd}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-muted-foreground font-medium w-16 shrink-0">Prijs:</dt>
                  <dd className="text-foreground font-semibold">{s.prijs}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-muted-foreground font-medium w-16 shrink-0">Wat:</dt>
                  <dd className="text-foreground leading-relaxed">{s.wat}</dd>
                </div>
              </dl>

              <a
                href={s.href}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`mt-auto inline-flex items-center justify-center gap-2 font-heading font-semibold text-sm px-5 py-3 rounded-md transition-all duration-150 active:scale-[0.97] ${ctaStyles[s.variant]}`}
              >
                {s.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunnelStepsSection;
