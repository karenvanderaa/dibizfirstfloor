
# Plan: Chirurgische update FF × Dibiz site

Behoud het volledige visuele design, kleuren, typografie, foto's, Calendly-links en spacing. Wijzigingen per component hieronder. Ik werk in de volgorde van de briefing en geef na elke component een korte samenvatting.

## Scope per component

**0 · StickyHeader** — Nav-items: Probleem · Aanpak · Transformatie Scan · Team · Contact. Verwijder "Hoe het werkt". CTA hernoemen: "Gratis DRI scan" → "Doe de DRI scan". Voeg `#team` anchor toe (zie comp. 10).

**1 · HeroSection** — Vervang H1, subtitel en 4 bullets door nieuwe copy ("aanbod"-framing). CTA's en visuals ongewijzigd.

**2 · ProblemSection** — Vervang quote-toggles links door 2 tab-knoppen bovenaan ("Mijn aanbod" / "Mijn organisatie"). Per tab: titel + 4 kaarten (i.p.v. huidige 3). Standaardtab = A. CTA onderaan blijft.

**3 · DRITeaser** — Verwijder/vervang "gratis" → "in 5 minuten". Verder geen wijzigingen.

**4 · NIEUW: FunnelStepsSection** — Nieuwe component tussen DRITeaser en ServicesSection in `Index.tsx`. Drie kaarten oplopend in intensiteit (DRI / Werksessie €2.500 / Scan vanaf €18.500), derde mint-prominent.

**5 · ServicesSection vervangen → AanpakSection** — Volledig nieuwe sectie: label "ONZE AANPAK", 2 zones (Diagnose / Realisatie) met elk 2 fasekaarten en gekleurde top-accenten (oranje/blauw/mint/paars). Chevron tussen zones. Callout onderaan in blauw. Behoud quote-band met foto (component 7) als aparte block.

**6 · ApproachSection vervangen → KleurlogicaSection** — Label "HOE WE SAMEN WERKEN". 4 kolommen met items in grijs/blauw/mint/oranje. Legenda onderaan. Foto bovenin verwijderen (vervangen door de nieuwe kolom-visualisatie).

**7 · Blauwe quote-band** — Vervang tekst door nieuwe ("marktaanbod tot organisatie"). Blijft in ServicesSection-bestand of verhuist naar einde AanpakSection — implementatiekeuze, foto blijft.

**8 · USPSection vervangen → OvertuigingSection** — Label "ONZE OVERTUIGING", grote subtitel + hoofdboodschap (tweede zin in mint cursief), 3 compacte kaarten (Holistisch / Pragmatisch / Verankerd).

**9 · TransformationScanSection** — Subtitel + paragraaf herschrijven, "diensten" → "aanbod" in Dibiz-lens. Tags, prijskaart en lay-out blijven.

**10 · ContactSection splitsen** — Team-stuk wordt aparte `TeamSection` met id `#team`, geplaatst vóór CTA-band:
  - Laag 1: bestaande Karen + Ellen kaarten, rollen hernoemen.
  - Laag 2: 4 kernteam-kaarten met initialen-avatars (WS, SS, T, I).
  - Laag 3: netwerk-alinea in lichte mint-kader.

**11 · CTA-band (Karen & Ellen)** — Blijft in ContactSection bovenaan. Label "KLAAR OM TE STARTEN?", nieuwe subtitel, foto's blijven, Calendly-knop blijft.

**12 · Contact-CTA's** — Vervang formulier door 3 CTA-blokken (DRI / Werksessie / Mail karen@firstfloortalent.be).

**13 · Footer** — Geen wijziging.

**14 · ExitIntentPopup** — "gratis" → "in 5 minuten" indien aanwezig.

## Technische notities

- Nieuwe bestanden: `src/components/FunnelStepsSection.tsx`, `src/components/AanpakSection.tsx`, `src/components/KleurlogicaSection.tsx`, `src/components/OvertuigingSection.tsx`, `src/components/TeamSection.tsx`.
- `Index.tsx` nieuwe volgorde: Hero → Problem → DRITeaser → FunnelSteps → Aanpak → Kleurlogica → Overtuiging → TransformationScan → Team → Contact (CTA-band + 3 CTA-blokken) → Footer.
- Oude bestanden `ServicesSection.tsx`, `ApproachSection.tsx`, `USPSection.tsx` worden verwijderd uit `Index.tsx` (bestanden mogen blijven staan of opgeruimd — ik ruim ze op).
- Section anchors: `#probleem`, `#aanpak` (op nieuwe AanpakSection), `#scan`, `#team`, `#contact`. StickyHeader nav-href's hierop afstemmen.
- Kleur-accenten via inline `style` met hex (oranje/paars) of via bestaande tokens `ff-blue` / `ff-mint`; geen nieuwe Tailwind tokens nodig.
- Initialen-avatars: ronde div met `bg-ff-light-blue` en `text-ff-blue`.
- Alle bestaande Calendly-URLs (`https://calendly.com/ff-dibiz`) en mailto's behouden.
- Tussen elke component een korte samenvatting in de chat, dan door naar de volgende.

## Buiten scope

Visuele restyling, nieuwe foto's/illustraties, SEO meta, Supabase/edge-function wijzigingen, formulier-backend (formulier wordt verwijderd).
