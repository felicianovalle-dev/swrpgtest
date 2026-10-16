# Dangerous Covenants older-layout verification

Build `96.14-dangerous-covenants-audit`, package `1.9.20`. Baseline `62b28ea67023`; original-layout fixture `38fc8aa`. Source review: 2026-10-15.

## Source findings

A readable scan of Dangerous Covenants was checked directly, including enlarged diagram crops and the full new-talent glossary. The supplied copy has damaged binary/image streams; it was not treated as readable source evidence. The reference scan contains 98 physical pages; printed pages are one lower. The [official EotE errata v2.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/eote_errata_v20.pdf), updated 2017-11-20, corrects this book’s signature ability on p.37 and equipment on pp.54 and 63, without changing these three talent trees. The [publisher’s specialization announcement](https://www.fantasyflightgames.com/en/news/2014/3/28/expanded-hired-gun-specialization-decks/) identifies the three additions. Source PDFs and private download URLs are excluded from this repository.

| Tree | Printed page | Physical PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: |
| Demolitionist | 29 | 30 | 2 | 5 |
| Enforcer | 27 | 28 | 6 | 6 |
| Heavy | 31 | 32 | 5 | 5 |

All 60 original IDs, names, positions and XP costs remain. Twenty-nine connections change. Demolitionist’s starting Selective Detonation, Enforcer’s starting Fearsome and Heavy’s starting Grit are independent purchases with no links. Demolitionist’s 25-XP Improved Improvised Detonation does not connect directly to Dedication. Both Heavy career placements share the reviewed layout and original IDs. Existing purchases through old shortcuts remain owned without repricing; corrected connections govern new purchases.

The glossary governs activation when the tree abbreviates or conflicts with it. Improved Time to Go becomes Active (the old saved layout labeled it Passive); Improved Improvised Detonation remains Passive despite its red tree box. Heroic Resilience spends one Destiny Point for the triggering hit, before damage calculation; it is neither an encounter-long soak increase nor limited to once per encounter. Selective Detonation can spend one Advantage or one Triumph per excluded target, up to ranks. Master Grenadier also discounts Blast after a miss. Heavy Hitter increases an existing Breach rating as well as granting Breach 1. Burly applies to carried or wielded weapons, not arbitrary equipment.

`talentRules110` scopes 35 entries: 16 use the new glossary on printed pp.32–33 / physical pp.33–34, and 19 retain previously reviewed shared attribution. The literal shared/scoped source-name union is 449. All 113 earlier tree records are unchanged. Three earlier resolution notes describe the now-fixed Intimidating, Side Step and Defensive Stance controls; restoring those notes and excluding this batch’s additions reproduces the earlier catalog serialization exactly.

## Focused control fixes

Intimidating no longer charges from pool construction or recommendation previews. The selected-PC party-check workflow offers whole strain once, bounded by ranks and capacity, and downgrades Challenge dice rather than deleting ordinary difficulty dice. Cancel and invalid input spend nothing; Winded blocks voluntary spending. Incoming Coercion remains manual.

Side Step and Defensive Stance validate whole activation strain before spending a maneuver. They reserve that strain while the shared maneuver routine checks any extra-maneuver cost, then refund the reservation if the maneuver is rejected. Canceled, invalid and blocked attempts preserve resources. Their previously documented timing/manual limits remain.

The PC Master Grenadier cost is reflected in both the Blast button and actual spending: 1 Advantage on a hit or 2 on a miss. Other actors retain normal costs. Powerful Blast adds ranks to an existing Blast rating and cannot grant Blast to an ordinary weapon. Barrage now uses its eligible skills and long/extreme range for one hit only; the existing serialized additional-hit subtraction prevents repeating the bonus after saving and resuming.

## Manual limits

Burly’s equipment adjustments, Fearsome, Heroic Fortitude, Heroic Resilience, Heavy Hitter, Rain of Death, Improvised Detonation and its improvement, Selective Detonation exclusions, Time to Go and its improvement, Talk the Talk, Loom, Walk the Walk and Stunning Blow retain manual steps disclosed on cards. Blast positioning, explosive eligibility and net-Success damage remain manual. Natural Enforcer prompts cover failed eligible party checks; rerolling a successful check remains manual. Brace’s environmental eligibility and remaining setbacks require manual handling.

Side Step and Defensive Stance still require manual tracking of once-per-round use and until-next-turn expiry; existing automatic effects clear at the round boundary. Defensive Stance’s incoming melee upgrades remain manual. Existing pending additional-hit records without a recorded Barrage subtraction are not rewritten retroactively; adjust such an already-pending hit manually. Earlier documented controls’ limitations remain. Schema and storage keys stay 92.

## Verification

The frozen fixture holds 960 nodes across 48 older layouts. This batch brings review progress to 37 of 48, with 11 pending. Including six earlier AoR core audits, 43 original-ID layouts / 860 nodes are reviewed. Coverage remains 20 careers, 118 placements, 112 distinct career trees, 17 universal trees and 44 species, with no simplified or prototype career layouts.

Checks cover old purchases, combined 2,040-purchase continuation, all 60 real purchase buttons, all 29 changed routes, activation, source cards, skill packages, costs, dice pools, combat continuation and six viewports: 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Four visible creation/save/resume flows cover Demolitionist, Enforcer and Heavy under both careers along restored source routes. Thirteen earlier creation flows remain regression targets. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

Verification results are pending the final-build run. The next group is Archaeologist and Big-Game Hunter from Enter the Unknown; it has not started.
