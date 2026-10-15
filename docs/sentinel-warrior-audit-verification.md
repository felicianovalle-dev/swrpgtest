# Sentinel and Warrior older-layout verification

Build `96.8-sentinel-warrior-audit`, package `1.9.14`. Published baseline `d3afcd8`; original saved-layout fixture `38fc8aa`.

## Sources and changes

The supplied Force and Destiny core book, FND tree compilation, glossary and [official F&D errata v1.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/fad_errata_v10.pdf) were checked. Core diagrams govern connections; the glossary governs activation, timing, ranked status and Force designation; official errata supersedes either. Source PDFs and private download links are excluded from the repository.

| Tree | Printed page | Physical PDF page | Compilation PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: | ---: |
| Artisan | 93 | 96 | 30 | 1 | 2 |
| Shadow | 94 | 97 | 34 | 1 | 6 |
| Shien Expert | 95 | 98 | 35 | 0 | 6 |
| Aggressor | 99 | 102 | 37 | 0 | 1 |
| Shii-Cho Knight | 100 | 103 | 40 | 0 | 4 |
| Starfighter Ace | 101 | 104 | 41 | 0 | 4 |

All 120 original IDs, talent names, positions and XP tiers remain. Two missing connections are restored and twenty-three unsupported connections removed. Artisan's Mental Tools now reaches Fine Tuning. Shadow's second-row Grit now reaches the third-row Sleight of Mind. Shii-Cho's Conditioned–Multiple Opponents connection is retained; its compilation adds two connections absent from the book, Second Wind–Conditioned and Parry–Defensive Training. The original core diagrams govern those differences.

Seven labels change: Shadow's Now You See Me (`sd32`) becomes Force active; Shien's three Reflect ranks (`sh03`, `sh13`, `sh33`) become Force active and Improved Reflect (`sh23`) becomes Force active; Shii-Cho's Improved Parry (`sc32`) becomes active; Starfighter Ace's Intuitive Strike (`sa30`) becomes Force passive. The glossary identifies Improved Parry and Improved Reflect as out-of-turn incidentals.

`talentRules104` contains 70 scoped rules, including 47 absent from the earlier two Force core rule sets. The union of shared and scoped talent names is 385. All 91 earlier catalog tree records and other existing catalog fields remain semantically unchanged. The six new reviews preserve their original IDs and stay outside the 48-tree replacement migration.

## Rule discrepancies and actual behavior

Counterstrike's glossary limits its upgrade to the next turn; the diagram says the encounter. The glossary governs. Touch of Fate retains the core diagram and glossary's Force designation even though the compilation omits the marker. Well Rounded is ranked in the F&D glossary; each rank saves two chosen career skills without free ranks. Intuitive Strike is passive and unranked, despite the compilation's rank icon, and costs two Force points per added Success or Advantage. Conditioned's falling reduction uses Conditioned ranks under official errata, as in the earlier reviewed trees.

Multiple Opponents now counts the individuals in an engaged minion group, rather than treating that group as one opponent. Its Boost applies only to Brawl, Melee and Lightsaber checks. Both normal and special combat pools share the count, including special ranged Lightsaber checks when multiple other enemies remain engaged. Duelist's Training uses the same count and retains its single-opponent, engaged-range requirement.

Ship Gunnery now converts two Force points per Intuitive Strike result. An odd unused point grants no result and incurs no opposite-alignment cost. Controlled-roll checks exercise preferred points, mixed points, dark-side alignment, declined payment and the normal once-per-round gunner action. Other vehicle-weapon checks remain manual.

The cards explain the limits of item and Force actions: Mental Tools supplies tools, not materials or a workshop; Intuitive Improvements grants at most two additional hard points, once per item; Imbue Item and Intuitive Evasion require commitments and continuing strain. Against All Odds is a once-per-session action only while incapacitated from exceeding the wound threshold. Now You See Me affects only the prior thirty minutes of interactions. Sarlacc Sweep starts with the hardest eligible opponent and spends Advantage for additional targets. These actions remain manual where disclosed.

Terrify's session-start Conflict is manual. The once-per-round limits of Master Artisan, Master of Shadows and Falling Avalanche require manual tracking. The existing outgoing Intimidating prompt reduces difficulty dice; proper challenge-die downgrades and incoming Coercion require manual resolution. Side Step retains its older round-boundary reset; its once-per-round limit and until-next-turn expiry require manual enforcement. Force Rating 1 is required to use Force talents, not to buy them. Older automatic handlers do not uniformly enforce use eligibility; multiple known lightsaber techniques retain the established priority and require manual resolution to select another form. Existing saved ratings and characteristics are never retrospectively recalculated.

## Continuation and validation

The unchanged fixture contains the original 48 pending layouts and 960 nodes. The 30 still-pending layouts match it exactly. Every original individual purchase validates unchanged, including removed routes and Force Rating zero. A combined 2,040-purchase save covers the earlier replacements, original AoR core reviews and all 48 layouts. Actual save/reload/Resume checks preserve XP, characteristics, rating, Dedication, skill choices and IDs.

All 120 real purchase buttons are exercised; each full tree costs 300 XP. Repeated purchases, insufficient XP, canceled choices, missing older Well Rounded choices, already-known unranked talents and restored/removed routes are covered. Controlled checks also verify repair ranks, street/decrypting/stealth modifiers, Shien Technique, Falling Avalanche, Second Wind and piloting/Astrogation modifiers with actor isolation.

Chromium viewports: 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Every layout is checked for horizontal overflow and source/button overlap. Physical iPhone Safari and installed-PWA offline behavior are not newly tested. Layout coverage does not establish complete talent automation.

All required verification runs completed without application errors. This batch completes 18 of the original 48 older layouts, leaving 30. The next group is Armorer, Colossus, Juyo Berserker and Steel Hand Adept; it has not started.

## Completed verification

| Suite | Passed checks |
| --- | ---: |
| sentinelWarrior | 102 |
| mysticSeeker | 92 |
| consularGuardian | 91 |
| olderAoRCore | 156 |
| eotEReplacements | 286 |
| forceReplacements | 371 |
| aorReplacements | 466 |
| campaign | 95 |
| browser | 47 |

The nine browser/source suites passed 1,706 checks. All ten general regression targets returned exit code zero, including 266 smoke checks and 112 diagnostics. `npm run build:check` reproduces the distribution and `git diff --check` passes. Machine-readable evidence is in [sentinel-warrior-audit-verification.json](sentinel-warrior-audit-verification.json).

Fresh Artisan and Shadow characters at 390×844, plus Shii-Cho Knight at 1280×800, passed visible creation, original-ID purchases, finalization, manual save and reload. Shadow also purchased Sleight of Mind through the restored Grit connection. No overflow or application errors occurred.

The checked distribution has Git blob `6b03894ea1dba6041e4d6553e82424d3d84ad6ed` (3,788,603 bytes). Hosted verification will compare the deployed HTML with this exact distribution and repeat these three flows.
