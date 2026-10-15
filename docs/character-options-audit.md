# Character options and campaign beginnings audit

Build: `96.11-no-disintegrations-audit` / package `1.9.17`. Reviewed 2026-10-15 against the saved repository and the supplied source collections.

Before the campaign-beginnings update, the saved game had the 18 careers from Edge of the Empire, Age of Rebellion, and Force and Destiny. Jedi and Clone Soldier were missing. All 20 published career names are now represented, along with 17 universal specializations. This is a catalog-coverage finding, not a claim that every talent or published rule is automated.

## What was saved and what changed

| Catalog | Saved build | This update |
| --- | ---: | ---: |
| Careers | 18 | 20 |
| Career specialization placements | 108 | 118 |
| Distinct career trees | 102 | 112 |
| Career trees labeled full by the engine | 54 | 112 |
| Simplified career trees | 36 | 0 |
| Prototype career trees | 12 | 0 |
| Universal trees | 2 | 17 |
| Species profiles | 36 | 44 |

Placements count shared specializations under each career; distinct trees count each shared specialization once. Species profiles count the three Aqualish variants separately: the update adds six species and eight profiles.

The 25 Clone Wars and universal layouts contain 500 nodes checked against the supplied tree PDFs. Subsequent sourcebook reviews replaced 12 prototype layouts (240 nodes), Mechanic, Scout and 14 Force and Destiny layouts (320 nodes), and the remaining 20 Age of Rebellion layouts (400 nodes). These replacements total 73 imported layouts and 1,460 nodes, including universal options. All 48 former prototype/simplified career diagrams were visually compared with their supplied books and collections. Thirty-one of the 54 older career layouts have now been reverified against the supplied AoR, F&D and EotE books; 23 still await a fresh source audit. Layout coverage does not establish complete mechanical automation.

## Career and tree coverage

“Existing full” is the saved engine label. “Imported” identifies replacement layouts. “Reviewed” identifies twenty-eight older layouts checked against the AoR or F&D core books while keeping their original IDs. No career entries remain labeled simplified or prototype. Earlier exact trees retain their IDs. Former prototype and simplified purchases are mapped by talent name to an available source node, keeping their original amount spent and dedication choice. Unmatched purchases remain as earlier game options and retain their existing effects; they do not unlock source-tree connections.

| Career | Specializations and layout status |
| --- | --- |
| Bounty Hunter | Assassin — Reviewed; Gadgeteer — Imported; Survivalist — Imported; Martial Artist — Existing full; Operator — Existing full; Skip Tracer — Existing full |
| Smuggler | Pilot — Reviewed; Scoundrel — Reviewed; Thief — Imported; Charmer — Existing full; Gambler — Existing full; Gunslinger — Existing full |
| Technician | Mechanic — Imported; Outlaw Tech — Imported; Slicer — Reviewed; Cyber Tech — Existing full; Droid Tech — Existing full; Modder — Existing full |
| Hired Gun | Bodyguard — Imported; Marauder — Imported; Mercenary Soldier — Imported; Demolitionist — Existing full; Enforcer — Existing full; Heavy — Existing full |
| Explorer | Fringer — Imported; Scout — Imported; Trader — Imported; Archaeologist — Existing full; Big-Game Hunter — Reviewed; Driver — Reviewed |
| Colonist | Doctor — Imported; Politico — Imported; Scholar — Imported; Entrepreneur — Existing full; Marshal — Existing full; Performer — Existing full |
| Commander | Commodore — Reviewed; Squadron Leader — Reviewed; Tactician — Reviewed; Figurehead — Existing full; Instructor — Existing full; Strategist — Existing full |
| Ace | Driver — Reviewed; Gunner — Reviewed; Pilot — Reviewed; Beast Rider — Existing full; Hotshot — Existing full; Rigger — Existing full |
| Diplomat | Agitator — Imported; Ambassador — Imported; Quartermaster — Imported; Advocate — Imported; Analyst — Imported; Propagandist — Imported |
| Soldier | Commando — Imported; Medic — Imported; Sharpshooter — Imported; Heavy — Existing full; Trailblazer — Imported; Vanguard — Imported |
| Engineer | Mechanic — Imported; Saboteur — Imported; Scientist — Imported; Droid Specialist — Imported; Sapper — Imported; Shipwright — Imported |
| Spy | Infiltrator — Imported; Scout — Imported; Slicer — Reviewed; Courier — Imported; Interrogator — Imported; Sleeper Agent — Imported |
| Consular | Healer — Reviewed; Niman Disciple — Reviewed; Sage — Reviewed; Arbiter — Imported; Ascetic — Imported; Teacher — Imported |
| Guardian | Peacekeeper — Reviewed; Protector — Reviewed; Soresu Defender — Reviewed; Armorer — Reviewed; Warden — Imported; Warleader — Imported |
| Mystic | Advisor — Reviewed; Makashi Duelist — Reviewed; Seer — Reviewed; Alchemist — Imported; Magus — Imported; Prophet — Imported |
| Seeker | Ataru Striker — Reviewed; Hunter — Reviewed; Pathfinder — Reviewed; Executioner — Imported; Hermit — Imported; Navigator — Imported |
| Sentinel | Artisan — Reviewed; Shadow — Reviewed; Shien Expert — Reviewed; Investigator — Imported; Racer — Imported; Sentry — Imported |
| Warrior | Aggressor — Reviewed; Shii-Cho Knight — Reviewed; Starfighter Ace — Reviewed; Colossus — Reviewed; Juyo Berserker — Reviewed; Steel Hand Adept — Reviewed |
| Clone Soldier | Clone Trooper — Imported; Clone Officer — Imported; Clone Pilot — Imported; ARC Trooper — Imported; Clone Commander — Imported; Clone Veteran — Imported |
| Jedi | Padawan — Imported; Knight — Imported; General — Imported; Master — Imported |

