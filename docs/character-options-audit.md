# Character options and campaign beginnings audit

Build: `96.4-aor-talents` / package `1.9.10`. Reviewed 2026-10-14 against the saved repository and the supplied source collections.

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

The 25 Clone Wars and universal layouts contain 500 nodes checked against the supplied tree PDFs. Subsequent sourcebook reviews replaced 12 prototype layouts (240 nodes), Mechanic, Scout and 14 Force and Destiny layouts (320 nodes), and the remaining 20 Age of Rebellion layouts (400 nodes). These replacements total 73 imported layouts and 1,460 nodes, including universal options. All 48 former prototype/simplified career diagrams were visually compared with their supplied books and collections. The 54 older career layouts labeled full were not all reverified against their original books. Layout coverage does not establish complete mechanical automation.

## Career and tree coverage

“Existing full” is the saved engine label. “Imported” identifies the newly reviewed collection layouts. No career entries remain labeled simplified or prototype. Earlier exact trees retain their IDs. Former prototype and simplified purchases are mapped by talent name to an available source node, keeping their original amount spent and dedication choice. Unmatched purchases remain as earlier game options and retain their existing effects; they do not unlock source-tree connections.

| Career | Specializations and layout status |
| --- | --- |
| Bounty Hunter | Assassin — Existing full; Gadgeteer — Imported; Survivalist — Imported; Martial Artist — Existing full; Operator — Existing full; Skip Tracer — Existing full |
| Smuggler | Pilot — Existing full; Scoundrel — Existing full; Thief — Imported; Charmer — Existing full; Gambler — Existing full; Gunslinger — Existing full |
| Technician | Mechanic — Imported; Outlaw Tech — Imported; Slicer — Existing full; Cyber Tech — Existing full; Droid Tech — Existing full; Modder — Existing full |
| Hired Gun | Bodyguard — Imported; Marauder — Imported; Mercenary Soldier — Imported; Demolitionist — Existing full; Enforcer — Existing full; Heavy — Existing full |
| Explorer | Fringer — Imported; Scout — Imported; Trader — Imported; Archaeologist — Existing full; Big-Game Hunter — Existing full; Driver — Existing full |
| Colonist | Doctor — Imported; Politico — Imported; Scholar — Imported; Entrepreneur — Existing full; Marshal — Existing full; Performer — Existing full |
| Commander | Commodore — Existing full; Squadron Leader — Existing full; Tactician — Existing full; Figurehead — Existing full; Instructor — Existing full; Strategist — Existing full |
| Ace | Driver — Existing full; Gunner — Existing full; Pilot — Existing full; Beast Rider — Existing full; Hotshot — Existing full; Rigger — Existing full |
| Diplomat | Agitator — Imported; Ambassador — Imported; Quartermaster — Imported; Advocate — Imported; Analyst — Imported; Propagandist — Imported |
| Soldier | Commando — Imported; Medic — Imported; Sharpshooter — Imported; Heavy — Existing full; Trailblazer — Imported; Vanguard — Imported |
| Engineer | Mechanic — Imported; Saboteur — Imported; Scientist — Imported; Droid Specialist — Imported; Sapper — Imported; Shipwright — Imported |
| Spy | Infiltrator — Imported; Scout — Imported; Slicer — Existing full; Courier — Imported; Interrogator — Imported; Sleeper Agent — Imported |
| Consular | Healer — Existing full; Niman Disciple — Existing full; Sage — Existing full; Arbiter — Imported; Ascetic — Imported; Teacher — Imported |
| Guardian | Peacekeeper — Existing full; Protector — Existing full; Soresu Defender — Existing full; Armorer — Existing full; Warden — Imported; Warleader — Imported |
| Mystic | Advisor — Existing full; Makashi Duelist — Existing full; Seer — Existing full; Alchemist — Imported; Magus — Imported; Prophet — Imported |
| Seeker | Ataru Striker — Existing full; Hunter — Existing full; Pathfinder — Existing full; Executioner — Imported; Hermit — Imported; Navigator — Imported |
| Sentinel | Artisan — Existing full; Shadow — Existing full; Shien Expert — Existing full; Investigator — Imported; Racer — Imported; Sentry — Imported |
| Warrior | Aggressor — Existing full; Shii-Cho Knight — Existing full; Starfighter Ace — Existing full; Colossus — Existing full; Juyo Berserker — Existing full; Steel Hand Adept — Existing full |
| Clone Soldier | Clone Trooper — Imported; Clone Officer — Imported; Clone Pilot — Imported; ARC Trooper — Imported; Clone Commander — Imported; Clone Veteran — Imported |
| Jedi | Padawan — Imported; Knight — Imported; General — Imported; Master — Imported |

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

Exact replacements for the 36 simplified layouts, a full audit of older species/full trees, signature abilities, special talent actions, wider Force-power coverage, full-length adventure ports, era-specific galaxy/NPC content, and ordinary-character balance remain follow-up work. The in-game About → Character options & source coverage panel exposes these boundaries.
