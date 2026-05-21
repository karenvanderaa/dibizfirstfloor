import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from "recharts";
import { ArrowLeft, ArrowRight, Calendar, Download, Mail, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  dimensions,
  interpretations,
  risks,
  firstSteps,
  bandIndex,
  levelLabels,
  levelColors,
  overallSummary,
} from "@/data/dri";
import { generateDRIPdf, type Contact } from "@/utils/driPdf";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

type Step = "landing" | "about" | "contact" | "questions" | "results";

const TOTAL_QUESTIONS = 24;

// Flatten questions with their dimension reference
const flatQuestions = dimensions.flatMap((d) =>
  d.questions.map((q, qi) => ({ dimId: d.id, dimName: d.name, dimIndex: dimensions.indexOf(d), localIdx: qi, text: q }))
);

const likertLabels = [
  "Helemaal niet akkoord",
  "Niet akkoord",
  "Neutraal",
  "Akkoord",
  "Helemaal akkoord",
];

// Split gradient bar
const SplitGradient = ({ progress = 100 }: { progress?: number }) => (
  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
    <div
      className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #315EFF 0%, #315EFF 50%, #6CC1BF 50%, #6CC1BF 100%)",
      }}
    />
  </div>
);

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

// =================== LANDING ===================
function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div {...fade} className="relative min-h-[88vh] overflow-hidden bg-[#1A1A2E] text-white">
      <div className="absolute inset-x-0 top-0">
        <SplitGradient />
      </div>
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#315EFF]/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#6CC1BF]/15 blur-3xl" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-4xl flex-col justify-center px-6 py-20">
        <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[#6CC1BF]">
          <Sparkles className="h-3.5 w-3.5" /> FIRST FLOOR × DIBIZ
        </div>
        <h1 className="font-heading text-5xl font-extrabold leading-[1.05] md:text-7xl">
          Delivery Readiness <span className="text-[#6CC1BF]">Index™</span>
        </h1>
        <p className="mt-6 max-w-2xl font-heading text-2xl font-light leading-snug text-white/90 md:text-3xl">
          Uw strategie klopt. Maar voert uw organisatie ze ook uit?
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          De Delivery Readiness Index meet in 24 vragen over 6 dimensies hoe goed uw organisatie is toegerust om transformatie niet alleen te starten, maar ook daadwerkelijk te laten landen. De scan duurt ±10 minuten. U ontvangt direct een visueel rapport met uw scores en concrete aanbevelingen.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 rounded-xl bg-[#6CC1BF] px-7 py-4 font-heading text-base font-semibold text-[#1A1A2E] shadow-[0_10px_40px_-10px_rgba(108,193,191,0.6)] transition hover:bg-[#7dd0ce]"
          >
            Start de scan
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
          <div className="text-sm text-white/50">24 vragen · 6 dimensies · ±10 min</div>
        </div>
        <div className="mt-16 text-xs uppercase tracking-[0.3em] text-white/40">
          Een initiatief van First Floor × Dibiz
        </div>
      </div>
    </motion.div>
  );
}