## Older core-tree audit: first six

This update reviews Driver, Gunner, Pilot, Commodore, Squadron Leader and Tactician: 120 nodes and 57 distinct source rules. All existing node IDs and XP tiers remain unchanged. Driver also appears under Explorer, and Pilot also appears under Smuggler; their shared layouts and skill packages remain consistent.

| Tree | AoR Core printed page | Source PDF page | AOR collection PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: | ---: |
| Driver | 67 | 68 | 3 | 0 | 2 |
| Gunner | 68 | 69 | 4 | 1 | 4 |
| Pilot | 69 | 70 | 6 | 2 | 3 |
| Commodore | 73 | 74 | 9 | 2 | 0 |
| Squadron Leader | 74 | 75 | 12 | 0 | 2 |
| Tactician | 75 | 76 | 14 | 3 | 5 |

The book diagrams govern the corrected connections; the supplied compilation was used as a cross-check and is not treated as authority over a conflicting book diagram. Eight missing connections were restored and sixteen unsupported connections removed. Existing purchases are retained even when their old route is no longer offered for new purchases.

Improved Full Throttle is active in Driver and Pilot, and Improved Dead to Rights is active in Pilot. The glossary identifies Fire Control as a maneuver even though its diagram describes an action. Form On Me uses the glossary’s spelling without the old exclamation mark; its ID `sql32` and ability stay the same. Overwhelm Defenses follows an unsuccessful mounted-weapon attack and affects the targeted defense zone for the rest of the encounter. Coordinated Assault follows official errata: its range increases with additional ranks.

`talentRules101` scopes source references, activation/ranked labels and resolution notes to these six trees. Together with earlier rule sets, the catalog represents 331 distinct talent names. Manual actions are disclosed on the cards; this audit does not add complete vehicle-scale, command, item-modification or True Aim action workflows. See [core-tree-audit-verification.md](core-tree-audit-verification.md).

## Older Force core audit: Consular and Guardian

Healer, Niman Disciple, Sage, Peacekeeper, Protector and Soresu Defender now have reviewed source layouts. All 120 original IDs, names and XP tiers remain. Four missing connections were restored and seventeen unsupported connections removed. Eleven labels were corrected, including the Force designation on Reflect, the active Improved Parry/Improved Reflect glossary entries and passive Knowledgeable Healing.

| Tree | F&D Core printed page | Source PDF page | FND collection PDF page | Added connections | Removed connections |
| --- | ---: | ---: | ---: | ---: | ---: |
| Healer | 69 | 72 | 4 | 1 | 1 |
| Niman Disciple | 70 | 73 | 5 | 0 | 4 |
| Sage | 71 | 74 | 6 | 1 | 3 |
| Peacekeeper | 75 | 78 | 10 | 2 | 3 |
| Protector | 76 | 79 | 11 | 0 | 2 |
| Soresu Defender | 77 | 80 | 12 | 0 | 4 |

