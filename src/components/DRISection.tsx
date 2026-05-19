import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface Cluster {
  name: string;
  questions: string[];
}

const clusters: Cluster[] = [
  {
    name: "Diensten & Marktpositie",
    questions: [
      "Onze nieuwe of vernieuwde diensten leveren niet het rendement dat we verwachtten, ondanks een propositie die op papier sterk is.",
      "Er zit een merkbare kloof tussen wat wij onze klanten beloven en wat we intern consistent kunnen waarmaken.",
    ],
  },
  {
    name: "Organisatie & Groei",
    questions: [
      "We groeien, in omzet, mensen of diensten, maar onze interne structuur, rollen en verantwoordelijkheden volgen die groei niet.",
      "We hebben een fusie, overname of reorganisatie achter de rug die organisatorisch nog niet volledig is verankerd.",
      "We weten wat we strategisch willen bereiken, maar de vertaling naar concrete rollen, beslissingsbevoegdheden en eigenaarschap ontbreekt.",
    ],
  },
  {
    name: "Mensen & Competenties",
    questions: [
      "Onze medewerkers missen competenties die we nodig hebben voor de richting die we strategisch opgaan.",
      "Sleutelmedewerkers vertrekken of dreigen te vertrekken, en we begrijpen niet goed waardoor dat komt.",
      "Onze HR- en talentaanpak is voornamelijk operationeel en reactief, ze loopt achter op onze strategische ambities.",
    ],
  },
  {
    name: "Verandering & Verankering",
    questions: [
      "Na een lancering, reorganisatie of verandertraject vallen mensen snel terug op de oude manier van werken, de verandering verdwijnt.",
      "AI, digitalisering of andere externe druk verandert onze sector fundamenteel, maar onze organisatie is daar structureel nog niet op ingericht.",
    ],
  },
];

const clusterInterpretations: Record<string, string> = {
  "Diensten & Marktpositie":
    "Er zijn signalen dat uw dienstverlening en de marktbehoefte niet volledig op elkaar zijn afgestemd. Dit is het vertrekpunt van elke Transformatie Scan.",
  "Organisatie & Groei":
    "Uw structuur volgt uw groei niet. Zonder structurele interventie vergroot deze kloof zich naarmate de ambitie toeneemt.",
  "Mensen & Competenties":
    "De competentiegap is een strategisch risico, geen HR-kwestie. Zonder actie vertaalt dit zich in verloren talent en gemiste leveringskwaliteit.",
  "Verandering & Verankering":
    "Uw organisatie heeft moeite om verandering te verankeren. Dit patroon herhaalt zich bij elk nieuw initiatief zolang de onderliggende oorzaak niet wordt aangepakt.",
};

const totalQuestions = clusters.reduce((a, c) => a + c.questions.length, 0);

type Answer = boolean | null;

const scoreTexts = {
  strong: {
    label: "DRI: Sterk",
    color: "#22c55e",
    text: "Uw organisatie lijkt goed afgestemd op uw ambitie. De meeste signalen die wijzen op een kloof tussen dienstverlening en organisatiecapaciteit zijn bij u afwezig. Gezonde organisaties presteren gemiddeld 3× beter dan organisaties met structurele gaps, en ze blijven dat doen door continu te meten en bij te sturen. (McKinsey OHI, 2024)",
    cta: "Bevestig uw sterktes met een vrijblijvend gesprek",
  },
  pressure: {
    label: "DRI: Onder druk",
    color: "#f59e0b",
    text: "Er zijn duidelijke signalen dat uw organisatie en uw ambitie niet volledig op elkaar zijn afgestemd. Dit is het moment om te handelen, niet omdat het crisis is, maar omdat de kloof op dit punt nog beheersbaar is. Twee derde van alle transformatietrajecten faalt niet door een slechte strategie, maar omdat de organisatie er niet structureel op is ingericht. (McKinsey, 2023) De Transformatie Scan brengt in 4–5 weken in kaart waar de kloof zit en hoe u die aanpakt.",
    cta: "Vraag de Transformatie Scan aan",
  },
  critical: {
    label: "DRI: Kritisch",
    color: "#ef4444",
    text: "Uw organisatie loopt structureel achter op haar ambities. Organisaties die meer dan 18 maanden in dit patroon zitten mislopen gemiddeld 23% van hun groeipotentieel door talent dat vertrekt, initiatieven die niet landen en klanten die de kloof beginnen te voelen. (WEF Future of Jobs, 2025) Elke maand telt.",
    cta: "Plan een gesprek, wij bellen u terug",
  },
};

// Flatten questions with their cluster name for the step-by-step flow
const flatQuestions: { cluster: string; question: string }[] = clusters.flatMap((c) =>
  c.questions.map((q) => ({ cluster: c.name, question: q }))
);

