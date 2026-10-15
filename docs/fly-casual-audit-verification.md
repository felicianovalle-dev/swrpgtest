# Fly Casual older-layout verification

Build `96.12-fly-casual-audit`, package `1.9.18`. Baseline `e6ce75b2362c`; original-layout fixture `38fc8aa`. Source review: 2026-10-15.

## Source findings

The supplied Fly Casual diagrams and new-talent glossary were visually reviewed, including enlarged connection crops. Printed pages are one lower than physical PDF pages. The [official EotE errata v2.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/eote_errata_v20.pdf), updated 2017-11-20, has a Fly Casual equipment correction on p.51; it does not change these talent trees. Source PDFs and private download URLs are excluded from this repository.

| Tree | Printed page | Physical PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: |
| Charmer | 27 | 28 | 2 | 0 |
| Gambler | 29 | 30 | 0 | 3 |
| Gunslinger | 31 | 32 | 3 | 3 |

All 60 original IDs, names, positions, costs and activation labels remain. Five connections are restored and six unsupported routes removed. Charmer restores Congenial–Just Kidding! and Dedication–Don't Shoot!; Gunslinger restores Call 'Em–Dodge, Lethal Blows–Guns Blazing and Natural Marksman–Deadly Accuracy. Gambler's starting Toughened and Up the Ante have no linked purchases. Its 10-XP Dedication remains 10 XP but must be reached through the book's routes for a new purchase. Existing purchases through removed routes are retained without repricing.

`talentRules108` scopes 39 entries to these layouts: 17 use the supplied glossary, printed pp.32–33 / physical pp.33–34, while 22 retain previously reviewed shared core attribution. The literal shared/scoped source-name union is 426. All 107 earlier tree records remain unchanged. One earlier Rapid Reaction resolution note is updated to describe the fixed controls; after restoring that note and excluding the batch additions, earlier catalog serialization is identical.

The glossary governs detailed rules where the diagram abbreviates them. Just Kidding! converts one Despair to one Failure on an eligible social check, costing one Destiny Point once per round; it does not simply erase the result. Double or Nothing doubles remaining Advantage after cancellation; its improvement adds remaining Successes, and its supreme version also doubles Triumph and Despair. Second Chances rerolls selected positive dice up to ranks, once per encounter before resolution, keeping other dice and accepting the replacements; Force dice cannot be rerolled. Fortune Favors the Bold cannot interrupt a Destiny spend.

## Focused control fixes

Standard `startCombat` called the shared initiative routine, which already offered Rapid Reaction, then offered and charged the talent again and added its bonus to the first PC slot. The redundant second block is removed. Standard and custom encounters now use the shared PC initiative roll once. Winded prevents voluntary strain spending.

Rapid Reaction and outgoing Congenial use a shared whole-strain input helper. Positive fractions round down; spending is limited to whole ranks and available capacity. Cancel, empty, negative, zero and non-finite input spends nothing. Congenial downgrades Challenge dice rather than deleting ordinary difficulty dice. Incoming Congenial remains manual. Existing XP, characteristics and purchase records are not recalculated; schema and storage keys stay 92.

## Manual limits

Disarming Smile, Don't Shoot!, Just Kidding!, Double or Nothing and its improvements, Second Chances, Guns Blazing, Spitfire, Call 'Em, Quick Draw and its improvement, Up the Ante, Smooth Talker and Inspiring Rhetoric have manual steps disclosed on cards. There is no new selected-die reroll interface or two-weapon combat interface. Guns Blazing does not waive the Advantage cost for another hit. Up the Ante applies only to gambling winnings; it does not increase other income.

Natural reroll prompts cover failed checks; successful-check rerolls remain manual. Works Like a Charm and Clever Solution operate through party checks; other contexts need manual handling. Deadly Accuracy stores one current skill choice; further distinct choices require manual tracking, and repeated bonuses on additional hits must be subtracted manually. Earlier documented defense, Force-use and other controls' limitations remain. Earlier audit reports describe their historical builds; this report describes the current changes.

## Verification

The frozen original fixture holds 960 nodes across 48 layouts. This batch brings review progress to 31 of 48, leaving 17 pending. Including six earlier AoR core audits, 37 original-ID catalog layouts / 740 nodes are reviewed. Coverage remains 20 careers, 118 placements, 112 distinct career trees, 17 universal trees and 44 species, with no simplified or prototype career layouts.

Checks cover 960 individual old purchases, combined 2,040-purchase continuation, 60 real purchase buttons, all 11 changed routes, source cards, skill packages, affected controls and save/reload/Resume. Six viewports cover 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Three visible creation/save/resume flows cover Charmer, Gambler and Gunslinger; Charmer and Gunslinger use restored connections. Existing seven creation flows remain regression targets. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

The final-build verification completed successfully. The next group is Cyber Tech, Droid Tech and Modder from Special Modifications; it has not started.

## Completed verification

| Suite | Passed checks |
| --- | ---: |
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

All thirteen browser/source suites passed 2,151 checks without application errors. All ten general regression targets returned zero, including 266 smoke checks and 112 diagnostics. Three new and seven earlier visible local creation/save/resume flows passed. `npm run build:check` reproduces the checked distribution and `git diff --check` passes.

Every target in this final run used the same distribution: Git blob `4f98d6edfeb6a8fd4416f09deaa8d9b2bf7a2c45`, 3,906,607 bytes, SHA-256 `a761a575077b32c1b6bfc6ae43dfef4054cfb823658882b44562b6633f6d7d0c`. No runtime changes followed this run. Machine-readable evidence is in [fly-casual-audit-verification.json](fly-casual-audit-verification.json). Hosted verification will compare these exact bytes and repeat the three new creation/save/resume flows.

## Hosted proof

Published source commit `c65f5a98ec652c09c56818b7a6efc4f7a2ac6553`, tree `e58b3a8732d42a86707f41288c0aea7051a4e49a`. [Pages deployment](https://github.com/felicianovalle-dev/swrpgtest/actions/runs/38820325060) completed successfully. [Working game](https://felicianovalle-dev.github.io/swrpgtest/?v=c65f5a98ec65) returned HTTP 200 and matched the tested distribution exactly: Git blob `4f98d6edfeb6a8fd4416f09deaa8d9b2bf7a2c45`, 3,906,607 bytes, SHA-256 `a761a575077b32c1b6bfc6ae43dfef4054cfb823658882b44562b6633f6d7d0c`.

Fresh hosted Charmer and Gunslinger characters at 390×844 and Gambler at 1280×800 passed visible creation, original-ID purchases along source-checked routes, including restored Charmer and Gunslinger connections, finalization, manual save, reload and Resume. All three preserved character, campaign, XP and purchases, with no horizontal overflow or application errors. These isolated contexts contained no user saves.
