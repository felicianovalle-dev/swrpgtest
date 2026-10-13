# Source and build

`index.html` is a generated, self-contained distribution. It is not build input.
`npm run build` assembles these authoritative sources in their established order:

1. `src/template.html` contains the static HTML and ordered source placeholders.
2. `src/source-map.json` maps each placeholder to a legacy JavaScript/CSS file.
3. `src/world94.*`, the mobile/Jobs layers, and navigation/creation styles are embedded.
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

Combat is registered as a tab by `runtime97.js`, so saved battles can navigate
back to their screen. A saved combat-screen hint without actual combat falls
back to Home. Hydration redraws a battle without restarting its initiative or
turn; browser regressions compare its complete state across reload.

Entering Combat explicitly redraws its controls after loading. The additive
`combat.targetIndex` field keeps dropdown, battlefield and retro target controls
in agreement and survives serialization. If that enemy is defeated, rendering
selects a surviving enemy. Older battles without the field use the first target.

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

# Character options and campaign beginnings

`src/content/character-options.json` owns the additive, source-referenced species,
career packages, universal packages, requirements, and 25 reviewed tree layouts.
`src/catalog.js` installs these options before the runtime captures fresh state.
The builder substitutes the JSON once into its explicit data marker; no remote
catalog or PDF is needed at runtime. Existing tree IDs remain untouched.

`src/campaign-content.js` owns era/allegiance metadata and twelve original short
mission definitions. It registers them with the existing story engine rather than
implementing a second dice, reward, or quest engine. The new mission marker keeps
legacy story offers and their existing travel/combat requirements separate.

`src/campaign.js` owns the beginning chooser, personal details, opening screen,
review requirements, suitable mission offers, and in-game coverage disclosure.
It subscribes to the shared install/render/hydrate/navigate events. The Home and
objective modules delegate campaign presentation through `Game97.campaign`.
`src/campaign.css` uses the existing interface conventions and keeps creation
controls readable at 320px and wider viewports.

`campaign97` stores enabled/era/faction/focus/mission/weapon, application/opening
state, creation step, and personal details. `speciesBonus97` stores Human choices;
`universalKnowledge97` stores a selectable universal Knowledge career skill.
These fields serialize through the existing state service without changing schema
92. Save validation checks the new metadata before hydration. A missing campaign
field on an older save means its original campaign, not the currently loaded era.

The start kit applies once during finalization. Beginning a mission is a separate
player action and grants no reward. The story engine pays its finale once and
stores completed choices. Imported layouts do not imply that every special
talent action is automated; see `docs/character-options-audit.md` for the exact
coverage and remaining source/layout gaps.

`npm run test:campaign` runs the actual built game in Chromium. It covers all
era/allegiance combinations, free-rank/Force/prerequisite guards, mission branches,
failed-check recovery, save/reload, legacy preservation, and six viewport sizes.
Mission branch tests control rolls to verify state transitions and rewards; they
do not establish ordinary-character difficulty balance.
