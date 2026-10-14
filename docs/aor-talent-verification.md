# Age of Rebellion talent verification

Build `96.4-aor-talents`, package `1.9.10`, reviewed 2026-10-14.

The remaining twenty simplified Age of Rebellion trees now expose their full source layouts: 400 nodes across Diplomat (6), Engineer (5), Soldier (5), and Spy (4). Career coverage is 112 full layouts, zero simplified and zero prototypes. The older 54 full layouts were not all freshly audited in this update.

## Source review

All twenty diagrams were visually compared with the supplied AOR collection and the actual pages in Age of Rebellion Core, Desperate Allies, Forged in Battle, Fully Operational, and Cyphers and Masks. All twenty specialization skill packages also match their source headers. The [coverage audit](character-options-audit.md) records the page mapping. PDFs and private source links are excluded from the repository.

The import uses 193 distinct talent entries, with source activation and ranked labels, plus 82 new short summaries. A scoped rule set preserves source differences instead of overwriting existing EotE/F&D labels. Book glossary entries settle activation and rule conflicts in the compilation. Dockyard Expertise follows the glossary’s 20% reduction, rather than its diagram’s 25%. Ambassador’s second-row Indistinguishable uses the 10 XP tier rule on Core p.103 and the supplied collection; the Core p.79 diagram prints 5 and official errata v1.0 does not address this cell. These discrepancies are documented in the audit.

## Purchases and continuation

`scripts/fixtures/aor-talents100.json` captures all 400 prior nodes from `84300bf`. Runtime `legacyTrees99` preserves those definitions alongside the preceding sixteen-tree capture. Matching talents map to unused source nodes with the same name, preferring the closest original cost. Straight and curly apostrophes match. Unmatched purchased abilities remain as earlier game options and retain their effects; they cannot unlock source-tree connections.

Migration preserves XP, original spending, credits, characteristics, Force Rating, skills and story state. Dedication and Well Rounded choices move with purchased nodes. Loading twice is stable and does not grant upgrades twice. Existing source-tree IDs and skill selections are retained. The compatibility panel explains retained purchases and the original XP amounts. Save schema and storage keys remain 92.

## Gameplay changes

Courier’s Pilot Training grants both piloting career skills; Well Traveled grants both listed Knowledge career skills. Neither grants free ranks. Well Rounded saves two distinct career-skill choices, and all Knowledge Specialization ranks share the chosen Knowledge skill. Its existing Triumph conversion remains available during party checks.

Three source-related fixes accompany the layouts:

- Eye for Detail retains at least one Success when converting results, including oversized conversion input.
- Prey on the Weak contributes to one hit; the single-hit bonus survives battle reload and is excluded from Linked/Auto-Fire extra hits.
- Sound Investments pays once at session start for Duty, Obligation and Morality. Repeated starts during an active session, session end and browser reload do not pay again.

Complex special actions display manual resolution with source timing and ranked labels. Separate Deadly Accuracy skill selections for multiple ranks remain manual; the engine uses the currently selected combat skill. Full layout completion does not mean every special talent action has an automated workflow.

## Verification

`npm run test:talents:aor` covers all 400 old nodes individually; all 960 purchases from the three replacement batches together; 400 real purchase buttons; locked/repeated purchases; Dedication; skill choices and career eligibility; save/reload; actual check/combat/session handlers; malformed imports; and all twenty trees at six viewport sizes.

The machine-readable checks are in [aor-talent-verification.json](aor-talent-verification.json). The AoR suite passed **466 checks**, the prior core-talent suite **286**, the Force suite **371**, the campaign suite **95**, and the browser/navigation suite **47**, all with no page errors. All ten gameplay regression targets passed, including 266 smoke checks and 112 diagnostics. Build reproduction and whitespace checks passed.

Viewport checks use Chromium at 320×568, 375×667, 390×844, 428×926, 844×390 and 1280×800. Source descriptions and paths stay above purchase buttons. These checks do not constitute a physical iPhone Safari or installed-PWA offline test. Controlled rolls verify state changes; character difficulty balance was not newly evaluated. No additional content phase was started.
