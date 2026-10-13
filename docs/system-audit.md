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
| Missions/combat | Operation payouts and world/organization effects occur once. Next: play complete story branches with deterministic outcomes and verify saved mid-combat turns resume correctly. |
| Phone | Native Safari/PWA, offline reload, keyboard focus, portrait/landscape changes while menus are open. |

Passing targeted tests does not establish that every gameplay system is fully audited. The workshop and save reliability updates are complete within the scenarios above; full mission branches, combat payloads and native Safari remain further work.
