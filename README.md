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

Build: `npm run build` uses Python's standard library and generates `index.html`
from the authoritative files under `src/`. It also works when `index.html` is
absent. Run `npm ci`, `npm test`, and `npm run build:check` for state/canvas and
source/output consistency checks. Pillow is needed only for art preparation.
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
and downtime layers. `scripts/build.py` embeds the current modules after the
legacy engine. The old build entry points forward to that same pipeline.

## Navigation-only follow-up, October 9, 2026

Jobs and Training now remain directly visible in the World footer as well as
the phone dock. The World menu scrolls within the space between its measured
header and footer, including landscape and rotation; its section grid stays
inside the menu instead of covering footer buttons. Both shortcuts use the
existing Jobs & Training workflows. The offline cache revision changes; the
release version, schema-92 saves and gameplay rules remain unchanged.

## Saves, continuation, visuals, and source build

Saved games now show separate manual, autosave, and previous-manual-backup slots
with timestamps, character/day summaries, and explicit load choices. **Resume
latest** chooses the newest readable timestamp rather than preferring the manual
slot. Corrupt slots are labeled and retained; valid alternatives remain usable.
Older autosaves can carry an old manual-save timestamp, so those dates are
explicitly labeled as legacy estimates. New autosaves timestamp their own write.
Storage failures display an error and never claim that saving succeeded.

Navigation records the actual screen and Jobs/Training panel. Resume restores
that screen, the selected skill, and the existing saved World map/position;
unavailable screens fall back safely, and active combat takes precedence. Opening
a browser with readable saves presents **Resume latest** in the Play Hub without
silently loading or replacing a campaign. Imports are validated before loading
and do not overwrite a browser slot until the user saves. The World **Saves**
button opens these choices. Exported campaign files remain portable.

Connected rugs, softer paving, wood floors, and clinical/ship materials replace
the strongest repeating tile patterns. Map geometry, collision, NPCs, interactions,
equipment, XP, and job/training formulas are unchanged.

`src/template.html` and `src/source-map.json` identify every retained legacy source
block under `src/legacy/`. New features use `src/runtime97.js`, `src/save97.js`,
`src/save97.css`, and `src/visual97.js`. Never edit the generated `index.html`.
See [architecture notes](docs/architecture.md) for the build and extension points.

Browser QA: run `npx playwright install chromium`, then `npm run test:browser`.
An existing Chromium executable can be supplied with `CHROMIUM_PATH`. The test
covers seven viewport sizes, visible World navigation hit targets, save-screen
layout, rotation, and actual page reloads into Training and the saved World
position. It supplements the 27 World, 37 Jobs/Training, and 24 save/continuation
state checks. Native iPhone Safari and standalone-app testing remain device checks.
