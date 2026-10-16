# Special Modifications older-layout verification

Build `96.13-special-modifications-audit`, package `1.9.19`. Baseline `82c5e77132d3`; original-layout fixture `38fc8aa`. Source review: 2026-10-15.

## Source findings

The supplied Special Modifications scan was visually reviewed, including enlarged connection crops and the full new-talent glossary. Printed pages are three lower than physical PDF pages. The [official EotE errata v2.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/eote_errata_v20.pdf), updated 2017-11-20, contains no Special Modifications entry. Official publisher searches found no additional book-specific talent correction; this is a statement about the sources checked, not a guarantee that no later ruling exists. Source PDFs and private download URLs are excluded from the repository.

| Tree | Printed page | Physical PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: |
| Cyber Tech | 29 | 32 | 0 | 4 |
| Droid Tech | 31 | 34 | 0 | 3 |
| Modder | 33 | 36 | 0 | 5 |

All 60 original IDs, names, positions, costs and activation labels remain. Twelve unsupported shortcuts are removed. Cyber Tech's starting Engineered Redundancies is independent and has no connected purchase. Modder's final row connects its 25-XP Jury Rigged to Dedication; Natural Tinkerer and Custom Loadout are reached through the rows above, not by crossing from Dedication. Existing purchases reached through an old shortcut are retained without repricing. New purchases follow the book routes.

`talentRules109` scopes 33 entries to these trees: 18 use the supplied new-talent glossary, printed pp.34–35 / physical pp.37–38, while 15 retain earlier shared core/source attribution. The literal shared/scoped source-name union is 441. Every earlier catalog field, including all 110 earlier tree records, remains unchanged after excluding this batch's additive entries. No replacement migration is added.

The full glossary supplies limits abbreviated in the diagrams. Energy Transfer requires at least one installed cybernetic, costs one strain and a maneuver, and powers a device only until encounter end. Engineered Redundancies shares a five-treatment daily limit between stimpacks and repair patches. Improved Speaks Binary adds a Boost to an assisted character's check; Supreme Speaks Binary applies to NPC non-minion droids only, through the beginning of the next turn. Signature Vehicle requires an owned vehicle, normally silhouette 3 or lower. Supreme Overcharge upgrades difficulty for each additional implant. Reroute Processors has characteristic bounds of 0 and 7. Resourceful Refit destroys an installed attachment only on success and credits a replacement on the same host, with a price floor of zero.

## Focused control fixes

Eye for Detail now reuses the shared finite, bounded whole-strain helper. Positive fractions round down; ranks, available strain capacity and available Successes limit conversion. At least one Success is retained. Cancel, empty, negative, zero and non-finite input spends nothing. Winded prevents use. Its party-check workflow is tested; direct Workshop rolls still require manual symbol conversion.

Cyberneticist removes setbacks from explicitly tagged cybernetic Mechanics and Medicine checks. Deft Maker removes setbacks from explicitly tagged droid Mechanics and Computers checks. Both remain limited to the PC; ordinary or ineligible checks retain their pools. Actual Workshop construction and programming now carry the droid context.

`craftMaterialCost` applies Deft Maker's single 50 percent droid-material discount to Workshop preview, affordability, shortfall and actual payment. Additional ranks do not compound the discount; weapon and gadget materials retain their prices. Failed acquisition and insufficient credits charge nothing. Duplicate acquisition cannot double charge. Existing materials remain ready with no retroactive charge or refund. Construction failure still consumes materials; programming failure still preserves the chassis.

## Manual limits

Cybernetic implant storage, installation, caps, Cyberneticist purchase discounts, Engineered Redundancies treatment and its shared daily allowance, Energy Transfer, Overcharge and its improvements, Reroute Processors, Machine Mender healing, the Speaks Binary family, Signature Vehicle and related benefits, Resourceful Refit, Utility Belt, Hidden Storage, Tinkerer and Jury Rigged retain manual steps disclosed on the relevant cards. Gearhead's attachment-modification discount is manual. Natural reroll prompts cover failed Mechanics checks; rerolling a successful check is manual. No automatic extra-action, temporary-characteristic, implant or signature-vehicle state is claimed. Earlier documented control limitations remain.

## Verification

The frozen original fixture holds 960 nodes across 48 layouts. This batch brings review progress to 34 of 48, leaving 14 pending. Including six earlier AoR core audits, 40 original-ID catalog layouts / 800 nodes are reviewed. Coverage remains 20 careers, 118 placements, 112 distinct career trees, 17 universal trees and 44 species, with no simplified or prototype career layouts.

Checks cover 960 individual old purchases, combined 2,040-purchase continuation, 60 real purchase buttons, all 12 removed routes, source cards, skill packages, affected controls and save/reload/Resume. Six viewports cover 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Three visible creation/save/resume flows cover Cyber Tech, Droid Tech and Modder along source routes. The earlier ten creation flows remain regression targets. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

The final-build verification completed successfully. The next group is Demolitionist, Enforcer and Heavy from Dangerous Covenants; it has not started.

## Completed verification

| Suite | Passed checks |
| --- | ---: |
| specialModifications | 117 |
| flyCasual | 123 |
| noDisintegrations | 114 |
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

All fourteen browser/source suites passed 2,268 checks without application errors. All ten general regression targets returned zero, including 266 smoke checks and 112 diagnostics. Three new and ten earlier visible local creation/save/resume flows passed. `npm run build:check` reproduces the checked distribution and `git diff --check` passes.

Every target in this final run used the same distribution: Git blob `d2db4a7dc000d9ada7768995e1b725ea560227bb`, 3,933,380 bytes, SHA-256 `e02985086742f02dd1aa651f9b964ed4d5420575efe9e5e722becdc0370852e2`. No runtime changes followed this run. Machine-readable evidence is in [special-modifications-audit-verification.json](special-modifications-audit-verification.json). Hosted verification will compare these exact bytes and repeat the three new creation/save/resume flows.
