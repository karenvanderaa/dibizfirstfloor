## Doel
De geüploade operating model-visual (infographic) integreren in `AanpakSection`, direct onder de subtitel en voor de 3 fase-kaarten.

## Context
- De visual is een portrait-infographic die het Executiekracht-model toont: Strategie → Executiekracht → Resultaat, met de pijlers People, Proces, Structuur, Tools & automatisatie, en AI agents.
- De gebruiker koos: **AanpakSection** als plaatsing, **geen bijschrift**.

## Stappen

1. **Asset kopiëren**
   - Kopieer de upload `user-uploads://ChatGPT_Image_May_21_2026_06_36_35_PM.png` naar `src/assets/operating-model.png`.

2. **AanpakSection.tsx aanpassen**
   - Voeg import toe: `import operatingModelImg from "@/assets/operating-model.png"`
   - Importeer `motion` en `useInView` uit `framer-motion` (consistent met andere secties zoals HeroSection).
   - Wrap de sectie in een `motion.div` met `useInView` trigger voor scroll-animatie.
   - Plaats de visual na de subtitel (`<p className="text-muted-foreground ...">`) en voor de fase-kaarten grid, in een gestileerde container:
     - `max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-border p-4 md:p-6 mb-12`
     - `<img>` met `loading="lazy"` en alt: `"Het Executiekracht-model: van strategie via people, proces, structuur en tools naar resultaat"`
   - Wrap de image in een `motion.div` met `fadeUp` variant (opacity 0→1, y 16→1, blur 4→0) zoals gebruikt in HeroSection.

3. **Controle**
   - Preview de pagina en scroll naar AanpakSection.
   - Verifieer dat de visual correct geladen wordt, gecentreerd staat, en de animatie soepel werkt.
   - Check responsive gedrag op mobiel (max-w-3xl blijft binnen container).

## Niet in scope
- Geen tekstwijzigingen aan bestaande koppen of fase-kaarten.
- Geen wijzigingen aan andere secties.
- Geen bijschrift of caption onder de visual.