# WhiskyLog v1.17 Layout Fixed

Fix:
- Rebuilt the three bottle-status cards on Home.
- Title and subtitle now have separate HTML structure.
- Added strong CSS override so subtitles stay on the next line.
- Keeps v1.16 button fixes and GitHub Pages/PWA path fix.

# WhiskyLog v1.16 Buttons Fixed

Fixes:
- Corrected JavaScript issue that could stop all buttons from responding.
- Made data-go button navigation more robust.
- Fixed category-card text layout so subtitles appear on the next line.
- Keeps v1.15 PWA GitHub Pages path fix.

# WhiskyLog v1.15 PWA Fixed

Fixes for iPhone Home Screen app mode:
- Correct GitHub Pages base path: /Whiskylog-app-test/
- Correct manifest start_url and scope
- Correct absolute asset paths
- Service worker caching disabled to avoid stale/broken iOS PWA behavior
- Use this URL before adding to Home Screen:
  https://kenfil1972.github.io/Whiskylog-app-test/index.html

After uploading:
1. Delete old Home Screen icon.
2. Open the URL in Safari.
3. Refresh once.
4. Share → Add to Home Screen.

# WhiskyLog v1.14

Bugfix:
- Catalog selection now auto-fills all available library fields:
  - name
  - type
  - ABV
  - bottle volume
  - region/country
  - distillery when available
  - image when available
- Auto-fill runs on selection, blur and Enter.
- Fill from catalog suggestion button still works.

# WhiskyLog v1.13

Fix:
- ABV and volume now correctly auto-filled when selecting from catalog
- Auto-fill triggers when choosing from suggestions

# WhiskyLog v1.12 Premium

New in v1.12:
- Home action order updated
- Currency moved from Home to Settings
- Settings page added: name, currency, language and default tasting amount
- Personalized title: e.g. Kenneth's WhiskyLog
- Wishlist restored: up to 50 entries; top 5 with image; rest by name
- Starter bottle catalog and autocomplete support
- Library can fill fields from catalog suggestion

Note: The starter catalog is static and editable. A full official Vinmonopolet catalog with live prices/images requires API access and rights review before App Store distribution.

# WhiskyLog v1.11 Premium

Full verified package based on v1.10.

New in v1.11:
- Add new bottle renamed to Add new bottle to collection
- Add test of bottle renamed to Add bottle tasting
- Currency dropdown added (NOK, SEK, DKK, EUR, USD)
- Total cost and bottle prices now display selected currency
- New Analytics page:
  - Purchases / inventory value chart
  - Tasting volume per day chart
  - Stock volume chart
  - Time range selector: 1 month, 3 months, 6 months, 9 months, 1 year, 5 years, 10 years, All
- Keeps v1.10 features:
  - Unopened / Opened / Empty bottle categories
  - Bottle detail pages
  - Last sip enjoyed
  - Hidden density field
  - Price comma/period parsing
  - Table-based ABV density

# WhiskyLog v1.10 Premium

Full verified package based on v1.9.

New in v1.10:
- Home category cards show four bottle images on the right
- Missing images use a whisky-themed fallback bottle
- Library button renamed to Add bottle to library
- Library purpose clarified
- Add test of bottle card added
- Calculated density hidden from UI, still used internally
- Opened bottle detail action renamed to Last sip enjoyed
- Last sip enjoyed asks for confirmation and marks bottle empty irreversibly
- Empty status respects forced empty flag
- Existing v1.9 features retained: Unopened / Opened / Empty pages, bottle detail pages, tasting registration, comments, images, backup/import, price comma/period parsing, table-based density calculation

# WhiskyLog v1.9 Premium

New:
- Home has separate cards for Unopened, Opened and Empty bottles
- Each category has its own page
- Each bottle has a detail page
- Add tasting, comments, weighing and summary from bottle detail
- Bottle moves from unopened to opened on first tasting
- Bottle moves from opened to empty when remaining volume is 0 ml
- Bottom navigation removed
- Each page has a Home button
- Main text is white, secondary text is light brown
- Price supports comma and period decimals and displays two decimals
