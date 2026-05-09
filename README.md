# WhiskyLog v2.34 Working Rebuild

Dette er en ren reparasjonsversjon, ikke en ny patch oppå gamle patcher.

## Testet før levering

- JavaScript syntax OK.
- Én ren render-funksjon, ingen gamle render-overstyringer.
- Oversikt/statistikk inneholder **Åpne vurderinger**.
- **Åpne vurderinger** bruker `data-action="ratings"`.
- Smakingskort har `data-action="edit-tasting"` og `data-action="delete-tasting"`.
- Vurderinger har egen side.
- Flaskedetalj har egen side.
- Smakinger sorteres med nyeste dato øverst.
- Score vises som prosent med én desimal.
- Cache-bust peker til `app.js?v=234`.

## Merk

Dette er laget for å stabilisere funksjonene som ikke virket: Vurderinger-knappen, rediger smaking og slett smaking.
