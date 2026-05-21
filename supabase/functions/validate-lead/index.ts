// validate-lead: laag 2 server-side check (schema + MX-lookup) bij contact-submit.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { leadSchema, hasMxRecord } from "../_shared/leadValidation.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const i of parsed.error.issues) {
        const k = i.path[0] as string;
        if (k && !fieldErrors[k]) fieldErrors[k] = i.message;
      }
      return new Response(JSON.stringify({ ok: false, errors: fieldErrors }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const mx = await hasMxRecord(parsed.data.email);
    if (!mx) {
      return new Response(JSON.stringify({
        ok: false,
        errors: { email: "Dit e-maildomein bestaat niet. Controleer uw adres." },
      }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("validate-lead error", e);
    return new Response(JSON.stringify({ ok: false, errors: { _: "Server error" } }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
