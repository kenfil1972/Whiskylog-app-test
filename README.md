# WhiskyLog v2.15 Library Edit + Volume Fix

Fixes:
- Library edit button scrolls to the edit form after selecting a bottle.
- Added optional empty bottle weight to library.
- Safer volume calculation from weight:
  - Manual remaining volume overrides weight.
  - Explicit currentVolume=0 is required to mark a bottle empty directly.
  - Invalid/too-low weight no longer automatically moves bottle to Empty.
- Correct stock clears old manual volume when a new weight is entered without volume.
- Wishlist image/stats are integrated directly, not as a broken outside patch.
