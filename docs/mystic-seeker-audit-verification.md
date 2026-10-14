# Mystic and Seeker older-layout verification

Build `96.7-mystic-seeker-audit`, package `1.9.13`. Published baseline `4e8423c`; original saved-layout fixture `38fc8aa`.

## Sources and changes

The supplied Force and Destiny core book, FND tree compilation, glossary and [official F&D errata v1.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/fad_errata_v10.pdf) were checked. The original core diagrams govern connections; the glossary governs timing, ranked status and Force designation; official errata supersedes either. Source PDFs and private download links are excluded from the repository.

| Tree | Printed page | Physical PDF page | Compilation PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: | ---: |
| Advisor | 81 | 84 | 16 | 0 | 3 |
| Makashi Duelist | 82 | 85 | 19 | 1 | 6 |
| Seer | 83 | 86 | 21 | 1 | 1 |
| Ataru Striker | 87 | 90 | 23 | 0 | 2 |
| Hunter | 88 | 91 | 26 | 1 | 1 |
| Pathfinder | 89 | 92 | 28 | 0 | 5 |

All 120 original IDs, talent names, positions and XP tiers remain. Three missing connections are restored and eighteen unsupported connections removed. Seer's compilation omits Grit–Forewarning and adds Dodge–Force Rating; the core book has the former and lacks the latter. Pathfinder's Quick Movement–Natural Outdoorsman connection is present in the book and is retained.

Seven labels change: Improved Parry is active in Makashi Duelist (`mk31`) and Ataru Striker (`at23`); Ataru's two Reflect ranks (`at11`, `at21`) are Force active; Hunter's Sixth Sense (`hu32`) is ordinary passive and Intuitive Shot (`hu42`) is Force passive; Pathfinder's Animal Empathy (`pf20`) is Force passive. Feint remains passive.

`talentRules103` supplies 65 scoped rules, including 47 not in the previous Consular/Guardian set; the union of shared and scoped names is now 365. Earlier 85 catalog records and other catalog fields are unchanged. This adds six reviews without changing the 48 replacement-migration trees.

## Rule discrepancies and actual behavior

The F&D glossary and talent table label Sixth Sense ranked, while the Hunter diagram omits its rank marker. That scoped rule allows the F&D rank and the defense handler counts saved ranks. AoR's unranked variant remains separate; previously saved IDs are retained.

Mental Bond's glossary permits commands at extreme range, while the diagram says long. Its action commits one Force die and requires an animal already bonded through Animal Bond. The Share Pain glossary's reference to Animal Empathy is reconciled with Animal Bond, which actually establishes that bond. Share Pain halves the animal's wounds rounded up and transfers the amount prevented. Animal Bond does not require Force-die commitment; bonding occurs outside structured encounters and its silhouette limit is half Force rating rounded down. The cards explain these details and disclose manual companion handling.

Hawk Bat Swoop spends Force points to engage and add Advantage. Makashi Flourish uses an Average action, ignores soak for its strain, can stagger on 3 Advantage or Triumph, and is limited to once per encounter. Quick Movement costs 2 strain and 2 Force points, follows a non-Force check and can permit a third maneuver. Conditioned uses its own ranks for falling damage/strain reduction, following the official correction to the glossary's Coordination reference.

Duelist's Training now affects both Melee and Lightsaber combat pools and excludes groups of multiple minions. A shared helper keeps normal and special combat pools consistent. Sixth Sense now adds ranged defense per saved rank. The audit verifies existing technique, social-check, tracking, foraging, soak, initiative and recovery handlers; it does not introduce an animal-companion or comprehensive Force-action subsystem. Per-card resolution notes distinguish these existing handlers from manual steps, including Side Step's round-boundary reset versus the book's until-next-turn expiry.

Force Rating 1 is required to use Force talents, not to purchase them. Purchases cannot establish initial sensitivity. The cards show the use requirement; older automatic handlers do not uniformly enforce it, so use eligibility may require manual checking. Multiple known lightsaber techniques still use the engine's established priority; choosing among them requires manual resolution. Existing saved ratings and characteristics are never retrospectively recalculated.

## Continuation and validation

The unchanged fixture contains the original 48 pending layouts and 960 nodes. The 36 still-pending layouts match it exactly. Every original individual purchase validates unchanged, including removed routes and Force Rating zero. A combined 2,040-purchase save covers earlier replacements, original AoR core reviews and all 48 layouts. Actual save/reload/Resume checks preserve XP, characteristics, rating, Dedication, skill choices and IDs.

All 120 real purchase buttons are exercised, with each tree costing exactly 300 XP. Repeated purchases, cancellation, insufficient XP, removed routes, restored routes and scoped unranked behavior are checked. Separate controlled-roll checks verify affected handlers without claiming ordinary-character difficulty balance.

Chromium viewports: 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Every layout is checked for horizontal overflow and text/button overlap. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

All required verification runs completed without application errors. This batch completes 12 of the original 48 older layouts, leaving 36. The six Sentinel/Warrior core layouts are next; they have not been started.

## Completed verification

| Suite | Passed checks |
| --- | ---: |
| mysticSeeker | 92 |
| consularGuardian | 91 |
| olderAoRCore | 156 |
| eotEReplacements | 286 |
| forceReplacements | 371 |
| aorReplacements | 466 |
| campaign | 95 |
| browser | 47 |

The eight browser/source suites passed 1,604 checks. All ten general regression targets returned exit code zero, including 266 smoke checks and 112 diagnostics. `npm run build:check` reproduces the distribution and `git diff --check` passes. Machine-readable evidence is in [mystic-seeker-audit-verification.json](mystic-seeker-audit-verification.json).

Fresh Advisor and Seer characters at 390×844, plus Ataru Striker at 1280×800, passed visible creation, original-ID purchases, finalization, manual save and reload. Seer also purchased Forewarning through the restored Grit connection. No overflow or application errors occurred.

The checked distribution has Git blob `efcba3f633a99cf38269169da25bcf6beb57594f` (3,735,263 bytes). Hosted verification will compare the deployed HTML with this exact distribution and repeat these three flows.

## Hosted proof

Published source commit `30052f136253096022d8fc72e38cb83b7aa42241`, tree `ca9cfbabb2cfc908e0bccad07fb0a9fae2aaf21e`. [Pages deployment](https://github.com/felicianovalle-dev/swrpgtest/actions/runs/38650352179) completed successfully. [Working game](https://felicianovalle-dev.github.io/swrpgtest/?v=30052f136253) returned HTTP 200 and exactly matched the tested distribution: Git blob `efcba3f633a99cf38269169da25bcf6beb57594f`, 3,735,263 bytes, SHA-256 `826823bb06871deab2805c23efdf6dee51b82f7e1f53ecd39f4acaecdfd76644`.

Fresh hosted Advisor and Seer characters at 390×844 and Ataru Striker at 1280×800 passed visible creation, original-node purchases, finalization, manual save, reload and Resume latest. Seer also used the restored Grit–Forewarning connection. All three retained their character, campaign, XP and purchases; no horizontal overflow or application errors occurred. These isolated contexts contained no user campaign saves.
