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
