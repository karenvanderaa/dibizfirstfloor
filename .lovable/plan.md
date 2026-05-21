# Magic link verificatie voor PDF-rapport

## Wat verandert er voor de bezoeker

1. Bezoeker doorloopt de 24 vragen.
2. Vult lead-formulier in (naam, email, organisatie, functie).
3. **Ziet meteen het volledige resultaat op scherm** (huidige flow blijft).
4. PDF-download knop is **vergrendeld** met tekst: *"Check uw mailbox — we sturen u een beveiligde link om uw rapport te downloaden."*
5. In de mail (afzender: `notify@firstfloor-dibiz.be` o.i.d.) staat één knop: **"Download mijn rapport"** → opent een pagina die de PDF genereert en download triggert.
6. Link werkt 7 dagen, eenmalig of meermaals (zie keuze hieronder).

## Validatielagen

### Laag 1 — Client-side (directe feedback in formulier)
- **Naam**: min. 2 woorden, ≥2 letters elk, enkel letters/spatie/`-`/`'`. Blokkeert `aaa`, `test`, `qsdf`.
- **E-mail**: strikte regex, lowercase, trim.
- **Blocklist wegwerpdomeinen**: `mailinator`, `tempmail`, `10minutemail`, `yopmail`, `guerrillamail`, … (`src/lib/disposableEmailDomains.ts`).
- **Organisatie/functie**: min. 2 tekens, niet enkel cijfers.
- Foutmeldingen onder elk veld, knop disabled tot alles klopt.

### Laag 2 — Server-side validatie (edge function)
Zelfde zod-schema spiegelen + extra:
- **MX-record check** op email-domein via `dns.google/resolve` → geen MX = weigeren.
- Disposable-blocklist server-side (bron van waarheid).
- 400 response bij ongeldig, UI toont nette foutmelding.

### Laag 3 — Magic link gating PDF (hoofdmoot)
Nieuwe tabel + edge function + mail.

**Flow technisch:**
```
[ContactScreen submit] 
   → POST edge function `request-report-link`
   → valideert (laag 1+2) 
   → maakt row in `report_tokens` (token = crypto.randomUUID, expires_at = now+7d, scan_data = jsonb met scores+contact)
   → verstuurt mail via Lovable transactional email met link:
     https://dibizfirstfloor.lovable.app/rapport?token=xxx
   → return 200

[Bezoeker ziet resultaat op scherm + "check mailbox" banner]

[Klikt link in mail] 
   → /rapport pagina laadt
   → GET edge function `redeem-report-link?token=xxx`
   → valideert token (bestaat, niet expired, optioneel: niet eerder gebruikt)
   → return scan_data
   → frontend genereert PDF client-side (huidige driPdf.ts hergebruiken) en triggert download
   → markeert token.used_at = now (optioneel)
```

## Technische details

**Nieuwe DB-tabel** (migration):
```sql
create table public.report_tokens (
  token uuid primary key default gen_random_uuid(),
  email text not null,
  naam text not null,
  organisatie text not null,
  functie text not null,
  scan_data jsonb not null,        -- antwoorden + scores
  created_at timestamptz default now(),
  expires_at timestamptz not null,
  used_at timestamptz,             -- null = nooit gebruikt
  redeem_count int default 0
);
alter table public.report_tokens enable row level security;
-- geen public policies; enkel service role (edge functions) leest/schrijft
create index on public.report_tokens (email);
```

**Nieuwe edge functions:**
- `request-report-link/index.ts`: zod-validatie, MX-check, disposable-check, token aanmaken, mail versturen via `send-transactional-email`, sync naar Brevo (huidige logica).
- `redeem-report-link/index.ts`: token ophalen, expires_at check, scan_data terugsturen.

**Shared util** (`src/lib/leadValidation.ts`): zod-schema + disposable-lijst, importeerbaar in edge function via inline copy of via `_shared/`.

**Nieuwe frontend route** `/rapport?token=...`:
- nieuwe pagina `src/pages/RapportDownload.tsx` 
- bij mount: fetch redeem endpoint, bij succes → genereer PDF via bestaande `generateDriPdf()`, trigger download, toon "Klaar! Check uw downloads."
- bij fout: toon foutmelding + knop "vraag nieuwe link aan".

**Email setup** (eenmalig, geautomatiseerd):
1. Email-domein configureren (popup).
2. Email-infra opzetten.
3. Transactional template scaffolden: `report-download-link.tsx` met First Floor / Dibiz branding (Sora heading, blauwe primary, korte tekst + CTA-knop).
4. Edge functions deployen.

**Frontend wijzigingen `DRISection.tsx`:**
- `ContactScreen`: zod-validatie + per-veld errors.
- Na submit: `request-report-link` invoke ipv direct doorgaan naar resultaat. Op succes → resultaat tonen + "📧 Mail verstuurd" banner ipv directe download knop.
- "Download PDF" knop op resultaatscherm wordt vervangen door "We hebben uw rapport naar [email] gestuurd. Niets ontvangen? [opnieuw versturen]".

## Open keuzes — graag bevestigen

1. **Token: eenmalig of meermaals bruikbaar binnen 7 dagen?** Aanbeveling: **meermaals** binnen geldigheidsperiode (gebruiker wil rapport later soms opnieuw downloaden), maar wel `redeem_count` loggen.
2. **Email-afzender**: heeft First Floor / Dibiz al een domein dat we als sender willen gebruiken? Zo ja, welk? (bv. `notify.firstfloor.be`, `rapport@dibiz.be`). Anders zet ik een setup-dialoog klaar.
3. **Disposable-blocklist scope**: alleen de top ~30 wegwerpdiensten, of een uitgebreidere lijst (~10k domeinen)? Aanbeveling: korte curated lijst — uitgebreide lijst geeft te veel false positives.
4. **Rolmailboxen** (`info@`, `sales@`, `noreply@`) wel/niet toelaten? Aanbeveling: **wel toelaten** — bij B2B is `info@` vaak het enige adres dat een prospect deelt.
