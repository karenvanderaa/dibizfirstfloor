// redeem-report-link: valideert token, returnt scan-data zodat de browser de PDF kan genereren.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") ?? (req.method === "POST" ? (await req.json()).token : null);
    if (!token || !UUID_REGEX.test(token)) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_token" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: row, error } = await supabase
      .from("report_tokens")
      .select("token, email, naam, organisatie, functie, scan_data, expires_at, used_at, redeem_count")
      .eq("token", token)
      .maybeSingle();

    if (error || !row) {
      return new Response(JSON.stringify({ ok: false, error: "not_found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (new Date(row.expires_at).getTime() < Date.now()) {
      return new Response(JSON.stringify({ ok: false, error: "expired" }), {
        status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Markeer gebruik (meermaals toegestaan binnen TTL).
    await supabase
      .from("report_tokens")
      .update({
        used_at: row.used_at ?? new Date().toISOString(),
        redeem_count: (row.redeem_count ?? 0) + 1,
      })
      .eq("token", token);

    return new Response(JSON.stringify({
      ok: true,
      contact: { naam: row.naam, email: row.email, organisatie: row.organisatie, functie: row.functie },
      scanData: row.scan_data,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("redeem-report-link error", e);
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
