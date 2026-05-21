import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async () => {
  const key = Deno.env.get("BREVO_API_KEY");
  if (!key) return new Response("no key", { status: 500 });
  const r = await fetch("https://api.brevo.com/v3/contacts/lists?limit=50", {
    headers: { "api-key": key, Accept: "application/json" },
  });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "Content-Type": "application/json" } });
});
