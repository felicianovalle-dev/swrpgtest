# Species review verification

Build 96.20-species-review / package 1.9.26. Save schema and storage keys remain 92.

## Changes

The supplied Complete Species Guide v6 fan supplement (358-page copy) was visually reviewed for Chiss p.60, Mirialan p.179, Pantoran p.207 and Sullustan p.267. Their existing characteristics, base thresholds, XP and starting skills match. Both Pantoran skill choices remain available. Sullustan's omitted Skilled Jockey rank now reduces Setback on both piloting skills in character checks and the existing ship-pool calculation. It stacks with purchased ranks.

Review now shows a dedicated species talents card with included and total ranks for all six profiles that grant a talent. It works for old campaigns as well as guided creation and removes stale cards when species changes. The display does not add purchases, charge XP or alter saved progress. Lighting and temperature traits remain narrative. No base stats or save fields change. Private source PDFs and access URLs are excluded.

## Verification

All 17 regression targets passed on the exact HTML fingerprint in [the machine-readable report](species-review-verification.json). Coverage includes 23 new species/review checks, 21 previous species checks, 107 older-talent checks (960 individual and 2,040 combined purchases), 47 layout checks at six viewports, the campaign suite and ten general system suites. Nine local browser creation/purchase/finalization/save/reload/Resume flows passed, including Sullustan at mobile and desktop sizes. The species rank text was hit-tested clear of the mobile navigation after scrolling. No browser errors were reported. Physical iPhone Safari was not newly tested.

Hosted verification will be recorded after publication.