The [official F&D errata v1.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/fad_errata_v10.pdf) makes Heightened Awareness unranked. Protector follows that correction; existing duplicate purchases remain saved and new duplicates do not charge XP. Force Assault remains passive as the glossary specifies; it requires an already-purchased Move power. Strategic Form follows the glossary's Success-based targets and following-round expiry rather than the shorter diagram text.

`talentRules102` contains 57 source rules, bringing the union of scoped/shared rules to 350 distinct names. Source summaries and timing are scoped by tree. Complex Force and allied actions retain visible manual-resolution notes. Force-talent cards explain that Force Rating 1 is needed to use their benefits, while purchase paths remain open. Force Rating talents cannot grant initial sensitivity; saved inactive ranks activate once when a granting universal or Witchcraft provides the initial rating. Second Wind now enforces its once-per-encounter limit using the existing saved marker; the sixth and later daily stimpacks heal nothing even with Stimpack Specialization.

The [48-layout tracker](older-layouts-audit.md) records the remaining 23 trees and source groups. See [force-core-audit-verification.md](force-core-audit-verification.md) for verification and limits.

## Older Force core audit: Mystic and Seeker

Advisor, Makashi Duelist, Seer, Ataru Striker, Hunter and Pathfinder now have reviewed source layouts. All 120 original IDs, names and XP tiers remain. Three missing connections were restored and eighteen unsupported connections removed; seven active/passive or Force labels were corrected. The core book governs two Seer compilation discrepancies, and the Pathfinder Quick Movement–Natural Outdoorsman connection is retained.

`talentRules103` provides 65 scoped rules, bringing the shared/scoped union to 365 distinct names. Cards explain Animal Bond's silhouette limit and command maneuver, Mental Bond's glossary-based extreme range, Share Pain's transferred wounds, Hawk Bat Swoop's Advantage conversion, Makashi Flourish's Average action and Quick Movement's two-point cost and third maneuver. Conditioned's falling reduction follows official errata. Sixth Sense is ordinary and ranked in the F&D glossary; its AoR unranked variant remains separate.

Duelist's Training now works for Melee as well as Lightsaber and excludes multiple-minion groups. Ranged defense counts saved Sixth Sense ranks. Complex Force and animal actions remain manual where stated. That batch finished 12 of the original 48 layouts, leaving 36 at the time. See [mystic-seeker-audit-verification.md](mystic-seeker-audit-verification.md) for exact source pages, continuation evidence and limits.

## Older Force core audit: Sentinel and Warrior

Artisan, Shadow, Shien Expert, Aggressor, Shii-Cho Knight and Starfighter Ace now have reviewed source layouts. All 120 original IDs, names, positions and XP tiers remain. Two missing connections are restored and twenty-three unsupported connections removed; seven activation or Force labels are corrected. The core book governs two Shii-Cho compilation discrepancies; its Conditioned–Multiple Opponents path is retained.

`talentRules104` provides 70 scoped rules, including 47 absent from the previous two Force core sets. The shared/scoped union now covers 385 distinct names. Counterstrike uses the glossary's next-turn limit. Well Rounded is ranked and grants two chosen career skills per rank without free ranks. Touch of Fate keeps the core book's Force designation. Intuitive Strike is passive, unranked and requires two Force points per added Success or Advantage.

Multiple Opponents now counts individuals in an engaged minion group and adds its Boost only to Brawl, Melee or Lightsaber checks in both normal and special combat pools. Ship Gunnery now spends two Force points per Intuitive Strike result and charges opposite-alignment costs only for the points actually used. Complex item, Force and vehicle actions remain manual where the cards say so; Terrify's session-start Conflict and the once-per-round limits of Master Artisan, Master of Shadows and Falling Avalanche require manual tracking.

That batch finished 18 of the original 48 older layouts, leaving 30 at the time. The six earlier AoR core reviews bring the full reviewed total to 24 older layouts. Save schema remains 92; existing purchases and spending are retained. See [sentinel-warrior-audit-verification.md](sentinel-warrior-audit-verification.md) for exact source pages, changes, validation and limits.

## Older Force supplement audit

Armorer from Keeping the Peace and Colossus, Juyo Berserker and Steel Hand Adept from Knights of Fate now have reviewed source layouts. All 80 original IDs, names, positions and XP tiers remain. One missing connection is restored and fifteen unsupported connections removed. Colossus already matched its book diagram. Both Embrace Your Hate ranks are ordinary active talents, with the incorrect Force designation removed.

