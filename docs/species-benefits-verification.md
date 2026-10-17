# Species benefit verification

Build 96.19-species-talents / package 1.9.25. Save schema and storage keys remain 92.

## Changes

The supplied Complete Species Guide v6 (358-page copy) was visually reviewed for Bothan p.44, Duros p.87, Jawa p.137 and Rodian p.233. The fan profiles match the existing base characteristics, thresholds, XP and starting skill options. Four omitted species talent ranks now count through the existing derived talent mechanism:

| Species | Included rank | Automated benefit |
| --- | --- | --- |
| Bothan | Convincing Demeanor | Remove one Setback on Deception/Skulduggery |
| Rodian | Expert Tracker | Remove one Setback on flagged tracking checks |
| Duros | Galaxy Mapper | Remove one Setback on Astrogation |
| Jawa | Utinni! | Remove one Setback on flagged scavenging checks |

No base stats, XP prices, purchased IDs or save fields change. Existing characters receive the derived benefit once; purchased ranks stack. Changing species does not delete purchased ranks. Notes identify narrative time reductions and Jawa sensory/silhouette effects. Other species and special actions remain outside this batch. Earlier guide citations refer to a differently paginated supplied copy. Private source PDFs and access URLs are excluded from the repository.

## Verification

Results are recorded in species-benefits-verification.json after the regression run completes.
