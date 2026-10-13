# Core talent-tree replacement verification

Build `96.2-core-talents`, package `1.9.8`, tested 2026-10-13.

The twelve former prototype layouts now use 240 source nodes from Edge of the
Empire Core: Gadgeteer, Survivalist, Doctor, Politico, Scholar, Fringer, Trader,
Bodyguard, Marauder, Mercenary Soldier, Thief, and Outlaw Tech. Their names,
positions, tier costs, and connecting paths were visually checked in both the
supplied EotE tree collection and the core book. Printed/collection page mappings
are in the [coverage audit](character-options-audit.md).

The core glossary supplied activation/ranked metadata for 108 distinct talents.
Its passive Knowledge Specialization rule corrects two active labels in the
compilation. Short source-based summaries and individual automation disclosures
explain what the imported abilities do and which actions remain manual.

## Save compatibility

The fixture in `scripts/fixtures/prototype-talents98.json` captures all 240 prior
generic nodes from commit `c0e6d06`. Every old node was imported individually.
Matching purchases map by talent name to an available source node, preferring the
closest original cost and then row/column order. Unmatched nodes remain as earlier
game options and keep their existing effect counting. They are not offered for
new purchase and do not unlock source connections.

XP balances, original spending, credits, characteristics, and dedication choices
remain unchanged. Repeated migration produces the same snapshot. Loading all 240
old purchases retained their total effect count, ranks, economy, and quest stage.
Manual save and browser reload did not migrate them a second time. The compatibility
panel lists retained abilities and both the original and new-purchase costs.

Previously acquired unranked talents supply connections without another charge
or another effect-counting copy. New ranked purchases still charge their tier cost.
Existing exact-tree purchase IDs are unchanged. Schema and storage keys remain 92.

## Automated behavior tested

| Behavior | Validation |
| --- | --- |
| Source paths and costs | All 20 actual purchase buttons exercised in each of 12 trees; each fresh full tree cost 300 XP; locked/repeated purchases could not charge |
| Well Rounded | Cancelled/duplicate choices could not charge; two distinct skills became career skills without receiving free ranks; choices persisted |
| Knowledge Specialization | First Knowledge choice persisted across ranks; spending one Triumph added rank-based Successes only for that PC skill |
| Natural Scholar | Failed Knowledge reroll limited to once per session; cancellation and unrelated checks did not consume it; session use persisted |
| Conditional checks | Blooded/toxin, Outdoorsman/terrain, Utinni!/scavenging, Confidence/fear, and Respected Scholar/academic checks affected eligible PC checks only |
| Feral Strength | Brawl/Melee bonus only; actual attack handler applied it once; Linked extra hits excluded it, including after restoring the battle |
| Invalid imports | A valid baseline was established before rejecting malformed choices, migration records, and negative single-hit damage |
| Phone geometry | All twelve trees checked at six viewport sizes; page overflow and text/purchase-button intersections were absent |

`npm run test:talents` passed **286 checks** with no page errors. This includes
240 individual prior-release migration cases, real purchases through all twelve
trees, and six viewport sizes: 320×568, 375×667, 390×844, 428×926, 844×390, and
1280×800. Results are preserved in [talent-verification.json](talent-verification.json).

The 95 campaign browser checks and 47 existing browser checks also passed. All ten
existing regression targets passed, including 266 smoke checks and 112 diagnostics.
Story/combat, mission playthrough, and setback targets were repeated after the
single-hit damage correction. `npm run build:check` confirmed reproducible output;
`git diff --check` reported no whitespace errors.

## Practical limits

The 36 simplified layouts remain for the next update. The older 54 layouts labeled
full have not all been freshly audited. This update does not establish complete
automation for every talent: temporary stims, Pressure Point, Bacta care, Frenzied
Attack, Scathing Tirade, many social/vehicle/item actions, successful-check rerolls,
and separate Deadly Accuracy choices for multiple ranks still require manual
resolution as disclosed on the cards. Context bonuses require the relevant check
flag; they do not apply to all generic checks.

Rolls were controlled for deterministic state/effect tests. Ordinary-character
difficulty balance, physical iPhone Safari, and installed-PWA offline behavior
remain unverified. The existing era/adventure scope is unchanged in this update.
