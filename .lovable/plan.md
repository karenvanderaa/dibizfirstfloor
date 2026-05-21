# Visual toevoegen aan "Onze Overtuiging"

## Wat blijft

- Section label, titel ("Geen generalisten…"), intro-paragraaf en de 3 kaartjes (Holistisch / Pragmatisch / Verankerd) blijven exact zoals nu.

## Wat erbij komt (tussen intro en de 3 kaartjes)

Een geanimeerde Venn-compositie in pure React + SVG (geen image, blijft scherp, themable, responsive):

```text
 [ First Floor ]   ↘     ↙   [ Dibiz ]
  Wie doet wat?     ╲   ╱     Hoe loopt het werk?
  Kloppen rollen?    ╲ ╱      Kloppen processen?
  Skills aanwezig?    O       Helpt tooling echt?
  Leiderschap mee?   /│\      Waar past automatisatie?
                    / │ \
                       ▼
           [ Daar waar 1 + 1 = 3 ]
       AI agents zijn de nieuwe teamleden.

         De organisatie van de toekomst
   Mensen, processen, tooling, AI agents — één team
```

- **Links**: zacht paars-blauw kaartje (`bg-ff-light-blue`) met de 4 First Floor-vragen.
- **Rechts**: zacht mint kaartje (`bg-ff-light-mint`) met de 4 Dibiz-vragen.
- **Midden**: cirkel in warm crème (`#F5EFE0`) met kernbelofte *"Uw organisatie voert uit wat uw strategie belooft"* + 2 ondersteunende regels (rollen/processen/tooling/skills + AI agents).
- **Twee gebogen SVG-pijlen** (blauw + mint) van de zijkaartjes naar de cirkel — desktop only.
- **Pill onder de cirkel**: *"Daar waar 1 + 1 = 3"* + subregel over AI agents.
- **Afsluitende claim**: *"De organisatie van de toekomst"* + ondertitel.

## Tekst-tweaks (subtiel, voor scherpte)

- "Zijn de juiste skills aanwezig?" → **"Skills aanwezig?"** (consistent met de korte vraagvorm van de andere bullets) — *check: oké of liever 1-op-1 uit screenshot?*
- Rest 1-op-1 uit het screenshot.

> Standaard houd ik alles 1-op-1 uit het screenshot, tenzij je hierboven groen licht geeft op die ene tweak.

## Animatie (Framer Motion)

Triggert wanneer de visual in beeld komt (`whileInView`, `once: true`):

1. First Floor kaart → fade-up van links (delay 0s)
2. Dibiz kaart → fade-up van rechts (delay 0.12s)
3. Centrale cirkel → fade-up + scale-in (delay 0.24s)
4. Pijlen → SVG `pathLength` van 0 → 1 (delay 0.5s, duur 0.9s)
5. "1+1=3" pill → fade-up (delay 0.36s)
6. Afsluitende claim → fade-up (delay 0.48s)

Easing: `[0.22, 1, 0.36, 1]` (soft cubic) — past bij rest van de site.

## Responsive gedrag

- **Desktop (≥ md)**: 3 kolommen `[kaart] [cirkel] [kaart]` met de twee SVG-pijlen er overheen.
- **Mobiel**: alles stackt verticaal — First Floor → cirkel → Dibiz → 1+1=3 pill → claim. Pijlen worden verborgen (`hidden md:block`); de visuele flow wordt door de stack zelf gedragen.
- Cirkel: 260px op mobiel, 320px op desktop.

## Technische details

- Eén bestand aanpassen: `src/components/OvertuigingSection.tsx`.
- Geen nieuwe dependencies (Framer Motion zit al in `package.json`).
- Kleuren via bestaande tokens: `ff-light-blue`, `ff-light-mint`, `ff-blue`, `ff-mint`, `foreground`, `muted-foreground`. Crème cirkel via inline hex (`#F5EFE0` / border `#E8DFC9`) omdat er nog geen sand-token is — kan later naar `--ff-sand` worden gepromoveerd.
- SVG-pijlen: `viewBox="0 0 1000 360"` met `preserveAspectRatio="none"`, twee `<motion.path>` met `pathLength` animatie en arrow-marker defs in dezelfde mint/blauw.
- Geen layout-impact buiten de section.
