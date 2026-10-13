# Source and build

`index.html` is a generated, self-contained distribution. It is not build input.
`npm run build` assembles these authoritative sources in their established order:

1. `src/template.html` contains the static HTML and ordered source placeholders.
2. `src/source-map.json` maps each placeholder to a legacy JavaScript/CSS file.
3. `src/world94.*`, the mobile/Jobs layers, and navigation styles are embedded.
4. `src/runtime97.js` supplies one navigation/render/hydration adapter. The save
   and visual modules follow it, and the final boot runs after all modules exist.

The character/building atlases are embedded from the checked-in WebP assets.
No asset-generation step, network access, or previous `index.html` is required.
`npm run build:check` verifies that checked-in output exactly matches the source.
The compatibility scripts `build_world94.py` and `build_world96.py` use this same
pipeline; they no longer patch a previous build or write differing cache versions.

# Extension points

New UI modules can subscribe to `Game97.on('install'|'render'|'navigate'|'hydrate'|
'ready', callback)`. Navigation events include `id` and `internal`; do not capture
user continuation during an internal render or hydration. Modules should use these
hooks instead of wrapping `renderAll` or `renderNavTab` again.

The legacy engine's historical wrappers remain intact to preserve rules and saves.
They have been extracted without a broad behavioral rewrite. Consolidate them
incrementally only with the corresponding gameplay regression coverage.

# Player presentation

`src/home.js` owns the Home renderer, replacing the historical presentation
wrappers for that one screen. More options retains the original destinations;
Jobs and Training retain their existing handlers. The save manager updates the
compact saved-game controls without adding another Home card. On fresh startup,
the saved-campaign preview comes from the selected snapshot; shortcuts load it
before navigating, so displayed progress and the opened campaign agree.

`src/objectives.js` describes objectives from state and provides navigation only.
It uses active story node types and courier stages rather than parsing text.
Opening an objective may select its existing adventure location,
but dice rolls, branch choices, travel costs, and encounters remain explicit
actions on their established screens. `src/play-copy.js` moves historical panels
into About and cleans legacy presentation after render/navigation. Rules limits
remain disclosed; user-authored Home identity text is not rewritten. About is
excluded from gameplay continuation, just like Home and the save manager.

# Saves and continuation

The schema and three storage keys remain 92. `resume97` and `saveInfo97` are
additive JSON fields. The former identifies a real tab, a downtime panel, and
scroll positions. World map/positions and quest state remain owned by the existing
engine. The latter records the exact write timestamp, slot kind, build, and
objective summary. Loading does not replace a save slot or create a new timestamp.

The save service validates identity and key collection shapes before hydration.
Latest loading sorts valid timestamps and skips unreadable candidates. Explicit
slot loading is independent. If hydration unexpectedly fails, it restores the
previous snapshot. Missing continuation metadata is cleared for older imports,
and unavailable screens fall back instead of interpreting objective prose.

Legacy autosave timestamps may be stale, so the UI discloses that limitation.
Do not infer a missing timestamp or automatically migrate by overwriting a slot.
Navigation autosaves are suppressed during boot, hydration, and restoration.

Hydration now starts from a cloned fresh state captured before campaign loading,
then merges imported fields and applies existing migrations. Missing campaign
fields never inherit the currently played campaign. Legacy `scene` migration
still runs when `ep15` is absent.

The additive `${RC_SAVE_KEY}-recovery` slot preserves the current campaign before
loading/importing, including edited character creation. A pristine startup does
not replace an existing checkpoint. Recovery is explicit and excluded from
Resume latest. If checkpoint storage fails, loading stops without replacing the
current campaign. Restoring recovery does not replace that checkpoint.

File imports pause autosave until a successful manual save. This pause is session
state, not a gameplay setting written into the imported campaign. The source file
and pre-import checkpoint remain available if the browser is closed first.

# Visual boundary

`src/visual97.js` renders connected materials and caches deterministic tile art.
It does not alter map grids, occupancy, positions, object actions, or NPC data.
Maintain this boundary when changing art: a visual change must preserve map
reachability and the existing saved coordinates.

# Validation

`npm test` exercises World/canvas behavior, Jobs/Training, corrupted/older save
handling, failed writes, slot selection, and continuation fallbacks. It also runs
the existing smoke suite and diagnostics. `npm run test:browser` serves the actual
build, measures visible controls, checks hit targets, and reloads real storage.
Chromium phone/touch emulation does not establish physical iPhone Safari support.
