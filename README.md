# WhiskyLog v1.27 Page Separation Fixed

Fixes:
- Only one page/view is visible at a time.
- Adds hard CSS rule: section.view hidden unless active.
- Adds inline fallback navigation so page switching works even if app.js has issues.
- Removes leftover catalog button/card remnants from the Library page.
- Keeps v1.26 stability fixes.

# WhiskyLog v1.26 Stability Fixed

Fixes:
- Removed unstable starter catalog picker for now.
- Settings Name now controls the header title, e.g. Jens's WhiskyLog.
- Settings form no longer submits values into the URL.
- Opened bottles subtitle changed to: Bottles open for tasting.
- Kept prior button/navigation and save fixes.

# WhiskyLog v1.25 Catalog + Title Hardfix

Embedded fallback catalog and title hardfix.

# WhiskyLog v1.24 Catalog Hardfix

Fix:
- Catalog suggestions are rendered by a direct fallback script.
- Suggestions appear as visible clickable rows under the catalog search field.
- Selecting a row fills name, type, ABV, volume, distillery/producer and region.
- Catalog is exposed globally as window.WHISKYLOG_CATALOG for reliable fallback behavior.
- Added cache-busting v=124.

# WhiskyLog v1.23 Save Fixed

Fixes:
- Prevents forms from submitting as URL query strings.
- Adds robust submit handling for Wishlist and Settings.
- Wishlist save now writes to localStorage and re-renders immediately.
- Settings save keeps name/currency/language in localStorage.
- Keeps v1.22 visible catalog and title fixes.

# WhiskyLog v1.22 Catalog and Title Fixed

Fixes:
- Added visible starter catalog picker on Add bottle to library.
- Catalog suggestions are now shown as clickable rows, not only hidden browser datalist.
- Selecting a row fills name, type, ABV, volume, distillery/producer and region.
- App title again uses name from Settings, e.g. Kenneth's WhiskyLog.
- If settings accidentally appear in the URL query string, they are absorbed and the URL is cleaned.

# WhiskyLog v1.21 Tasting, Autofill and Images Fixed

Fixes:
- Catalog autofill now fills name, type, ABV, volume, distillery/producer and region.
- Add bottle tasting now has its own page.
- Add bottle tasting lists both unopened and opened bottles.
- Tasting an unopened bottle sets opened date and moves it to Opened bottles.
- Home category image strips restored with fallback whisky bottle icons.

# WhiskyLog v1.20 Expanded Bottle Catalog

New:
- Expanded static starter catalog with 161 relevant spirits.
- Includes whisky, bourbon, rye, rum, cognac, brandy, calvados, armagnac, aquavit, gin, tequila, mezcal, vodka and liqueurs.
- Catalog fields include name, type, ABV, volume, distillery/producer and origin/region.
- Designed for autofill in Add bottle to library.
- Prices are intentionally set to 0 because Vinmonopolet prices and availability change and should be edited manually.

Important:
This is a curated static starter catalog, not a complete live Vinmonopolet database.

# WhiskyLog v1.19 Navigation Fixed

Fix:
- Added inline navigation fallback in index.html.
- Added delegated click handling for all data-go buttons.
- Wrapped app init in try/catch so one runtime error does not kill all navigation.
- Kept v1.18 hard layout fix.

Upload all files, then open:
https://kenfil1972.github.io/Whiskylog-app-test/index.html

# WhiskyLog v1.18 Hard Layout Fix

Hard fix:
- Replaced the three home status cards with explicit inline layout.
- Added cache-busting query strings for CSS/JS/manifest.
- Added strong CSS override.
- This should visibly change the status-card text layout even if previous CSS is cached.

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
