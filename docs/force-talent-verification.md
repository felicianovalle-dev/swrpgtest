# Mechanic, Scout, and Force supplement talent verification

Build `96.3-force-talents`, package `1.9.9`, reviewed 2026-10-13.

This update replaces sixteen simplified layouts with 320 source nodes:
Mechanic, Scout, Arbiter, Ascetic, Teacher, Warden, Warleader, Alchemist,
Magus, Prophet, Executioner, Hermit, Navigator, Investigator, Racer, and Sentry.
The existing character-creation and advancement screens expose all twenty
nodes in each tree with their tier costs, connections, source references,
activation labels, and ranked/unranked status.

## Source review

All sixteen diagrams were visually compared with the supplied EotE/F&D tree
collections and the actual pages in Edge of the Empire Core, Disciples of
Harmony, Keeping the Peace, Unlimited Power, Savage Spirits, and Endless Vigil.
The [coverage audit](character-options-audit.md) records the exact book and PDF
page mappings. No source PDFs or private source links are published in the repo.

Book glossaries supplied activation and ranked metadata, including F&D Core
entries reused by the supplements. The update uses 161 distinct talent entries;
the shared catalog now has 232 entries and adds 72 short source-based summaries.
Careful Planning uses its source diagram's active, once-per-session label without
claiming an unverified turn subtype.

Book entries take precedence over compilation/OCR errors. Scout has Heightened
Awareness rather than Awareness. Teacher has Once a Learner rather than Once the
Learner. Improved Hunter's Quarry follows its passive glossary entry. Improved
Wise Warrior and Improved Reflect retain the active glossary labels despite
passive labels in some book diagrams. Heightened Awareness's differing ranked
labels remain scoped to the source: EotE Scout is unranked; F&D Protector is ranked.

## Purchase and save compatibility

`scripts/fixtures/simplified-talents99.json` records all 320 previous simplified
nodes from commit `c5eab55`. Runtime definitions freeze those IDs and names in
`legacyTrees99`; the generic-tree algorithm cannot reconstruct p37 purchases.

Matching purchases map to available source nodes with the same talent name,
normalizing straight/curly apostrophes and preferring the closest original cost.
Unmatched purchases retain their earlier abilities as game options. The purchase
grid only offers the published layout. The compatibility panel names retained
abilities and shows original amounts paid alongside current tier costs.

Migration does not change XP, spending, credits, characteristics, Force Rating,
or story progress. Dedication and Well Rounded choice keys move with their nodes.
Old Well Rounded keys validate before migration, so an otherwise valid Teacher
save is not rejected simply because its purchased node has changed. Migration
is idempotent; loading an old Force Rating or Dedication never grants it again.
The import-record limit derives from the actual frozen node count. Save schema
and storage namespaces remain 92.

Previously acquired unranked talents supply source connections without another
charge or effect-counting copy. Ranked purchases still charge their tier costs.
The source-specific Heightened Awareness exception preserves Protector purchases.

## Verification

`npm run test:talents:force` tests every previous simplified node individually,
loads all 560 previous prototype/simplified purchases together, exercises real
purchase buttons in each of the sixteen trees, checks continuation and choices,
and inspects all sixteen trees at six viewport sizes.

| Behavior | Check |
| --- | --- |
| Earlier purchases | All 320 individual fixtures retain their ability, XP, Force Rating, characteristic, and purchase alias |
| Mixed older saves | All 560 earlier purchases from both replacement batches load together with unchanged ranks, economy, and story stage |
| Repeat loading | Manual save and browser reload do not repeat migration or reapply Force Rating/Dedication |
| Teacher choices | Earlier Well Rounded selections move with the node; new choices and Well Traveled grant career eligibility without free ranks |
| Purchase paths | All 320 real buttons follow source connections; each fresh tree costs 300 XP; locked and repeated purchases cannot charge |
| Required choices | Cancellation and insufficient XP cannot create or charge a purchase |
| Ranked variants | Scout's unranked Heightened Awareness does not block the ranked Protector version |
| Existing effects | Source Physical Training ranks affect appropriate PC checks; Gearhead removes Mechanics setbacks; actual ship repairs use all four Solid Repairs and both Fine Tuning ranks |
| Bad import records | A valid baseline precedes rejected wrong costs, wrong talent mappings, and oversized records; current state stays intact |
| Phone layout | Every tree fits at 320×568, 375×667, 390×844, 428×926, 844×390, and 1280×800; source text remains above purchase buttons |

The machine-readable results are in
[force-talent-verification.json](force-talent-verification.json).
The new suite passed **371 checks**, with no page errors. The existing core-talent suite passed **286**, campaign checks passed **95**, and the existing browser/navigation suite passed **47**. All ten gameplay regression targets passed, including 266 smoke checks and 112 diagnostics. Save reliability was checked again after the legacy skill-choice fix. Build reproduction and whitespace checks passed.

## Practical scope

Twenty simplified Age of Rebellion layouts remain. There are no remaining
simplified EotE or F&D layouts, but the older 54 layouts labeled full have not
all been freshly audited. Layout coverage does not certify complete automation.

Cards explicitly disclose manual effects, including alchemy, bonded creatures,
temporary copied powers, Force commitments, wilderness recovery, advanced
navigation, complex social abilities, fear, scene reconstruction, and extended
Saber Throw/Improved Reflect. Their printed costs, timing, Destiny/strain/Force
requirements, Conflict, and limits still apply during manual resolution. This
update does not implement all of those action systems.

Tests use controlled rolls for deterministic effect and state checks. Physical
iPhone Safari, installed-PWA offline behavior, and ordinary-character difficulty
balance remain unverified. Species, eras, opening adventures, and the wider
world retain their previous scope; no further phase was started.
