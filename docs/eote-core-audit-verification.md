# Older EotE core layout verification

Build `96.10-eote-core-audit`, package `1.9.16`. Baseline `6660dd625c9f`; original layout fixture `38fc8aa`. Source review: 2026-10-15.

## Source findings

The supplied Edge of the Empire Core diagrams and glossary were visually reviewed, including close connection crops. Printed pages are nine lower than physical PDF pages. The book governs the layouts; no separate supplied EotE compilation was located. The [official EotE errata v2.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/eote_errata_v20.pdf), updated 2017-11-20, removes Mercenary Soldier from Targeted Blow's glossary tree list and retains Assassin. Source PDFs and private download links are excluded from this repository.

| Tree | Printed page | Physical PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: |
| Assassin | 59 | 68 | 0 | 1 |
| Scoundrel | 84 | 93 | 2 | 1 |
| Slicer | 91 | 100 | 4 | 5 |

All 60 original IDs, names, positions and XP costs remain; no activation labels require changing. Assassin loses the unsupported bottom-row Precise Aim–Deadly Accuracy shortcut. Scoundrel restores Toughened–Black Market Contacts and Rapid Reaction–Hidden Storage, and removes the leftmost 10-XP-row connection. Slicer restores two 15-XP-row links, Codebreaker–Resolve and Master Slicer–Mental Fortress, and removes five unsupported links. Its starting Grit and Technical Aptitude intentionally have no linked purchases. Technician and Spy share the same Slicer specialization.

`talentRules106` contains 32 scoped entries from printed glossary pp.132–145 / physical PDF pp.141–154. Three names lack earlier source-rule records: Improved Defensive Slicing, Master Slicer and Skilled Slicer. The union is 406 distinct names. All 101 preceding catalog records and earlier catalog fields serialize identically after excluding this batch's additions. These original-ID trees are excluded from replacement migration.

Skilled Slicer spends a Triumph to permit further Computers checks in the same system as maneuvers. Improved Defensive Slicing is unranked and replaces Setback dice with difficulty upgrades based on Defensive Slicing ranks. Hidden Storage conceals size-appropriate items up to the talent's encumbrance limit; detection is Formidable, and carrying capacity does not increase. Master Slicer is a once-per-round incidental costing 2 strain and reducing the next eligible check by one to a minimum of Easy. Mental Fortress suppresses certain check effects without removing injuries. Side Step follows the glossary's next-turn expiry rather than the diagram's shorter round wording.

## Precise Aim

The old attack control charged strain without using the required maneuver, always used maximum available ranks, and charged before discovering invalid range. It now checks weapon validity first, asks for a whole positive strain amount up to ranks and capacity, spends its maneuver and then takes the attack action. Positive fractions round down. Cancellation, zero, negative or non-finite input spends nothing. Blocked attempts preserve resources and existing unarmed-defense readiness.

Activation strain is reserved while maneuver affordability is checked, then refunded on failure. A second maneuver costs 2 strain while keeping the attack action; declining changes nothing. Immobilization, Winded restrictions and maneuver limits apply. Misses spend the action. The turn-use marker survives save/reload; schema stays 92. Ordinary attacks and other maneuver callers retain their behavior. Once-per-round use across extra turns remains manual.

## Manual limits

Defensive Slicing, its improvement, Skilled Slicer, Master Slicer, Mental Fortress, Hidden Storage, Sniper Shot, Quick Draw, Jump Up, Technical Aptitude and one-hit Destiny damage talents retain manual steps. Sniper Shot does not extend the normal attack control's range. The game stores one current Deadly Accuracy skill; distinct choices for further ranks require manual tracking. Additional hits can repeat its damage bonus; subtract repeated bonuses manually.

Natural Programmer and Natural Charmer offer failed-check rerolls and save the session use; successful-check rerolls remain manual. Master of Shadows does not enforce its round limit. Side Step still spends a maneuver before prompting and clears at the round boundary; cancellation and next-turn timing require manual handling. Rapid Reaction accepts fractions; choose whole numbers. Black Market Contacts supports restricted purchases using local prices; exotic eligibility and base-price adjustments require manual handling. Resolve and Codebreaker have supported contexts rather than universal coverage. Existing defense-cap and earlier documented limits remain.

## Verification

The original fixture contains 960 nodes across 48 layouts. This batch brings review progress to 25 of 48, leaving 23 pending layouts. Individual purchases and a combined 2,040-purchase campaign check preservation of IDs, XP, characteristics, Force rating, Dedication and choices. All 60 real purchase buttons, restored and removed routes, scoped cards, controlled mechanics and save/resume are covered. Full new trees cost 300 XP each; old purchases are not repriced.

Six viewports cover 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Four visible creation/save/resume flows cover Assassin, Scoundrel, Technician Slicer and Spy Slicer; both Slicer flows use restored connections. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

The current final-build verification completed successfully. The next source group is Martial Artist, Operator and Skip Tracer from No Disintegrations; it has not started.

## Completed verification

| Suite | Passed checks |
| --- | ---: |
| eoteCore | 104 |
| forceSupplements | 104 |
| sentinelWarrior | 102 |
| mysticSeeker | 92 |
| consularGuardian | 91 |
| olderAoRCore | 156 |
| eotEReplacements | 286 |
| forceReplacements | 371 |
| aorReplacements | 466 |
| campaign | 95 |
| browser | 47 |

All eleven browser/source suites passed 1,914 checks without application errors. All ten general regression targets returned zero, including 266 smoke checks and 112 diagnostics. The four visible local creation flows also passed. `npm run build:check` reproduces the checked distribution and `git diff --check` passes.

Every target in this final run used the same distribution: Git blob `93f83a1c5155f46c4265685aa884d924db18bccd`, 3,850,625 bytes, SHA-256 `d3db34baf556d90ed080f4f0ea2c133360af79cc59509df7ea92f7437e63157e`. No runtime changes followed this run. Machine-readable evidence is in [eote-core-audit-verification.json](eote-core-audit-verification.json). Hosted verification will compare this exact build and repeat all four creation/save/resume flows.
