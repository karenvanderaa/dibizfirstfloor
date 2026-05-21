import { z } from "zod";

// Korte curated lijst van wegwerp-/tempmail providers. Bewust beperkt om false positives te vermijden.
export const DISPOSABLE_EMAIL_DOMAINS = new Set<string>([
  "mailinator.com",
  "tempmail.com",
  "tempmail.net",
  "tempmail.dev",
  "temp-mail.org",
  "temp-mail.io",
  "10minutemail.com",
  "10minutemail.net",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "sharklasers.com",
  "yopmail.com",
  "yopmail.net",
  "yopmail.fr",
  "trashmail.com",
  "trashmail.net",
  "throwawaymail.com",
  "maildrop.cc",
  "getnada.com",
  "nada.email",
  "dispostable.com",
  "fakeinbox.com",
  "mintemail.com",
  "spamgourmet.com",
  "mohmal.com",
  "emailondeck.com",
  "moakt.com",
  "burnermail.io",
  "anonbox.net",
  "tutanota-test.com",
  "incognitomail.com",
  "mailnesia.com",
]);

// Naam: minstens 2 woorden, elk ≥ 2 letters, enkel letters/spatie/'-/'/.
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
  naam: z
    .string()
    .trim()
    .min(3, "Vul uw volledige naam in")
    .max(120, "Naam is te lang")
    .refine(isRealName, "Vul uw voor- en achternaam in (alleen letters)"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "E-mail is te lang")
    .regex(EMAIL_REGEX, "Vul een geldig e-mailadres in")
    .refine(
      (v) => {
        const domain = v.split("@")[1];
        return !!domain && !DISPOSABLE_EMAIL_DOMAINS.has(domain);
      },
      "Gebruik a.u.b. uw professioneel e-mailadres",
    ),
  organisatie: z
    .string()
    .trim()
    .min(2, "Vul uw organisatie in")
    .max(150, "Te lang")
    .refine((v) => !/^\d+$/.test(v), "Geen geldige naam"),
  functie: z
    .string()
    .trim()
    .min(2, "Vul uw functietitel in")
    .max(150, "Te lang")
    .refine((v) => !/^\d+$/.test(v), "Geen geldige functie"),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function validateLeadFields(values: Partial<Record<keyof LeadInput, string>>) {
  const parsed = leadSchema.safeParse(values);
  if (parsed.success) return { ok: true as const, data: parsed.data, errors: {} };
  const errors: Partial<Record<keyof LeadInput, string>> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof LeadInput;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false as const, errors };
}
