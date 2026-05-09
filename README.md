# WhiskyLog v2.28 iOS Backup + Ratings

Dette er gjeldende versjon.

## Backup-endringer i v2.28

- Backup bruker iOS delingsmeny når mulig.
- På iPhone/iPad kan du velge **Lagre til Filer**.
- Desktop/Android får vanlig nedlasting som fallback.
- Hvis deling/nedlasting feiler, åpnes en tekstvisning som siste fallback.
- Filnavn inkluderer versjon, dato og klokkeslett:
  - `WhiskyLog_backup_v2.28_YYYY-MM-DD_HH-MM-SS.json`
- Backupfilen inneholder:
  - `backupVersion`
  - `schemaVersion`
  - `createdAt`
  - `createdLocal`
  - `state`
  - `settings`
- Import støtter tidligere backupstrukturer:
  - `state`
  - `data`
  - `appData`
  - direkte WhiskyLog-data
- Importerer bibliotek, flasker, bilder, smakinger, kommentarer, ønskeliste og innstillinger.

## Beholdt fra v2.27

- **Vurderinger / Flaskescore**
- flaske med bilde
- score i prosent med én desimal
- høyeste score øverst
- søk etter flaske
- detaljside per flaske
- detaljside sortert med nyeste dato øverst
