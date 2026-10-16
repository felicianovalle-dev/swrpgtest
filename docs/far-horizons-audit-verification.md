# Far Horizons older-layout verification

Build `96.16-far-horizons-audit`, package `1.9.22`. Baseline `7ddbf51f0276`; frozen original-layout fixture `38fc8aa`. Source review: 2026-10-16.

## Source findings

The supplied 98-page Far Horizons scan was rendered and checked directly, with enlarged connector crops. The official [EotE errata v2.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/eote_errata_v20.pdf), updated 2017-11-20, corrects both Point Blank nodes on p.29 to short range or engaged. Its signature-ability correction on p.37 is outside this layout batch. The [publisher announcement](https://www.fantasyflightgames.com/en/news/2014/12/16/tame-the-wildest-reaches-of-the-galaxy/) identifies these three specializations. Source PDFs and private download URLs are excluded.

| Layout | Printed page | Physical PDF page | Restored routes | Removed routes |
| --- | ---: | ---: | ---: | ---: |
| Entrepreneur | 27 | 28 | 2 | 0 |
| Marshal | 29 | 30 | 1 | 0 |
| Performer | 31 | 32 | 2 | 0 |

Entrepreneur gains Wheel and Deal (10 XP, right) to Sound Investments (15 XP, right), and Toughened (20 XP) to Intense Focus (25 XP). Marshal gains Good Cop (15 XP) to Bad Cop (20 XP). Performer gains Congenial (10 XP) to Dodge (10 XP) and Intense Presence (15 XP). All existing source connectors remain, including the faint Entrepreneur bottom Dedication-to-Sound Investments route. All 60 IDs, names, positions and XP tiers remain. Both Performer Smooth Talker nodes become Active (Incidental), following the shared glossary. Improved Distracting Behavior remains Passive despite its red tree box.

The glossary on printed pp.32–33 / physical pp.33–34 supplies 16 scoped entries. Twenty-three shared entries retain earlier source attribution; 39 entries explicitly identify activation, ranks, Force eligibility, source and resolution boundaries. The literal source-name union reaches 459. All 118 earlier tree records and earlier catalog fields are unchanged; removing only this batch’s additions reproduces the baseline serialization exactly.

## Focused control correction

Point Blank applies ranked damage to one hit of a successful Ranged (Light) or Ranged (Heavy) attack at short or engaged range. The range handling already matched the official correction. Its bonus now joins the existing serialized single-hit subtraction so additional Auto-fire or Linked hits do not repeat it, including after save/reload. Existing pending extra-hit records created without this subtraction are not rewritten retroactively; adjust such already-pending hits manually. Other attack workflows retain manual handling.

## Manual boundaries

Distracting Behavior spends a maneuver and strain up to Cunning to affect that many chosen NPCs. It adds automatic Threat until the beginning of the next turn, with engaged baseline range extended one band per rank. Its improvement adds two Threat against allies, not against the performer. Resolve these costs, targets, range, symbols and expiry manually. Coordination Dodge adds automatic Failures, not Setback or difficulty dice; Unrelenting Skeptic and its improvement also retain manual incoming-check resolution.

Good Cop and Bad Cop spend two Advantage for one ally’s subsequent social check against the same target in the encounter, with only one use benefiting a check. Biggest Fan and Deceptive Taunt retain their checks, GM-approved target/effects and session limits. Bought Info, Greased Palms, Master Merchant and Wheel and Deal retain manual payments and transactions. Throwing Credits is an optional session-start payment after Obligation is triggered; story complications remain, and Start Session does not automatically remove the penalty. Sound Investments pays ranked income once per started session; GM restrictions remain manual. Successful-check Natural Merchant/Athlete rerolls, incoming Congenial, Intense Focus’s maneuver, and earlier documented controls retain manual steps disclosed on cards.

## Verification scope

Progress reaches 42 of the original 48 older layouts, with six pending. Including the six earlier AoR core audits, 48 original-ID layouts / 960 nodes are reviewed. Coverage remains 20 careers, 118 placements, 112 distinct career trees, 17 universal trees and 44 species, with no simplified or prototype career layouts. Schema and storage keys stay 92.

Tests cover 960 original individual purchases, combined 2,040-purchase continuation, all 60 real purchase buttons, five restored routes, activation labels, whole-tree XP costs, ranked income, supported social modifiers, reroll session limits and Point Blank additional-hit continuation. Viewports: 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Three visible creation/save/resume flows follow source-checked routes; 19 earlier flows remain regression targets. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

Verification results are pending the final-build run. Next: Figurehead, Instructor and Strategist from Lead by Example.
