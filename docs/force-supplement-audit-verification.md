# Force supplement older-layout verification

Build `96.9-force-supplement-audit`, package `1.9.15`. Published baseline `6a7fc68`; original saved-layout fixture `38fc8aa`. Reviewed 2026-10-15.

## Sources and corrections

The supplied Keeping the Peace and Knights of Fate books were checked against their glossary entries and supplied FND tree compilation. Book diagrams govern connections; glossary entries govern activation, ranked status, Force requirements and timing. The [official F&D errata v1.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/fad_errata_v10.pdf) was checked for shared core rules; it predates Knights of Fate and is not treated as a later correction to that book. Source PDFs and private download links are excluded from the repository.

| Tree | Book | Printed page | Physical PDF page | Compilation page | Added connections | Removed connections |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Armorer | Keeping the Peace | 25 | 29 | 9 | 1 | 5 |
| Colossus | Knights of Fate | 25 | 27 | 38 | 0 | 0 |
| Juyo Berserker | Knights of Fate | 27 | 29 | 39 | 0 | 6 |
| Steel Hand Adept | Knights of Fate | 29 | 31 | 42 | 0 | 4 |

All 80 original IDs, names, positions and XP tiers remain. Armorer gains Inventor–Mental Tools (`ar22`–`ar23`). The fifteen removed edges are saved shortcuts absent from the books. Several starting talents intentionally have no downward path; those nodes remain valid purchases. Colossus already matches its diagram and needs no edge changes. Both Embrace Your Hate ranks (`ju23`, `ju41`) change from Force active to ordinary active. The talent remains ranked.

Armorer's book includes Tinkerer–Falling Avalanche and Imbue Item–Reinforce Item, which the compilation omits; those saved connections are retained. Headbutt and Unstoppable are unranked in the Knights of Fate glossary despite compilation rank markers. The compilation calls Acklay's Scything Strike an “Attack”; the original name and IDs remain. Hard Headed’s glossary starts at Daunting and reduces difficulty per additional rank; Improved Hard Headed starts at Formidable and likewise excludes the first rank from its reduction. The diagram's shorter “per rank” wording does not govern.

`talentRules105` contains 47 scoped rules, including 18 names without earlier source-rule records. The shared/scoped union is 403 names. Keeping the Peace glossary references are printed pp.30–31 / physical PDF pp.34–35; Knights of Fate references are printed pp.30–31 / physical PDF pp.32–33. Shared core talents retain their previously reviewed source references. All 97 earlier catalog records and all other existing catalog fields remain semantically unchanged. The four reviewed trees are excluded from replacement migration.

## Existing controls corrected

Inner Peace previously converted one point even when the prompt was canceled or zero was entered, and accepted fractional counts. It now changes nothing on cancellation, zero or invalid input, uses whole points and preserves its once-per-encounter marker and pending session reduction after reload.

Indomitable Will previously spent a maneuver before checking available dice or the user's commitment choice. It now checks dice and whole-point input first, and cancellation spends nothing. Its 3-strain activation is reserved before checking any extra-maneuver strain cost; if the maneuver fails, that reservation is refunded. Successful use retains encounter limits, committed-die accounting, continuing strain and release behavior.

Far Strike previously returned before spending an action if Force points could not reach the target, allowing repeated free rolls. It now resolves the narrative and Force checks within one action. Failed range extension and declined opposite-point payment still spend the action, while the ordinary symbol-spending workflow remains available. Short range requires no Force points, so a character with Force rating may use it even when all dice are committed. A zero-Force character cannot use the action.

Hard Headed previously allowed repeated failed checks in one turn. The new turn marker distinguishes an action blocked by staggered from one already spent. Hard Headed uses its exception once, then spends the action whether successful or not. Its button becomes disabled after a failed attempt. Saving before using the staggered exception retains eligibility; saving after a failure cannot restore a free attempt. An older turn already marked action-used without the new marker is treated as spent.

## What remains manual

Gearhead attachment-modification credit halving, Reinforce Item, Tinkerer item selection, Sapith Sundering, Improved Dodge movement, difficult-terrain movement and Improved Hard Headed strain-incapacitation recovery remain manual. Indomitable Will reduces ordinary enemy-weapon damage automatically; other damage sources need manual handling. Headbutt's non-vehicle/silhouette eligibility and exact next-round expiry need manual checking. Acklay's automatic Pierce applies to the unarmed profile; apply its benefit to other Brawl weapons manually. Precision Strike's guaranteed nonlethal-defeat rule is manual. Unarmed Parry's automatic prompt is available after an unarmed attack; other qualifying cases need manual resolution.

