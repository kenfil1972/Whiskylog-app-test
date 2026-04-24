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