The books govern conflicting compilation details: Armorer retains Tinkerer–Falling Avalanche and Imbue Item–Reinforce Item; Headbutt and Unstoppable are unranked. Hard Headed starts at Daunting and Improved Hard Headed at Formidable, with difficulty reductions only for ranks after the first. `talentRules105` contains 47 scoped rules; the shared/scoped union now covers 403 distinct names. All 97 earlier catalog records and other prior fields remain semantically unchanged.

Inner Peace now accepts cancellation and zero without changing Destiny or pending Conflict reduction. Indomitable Will validates whole committed dice before spending a maneuver, reserves its activation strain when checking extra-maneuver costs, and refunds activation strain if the maneuver fails. Far Strike spends its action even when Force points cannot extend its range, preserving the narrative roll and preventing free retries. Its Short-range action remains available when all dice are committed, provided the character has Force rating. Hard Headed permits its staggered exception once, blocks repeated failed actions and preserves that distinction across save/resume.

This completes all 22 older F&D layouts in the 48-layout tracker, leaving 26 EotE/AoR layouts. Combined with six earlier AoR core reviews, 28 older career layouts have been reviewed without replacing IDs. Save schema remains 92. Special item actions, some damage sources, Headbutt eligibility/expiry and Improved Hard Headed recovery remain manual where stated. Dark-talent automatic Conflict is still added at Morality resolution rather than displayed at session start; the cards explain the pending amount and avoid duplicate entry. See [force-supplement-audit-verification.md](force-supplement-audit-verification.md).

## Age of Rebellion completion

All 20 remaining simplified AoR layouts now have source layouts. Their 400 previous purchases were captured from commit `84300bf` before replacement. Matching abilities migrate without repricing; unmatched abilities, original spending, Dedication and skill choices remain saved. All 960 prior purchases across the three replacement batches load together.

| Tree | Sourcebook tree | Source PDF page | AOR collection PDF page |
| --- | --- | ---: | ---: |
| Advocate | Desperate Allies · p.27 | 28 | 16 |
| Agitator | Age of Rebellion Core · p.80 | 81 | 17 |
| Ambassador | Age of Rebellion Core · p.79 | 80 | 18 |
| Analyst | Desperate Allies · p.29 | 30 | 19 |
| Propagandist | Desperate Allies · p.31 | 32 | 20 |
| Quartermaster | Age of Rebellion Core · p.81 | 82 | 21 |
| Droid Specialist | Fully Operational · p.25 | 28 | 23 |
| Saboteur | Age of Rebellion Core · p.86 | 87 | 25 |
| Sapper | Fully Operational · p.27 | 30 | 26 |
| Scientist | Age of Rebellion Core · p.87 | 88 | 27 |
| Shipwright | Fully Operational · p.29 | 32 | 28 |
| Commando | Age of Rebellion Core · p.91 | 92 | 30 |
| Medic | Age of Rebellion Core · p.92 | 93 | 32 |
| Sharpshooter | Age of Rebellion Core · p.93 | 94 | 33 |
| Trailblazer | Forged in Battle · p.31 | 32 | 34 |
| Vanguard | Forged in Battle · p.33 | 34 | 35 |
| Courier | Cyphers and Masks · supplied PDF p.26 | 26 | 37 |
| Infiltrator | Age of Rebellion Core · p.97 | 98 | 38 |
| Interrogator | Cyphers and Masks · supplied PDF p.28 | 28 | 39 |
| Sleeper Agent | Cyphers and Masks · supplied PDF p.30 | 30 | 41 |

AoR rules use 193 distinct talent entries. Activation/ranked metadata and 82 short summaries were added to the shared catalog, now 314 entries. `talentRules100` keeps AoR source labels separate from reused EotE/F&D variants. The AoR Knowledge Specialization entry is active; the saved EotE entry remains passive. Sixth Sense and Superior Reflexes in these AoR trees are ordinary passive talents, not Force prerequisites.

Book glossary details take precedence over diagrams when they differ: Dockyard Expertise reduces cost/time by 20% per rank, while the supplied tree diagram says 25%. Advocate has Improved Plausible Deniability, Droid Specialist has Repair Patch Specialization, Commando has Natural Outdoorsman, Courier has Improved Indistinguishable, and Interrogator has Exhaustive Questioning.

