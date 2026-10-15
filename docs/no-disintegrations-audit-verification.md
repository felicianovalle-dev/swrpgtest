# No Disintegrations older-layout verification

Build `96.11-no-disintegrations-audit`, package `1.9.17`. Baseline `ecbaa9092f05`; original-layout fixture `38fc8aa`. Source review: 2026-10-15.

## Source findings

The supplied No Disintegrations book diagrams and new-talent glossary were visually reviewed at full-page and enlarged resolution. Printed pages are one lower than physical PDF pages. The [official EotE errata v2.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/eote_errata_v20.pdf), updated 2017-11-20, corrects Martial Grace on p.29 to cost 2 strain, once per round, adding Coordination ranks to one hit of a successful Brawl check. The supplied glossary already uses that corrected wording. Source PDFs and private download URLs are excluded from this repository.

| Tree | Printed page | Physical PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: |
| Martial Artist | 29 | 30 | 3 | 4 |
| Operator | 31 | 32 | 5 | 1 |
| Skip Tracer | 33 | 34 | 7 | 0 |

All 60 original node IDs, names, positions, costs and activation labels remain. New purchases follow 15 restored connections and five removed unsupported routes. Martial Artist's starting Parry and Grit and Operator's starting Galaxy Mapper have no linked purchases in the book; each is still independently purchasable for 5 XP. Existing purchases through removed routes retain their benefits and original XP amounts.

`talentRules107` scopes 39 rules to these three layouts. Twenty-four entries use the supplied new-talent glossary, printed pp.34–36 / physical pp.35–37. Fifteen shared core entries retain their previously reviewed EotE, AoR or F&D source/page attribution. All 104 earlier catalog records and earlier fields serialize identically after excluding this batch's additions. These original-ID trees remain excluded from replacement migration. About now derives the reviewed count from catalog data instead of reporting a stale fixed total.

Cards clarify Bought Info's purchased one-Success Knowledge result and information availability; Good Cop's 2 Advantage and one-use-per-benefiting-check restriction; Improved Street Smarts' Formidable starting difficulty; Reconstruct the Scene's 24-hour window and one person per Success; Coordination Dodge's added Failures without a session limit; and Supreme Precision Strike's unarmed-only restriction. Hindering Shot needs actual hull damage, and Offensive Driving uses own-craft system strain with a close-range target and a defense-based limit.

## Critical selection correction

The existing Basic/Improved Precision Strike result menu treated Cancel as its first entry and consumed strain; the improvement also recorded round use before a result was selected. Costs and the round marker now commit only after a valid choice. Cancel, empty, non-finite, negative, zero or out-of-range input spends neither. Valid positive fractions round down. Canceling this optional talent selection leaves the underlying Critical Injury available to resolve normally; it does not cancel the attack or refund its symbol cost.

## Manual limits

Coordination Dodge, Mind Over Matter, Supreme Precision Strike, Grapple, Overbalance, vehicle combat talents, chase talents, planetary mapping, Bought Info, Good Cop, Informant, Reconstruct the Scene, Improved Street Smarts, Nobody's Fool and Soft Spot have manual steps described on their cards. Supreme Precision Strike has no Hard-result selector; the existing selector supports Easy and Average results. No new automation for these manual abilities is claimed.

Martial Grace is offered for successful unarmed/Far Strike attacks; other Brawl weapons require manual handling. Unarmed Parry readiness is supported after an unarmed attack; other unarmed readiness remains manual. Natural Brawler reroll prompts cover failed checks; successful-check rerolls remain manual. The recovery control automatically uses available Advantage for Hard-Boiled up to ranks and applies Rapid Recovery; end-of-encounter timing and repeat recovery attempts are not enforced. Earlier documented limits remain.

## Verification

The original fixture contains 960 nodes across 48 layouts. This batch brings review progress to 28 of 48, leaving 20 pending. The catalog also includes six earlier AoR core audits: 34 reviewed original-ID records / 680 nodes. Coverage remains 20 careers, 118 placements, 112 distinct career trees, 17 universal trees and 44 species; no simplified or prototype career layouts remain.

Checks cover 960 individual old purchases, combined 2,040-purchase continuation, 60 real purchase buttons, 20 changed routes, scoped cards, affected mechanics and save/reload/Resume. Six viewports cover 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Three visible creation/save/resume flows use restored connections in Martial Artist, Operator and Skip Tracer. Existing EotE creation flows remain regression targets. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

The final-build verification completed successfully. The next group is Charmer, Gambler and Gunslinger from Fly Casual; it has not started.

## Completed verification

| Suite | Passed checks |
| --- | ---: |
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

All twelve browser/source suites passed 2,028 checks without application errors. All ten general regression targets returned zero, including 266 smoke checks and 112 diagnostics. Three new and four earlier visible local creation/save/resume flows passed. `npm run build:check` reproduces the checked distribution and `git diff --check` passes.

Every target in this final run used the same distribution: Git blob `3f5d4335d05f42a98cf603b2f352b587bb9009be`, 3,879,419 bytes, SHA-256 `edf8148aefa1b4d1e2f9deed9b6cf6bdc4250874547a1ed8b904a773ba2c06da`. No runtime changes followed this run. Machine-readable evidence is in [no-disintegrations-audit-verification.json](no-disintegrations-audit-verification.json). Hosted verification will compare these exact bytes and repeat the three new creation/save/resume flows.
