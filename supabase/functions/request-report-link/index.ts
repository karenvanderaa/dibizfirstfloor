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

    // Magic-link mail via Brevo transactional API.
    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY ontbreekt");
      return new Response(JSON.stringify({ ok: false, error: "mail_not_configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const firstName = parsed.data.naam.split(" ")[0];
    const htmlContent = `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><title>Uw DRI-rapport</title></head>
<body style="margin:0;padding:0;background:#F4F6FB;font-family:'Helvetica Neue',Arial,sans-serif;color:#1A1A2E;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FB;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;padding:40px;max-width:560px;">
        <tr><td>
          <h1 style="font-size:22px;font-weight:700;margin:0 0 16px;color:#1A1A2E;">Hallo ${firstName},</h1>
          <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">Bedankt voor het invullen van de Delivery Readiness Index&trade;.</p>
          <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">Klik op onderstaande knop om uw persoonlijke rapport te downloaden:</p>
          <p style="margin:0 0 24px;">
            <a href="${downloadUrl}" style="display:inline-block;background:#315EFF;color:#ffffff;text-decoration:none;font-weight:600;padding:14px 28px;border-radius:12px;font-size:15px;">Download mijn rapport</a>
          </p>
          <p style="font-size:13px;line-height:1.5;color:#6B7384;margin:0 0 8px;">Deze link is ${TOKEN_TTL_DAYS} dagen geldig. Werkt de knop niet? Kopieer deze URL in uw browser:</p>
          <p style="font-size:12px;line-height:1.5;color:#6B7384;word-break:break-all;margin:0 0 32px;">${downloadUrl}</p>
          <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0;">
          <p style="font-size:12px;line-height:1.5;color:#6B7384;margin:0;">Vragen? Antwoord gewoon op deze e-mail.<br>&mdash; Karen Van der Aa, First Floor &times; Dibiz</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

    const mailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Karen Van der Aa", email: "karen.vanderaa@firstfloorcareers.be" },
        to: [{ email: parsed.data.email, name: parsed.data.naam }],
        replyTo: { email: "karen.vanderaa@firstfloorcareers.be", name: "Karen Van der Aa" },
        subject: "Uw DRI-rapport staat klaar",
        htmlContent,
      }),
    });

    if (!mailRes.ok) {
      const errText = await mailRes.text();
      console.error("Brevo mail error", mailRes.status, errText);
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
