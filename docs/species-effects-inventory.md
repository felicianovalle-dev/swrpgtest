# Remaining species effects

Baseline: published 1.9.33 (`06225d8`), updated for the 1.9.34 poison/climbing release. This inventory covers all 44 existing profiles, including the three Aqualish variants. It is not an import of the full guide or a new full source review.

**33 profiles retain recorded manual or partial effects.** No remaining context in a row means no additional gap recorded in the current profile, not proof of every species rule. Starting ranks/choices, derived innate talents, Cerean/Geonosian/Tiss’shar/Gand choices, Zabrak symbols, Mikkian/Umbaran outgoing Boost, Phydolon recovery and Sluissi ship repairs must remain intact.

| Profile | Existing source | Remaining context before automation |
|---|---|---|
| Aqualish (Aquala) | Complete Species Guide v6 · fan profile · p.23 | aquatic movement; cold/wet environment |
| Aqualish (Quara) | Complete Species Guide v6 · fan profile · p.23 | aquatic movement; outdoor tracking |
| Aqualish (Ualaq) | Complete Species Guide v6 · fan profile · p.23 | aquatic movement; vision |
| Bothan | Complete Species Guide v6.0 fan supplement · 358-page copy · p.44 | No additional gap recorded. |
| Cerean | Complete Species Guide v6.0 fan supplement · 358-page copy · p.50 | No additional gap recorded. |
| Chiss | Complete Species Guide v6.0 fan supplement · 358-page copy · p.60 | lighting-related Setback |
| Clone | Rise of the Separatists · p.12 | No additional gap recorded. |
| Dantari | Complete Species Guide v6.0 · fan profile · p.70 | creation-only Primitive removal; item familiarity |
| Devaronian | Complete Species Guide v6 · fan profile · p.75 | No additional gap recorded. |
| Dowutin | Knights of Fate · p.19 | silhouette choice; Immovable reaction and strain |
| Duros | Complete Species Guide v6.0 fan supplement · 358-page copy · p.87 | navigation duration |
| Gand | Complete Species Guide v6.0 · fan profile · p.106 | respiration/equipment/atmosphere; session-limited Rituals and GM vision |
| Geonosian | Rise of the Separatists · p.13 | assisting/receiving actor, Boost and assistant strain; flight |
| Gungan | Complete Species Guide v6.0 fan supplement · 358-page copy · p.117 | aquatic movement/breathing; humidity/dryness; High Jump, strain and round limit |
| Human | Complete Species Guide | No additional gap recorded. |
| Jawa | Complete Species Guide v6.0 fan supplement · 358-page copy · p.137 | scavenging duration; lighting; scent; silhouette |
| Kaminoan | Rise of the Separatists · p.15 | incoming social actor/target; research duration |
| Kel Dor | Complete Species Guide v6.0 fan supplement · 358-page copy · p.143 | breathing equipment/atmosphere; goggles and vision |
| Lannik | Complete Species Guide v6.0 fan supplement · 358-page copy · p.164 | critical-injury/fear/disorientation Setback causes; silhouette |
| Lasat | Complete Species Guide v6.0 fan supplement · 358-page copy · p.165 | hot/cold; darkness/brightness |
| Mikkian | Knights of Fate · p.21 | No additional gap recorded. |
| Miraluka | Complete Species Guide v6.0 · fan profile · p.178 | creation-only Force Vision purchase and mentor discount; Blind upgrades, concealment and Force connection |
| Mirialan | Complete Species Guide v6.0 fan supplement · 358-page copy · p.179 | No additional gap recorded. |
| Mon Calamari | Complete Species Guide v6.0 fan supplement · 358-page copy · p.180 | aquatic breathing/movement; humidity/dryness |
| Nautolan | Complete Species Guide v6.0 fan supplement · 358-page copy · p.188 | aquatic breathing/movement; humidity/dryness; lighting; lie/emotion task |
| Neimoidian | Complete Species Guide v6 · fan profile · p.190 | No additional gap recorded. |
| Pantoran | Complete Species Guide v6.0 fan supplement · 358-page copy · p.207 | cold/hot |
| Phydolon | Knights of Fate · p.22 | No additional gap recorded. |
| Quarren | Complete Species Guide v6 · fan profile · p.220 | aquatic movement; humidity/dryness |
| Rattataki | Complete Species Guide v6 · fan profile · p.227 | No additional gap recorded. |
| Rodian | Complete Species Guide v6.0 fan supplement · 358-page copy · p.233 | tracking duration |
| Selkath | Complete Species Guide v6 · fan profile · p.245 | aquatic movement; humidity/dryness |
| Sluissi | Complete Species Guide v6.0 fan supplement · 358-page copy · p.261 | other vehicle repair actor/type/cap |
| Sullustan | Complete Species Guide v6.0 fan supplement · 358-page copy · p.267 | darkness/brightness |
| Tiss'shar | Complete Species Guide v6.0 fan supplement · 358-page copy · p.283 | darkness/brightness; claws/teeth damage and Advantage spend |
| Togruta | Complete Species Guide v6.0 fan supplement · 358-page copy · p.287 | assisting and receiving actor |
| Toydarian | Complete Species Guide v6.0 fan supplement · 358-page copy · p.289 | incoming telepathic Force power; hovering/falls/terrain; silhouette |
| Trandoshan | Complete Species Guide v6.0 fan supplement · 358-page copy · p.290 | natural weapon selection; darkness; qualifying natural/bacta healing; long-term limb regrowth |
| Twi'lek | Complete Species Guide v6.0 fan supplement · 358-page copy · p.296 | hot/dry and cold/wet |
| Umbaran | Rise of the Separatists · p.16 | darkness/bright natural light |
| Weequay | Complete Species Guide v6.0 fan supplement · 358-page copy · p.312 | clan, range and observer senses |
| Wookiee | Complete Species Guide v6.0 fan supplement · 358-page copy · p.316 | claw-damage source variant; Rage and current wounds/Critical Injuries; GM climbing skill substitutions beyond Athletics |
| Zabrak | Complete Species Guide v6.0 fan supplement · 358-page copy · p.330 | No additional gap recorded. |
| Zeltron | Complete Species Guide v6.0 fan supplement · 358-page copy · p.333 | target physiology and mask; Empathy maneuver, encounter limit and opposed check |

## Implementation order

1. Finish this release’s deployment and hosted verification.
2. Add typed lighting/climate causes, counts and explicit controls; retain unrelated Setback.
3. Add qualifying Trandoshan recovery, natural weapon selection and Wookiee Rage.
4. Add assistance with both actor identities and targeted social contexts.
5. Add optional saved choices and reactions for Dowutin, Dantari, Miraluka and Zeltron.
6. Extend breathing, locomotion, silhouette, incoming Force effects and real activity durations. Retain GM controls for visions, communication and long-term regrowth.

Every batch must preserve XP, paid-cost refunds, characteristics, purchases and story state; validate imports before replacement; test actual UI, save/reload/Resume and hosted identity. Do not mark species work complete while these effects remain manual.

## Source variants

The previously inspected Drive copy has 366 pages, with the two scoped traits on pp.72/313. Earlier saved profiles cite a different 358-page copy, pp.75/316. The 366-page copy differs in Devaronian Willpower/Presence and omits the earlier Wookiee claw-damage option. Preserve saved baselines and reconcile editions before changing characteristics or adding that damage option. See [verification](species-context-verification.md).

Legacy literals contain superseded values; inspect resolved catalog data. Human Identity and the three-reviews-remaining coverage text are corrected in this release. Other long coverage prose may still need consolidation.
