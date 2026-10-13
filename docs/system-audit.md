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

| Area | Next meaningful scenario |
| --- | --- |
| Saves/import | Isolation, numeric validation, pre-load recovery, storage failure and import autosave pause are covered by `check_save_reliability.cjs`. Next: deeper combat payload validation and desktop scroll/focus restoration. |
| Attachments | Failed sourcing, insufficient credits/hard points, incompatible items, crew equipment, and individual duplicate weapon instances. |
| Droids | All chassis/directive combinations, flexible skill choices, switching utility assignment, utility contribution to real checks, and multiple completed droids. |
| Jobs/Training | Existing prerequisite/cost tests pass; add multi-day sequences and save/reload between transactions. |
| Missions/combat | Play complete branches with deterministic outcomes; verify rewards occur once and saved mid-combat turns resume correctly. |
| Phone | Native Safari/PWA, offline reload, keyboard focus, portrait/landscape changes while menus are open. |

Passing targeted tests does not establish that every gameplay system is fully audited. The workshop and save reliability updates are complete within the scenarios above; full mission branches, combat payloads and native Safari remain further work.
