# WhiskyLog v2.26 Percent Score Model

Dette er gjeldende versjon.

## Endringer i v2.26

- Smakescore vises som prosent med én desimal, f.eks. `56.4 %`.
- Intern score beregnes fortsatt fra fem kategorier à 0–100:
  - visuelt
  - lukt
  - smak
  - ettersmak
  - helhetsinntrykk
- Hver smaking er en selvstendig registrering.
- Flaskescore er gjennomsnittet av alle smakinger på samme fysiske flaske.
- Produktscore/rangering er gjennomsnittet av alle flasker/smakinger for samme produkt.
- Neat/vann er sortérbart.
- Ved vann beregnes dråper per liter fra antall dråper og smaksvolum.
- Fikser feilvisninger som `0.6/1000`, `5.64/100` og `64.2/10`.