const DRISection = () => {
  const [answers, setAnswers] = useState<Answer[]>(Array(totalQuestions).fill(null));
  const [currentStep, setCurrentStep] = useState(0); // 0..totalQuestions-1 = questions, totalQuestions = lead form
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");

  // Lead gate state
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadOrg, setLeadOrg] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);

  const [emailSent, setEmailSent] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const yesCount = answers.filter((a) => a === true).length;

  const clusterScores = useMemo(() => {
    let idx = 0;
    return clusters.map((c) => {
      const clusterAnswers = answers.slice(idx, idx + c.questions.length);
      idx += c.questions.length;
      return clusterAnswers.filter((a) => a === true).length;
    });
  }, [answers]);

  const handleAnswer = (qIndex: number, value: boolean) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = value;
      return next;
    });
  };

  const getScoreLevel = () => {
    if (yesCount <= 3) return "strong";
    if (yesCount <= 6) return "pressure";
    return "critical";
  };

  const getClusterColor = (score: number) => {
    if (score === 0) return "#22c55e";
    if (score === 1) return "#f59e0b";
    return "#ef4444";
  };

  const handleLeadSubmit = async () => {
    if (!leadName.trim() || !leadEmail.trim() || !leadOrg.trim()) {
      toast({ title: "Vul alle velden in", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadEmail)) {
      toast({ title: "Ongeldig e-mailadres", variant: "destructive" });
      return;
    }

    setLeadLoading(true);

    try {
      const level = getScoreLevel();
      const info = scoreTexts[level];

      const { error } = await supabase.functions.invoke("add-to-brevo", {
        body: {
          email: leadEmail.trim(),
          firstName: leadName.trim(),
          organisatie: leadOrg.trim(),
          score: yesCount,
          scoreLabel: info.label,
        },
      });

      if (error) {
        console.error("Brevo error:", error);
        // Still show results even if Brevo fails
      }
    } catch (err) {
      console.error("Lead submit error:", err);
    }

    setLeadSubmitted(true);
    setOrgName(leadOrg);
    setLeadLoading(false);
  };

  const showResults = allAnswered && leadSubmitted;

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const w = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentW = w - margin * 2;
    const level = getScoreLevel();
    const info = scoreTexts[level];
    const dateStr = new Date().toLocaleDateString("nl-BE");

    const drawColorBand = (y: number, color: string, text: string) => {
      doc.setFillColor(color);
      doc.roundedRect(margin, y, contentW, 10, 2, 2, "F");
      doc.setTextColor("#ffffff");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(text, w / 2, y + 7, { align: "center" });
    };

    // PAGE 1, Cover
    doc.setFillColor("#1a1a2e");
    doc.rect(0, 0, w, doc.internal.pageSize.getHeight(), "F");
    doc.setTextColor("#315eff");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("First Floor × Dibiz", w / 2, 50, { align: "center" });
    doc.setTextColor("#ffffff");
    doc.setFontSize(18);
    doc.text("Delivery Readiness Index™", w / 2, 70, { align: "center" });
    doc.setFontSize(13);
    doc.text("Uw persoonlijk rapport", w / 2, 80, { align: "center" });
    if (orgName) {
      doc.setFontSize(14);
      doc.text(orgName, w / 2, 100, { align: "center" });
    }
    doc.setFontSize(11);
    doc.setTextColor("#888888");
    doc.text(dateStr, w / 2, 115, { align: "center" });
    drawColorBand(130, info.color, `${info.label}, ${yesCount}/${totalQuestions}`);
    doc.setTextColor("#5ec6b8");
    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    doc.text("Levert uw organisatie de waarde die u belooft?", w / 2, 160, { align: "center" });

    // PAGE 2, Score & toelichting
    doc.addPage();
    doc.setTextColor("#1a1a2e");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Uw score & toelichting", margin, 30);
    drawColorBand(38, info.color, info.label);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#333333");
    const splitText = doc.splitTextToSize(info.text, contentW);
    doc.text(splitText, margin, 60);
    let y2 = 60 + splitText.length * 5 + 10;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor("#666666");
    const explainer = doc.splitTextToSize(
      "De Delivery Readiness Index meet de alignment tussen uw dienstverlening en uw organisatiecapaciteit, op vier dimensies die samen bepalen of u kunt leveren wat u belooft.",
      contentW
    );
    doc.text(explainer, margin, y2);

    // PAGE 3, Antwoorden per cluster
    doc.addPage();
    doc.setTextColor("#1a1a2e");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Uw antwoorden per cluster", margin, 30);
    let y3 = 42;
    let qIdx = 0;
    clusters.forEach((cluster, ci) => {
      if (y3 > 250) { doc.addPage(); y3 = 30; }
      const cScore = clusterScores[ci];
      const barColor = getClusterColor(cScore);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#1a1a2e");
      doc.text(cluster.name, margin, y3);
      doc.setFillColor("#e5e7eb");
      doc.roundedRect(margin + 100, y3 - 3, 40, 5, 1, 1, "F");
      const barW = (cScore / cluster.questions.length) * 40;
      if (barW > 0) {
        doc.setFillColor(barColor);
        doc.roundedRect(margin + 100, y3 - 3, barW, 5, 1, 1, "F");
      }
      y3 += 8;
      cluster.questions.forEach((q) => {
        const isYes = answers[qIdx] === true;
        doc.setFont("helvetica", isYes ? "bold" : "normal");
        doc.setFontSize(9);
        doc.setTextColor(isYes ? "#1a1a2e" : "#888888");
        const prefix = isYes ? "JA  " : "NEE ";
        const lines = doc.splitTextToSize(`${prefix}${q}`, contentW);
        doc.text(lines, margin + 4, y3);
        y3 += lines.length * 4.5 + 3;
        qIdx++;
      });
      if (cScore > 0) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.5);
        doc.setTextColor("#666666");
        const interp = doc.splitTextToSize(clusterInterpretations[cluster.name], contentW - 8);
        doc.text(interp, margin + 4, y3);
        y3 += interp.length * 4 + 4;
      }
      y3 += 6;
    });

    // PAGE 4, Volgende stap
    doc.addPage();
    doc.setTextColor("#1a1a2e");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Wat nu?", margin, 30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#333333");
    const nextStepIntro = doc.splitTextToSize(
      "De Delivery Readiness Index geeft u een eerste beeld. De Transformatie Scan gaat dieper: in 4–5 weken brengen First Floor en Dibiz samen in kaart waar de kloof precies zit, wat de oorzaak is, en hoe u die aanpakt. Resultaat: een concrete roadmap voor de volgende 12 maanden.",
      contentW
    );
    doc.text(nextStepIntro, margin, 42);
    let y4 = 42 + nextStepIntro.length * 5 + 10;
    const deliverables = [
      "Strategisch vertrekpunt",
      "Rollenkaart huidig vs. gewenst",
      "Competentiematrix",
      "Readiness-score",
      "Transformatie-roadmap 12 maanden",
    ];
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    deliverables.forEach((d) => { doc.text(`• ${d}`, margin + 4, y4); y4 += 6; });
    y4 += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#315eff");
    doc.text("Vanaf €18.500, 4–5 weken, 5 concrete deliverables", margin, y4);
    y4 += 12;
    doc.setTextColor("#1a1a2e");
    doc.setFont("helvetica", "bold");
    doc.text("Plan een vrijblijvend gesprek", margin, y4);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#315eff");
    doc.text(CALENDLY_URL, margin, y4 + 6);
    y4 += 16;
    doc.setTextColor("#666666");
    doc.setFontSize(9);
    doc.text("ellen@dibiz.be · karen.vanderaa@firstfloortalent.be", margin, y4);

    // PAGE 5, Over FF × Dibiz
    doc.addPage();
    doc.setTextColor("#1a1a2e");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Over FF × Dibiz", margin, 30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#333333");
    const aboutText = doc.splitTextToSize(
      'First Floor en Dibiz zijn twee Belgische adviesbureaus die samen één blinde vlek aanpakken die klassieke consultancy overlaat: de gap tussen servicedesign en organisatiedesign. Wij designen organisaties zodat ze de waarde leveren die ze beloven. Geen rapport dat in een lade verdwijnt. Wij noemen dat fixen.',
      contentW
    );
    doc.text(aboutText, margin, 42);
    let y5 = 42 + aboutText.length * 5 + 12;
    doc.setFont("helvetica", "bold");
    doc.text("Ellen Poppe, Dibiz", margin, y5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const ellenText = doc.splitTextToSize(
      "Begeleidt organisaties bij het vertalen van strategische ambities naar diensten die écht werken, voor klanten én voor de mensen die ze leveren.",
      contentW
    );
    doc.text(ellenText, margin, y5 + 6);
    y5 += 6 + ellenText.length * 4.5 + 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Karen Van der Aa, First Floor", margin, y5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const karenText = doc.splitTextToSize(
      "Bouwt de organisatie die de ambitie kan waarmaken, structuur, rollen, competenties en leiderschap afgestemd op de diensten die de organisatie wil leveren.",
      contentW
    );
    doc.text(karenText, margin, y5 + 6);
    y5 += 6 + karenText.length * 4.5 + 16;
    doc.setFontSize(8);
    doc.setTextColor("#888888");
    doc.text(`FF × Dibiz · Vertrouwelijk · ${dateStr} · firstfloortalent.be · dibiz.odoo.com`, margin, y5);

    doc.save(`DRI_Rapport_${dateStr.replace(/\//g, "-")}.pdf`);
  };

  let qIndex = 0;

  return (
    <section id="dri" className="bg-ff-light py-14 md:py-20 scroll-mt-16">
      <div className="container max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="section-label mb-4">
            DELIVERY READINESS INDEX™
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4"
          >
            Levert uw organisatie de waarde die u belooft?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground text-sm leading-relaxed mb-10"
          >
            Twee derde van alle transformatietrajecten mislukt, niet door een slechte strategie, maar omdat de
            organisatie er niet op is ingericht. <em>(McKinsey, 2023)</em>
            <br />
            Beantwoord 10 vragen eerlijk. Resultaat en downloadbaar rapport verschijnen direct na het invullen van uw gegevens.
          </motion.p>

          {/* Questions */}
          {clusters.map((cluster) => (
            <motion.div
              key={cluster.name}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <p className="font-heading font-semibold text-sm text-ff-blue uppercase tracking-wide mb-4">
                {cluster.name}
              </p>
              {cluster.questions.map((q) => {
                const idx = qIndex++;
                return (
                  <div key={idx} className="mb-4 bg-background rounded-lg p-5 border border-border shadow-sm">
                    <p className="text-foreground text-sm leading-relaxed mb-3">{q}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAnswer(idx, true)}
                        className={`px-5 py-1.5 rounded-md text-sm font-semibold transition-all duration-150 active:scale-[0.97] ${
                          answers[idx] === true
                            ? "bg-ff-blue text-white"
                            : "bg-ff-light text-foreground border border-border hover:border-ff-blue"
                        }`}
                      >
                        Ja
                      </button>
                      <button
                        onClick={() => handleAnswer(idx, false)}
                        className={`px-5 py-1.5 rounded-md text-sm font-semibold transition-all duration-150 active:scale-[0.97] ${
                          answers[idx] === false
                            ? "bg-ff-dark text-white"
                            : "bg-ff-light text-foreground border border-border hover:border-ff-dark"
                        }`}
                      >
                        Nee
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ))}

          {/* Lead capture gate, shown when all questions answered but not yet submitted */}
          {allAnswered && !leadSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 bg-background rounded-lg p-8 border border-border shadow-md"
            >
              <div className="text-center mb-6">
                <p className="font-heading font-bold text-lg text-foreground mb-2">
                  Uw resultaat is klaar
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Vul uw gegevens in om uw persoonlijke DRI-score en downloadbaar rapport te ontvangen.
                </p>
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Uw naam *"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ff-blue"
                />
                <input
                  type="email"
                  placeholder="Uw e-mailadres *"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ff-blue"
                />
                <input
                  type="text"
                  placeholder="Organisatie *"
                  value={leadOrg}
                  onChange={(e) => setLeadOrg(e.target.value)}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ff-blue"
                />
                <button
                  onClick={handleLeadSubmit}
                  disabled={leadLoading}
                  className="w-full bg-ff-blue text-white font-heading font-semibold px-6 py-3 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 text-sm disabled:opacity-60"
                >
                  {leadLoading ? "Even geduld..." : "Bekijk mijn resultaat"}
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Uw gegevens worden enkel gebruikt om u uw rapport te bezorgen en eventueel op te volgen. Geen spam.
              </p>
            </motion.div>
          )}

          {/* Results, only after lead gate */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12"
            >
              {/* Cluster bars */}
              <div className="mb-8 space-y-3">
                {clusters.map((c, ci) => {
                  const score = clusterScores[ci];
                  const pct = (score / c.questions.length) * 100;
                  return (
                    <div key={ci}>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{c.name}</span>
                        <span>{score}/{c.questions.length} JA</span>
                      </div>
                      <div className="h-3 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: getClusterColor(score),
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Score banner */}
              {(() => {
                const level = getScoreLevel();
                const info = scoreTexts[level];
                return (
                  <div
                    className="rounded-lg p-6 mb-6"
                    style={{ backgroundColor: info.color + "18", borderLeft: `4px solid ${info.color}` }}
                  >
                    <p
                      className="font-heading font-bold text-lg mb-2"
                      style={{ color: info.color }}
                    >
                      {info.label}, {yesCount}/{totalQuestions}
                    </p>
                    <p className="text-foreground text-sm leading-relaxed">{info.text}</p>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-ff-blue text-white font-heading font-semibold px-6 py-3 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 text-sm"
                    >
                      {info.cta}
                    </a>
                  </div>
                );
              })()}

              {/* PDF Download */}
              <div className="bg-background rounded-lg p-6 border border-border">
                <p className="font-heading font-semibold text-foreground mb-4">Download uw DRI-rapport (PDF)</p>
                <button
                  onClick={generatePDF}
                  className="bg-ff-dark text-white font-heading font-semibold px-6 py-3 rounded-md hover:brightness-125 active:scale-[0.97] transition-all duration-150 text-sm w-full"
                >
                  Download PDF
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DRISection;
