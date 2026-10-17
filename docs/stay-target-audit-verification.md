# Stay on Target older-layout verification

Build `96.18-stay-target-audit`, package `1.9.24`. Baseline `562d8e2d1d71`; original-layout fixture `38fc8aa`. Source review: 2026-10-17.

## Source findings

The supplied 98-page scan was checked visually, including enlarged connector strips and the two-page glossary. Printed pages are one below physical PDF pages. The official [AoR errata v1.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/aor_errata_v10.pdf), updated 2017-11-20 and fetched directly during the preceding batch, lists Stay on Target corrections on pp.12, 41, 59, 60, 72 and 83. Those affect ability references, equipment, vehicles, an encounter action and Bantha silhouette; they do not correct these three talent diagrams. Their implementation is outside this layout batch. Source PDFs and private download URLs are excluded.

| Layout | Printed page | Physical PDF page | Restored routes | Removed routes |
| --- | ---: | ---: | ---: | ---: |
| Beast Rider | 27 | 28 | 1 | 4 |
| Hotshot | 29 | 30 | 3 | 5 |
| Rigger | 31 | 32 | 0 | 6 |

Beast Rider restores Spur-to-Natural Outdoorsman and removes Toughened (10 XP)-to-Let’s Ride, Expert Tracker (15 XP)-to-Improved Spur, Spur-to-Dedication and Expert Handler (20 XP)-to-Soothing Tone. Hotshot restores Shortcut (10 XP)-to-High-G Training (10 XP), High-G Training (15 XP)-to-Grit (15 XP) and that Grit-to-Intense Presence. It removes Second Chances (10 XP)-to-Dead to Rights, Grit (10 XP)-to-Shortcut (10 XP), High-G Training (10 XP)-to-Intense Presence, High-G Training (15 XP)-to-Corellian Sendoff and Improved Corellian Sendoff-to-Dedication. Rigger removes Fancy Paint Job-to-Overstocked Ammo, Larger Project (10 XP)-to-Bolstered Armor, Overstocked Ammo-to-Customized Cooling Unit, Gearhead (20 XP)-to-Fortified Vacuum Seal, Tuned Maneuvering Thrusters (25 XP)-to-Not Today and Not Today-to-Reinforced Frame. All other source connections remain, including Fortified Vacuum Seal-to-Reinforced Frame.

All 60 original IDs, names, positions and XP costs remain. Existing purchases through removed routes stay owned without repricing; corrected connections govern new purchases. Improved Spur becomes Active (Maneuver), following the p.33 glossary. Improved Dead to Rights becomes Active (Incidental), following the shared core glossary.

Twenty-two glossary entries on printed pp.32–33 / physical pp.33–34 and fifteen shared entries supply 37 scoped rules. Shared entries retain earlier source attribution. Every entry states activation, ranks, Force eligibility, source and resolution boundaries. The literal source-name union reaches 486. All 124 earlier tree records and all earlier catalog fields remain unchanged; removing only this batch’s additions reproduces the baseline catalog serialization exactly.

## Beast Wrangler scope correction

Beast Wrangler adds Boost only for taming or wrangling checks, not every check concerning a beast. Party checks now use explicit wrangling context for this bonus. The earlier generic beast context still applies Hunter independently. Expert Handler retains its distinct Survival-plus-riding requirement. Generic beast checks, ordinary Survival, and unrelated riding skills do not receive these talents’ bonuses. Other roll workflows require manual application of the stated context. There are no new saved state fields, migrations, resource costs or XP changes.

## Manual boundaries

Spur, its improvements and Soothing Tone retain manual ridden-beast eligibility, checks, actions/maneuvers, personal versus mount strain, speed and recovery. Improved Spur spends the rider’s strain; Supreme Spur reduces continuing mount strain and does not remove that rider cost. Soothing Tone is once per encounter and heals wounds only when the ridden beast lacks a strain threshold.

High-G Training, Corellian Sendoff and its improvement, Koiogran Turn, Showboat and mounted-weapon Dead to Rights remain manual. Corellian Sendoff has two enemy targets within close range, each no larger than the piloted vehicle. Koiogran Turn requires speed four or higher. Showboat is once per round and adds its Triumph/Despair without an extra Success/Failure component. Second Chances rerolls selected positive dice only, excludes Force dice and does not reroll the whole pool.

Signature Vehicle and its improvements retain a manually recorded eligible owned craft. They do not grant a free craft, alter all vehicles or automatically modify ship statistics. Larger Project changes eligibility, not actual silhouette. Reinforced Frame raises the weapon’s Critical activation rating against the vehicle; it does not change Critical severity. Not Today is not a full repair and retains the destruction trigger, Destiny cost and session limit. Successful-check Natural Outdoorsman rerolls, chase-specific Shortcut, travel/foraging/tracking time and other earlier documented controls retain manual steps disclosed on cards.

## Verification scope

All 48 original older layouts / 960 nodes are now reviewed. Including the earlier six AoR core audits, 54 original-ID layouts / 1,080 nodes are reviewed. Coverage remains 20 careers, 118 placements, 112 distinct career trees, 17 universal trees and 44 species, with no simplified or prototype career layouts. Schema and storage keys stay 92. This completes layout review; it does not claim complete automation of every talent or a complete species audit.

Tests cover all 960 original individual purchases, combined 2,040-purchase continuation, all 60 real purchase buttons, 19 source-route corrections, two activation labels, whole-tree XP, supported modifier scopes and saved Natural Outdoorsman session use. Viewports: 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Three visible creation/save/resume flows follow corrected source routes; all 25 earlier flows remain regression targets. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

The final-build verification completed successfully. The original 48-layout audit is complete; no additional phase has started.

## Completed verification

| Suite | Passed checks |
| --- | ---: |
| stayOnTarget | 107 |
| leadByExample | 100 |
| farHorizons | 102 |
| enterTheUnknown | 89 |
| dangerousCovenants | 171 |
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

All nineteen browser/source suites passed 2,837 checks without application errors. All ten general regression targets passed, including 266 smoke checks and 112 diagnostics. Three new and twenty-five earlier visible local creation/save/resume flows passed. `npm run build:check` reproduces the tested distribution, and `git diff --check` passes.

The same distribution was used throughout: Git blob `1834528103862139204631b250968e0c6e2609e0`, 4,064,037 bytes, SHA-256 `0e719e95072abb34a20e6c4b2227230a00cd725bb8f6d20fcbfcd29cea8b5e78`. No runtime changes followed this run. See [machine-readable evidence](stay-target-audit-verification.json).

## Hosted proof

Published source commit `a850763a39323f5270a95b8d865257a38c8c2e36`, tree `d965ec8e8d219be39059c05bde3cd36ade8d2d12`. [Pages deployment](https://github.com/felicianovalle-dev/swrpgtest/actions/runs/39067098883) completed successfully. [Working game](https://felicianovalle-dev.github.io/swrpgtest/?v=a850763a3932) returned HTTP 200 and exactly matched the tested distribution: Git blob `1834528103862139204631b250968e0c6e2609e0`, 4,064,037 bytes, SHA-256 `0e719e95072abb34a20e6c4b2227230a00cd725bb8f6d20fcbfcd29cea8b5e78`.

Fresh hosted Beast Rider at 390×844, Hotshot at 375×667 and Rigger at 1280×800 passed visible creation, original-ID purchases, finalization, manual save, reload and Resume. Character, campaign, XP, purchases and talent choices were preserved. No horizontal page overflow or application errors occurred. These isolated contexts contained no user saves.
