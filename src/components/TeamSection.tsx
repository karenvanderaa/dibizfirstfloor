import ellenImg from "@/assets/ellen.jpeg";
import karenImg from "@/assets/karen.png";

const coreTeam = [
  { initials: "W", name: "Wendy", role: "HR director, sales & operations expert" },
  { initials: "S", name: "Sofie", role: "CFO met business & people ervaring" },
  { initials: "T", name: "Thomas", role: "Founder na exit, AI expert" },
  { initials: "I", name: "Ingrid", role: "Data & market analyst" },
];

const TeamSection = () => {
  return (
    <section id="team" className="bg-background py-16 md:py-24 scroll-mt-16">
      <div className="container">
        <p className="section-label mb-6">WIE WIJ ZIJN</p>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-14 leading-snug max-w-2xl">
          Wij verkopen geen mensen.
          <br />
          <span className="text-ff-mint">Wij verkopen expertise, op maat en holistisch.</span>
        </h2>

        {/* Laag 1, Leads */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg overflow-hidden border border-border shadow-sm">
            <div className="h-72 md:h-80 overflow-hidden">
              <img src={ellenImg} alt="Ellen Poppe" className="w-full h-full object-cover object-top" />
            </div>
            <div className="p-6">
              <div className="w-10 h-1 bg-ff-mint rounded-full mb-4" />
              <h3 className="font-heading font-bold text-foreground text-lg">Ellen Poppe</h3>
              <p className="text-ff-mint text-sm font-medium mb-3">Lead Service & business design</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Begeleidt organisaties bij het vertalen van strategische ambities naar diensten die écht werken, voor klanten én voor de mensen die ze leveren.
              </p>
              <a href="mailto:ellen@dibiz.be" className="inline-flex items-center gap-2 bg-ff-mint/10 text-ff-mint font-heading font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-ff-mint/20 active:scale-[0.97] transition-all duration-150">
                📧 ellen@dibiz.be
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden border border-border shadow-sm">
            <div className="h-72 md:h-80 overflow-hidden">
              <img src={karenImg} alt="Karen Van der Aa" className="w-full h-full object-cover object-top" />
            </div>
            <div className="p-6">
              <div className="w-10 h-1 bg-ff-blue rounded-full mb-4" />
              <h3 className="font-heading font-bold text-foreground text-lg">Karen Van der Aa</h3>
              <p className="text-ff-blue text-sm font-medium mb-3">Lead Organisatie & mensen</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Bouwt de organisatie die de ambitie kan waarmaken, structuur, rollen, competenties en leiderschap afgestemd op de diensten die de organisatie wil leveren.
              </p>
              <a href="mailto:karen@firstfloortalent.be" className="inline-flex items-center gap-2 bg-ff-blue/10 text-ff-blue font-heading font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-ff-blue/20 active:scale-[0.97] transition-all duration-150">
                📧 karen@firstfloortalent.be
              </a>
            </div>
          </div>
        </div>

        {/* Laag 2, Kernteam */}
        <p className="section-label mb-6">KERNTEAM, STRUCTUREEL BETROKKEN</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {coreTeam.map((m, i) => (
            <div key={i} className="bg-white rounded-lg p-5 border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-ff-light-blue text-ff-blue flex items-center justify-center font-heading font-bold text-sm shrink-0">
                {m.initials}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground text-sm mb-1">{m.name}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{m.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Laag 3, Netwerk */}
        <p className="section-label mb-4">UITGEBREID NETWERK, INGESCHAKELD PER BEHOEFTE</p>
        <div className="bg-ff-light-mint border border-ff-mint/20 rounded-lg p-6 md:p-7">
          <p className="text-foreground leading-relaxed">
            Voor specifieke vraagstukken, pricing, juridisch, sectorspecifiek, data-engineering, AI-implementatie, schakelen we partners uit ons netwerk in. Dat is hoe een echt expertenteam werkt: schaalbaar, maar met behoud van de relationele lead bij Karen en Ellen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
