# WhiskyLog v1.42 Stable Volume + Premium Icon

Fixes:
- Remaining volume is recalculated directly from edited current weight.
- Current weight is the source of truth when available.
- Tastings are not subtracted twice.
- Delete confirmation newline bug fixed.
- Dashboard labels remain Value in stock / Stock volume.
- Added upgraded premium whisky-style app icons in 192x192 and 512x512.
- Keeps v1.41 numeric score input modals.

Quality checks performed:
- JavaScript syntax check.
- Required files present.
- Static checks for weight-based volume logic.
- Static checks for delete message fix.
- Static checks for premium icons.

# WhiskyLog v1.41 Numeric Score Inputs

Fixes:
- Score inputs now use custom numeric input fields instead of browser prompt.
- iPhone should show number keyboard for scores and volume.
- Notes/comments use a text area so normal letter keyboard is used.
- Tasting date uses date input.
- Existing empty-volume logic from v1.40 is kept.

# WhiskyLog v1.40 Empty Logic Fixed

Fixes:
- Corrected early Empty bottles bug.
- When current weight exists, remaining volume is now calculated from weight only.
- Tastings no longer get subtracted twice.
- Added confirmation if tasting amount is higher than calculated remaining volume.
- Empty status only happens when calculated remaining volume is 0 ml.

# WhiskyLog v1.39 Real Language Toggle

Fixes:
- Language setting now actually changes UI text.
- Supports English and Norwegian.
- Static page text, dashboard labels, navigation, major buttons and dynamic bottle/tasting labels are translated.
- Language setting remains saved locally.
- No Vinmonopolet catalog/autofill added.

# WhiskyLog v1.38 Bottle Count / Value + Price Formatting

Fixes:
- Home status cards now show bottle count and value between text and images.
- Unopened / Opened / Empty cards each show count and remaining value.
- Edit bottle price field now displays two decimals and currency.
- Price parsing still accepts both comma and point and ignores currency text.

# WhiskyLog v1.37 Edit/Delete + Tasting Scores

Fixes:
- Bottles can be edited from detail page in all statuses.
- Bottles can be deleted from detail page in all statuses.
- Delete shows permanent deletion warning and deletes linked tastings.
- Add bottle form supports editing existing bottles.
- Tasting now records 1-10 scores for:
  - Appearance
  - Nose / smell
  - Taste neat / undiluted
  - Taste with water
  - Finish / aftertaste
- Average score is calculated and displayed.
- Tasting details are shown later on bottle detail page.

# WhiskyLog v1.36 Stock Labels + Editable Repurchase

Fixes:
- Dashboard label Total cost changed to Value in stock.
- Dashboard label Total volume changed to Stock volume.
- New bottle purchased from an empty bottle now opens Add bottle form.
- Same library item is preselected.
- User can edit batch, bottle no., price, purchase place, date, current weight and comments before saving.

# WhiskyLog v1.35 Tasting Volume + Home Return Fixed

Fixes:
- Save library item returns to Home.
- Save bottle returns to Home.
- Add tasting returns to Home.
- Tasting now reduces remaining volume even when current weight exists.
- Tasting also reduces current weight using ABV-based density.
- Remaining value is calculated from remaining volume / original volume.
- Dashboard Total cost now shows remaining stock value.

# WhiskyLog v1.34 Empty Bottle Repurchase Fixed

Fixes:
- Empty bottles no longer show Add tasting.
- Empty bottles show New bottle purchased instead.
- New bottle purchased creates a new unopened bottle from the same library item.
- Add tasting is blocked defensively if a bottle is empty.

# WhiskyLog v1.33 Stable Rollback

Clean stable rollback version built from scratch.

Included:
- Library item creation and saving
- Calculated empty weight from ABV, volume and full weight
- Type dropdown with fixed options
- Add bottle from saved library items
- Unopened / opened / empty bottle separation
- Add tasting for unopened and opened bottles
- Tasting unopened bottle moves it to opened
- Wishlist
- Settings name controls title
- Backup export/import
- No Vinmonopolet catalog/autocomplete
- iOS autofill disabled on library fields
- Service worker disabled for stability

Upload all files to GitHub root.
