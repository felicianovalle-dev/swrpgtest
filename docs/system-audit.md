# Gameplay audit

Run `npm test` for repeatable state and control-handler checks. Run `npm run test:browser` for Chromium touch layout and continuation checks. These do not substitute for native iPhone Safari testing.

## Workshop checks added

`scripts/check_workshop.cjs` uses an isolated campaign and clicks the rendered controls. Acquisition and crafting rolls are replaced with deterministic success/failure outcomes, then restored. It verifies:

- Material prerequisites and credit shortfall explanations.
- Chassis selection survives material purchases and refreshes.
- Acquisition failure costs nothing; successful acquisition charges once.
- Construction failure consumes materials without producing a droid.
- Construction success unlocks programming; programming failure retains the chassis.
- Programming success activates a utility droid without crashing party skill comparisons.
- Attachment selection survives refresh, installation affects the chosen weapon, duplicate installation cannot charge twice, and removal releases hard points.
- Serialized save restoration retains the programmed droid and installed attachment.

## Remaining audit priorities

`scripts/check_gameplay_audit.cjs` covers all five chassis with all seven
directives using deterministic successful rolls, flexible Medicine selection,
multiple droids and utility assignment restoration. Matrix redraws are scoped to
the Equipment panel; operation tests restore the full renderer. It also verifies
failed/incompatible/unaffordable attachment installation, crafted bonus hard
points, restricted chassis material acquisition, and single operation payouts
including world and organization effects. This does not test every directive's
source-book talent effects or a complete combat-droid system.

| Area | Next meaningful scenario |
| --- | --- |
| Saves/import | Isolation, numeric validation, pre-load recovery, storage failure and import autosave pause are covered by `check_save_reliability.cjs`. Next: deeper combat payload validation and desktop scroll/focus restoration. |
| Attachments | Core restrictions and crafted hard points are covered. Next: crew equipment and individual duplicate weapon instances. |
| Droids | All chassis/directive programming combinations and utility roster persistence are covered. Next: directive talent effects, station assignments and combat participation; these need explicit feature work, not a claim that programming tests validate them. |
| Jobs/Training | Existing prerequisite/cost tests pass; add multi-day sequences and save/reload between transactions. |
| Missions/combat | Branch guards and combat restoration are covered. `check_mission_playthrough.cjs` now follows three complete featured-campaign routes through real travel, district visits, dialogue buttons, attacks and turn progression, covering all three endings and all nine dialogue choices across those routes. Next: remaining choice combinations, failed travel/combat outcomes, ordinary-character balance and the other campaigns' full playthroughs. |
| Phone | Native Safari/PWA, offline reload, keyboard focus, portrait/landscape changes while menus are open. |

`check_setbacks.cjs` covers failed travel, skill-check fallback, forced withdrawal,
story/operation retry routing, stale combat-link cleanup, fresh Medicine treatment
after defeat, and saving a retry battle. Chromium exercises the visible story
retry button. Loss is a controlled incapacitation fixture, not a combat-balance
simulation. Voluntary fleeing is absent from the current player controls; no new
escape rules were added as part of this recovery fix.

The featured playthroughs use a funded, strong test character and deterministic dice. Redraws are scoped to Story and Combat; gameplay handlers and dialogue buttons remain real. Battles finish through attacks and turns, rather than invoking the victory hook directly. These tests verify progression, not difficulty balance. Earlier branch tests still use node fixtures. Malformed combat payload validation, directive talent effects and native Safari remain further work.
