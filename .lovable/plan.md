## Wat ik fout deed

Ik schreef "digitaal aanbod" alsof het aanbod zelf digitaal is. Dat klopt niet. Het aanbod = wat klanten kopen (diensten, producten). De **digitale infrastructuur / architectuur** zit eronder en maakt het mogelijk. Daarnaast staan de organisatie en de mensen.

Driedeling die ik consistent ga doortrekken:
- **Aanbod** (wat de klant koopt)
- **Digitale infrastructuur** eronder (wat het mogelijk maakt)
- **Organisatie & mensen** (wat het waarmaakt)

## Te corrigeren plekken

### 1. `HeroSection.tsx`

- **Subtitel (regel 66)**
  - Nu: "Wij ontwerpen uw digitale aanbod en de organisatie die het levert als één geheel..."
  - Nieuw: "Wij ontwerpen uw aanbod, de digitale infrastructuur eronder en de organisatie die het levert als één geheel. AI, data en nieuwe diensten, vertaald naar wat klanten kopen en wat uw mensen waarmaken."

- **Checklist item 1 (regel 14)**
  - Nu: "Digitaal aanbod dat aansluit bij klant én markt"
  - Nieuw: "Een aanbod dat aansluit bij klant én markt"
  - (Eventueel item 2 aanvullen met digitale laag, optioneel, zie vraag onder)

### 2. `OvertuigingSection.tsx`

- **Mint italic regel (regel 34)**
  - Nu: "Want digitaal aanbod en digitale organisatie ontwerp je nooit los van elkaar."
  - Nieuw: "Want aanbod, digitale structuur en organisatie ontwerp je nooit los van elkaar."

### 3. `ProblemSection.tsx`, dubbelcheck

- Tab-titel staat al juist: *"Mijn aanbod klopt niet meer. Met mijn (digitale) structuur."* → behouden.
- Kaart "Pricing past niet bij een digitaal model." → blijft (pricing-model mag wél digitaal heten, dat is het verdienmodel).
- Tab B-titel: *"Uw digitale strategie staat. Uw organisatie volgt niet."* → blijft, dit gaat over strategie, niet aanbod.
- Geen andere "digitaal aanbod"-formuleringen aanwezig.

### 4. Andere componenten

`rg` bevestigt: alleen `HeroSection` en `OvertuigingSection` bevatten "digitaal/digitale aanbod". `AanpakSection`, `TeamSection`, `FunnelStepsSection` etc. zijn schoon.

## Wat ik niet aanpas

- Structuur, layout, kleuren, animaties, Calendly-links.
- De H1 in hero ("Digitale transformatie die landt. In uw aanbod én uw organisatie.") → blijft, want hier wordt aanbod en organisatie correct náást digitale transformatie gezet, niet als "digitaal aanbod".
