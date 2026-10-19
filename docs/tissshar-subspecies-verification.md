# Tiss’shar subspecies verification — 1.9.31

Build `96.25-tissshar-subspecies`; save schema 92 remains unchanged. Visually reviewed p.283 of the supplied 358-page Complete Species Guide v6 fan supplement. The earlier profile used all characteristics at 2 and omitted six subspecies benefits. New characters now use Intellect 3 and Presence 1, with other characteristics at 2. Starting XP 85, base wound threshold 11, base strain threshold 10 and Negotiation 1 are unchanged.

| Subspecies | Included benefit |
| --- | --- |
| Ask-ar | Coordination 1 |
| Isk-ar | Gearhead 1 |
| Kal-ar | Charm 1 |
| Nil-ar | Stealth 1 |
| Orl-ar | Athletics 1 |
| Sil-ar | Convincing Demeanor 1 |

Choose on Identity; Review shows the confirmed subspecies and benefit. Choices are fixed when confirmed. Included skill ranks count toward free-rank floors and the rank-2 creation cap; undo paid creation ranks in that skill first so original refunds are preserved. Career resets retain the selected benefit exactly once. Changing species clears it with the other creation purchases. Gearhead and Convincing Demeanor are derived ranks, stack with purchased talent ranks, cost no XP and do not add saved talent purchases.

Older Tiss’shar can claim the omitted benefit once. Loading and claiming preserve their saved characteristics—including the earlier all-2 baseline—past XP, purchases, credits and story. Finalized characters can continue before claiming a benefit and may add a missing skill rank up to the rank-5 advancement cap. New characters must choose before finalizing. Deliberately resetting creation purchases uses the corrected current species baseline. The optional `tisssharSubtype121` field records the choice. Repeated loads do not grant another rank; imports without the field do not inherit a prior character’s subtype. Invalid choices and inconsistent skill-rank claims are rejected atomically.

Night Vision and natural weapons remain narrative: remove darkness Setback and add a bright-light Setback; claws/teeth add one Brawl damage as wounds with Critical 3; spending two Advantage on a tooth hit adds Pierce 1 and Vicious 2. This source review does not certify complete species automation. Six profiles remain for fresh review. Source PDFs, private links and campaign lore are excluded from the repository.

All 27 regression targets passed on the exact HTML fingerprint in [the machine-readable report](tissshar-subspecies-verification.json). Coverage includes 36 new species/subtype/continuation/validation checks, 157 earlier species checks, 107 older-talent checks (960 individual and 2,040 combined purchases), 47 layout checks at six viewports, campaign checks and ten general system suites. All 51 local browser flows passed. Nine new flows cover all six subspecies, Isk-ar phone/desktop creation, and older all-2 characters claiming skill or talent benefits. Manual save/reload/Resume retains the chosen benefit, characteristics and past spending without a duplicate grant. Physical iPhone Safari was not newly tested.

Hosted verification pending.
