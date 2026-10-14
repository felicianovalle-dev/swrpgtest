# Consular and Guardian core audit verification

Build `96.6-force-core-audit`, package `1.9.12`. Baseline `38fc8aa`.

This batch reviews six of the 48 remaining older layouts: Healer, Niman Disciple, Sage, Peacekeeper, Protector and Soresu Defender. Forty-two remain pending. All 120 original IDs, names and XP tiers are retained; save schema and storage keys remain 92.

## Source review

The supplied Force and Destiny core diagrams, compilation and 57 glossary entries were checked visually and through OCR. Close connectors were inspected at full size and cross-checked against dark connector segments. The book diagrams govern connections; glossary activation and rules govern cards. The [official F&D errata v1.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/fad_errata_v10.pdf), linked from the publisher's resource page, corrects Heightened Awareness to unranked. Force-talent acquisition and use were also checked on core p.282 (physical PDF p.285). Source PDFs and private file URLs are not committed.

| Tree | Printed page | Physical PDF page | FND collection PDF page | Added edges | Removed edges |
| --- | ---: | ---: | ---: | ---: | ---: |
| Healer | 69 | 72 | 4 | 1 | 1 |
| Niman Disciple | 70 | 73 | 5 | 0 | 4 |
| Sage | 71 | 74 | 6 | 1 | 3 |
| Peacekeeper | 75 | 78 | 10 | 2 | 3 |
| Protector | 76 | 79 | 11 | 0 | 2 |
| Soresu Defender | 77 | 80 | 12 | 0 | 4 |

Four missing connections are restored and seventeen unsupported connections removed. Eleven type labels change: Knowledgeable Healing becomes passive; seven Reflect nodes gain their Force designation; Improved Parry becomes active; Improved Reflect becomes Force active; Supreme Parry gains its Force designation. Improved Parry and Improved Reflect follow the glossary's out-of-turn incidental activation despite passive coloring in the supplied core diagram. Force Assault remains passive and requires an already-purchased Move power; acquiring the talent does not grant that power. Strategic Form uses the glossary's Success-based target count and following-round expiry.

## Compatibility and action corrections

The frozen fixture records all 960 nodes across the original 48 pending layouts. The untouched 42 layouts are compared directly against this fixture. Every captured individual purchase validates and remains unchanged, including saved purchases across removed connections and characters with Force Rating zero. A combined 2,040-purchase save includes the earlier 960 replacements, first six older reviews and all 48 layouts in this fixture. Purchases, XP, credits, Force Rating, characteristic increases, story progress and skill choices persist without reapplying upgrades.

Heightened Awareness blocks new duplicate purchases across Scout and Protector, without charging XP; its known unranked node still provides valid connections. Previously saved duplicates remain saved. This update does not delete or reprice them.

Force talents can be purchased before Force sensitivity, but their benefits require Force Rating 1. Cards state that use requirement. Force Rating talents cannot create initial sensitivity; saved inactive ranks activate once when a granting universal or Witchcraft supplies the initial rating. Second Wind now consumes its use for the entire encounter. The existing `secondWindRound` save field acts as the used marker, so a saved use is still spent after advancing rounds or reloading. A new combat object resets it. Stimpack Specialization adds healing only to the first five daily uses; the sixth and later stimpacks heal nothing. Combat save/reload retains the used counter and consumable spending.

Source metadata and summaries use `CharacterCatalog97.rulesFor`, keeping AoR, F&D and EotE variants separate. There are 57 scoped rules in this batch and 350 distinct names across the shared and scoped rule sets. Earlier 79 imported/reviewed records and other catalog fields are unchanged, apart from the official Awareness variant correction.

## Resolution limits

This is a source audit and focused correction batch. It does not add broad Force or allied-action automation. Cards disclose manual commitment, healing-trance timing, ally protection, special Lightsaber actions, counterattacks, redirected hits, temporary defense and Force-power conversions.

Existing Medicine treatment and Knowledgeable Healing, Lightsaber characteristic selection, Leadership Force conversion and ordinary recovery workflows remain available. Sense Emotions' immunity condition, switching between several known techniques, successful-check rerolls, Supreme Parry's strain discount and Reflect's weapon/hit eligibility require the disclosed manual handling. Balance's current combat prompt uses alignment-specific pips; opposite-alignment points and committed-die restrictions remain manual. Other Force-use prerequisites still require manual adherence when buying these talents on a non-Force character. Correct source labels do not certify every existing handler against every rule.

## Verification

All listed verification runs completed without application errors. The source suite exercises all 120 real purchase buttons, actual save/reload, all 960 individual purchase snapshots, combined continuation, corrected paths, cancelled and unaffordable purchases, unranked duplicates, Force-use labels and deferred Force Rating benefits, actual Medicine/Destiny handlers, Second Wind and stimpack limits, card text and phone geometry.

Phone viewports are 320×568, 375×667, 390×844, 428×926 and 844×390; desktop is 1280×800. Checks cover horizontal overflow and source-text/button overlap. Physical iPhone Safari and installed-PWA offline behavior are not newly tested.

| Suite | Passed checks |
| --- | ---: |
| forceCore | 91 |
| olderAoRCore | 156 |
| eotEReplacements | 286 |
| forceReplacements | 371 |
| aorReplacements | 466 |
| campaign | 95 |
| browser | 47 |

All ten general regression targets returned exit code zero, including 266 smoke checks and 112 diagnostics. `npm run build:check` reproduces the distribution and `git diff --check` passes. Machine-readable details are in [force-core-audit-verification.json](force-core-audit-verification.json).

Fresh Healer and Niman Disciple characters at 390×844, plus Soresu Defender at 1280×800, passed visible creation, original-ID purchases, finalization, manual save and reload. Healer also purchased Grit through the restored Physician connection. No overflow or application errors occurred.

The checked distribution has Git blob `70150b4faab7a0dc97f60df361e9092a215ad0b1` (3,685,966 bytes). Hosted verification will compare the published HTML with this exact distribution and repeat these three flows.