Ambassador's second-row Indistinguishable costs 10 XP, following the row-cost rule on AoR Core p.103 and the supplied AOR collection. The supplied Core p.79 diagram prints 5 XP. The [official AoR errata v1.0](https://cdn.svc.asmodee.net/production-edge/uploads/2021/09/aor_errata_v10.pdf) does not address that cell; this is a documented reconciliation of conflicting supplied sources, not a claimed erratum.

Courier's Pilot Training grants both piloting career skills without free ranks. The associated fixes keep at least one Success when using Eye for Detail, limit Prey on the Weak damage to one hit, and pay Sound Investments once at session start across Duty, Obligation and Morality. Complex special actions remain manual as disclosed on their cards. See [aor-talent-verification.md](aor-talent-verification.md) for checks and limits.

## Mechanic, Scout, and Force supplement references

Names, tiers, paths, and Force labels for these 320 nodes were visually checked in both the supplied compilation and the actual book diagrams. Printed page labels are used where verified; Savage Spirits uses physical pages in the supplied PDF. Activation/ranked rules use book glossary entries where available. Careful Planning records the book diagram’s active, once-per-session label without inventing a turn subtype.

| Tree | Sourcebook tree | Source PDF page | Tree collection PDF page |
| --- | --- | ---: | ---: |
| Mechanic | Edge of the Empire Core · p.89 | 98 | EOTE 39 |
| Scout | Edge of the Empire Core · p.72 | 81 | EOTE 20 |
| Arbiter | Disciples of Harmony · p.23 | 19 | FND 2 |
| Ascetic | Disciples of Harmony · p.25 | 21 | FND 3 |
| Teacher | Disciples of Harmony · p.27 | 23 | FND 7 |
| Warden | Keeping the Peace · p.27 | 31 | FND 13 |
| Warleader | Keeping the Peace · p.29 | 33 | FND 14 |
| Alchemist | Unlimited Power · p.27 | 30 | FND 17 |
| Magus | Unlimited Power · p.29 | 32 | FND 18 |
| Prophet | Unlimited Power · p.31 | 34 | FND 20 |
| Executioner | Savage Spirits | 28 | FND 24 |
| Hermit | Savage Spirits | 30 | FND 25 |
| Navigator | Savage Spirits | 32 | FND 27 |
| Investigator | Endless Vigil · p.25 | 27 | FND 31 |
| Racer | Endless Vigil · p.27 | 29 | FND 32 |
| Sentry | Endless Vigil · p.29 | 31 | FND 33 |

The sixteen-tree update used 161 distinct talent entries and added 72 short source-based summaries. The subsequent AoR import brings the shared metadata to 314 entries. The books’ differing Heightened Awareness rank labels remain scoped: Scout follows the EotE unranked entry, while Protector retains the F&D ranked entry. Teacher uses Once a Learner rather than the compilation’s Once the Learner. Improved Hunter’s Quarry follows its passive glossary entry; Improved Wise Warrior and Improved Reflect follow their active glossary entries despite passive labels in some book diagrams.

Earlier simplified IDs are frozen from commit c5eab55. Matching purchases keep their original spending and dedication choices; unmatched talents remain as earlier game options. Well Rounded skill choices move with the purchased Teacher node. Loading an old Force Rating purchase does not apply its increase again. See [force-talent-verification.md](force-talent-verification.md) for that batch’s test results and manual-effect limits.

## Imported layout references

Page numbers below refer to the supplied compilation PDF, not necessarily printed sourcebook page numbers. Sourcebook rules remain authoritative. The companion career/specialization Master List was also used for coverage; Rise of the Separatists confirms Jedi’s three free career ranks and Clone Soldier’s four.

