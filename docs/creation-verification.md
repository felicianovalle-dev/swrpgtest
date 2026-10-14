# Campaign beginnings verification

Build `96.3-force-talents`, package `1.9.9`, tested 2026-10-13.

## Actual-browser checks

| Suite | Passed | Coverage |
| --- | ---: | --- |
| `npm run test:campaign` | 95 | Fresh startup/save protection, catalog, creation, twelve era/allegiance combinations, prerequisites, all 36 mission branches, failure recovery, save/reload, old-save preservation, six viewport sizes |
| `npm run test:browser` | 47 | Home, World navigation/footer separation, Jobs and Training shortcuts, saves, attachment selectors, droid workshop, combat reload and retry controls |

The final campaign run reported no page errors. It checked 20 careers, 118
placements, 112 distinct career trees, 17 universal trees, and 44 species
profiles. Every imported tree has 20 unique nodes, symmetric links,
correct tier costs, and a reachable purchase graph. Source accuracy also used
the manual compilation/page review described in the [content audit](character-options-audit.md).

Fresh startup opens the beginning chooser directly and leaves manual, auto,
backup, and recovery storage empty. The startup correction was followed by
another complete campaign run and successful save, save-reliability, and Home
regressions; saved-campaign previews retain their explicit Resume behavior.

Creation checks used actual select/button handlers. They verified correct
free-rank caps, Jedi starting Force Rating, advanced Jedi prerequisites,
Clone Soldier starts, Human bonus-rank retention after buying another
specialization, racial rank refund protection, non-Force universals, and
Nightsister Witchcraft's separate 5-XP purchase.

Each new mission was completed through its actual UI in all three branches.
Accepting a mission and selecting a branch left credits/XP unchanged; its
finale paid 250 credits and 10 XP once. Repeated finale/start attempts could
not duplicate rewards. Failed lead and resolution checks exposed recovery
choices. Mid-mission reload preserved allegiance, mission node, and economy.

The branch tests control roll results to exercise deterministic transitions.
Existing dice/combat suites run separately. These checks do not establish
ordinary-character difficulty balance or full sourcebook-rule automation.

All six creation steps fit without horizontal overflow at 320×568, 375×667,
390×844, 428×926, 844×390, and 1280×800. Chromium touch/phone emulation was
used; physical iPhone Safari and installed-PWA offline behavior remain
unverified in this update.

## Existing regression targets

All ten existing targets completed successfully. World and Jobs/Training
completed in the initial suite run; after updating the creation-fallback
expectation to the new beginning chooser, the remaining targets completed
in a sequential compatibility run.

| Script | Targeted checks |
| --- | ---: |
| `check_world94.cjs` | 27 |
| `check_work96.cjs` | 37 |
| `check_save97.cjs` | 24 |
| `check_home.cjs` | 28 |
| `check_workshop.cjs` | 15 |
| `check_save_reliability.cjs` | 26 |
| `check_gameplay_audit.cjs` | 55 |
| `check_story_combat.cjs` | 315 |
| `check_mission_playthrough.cjs` | 21 |
| `check_setbacks.cjs` | 18 |

The World target also reported 266 passing smoke checks with no failures and
112 passing diagnostics. The gameplay audit covered droid chassis/programming
combinations, attachment installation, hard-point limits, and operation payouts.
The story/combat target covered the new short missions as well as existing
longer adventures. Older finalized saves retained their purchase benefits, credits,
XP, and courier progress. Malformed era/allegiance metadata was rejected before
replacing the current state.

`npm run build:check` confirmed that `index.html` exactly matches authoritative
sources. `git diff --check` reported no whitespace errors. The final browser
campaign result is preserved in [campaign-verification.json](campaign-verification.json).

The twelve prototype replacements, purchase-ID compatibility, additional talent effects, and current talent-card geometry are covered in [talent-tree-verification.md](talent-tree-verification.md). The remaining 36 simplified layouts are recorded in the content audit.

The Mechanic, Scout, and fourteen Force and Destiny supplement replacements are covered in [force-talent-verification.md](force-talent-verification.md). No campaign-opening or species phase was started during this update.
