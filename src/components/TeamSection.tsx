import ellenImg from "@/assets/ellen.jpeg";
import karenImg from "@/assets/karen.png";

const TeamSection = () => {
  return (
    <section id="team" className="bg-background py-12 md:py-16 scroll-mt-16">
      <div className="container">
        <p className="section-label mb-6">WIE WIJ ZIJN</p>
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-12 leading-snug whitespace-nowrap">
          Wij bieden expertise die converteert in{" "}
          <span className="text-ff-mint">business value, vanaf de start.</span>
        </h2>


        {/* Laag 1: Leads */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <div className="bg-white rounded-lg overflow-hidden border border-border shadow-sm">
            <div className="aspect-[4/3] overflow-hidden bg-ff-light">
              <img
                src={ellenImg}
                alt="Ellen Poppe"
                className="w-full h-full object-cover"
                style={{ objectPosition: "55% 32%" }}
              />
            </div>
            <div className="p-6">
              <div className="w-10 h-1 bg-ff-mint rounded-full mb-4" />
              <h3 className="font-heading font-bold text-foreground text-lg">Ellen Poppe</h3>
              <p className="text-ff-mint text-sm font-medium mb-3">Lead business, processen & technologie</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Vertaalt businessnoden naar werkbare processen, tooling en IT-architectuur. Bouwt de brug tussen wat een organisatie wil en wat de technologie kan. Mét ervaring in people & performance.
              </p>
              <a href="mailto:ellen@dibiz.be" className="inline-flex items-center gap-2 bg-ff-mint/10 text-ff-mint font-heading font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-ff-mint/20 active:scale-[0.97] transition-all duration-150">
                📧 ellen@dibiz.be
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden border border-border shadow-sm">
            <div className="aspect-[4/3] overflow-hidden bg-ff-light">
              <img
                src={karenImg}
                alt="Karen Van der Aa"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 22%" }}
              />
            </div>
            <div className="p-6">
              <div className="w-10 h-1 bg-ff-blue rounded-full mb-4" />
              <h3 className="font-heading font-bold text-foreground text-lg">Karen Van der Aa</h3>
              <p className="text-ff-blue text-sm font-medium mb-3">Lead organisatie & mensen</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Vertaalt strategie naar interne structuur, rollen, skills en leiderschap. Bouwt de brug tussen wat een organisatie wil en wat haar mensen kunnen. Mét ervaring in process & IT
              </p>
              <a href="mailto:karen@firstfloortalent.be" className="inline-flex items-center gap-2 bg-ff-blue/10 text-ff-blue font-heading font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-ff-blue/20 active:scale-[0.97] transition-all duration-150">
                📧 karen@firstfloortalent.be
              </a>
            </div>
          </div>
        </div>

        {/* Laag 3: Netwerk */}
        <p className="section-label mb-4">UITGEBREID NETWERK, INGESCHAKELD PER BEHOEFTE</p>
        <div className="bg-ff-light-mint border border-ff-mint/20 rounded-lg p-6 md:p-7">
          <p className="text-foreground leading-relaxed">
            Voor specifieke vraagstukken zoals pricing, juridisch, sectorspecifiek, data-engineering of AI-implementatie schakelen we partners uit ons netwerk in. Zo werkt een echt expertenteam: schaalbaar, maar met behoud van de relationele lead bij Karen en Ellen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
