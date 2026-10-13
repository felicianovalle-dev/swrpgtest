# Character options and campaign beginnings audit

Build: `96.2-core-talents` / package `1.9.8`. Reviewed 2026-10-13 against the saved repository and the supplied source collections.

Before the campaign-beginnings update, the saved game had the 18 careers from Edge of the Empire, Age of Rebellion, and Force and Destiny. Jedi and Clone Soldier were missing. All 20 published career names are now represented, along with 17 universal specializations. This is a catalog-coverage finding, not a claim that every talent or published rule is automated.

## What was saved and what changed

| Catalog | Saved build | This update |
| --- | ---: | ---: |
| Careers | 18 | 20 |
| Career specialization placements | 108 | 118 |
| Distinct career trees | 102 | 112 |
| Career trees labeled full by the engine | 54 | 76 |
| Simplified career trees | 36 | 36 |
| Prototype career trees | 12 | 0 |
| Universal trees | 2 | 17 |
| Species profiles | 36 | 44 |

Placements count shared specializations under each career; distinct trees count each shared specialization once. Species profiles count the three Aqualish variants separately: the update adds six species and eight profiles.

The 25 Clone Wars and universal layouts contain 500 nodes and were checked against the supplied tree PDFs. This update adds 12 core layouts with another 240 nodes. Their names, costs, paths, and types were visually checked against both the supplied EotE collection and Edge of the Empire Core. Canonical activation/ranked metadata for 108 distinct talents was checked in the core glossary; Knowledge Specialization is passive, correcting the collection’s label. The 54 older layouts labeled full were not all reverified against their original books in this update. A matching layout does not establish complete mechanical automation.

## Career and tree coverage

“Existing full” is the saved engine label. “Imported” identifies the newly reviewed collection layouts. Simplified and prototype entries remain available but need source-layout replacement. Earlier exact trees retain their IDs. Former prototype purchases are mapped by talent name to an available source node, keeping their original amount spent and dedication choice. Unmatched purchases remain as earlier game options and retain their existing effects; they do not unlock source-tree connections.

| Career | Specializations and layout status |
| --- | --- |
| Bounty Hunter | Assassin — Existing full; Gadgeteer — Imported; Survivalist — Imported; Martial Artist — Existing full; Operator — Existing full; Skip Tracer — Existing full |
| Smuggler | Pilot — Existing full; Scoundrel — Existing full; Thief — Imported; Charmer — Existing full; Gambler — Existing full; Gunslinger — Existing full |
| Technician | Mechanic — Simplified; Outlaw Tech — Imported; Slicer — Existing full; Cyber Tech — Existing full; Droid Tech — Existing full; Modder — Existing full |
| Hired Gun | Bodyguard — Imported; Marauder — Imported; Mercenary Soldier — Imported; Demolitionist — Existing full; Enforcer — Existing full; Heavy — Existing full |
| Explorer | Fringer — Imported; Scout — Simplified; Trader — Imported; Archaeologist — Existing full; Big-Game Hunter — Existing full; Driver — Existing full |
| Colonist | Doctor — Imported; Politico — Imported; Scholar — Imported; Entrepreneur — Existing full; Marshal — Existing full; Performer — Existing full |
| Commander | Commodore — Existing full; Squadron Leader — Existing full; Tactician — Existing full; Figurehead — Existing full; Instructor — Existing full; Strategist — Existing full |
| Ace | Driver — Existing full; Gunner — Existing full; Pilot — Existing full; Beast Rider — Existing full; Hotshot — Existing full; Rigger — Existing full |
| Diplomat | Agitator — Simplified; Ambassador — Simplified; Quartermaster — Simplified; Advocate — Simplified; Analyst — Simplified; Propagandist — Simplified |
| Soldier | Commando — Simplified; Medic — Simplified; Sharpshooter — Simplified; Heavy — Existing full; Trailblazer — Simplified; Vanguard — Simplified |
| Engineer | Mechanic — Simplified; Saboteur — Simplified; Scientist — Simplified; Droid Specialist — Simplified; Sapper — Simplified; Shipwright — Simplified |
| Spy | Infiltrator — Simplified; Scout — Simplified; Slicer — Existing full; Courier — Simplified; Interrogator — Simplified; Sleeper Agent — Simplified |
| Consular | Healer — Existing full; Niman Disciple — Existing full; Sage — Existing full; Arbiter — Simplified; Ascetic — Simplified; Teacher — Simplified |
| Guardian | Peacekeeper — Existing full; Protector — Existing full; Soresu Defender — Existing full; Armorer — Existing full; Warden — Simplified; Warleader — Simplified |
| Mystic | Advisor — Existing full; Makashi Duelist — Existing full; Seer — Existing full; Alchemist — Simplified; Magus — Simplified; Prophet — Simplified |
| Seeker | Ataru Striker — Existing full; Hunter — Existing full; Pathfinder — Existing full; Executioner — Simplified; Hermit — Simplified; Navigator — Simplified |
| Sentinel | Artisan — Existing full; Shadow — Existing full; Shien Expert — Existing full; Investigator — Simplified; Racer — Simplified; Sentry — Simplified |
| Warrior | Aggressor — Existing full; Shii-Cho Knight — Existing full; Starfighter Ace — Existing full; Colossus — Existing full; Juyo Berserker — Existing full; Steel Hand Adept — Existing full |
| Clone Soldier | Clone Trooper — Imported; Clone Officer — Imported; Clone Pilot — Imported; ARC Trooper — Imported; Clone Commander — Imported; Clone Veteran — Imported |
| Jedi | Padawan — Imported; Knight — Imported; General — Imported; Master — Imported |

## Remaining layout gaps

The following 36 distinct trees still need exact source layouts. Replacing them must include an explicit purchase-ID migration rather than dropping purchased talents.

| Current status | Trees |
| --- | --- |
| Simplified (36) | Mechanic; Scout; Agitator; Ambassador; Quartermaster; Advocate; Analyst; Propagandist; Commando; Medic; Sharpshooter; Trailblazer; Vanguard; Saboteur; Scientist; Droid Specialist; Sapper; Shipwright; Infiltrator; Courier; Interrogator; Sleeper Agent; Arbiter; Ascetic; Teacher; Warden; Warleader; Alchemist; Magus; Prophet; Executioner; Hermit; Navigator; Investigator; Racer; Sentry |

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
