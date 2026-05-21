import jsPDF from "jspdf";
import { dimensions, interpretations, risks, firstSteps, bandIndex, levelLabels, levelColors, overallSummary } from "@/data/dri";

export type Contact = { naam: string; email: string; organisatie: string; functie: string };

const BLUE: [number, number, number] = [49, 94, 255];
const MINT: [number, number, number] = [108, 193, 191];
const INK: [number, number, number] = [26, 26, 46];
const DARK: [number, number, number] = [45, 55, 72];
const MUTED: [number, number, number] = [107, 115, 132];
const RULE: [number, number, number] = [226, 232, 240];

export function generateDRIPdf(opts: {
  contact: Contact;
  dimScores: number[]; // length 6, in dimension order
  overall: number;
}) {
  const { contact, dimScores, overall } = opts;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;

  const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
  const setText = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const setDraw = (c: [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);

  const splitGradient = (y: number) => {
    setFill(BLUE); doc.rect(0, y, W / 2, 4, "F");
    setFill(MINT); doc.rect(W / 2, y, W / 2, 4, "F");
  };

  // ---- COVER ----
  setFill(INK); doc.rect(0, 0, W, H, "F");
  splitGradient(120);
  setText([255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DELIVERY READINESS INDEX™", M, 90);
  doc.setFontSize(36);
  doc.text("Rapport", M, 200);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  setText([200, 210, 230]);
  doc.text(contact.organisatie || "—", M, 240);
  doc.setFontSize(11);
  doc.text(new Date().toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" }), M, 264);

  // Score block on cover
  setFill([255, 255, 255]); doc.roundedRect(M, 320, W - 2 * M, 130, 10, 10, "F");
  setText(INK);
  doc.setFontSize(11); doc.setFont("helvetica", "bold");
  doc.text("DRI-SCORE", M + 24, 350);
  doc.setFontSize(56);
  doc.text(`${overall.toFixed(1)}`, M + 24, 415);
  doc.setFont("helvetica", "normal"); doc.setFontSize(14);
  setText(MUTED); doc.text("/ 5.0", M + 24 + doc.getTextWidth(`${overall.toFixed(1)}`) + 8, 415);
  const b = bandIndex(overall);
  setFill(levelColors[b] as unknown as [number, number, number]);
  const lbl = levelLabels[b];
  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  const lblW = doc.getTextWidth(lbl) + 24;
  doc.roundedRect(W - M - 24 - lblW, 335, lblW, 26, 13, 13, "F");
  setText([255, 255, 255]); doc.text(lbl, W - M - 24 - lblW + 12, 352);

  setText([180, 195, 220]);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10);
  doc.text("Opgesteld door First Floor × Dibiz", M, H - 60);
  doc.text(`Voor ${contact.naam} · ${contact.functie}`, M, H - 44);

  // ---- PAGE 2: Executive summary ----
  doc.addPage();
  splitGradient(0);
  setText(INK);
  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text("EXECUTIVE SUMMARY", M, 60);
  doc.setFontSize(24);
  doc.text("De rode draad", M, 95);

  // sorted lowest dims
  const indexed = dimScores.map((s, i) => ({ s, i }));
  const sorted = [...indexed].sort((a, b) => a.s - b.s);
  const lowestNames = sorted.map((x) => dimensions[x.i].name);
  const summary = overallSummary(overall, lowestNames);

  setText(DARK);
  doc.setFont("helvetica", "normal"); doc.setFontSize(11);
  const summaryLines = doc.splitTextToSize(summary, W - 2 * M);
  doc.text(summaryLines, M, 125);

  // Scores table
  let y = 125 + summaryLines.length * 14 + 30;
  setText(INK); doc.setFont("helvetica", "bold"); doc.setFontSize(14);
  doc.text("Scores per dimensie", M, y);
  y += 20;

  dimensions.forEach((d, i) => {
    const score = dimScores[i];
    const bb = bandIndex(score);
    setFill([244, 246, 251]); doc.roundedRect(M, y, W - 2 * M, 56, 8, 8, "F");
    setText(INK); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
    doc.text(`${d.id}. ${d.name}`, M + 16, y + 22);
    setText(MUTED); doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    doc.text(d.kernvraag, M + 16, y + 38);

    // Bar
    const barX = M + 16;
    const barY = y + 46;
    const barW = W - 2 * M - 200;
    setFill([226, 232, 240]); doc.rect(barX, barY, barW, 4, "F");
    setFill(levelColors[bb] as unknown as [number, number, number]);
    doc.rect(barX, barY, (barW * score) / 5, 4, "F");

    // Score
    setText(INK); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text(score.toFixed(1), W - M - 80, y + 28);
    setText(levelColors[bb] as unknown as [number, number, number]);
    doc.setFontSize(8); doc.setFont("helvetica", "bold");
    doc.text(levelLabels[bb].toUpperCase(), W - M - 80, y + 44);

    y += 64;
  });

  // ---- Per-dimension pages ----
  dimensions.forEach((d, i) => {
    doc.addPage();
    splitGradient(0);
    const score = dimScores[i];
    const bb = bandIndex(score);

    setText(MUTED); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
    doc.text(`DIMENSIE ${d.id} VAN 6`, M, 60);
    setText(INK); doc.setFontSize(22);
    const titleLines = doc.splitTextToSize(d.name, W - 2 * M);
    doc.text(titleLines, M, 90);
    let yy = 90 + titleLines.length * 22 + 6;
    setText(MUTED); doc.setFont("helvetica", "italic"); doc.setFontSize(11);
    doc.text(`Kernvraag: ${d.kernvraag}`, M, yy);
    yy += 26;

    // Score card
    setFill(INK); doc.roundedRect(M, yy, W - 2 * M, 80, 10, 10, "F");
    setText([255, 255, 255]); doc.setFont("helvetica", "bold"); doc.setFontSize(36);
    doc.text(score.toFixed(1), M + 24, yy + 52);
    doc.setFontSize(10); doc.setFont("helvetica", "normal");
    setText([170, 180, 200]); doc.text("/ 5.0", M + 24 + doc.getTextWidth(score.toFixed(1)) + 6, yy + 52);
    setFill(levelColors[bb] as unknown as [number, number, number]);
    const lbl2 = levelLabels[bb];
    doc.setFont("helvetica", "bold"); doc.setFontSize(10);
    const lblW2 = doc.getTextWidth(lbl2) + 20;
    doc.roundedRect(W - M - 16 - lblW2, yy + 28, lblW2, 22, 11, 11, "F");
    setText([255, 255, 255]); doc.text(lbl2, W - M - 16 - lblW2 + 10, yy + 43);
    yy += 100;

    const section = (title: string, body: string) => {
      setText(BLUE); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
      doc.text(title.toUpperCase(), M, yy);
      yy += 16;
      setText(DARK); doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
      const lines = doc.splitTextToSize(body, W - 2 * M);
      doc.text(lines, M, yy);
      yy += lines.length * 14 + 16;
    };

    section("Wat dit betekent", interpretations[d.id][bb]);
    section("Risico voor de transformatie", risks[d.id]);
    section("Aanbevolen eerste stap", firstSteps[d.id]);

    // Badge
    setDraw(RULE); doc.line(M, yy, W - M, yy); yy += 18;
    setText(MUTED); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
    doc.text("WAT FIRST FLOOR × DIBIZ HIERIN DOET", M, yy); yy += 14;
    setFill([232, 238, 255]);
    const badgeW = doc.getTextWidth(d.badge) + 22;
    doc.roundedRect(M, yy - 2, badgeW, 22, 11, 11, "F");
    setText(BLUE); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
    doc.text(d.badge, M + 11, yy + 13);

    // Footer
    setText(MUTED); doc.setFont("helvetica", "normal"); doc.setFontSize(8);
    doc.text(`Delivery Readiness Index™ · ${contact.organisatie}`, M, H - 28);
    doc.text(`${i + 3}`, W - M, H - 28, { align: "right" });
  });

  // ---- Final CTA page ----
  doc.addPage();
  setFill(INK); doc.rect(0, 0, W, H, "F");
  splitGradient(0);
  setText([255, 255, 255]);
  doc.setFont("helvetica", "bold"); doc.setFontSize(28);
  doc.text("Klaar voor het gesprek?", M, 200);
  doc.setFont("helvetica", "normal"); doc.setFontSize(13);
  setText([200, 210, 230]);
  const cta = "Dit rapport is een startpunt. De échte waarde ontstaat in het gesprek over wat u ermee gaat doen. First Floor × Dibiz helpt u de organisatie van de toekomst te bouwen — waar mensen, processen, tooling, automatisatie en AI agents naadloos samenwerken.";
  doc.text(doc.splitTextToSize(cta, W - 2 * M), M, 240);
  setText([255, 255, 255]); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text("karen@firstfloortalent.be", M, 380);
  doc.text("First Floor × Dibiz", M, H - 60);
  setText([170, 185, 210]); doc.setFont("helvetica", "normal"); doc.setFontSize(9);
  doc.text("Wij bouwen de organisatie van de toekomst met u.", M, H - 44);

  const filename = `DRI-Rapport-${contact.organisatie.replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
}