| Tree | Source / supplied collection page |
| --- | --- |
| ARC Trooper | Collapse of the Republic · supplied Clone Wars tree collection, PDF p.2 |
| Clone Commander | Collapse of the Republic · supplied Clone Wars tree collection, PDF p.3 |
| Clone Officer | Rise of the Separatists · supplied Clone Wars tree collection, PDF p.4 |
| Clone Pilot | Rise of the Separatists · supplied Clone Wars tree collection, PDF p.5 |
| Clone Trooper | Rise of the Separatists · supplied Clone Wars tree collection, PDF p.6 |
| Clone Veteran | Collapse of the Republic · supplied Clone Wars tree collection, PDF p.7 |
| General | Collapse of the Republic · supplied Clone Wars tree collection, PDF p.9 |
| Knight | Rise of the Separatists · supplied Clone Wars tree collection, PDF p.10 |
| Master | Collapse of the Republic · supplied Clone Wars tree collection, PDF p.11 |
| Padawan | Rise of the Separatists · supplied Clone Wars tree collection, PDF p.12 |
| Death Watch Warrior | Collapse of the Republic · supplied Clone Wars tree collection, PDF p.13 |
| Force-Sensitive Outcast | Rise of the Separatists · supplied Clone Wars tree collection, PDF p.14 |
| Nightsister | Collapse of the Republic · supplied Clone Wars tree collection, PDF p.15 |
| Republic Navy Officer | Rise of the Separatists · supplied Clone Wars tree collection, PDF p.16 |
| Republic Representative | Rise of the Separatists · supplied Clone Wars tree collection, PDF p.17 |
| Scavenger | Rise of the Separatists · supplied Clone Wars tree collection, PDF p.18 |
| Senator | Collapse of the Republic · supplied Clone Wars tree collection, PDF p.19 |
| Separatist Commander | Collapse of the Republic · supplied Clone Wars tree collection, PDF p.20 |
| Force Adherent | Dawn of Rebellion · supplied universal tree collection, PDF p.1 |
| Imperial Academy Cadet | Dawn of Rebellion · supplied universal tree collection, PDF p.4 |
| Padawan Survivor | Dawn of Rebellion · supplied universal tree collection, PDF p.5 |
| Pirate | Dawn of Rebellion · supplied universal tree collection, PDF p.6 |
| Recruit | Age of Rebellion Core · supplied universal tree collection, PDF p.7 |
| Retired Clone Trooper | Dawn of Rebellion · supplied universal tree collection, PDF p.8 |
| Ship Captain | Dawn of Rebellion · supplied universal tree collection, PDF p.10 |

## Core prototype replacements

| Tree | Core printed page | Supplied EotE collection PDF page |
| --- | ---: | ---: |
| Gadgeteer | 60 | 3 |
| Survivalist | 61 | 7 |
| Doctor | 65 | 9 |
| Politico | 66 | 13 |
| Scholar | 67 | 14 |
| Fringer | 71 | 19 |
| Trader | 73 | 21 |
| Bodyguard | 77 | 23 |
| Marauder | 78 | 27 |
| Mercenary Soldier | 79 | 28 |
| Thief | 85 | 35 |
| Outlaw Tech | 90 | 41 |

The core PDF has nine extra front-matter pages; physical PDF indices are kept separate from printed citations. No source PDFs or private storage links are published in the repository.

Known unranked talents can supply their source-tree connections without a second XP charge. New ranked purchases still charge their displayed cost. Well Rounded stores two distinct career-skill choices per owned node without granting free ranks. Knowledge Specialization stores its initial Knowledge choice for subsequent ranks.

Feral Strength now adds damage to Brawl/Melee hits, including unarmed and Far Strike attacks. Natural Scholar offers failed Knowledge rerolls once per session. Knowledge Specialization can spend one Triumph on the selected PC skill during party checks. Blooded, Outdoorsman, Utinni!, Confidence, and Respected Scholar have conditional check hooks; those benefits require the relevant context flag and are not applied to every generic check. Poison duration, search/travel time, many special actions, and separate Deadly Accuracy choices for multiple ranks remain manual. Talent cards state these limits.

## Universal options and prerequisites

| Universal | Force access |
| --- | --- |
| Force Sensitive Exile | Grants Force Rating 1 if currently 0 |
| Force-Sensitive Emergent | Grants Force Rating 1 if currently 0 |
| Force-Sensitive Outcast | Grants Force Rating 1 if currently 0 |
| Padawan Survivor | Grants Force Rating 1 if currently 0 |
| Force Adherent | Does not grant Force Rating |
| Imperial Academy Cadet | Does not grant Force Rating |
| Pirate | Does not grant Force Rating |
| Recruit | Does not grant Force Rating |
| Retired Clone Trooper | Does not grant Force Rating; requires Clone species |
| Ship Captain | Does not grant Force Rating |
| Death Watch Warrior | Does not grant Force Rating |
| Nightsister | Witchcraft costs 5 XP and grants Force Rating 1 if currently 0 |
| Republic Navy Officer | Does not grant Force Rating |
| Republic Representative | Does not grant Force Rating |
| Scavenger | Does not grant Force Rating |
| Senator | Does not grant Force Rating |
| Separatist Commander | Does not grant Force Rating |

