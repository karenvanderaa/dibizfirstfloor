type Owner = "beiden" | "ff" | "dibiz" | "extern";

interface Item {
  label: string;
  owner: Owner;
  note?: string;
}

interface Column {
  title: string;
  items: Item[];
}

const columns: Column[] = [
  {
    title: "STRATEGIE & MARKT",
    items: [
      { label: "Strategie & ambitie", owner: "beiden" },
      { label: "Go-to-market", owner: "beiden" },
      { label: "Product-market fit", owner: "beiden" },
      { label: "Marktanalyse & data", owner: "extern", note: "Ingrid" },
      { label: "Pricing & financieel", owner: "extern", note: "Sofie" },
    ],
  },
  {
    title: "ORGANISATIE READINESS",
    items: [
      { label: "Maturiteitsscan", owner: "beiden" },
      { label: "Change readiness", owner: "beiden" },
      { label: "Stakeholder & weerstand", owner: "beiden" },
      { label: "Cultuurscan", owner: "beiden" },
      { label: "Leiderschapsbereidheid", owner: "beiden" },
    ],
  },
  {
    title: "DESIGN & BUILD",
    items: [
      { label: "Service design", owner: "beiden" },
      { label: "Business model", owner: "beiden" },
      { label: "Operating model", owner: "beiden" },
      { label: "Procesarchitectuur", owner: "dibiz" },
      { label: "IT-design & toolings", owner: "dibiz" },
      { label: "Organisational design", owner: "ff" },
      { label: "Competentiematrix", owner: "ff" },
      { label: "Leiderschapsmodel", owner: "ff" },
    ],
  },
  {
    title: "ADOPTION & ANCHOR",
    items: [
      { label: "Adoption & change mgmt", owner: "beiden" },
      { label: "Skill-integratie", owner: "beiden" },
      { label: "Eigenaarschap", owner: "beiden" },
      { label: "Feedback loops & KPI's", owner: "beiden" },
      { label: "Leiderschap", owner: "ff" },
      { label: "Procesborging", owner: "dibiz" },
    ],
  },
];

const ownerColor: Record<Owner, string> = {
  beiden: "#9CA3AF",
  ff: "#315EFF",
  dibiz: "#6CC1BF",
  extern: "#F59E0B",
};

const ownerBg: Record<Owner, string> = {
  beiden: "bg-ff-light text-foreground border-border",
  ff: "bg-ff-light-blue text-ff-blue border-ff-blue/20",
  dibiz: "bg-ff-light-mint text-ff-mint border-ff-mint/20",
  extern: "border",
};

const legend: { color: Owner; label: string }[] = [
  { color: "beiden", label: "Wij beiden" },
  { color: "ff", label: "First Floor specialistisch" },
  { color: "dibiz", label: "Dibiz specialistisch" },
  { color: "extern", label: "Extern netwerk" },
];

const KleurlogicaSection = () => {
  return (
    <section className="bg-ff-light py-24 md:py-32">
      <div className="container">
        <p className="section-label mb-4">HOE WE SAMEN WERKEN</p>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4 max-w-2xl">
          Wij zorgen voor de end-to-end value stream.
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl leading-relaxed">
          Het meeste van wat een transformatie nodig heeft, kunnen we beiden. Op de uitersten verschuift het zwaartepunt naar één van ons. Voor diepere specialisaties schakelen we ons netwerk in.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {columns.map((col, i) => (
            <div key={i} className="bg-white rounded-lg p-5 border border-border shadow-sm">
              <p className="font-heading font-bold text-xs tracking-wider text-foreground mb-4 pb-3 border-b border-border">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.items.map((item, j) => (
                  <li
                    key={j}
                    className={`flex items-start gap-2 text-sm px-3 py-2 rounded-md ${ownerBg[item.owner]}`}
                    style={
                      item.owner === "extern"
                        ? { background: "rgba(245, 158, 11, 0.1)", color: "#B45309", borderColor: "rgba(245, 158, 11, 0.3)" }
                        : undefined
                    }
                  >
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                      style={{ background: ownerColor[item.owner] }}
                    />
                    <span className="leading-snug">
                      {item.label}
                      {item.note && (
                        <span className="block text-xs opacity-75 italic">— {item.note}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center bg-white rounded-lg p-5 border border-border">
          {legend.map((l, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-foreground">
              <span className="w-3 h-3 rounded-full" style={{ background: ownerColor[l.color] }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KleurlogicaSection;
