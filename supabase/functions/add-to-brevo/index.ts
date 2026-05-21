import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
    if (!BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is not configured");
    }

    const { email, firstName, organisatie, score, scoreLabel } = await req.json();

    if (!email || !firstName || !organisatie) {
      return new Response(
        JSON.stringify({ error: "email, firstName en organisatie zijn verplicht" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create/update contact in Brevo
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,
          ORGANISATION: organisatie,
          DRI_SCORE: score,
          DRI_LABEL: scoreLabel,
        },
        updateEnabled: true,
      }),
    });

    const contactData = await contactRes.text();

    if (!contactRes.ok && contactRes.status !== 204) {
      // 204 = success with no content, some endpoints return this
      console.error("Brevo contact error:", contactRes.status, contactData);
      // Don't fail if contact already exists (duplicate_parameter)
      if (!contactData.includes("duplicate_parameter")) {
        throw new Error(`Brevo API error [${contactRes.status}]: ${contactData}`);
      }
    }

    // Add contact to list (hardcoded list #57 = DRI)
    const listId = "57";
    if (listId) {
      const listRes = await fetch(
        `https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`,
        {
          method: "POST",
          headers: {
            "api-key": BREVO_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ emails: [email] }),
        }
      );

      if (!listRes.ok) {
        const listData = await listRes.text();
        console.error("Brevo list error:", listRes.status, listData);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
