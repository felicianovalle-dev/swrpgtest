# Lead by Example older-layout verification

Build `96.17-lead-example-audit`, package `1.9.23`. Baseline `4b05f750a6fd`; original-layout fixture `38fc8aa`. Source review: 2026-10-17.

## Source findings

The supplied 98-page scan was checked visually, including enlarged connector crops and the two-page talent glossary. Printed pages are one below physical PDF pages. The official [AoR errata v1.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/aor_errata_v10.pdf), updated 2017-11-20, corrects Lannik species entries on p.25; those species changes are outside this tree batch. It contains no correction to these three talent diagrams. Coordinated Assault retains its previously reviewed additional-rank range correction. Source PDFs and private download URLs are excluded.

| Layout | Printed page | Physical PDF page | Restored routes | Removed routes |
| --- | ---: | ---: | ---: | ---: |
| Figurehead | 29 | 30 | 0 | 2 |
| Instructor | 31 | 32 | 0 | 3 |
| Strategist | 33 | 34 | 0 | 2 |

Figurehead loses Inspiring Rhetoric-to-Grit (15 XP) and Improved Confidence-to-Dedication. Instructor loses Master Instructor-to-Body Guard (15 XP), Stimpack Specialization (20 XP)-to-That’s How It’s Done, and Improved Field Commander-to-Natural Instructor. Strategist loses Well Read-to-Master Strategist and Improved Researcher-to-Knowledge Specialization (20 XP). All other source connections remain, including Figurehead’s Confidence-to-Natural Leader vertical route and all three bottom horizontal connections. Existing purchases through removed routes remain owned with original XP; corrected links govern new purchases. All 60 IDs, names, positions, costs and activation labels remain. Improved Confidence and Improved Ready for Anything retain their glossary’s Passive activation.

Seventeen glossary entries on printed pp.34–35 / physical pp.35–36 and twenty shared entries supply 37 scoped rules. Shared entries retain earlier source attribution. Every entry states activation, ranks, Force eligibility, source and resolution boundaries. The literal source-name union reaches 469. All 121 earlier tree records and all earlier catalog fields remain unchanged; removing this batch’s additions reproduces the baseline catalog serialization exactly.

## Well Read choice correction

Buying Well Read asks for three different valid Knowledge skills before charging XP. Talent purchases now reject insufficient XP before displaying choice prompts; the final charge check remains in place. Canceling any prompt, entering an invalid skill or repeating a selection leaves purchases, XP and choices unchanged. Choices are stored per specialization and original talent ID in the existing talent-choice state and validated on save import. Owned choices grant permanent career-skill eligibility without free ranks. Repeated purchase attempts do not charge or choose again.

Existing owners with missing choices see a Choose skills button and complete the selection without paying again or changing earlier spending. Their old save is accepted without inventing choices. Unowned choices do not grant career skills, and malformed or forged saved selections are rejected. No migration reprices skills already bought before this fix. Schema and storage keys remain 92.

## Manual boundaries

Mass-combat substitutions, Master Strategist’s once-per-phase difficulty decrease, and Improved Ready for Anything’s initiative Triumph conversion remain manual. Improved Commanding Presence targets minions, minion groups or rivals, uses opposed Cool/Discipline and ends if the target is attacked; resolve its session limit and narrative effects manually. Improved Confidence’s allies must make the same fear check.

Encouraging Words, Master Instructor, Body Guard and its improvement, Field Commander and its improvement, Inspiring Rhetoric and its improvement retain manual ally targeting, checks, actions/maneuvers, costs and timing. That’s How It’s Done adds automatic Advantage, with range increasing only for ranks beyond the first, and expires at the start of the next turn. Improved Researcher expires at the end of the next turn. Positive Spin does not automatically alter Duty awards. Thorough Assessment assigns at most one Boost per useful other-character check before encounter end. These manual boundaries are disclosed on the cards. Natural Instructor supports failed party-check rerolls; successful-check rerolls remain manual. Falling reductions, allied Command bonuses and other earlier documented limits remain.

## Verification scope

Progress reaches 45 of the original 48 older layouts, with three pending. Including the earlier six AoR core audits, 51 original-ID layouts / 1,020 nodes are reviewed. Coverage remains 20 careers, 118 placements, 112 distinct career trees, 17 universal trees and 44 species, with no simplified or prototype career layouts.

Tests cover all 960 original individual purchases, combined 2,040-purchase continuation, all 60 real purchase buttons, seven blocked shortcuts, unchanged activation labels, whole-tree XP, Well Read’s purchase/cancel/import/older-owner behavior, Knowledge Specialization, reroll session limits and supported modifiers. Viewports: 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Three visible creation/save/resume flows include a Strategist’s Well Read choices. All 22 earlier flows remain regression targets. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

Verification results are pending the final-build run. Next: Beast Rider, Hotshot and Rigger from Stay on Target.
