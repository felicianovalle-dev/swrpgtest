# Sable Reach — Expanded World (94.0)

Play at https://felicianovalle-dev.github.io/swrpgtest/.

The World view now fills the screen. Menu opens character and system screens;
Area & travel opens destinations, the minimap and controls. Journal, Crew, Gear,
Galaxy, Save and Interact remain directly accessible. Social dice previews live
inside expandable dialogue details. Escape closes dialogue or the open drawer.
WASD / arrows and pointer/touch movement use the same camera coordinates.

Five dedicated frontier building sprites replace the settlement's repeated
roof tiles. Their entrance artwork is aligned with the existing interactive
door coordinates. The character atlas uses inspected per-pose bounds and padded
frames, including N4-VI. Buildings and sprites are embedded in index.html for
offline use. The service worker cache version advances without changing the
schema 92 save keys.

Build: `python3 scripts/build_world94.py` (Python with Pillow is needed only for
art preparation). Run `npm install` and `npm test` for the state/canvas checks.
The atlas extraction helper requires the original atlas when run after repair;
normal builds reuse the checked-in corrected asset.

Validation: 27 targeted state/canvas checks, 267 existing smoke checks and 109
diagnostics pass. Native iPhone standalone testing remains a separate device
check; the harness tests responsive coordinates, not Safari's rendering engine.

`assets/buildings94.webp` was created with the built-in image-generation tool,
using the Mos Dara cantina as a style reference. See the adjacent prompt file.
`src/world94.js` and `src/world94.css` are the editable World layer. The build
script embeds that layer and the checked-in atlases in the standalone game.
