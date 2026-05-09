# WhiskyLog v2.23 Tolerant Backup Import

Fix:
- More tolerant JSON import for iPhone files that contain extra wrapping or hidden characters.
- Tries to extract JSON from first { to last } if direct parsing fails.
- Gives clearer error showing first characters if file is not a valid backup.
- Export uses pure UTF-8 JSON.
