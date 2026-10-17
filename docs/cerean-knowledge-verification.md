# Cerean Knowledge verification

Build 96.21-cerean-knowledge / package 1.9.27. Save schema and storage keys remain 92.

## Changes

Visually checked the supplied Complete Species Guide v6 fan supplement, 358-page copy: Cerean p.50, Lannik p.164, Gungan p.117 and Kel Dor p.143. Characteristics, base thresholds, starting XP and included skill choices match the existing profiles. Lannik retains this fan profile's 95 XP. Situational Lannik, Gungan and Kel Dor abilities remain narrative; updated notes state their scope. Private PDFs and access URLs are excluded.

Cerean Intellectuals now provides two distinct chosen Knowledge career skills with no free ranks. Choice is required before new-character finalization and is available once to existing finalized Cereans with no recorded choice. Past spending and progress are preserved; only future skill prices change. Choices are fixed after confirmation. During creation, any refundable non-career ranks in a proposed choice must first be undone so the original refund amount is retained. The existing creation rebuild clears the choice alongside purchases.

`src/species117.js` contains choice validation, UI, Review display and save validation. The existing catalog career-skill hook applies discounts. Save validation rejects malformed, duplicate, unknown, non-Knowledge and non-Cerean choice arrays before touching state or slots. The optional `speciesCareerSkills117` field is absent from older saves; absence is accepted and does not inherit choices from the current game.

## Verification

All 19 regression targets passed on the exact HTML fingerprint in [the machine-readable report](cerean-knowledge-verification.json). Coverage includes 26 new species/choice/refund/import assertions, 44 earlier species checks, 107 older-talent checks (960 individual and 2,040 combined purchases), 47 layout checks at six viewports, the campaign suite and ten general system suites. Sixteen local browser flows passed: six new character flows for this batch, one legacy finalized Cerean choice/save/Resume flow, and nine earlier species flows. Cerean selection and Review were visually inspected at 320 px and desktop size. Physical iPhone Safari was not newly tested.

GitHub Pages deployment [39079506255](https://github.com/felicianovalle-dev/swrpgtest/actions/runs/39079506255) succeeded for source commit `7abad1c222b261c5aa61e27c49a7a81ea9d7328f`. The live response matched all 4,077,653 tested HTML bytes (Git blob `dd5b151809f92f021464b99fd59706462980e90a`). Six new-character flows and one legacy finalized Cerean fixture passed on the hosted game with no browser errors or horizontal overflow. Cerean confirmed choices, skill ranks and XP survived save/reload/Resume at mobile and desktop sizes. The legacy choice preserved prior spending, stats, purchases and story progress. The verification-only follow-up commit preserves these game bytes.