Knight and General require Force Rating 2; Master requires Force Rating 3. Begin a new Jedi as a Padawan and acquire the advanced specializations later. Clone Soldier options require the Clone species in this game. Additional specializations and universal options charge their existing engine XP costs. Universal bonus career skills affect skill eligibility/costs; acquisition does not supply free ranks. Republic Representative includes a selectable Knowledge career skill.

## New species profiles

These use the supplied **Complete Species Guide v6**, a fan supplement. The values below were checked on the indicated pages, including rendered page inspection. They do not certify the older 36 profiles. Wound/strain values are base thresholds before Brawn/Willpower. Characteristics are Brawn / Agility / Intellect / Cunning / Willpower / Presence.

| Profile | Characteristics | Base wounds / strain | Starting XP | Included starting ranks | Guide page |
| --- | --- | --- | ---: | --- | ---: |
| Aqualish (Aquala) | 3 / 2 / 1 / 2 / 2 / 2 | 11 / 8 | 90 | Brawl 1, Resilience 1 | 23 |
| Aqualish (Quara) | 3 / 2 / 1 / 2 / 2 / 2 | 11 / 8 | 90 | Brawl 1, Coercion 1 | 23 |
| Aqualish (Ualaq) | 3 / 2 / 1 / 2 / 2 / 2 | 11 / 8 | 90 | Brawl 1; choose Survival or Perception 1 | 23 |
| Devaronian | 2 / 2 / 2 / 3 / 2 / 1 | 11 / 10 | 90 | Deception 1, Survival 1 | 75 |
| Neimoidian | 1 / 2 / 3 / 3 / 1 / 2 | 10 / 9 | 95 | choose Deception or Negotiation 1 | 190 |
| Quarren | 2 / 2 / 1 / 2 / 3 / 2 | 10 / 10 | 100 | Negotiation 1 | 220 |
| Rattataki | 2 / 2 / 2 / 2 / 2 / 2 | 12 / 10 | 110 | choose Ranged (Heavy) or Ranged (Light) 1 | 227 |
| Selkath | 2 / 2 / 2 / 2 / 2 / 2 | 10 / 10 | 100 | choose Coercion or Medicine 1; Surgeon 1 talent | 245 |

Human’s two distinct non-career starting ranks are now selectable in guided creation (guide p.128). Later career-skill training retains those free ranks. Species choice ranks and Human bonus ranks are protected from creation XP refunds, and free-rank choices cannot raise a starting skill above two.

Selkath’s Surgeon rank participates in the existing Medicine talent calculation. Environmental, aquatic, vision, poison, and other situational traits are disclosed for narrative resolution where the engine does not support them. The entire 300-plus-species guide is not imported.

## Era and allegiance starts

| Start | Appropriate allegiances |
| --- | --- |
| Clone Wars, 22 BBY | Independent/fringe, Galactic Republic, CIS |
| Late Clone Wars, 19 BBY before the Empire | Independent/fringe, Galactic Republic, CIS |
| Rise of the Empire, 19 BBY after its declaration | Independent/fringe, local resistance cell, Galactic Empire |
| Galactic Civil War, 0 ABY after Yavin | Independent/fringe, Rebel Alliance, Galactic Empire |

Force-sensitive focus can accompany an available allegiance, but requires Force Rating 1 before finalization. Era choices constrain the starting allegiance and suitable new mission offers. They do not convert the entire galaxy, old NPCs, procedural contracts, or earlier adventures into era-specific content. All new openings use the shared Sable Reach maps.

## Original short adventures

| Path | Missions | Source inspiration |
| --- | --- | --- |
| Fringe | The Missing Manifest; A Broker with Two Clients | Under a Black Sun, investigation and underworld work, pp.18–19 |
| Force-sensitive | The Quiet Beacon; The Unfinished Lesson | Lure of the Lost, temple exploration/repair, pp.3–4 |
| Resistance / Rebellion | A Message without a Name; Supplies under Watch | Operation: Shadowpoint, local networks and supplies, pp.4–5 |
| Republic | Convoy at Dawn; A Field Station in the Dark | Rise of the Separatists, Chapter III campaign guidance |
| CIS | An Independent Signal; The Silent Workshop | Rise of the Separatists and Collapse of the Republic, Separatist-world campaign guidance |
| Imperial | Orders at the Checkpoint; A False Clearance | Dawn of Rebellion, Imperial rule and early opposition |