// =================== ABOUT ===================
function AboutScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const cards = [
    {
      title: "Weiner (2009)",
      body: "Theory of Organizational Readiness for Change — het meest geciteerde model in de implementatiewetenschap. Gevalideerd meetinstrument (ORIC, α > 0.89).",
    },
    {
      title: "Transformatie-readiness",
      body: "Frameworks van DASA, IDC en academisch onderzoek identificeren consistent dezelfde dimensies: strategie, leiderschap, cultuur, operating model, technologie en talent.",
    },
    {
      title: "Scaling Leadership",
      body: "Anderson & Adams (2019) — het onderscheid tussen creative en reactive leiderschap, het Canceling Effect en de Development Gap.",
    },
  ];
  return (
    <motion.div {...fade} className="min-h-[88vh] bg-[#F4F6FB] py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10">
          <SplitGradient progress={100} />
        </div>
        <div className="mb-12">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#315EFF]">Over de scan</div>
          <h2 className="font-heading text-4xl font-bold leading-tight text-[#1A1A2E] md:text-5xl">
            Wat meet de Delivery Readiness Index™?
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#2D3748]">
            De DRI™ meet hoe klaar uw organisatie is om een transformatie niet alleen te starten, maar ook daadwerkelijk te laten landen. Niet de intentie telt, maar het vermogen om strategie om te zetten in werkend resultaat.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6B7384]">
            De kernlogica: strategie waarmaken vraagt executie. Executie vraagt de juiste organisatie. En de juiste organisatie vandaag is de organisatie van de toekomst — waar mensen, processen, tooling, automatisatie en AI agents naadloos samenwerken.
          </p>
        </div>

        <div className="mb-14">
          <h3 className="mb-5 font-heading text-xl font-semibold text-[#1A1A2E]">Wetenschappelijke basis</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((c) => (
              <div key={c.title} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <div className="mb-3 inline-block rounded-md bg-[#E8EEFF] px-2.5 py-1 text-xs font-bold text-[#315EFF]">
                  {c.title}
                </div>
                <p className="text-sm leading-relaxed text-[#2D3748]">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#6B7384]">
            Aanvullend verankerd in de TMA-competenties (53 gevalideerde competenties).
          </p>
        </div>

        <div className="mb-14">
          <h3 className="mb-5 font-heading text-xl font-semibold text-[#1A1A2E]">De 6 dimensies</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {dimensions.map((d) => (
              <div key={d.id} className="flex gap-4 rounded-xl border border-[#E2E8F0] bg-white p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1A1A2E] font-heading text-sm font-bold text-[#6CC1BF]">
                  {d.id}
                </div>
                <div>
                  <div className="font-heading font-semibold text-[#1A1A2E]">{d.name}</div>
                  <div className="mt-1 text-sm italic text-[#6B7384]">{d.kernvraag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 rounded-2xl bg-[#1A1A2E] p-8 text-white">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6CC1BF]">Praktisch</div>
          <div className="mt-3 font-heading text-2xl font-semibold">24 vragen · 6 dimensies · ±10 minuten</div>
          <p className="mt-3 text-sm text-white/70">
            U ontvangt direct een visueel rapport met scores per dimensie en concrete aanbevelingen.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7384] hover:text-[#1A1A2E]">
            <ArrowLeft className="h-4 w-4" /> Terug
          </button>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-xl bg-[#315EFF] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-lg shadow-[#315EFF]/25 transition hover:bg-[#2347d1]"
          >
            Ga verder <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// =================== CONTACT ===================
function ContactScreen({ onSubmit, onBack }: { onSubmit: (c: Contact) => void; onBack: () => void }) {
  const [c, setC] = useState<Contact>({ naam: "", email: "", organisatie: "", functie: "" });
  const valid = c.naam.trim() && /\S+@\S+\.\S+/.test(c.email) && c.organisatie.trim() && c.functie.trim();
  return (
    <motion.div {...fade} className="min-h-[88vh] bg-[#F4F6FB] py-16 md:py-24">
      <div className="mx-auto max-w-xl px-6">
        <div className="mb-10"><SplitGradient progress={50} /></div>
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#315EFF]">Bijna klaar</div>
        <h2 className="mb-3 font-heading text-3xl font-bold text-[#1A1A2E] md:text-4xl">Uw gegevens</h2>
        <p className="mb-8 text-[#6B7384]">
          We gebruiken deze enkel om uw persoonlijk rapport toe te sturen.
        </p>
        <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          {([
            { k: "naam", label: "Naam", type: "text", ph: "Voor- en achternaam" },
            { k: "email", label: "E-mailadres", type: "email", ph: "u@bedrijf.be" },
            { k: "organisatie", label: "Organisatie", type: "text", ph: "Naam van uw organisatie" },
            { k: "functie", label: "Functietitel", type: "text", ph: "Bv. CEO, HR-directeur" },
          ] as const).map((f) => (
            <div key={f.k}>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6B7384]">
                {f.label}
              </label>
              <input
                type={f.type}
                value={c[f.k]}
                onChange={(e) => setC({ ...c, [f.k]: e.target.value })}
                placeholder={f.ph}
                maxLength={150}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 font-body text-[#1A1A2E] outline-none transition focus:border-[#315EFF] focus:ring-2 focus:ring-[#315EFF]/15"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7384] hover:text-[#1A1A2E]">
            <ArrowLeft className="h-4 w-4" /> Terug
          </button>
          <button
            disabled={!valid}
            onClick={() => valid && onSubmit(c)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1A1A2E] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-lg transition hover:bg-[#0f0f1e] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Start de vragen <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// =================== QUESTION SCREEN ===================
function QuestionScreen({
  idx,
  value,
  onAnswer,
  onNext,
  onBack,
}: {
  idx: number;
  value: number | null;
  onAnswer: (v: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const q = flatQuestions[idx];
  const progress = ((idx + 1) / TOTAL_QUESTIONS) * 100;
  const isLast = idx === TOTAL_QUESTIONS - 1;
  return (
    <motion.div key={idx} {...fade} className="min-h-[88vh] bg-[#F4F6FB] py-10 md:py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7384]">
          <span>Vraag {idx + 1} van {TOTAL_QUESTIONS}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <SplitGradient progress={progress} />

        <div className="mt-10 rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-[0_8px_40px_-12px_rgba(26,26,46,0.12)] md:p-10">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#315EFF]">
            Dimensie {q.dimId} van 6 — {q.dimName}
          </div>
          <h3 className="font-heading text-2xl font-semibold leading-snug text-[#1A1A2E] md:text-3xl">
            {q.text}
          </h3>

          <div className="mt-8 grid gap-3 md:grid-cols-5">
            {[1, 2, 3, 4, 5].map((n) => {
              const selected = value === n;
              return (
                <button
                  key={n}
                  onClick={() => onAnswer(n)}
                  className={[
                    "group flex flex-col items-center justify-center rounded-xl border px-3 py-5 text-center transition-all",
                    selected
                      ? "border-transparent bg-gradient-to-br from-[#315EFF] to-[#6CC1BF] text-white shadow-lg shadow-[#315EFF]/25"
                      : "border-[#E2E8F0] bg-white text-[#1A1A2E] hover:border-[#315EFF] hover:bg-[#E8EEFF]",
                  ].join(" ")}
                >
                  <span className={"font-heading text-3xl font-bold " + (selected ? "text-white" : "text-[#1A1A2E]")}>
                    {n}
                  </span>
                  <span className={"mt-2 text-[11px] font-medium leading-tight " + (selected ? "text-white/90" : "text-[#6B7384]")}>
                    {likertLabels[n - 1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={idx === 0}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7384] transition hover:text-[#1A1A2E] disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Vorige
          </button>
          <button
            onClick={onNext}
            disabled={value === null}
            className="inline-flex items-center gap-2 rounded-xl bg-[#315EFF] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-lg shadow-[#315EFF]/25 transition hover:bg-[#2347d1] disabled:cursor-not-allowed disabled:bg-[#94a3b8] disabled:shadow-none"
          >
            {isLast ? "Bekijk mijn resultaten" : "Volgende"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// =================== RESULTS ===================
function ResultsPage({ contact, answers }: { contact: Contact; answers: number[] }) {
  const dimScores = useMemo(
    () =>
      dimensions.map((_, i) => {
        const start = i * 4;
        const sum = answers.slice(start, start + 4).reduce((a, b) => a + b, 0);
        return Math.round((sum / 4) * 10) / 10;
      }),
    [answers]
  );
  const overall = useMemo(
    () => Math.round((dimScores.reduce((a, b) => a + b, 0) / dimScores.length) * 10) / 10,
    [dimScores]
  );
  const overallBand = bandIndex(overall);

  const sorted = dimScores.map((s, i) => ({ s, i })).sort((a, b) => a.s - b.s);
  const top3 = sorted.slice(0, 3).map((x) => ({ ...x, d: dimensions[x.i] }));

  const radarData = dimensions.map((d, i) => ({
    dim: d.name.split(" ").slice(0, 2).join(" "),
    score: dimScores[i],
    full: 5,
  }));

  const summary = overallSummary(
    overall,
    sorted.map((x) => dimensions[x.i].name)
  );

  return (
    <motion.div {...fade} className="bg-[#F4F6FB]">
      {/* Hero score */}
      <section className="relative overflow-hidden bg-[#1A1A2E] py-16 text-white md:py-24">
        <div className="absolute inset-x-0 top-0"><SplitGradient /></div>
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#6CC1BF]/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#315EFF]/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#6CC1BF]">UW DRI™-RAPPORT</div>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">{contact.organisatie}</h2>
          <p className="mt-1 text-sm text-white/60">{contact.naam} · {contact.functie}</p>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Uw DRI-score</div>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-heading text-7xl font-extrabold leading-none text-[#6CC1BF] md:text-8xl">
                  {overall.toFixed(1)}
                </span>
                <span className="font-heading text-2xl font-light text-white/60">/ 5.0</span>
              </div>
              <div
                className="mt-5 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{ background: levelColors[overallBand], color: "#fff" }}
              >
                {levelLabels[overallBand]}
              </div>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">{summary}</p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
              <div className="h-72 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="75%">
                    <PolarGrid stroke="#ffffff22" />
                    <PolarAngleAxis
                      dataKey="dim"
                      tick={{ fill: "#ffffffcc", fontSize: 11, fontFamily: "Inter" }}
                    />
                    <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                    <Radar name="Score" dataKey="score" stroke="#315EFF" fill="#315EFF" fillOpacity={0.35} dot={{ r: 4, fill: "#6CC1BF", stroke: "#fff", strokeWidth: 1 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dimension cards */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#315EFF]">Scores per dimensie</div>
        <h3 className="mb-10 font-heading text-3xl font-bold text-[#1A1A2E] md:text-4xl">
          Waar staat uw organisatie?
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          {dimensions.map((d, i) => {
            const s = dimScores[i];
            const b = bandIndex(s);
            return (
              <div key={d.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6B7384]">Dimensie {d.id}</div>
                    <div className="mt-1 font-heading text-lg font-bold text-[#1A1A2E]">{d.name}</div>
                    <div className="mt-1 text-sm italic text-[#6B7384]">{d.kernvraag}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading text-3xl font-bold text-[#1A1A2E]">{s.toFixed(1)}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: levelColors[b] }}>
                      {levelLabels[b]}
                    </div>
                  </div>
                </div>
                <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-[#F4F6FB]">
                  <div className="h-full transition-all" style={{ width: `${(s / 5) * 100}%`, background: levelColors[b] }} />
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[#2D3748]">{interpretations[d.id][b]}</p>
                <div className="space-y-3 border-t border-[#E2E8F0] pt-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#315EFF]">Risico voor de transformatie</div>
                    <div className="mt-1 text-sm text-[#2D3748]">{risks[d.id]}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#6CC1BF]">Aanbevolen eerste stap</div>
                    <div className="mt-1 text-sm text-[#2D3748]">{firstSteps[d.id]}</div>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center rounded-full bg-[#E8EEFF] px-3 py-1 text-xs font-bold text-[#315EFF]">
                  {d.badge}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Red thread */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#315EFF]">De rode draad</div>
          <h3 className="mb-10 font-heading text-3xl font-bold text-[#1A1A2E] md:text-4xl">
            Hier zit uw grootste hefboom
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {lowestTwo.map((x, idx) => (
              <div key={x.i} className="rounded-2xl border border-[#E2E8F0] bg-[#F4F6FB] p-7">
                <div className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">Prioriteit {idx + 1}</div>
                <div className="mt-2 font-heading text-xl font-bold text-[#1A1A2E]">{x.d.name}</div>
                <div className="mt-1 text-sm italic text-[#6B7384]">Score: {x.s.toFixed(1)} / 5.0</div>
                <p className="mt-4 text-sm leading-relaxed text-[#2D3748]">{risks[x.d.id]}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#2D3748]">
                  <span className="font-semibold text-[#1A1A2E]">Eerste stap: </span>{firstSteps[x.d.id]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#1A1A2E] py-16 text-white md:py-24">
        <div className="absolute inset-x-0 top-0"><SplitGradient /></div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h3 className="font-heading text-3xl font-bold md:text-5xl">Wilt u deze resultaten bespreken?</h3>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg">
            Dit rapport is een startpunt. De échte waarde ontstaat in het gesprek over wat u ermee gaat doen.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#6CC1BF] px-6 py-4 font-heading text-sm font-semibold text-[#1A1A2E] shadow-lg transition hover:bg-[#7dd0ce]"
            >
              <Calendar className="h-4 w-4" /> Plan een gesprek
            </a>
            <button
              onClick={() => generateDRIPdf({ contact, dimScores, overall })}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 font-heading text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Download className="h-4 w-4" /> Download rapport als PDF
            </button>
            <a
              href="mailto:karen@firstfloortalent.be"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 font-heading text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" /> Mail Karen
            </a>
          </div>
          <p className="mt-12 text-sm text-white/50">
            First Floor × Dibiz — Wij bouwen de organisatie van de toekomst met u.
          </p>
        </div>
      </section>
    </motion.div>
  );
}

// =================== ORCHESTRATOR ===================
export default function DRISection() {
  const [step, setStep] = useState<Step>("landing");
  const [contact, setContact] = useState<Contact | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL_QUESTIONS).fill(null));

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sendToBrevo = async (c: Contact, overall: number) => {
    try {
      const b = bandIndex(overall);
      await supabase.functions.invoke("add-to-brevo", {
        body: {
          email: c.email,
          firstName: c.naam,
          organisatie: c.organisatie,
          score: overall,
          scoreLabel: levelLabels[b],
        },
      });
    } catch (e) {
      console.error("brevo sync failed", e);
    }
  };

  const handleContactSubmit = (c: Contact) => {
    setContact(c);
    setStep("questions");
    setQIdx(0);
    goTop();
  };

  const setAnswer = (v: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = v;
      return next;
    });
  };

  const handleNextQuestion = async () => {
    if (qIdx < TOTAL_QUESTIONS - 1) {
      setQIdx(qIdx + 1);
      goTop();
    } else {
      // finalize
      const filled = answers.map((a) => a ?? 3);
      const dimScores = dimensions.map((_, i) => {
        const start = i * 4;
        const sum = filled.slice(start, start + 4).reduce((a, b) => a + b, 0);
        return Math.round((sum / 4) * 10) / 10;
      });
      const overall = Math.round((dimScores.reduce((a, b) => a + b, 0) / dimScores.length) * 10) / 10;
      if (contact) {
        sendToBrevo(contact, overall);
        toast({ title: "Uw rapport is klaar", description: "Scroll door uw persoonlijk DRI™-rapport." });
      }
      setStep("results");
      goTop();
    }
  };

  return (
    <div className="font-body">
      <AnimatePresence mode="wait">
        {step === "landing" && (
          <LandingScreen key="landing" onStart={() => { setStep("about"); goTop(); }} />
        )}
        {step === "about" && (
          <AboutScreen key="about" onNext={() => { setStep("contact"); goTop(); }} onBack={() => { setStep("landing"); goTop(); }} />
        )}
        {step === "contact" && (
          <ContactScreen key="contact" onSubmit={handleContactSubmit} onBack={() => { setStep("about"); goTop(); }} />
        )}
        {step === "questions" && (
          <QuestionScreen
            key={`q-${qIdx}`}
            idx={qIdx}
            value={answers[qIdx]}
            onAnswer={setAnswer}
            onNext={handleNextQuestion}
            onBack={() => { if (qIdx > 0) { setQIdx(qIdx - 1); goTop(); } }}
          />
        )}
        {step === "results" && contact && (
          <ResultsPage key="results" contact={contact} answers={answers.map((a) => a ?? 3)} />
        )}
      </AnimatePresence>
    </div>
  );
}
