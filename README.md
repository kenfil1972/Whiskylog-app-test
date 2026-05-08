# WhiskyLog v2.18 Weight Based Volume Model

Changes:
- Removed manual remaining-volume input from Purchased bottle and Correct stock forms.
- Remaining volume is now weight-based when weight exists:
  1. Full weight + empty weight: net-liquid percentage method.
  2. Full weight only: full weight minus used liquid based on ABV/density.
  3. No usable weight: bottle volume minus registered tastings.
- "Siste sipp smakt" now uses an internal forceEmpty flag, not manual volume input.
- Manual currentVolume is no longer part of the visible workflow.
