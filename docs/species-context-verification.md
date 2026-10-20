# Species context verification — 1.9.34

Build `96.28-species-context`; save schema remains 92. Published to GitHub main and GitHub Pages. The deployment succeeded, and both the hosted HTML and service worker match the tested local files.

Devaronian PCs add three Boost on Resilience checks explicitly marked poison/toxin, including alcohol. The aliases do not duplicate the grant. Wookiee PCs add one Boost on Athletics checks explicitly marked as climbing a claw-pierceable surface. Other checks, skills and actors do not receive these species bonuses. Existing dice/talents stack normally and unrelated Setback remain.

Skills offers a qualifying-circumstance checkbox, preview, difficulty, other Boost/Setback controls and a PC-only roll through the existing Destiny/talent/check pipeline. Ordinary party checks retain best-actor selection. The panel is disabled before finalization and during combat and grants no XP/credits. Numeric/context editing retains keyboard focus. Active context clears after rolling, leaving Skills or loading; the already-rolled pool/result/context in `S.last` survives saving without recomputation or duplicate benefits.

Existing characteristics, XP budgets, starting ranks, talent IDs, purchases and paid-cost data are preserved. Catalog comparison permits only two notes and their effect-source evidence. Stale Human Identity and source-coverage text are corrected.

## Source scope

The supplied Drive fan supplement *Complete Species Guide 6 - June 2020.pdf* was visually inspected during the prior continuation: 366 pages, SHA-256 `f147b09acb25e5b3ea60622dfda956cc703b13527e36ea613b28d0b329a3adad`, Multiple Livers p.72 and Wookiee climbing p.313. Earlier reports cite a 358-page copy and pp.75/316. This newer copy has different Devaronian Willpower/Presence (1/2 rather than the selected 2/1) and omits the old Wookiee claw-damage option. The scoped traits were confirmed; saved baselines are retained. Reconcile variants before changing characteristics or adding claw damage. Rage, GM climbing skill substitutions and other manual species effects remain unfinished.

## Verification

The restored standalone HTML exactly matches the previously approved and tested candidate: 4,116,320 bytes, SHA-256 `c6c372e6eb3fd8a24a54a53440c9e1a1b97c00ed24019895e3787e3f9bb7b49f`. Earlier verification covered 24 focused checks, 12 regression suites and six local browser flows. Fresh checks and deployment evidence for this publication are recorded in the companion JSON; lost earlier logs are not presented as fresh results.

Local and hosted browser flows cover both species at 320, 390 and 1280 pixels: actual creation, a purchased talent, eligible and ordinary rolls, actor/dice scope, keyboard focus, navigation, manual save, reload and Resume, saved result/progress preservation and horizontal overflow. Sourcebuild reproducibility is checked. This does not certify native iPhone Safari or installed-PWA offline behavior.

## Completed publication verification

All **24 focused checks, 12 fresh regression suites, six local browser flows and six hosted browser flows passed**. Both species were exercised at 320, 390 and 1280 pixels. No browser errors or horizontal overflow were reported; purchased talents, XP, characteristics, story progress and recorded results survived manual save/reload/Resume. Active context was cleared without adding bonuses again.

Source release commit: `3a4ca37e794dd00bd2a543d1d0cb66691b394836`. Pages workflow [39356658001](https://github.com/felicianovalle-dev/swrpgtest/actions/runs/39356658001) completed successfully. The [companion JSON](species-context-verification.json) records fresh test results and fingerprints.
