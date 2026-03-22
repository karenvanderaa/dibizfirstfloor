import teamConversationImg from "@/assets/team-conversation.jpg";

const steps = [
  {
    num: "01",
    title: "Opstart · Diagnose & richting",
    color: "ff-blue",
    items: ["Value & service design (Dibiz)", "Organisatieanalyse (First Floor)", "Bevindingen samenleggen", "Gezamenlijke roadmap"],
  },
  {
    num: "02",
    title: "Traject · Uitvoering & verandering",
    color: "ff-mint",
    items: ["Servicedesign uitwerken", "Organisatiestructuur herdenken", "Rollen & competenties hertekenen", "Change management integreren"],
  },
  {
    num: "03",
    title: "Verankeren · Borging & zelfstandigheid",
    color: "ff-blue",
    items: ["Adoptie- en competentietrack", "Nieuwe werkwijzen borgen", "Resultaten meten & opschalen", "Organisatie staat zelfstandig"],
  },
];

const colorMap: Record<string, string> = { "ff-blue": "text-ff-blue", "ff-mint": "text-ff-mint" };
const dotColorMap: Record<string, string> = { "ff-blue": "bg-ff-blue", "ff-mint": "bg-ff-mint" };

const ApproachSection = () => {
  return (
    <section id="approach" className="bg-ff-light-mint py-24 md:py-36 scroll-mt-16">
      <div className="container">
        <p className="section-label mb-10">HOE HET WERKT</p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-xl overflow-hidden shadow-lg h-56 md:h-auto">
            <img src={teamConversationImg} alt="Team in gesprek" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                Eén geïntegreerd traject,<br />
                <span className="text-ff-mint">drie heldere fases.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Geen losse projecten die langs elkaar heen werken. Service design en organisatieontwikkeling lopen van dag één samen — zodat de verandering ook écht landt.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <span className={`font-heading font-bold text-3xl ${colorMap[step.color]}`}>{step.num}</span>
              <h3 className="font-heading font-semibold text-foreground mt-2 mb-4">{step.title}</h3>
              <ul className="space-y-2">
                {step.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className={`mt-1.5 w-1 h-1 rounded-full ${dotColorMap[step.color]} shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