Additional hits can repeat Embrace Your Hate and Falling Avalanche damage; subtract any repeated bonus manually. Embrace Your Hate, Juyo Savagery and Power From Pain still contribute their automatic +1 Conflict at Morality resolution, rather than displaying it at session start. Treat those amounts as pending from session start and avoid adding them twice. Existing Force-use eligibility and multiple-form selection are not uniformly enforced by older handlers. Older defense handlers may exceed the official cap of 4; apply that cap manually. Master/round limits disclosed in prior audits remain unchanged. Layout coverage does not establish complete talent automation.

## Continuation and validation

The unchanged fixture contains 960 nodes across the original 48 older layouts. The 26 pending layouts still match it exactly. Every individual saved purchase validates unchanged, including removed routes, and a combined 2,040-purchase save preserves prior purchases, XP, characteristics, Force rating, Dedication and choices. All 80 real purchase buttons are exercised; each full tree costs 300 XP, and existing purchases are never repriced. Save schema remains 92.

Controlled-roll checks cover the corrected controls, Durable/Unstoppable, Improved Toughened, Iron Body, Acklay's Pierce and Martial Grace. Card checks verify actual manual limits and source metadata. Viewports are 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

All required verification runs completed without application errors. This batch completes 22 of the original 48 older layouts, leaving 26. All 22 older F&D layouts are reviewed. The next source group is Assassin, Scoundrel and Slicer from the EotE core book; it has not started.

## Completed verification

| Suite | Passed checks |
| --- | ---: |
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

The ten browser/source suites passed 1,810 checks. All ten general regression targets returned exit code zero, including 266 smoke checks and 112 diagnostics. `npm run build:check` reproduces the distribution and `git diff --check` passes. Machine-readable evidence is in [force-supplement-audit-verification.json](force-supplement-audit-verification.json).

Fresh Armorer and Juyo Berserker characters at 390×844, plus Steel Hand Adept at 1280×800, passed visible creation, original-ID purchases, finalization, manual save, reload and Resume. Armorer also purchased Mental Tools through the restored Inventor connection. No overflow or application errors occurred.

After the full regression run, five resolution notes were clarified: Gearhead’s cost reduction is manual, Armor Master’s defense-cap instruction uses player language, Indomitable Will describes its visible costs, and Embrace Your Hate/Falling Avalanche explain manual additional-hit damage cleanup. The full run also identified an older smoke fixture that still used the removed Comprehend Technology–Force Rating shortcut; its setup now uses Imbue Item’s verified connection. Only those five notes and the smoke fixture changed after the full regression. The complete 104-check supplement suite and the corrected world/smoke target were repeated against the final distribution, including all four trees, actual purchases, continuation, card wording and six viewports. The machine-readable record retains the original result and both distribution hashes.

The checked distribution has Git blob `08cea2a0b231fcfdfe83a6547bfc55517da6cf42` (3,824,948 bytes). Hosted verification will compare the deployed HTML with this exact distribution and repeat these three flows.

## Hosted proof

Published source commit `a5f35eecf3a6a63ac0f5124cb6d2f42c67b79c42`, tree `3bc741134e522358a07b8d46bb105c58016ea3fc`. [Pages deployment](https://github.com/felicianovalle-dev/swrpgtest/actions/runs/38795083879) completed successfully. [Working game](https://felicianovalle-dev.github.io/swrpgtest/?v=a5f35eecf3a6) returned HTTP 200 and exactly matched the tested distribution: Git blob `08cea2a0b231fcfdfe83a6547bfc55517da6cf42`, 3,824,948 bytes, SHA-256 `8dcf0662a3288ff7745220f065a1b2f36501d593380c7127f83b3106045c44ba`.

Fresh hosted Armorer and Juyo Berserker characters at 390×844 and Steel Hand Adept at 1280×800 passed visible creation, original-node purchases, finalization, manual save, reload and Resume latest. Armorer also used the restored Inventor–Mental Tools connection. All three retained their character, campaign, XP and purchases; no horizontal overflow or application errors occurred. These isolated contexts contained no user campaign saves.