These are twelve original introductory scenarios, not full published-module ports. Each uses two lead approaches, three resolution choices, skill checks, failed-check recovery, persistent choice records, and a finale. New introductions focus on investigation/support/repair rather than combat or travel. Existing combat, travel, and longer story suites remain covered separately. Each finale grants 250 credits and 10 XP once; accepting a mission or making a choice grants no early payout.

The adventure-resource collection was consulted at [SWRPG Community](https://www.swrpgcommunity.com/gm-resources/adventures). Official free adventure references:

- [Under a Black Sun](https://images-cdn.fantasyflightgames.com/filer_public/18/ff/18ff8afe-bf19-47a3-97e5-a313ded3d6b3/under_a_black_sun_lores.pdf)
- [Operation: Shadowpoint](https://images-cdn.fantasyflightgames.com/filer_public/de/74/de74406e-2f92-49bf-9e47-1c4b9831a825/swap01operationshadowpointwq.pdf)
- [Lure of the Lost](https://images-cdn.fantasyflightgames.com/filer_public/74/9f/749fc12b-fd71-489f-aee9-cf8b23b03e60/swfp01_lure_of_the_lost_lr.pdf)

The Outer Rim was checked as a supplemental reference; its current public content is primarily equipment and was not used as the authority for new career layouts. Supplied PDFs and the guide are kept outside the repository; this audit records source names and pages without publishing private source-storage links.

## Opening and customization behavior

Fresh sessions open the Beginning chooser directly without writing save slots. Sessions with valid saved campaigns keep their Home preview and explicit Resume action. Guided creation uses Beginning → Identity → Career → Starting XP → Personal details → Review. Starting XP links to skills, talents, and universal/Force options. The review explains missing requirements and prevents incomplete creation. Finalization carries unused starting XP into advancement once.

Personal details persist callsign, pronouns, motivation, appearance description, background, goal, and ship name. Descriptions do not alter sprites or dice pools. Mechanical customization still uses species, characteristics, skills, talents, and equipment.

The explicit Sable Reach starting kit supplies 500 credits, heavy clothing, a selected starter weapon, two crew members, and a shared HWK-290. This is a game-start option rather than a sourcebook claim about free equipment. The old courier tutorial is marked skipped without issuing its rewards.

Older finalized saves keep their original quests, purchase benefits, and economy without being assigned an era retroactively. Era-only draft edits count as changes for recovery checkpoints. Campaign metadata is additive; the save schema and original storage keys remain 92.

## Remaining content work

Fresh source reviews for the remaining 20 older full trees, a full audit of older species, signature abilities, special talent actions, wider Force-power coverage, full-length adventure ports, era-specific galaxy/NPC content, and ordinary-character balance remain follow-up work. The in-game About → Character options & source coverage panel exposes these boundaries.

## Older EotE core audit: Assassin, Scoundrel and Slicer

All 60 original IDs, names, positions and XP costs remain. Six missing connections are restored and seven unsupported shortcuts removed. The book diagrams are printed pp.59, 84 and 91 / physical PDF pp.68, 93 and 100. Slicer remains shared between Technician and Spy. `talentRules106` contains 32 scoped glossary rules, bringing the shared/scoped union to 406 distinct names. Cards explain costs, timing and manual limits.

Precise Aim Attack now spends its required maneuver and chosen whole-number strain before rolling. Canceled or blocked attempts preserve resources and existing unarmed-defense readiness. A second maneuver must be paid without giving away the attack action. This completes 25 of the original 48 older layouts; 23 remain. See [EotE core verification](eote-core-audit-verification.md).

## No Disintegrations audit: Martial Artist, Operator and Skip Tracer

All 60 original IDs, names, positions, costs and activation labels remain. Fifteen connections are restored and five unsupported routes removed, based on printed pp.29, 31 and 33 / physical pp.30, 32 and 34. Thirty-nine scoped rule entries clarify costs, timing and manual limits, including the official Martial Grace errata. The literal shared/scoped name union is 412 (Mind Over Matter preserves its existing capitalization). Precision Strike selection cancellation now preserves strain and the improvement’s round use. This completes 28 of the original 48 layouts; 20 remain. See [No Disintegrations verification](no-disintegrations-audit-verification.md).
