// request-report-link: maakt token aan, slaat scan-data op, verstuurt magic-link mail.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { leadSchema, hasMxRecord } from "../_shared/leadValidation.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PUBLIC_APP_URL = Deno.env.get("PUBLIC_APP_URL") ?? "https://dibizfirstfloor.lovable.app";
const TOKEN_TTL_DAYS = 7;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body = await req.json();
    const { contact, scanData } = body as {
      contact: Record<string, string>;
      scanData: { answers: number[]; dimScores: number[]; overall: number };
    };

    // Defence-in-depth: re-valideer alles server-side.
    const parsed = leadSchema.safeParse(contact);
    if (!parsed.success) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_contact" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!scanData || !Array.isArray(scanData.answers) || !Array.isArray(scanData.dimScores)) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_scan_data" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!(await hasMxRecord(parsed.data.email))) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_email_domain" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const expiresAt = new Date(Date.now() + TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const { data: inserted, error: insertErr } = await supabase
      .from("report_tokens")
      .insert({
        email: parsed.data.email,
        naam: parsed.data.naam,
        organisatie: parsed.data.organisatie,
        functie: parsed.data.functie,
        scan_data: scanData,
        expires_at: expiresAt,
      })
      .select("token")
      .single();

    if (insertErr || !inserted) {
      console.error("insert error", insertErr);
      return new Response(JSON.stringify({ ok: false, error: "db_error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const downloadUrl = `${PUBLIC_APP_URL}/rapport?token=${inserted.token}`;

    // Magic-link mail via Lovable transactional email.
    const { error: mailErr } = await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "report-download-link",
        recipientEmail: parsed.data.email,
        idempotencyKey: `report-${inserted.token}`,
        templateData: {
          naam: parsed.data.naam.split(" ")[0],
          downloadUrl,
          expiresDays: TOKEN_TTL_DAYS,
        },
      },
    });
    if (mailErr) {
      console.error("mail send error", mailErr);
      // Token blijft staan zodat user opnieuw kan vragen.
      return new Response(JSON.stringify({ ok: false, error: "mail_failed" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("request-report-link error", e);
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
