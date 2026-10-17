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

All 15 regression targets passed on the exact generated HTML fingerprint recorded in [the machine-readable report](species-benefits-verification.json). These include 21 species assertions, 107 talent checks (960 individual and 2,040 combined older purchases), 47 layout checks at six viewports, the campaign suite and ten general system suites. Four visible browser flows complete species selection, skill selection where applicable, talent purchase, finalization, manual save, reload and Resume. Notes and skill controls were visually inspected at mobile and desktop sizes. Physical iPhone Safari was not newly tested.

GitHub Pages deployment [39076907017](https://github.com/felicianovalle-dev/swrpgtest/actions/runs/39076907017) succeeded for source commit `eba4bbcc6e2082822e308e1c308580c116d2ff23`. The live response matched all 4,067,060 tested HTML bytes (Git blob `2b63986dac360946626a274c38625f5913651846`). All four hosted species flows passed creation, talent purchase, finalization, manual save, reload and Resume with no browser errors or horizontal overflow. The verification-only follow-up commit preserves these game bytes.
