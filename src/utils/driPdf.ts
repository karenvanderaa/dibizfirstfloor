import jsPDF from "jspdf";
import { dimensions, interpretations, risks, firstSteps, bandIndex, levelLabels, levelColors, overallSummary } from "@/data/dri";

export type Contact = { naam: string; email: string; organisatie: string; functie: string };

const BLUE: [number, number, number] = [49, 94, 255];
const MINT: [number, number, number] = [108, 193, 191];
const INK: [number, number, number] = [26, 26, 46];
const DARK: [number, number, number] = [45, 55, 72];
const MUTED: [number, number, number] = [107, 115, 132];
const RULE: [number, number, number] = [226, 232, 240];
const SOFT_BG: [number, number, number] = [244, 246, 251];
const BLUE_SOFT: [number, number, number] = [232, 238, 255];
const MINT_SOFT: [number, number, number] = [221, 243, 242];
const PDF_FONT = "helvetica";

const loadPdfFonts = (doc: jsPDF) => {
  doc.setFont(PDF_FONT, "normal");
};

const readinessColor = (idx: number): [number, number, number] => {
  const hex = levelColors[idx] ?? levelColors[0];
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
};

export async function generateDRIPdf(opts: {
  contact: Contact;
  dimScores: number[];
  overall: number;
}) {
  const { contact, dimScores, overall } = opts;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  await loadPdfFonts(doc);
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;

  const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
  const setText = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const setDraw = (c: [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);
  const drawScore = (
    score: number,
    x: number,
    y: number,
    size: number,
    scoreColor: [number, number, number],
    suffixColor: [number, number, number]
  ) => {
    const scoreText = score.toFixed(1);
    doc.setFont(PDF_FONT, "bold");
    doc.setFontSize(size);
    setText(scoreColor);
    doc.text(scoreText, x, y);
    const scoreW = doc.getTextWidth(scoreText);
    doc.setFont(PDF_FONT, "normal");
    doc.setFontSize(Math.max(11, Math.round(size * 0.26)));
    setText(suffixColor);
    doc.text("/ 5.0", x + scoreW + 12, y);
  };

  const splitGradient = (y: number, height = 4) => {
    setFill(BLUE); doc.rect(0, y, W / 2, height, "F");
    setFill(MINT); doc.rect(W / 2, y, W / 2, height, "F");
  };

  let pageNum = 0;
  const addFooter = (version = false) => {
    setText(MUTED); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(8);
    doc.text(
      version
        ? "Delivery Readiness Index™ · First Floor × Dibiz · Versie 1.0 · 2026"
        : `Delivery Readiness Index™ · First Floor × Dibiz · ${contact.organisatie}`,
      M,
      H - 24
    );
    doc.text(`${pageNum}`, W - M, H - 24, { align: "right" });
  };
  const newPage = () => { doc.addPage(); pageNum++; splitGradient(0); };

  // ============ COVER ============
  pageNum = 1;
  setFill(INK); doc.rect(0, 0, W, H, "F");
  splitGradient(120, 5);
  setText([255, 255, 255]);
  doc.setFont(PDF_FONT, "bold"); doc.setFontSize(11);
  doc.text("DELIVERY READINESS INDEX™", M, 90);
  doc.setFontSize(48);
  doc.text("Rapport", M, 210);

  doc.setFont(PDF_FONT, "normal"); doc.setFontSize(18);
  setText([200, 210, 230]);
  doc.text(contact.organisatie || "—", M, 250);
  doc.setFontSize(12);
  doc.text(
    new Date().toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" }),
    M, 275
  );

  // Score card on cover
  setFill([255, 255, 255]); doc.roundedRect(M, 340, W - 2 * M, 150, 12, 12, "F");
  setText(INK); doc.setFontSize(10); doc.setFont(PDF_FONT, "bold");
  doc.text("DRI-SCORE", M + 28, 372);
  drawScore(overall, M + 28, 445, 64, INK, MUTED);

  const b = bandIndex(overall);
  const lbl = levelLabels[b];
  setFill(readinessColor(b));
  doc.setFont(PDF_FONT, "bold"); doc.setFontSize(11);
  const lblW = doc.getTextWidth(lbl) + 28;
  doc.roundedRect(W - M - 28 - lblW, 358, lblW, 28, 14, 14, "F");
  setText([255, 255, 255]);
  doc.text(lbl, W - M - 28 - lblW + 14, 376);

  setText([200, 210, 230]); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10);
  doc.text(`Voor ${contact.naam} · ${contact.functie}`, M + 28, 470);

  setText([170, 185, 210]);
  doc.setFont(PDF_FONT, "normal"); doc.setFontSize(11);
  doc.text("Opgesteld door First Floor × Dibiz", M, H - 70);
  doc.setFontSize(9);
  doc.text("Wij bouwen de organisatie van de toekomst met u.", M, H - 52);

  // ============ PAGE 2: OVER DEZE SCAN ============
  newPage();
  setText(MUTED); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
  doc.text("OVER DEZE SCAN", M, 56);
  setText(INK); doc.setFontSize(26);
  doc.text("Wat is de Delivery Readiness Index™?", M, 90);

  let y = 115;
  setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10.5);
  const intro = "De Delivery Readiness Index (DRI) meet in 24 vragen hoe klaar uw organisatie is om een transformatie niet alleen te starten, maar ook daadwerkelijk te laten landen. Niet de intentie telt, maar het vermogen om strategie om te zetten in werkend resultaat.";
  const introLines = doc.splitTextToSize(intro, W - 2 * M);
  doc.text(introLines, M, y); y += introLines.length * 14 + 10;

  const intro2 = "De kernlogica is eenvoudig: strategie waarmaken vraagt executie. Executie vraagt de juiste organisatie. En de juiste organisatie vandaag is de organisatie van de toekomst — waar mensen, processen, tooling, automatisatie en AI agents naadloos samenwerken.";
  const intro2Lines = doc.splitTextToSize(intro2, W - 2 * M);
  doc.text(intro2Lines, M, y); y += intro2Lines.length * 14 + 22;

  // Wetenschappelijke basis
  setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(14);
  doc.text("Wetenschappelijke basis", M, y); y += 18;

  const sources = [
    { t: "Weiner's Theory of Organizational Readiness for Change (2009)", b: "Het meest geciteerde model in de implementatiewetenschap. Onderscheidt change commitment en change efficacy. Het bijbehorende meetinstrument ORIC is gevalideerd met betrouwbaarheidscoëfficiënten boven 0.89." },
    { t: "Digitale transformatie-readiness literatuur", b: "Recente frameworks van DASA, IDC en academisch onderzoek (MDPI 2024) identificeren consistent dezelfde dimensies: strategie, leiderschap, cultuur, operating model, technologie/tooling en talent." },
    { t: "Scaling Leadership (Anderson & Adams, 2019)", b: "Het onderscheid tussen creative en reactive leiderschap, het Canceling Effect en de Development Gap. Deze concepten zijn verweven in de leiderschaps- en cultuurdimensies van de scan." },
  ];
  sources.forEach((s) => {
    setText(BLUE); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10.5);
    doc.text(s.t, M, y); y += 14;
    setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10);
    const ls = doc.splitTextToSize(s.b, W - 2 * M);
    doc.text(ls, M, y); y += ls.length * 13 + 10;
  });
  setText(MUTED); doc.setFont(PDF_FONT, "italic"); doc.setFontSize(9.5);
  doc.text("Aanvullend zijn de TMA-competenties (53 gevalideerde competenties) gebruikt om gedragsindicatoren per dimensie te verankeren.", M, y, { maxWidth: W - 2 * M });
  y += 28;

  // Structuur
  setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(14);
  doc.text("Structuur", M, y); y += 16;
  setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10);
  const struct = "De scan bestaat uit 6 dimensies, elk met 4 stellingen. Respondenten scoren elke stelling op een 5-punts Likertschaal (1 = helemaal niet akkoord, 5 = helemaal akkoord). Ontworpen voor invulling door directieleden, managementteamleden en HR-leiders — de mensen die transformatie moeten dragen.";
  const sl = doc.splitTextToSize(struct, W - 2 * M);
  doc.text(sl, M, y);
  addFooter();

  // ============ PAGE 3: EXECUTIVE SUMMARY ============
  newPage();
  setText(MUTED); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
  doc.text("EXECUTIVE SUMMARY", M, 56);
  setText(INK); doc.setFontSize(26);
  doc.text("Uw resultaat", M, 90);

  // Big score block
  setFill(INK); doc.roundedRect(M, 115, W - 2 * M, 130, 12, 12, "F");
  setText([255, 255, 255]); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
  doc.text("DRI-SCORE", M + 24, 145);
  drawScore(overall, M + 24, 210, 54, [255, 255, 255], [170, 180, 200]);

  setFill(readinessColor(b));
  doc.setFont(PDF_FONT, "bold"); doc.setFontSize(11);
  const lblW2 = doc.getTextWidth(lbl) + 24;
  doc.roundedRect(W - M - 24 - lblW2, 138, lblW2, 26, 13, 13, "F");
  setText([255, 255, 255]); doc.text(lbl, W - M - 24 - lblW2 + 12, 156);

  setText([200, 210, 230]); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(9);
  doc.text("READINESS-NIVEAU", W - M - 24 - lblW2, 130);

  // Kernboodschap
  const indexed = dimScores.map((s, i) => ({ s, i }));
  const sorted = [...indexed].sort((a, b) => a.s - b.s);
  const lowestNames = sorted.map((x) => dimensions[x.i].name);
  const summary = overallSummary(overall, lowestNames);

  y = 275;
  setText(BLUE); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
  doc.text("KERNBOODSCHAP", M, y); y += 16;
  setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(11);
  const sumLines = doc.splitTextToSize(summary, W - 2 * M);
  doc.text(sumLines, M, y); y += sumLines.length * 14 + 24;

  // Scores per dimensie tabel
  setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(14);
  doc.text("Scores per dimensie", M, y); y += 18;

  dimensions.forEach((d, i) => {
    const score = dimScores[i];
    const bb = bandIndex(score);
    setFill(SOFT_BG); doc.roundedRect(M, y, W - 2 * M, 52, 8, 8, "F");
    setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(11);
    doc.text(`${d.id}.  ${d.name}`, M + 16, y + 22);

    const barX = M + 16;
    const barY = y + 38;
    const barW = W - 2 * M - 200;
    setFill([226, 232, 240]); doc.rect(barX, barY, barW, 4, "F");
    setFill(readinessColor(bb));
    doc.rect(barX, barY, (barW * score) / 5, 4, "F");

    setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(15);
    doc.text(score.toFixed(1), W - M - 90, y + 24);
    setText(readinessColor(bb));
    doc.setFontSize(8); doc.setFont(PDF_FONT, "bold");
    doc.text(levelLabels[bb].toUpperCase(), W - M - 90, y + 40);

    y += 60;
  });
  addFooter();

  // ============ PAGE 4: DE RODE DRAAD ============
  newPage();
  setText(MUTED); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
  doc.text("PRIORITEITEN", M, 56);
  setText(INK); doc.setFontSize(26);
  doc.text("De rode draad", M, 90);

  setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(11);
  const rdIntro = "Deze drie dimensies zijn het meest urgent en hebben samen de grootste impact op het transformatievermogen van uw organisatie.";
  doc.text(doc.splitTextToSize(rdIntro, W - 2 * M), M, 115);

  y = 160;
  const top3 = sorted.slice(0, 3);
  top3.forEach((x, idx) => {
    const d = dimensions[x.i];
    const cardH = 140;
    setFill([255, 255, 255]);
    setDraw(RULE); doc.setLineWidth(0.5);
    doc.roundedRect(M, y, W - 2 * M, cardH, 10, 10, "FD");
    setFill(idx === 0 ? BLUE : idx === 1 ? MINT : MUTED);
    doc.roundedRect(M, y, 6, cardH, 3, 3, "F");

    setText(MUTED); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(9);
    doc.text(`PRIORITEIT ${idx + 1}`, M + 20, y + 22);
    setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(14);
    doc.text(d.name, M + 20, y + 42);
    setText(MUTED); doc.setFont(PDF_FONT, "italic"); doc.setFontSize(10);
    doc.text(`Score: ${x.s.toFixed(1)} / 5.0  ·  ${levelLabels[bandIndex(x.s)]}`, M + 20, y + 58);

    setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10);
    const rl = doc.splitTextToSize(risks[d.id], W - 2 * M - 40);
    doc.text(rl, M + 20, y + 78);

    setText(BLUE); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(9);
    doc.text("EERSTE STAP", M + 20, y + 78 + rl.length * 12 + 10);
    setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10);
    const fs = doc.splitTextToSize(firstSteps[d.id], W - 2 * M - 40);
    doc.text(fs, M + 20, y + 78 + rl.length * 12 + 24);

    y += cardH + 14;
  });
  addFooter();

  // ============ DIMENSIE PAGINA'S ============
  dimensions.forEach((d, i) => {
    newPage();
    const score = dimScores[i];
    const bb = bandIndex(score);

    setText(MUTED); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(9);
    doc.text(`DIMENSIE ${d.id} VAN 6`, M, 56);
    setText(INK); doc.setFontSize(22);
    const titleLines = doc.splitTextToSize(d.name, W - 2 * M);
    doc.text(titleLines, M, 86);
    let yy = 86 + titleLines.length * 22 + 4;
    setText(MUTED); doc.setFont(PDF_FONT, "italic"); doc.setFontSize(11);
    doc.text(`Kernvraag: ${d.kernvraag}`, M, yy);
    yy += 24;

    // Score card
    setFill(INK); doc.roundedRect(M, yy, W - 2 * M, 80, 10, 10, "F");
    drawScore(score, M + 24, yy + 52, 36, [255, 255, 255], [170, 180, 200]);
    setFill(readinessColor(bb));
    const lbl3 = levelLabels[bb];
    doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
    const lblW3 = doc.getTextWidth(lbl3) + 20;
    doc.roundedRect(W - M - 16 - lblW3, yy + 28, lblW3, 22, 11, 11, "F");
    setText([255, 255, 255]); doc.text(lbl3, W - M - 16 - lblW3 + 10, yy + 43);
    yy += 100;

    const section = (title: string, body: string) => {
      setText(BLUE); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
      doc.text(title.toUpperCase(), M, yy);
      yy += 14;
      setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10.5);
      const lines = doc.splitTextToSize(body, W - 2 * M);
      doc.text(lines, M, yy);
      yy += lines.length * 14 + 16;
    };

    section("Wat dit betekent", interpretations[d.id][bb]);
    section("Risico voor de transformatie", risks[d.id]);
    section("Aanbevolen eerste stap", firstSteps[d.id]);

    // Wat wij hierin doen
    setDraw(RULE); doc.setLineWidth(0.5); doc.line(M, yy, W - M, yy); yy += 16;
    setText(MUTED); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(9);
    doc.text("WAT FIRST FLOOR × DIBIZ HIERIN DOET", M, yy); yy += 16;
    setFill(BLUE_SOFT);
    const serviceLines = doc.splitTextToSize(d.service, W - 2 * M - 24);
    const pillH = Math.max(24, serviceLines.length * 13 + 12);
    doc.roundedRect(M, yy - 2, W - 2 * M, pillH, 12, 12, "F");
    setText(BLUE); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
    doc.text(serviceLines, M + 12, yy + 14);
    addFooter();
  });

  // ============ HOE FF×DIBIZ KAN HELPEN ============
  newPage();
  setText(MUTED); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
  doc.text("ONZE AANPAK", M, 56);
  setText(INK); doc.setFontSize(26);
  doc.text("Hoe First Floor × Dibiz kan helpen", M, 90);

  setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(11);
  const helpIntro = "Strategie waarmaken vraagt executie. Executie vraagt de juiste organisatie. En de juiste organisatie vandaag is de organisatie van de toekomst — waar mensen, processen, tooling, automatisatie en AI agents naadloos samenwerken. Wij bouwen die organisatie met u.";
  doc.text(doc.splitTextToSize(helpIntro, W - 2 * M), M, 115);

  y = 185;
  const services = [
    { t: "Ontwerpen", b: "Structuur, rollen, processen, governance, IT-architectuur", d: "Dimensies 1, 4, 5", c: BLUE_SOFT, tc: BLUE },
    { t: "Bouwen", b: "Leiderschap, teamwerking, skill based organisatie", d: "Dimensies 2, 3, 6", c: MINT_SOFT, tc: [16, 122, 120] as [number, number, number] },
    { t: "Verankeren", b: "Adoptie, procesborging, overdracht, exitcriteria", d: "Dimensies 4, 5, 6", c: SOFT_BG, tc: INK },
  ];
  services.forEach((s) => {
    setFill(s.c); doc.roundedRect(M, y, W - 2 * M, 84, 10, 10, "F");
    setText(s.tc); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(16);
    doc.text(s.t, M + 20, y + 28);
    setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10.5);
    doc.text(s.b, M + 20, y + 50, { maxWidth: W - 2 * M - 200 });
    setText(s.tc); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
    doc.text(s.d, W - M - 20, y + 28, { align: "right" });
    y += 96;
  });

  // Volgende stap
  y += 12;
  setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(16);
  doc.text("Volgende stap", M, y); y += 18;
  setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(11);
  doc.text("Wilt u deze resultaten bespreken en vertalen naar concrete actie? Neem contact op voor een vrijblijvend gesprek.", M, y, { maxWidth: W - 2 * M });
  y += 36;
  setText(BLUE); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(11);
  doc.text("Karen", M, y); setText(DARK); doc.setFont(PDF_FONT, "normal");
  doc.text("  ·  karen@firstfloortalent.be", M + doc.getTextWidth("Karen"), y);
  y += 18;
  setText(BLUE); doc.setFont(PDF_FONT, "bold");
  doc.text("Ellen", M, y); setText(DARK); doc.setFont(PDF_FONT, "normal");
  doc.text("  ·  ellen@dibiz.be", M + doc.getTextWidth("Ellen"), y);
  addFooter();

  // ============ WETENSCHAPPELIJKE VERANTWOORDING ============
  newPage();
  setText(MUTED); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(10);
  doc.text("APPENDIX", M, 56);
  setText(INK); doc.setFontSize(24);
  doc.text("Wetenschappelijke verantwoording", M, 88);

  y = 120;
  setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(13);
  doc.text("Gebruikte bronnen", M, y); y += 18;
  const refs = [
    "Weiner, B. J. (2009). A theory of organizational readiness for change. Implementation Science, 4, 67.",
    "Shea, C. M. et al. (2014). Organizational readiness for implementing change: a psychometric assessment of a new measure (ORIC). Implementation Science, 9, 7.",
    "Anderson, R. J. & Adams, W. A. (2019). Scaling Leadership. Wiley.",
    "Jo, Y. & Hong, A. J. (2023). Development and Validation of a Readiness for Organizational Change Scale. SAGE Open, 13(4).",
    "Kotter, J. P. (2012). Leading Change (2nd ed.). Harvard Business Review Press.",
    "Cohen, W. M. & Levinthal, D. A. (1990). Absorptive Capacity. Administrative Science Quarterly, 35(1), 128–152.",
    "Galbraith, J. R. (2014). Designing Organizations. Jossey-Bass.",
    "IDC (2026). Futurescape for the AI-enabled Future of Work.",
    "DASA (2024). Digital Readiness Assessment — 7 core dimensions.",
    "TMA Competentiemodel. 53 gevalideerde competenties met gedragsankers op 4 niveaus.",
  ];
  setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(9.5);
  refs.forEach((r) => {
    const ll = doc.splitTextToSize("•  " + r, W - 2 * M);
    doc.text(ll, M, y);
    y += ll.length * 12 + 4;
  });

  y += 12;
  setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(12);
  doc.text("Constructvaliditeit", M, y); y += 14;
  setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10);
  const cv = "De 6 dimensies zijn afgeleid uit een synthese van bovenstaande bronnen. Elke dimensie is opgebouwd uit items die aansluiten bij gevalideerde constructen (change commitment, change efficacy, absorptive capacity, procesvolwassenheid, decision rights).";
  const cvl = doc.splitTextToSize(cv, W - 2 * M);
  doc.text(cvl, M, y); y += cvl.length * 13 + 14;

  setText(INK); doc.setFont(PDF_FONT, "bold"); doc.setFontSize(12);
  doc.text("Beoogd gebruik", M, y); y += 14;
  setText(DARK); doc.setFont(PDF_FONT, "normal"); doc.setFontSize(10);
  const bg = "De DRI is ontworpen als diagnostisch instrument voor commerciële inzet door First Floor × Dibiz. Het is géén klinisch of academisch meetinstrument. De scores zijn indicatief en dienen als startpunt voor een verdiepend gesprek, niet als absoluut oordeel.";
  doc.text(doc.splitTextToSize(bg, W - 2 * M), M, y);

  addFooter(true);

  const safeOrg = (contact.organisatie || "rapport").replace(/[^a-zA-Z0-9]+/g, "-");
  doc.save(`DRI-Rapport-${safeOrg}.pdf`);
}
