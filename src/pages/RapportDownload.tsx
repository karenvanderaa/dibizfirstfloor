import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { generateDRIPdf, type Contact } from "@/utils/driPdf";

type ScanData = { answers: number[]; dimScores: number[]; overall: number };
type State =
  | { kind: "loading" }
  | { kind: "generating" }
  | { kind: "done"; contact: Contact }
  | { kind: "error"; title?: string; message: string };

export default function RapportDownload() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!token) {
        setState({ kind: "error", message: "Geen geldige downloadlink. Vraag een nieuwe link aan via de scan." });
        return;
      }
      try {
        const { data, error } = await supabase.functions.invoke("redeem-report-link", {
          body: { token },
        });
        if (cancelled) return;
        if (error || !data?.ok) {
          const code = data?.error ?? "";
          const message =
            code === "expired"
              ? "Deze link is verlopen. Doe de scan opnieuw om een nieuwe link te ontvangen."
              : code === "not_found"
                ? "Deze link is niet (meer) geldig."
                : "Er ging iets mis bij het ophalen van uw rapport.";
          setState({ kind: "error", message });
          return;
        }
        setState({ kind: "generating" });
        const contact: Contact = data.contact;
        const scan: ScanData = data.scanData;
        try {
          await generateDRIPdf({ contact, dimScores: scan.dimScores, overall: scan.overall });
        } catch (pdfError) {
          console.error("PDF generation failed", pdfError);
          if (!cancelled) {
            setState({
              kind: "error",
              title: "PDF kon niet worden aangemaakt",
              message: "Uw downloadlink is geldig, maar het rapport kon niet gegenereerd worden. Probeer opnieuw of vraag een nieuwe link aan.",
            });
          }
          return;
        }
        if (!cancelled) setState({ kind: "done", contact });
      } catch (e) {
        console.error(e);
        if (!cancelled) setState({ kind: "error", title: "Rapport niet bereikbaar", message: "Er ging iets mis. Probeer het later opnieuw." });
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  return (
    <main className="min-h-screen bg-[#F4F6FB] font-body">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-full rounded-3xl border border-[#E2E8F0] bg-white p-10 shadow-sm">
          {(state.kind === "loading" || state.kind === "generating") && (
            <>
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#315EFF]" />
              <h1 className="mt-6 font-heading text-2xl font-bold text-[#1A1A2E]">
                {state.kind === "loading" ? "Uw rapport wordt opgehaald…" : "PDF wordt gegenereerd…"}
              </h1>
              <p className="mt-3 text-sm text-[#6B7384]">Een ogenblik geduld.</p>
            </>
          )}

          {state.kind === "done" && (
            <>
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#6CC1BF]" />
              <h1 className="mt-6 font-heading text-2xl font-bold text-[#1A1A2E]">
                Klaar, {state.contact.naam.split(" ")[0]}!
              </h1>
              <p className="mt-3 text-sm text-[#6B7384]">
                Uw DRI™-rapport is gedownload. Check uw downloads-map.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#1A1A2E] px-5 py-3 font-heading text-sm font-semibold text-white hover:bg-[#0f0f1e]"
              >
                <Download className="h-4 w-4" /> Opnieuw downloaden
              </button>
            </>
          )}

          {state.kind === "error" && (
            <>
              <AlertCircle className="mx-auto h-12 w-12 text-[#E85D3A]" />
              <h1 className="mt-6 font-heading text-2xl font-bold text-[#1A1A2E]">{state.title ?? "Link niet geldig"}</h1>
              <p className="mt-3 text-sm text-[#6B7384]">{state.message}</p>
              <Link
                to="/dri"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#315EFF] px-5 py-3 font-heading text-sm font-semibold text-white hover:bg-[#234bd6]"
              >
                Naar de scan
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
