# Eight species and Sluissi repairs verification

Build 96.22-species-repairs / package 1.9.28. Save schema and storage keys remain 92.

## Scope

The supplied Complete Species Guide v6 fan supplement, 358-page copy, was visually reviewed on these pages:

| Species | Page |
| --- | ---: |
| Sluissi | 261 |
| Weequay | 312 |
| Wookiee | 316 |
| Toydarian | 289 |
| Trandoshan | 290 |
| Twi'lek | 296 |
| Nautolan | 188 |
| Mon Calamari | 180 |

Base characteristics, thresholds, XP and fixed/optional starting ranks match the existing profiles. Sluissi's omitted Solid Repairs rank now counts once alongside purchased ranks, with no saved purchase or XP charge. Existing PC ship hull-repair and combat damage-control actions use the rank. It does not improve failed checks, system-strain repairs or another engineer's repairs. Other vehicle repairs and the other species' reviewed special traits remain narrative. No save fields or character stats change. Private PDFs and download URLs are excluded.

The repository now includes a resumable [project roadmap](project-roadmap.md), linked from the README, with the nine requested work areas and a concrete next source-review backlog. This release does not mark those broader areas complete.

## Verification

All 21 regression targets passed on the exact HTML fingerprint in [the machine-readable report](species-repairs-verification.json). Coverage includes 32 new source/continuation/repair/backlog checks, 70 earlier species checks, 107 older-talent checks (960 individual and 2,040 combined purchases), 47 layout checks at six viewports, the campaign suite and ten general system suites. Twenty-eight local browser flows passed, including all twelve new flows covering the eight profiles, every starting-rank branch and Sluissi at mobile/desktop sizes. Sluissi flows click actual hull-repair and combat damage-control controls, confirm stacking with a purchased rank, and preserve the repaired combat state through manual save/reload/Resume. Repair outcomes use controlled dice, not a balance simulation. Physical iPhone Safari was not newly tested.

Hosted verification will be recorded after publication.
