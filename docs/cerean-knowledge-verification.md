# Cerean Knowledge verification

Build 96.21-cerean-knowledge / package 1.9.27. Save schema and storage keys remain 92.

## Changes

Visually checked the supplied Complete Species Guide v6 fan supplement, 358-page copy: Cerean p.50, Lannik p.164, Gungan p.117 and Kel Dor p.143. Characteristics, base thresholds, starting XP and included skill choices match the existing profiles. Lannik retains this fan profile's 95 XP. Situational Lannik, Gungan and Kel Dor abilities remain narrative; updated notes state their scope. Private PDFs and access URLs are excluded.

Cerean Intellectuals now provides two distinct chosen Knowledge career skills with no free ranks. Choice is required before new-character finalization and is available once to existing finalized Cereans with no recorded choice. Past spending and progress are preserved; only future skill prices change. Choices are fixed after confirmation. During creation, any refundable non-career ranks in a proposed choice must first be undone so the original refund amount is retained. The existing creation rebuild clears the choice alongside purchases.

`src/species117.js` contains choice validation, UI, Review display and save validation. The existing catalog career-skill hook applies discounts. Save validation rejects malformed, duplicate, unknown, non-Knowledge and non-Cerean choice arrays before touching state or slots. The optional `speciesCareerSkills117` field is absent from older saves; absence is accepted and does not inherit choices from the current game.

## Verification

Pending final regression results.
