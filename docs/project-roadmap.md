# Sable Reach project roadmap

Current published release before this batch: **1.9.29**. The user authorized continuing through this roadmap and updating GitHub. Complete and test each update before starting another phase. This document records actual completion; source verification is separate from automation.

## Resume point

Species review and missing starting benefits are the active workstream. The 1.9.30 Clone, Geonosian, Kaminoan and Umbaran batch is in verification. Seven fresh reviews remain, starting with Tiss’shar, followed by Mikkian, Dowutin, Phydolon, Gand, Miraluka and Dantari. Finish these and reviewed species' manual effects before marking species work complete.

On resumption, inspect current GitHub main, this roadmap, and the latest verification report. Preserve existing characters, XP, purchases and story progress. Update this roadmap with the completed work, tests, release and next unfinished item after each published batch.

## Completed foundation

- [x] Finish the original 48 older talent-layout source reviews; preserve original IDs and XP tiers.
- [x] Record all 112 distinct career layouts as full, with no simplified/prototype career layouts remaining.
- [x] Repair iPhone-width navigation layout and expose Jobs and Training shortcuts in browser tests.
- [x] Repair droid construction/programming controls and attachment weapon selection.
- [x] Add explicit save/resume, recovery checkpoints and import isolation.
- [x] Add guided beginning/identity/career/XP/personal-details/review flow and saved era/faction metadata.
- [x] Implement reviewed innate talent ranks for Bothan, Rodian, Duros, Jawa and Sullustan; retain Selkath Surgeon.
- [x] Implement Cerean Intellectuals choices, including existing-character selection and original refund preservation.

## 1. Finish species

Source-review backlog:

- [x] Clone
- [x] Geonosian
- [x] Kaminoan
- [x] Umbaran
- [x] Lasat
- [x] Togruta
- [x] Zeltron
- [ ] Tiss'shar
- [x] Zabrak
- [ ] Mikkian
- [ ] Dowutin
- [ ] Phydolon
- [ ] Gand
- [ ] Miraluka
- [ ] Dantari

This batch's source reviews:

- [x] Sluissi, p.261; Weequay, p.312; Wookiee, p.316; Toydarian, p.289.
- [x] Trandoshan, p.290; Twi'lek, p.296; Nautolan, p.188; Mon Calamari, p.180.
- [x] Release Sluissi Solid Repairs after actual ship-repair and save/resume checks.
- [ ] Implement the remaining reviewed species benefits: natural weapons/rage, healing, assistance, sensing/vision, environmental adaptations, movement, breathing and Force resistance. Keep manual disclosures until each effect is implemented and tested.
- [ ] Assess additional species only after checking existing profiles; do not claim the full 300-plus-species guide is imported.

## 2. Finish talent and Force effects

- [ ] Inventory all remaining partial/manual talent effects and their source requirements.
- [ ] Implement special actions, selected-dice rerolls and resource/timing limits.
- [ ] Implement animal/riding abilities and signature-vehicle designation/bonuses.
- [ ] Implement signature abilities and their upgrades.
- [ ] Expand Force powers and test costs, targeting, commitments, opposed checks and save restoration.

## 3. Complete droid roles

- [ ] Implement directive-granted talent effects.
- [ ] Implement ship/station assignments and saved role selection.
- [ ] Implement combat participation and associated loadouts, damage, repair and progression.
- [ ] Test complete build/program/assign/use/repair/save/resume journeys. Programming-matrix tests alone do not certify these features.

## 4. Complete equipment handling

- [ ] Support individually identified duplicate weapons and attachments on each instance.
- [ ] Support crew attachment installation and restrictions.
- [ ] Verify remaining sourcebook equipment restrictions and special effects.
- [ ] Test purchase/install/remove/transfer/use/save/resume without duplicate charges or lost items.

## 5. Improve beginnings and customization

- [ ] Give each supported era/faction a distinct opening, circumstances, kit and suitable companion choices.
- [ ] Improve the basic opening/tutorial using the same real gameplay systems.
- [ ] Remove remaining development/prototype language from older play screens.
- [ ] Add visual customization beyond saved appearance descriptions; preserve mechanical character choices.

## 6. Expand adventures

- [ ] Build and test longer fringe adventures.
- [ ] Build and test longer Force-sensitive adventures.
- [ ] Build and test longer Rebellion adventures.
- [ ] Build and test Republic and CIS Clone Wars adventures.
- [ ] Build and test Imperial adventures.
- [ ] Use the supplied sourcebooks/modules and requested community resources when appropriate; distinguish original scenarios from adaptations. Current short missions are not full adventure ports.

## 7. Make the world era-consistent

- [ ] Audit NPCs, opposition, ships, equipment availability and locations against selected era/faction.
- [ ] Implement consistent faction reactions and changing allegiances.
- [ ] Reconcile the older world content with era-selected campaigns without rewriting existing saves.

## 8. Verify progression and balance

- [ ] Test ordinary starting characters with realistic resources and rolls.
- [ ] Complete remaining mission-choice combinations and the other campaigns' full playthroughs.
- [ ] Implement and test voluntary escape from combat.
- [ ] Test multi-day Jobs/Training sequences with save/reload between transactions.
- [ ] Verify rewards, failures, retries and longer-term economy/progression without repeated payouts.

## 9. Finish reliability and device verification

- [ ] Deepen malformed combat-payload validation and atomic load recovery.
- [ ] Improve desktop scroll/focus restoration.
- [ ] Verify native iPhone Safari and installed-PWA behavior; browser emulation is not a substitute.
- [ ] Test offline reload, virtual keyboard focus and orientation changes while menus are open.
- [ ] Continue targeted unit, browser, save-compatibility and live-deployment verification for each change.

## Separate, deferred project

The papercraft game, detailed visual creator and Paper Mario-style exploration/combat remain a separate proposal. Keep personal campaign characters and lore out of the public game. Finish the current systems first and obtain the user's decision before treating that separate proposal as an active implementation phase.

## Release log

- 1.9.27: Cerean Intellectuals and four species checks. [Verification](cerean-knowledge-verification.md).
- 1.9.28: eight species reviews, Sluissi starting repairs and this resumable roadmap. Verified: 21 regression targets, 28 local browser flows and 12 hosted flows passed. [Verification](species-repairs-verification.md).

## Update 1.9.29

Lasat (p.165), Togruta (p.287), Zeltron (p.333) and Zabrak (p.330) were visually checked against the supplied 358-page Complete Species Guide v6 fan supplement. Base stats, XP, thresholds and free starting-rank choices match; none were changed. Zabrak Coercion now receives one automatic Advantage instead of a Boost die, including rerolls, with no character bonus field or XP charge. The other three profiles' situational effects remain narrative and are described in their species notes. Verified: 23 regression targets, 35 local browser flows and 7 hosted flows passed. [Verification](species-coercion-verification.md).

## Update 1.9.30

Reviewed four Rise of the Separatists profiles (printed pp.12, 13, 15, 16). Added Clone Physical Training, Kaminoan Researcher and Charm Setback, Umbaran social Boosts, and the Geonosian included-skill choice for new and existing characters. Base stats and past XP spending are unchanged. Geonosian choice is optional on old finalized characters and required on new characters. Flight, assistance, lighting, incoming social modifiers and research time remain narrative. Local verification passed: 25 regression targets and 42 browser flows. Hosted verification pending. [Verification](clone-wars-species-verification.md).
