// Server-side equivalent van src/lib/leadValidation.ts. Zelfde regels — bron van waarheid.
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const DISPOSABLE_EMAIL_DOMAINS = new Set<string>([
  "mailinator.com", "tempmail.com", "tempmail.net", "tempmail.dev", "temp-mail.org", "temp-mail.io",
  "10minutemail.com", "10minutemail.net", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org",
  "sharklasers.com", "yopmail.com", "yopmail.net", "yopmail.fr", "trashmail.com", "trashmail.net",
  "throwawaymail.com", "maildrop.cc", "getnada.com", "nada.email", "dispostable.com", "fakeinbox.com",
  "mintemail.com", "spamgourmet.com", "mohmal.com", "emailondeck.com", "moakt.com", "burnermail.io",
  "anonbox.net", "tutanota-test.com", "incognitomail.com", "mailnesia.com",
]);

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' .-]+$/;
const isRealName = (v: string) => {
  const cleaned = v.trim();
  if (!NAME_REGEX.test(cleaned)) return false;
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length < 2) return false;
  return words.every((w) => w.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, "").length >= 2);
};

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const leadSchema = z.object({
  naam: z.string().trim().min(3).max(120).refine(isRealName, "Ongeldige naam"),
  email: z.string().trim().toLowerCase().max(254).regex(EMAIL_REGEX, "Ongeldig e-mailadres")
    .refine((v) => {
      const d = v.split("@")[1];
      return !!d && !DISPOSABLE_EMAIL_DOMAINS.has(d);
    }, "Wegwerp e-mailadres niet toegestaan"),
  organisatie: z.string().trim().min(2).max(150).refine((v) => !/^\d+$/.test(v), "Ongeldig"),
  functie: z.string().trim().min(2).max(150).refine((v) => !/^\d+$/.test(v), "Ongeldig"),
});

// MX-record check via Google DNS-over-HTTPS. Returnt false als domein geen MX heeft.
export async function hasMxRecord(email: string): Promise<boolean> {
  const domain = email.split("@")[1];
  if (!domain) return false;
  try {
    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`, {
      headers: { accept: "application/dns-json" },
    });
    if (!res.ok) return true; // fail-open bij DNS-storing
    const json = await res.json() as { Answer?: Array<{ data?: string }> };
    return Array.isArray(json.Answer) && json.Answer.some((a) => !!a.data);
  } catch {
    return true; // fail-open
  }
}
