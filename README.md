# Sable Reach — Jobs & Training (96.0)

Play at https://felicianovalle-dev.github.io/swrpgtest/.

Phases 95–96 repair the mobile shell and make downtime discoverable. The iPhone
HUD flows with the page, redundant sticky toolbars are hidden, and standalone
safe-area spacing keeps the status bar away from controls. Local Area Map
buttons now have a responsive dark grid and a spaced legend rather than default
white browser buttons.

Use Jobs or Train in the mobile dock, Jobs & Training in Core Play, the Play Hub
cards, or Area & travel in World. Two labeled kiosks sit on the Sable Reach
central plaza just south of Broker's Row. Ask About Work also opens paid work.

Paid shifts use the existing best-crew difficulty-2 check and payout formula.
When the solo-GM Destiny prompt is enabled, answer it to complete the shift.
Practice uses the existing progress formula, now supporting every skill, and
retains previous training progress. Both consume one day including a night's
rest. XP advancement uses the existing career costs and does not consume a day.
Creation, active combat, incapacitation, insufficient XP, and rank-5 limits are
guarded. Activity history and selections are saved without changing schema 92.

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

Build: `npm run build` (Python with Pillow is needed only for
art preparation). Run `npm install` and `npm test` for the state/canvas checks.
The atlas extraction helper requires the original atlas when run after repair;
normal builds reuse the checked-in corrected asset.

Validation: `npm test` runs 27 World state/canvas checks and 37 Jobs & Training
workflow checks. The World suite also runs 267 existing smoke checks and 112
diagnostics. `qa/responsive96.html` displays the actual game at phone-sized
viewport widths, with an explicit standalone-spacing preview. Native iPhone
standalone testing remains a separate device check; Chromium previews are not
Safari hardware validation.

`assets/buildings94.webp` was created with the built-in image-generation tool,
using the Mos Dara cantina as a style reference. See the adjacent prompt file.
`src/world94.js` and `src/world94.css` are the editable World layer. The build
script embeds that layer and the checked-in atlases in the standalone game.
`src/mobile95.css`, `src/work96.css`, and `src/work96.js` are the editable mobile
and downtime layers; `scripts/build_world96.py` embeds both phases after World.
