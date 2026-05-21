import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async () => {
  const key = Deno.env.get("BREVO_API_KEY")!;
  const r = await fetch("https://api.brevo.com/v3/contacts/lists/57/contacts/add", {
    method: "POST",
    headers: { "api-key": key, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ emails: ["test-debug@example.com"] }),
  });
  return new Response(`${r.status} ${await r.text()}`, { status: 200 });
});
