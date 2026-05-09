# WhiskyLog v2.25 Backup Import + README Fix

Dette er gjeldende versjon.

## Endringer i v2.25

- Definitiv importretting for backupfiler fra tidligere v2-versjoner.
- Import erstatter nå selve gamle importfunksjonen, ikke bare en ekstra funksjon på slutten.
- Støtter backupfiler som inneholder:
  - `state`
  - `data`
  - `appData`
  - direkte WhiskyLog-data
- Leser inn:
  - bibliotek
  - beholdning/flasker
  - bilder lagret i appen
  - smakinger
  - kommentarer/notater
  - ønskeliste
  - innstillinger
- Viser antall elementer før import.
- Eksport lagrer ren UTF-8 JSON.
- README er oppdatert slik at GitHub ikke lenger viser v2.23.

## Viktig

Last opp alle filene i ZIP-pakken til GitHub-repoet:
- `index.html`
- `app.js`
- `styles.css`
- `manifest.webmanifest`
- `sw.js`
- `README.md`
- ikonfilene

Etter opplasting: vent til GitHub Pages deployment er grønn før testing.
