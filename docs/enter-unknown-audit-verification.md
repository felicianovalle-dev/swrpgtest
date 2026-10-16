# Enter the Unknown older-layout verification

Build `96.15-enter-unknown-audit`, package `1.9.21`. Baseline `361b2df482d7`; frozen original-layout fixture `38fc8aa`. Source review: 2026-10-16.

## Source findings

The supplied Enter the Unknown PDF was rendered and checked directly. It is a readable 98-page scan with printed pages one lower than physical PDF pages. Enlarged connector crops resolve narrow gaps that disappear at full-page scale. The official [EotE errata v2.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/eote_errata_v20.pdf), last updated 2017-11-20, contains no Enter the Unknown entry. Official publisher searches found no additional book-specific talent correction; this does not claim that every later ruling is exhausted. The [publisher announcement](https://www.fantasyflightgames.com/en/news/2013/7/11/enter-the-unknown/) identifies the Explorer additions. Source PDFs and private download URLs are excluded from the repository.

| Layout | Printed page | Physical PDF page | Restored routes | Removed routes |
| --- | ---: | ---: | ---: | ---: |
| Archaeologist | 25 | 26 | 0 | 1 |
| Big-Game Hunter | 27 | 28 | 1 | 0 |

Archaeologist loses the Toughened-to-Resolve shortcut. Big-Game Hunter gains Expert Tracker-to-Quick Strike. Both faint Toughened-to-Outdoorsman and Outdoorsman-to-Confidence connectors remain, as confirmed by the enlarged scan. All 40 IDs, names, positions and XP tiers remain. Existing purchases through removed routes remain owned without repricing; corrected links govern new purchases. Archaeologist’s starting Well Rounded and Big-Game Hunter’s starting Grit remain independent, unlinked purchases.

Both Archaeologist Knowledge Specialization nodes become Active (Incidental), following the shared glossary despite the black tree boxes. Knockdown becomes Passive and spends Triumph, with another Triumph for each silhouette the target exceeds the acting character. Its talent effect is separate from the weapon quality that spends Advantage. The supplied Age of Rebellion glossary p.150 / physical p.151 was also visually checked. Improved Hunter’s Quarry retains the book glossary’s Passive activation despite its red tree box.

The p.30 glossary / physical p.31 contributes five scoped entries: Bring It Down, Hunter’s Quarry, Improved Hunter’s Quarry, Museum Worthy and Pin. Twenty-three previously reviewed shared rules retain their earlier source attribution. All 28 scoped entries explicitly identify activation, ranks, Force eligibility, source and resolution boundaries. The literal source-name union reaches 452. All 116 earlier tree records and all earlier catalog fields are unchanged; removing only this batch’s additions reproduces the baseline catalog serialization exactly.

## Focused control correction

Bring It Down spends one Destiny Point once per successful PC attack and adds the target’s Brawn to a single hit. The actual paid bonus now joins the existing serialized single-hit subtraction, so additional Auto-fire or Linked hits do not repeat it or spend another Destiny Point after saving and resuming. A valid Brawn of zero is preserved rather than replaced by the fallback of two. Declining, missing, lacking the talent or lacking light Destiny adds no bonus and spends no point.

Existing pending extra-hit records created before this correction are not rewritten retroactively. If such a record lacks the paid Bring It Down subtraction, adjust its already-pending additional hit manually. Other single-hit talent implementations retain their earlier documented limits; this is not a broader damage-system rewrite.

## Manual boundaries

Hunter’s Quarry remains a manual Hard Survival action against an opponent within long range. Success upgrades all attacks against that opponent once until the end of the character’s next turn; it is not restricted to the hunter’s own attacks. Its improvement permits two strain to replace the action with a maneuver. Track costs, range, the opposed target’s identity, upgrades and expiry manually.

Museum Worthy remains a once-per-session Hard Knowledge (Education) action about one GM-approved relic, ruin or piece of history. Information depends on Successes; it does not automatically grant credits or items. Pin remains opposed Athletics against an engaged opponent, immobilizing it until the end of the character’s next turn, with Triumph extending the duration one round. Knockdown and Stunning Blow remain manual talent effects. Heightened Awareness’s allied bonuses, Swift’s terrain movement, research/foraging/tracking/travel time and successful-check Natural Hunter rerolls retain manual steps disclosed on cards. Shared controls, including Hard Headed, retain previously documented limits.

## Verification scope

Progress reaches 39 of the original 48 older layouts, with nine pending. Including six earlier AoR core audits, 45 original-ID layouts / 900 nodes are reviewed. Coverage remains 20 careers, 118 placements, 112 distinct career trees, 17 universal trees and 44 species, with no simplified or prototype career layouts. Schema and storage keys stay 92.

Tests cover the 960 original individual purchases, combined 2,040-purchase continuation, all 40 real purchase buttons, both changed routes, three activation corrections, whole-tree XP costs, skill choices, Triumph conversion, eligible source modifiers, Bring It Down costs and saved additional-hit continuation. Phone and desktop viewports are 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Two visible creation/save/resume flows follow both corrected layouts; 17 earlier flows remain regression targets. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

The final-build verification completed successfully. The next group is Entrepreneur, Marshal and Performer from Far Horizons; it has not started.

## Completed verification

| Suite | Passed checks |
| --- | ---: |
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

All sixteen browser/source suites passed 2,528 checks without application errors. All ten general regression targets returned zero, including 266 smoke checks and 112 diagnostics. Two new and seventeen earlier visible local creation/save/resume flows passed. `npm run build:check` reproduces the checked distribution and `git diff --check` passes.

Every target used the same distribution: Git blob `5e9b631e39d4c50cd7ceae004e8018ee8d0caa98`, 3,978,992 bytes, SHA-256 `b0b87674998e78b0d638f70c9df29ad23ac19a018355219cdfca3509a8768961`. No runtime changes followed this run. Machine-readable evidence is in [enter-unknown-audit-verification.json](enter-unknown-audit-verification.json).

## Hosted proof

Published source commit `ef9c55733cff90f04583123708c394a3bd0afe11`, tree `6add7e0b9882dad3352a4d38ef12945c6e662245`. [Pages deployment](https://github.com/felicianovalle-dev/swrpgtest/actions/runs/38971787414) completed successfully. [Working game](https://felicianovalle-dev.github.io/swrpgtest/?v=ef9c55733cff) returned HTTP 200 and matched the tested distribution exactly: Git blob `5e9b631e39d4c50cd7ceae004e8018ee8d0caa98`, 3,978,992 bytes, SHA-256 `b0b87674998e78b0d638f70c9df29ad23ac19a018355219cdfca3509a8768961`.

Fresh hosted Archaeologist at 390×844 and Big-Game Hunter at 1280×800 passed visible creation, original-ID purchases along source-checked routes, finalization, manual save, reload and Resume. Both preserved character, campaign, XP and purchases, with no horizontal overflow or application errors. These isolated contexts contained no user saves.
