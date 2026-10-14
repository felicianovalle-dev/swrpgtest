# Older core-tree audit verification

Build `96.5-core-tree-audit`, package `1.9.11`, reviewed 2026-10-14.

The first six older full layouts were checked against the supplied Age of Rebellion core book: Driver, Gunner, Pilot, Commodore, Squadron Leader and Tactician. All 120 original purchase IDs and XP tiers are retained. Layout coverage remains 112 full career trees, zero simplified and zero prototypes. Forty-eight of the original 54 older full layouts still await fresh source review.

## Source review and corrections

The six book diagrams and source glossary entries were reviewed visually and through OCR. Printed pages and physical PDF pages are recorded in the [coverage audit](character-options-audit.md). The supplied AOR collection was also compared; book diagrams take precedence when the compilation omits or differs on a connection. Source PDFs and private file URLs are excluded from the repository.

| Tree | AoR Core printed page | Source PDF page | AOR collection PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: | ---: |
| Driver | 67 | 68 | 3 | 0 | 2 |
| Gunner | 68 | 69 | 4 | 1 | 4 |
| Pilot | 69 | 70 | 6 | 2 | 3 |
| Commodore | 73 | 74 | 9 | 2 | 0 |
| Squadron Leader | 74 | 75 | 12 | 0 | 2 |
| Tactician | 75 | 76 | 14 | 3 | 5 |

The update restores eight source connections and removes sixteen unsupported connections. Three labels change from passive to active: Improved Full Throttle in Driver and Pilot, plus Improved Dead to Rights in Pilot. Fire Control’s glossary activation is a maneuver, despite the diagram’s action wording. Form On Me retains `sql32` while removing the old exclamation mark from its label.

Overwhelm Defenses is usable after an unsuccessful mounted-weapon attack; it spends pairs of Advantage to reduce the targeted defense zone for the remainder of the encounter. Coordinated Assault’s additional-rank range wording follows the [official AoR errata v1.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/aor_errata_v10.pdf), checked from the publisher PDF.

## Save compatibility

`scripts/fixtures/core-trees101.json` captures all 120 nodes from the previously published `9d8d223` build, including original links, types and skill packages. Independently checked edge deltas are stored in the test suite. Catalog `nodeIds` allows reviewed source records to retain the original IDs, so these six trees do not opt into replacement migration.

Existing purchases retain their abilities, original spending, Dedication keys and skill selections. Changing a connection only changes eligibility for new purchases; it does not revoke a saved node. The earlier 960-purchase migration remains intact. A combined old fixture with all 1080 purchases loads, saves and resumes without increasing Force Rating, changing characteristics or duplicating benefits. Schema and storage keys remain 92.

Driver and Pilot are shared across two careers each. The audit updates each distinct layout once and retains both career packages.

Driver also retains the earlier Enter the Unknown page 29 reference for its Explorer placement. That reference was present in the saved build; this batch newly verifies the shared layout against the AoR core book.

## Resolution scope

All 57 distinct talent entries have source references, activation and ranked labels in `talentRules101`. Manual-resolution notes explain vehicle scale, allied actions, strain/Destiny costs and timing. This audit does not create automated vehicle or command actions. Field Commander, Body Guard, Full Throttle, Gain the Advantage sharing, True Aim, Jury Rigged and other complex actions still require the disclosed manual resolution.

Existing PC check, threshold, soak and ship-repair benefits were exercised through their real handlers. Failed-check reroll offers remain implemented; rerolling a successful check still requires manual resolution. No later talent-mechanics or opening-content phase was started.

## Verification

`npm run test:talents:core` checks source edge changes independently from catalog data, all 120 prior purchase IDs, combined continuation with 1080 purchases, all 120 real purchase buttons, repeated/locked/cancelled purchases, Dedication, source metadata and manual notes, shared career packages, check/repair effects and six viewport sizes.

The file-import regression now waits for the reader's `loadend` event with a bounded timeout, replacing a fixed 350 ms delay. Its checks for campaign isolation, recovery contents and paused autosave are unchanged.

A fresh Driver character was also created through the visible identity, career, free-skill and talent controls. More → Review finalized the opening; manual save and reload retained the original `drv00` purchase, economy and campaign beginning.

One large AoR run timed out during a visible, enabled Shipwright Known Schematic button click. All twenty Shipwright purchases subsequently passed in isolation with 300 XP charged, one Dedication increase and no runtime errors. The full AoR rerun uses a 60-second browser-control timeout; its purchase, migration, benefit and geometry assertions are unchanged.

The browser continuation suite also encountered a 30-second full-page-load timeout when reloading a saved World map. Navigation now waits for DOM loading followed by the game's actual ready signal, with a 60-second timeout. Its geometry, touch-target, import, recovery, combat and continuation assertions are unchanged.

All suites passed on the generated build:

| Suite | Passed checks |
| --- | ---: |
| Six older core layouts | 156 |
| Earlier EotE replacement layouts | 286 |
| Mechanic, Scout and F&D replacements | 371 |
| AoR replacement layouts | 466 |
| Campaign beginnings and mission branches | 95 |
| Browser layout and continuation | 47 |

All ten regression targets from `npm test` passed, including 266 smoke checks and 112 diagnostics. Six completed before a workspace execution-service interruption; the remaining four were rerun against the same generated build. No application runtime errors were reported. `npm run build:check` reproduced the checked-in HTML; `git diff --check` found no whitespace errors. Machine-readable results are in [core-tree-audit-verification.json](core-tree-audit-verification.json).

The tested distribution has Git blob `61e11b35561e20a338dd156ca9134a5cf295e876`. Deployment is checked against this exact distribution before the working version is delivered.

Phone geometry uses Chromium at 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. It checks overflow and source-text/button overlap. Physical iPhone Safari, installed-PWA offline behavior and ordinary-character difficulty balance were not newly evaluated.
